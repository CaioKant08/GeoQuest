(() => {
  const $=(s,root=document)=>root.querySelector(s);
  const $$=(s,root=document)=>[...root.querySelectorAll(s)];
  const state={modules:[],selectedModuleId:null,theory:[],questions:[],editingTheoryId:null,editingQuestionId:null,users:[],progress:[],theoryImageUrl:"",formulaImageUrl:"",exampleImageUrl:"",questionImageUrl:"",explanationImageUrl:""};

  const esc=(v)=>String(v??"").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
  const db=()=>window.kantDb;
  const isAdmin=()=>window.kantIsAdmin===true;
  const isSuperAdmin=()=>window.kantIsSuperAdmin===true;
  const protectedAdminEmail="caiokvalcanti@gmail.com";

  function status(message,type="ok"){
    const el=$("#adminStatus"); if(!el)return;
    el.textContent=message||"";
    el.className=`admin-status ${message?"show":""} ${type}`;
    if(message) setTimeout(()=>{if(el.textContent===message)el.className="admin-status";},4500);
  }

  async function requireAdmin(){
    if(!isAdmin()||!db()) throw new Error("Acesso administrativo não autorizado.");
  }

  function setImagePreview(selector,url){
    const box=$(selector); if(!box)return;
    box.innerHTML="";
    if(url){
      const img=document.createElement("img"); img.src=url; img.alt="Prévia"; box.appendChild(img);
    }else{
      const span=document.createElement("span"); span.textContent="Sem imagem"; box.appendChild(span);
    }
  }

  function previewFile(inputSelector,previewSelector){
    const input=$(inputSelector); const file=input?.files?.[0];
    if(!file)return;
    if(!file.type.startsWith("image/")){ status("Escolha um arquivo de imagem.","err"); input.value=""; return; }
    if(file.size>5*1024*1024){ status("A imagem deve ter no máximo 5 MB.","err"); input.value=""; return; }
    const url=URL.createObjectURL(file); setImagePreview(previewSelector,url);
    const img=$(previewSelector+" img"); if(img) img.onload=()=>URL.revokeObjectURL(url);
  }

  async function uploadContentImage(inputSelector,folder,currentUrl=""){
    const input=$(inputSelector); const file=input?.files?.[0];
    if(!file) return currentUrl||"";
    await requireAdmin();
    const ext=(file.name.split(".").pop()||"jpg").toLowerCase().replace(/[^a-z0-9]/g,"")||"jpg";
    const safeFolder=String(folder||"content").replace(/[^a-zA-Z0-9_-]/g,"-");
    const path=`${safeFolder}/${Date.now()}-${Math.random().toString(36).slice(2,9)}.${ext}`;
    const {error}=await db().storage.from("content-images").upload(path,file,{upsert:false,contentType:file.type,cacheControl:"3600"});
    if(error) throw error;
    const {data}=db().storage.from("content-images").getPublicUrl(path);
    return data?.publicUrl ? `${data.publicUrl}?v=${Date.now()}` : "";
  }

  function setTab(name){
    $$(".admin-tab").forEach(b=>{
      const active=b.dataset.adminTab===name;
      b.classList.toggle("active",active);
      b.setAttribute("aria-selected",String(active));
    });
    $$(".admin-panel").forEach(panel=>{
      const active=panel.dataset.adminPanel===name;
      panel.hidden=!active;
      panel.classList.toggle("active",active);
    });
    if(name==="users") loadUsers();
    if(name==="overview") loadOverview();
    if(name==="content"){
      if(!state.modules.length) loadModules().catch(err=>status(err.message,"err"));
      else if(state.selectedModuleId) selectModule(state.selectedModuleId,false).catch(err=>status(err.message,"err"));
    }
  }

  async function loadOverview(){
    if(!isAdmin())return;
    try{
      const [{count:modulesCount},{count:questionsCount},{count:usersCount},{count:publishedCount}] = await Promise.all([
        db().from("modules").select("id",{count:"exact",head:true}),
        db().from("questions").select("id",{count:"exact",head:true}),
        db().from("profiles").select("id",{count:"exact",head:true}),
        db().from("modules").select("id",{count:"exact",head:true}).eq("published",true)
      ]);
      $("#adminStatModules").textContent=modulesCount??"—";
      $("#adminStatPublished").textContent=publishedCount??"—";
      $("#adminStatQuestions").textContent=questionsCount??"—";
      $("#adminStatUsers").textContent=usersCount??"—";
    }catch(err){status(err.message,"err");}
  }

  async function loadModules(preferredId=null){
    await requireAdmin();
    const {data,error}=await db().from("modules")
      .select("id,numero,titulo,subtitulo,cor,icone,descricao,objetivos,published,position,updated_at")
      .order("position",{ascending:true}).order("numero",{ascending:true});
    if(error) throw error;
    state.modules=data||[];
    if(preferredId && state.modules.some(m=>m.id===preferredId)) state.selectedModuleId=preferredId;
    if(!state.selectedModuleId || !state.modules.some(m=>m.id===state.selectedModuleId)) state.selectedModuleId=state.modules[0]?.id||null;
    renderModuleList();
    if(state.selectedModuleId) await selectModule(state.selectedModuleId,false);
    else clearModuleForm();
  }

  function renderModuleList(){
    const box=$("#adminModuleList"); if(!box)return;
    box.innerHTML="";
    if(!state.modules.length){box.innerHTML='<div class="admin-empty">Nenhum módulo cadastrado.</div>';return;}
    state.modules.forEach(m=>{
      const btn=document.createElement("button");
      btn.type="button";
      btn.className="admin-module-item"+(m.id===state.selectedModuleId?" active":"");
      btn.innerHTML=`<span class="admin-module-order">${esc(m.numero)}</span><span><b>${esc(m.titulo)}</b><small>${m.published?"Publicado":"Rascunho"} • ${esc(m.subtitulo||"")}</small></span><i>${m.published?"●":"○"}</i>`;
      btn.addEventListener("click",()=>selectModule(m.id));
      box.appendChild(btn);
    });
  }

  function clearModuleForm(){
    state.selectedModuleId=null;
    const form=$("#adminModuleForm"); form?.reset();
    if($("#adminModuleId")) $("#adminModuleId").value="";
    if($("#adminModuleNumero")) $("#adminModuleNumero").value=(state.modules.length+1);
    if($("#adminModulePosition")) $("#adminModulePosition").value=(state.modules.length+1);
    if($("#adminDeleteModule")) $("#adminDeleteModule").disabled=true;
    renderTheory([]); renderQuestions([]);
  }

  async function selectModule(id,rerender=true){
    state.selectedModuleId=id;
    if(rerender)renderModuleList();
    const m=state.modules.find(x=>x.id===id); if(!m)return;
    $("#adminModuleId").value=m.id;
    $("#adminModuleNumero").value=m.numero??"";
    $("#adminModulePosition").value=m.position??m.numero??"";
    $("#adminModuleTitle").value=m.titulo||"";
    $("#adminModuleSubtitle").value=m.subtitulo||"";
    $("#adminModuleDescription").value=m.descricao||"";
    $("#adminModuleObjectives").value=Array.isArray(m.objetivos)?m.objetivos.join("\n"):"";
    $("#adminModuleColor").value=m.cor||"green";
    $("#adminModuleIcon").value=m.icone||"•";
    $("#adminModulePublished").checked=!!m.published;
    $("#adminDeleteModule").disabled=false;
    await Promise.all([loadTheory(id),loadQuestions(id)]);
  }

  async function saveModule(e){
    e.preventDefault(); await requireAdmin();
    const id=$("#adminModuleId").value.trim() || `modulo-${Date.now()}`;
    const payload={
      id,
      numero:Number($("#adminModuleNumero").value)||1,
      position:Number($("#adminModulePosition").value)||1,
      titulo:$("#adminModuleTitle").value.trim(),
      subtitulo:$("#adminModuleSubtitle").value.trim(),
      descricao:$("#adminModuleDescription").value.trim(),
      objetivos:$("#adminModuleObjectives").value.split("\n").map(x=>x.trim()).filter(Boolean),
      cor:$("#adminModuleColor").value,
      icone:$("#adminModuleIcon").value.trim()||"•",
      published:$("#adminModulePublished").checked,
      updated_at:new Date().toISOString()
    };
    if(!payload.titulo) return status("Informe o título do módulo.","err");
    const {error}=await db().from("modules").upsert(payload,{onConflict:"id"});
    if(error) return status(error.message,"err");
    status("Módulo salvo. A alteração já está no banco global.");
    await loadModules(id); await refreshPublicContent(); await loadOverview();
  }

  async function deleteModule(){
    if(!state.selectedModuleId)return;
    const m=state.modules.find(x=>x.id===state.selectedModuleId);
    if(!confirm(`Excluir o módulo "${m?.titulo||state.selectedModuleId}" e todo o conteúdo dele?`))return;
    const {error}=await db().from("modules").delete().eq("id",state.selectedModuleId);
    if(error)return status(error.message,"err");
    status("Módulo excluído."); state.selectedModuleId=null; await loadModules(); await refreshPublicContent(); await loadOverview();
  }

  async function togglePublish(){
    const m=state.modules.find(x=>x.id===state.selectedModuleId); if(!m)return;
    const {error}=await db().from("modules").update({published:!m.published,updated_at:new Date().toISOString()}).eq("id",m.id);
    if(error)return status(error.message,"err");
    status(!m.published?"Módulo publicado para todos.":"Módulo movido para rascunho.");
    await loadModules(m.id); await refreshPublicContent();
  }

  async function loadTheory(moduleId){
    const {data,error}=await db().from("theory_blocks")
      .select("id,module_id,position,titulo,texto,formula,exemplo,image_url,formula_image_url,example_image_url,published")
      .eq("module_id",moduleId).order("position",{ascending:true});
    if(error){status(error.message,"err");return;}
    state.theory=data||[]; renderTheory(state.theory);
  }

  function renderTheory(rows){
    const box=$("#adminTheoryList"); if(!box)return; box.innerHTML="";
    if(!rows.length){box.innerHTML='<div class="admin-empty">Nenhum bloco teórico neste módulo.</div>';return;}
    rows.forEach(r=>{
      const item=document.createElement("div");item.className="admin-content-row";
      item.innerHTML=`<div><b>${esc(r.titulo)}</b><small>Ordem ${r.position} • ${r.published?"visível":"oculto"}</small></div><div class="admin-row-actions"><button type="button" data-action="edit">Editar</button><button type="button" class="danger" data-action="delete">Excluir</button></div>`;
      $("[data-action='edit']",item).onclick=()=>editTheory(r);
      $("[data-action='delete']",item).onclick=()=>deleteTheory(r.id);
      box.appendChild(item);
    });
  }

  function newTheory(){
    state.editingTheoryId=null; state.theoryImageUrl=""; state.formulaImageUrl=""; state.exampleImageUrl=""; $("#adminTheoryForm").reset();
    $("#adminTheoryPosition").value=(state.theory.length+1); $("#adminTheoryPublished").checked=true;
    setImagePreview("#adminTheoryImagePreview","");
    setImagePreview("#adminFormulaImagePreview","");
    setImagePreview("#adminExampleImagePreview","");
    $("#adminTheoryEditor").hidden=false; $("#adminTheoryTitle").focus();
  }
  function editTheory(r){
    state.editingTheoryId=r.id; state.theoryImageUrl=r.image_url||""; state.formulaImageUrl=r.formula_image_url||""; state.exampleImageUrl=r.example_image_url||"";
    $("#adminTheoryForm").reset(); $("#adminTheoryTitle").value=r.titulo||""; $("#adminTheoryText").value=r.texto||""; $("#adminTheoryFormula").value=r.formula||""; $("#adminTheoryExample").value=r.exemplo||""; $("#adminTheoryPosition").value=r.position||1; $("#adminTheoryPublished").checked=!!r.published;
    setImagePreview("#adminTheoryImagePreview",state.theoryImageUrl); setImagePreview("#adminFormulaImagePreview",state.formulaImageUrl); setImagePreview("#adminExampleImagePreview",state.exampleImageUrl); $("#adminTheoryEditor").hidden=false;
  }
  async function saveTheory(e){
    e.preventDefault(); if(!state.selectedModuleId)return;
    try{
      const [imageUrl,formulaImageUrl,exampleImageUrl]=await Promise.all([
        uploadContentImage("#adminTheoryImage",`${state.selectedModuleId}/theory`,state.theoryImageUrl),
        uploadContentImage("#adminFormulaImage",`${state.selectedModuleId}/formulas`,state.formulaImageUrl),
        uploadContentImage("#adminExampleImage",`${state.selectedModuleId}/examples`,state.exampleImageUrl)
      ]);
      const payload={module_id:state.selectedModuleId,position:Number($("#adminTheoryPosition").value)||1,titulo:$("#adminTheoryTitle").value.trim(),texto:$("#adminTheoryText").value.trim(),formula:$("#adminTheoryFormula").value.trim(),exemplo:$("#adminTheoryExample").value.trim(),image_url:imageUrl,formula_image_url:formulaImageUrl,example_image_url:exampleImageUrl,published:$("#adminTheoryPublished").checked,updated_at:new Date().toISOString()};
      let q=state.editingTheoryId?db().from("theory_blocks").update(payload).eq("id",state.editingTheoryId):db().from("theory_blocks").insert(payload);
      const {error}=await q;if(error)throw error;
      $("#adminTheoryEditor").hidden=true;state.editingTheoryId=null;state.theoryImageUrl="";state.formulaImageUrl="";state.exampleImageUrl="";status("Bloco teórico salvo.");await loadTheory(state.selectedModuleId);await refreshPublicContent();
    }catch(err){status(err.message||"Não foi possível salvar o bloco.","err");}
  }
  async function deleteTheory(id){if(!confirm("Excluir este bloco teórico?"))return;const {error}=await db().from("theory_blocks").delete().eq("id",id);if(error)return status(error.message,"err");await loadTheory(state.selectedModuleId);await refreshPublicContent();}

  async function loadQuestions(moduleId){
    const {data,error}=await db().from("questions")
      .select("id,module_id,position,dificuldade,xp,enunciado,alternativas,correta,dica,explicacao,image_url,explanation_image_url,published")
      .eq("module_id",moduleId).order("position",{ascending:true});
    if(error){status(error.message,"err");return;}
    state.questions=data||[];renderQuestions(state.questions);
  }
  function renderQuestions(rows){
    const box=$("#adminQuestionList");if(!box)return;box.innerHTML="";
    if(!rows.length){box.innerHTML='<div class="admin-empty">Nenhuma questão neste módulo.</div>';return;}
    rows.forEach((r,i)=>{
      const item=document.createElement("div");item.className="admin-content-row";
      item.innerHTML=`<div><b>${i+1}. ${esc(r.enunciado)}</b><small>${esc(r.dificuldade)} • ${Number(r.xp)||0} XP • ${r.published?"publicada":"oculta"}</small></div><div class="admin-row-actions"><button type="button" data-action="edit">Editar</button><button type="button" class="danger" data-action="delete">Excluir</button></div>`;
      $("[data-action='edit']",item).onclick=()=>editQuestion(r);$("[data-action='delete']",item).onclick=()=>deleteQuestion(r.id);box.appendChild(item);
    });
  }
  function newQuestion(){state.editingQuestionId=null;state.questionImageUrl="";state.explanationImageUrl="";$("#adminQuestionForm").reset();$("#adminQuestionPosition").value=state.questions.length+1;$("#adminQuestionXp").value=30;$("#adminQuestionPublished").checked=true;setImagePreview("#adminQuestionImagePreview","");setImagePreview("#adminExplanationImagePreview","");$("#adminQuestionEditor").hidden=false;$("#adminQuestionText").focus();}
  function editQuestion(r){
    state.editingQuestionId=r.id; state.questionImageUrl=r.image_url||""; state.explanationImageUrl=r.explanation_image_url||"";
    $("#adminQuestionForm").reset();$("#adminQuestionText").value=r.enunciado||"";$("#adminQuestionDifficulty").value=r.dificuldade||"media";$("#adminQuestionXp").value=r.xp||0;$("#adminQuestionPosition").value=r.position||1;$("#adminQuestionCorrect").value=Number(r.correta)||0;$("#adminQuestionHint").value=r.dica||"";$("#adminQuestionExplanation").value=r.explicacao||"";$("#adminQuestionPublished").checked=!!r.published;const alts=Array.isArray(r.alternativas)?r.alternativas:[];for(let i=0;i<4;i++)$("#adminAlt"+i).value=alts[i]||"";setImagePreview("#adminQuestionImagePreview",state.questionImageUrl);setImagePreview("#adminExplanationImagePreview",state.explanationImageUrl);$("#adminQuestionEditor").hidden=false;
  }
  async function saveQuestion(e){
    e.preventDefault();if(!state.selectedModuleId)return;
    const alternatives=[0,1,2,3].map(i=>$("#adminAlt"+i).value.trim());if(alternatives.some(x=>!x))return status("Preencha as quatro alternativas.","err");
    const id=state.editingQuestionId||`q-${Date.now()}`;
    try{
      const [imageUrl,explanationImageUrl]=await Promise.all([
        uploadContentImage("#adminQuestionImage",`${state.selectedModuleId}/questions`,state.questionImageUrl),
        uploadContentImage("#adminExplanationImage",`${state.selectedModuleId}/explanations`,state.explanationImageUrl)
      ]);
      const payload={id,module_id:state.selectedModuleId,position:Number($("#adminQuestionPosition").value)||1,dificuldade:$("#adminQuestionDifficulty").value,xp:Math.max(0,Number($("#adminQuestionXp").value)||0),enunciado:$("#adminQuestionText").value.trim(),alternativas:alternatives,correta:Number($("#adminQuestionCorrect").value)||0,dica:$("#adminQuestionHint").value.trim(),explicacao:$("#adminQuestionExplanation").value.trim(),image_url:imageUrl,explanation_image_url:explanationImageUrl,published:$("#adminQuestionPublished").checked,updated_at:new Date().toISOString()};
      const {error}=await db().from("questions").upsert(payload,{onConflict:"id"});if(error)throw error;$("#adminQuestionEditor").hidden=true;state.editingQuestionId=null;state.questionImageUrl="";state.explanationImageUrl="";status("Questão salva. XP, imagens e conteúdo atualizados globalmente.");await loadQuestions(state.selectedModuleId);await refreshPublicContent();await loadOverview();
    }catch(err){status(err.message||"Não foi possível salvar a questão.","err");}
  }
  async function deleteQuestion(id){if(!confirm("Excluir esta questão?"))return;const {error}=await db().from("questions").delete().eq("id",id);if(error)return status(error.message,"err");await loadQuestions(state.selectedModuleId);await refreshPublicContent();await loadOverview();}

  async function loadUsers(){
    if(!isAdmin())return;
    const [{data:users,error:userError},{data:progress,error:progressError},{data:mods,error:modError}]=await Promise.all([
      db().rpc("admin_list_users"),
      db().from("user_module_progress").select("user_id,module_id,best,completed,attempts,current_answered,current_correct,current_total,in_progress,updated_at"),
      db().from("modules").select("id,numero,titulo,position,published").order("position",{ascending:true})
    ]);
    if(userError||progressError||modError)return status((userError||progressError||modError).message,"err");
    state.users=users||[];state.progress=progress||[];state.modules=mods||state.modules;renderUsers();
  }

  function currentModuleFor(userId){
    const mods=[...state.modules].sort((a,b)=>(a.position||0)-(b.position||0));
    const rows=state.progress.filter(p=>p.user_id===userId);
    if(!rows.length)return mods[0]?`Módulo ${mods[0].numero} — não iniciado`:"Sem módulos";
    const byId=new Map(rows.map(r=>[r.module_id,r]));
    const next=mods.find(m=>!byId.get(m.id)?.completed);
    if(next){const r=byId.get(next.id);if(!r)return `Módulo ${next.numero} — não iniciado`;const pct=r.current_total?Math.round((Number(r.current_answered)||0)/Number(r.current_total)*100):0;return `Módulo ${next.numero} — ${r.in_progress?pct+"% da prática":r.best+"% melhor"}`;}
    return "Trilha concluída";
  }

  function renderUsers(){
    const body=$("#adminUsersBody");if(!body)return;body.innerHTML="";
    const term=($("#adminUserSearch")?.value||"").trim().toLowerCase();
    state.users.filter(u=>!term||`${u.display_name||""} ${u.email||""}`.toLowerCase().includes(term)).forEach(u=>{
      const tr=document.createElement("tr");
      const email=(u.email||"").toLowerCase();
      const protectedAccount=email===protectedAdminEmail;
      const roleControl=isSuperAdmin()
        ? (protectedAccount?'<span class="admin-role-locked">🔒 Superadmin</span>':`<select class="admin-role-select"><option value="user" ${u.role!=="admin"?"selected":""}>Usuário</option><option value="admin" ${u.role==="admin"?"selected":""}>Administrador</option></select>`)
        : `<span class="admin-role-readonly">${u.role==="admin"?"Administrador":"Usuário"}</span>`;
      tr.innerHTML=`<td><b>${esc(u.display_name||"Jogador")}</b><small>${esc(u.email||"e-mail ainda não sincronizado")}</small></td><td>${esc(currentModuleFor(u.id))}</td><td><input class="admin-xp-input" type="number" min="0" step="1" value="${Number(u.xp)||0}"></td><td>${roleControl}</td><td><button class="btn secondary admin-save-user" type="button">Salvar</button></td>`;
      $(".admin-save-user",tr).onclick=()=>saveUser(u.id,tr);body.appendChild(tr);
    });
    if(!body.children.length)body.innerHTML='<tr><td colspan="5" class="admin-empty">Nenhum usuário encontrado.</td></tr>';
  }
  async function saveUser(id,row){
    const xp=Math.max(0,Number($(".admin-xp-input",row).value)||0);
    const payload={xp,updated_at:new Date().toISOString()};
    const roleSelect=$(".admin-role-select",row);
    if(isSuperAdmin()&&roleSelect)payload.role=roleSelect.value;
    const {error}=await db().from("profiles").update(payload).eq("id",id);if(error)return status(error.message,"err");status("Usuário atualizado.");await loadUsers();
  }

  function testUnlockKey(){return `kant:admin-unlock-all:${window.geoquestCurrentUserId||"anon"}`;}
  async function applyAdminTestMode(enabled){
    window.kantAdminUnlockAll=!!enabled && isAdmin();
    const input=$("#adminUnlockAllModules"); if(input)input.checked=window.kantAdminUnlockAll;
    try{localStorage.setItem(testUnlockKey(),window.kantAdminUnlockAll?"1":"0");}catch(_e){}
    if(typeof window.kantLoadContent==="function")await window.kantLoadContent();
    window.dispatchEvent(new CustomEvent("kant:admin-test-mode",{detail:{enabled:window.kantAdminUnlockAll}}));
    status(window.kantAdminUnlockAll?"Modo de teste ativado: módulos e rascunhos liberados só para você.":"Modo de teste desativado.");
  }
  function restoreAdminTestMode(){
    let enabled=false;try{enabled=localStorage.getItem(testUnlockKey())==="1";}catch(_e){}
    window.kantAdminUnlockAll=enabled&&isAdmin();
    const input=$("#adminUnlockAllModules");if(input)input.checked=window.kantAdminUnlockAll;
  }

  async function refreshPublicContent(){
    if(typeof window.kantLoadContent==="function") await window.kantLoadContent();
  }

  async function bootAdmin(){
    if(!isAdmin())return;
    restoreAdminTestMode();
    try{
      if(window.kantAdminUnlockAll&&typeof window.kantLoadContent==="function")await window.kantLoadContent();
      await loadModules();await loadOverview();
    }catch(err){status(err.message,"err");}
  }

  document.addEventListener("click",e=>{
    const tab=e.target.closest?.(".admin-tab");if(tab){setTab(tab.dataset.adminTab);return;}
    if(e.target.closest?.("#adminNewModule")){clearModuleForm();$("#adminModuleTitle")?.focus();}
    if(e.target.closest?.("#adminDeleteModule"))deleteModule();
    if(e.target.closest?.("#adminTogglePublish"))togglePublish();
    if(e.target.closest?.("#adminAddTheory"))newTheory();
    if(e.target.closest?.("#adminCancelTheory"))$("#adminTheoryEditor").hidden=true;
    if(e.target.closest?.("#adminAddQuestion"))newQuestion();
    if(e.target.closest?.("#adminCancelQuestion"))$("#adminQuestionEditor").hidden=true;
    if(e.target.closest?.("#adminRefreshUsers"))loadUsers();
  });
  $("#adminModuleForm")?.addEventListener("submit",saveModule);
  $("#adminTheoryForm")?.addEventListener("submit",saveTheory);
  $("#adminQuestionForm")?.addEventListener("submit",saveQuestion);
  $("#adminUserSearch")?.addEventListener("input",renderUsers);
  $("#adminTheoryImage")?.addEventListener("change",()=>previewFile("#adminTheoryImage","#adminTheoryImagePreview"));
  $("#adminFormulaImage")?.addEventListener("change",()=>previewFile("#adminFormulaImage","#adminFormulaImagePreview"));
  $("#adminExampleImage")?.addEventListener("change",()=>previewFile("#adminExampleImage","#adminExampleImagePreview"));
  $("#adminQuestionImage")?.addEventListener("change",()=>previewFile("#adminQuestionImage","#adminQuestionImagePreview"));
  $("#adminExplanationImage")?.addEventListener("change",()=>previewFile("#adminExplanationImage","#adminExplanationImagePreview"));
  $("#adminRemoveTheoryImage")?.addEventListener("click",()=>{state.theoryImageUrl="";if($("#adminTheoryImage"))$("#adminTheoryImage").value="";setImagePreview("#adminTheoryImagePreview","");});
  $("#adminRemoveFormulaImage")?.addEventListener("click",()=>{state.formulaImageUrl="";if($("#adminFormulaImage"))$("#adminFormulaImage").value="";setImagePreview("#adminFormulaImagePreview","");});
  $("#adminRemoveExampleImage")?.addEventListener("click",()=>{state.exampleImageUrl="";if($("#adminExampleImage"))$("#adminExampleImage").value="";setImagePreview("#adminExampleImagePreview","");});
  $("#adminRemoveQuestionImage")?.addEventListener("click",()=>{state.questionImageUrl="";if($("#adminQuestionImage"))$("#adminQuestionImage").value="";setImagePreview("#adminQuestionImagePreview","");});
  $("#adminRemoveExplanationImage")?.addEventListener("click",()=>{state.explanationImageUrl="";if($("#adminExplanationImage"))$("#adminExplanationImage").value="";setImagePreview("#adminExplanationImagePreview","");});

  $("#adminUnlockAllModules")?.addEventListener("change",e=>{applyAdminTestMode(e.target.checked).catch(err=>status(err.message,"err"));});

  window.addEventListener("geoquest:user-ready",bootAdmin);
  window.addEventListener("kant:content-ready",()=>{if(isAdmin())loadOverview();});
})();
