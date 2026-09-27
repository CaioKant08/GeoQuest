(() => {
  const $=(s,root=document)=>root.querySelector(s);
  const $$=(s,root=document)=>[...root.querySelectorAll(s)];
  const state={modules:[],selectedModuleId:null,theory:[],questions:[],editingTheoryId:null,editingQuestionId:null,users:[],progress:[]};

  const esc=(v)=>String(v??"").replace(/[&<>'"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
  const db=()=>window.kantDb;
  const isAdmin=()=>window.kantIsAdmin===true;

  function status(message,type="ok"){
    const el=$("#adminStatus"); if(!el)return;
    el.textContent=message||"";
    el.className=`admin-status ${message?"show":""} ${type}`;
    if(message) setTimeout(()=>{if(el.textContent===message)el.className="admin-status";},4500);
  }

  async function requireAdmin(){
    if(!isAdmin()||!db()) throw new Error("Acesso administrativo não autorizado.");
  }

  function setTab(name){
    $$(".admin-tab").forEach(b=>b.classList.toggle("active",b.dataset.adminTab===name));
    $$(".admin-panel").forEach(p=>p.hidden=p.dataset.adminPanel!==name);
    if(name==="users") loadUsers();
    if(name==="overview") loadOverview();
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
      .select("id,module_id,position,titulo,texto,formula,exemplo,published")
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
    state.editingTheoryId=null; $("#adminTheoryForm").reset();
    $("#adminTheoryPosition").value=(state.theory.length+1); $("#adminTheoryPublished").checked=true;
    $("#adminTheoryEditor").hidden=false; $("#adminTheoryTitle").focus();
  }
  function editTheory(r){
    state.editingTheoryId=r.id; $("#adminTheoryTitle").value=r.titulo||""; $("#adminTheoryText").value=r.texto||""; $("#adminTheoryFormula").value=r.formula||""; $("#adminTheoryExample").value=r.exemplo||""; $("#adminTheoryPosition").value=r.position||1; $("#adminTheoryPublished").checked=!!r.published; $("#adminTheoryEditor").hidden=false;
  }
  async function saveTheory(e){
    e.preventDefault(); if(!state.selectedModuleId)return;
    const payload={module_id:state.selectedModuleId,position:Number($("#adminTheoryPosition").value)||1,titulo:$("#adminTheoryTitle").value.trim(),texto:$("#adminTheoryText").value.trim(),formula:$("#adminTheoryFormula").value.trim(),exemplo:$("#adminTheoryExample").value.trim(),published:$("#adminTheoryPublished").checked,updated_at:new Date().toISOString()};
    let q=state.editingTheoryId?db().from("theory_blocks").update(payload).eq("id",state.editingTheoryId):db().from("theory_blocks").insert(payload);
    const {error}=await q;if(error)return status(error.message,"err");
    $("#adminTheoryEditor").hidden=true;state.editingTheoryId=null;status("Bloco teórico salvo.");await loadTheory(state.selectedModuleId);await refreshPublicContent();
  }
  async function deleteTheory(id){if(!confirm("Excluir este bloco teórico?"))return;const {error}=await db().from("theory_blocks").delete().eq("id",id);if(error)return status(error.message,"err");await loadTheory(state.selectedModuleId);await refreshPublicContent();}

  async function loadQuestions(moduleId){
    const {data,error}=await db().from("questions")
      .select("id,module_id,position,dificuldade,xp,enunciado,alternativas,correta,dica,explicacao,published")
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
  function newQuestion(){state.editingQuestionId=null;$("#adminQuestionForm").reset();$("#adminQuestionPosition").value=state.questions.length+1;$("#adminQuestionXp").value=30;$("#adminQuestionPublished").checked=true;$("#adminQuestionEditor").hidden=false;$("#adminQuestionText").focus();}
  function editQuestion(r){
    state.editingQuestionId=r.id;$("#adminQuestionText").value=r.enunciado||"";$("#adminQuestionDifficulty").value=r.dificuldade||"media";$("#adminQuestionXp").value=r.xp||0;$("#adminQuestionPosition").value=r.position||1;$("#adminQuestionCorrect").value=Number(r.correta)||0;$("#adminQuestionHint").value=r.dica||"";$("#adminQuestionExplanation").value=r.explicacao||"";$("#adminQuestionPublished").checked=!!r.published;const alts=Array.isArray(r.alternativas)?r.alternativas:[];for(let i=0;i<4;i++)$("#adminAlt"+i).value=alts[i]||"";$("#adminQuestionEditor").hidden=false;
  }
  async function saveQuestion(e){
    e.preventDefault();if(!state.selectedModuleId)return;
    const alternatives=[0,1,2,3].map(i=>$("#adminAlt"+i).value.trim());if(alternatives.some(x=>!x))return status("Preencha as quatro alternativas.","err");
    const id=state.editingQuestionId||`q-${Date.now()}`;
    const payload={id,module_id:state.selectedModuleId,position:Number($("#adminQuestionPosition").value)||1,dificuldade:$("#adminQuestionDifficulty").value,xp:Math.max(0,Number($("#adminQuestionXp").value)||0),enunciado:$("#adminQuestionText").value.trim(),alternativas:alternatives,correta:Number($("#adminQuestionCorrect").value)||0,dica:$("#adminQuestionHint").value.trim(),explicacao:$("#adminQuestionExplanation").value.trim(),published:$("#adminQuestionPublished").checked,updated_at:new Date().toISOString()};
    const {error}=await db().from("questions").upsert(payload,{onConflict:"id"});if(error)return status(error.message,"err");$("#adminQuestionEditor").hidden=true;state.editingQuestionId=null;status("Questão salva. XP e conteúdo atualizados globalmente.");await loadQuestions(state.selectedModuleId);await refreshPublicContent();await loadOverview();
  }
  async function deleteQuestion(id){if(!confirm("Excluir esta questão?"))return;const {error}=await db().from("questions").delete().eq("id",id);if(error)return status(error.message,"err");await loadQuestions(state.selectedModuleId);await refreshPublicContent();await loadOverview();}

  async function loadUsers(){
    if(!isAdmin())return;
    const [{data:users,error:userError},{data:progress,error:progressError},{data:mods,error:modError}]=await Promise.all([
      db().rpc("admin_list_users"),
      db().from("user_module_progress").select("user_id,module_id,best,completed,attempts,updated_at"),
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
    if(next){const r=byId.get(next.id);return `Módulo ${next.numero}${r?` — ${r.best}%`:" — não iniciado"}`;}
    return "Trilha concluída";
  }

  function renderUsers(){
    const body=$("#adminUsersBody");if(!body)return;body.innerHTML="";
    const term=($("#adminUserSearch")?.value||"").trim().toLowerCase();
    state.users.filter(u=>!term||`${u.display_name||""} ${u.email||""}`.toLowerCase().includes(term)).forEach(u=>{
      const tr=document.createElement("tr");
      tr.innerHTML=`<td><b>${esc(u.display_name||"Jogador")}</b><small>${esc(u.email||"e-mail ainda não sincronizado")}</small></td><td>${esc(currentModuleFor(u.id))}</td><td><input class="admin-xp-input" type="number" min="0" step="1" value="${Number(u.xp)||0}"></td><td><select class="admin-role-select"><option value="user" ${u.role!=="admin"?"selected":""}>Usuário</option><option value="admin" ${u.role==="admin"?"selected":""}>Administrador</option></select></td><td><button class="btn secondary admin-save-user" type="button">Salvar</button></td>`;
      $(".admin-save-user",tr).onclick=()=>saveUser(u.id,tr);body.appendChild(tr);
    });
    if(!body.children.length)body.innerHTML='<tr><td colspan="5" class="admin-empty">Nenhum usuário encontrado.</td></tr>';
  }
  async function saveUser(id,row){
    const xp=Math.max(0,Number($(".admin-xp-input",row).value)||0),role=$(".admin-role-select",row).value;
    const {error}=await db().from("profiles").update({xp,role,updated_at:new Date().toISOString()}).eq("id",id);if(error)return status(error.message,"err");status("Usuário atualizado.");await loadUsers();
  }

  async function refreshPublicContent(){
    if(typeof window.kantLoadContent==="function") await window.kantLoadContent();
  }

  async function bootAdmin(){
    if(!isAdmin())return;
    try{await loadModules();await loadOverview();}catch(err){status(err.message,"err");}
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

  window.addEventListener("geoquest:user-ready",bootAdmin);
  window.addEventListener("kant:content-ready",()=>{if(isAdmin())loadOverview();});
})();
