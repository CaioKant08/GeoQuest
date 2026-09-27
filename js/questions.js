(() => {
  function rebuild(){
    const modules = window.KANT_MODULES || [];
    window.KANT_QUESTIONS = modules.flatMap((module, moduleIndex) =>
      (module.questoes || []).map((q, questionIndex) => ({
        id: q.id,
        level: Math.min(4, Math.floor((moduleIndex * 8 + questionIndex) / 10)),
        topic: module.titulo,
        visual: `Módulo ${module.numero} • ${module.subtitulo}`,
        q: q.enunciado,
        opts: [...(q.alternativas || [])],
        a: Number(q.correta) || 0,
        exp: q.explicacao || "",
        hint: q.dica || "",
        difficulty: q.dificuldade || "media",
        sourceModuleId: module.id,
        xpValue: Number(q.xp) || 0
      }))
    );
  }
  window.kantRebuildQuestionBank=rebuild;
  rebuild();
  window.addEventListener("kant:content-ready",rebuild);
})();
