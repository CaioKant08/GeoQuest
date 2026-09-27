(() => {
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const defaults = clone(window.KANT_DEFAULT_MODULES || window.KANT_MODULES || []);

  function buildQuestionBank(modules){
    return (modules || []).flatMap((module, moduleIndex) =>
      (module.questoes || []).map((q, questionIndex) => ({
        id: q.id,
        level: Math.min(4, Math.floor((moduleIndex * 8 + questionIndex) / 10)),
        topic: module.titulo,
        visual: `Módulo ${module.numero} • ${module.subtitulo}`,
        q: q.enunciado,
        opts: [...(q.alternativas || [])],
        a: Number(q.correta) || 0,
        exp: q.explicacao || "",
        imageUrl: q.image_url || "",
        explanationImageUrl: q.explanation_image_url || "",
        hint: q.dica || "",
        difficulty: q.dificuldade || "media",
        sourceModuleId: module.id,
        xpValue: Number(q.xp) || 0
      }))
    );
  }

  function applyContent(modules, source="local"){
    window.KANT_MODULES = modules?.length ? modules : clone(defaults);
    window.KANT_QUESTIONS = buildQuestionBank(window.KANT_MODULES);
    window.dispatchEvent(new CustomEvent("kant:content-ready", {detail:{source, modules:window.KANT_MODULES}}));
    return window.KANT_MODULES;
  }

  async function loadPublishedContent(){
    const db = window.kantDb;
    if(!db) return applyContent(clone(defaults), "local");

    try{
      const adminPreview=window.kantIsAdmin===true && window.kantAdminUnlockAll===true;
      let moduleQuery=db
        .from("modules")
        .select("id,numero,titulo,subtitulo,cor,icone,descricao,objetivos,published,position")
        .order("position",{ascending:true})
        .order("numero",{ascending:true});
      if(!adminPreview)moduleQuery=moduleQuery.eq("published",true);
      const {data:moduleRows,error:moduleError}=await moduleQuery;
      if(moduleError) throw moduleError;
      if(!moduleRows?.length) return applyContent(clone(defaults), "local");

      const ids=moduleRows.map(m=>m.id);
      const [{data:theoryRows,error:theoryError},{data:questionRows,error:questionError}] = await Promise.all([
        (()=>{let q=db.from("theory_blocks")
          .select("id,module_id,position,titulo,texto,formula,exemplo,image_url,formula_image_url,example_image_url,published")
          .in("module_id",ids)
          .order("position",{ascending:true});return adminPreview?q:q.eq("published",true);})(),
        (()=>{let q=db.from("questions")
          .select("id,module_id,position,dificuldade,xp,enunciado,alternativas,correta,dica,explicacao,image_url,explanation_image_url,published")
          .in("module_id",ids)
          .order("position",{ascending:true});return adminPreview?q:q.eq("published",true);})()
      ]);
      if(theoryError) throw theoryError;
      if(questionError) throw questionError;

      const modules=moduleRows.map(row=>({
        id:row.id,
        numero:Number(row.numero)||0,
        titulo:row.titulo||"Módulo",
        subtitulo:row.subtitulo||"",
        cor:row.cor||"green",
        icone:row.icone||"•",
        descricao:row.descricao||"",
        objetivos:Array.isArray(row.objetivos)?row.objetivos:[],
        teoria:(theoryRows||[]).filter(t=>t.module_id===row.id).map(t=>({
          id:t.id,
          titulo:t.titulo||"",
          texto:t.texto||"",
          formula:t.formula||"",
          exemplo:t.exemplo||"",
          image_url:t.image_url||"",
          formula_image_url:t.formula_image_url||"",
          example_image_url:t.example_image_url||""
        })),
        questoes:(questionRows||[]).filter(q=>q.module_id===row.id).map(q=>({
          id:q.id,
          dificuldade:q.dificuldade||"media",
          xp:Number(q.xp)||0,
          enunciado:q.enunciado||"",
          alternativas:Array.isArray(q.alternativas)?q.alternativas:[],
          correta:Number(q.correta)||0,
          dica:q.dica||"",
          explicacao:q.explicacao||"",
          image_url:q.image_url||"",
          explanation_image_url:q.explanation_image_url||""
        }))
      }));
      return applyContent(modules,"supabase");
    }catch(err){
      console.warn("Conteúdo do Supabase indisponível; usando versão local:",err?.message||err);
      return applyContent(clone(defaults),"local");
    }
  }

  window.kantLoadContent=loadPublishedContent;
  window.kantApplyContent=applyContent;
  applyContent(clone(defaults),"local");

  window.addEventListener("geoquest:user-ready",()=>{
    loadPublishedContent();
  });
})();
