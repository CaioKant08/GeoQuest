(() => {
  const modules = window.KANT_MODULES || [];
  const bank = window.KANT_QUESTIONS || [];
  const $ = (s) => document.querySelector(s);
  const screens = ["home","moduleStudy","challenges","profile","game","results"].reduce((o,id)=>(o[id]=$("#"+id),o),{});

  let mode="quick", questions=[], idx=0, lives=3, xp=0, streak=0, bestStreak=0, score=0, answered=false, lightning=false;
  let timerId=null, endAt=0, lastMode="quick";
  let currentModuleId=null, lastModuleId=null, studyModuleId=null;

  const moduleById=(id)=>modules.find(m=>m.id===id);

  function setNavActive(name){
    const map={home:"navHome",challenges:"navChallenges",profile:"navProfile"};
    ["navHome","navChallenges","navProfile"].forEach(id=>document.getElementById(id)?.classList.remove("active"));
    if(map[name]) document.getElementById(map[name])?.classList.add("active");
  }
  function syncProfileScreen(){
    const largeAvatar=document.getElementById("profileAvatarLarge"), headerAvatar=document.getElementById("headerAvatar");
    const profileName=document.getElementById("profileNameLarge"), profileEmail=document.getElementById("profileEmailLarge");
    const profileLevel=document.getElementById("profileLevelMirror"), profileXp=document.getElementById("profileXpMirror");
    if(largeAvatar && headerAvatar){ const img=headerAvatar.querySelector("img"); if(img){largeAvatar.innerHTML=""; const clone=document.createElement("img"); clone.src=img.src; clone.alt="Avatar do jogador"; largeAvatar.appendChild(clone);} else largeAvatar.textContent=headerAvatar.textContent||"K"; }
    if(profileName) profileName.textContent=document.getElementById("accountUser")?.textContent||"Jogador";
    if(profileEmail) profileEmail.textContent=document.getElementById("menuUserEmail")?.textContent||"—";
    if(profileLevel) profileLevel.textContent=document.getElementById("globalLevel")?.textContent||"Nível 1";
    if(profileXp) profileXp.textContent=document.getElementById("globalXpText")?.textContent||"0 XP";
  }
  function show(name){
    Object.values(screens).forEach(x=>x?.classList.remove("active")); screens[name]?.classList.add("active"); setNavActive(name);
    if(name==="profile") syncProfileScreen(); if(name==="home") renderModules(); window.scrollTo({top:0,behavior:"smooth"});
  }
  function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

  function identity(){return window.geoquestCurrentUserId || document.getElementById("menuUserEmail")?.textContent || "local";}
  function progressKey(){return `geoquest:${identity()}:modules-v3`;}
  function getProgress(){try{return JSON.parse(localStorage.getItem(progressKey())||"{}");}catch(_e){return {};}}
  function saveProgress(p){try{localStorage.setItem(progressKey(),JSON.stringify(p));}catch(_e){}}
  function moduleResult(id){const p=getProgress(); return p[id]||{best:0,completed:false,attempts:0};}
  function isUnlocked(moduleIndex){if(moduleIndex===0)return true; return !!moduleResult(modules[moduleIndex-1].id).completed;}

  function renderModules(){
    const grid=$("#modulesGrid"); if(!grid)return; grid.innerHTML="";
    modules.forEach((m,i)=>{
      const result=moduleResult(m.id), unlocked=isUnlocked(i), pct=result.completed?100:result.best||0;
      const card=document.createElement("article"); card.className=`module-card learning-card ${m.cor} ${unlocked?"":"locked"}`;
      card.innerHTML=`
        <div class="module-top"><div class="module-num">${m.numero}</div><button class="module-arrow" type="button" ${unlocked?"":"disabled"}>›</button></div>
        <div class="module-heading"><h3>Módulo ${m.numero}</h3><h4>${m.titulo}</h4><p>${m.descricao}</p></div>
        <div class="module-art learning-module-art"><span class="art-label">${m.subtitulo}</span><div class="module-symbol">${m.icone}</div><div class="module-path-lines"><i></i><i></i><i></i></div></div>
        <div class="module-progress learning-progress">
          <div class="progress-top"><span>Domínio</span><b>${pct}%</b></div><div class="bar"><span style="width:${pct}%"></span></div>
          <div class="learning-steps">
            <div><span>01</span><b>Teoria</b><small>conceitos + fórmulas</small></div>
            <div><span>02</span><b>Exemplo</b><small>resolução guiada</small></div>
            <div><span>03</span><b>Prática</b><small>${m.questoes.length} questões</small></div>
          </div>
          <button class="module-btn module-open-btn" type="button" ${unlocked?"":"disabled"}>${unlocked?(result.completed?"↻ Revisar módulo":"▶ Abrir módulo"):"🔒 Conclua o módulo anterior"}</button>
          <div class="module-note">${result.completed?`Concluído • melhor resultado: ${result.best}%`:unlocked?"Estude a teoria antes de iniciar a prática.":"Desbloqueado ao atingir 70% no módulo anterior."}</div>
        </div>`;
      if(unlocked){ card.querySelectorAll(".module-arrow,.module-open-btn").forEach(btn=>btn.addEventListener("click",()=>openStudy(m.id))); }
      grid.appendChild(card);
    });
  }

  function openStudy(moduleId){
    const m=moduleById(moduleId); if(!m)return; const index=modules.findIndex(x=>x.id===moduleId); if(!isUnlocked(index))return;
    studyModuleId=moduleId;
    $("#studyModuleNumber").textContent=m.numero; $("#studyKicker").textContent=`Módulo ${m.numero} • ${m.subtitulo}`; $("#studyTitle").textContent=m.titulo; $("#studyDescription").textContent=m.descricao;
    const hero=$("#moduleStudyHero"); hero.className=`module-study-hero study-${m.cor}`;
    const objectives=$("#studyObjectives"); objectives.innerHTML=m.objetivos.map((o,i)=>`<div><span>0${i+1}</span><p>${o}</p></div>`).join("");
    const grid=$("#theoryGrid"); grid.innerHTML=m.teoria.map((t,i)=>`<article class="theory-card"><div class="theory-index">${String(i+1).padStart(2,"0")}</div><h4>${t.titulo}</h4><p>${t.texto}</p><div class="theory-formula">${t.formula}</div><div class="guided-example"><b>Exemplo guiado</b><span>${t.exemplo}</span></div></article>`).join("");
    $("#practiceSummary").textContent=`${m.questoes.length} questões progressivas • feedback imediato • 70% libera o próximo módulo.`;
    show("moduleStudy");
  }

  function normalizeModuleQuestion(q,m){return {id:q.id,topic:m.titulo,visual:`Módulo ${m.numero} • ${m.subtitulo}`,q:q.enunciado,opts:[...q.alternativas],a:q.correta,exp:q.explicacao,hint:q.dica||"",difficulty:q.dificuldade,xpValue:q.xp,moduleQuestion:true,moduleId:m.id};}
  function startModule(moduleId){
    const m=moduleById(moduleId); if(!m)return; lastMode="module";mode="module";currentModuleId=moduleId;lastModuleId=moduleId;questions=m.questoes.map(q=>normalizeModuleQuestion(q,m));
    idx=0;lives=3;xp=0;streak=0;bestStreak=0;score=0;answered=false;lightning=false;$("#modeLabel").textContent=`Módulo ${m.numero} • Prática`;$("#lightningToggle").style.display="none";show("game");render();
  }
  function buildSet(m){if(m==="quick"||m==="lightning")return shuffle(bank).slice(0,10);return shuffle(bank).slice(0,24);}
  function start(m){lastMode=m;mode=m;currentModuleId=null;questions=buildSet(m);idx=0;lives=3;xp=0;streak=0;bestStreak=0;score=0;answered=false;lightning=(m==="lightning");$("#modeLabel").textContent=m==="campaign"?"Revisão integrada":m==="quick"?"Batalha Rápida":"Desafio Relâmpago";$("#lightningToggle").style.display=m==="lightning"?"none":"inline-block";show("game");render();}

  function updateStats(){$("#lives").textContent=lives+" ❤️";$("#xp").textContent=xp;$("#streak").textContent=streak+" 🔥";$("#score").textContent=score;const pct=Math.round((idx/questions.length)*100);$("#progressText").textContent=pct+"%";$("#progressBar").style.width=pct+"%";}
  function resetHint(q){const area=$("#hintArea"),btn=$("#hintBtn"),box=$("#hintBox");if(!area||!btn||!box)return;box.hidden=true;box.textContent="";btn.style.display=q.hint?"inline-flex":"none";btn.disabled=false;btn.textContent="💡 Ver dica";area.style.display=q.hint?"block":"none";}
  function render(){clearTimer();if(idx>=questions.length){finish();return;}answered=false;const q=questions[idx];$("#topic").textContent=q.topic;$("#counter").textContent=`Questão ${idx+1} de ${questions.length}`;$("#levelLabel").textContent=mode==="module"?`Prática • ${q.difficulty||"progressiva"}`:`Nível ${(q.level??0)+1}`;$("#visual").textContent=q.visual||"";$("#question").textContent=q.q;$("#feedback").innerHTML="";$("#nextBtn").style.display="none";$("#options").innerHTML="";resetHint(q);q.opts.forEach((opt,i)=>{const b=document.createElement("button");b.className="option";b.textContent=String.fromCharCode(65+i)+") "+opt;b.addEventListener("click",()=>answer(i,b));$("#options").appendChild(b);});updateStats();if(lightning)startTimer();else $("#timerWrap").style.display="none";}
  function answer(choice,btn){if(answered)return;answered=true;clearTimer();const q=questions[idx],opts=[...document.querySelectorAll(".option")];opts.forEach((b,i)=>{b.disabled=true;if(i===q.a)b.classList.add("correct")});if(choice===q.a){score++;streak++;bestStreak=Math.max(bestStreak,streak);let gain=q.moduleQuestion?(Number(q.xpValue)||0):(100+(q.level||0)*25+Math.min(streak*15,75)+(lightning?100:0));xp+=gain;if(window.geoquestAddXP)window.geoquestAddXP(gain);$("#feedback").innerHTML=`<span class="ok"><b>✅ Acertou!</b> +${gain} XP</span><br><span class="feedback-explanation">${q.exp}</span>`;}else{lives=Math.max(0,lives-1);streak=0;btn.classList.add("wrong");$("#feedback").innerHTML=`<span class="no"><b>❌ Resposta incorreta.</b></span><br><span class="feedback-explanation">${q.exp}</span>`;}if($("#hintBtn"))$("#hintBtn").disabled=true;$("#nextBtn").style.display="inline-block";updateStats();}
  function timeout(){if(answered)return;answered=true;const q=questions[idx];lives=Math.max(0,lives-1);streak=0;[...document.querySelectorAll(".option")].forEach((b,i)=>{b.disabled=true;if(i===q.a)b.classList.add("correct")});$("#feedback").innerHTML=`<span class="no"><b>⏱️ Tempo esgotado.</b></span><br><span class="feedback-explanation">${q.exp}</span>`;$("#nextBtn").style.display="inline-block";updateStats();}
  function startTimer(){$("#timerWrap").style.display="block";endAt=performance.now()+15000;tick();}
  function tick(){const rem=Math.max(0,endAt-performance.now());$("#timerText").textContent=(rem/1000).toFixed(1).replace(".",",")+" s";$("#timerBar").style.width=(rem/15000*100)+"%";if(rem<=0){timeout();return;}timerId=requestAnimationFrame(tick);}
  function clearTimer(){if(timerId){cancelAnimationFrame(timerId);timerId=null;}}
  function next(){idx++;if(lives<=0)lives=3;render();}

  function recordModuleResult(moduleId,rate){const p=getProgress(),prev=p[moduleId]||{best:0,completed:false,attempts:0};p[moduleId]={best:Math.max(prev.best||0,rate),completed:prev.completed||rate>=70,attempts:(prev.attempts||0)+1,updatedAt:new Date().toISOString()};saveProgress(p);}
  async function finish(){clearTimer();$("#rScore").textContent=score;$("#rTotal").textContent=questions.length;$("#rXp").textContent=xp;$("#rStreak").textContent=bestStreak;const rate=questions.length?Math.round(score/questions.length*100):0,continueBtn=$("#continuePhaseBtn");if(mode==="module"){const m=moduleById(currentModuleId);recordModuleResult(currentModuleId,rate);const moduleIndex=modules.findIndex(x=>x.id===currentModuleId),passed=rate>=70,hasNext=moduleIndex<modules.length-1;$("#resultMessage").textContent=passed?(hasNext?`${m.titulo}: ${rate}% de acertos. Próximo módulo desbloqueado.`:`${m.titulo}: ${rate}% de acertos. Trilha principal concluída!`):`${m.titulo}: ${rate}% de acertos. Você precisa de 70% para liberar o próximo módulo.`;if(continueBtn){continueBtn.style.display=passed&&hasNext?"inline-block":"none";continueBtn.textContent=passed&&hasNext?`Abrir módulo ${moduleIndex+2} →`:"";}$("#againBtn").textContent="Refazer prática";}else{$("#resultMessage").textContent=rate>=85?"Excelente domínio. Você chegou forte nesta rodada.":rate>=65?"Bom desempenho. Vale revisar os erros antes de outra rodada.":"A base está sendo construída. Refaça a rodada e observe as explicações dos erros.";if(continueBtn)continueBtn.style.display="none";$("#againBtn").textContent="Jogar novamente";}show("results");if(window.geoquestFlushXP){try{await window.geoquestFlushXP();}catch(_e){}}}

  document.querySelectorAll("[data-mode]").forEach(el=>el.addEventListener("click",()=>start(el.dataset.mode)));
  document.getElementById("navHome")?.addEventListener("click",()=>show("home"));document.getElementById("navChallenges")?.addEventListener("click",()=>show("challenges"));document.getElementById("navProfile")?.addEventListener("click",()=>show("profile"));document.getElementById("profileChangePhotoBtn")?.addEventListener("click",()=>document.getElementById("settingsBtn")?.click());
  $("#studyBackBtn")?.addEventListener("click",()=>show("home"));$("#startModulePracticeBtn")?.addEventListener("click",()=>studyModuleId&&startModule(studyModuleId));
  function resetRunState(){clearTimer();idx=0;lives=3;xp=0;streak=0;bestStreak=0;score=0;answered=false;lightning=false;currentModuleId=null;}
  function leaveRun(){clearTimer();show("home");if(window.geoquestFlushXP)Promise.resolve(window.geoquestFlushXP()).catch(()=>{});resetRunState();}
  $("#nextBtn")?.addEventListener("click",next);$("#hintBtn")?.addEventListener("click",()=>{if(answered)return;const q=questions[idx];if(!q?.hint)return;const box=$("#hintBox"),btn=$("#hintBtn");box.textContent=q.hint;box.hidden=false;btn.textContent="💡 Dica aberta";btn.disabled=true;});
  $("#restartBtn")?.addEventListener("click",(e)=>{e.preventDefault();clearTimer();if(mode==="module"&&currentModuleId)startModule(currentModuleId);else start(mode);});$("#backBtn")?.addEventListener("click",(e)=>{e.preventDefault();leaveRun();});$("#quitRunBtn")?.addEventListener("click",(e)=>{e.preventDefault();leaveRun();});
  $("#continuePhaseBtn")?.addEventListener("click",()=>{if(!lastModuleId)return;const i=modules.findIndex(m=>m.id===lastModuleId);if(i>=0&&i<modules.length-1)openStudy(modules[i+1].id);});$("#againBtn")?.addEventListener("click",()=>{if(lastMode==="module"&&lastModuleId)startModule(lastModuleId);else start(lastMode);});$("#menuBtn")?.addEventListener("click",()=>show("home"));$("#lightningToggle")?.addEventListener("click",()=>{if(answered||mode==="module")return;lightning=!lightning;$("#lightningToggle").textContent=lightning?"Desativar Relâmpago":"Ativar Relâmpago";clearTimer();if(lightning)startTimer();else $("#timerWrap").style.display="none";});
  window.addEventListener("geoquest:user-ready",renderModules);renderModules();
})();
