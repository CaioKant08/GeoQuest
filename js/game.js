(() => {
  let modules = window.KANT_MODULES || [];
  let bank = window.KANT_QUESTIONS || [];
  const $ = (s) => document.querySelector(s);
  const screens = ["home","moduleStudy","challenges","profile","admin","game","results"].reduce((o,id)=>(o[id]=$("#"+id),o),{});

  let mode="quick", questions=[], idx=0, lives=3, xp=0, streak=0, bestStreak=0, score=0, answered=false, lightning=false;
  let timerId=null, endAt=0, lastMode="quick";
  let currentModuleId=null, lastModuleId=null, studyModuleId=null;

  const moduleById=(id)=>modules.find(m=>m.id===id);
  function moduleIconSvg(numero){
    const common='viewBox="0 0 64 64" aria-hidden="true"';
    const map={
      1:`<svg ${common}><circle cx="32" cy="32" r="8" fill="none" stroke="currentColor" stroke-width="4"/><path d="M32 10v14M32 40v14M10 32h14M40 32h14" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><circle cx="32" cy="32" r="2.5" fill="currentColor"/></svg>`,
      2:`<svg ${common}><path d="M14 46L46 14" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><path d="M31 14h15v15" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
      3:`<svg ${common}><path d="M21 12v40M43 12v40" stroke="currentColor" stroke-width="7" stroke-linecap="round"/></svg>`,
      4:`<svg ${common}><path d="M32 10L53 49H11L32 10Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/></svg>`,
      5:`<svg ${common}><circle cx="18" cy="18" r="5" fill="currentColor"/><path d="M14 49L50 17" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><path d="M23 27l8 8" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="3 5" opacity=".72"/></svg>`,
      6:`<svg ${common}><circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="32" cy="32" r="4" fill="currentColor"/><path d="M32 32l14-10" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>`
    };return map[Number(numero)]||map[1];
  }

  function setNavActive(name){
    const map={home:"navHome",challenges:"navChallenges",profile:"navProfile",admin:"navAdmin"};
    ["navHome","navChallenges","navProfile","navAdmin"].forEach(id=>document.getElementById(id)?.classList.remove("active"));
    if(map[name]) document.getElementById(map[name])?.classList.add("active");
  }
  function syncProfileScreen(){
    const largeAvatar=document.getElementById("profileAvatarLarge"), headerAvatar=document.getElementById("headerAvatar");
    const profileName=document.getElementById("profileNameLarge"), profileEmail=document.getElementById("profileEmailLarge");
    const profileLevel=document.getElementById("profileLevelMirror"), profileXp=document.getElementById("profileXpMirror"), profileXpMetric=document.getElementById("profileXpMetric");
    if(largeAvatar && headerAvatar){ const img=headerAvatar.querySelector("img"); if(img){largeAvatar.innerHTML=""; const clone=document.createElement("img"); clone.src=img.src; clone.alt="Avatar do jogador"; largeAvatar.appendChild(clone);} else largeAvatar.textContent=headerAvatar.textContent||"K"; }
    if(profileName) profileName.textContent=document.getElementById("accountUser")?.textContent||"Jogador";
    if(profileEmail) profileEmail.textContent=document.getElementById("menuUserEmail")?.textContent||"—";
    if(profileLevel) profileLevel.textContent=document.getElementById("globalLevel")?.textContent||"Nível 1";
    const xpText=document.getElementById("globalXpText")?.textContent||"0 XP";
    if(profileXp) profileXp.textContent=xpText;
    if(profileXpMetric) profileXpMetric.textContent=xpText;
    const levelBar=document.getElementById("profileLevelBar"), levelProgressText=document.getElementById("profileLevelProgressText"), globalBar=document.getElementById("globalXpBar"), globalNext=document.getElementById("globalXpNext");
    if(levelBar && globalBar) levelBar.style.width=globalBar.style.width||"0%";
    if(levelProgressText && globalNext) levelProgressText.textContent=globalNext.textContent||"0 / 1000 XP";
    renderProfileProgress();
    if(window.kantLoadPerformanceStats)window.kantLoadPerformanceStats();
  }
  function renderProfileProgress(){
    const list=document.getElementById("profileModuleProgressList"); if(!list)return;
    const progress=getProgress(); let completed=0, firstOpen=null;
    list.innerHTML="";
    modules.forEach((m,i)=>{const r=progress[m.id]||{best:0,completed:false};if(r.completed)completed++;if(firstOpen===null&&!r.completed&&isUnlocked(i))firstOpen=m;
      const best=Number(r.best)||0;const pct=r.completed?100:(r.currentTotal?Math.round((Number(r.currentAnswered)||0)/Number(r.currentTotal)*100):0);
      const row=document.createElement("div");row.className="profile-module-row";row.innerHTML=`<span class="profile-module-number">${m.numero}</span><div class="profile-module-copy"><b>${m.titulo}</b><div class="profile-module-track"><span style="width:${Math.max(0,Math.min(100,pct))}%"></span></div></div><div class="profile-module-score"><b>${best?best+"%":"—"}</b><small>melhor</small></div>`;list.appendChild(row);
    });
    const metric=document.getElementById("profileModulesMetric");if(metric)metric.textContent=`${completed}/${modules.length}`;
    const summary=document.getElementById("profileProgressSummary");if(summary)summary.textContent=completed===modules.length?"Trilha principal concluída":`${completed} de ${modules.length} módulos concluídos`;
    const goal=document.getElementById("profileNextGoal"),goalText=document.getElementById("profileNextGoalText");
    if(completed===modules.length){if(goal)goal.textContent="Reforce o que você já conquistou";if(goalText)goalText.textContent="Revise os módulos e tente superar seus melhores resultados.";}
    else if(firstOpen){if(goal)goal.textContent=`Módulo ${firstOpen.numero} — ${firstOpen.titulo}`;if(goalText)goalText.textContent="Estude a teoria, faça a prática e busque pelo menos 70% para seguir.";}
  }
  function show(name){
    Object.values(screens).forEach(x=>x?.classList.remove("active")); screens[name]?.classList.add("active"); setNavActive(name);
    if(name==="profile") syncProfileScreen(); if(name==="home"){renderModules();if(window.kantLoadPerformanceStats)window.kantLoadPerformanceStats();} window.scrollTo({top:0,behavior:"smooth"});
  }
  function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

  function identity(){return window.geoquestCurrentUserId || document.getElementById("menuUserEmail")?.textContent || "local";}
  function progressKey(){return `geoquest:${identity()}:modules-v3`;}
  function getProgress(){try{return JSON.parse(localStorage.getItem(progressKey())||"{}");}catch(_e){return {};}}
  function saveProgress(p){try{localStorage.setItem(progressKey(),JSON.stringify(p));}catch(_e){}}
  function moduleResult(id){const p=getProgress(); return p[id]||{best:0,completed:false,attempts:0,currentAnswered:0,currentCorrect:0,currentTotal:0,inProgress:false};}

  async function syncRemoteProgress(){
    const db=window.kantDb, userId=window.geoquestCurrentUserId;
    if(!db || !userId) return;
    try{
      const {data,error}=await db.from("user_module_progress")
        .select("module_id,best,completed,attempts,current_answered,current_correct,current_total,in_progress,updated_at")
        .eq("user_id",userId);
      if(error) throw error;
      const p=getProgress();
      (data||[]).forEach(row=>{
        p[row.module_id]={best:Number(row.best)||0,completed:!!row.completed,attempts:Number(row.attempts)||0,currentAnswered:Number(row.current_answered)||0,currentCorrect:Number(row.current_correct)||0,currentTotal:Number(row.current_total)||0,inProgress:!!row.in_progress,updatedAt:row.updated_at||null};
      });
      saveProgress(p);
      renderModules();
    }catch(err){
      console.warn("Progresso remoto indisponível:",err?.message||err);
    }
  }
  function isUnlocked(moduleIndex){
    if(window.kantIsAdmin===true && window.kantAdminUnlockAll===true)return true;
    if(moduleIndex===0)return true;
    return !!moduleResult(modules[moduleIndex-1].id).completed;
  }

  function renderModules(){
    const grid=$("#modulesGrid"); if(!grid)return; grid.innerHTML="";
    modules.forEach((m,i)=>{
      const result=moduleResult(m.id), unlocked=isUnlocked(i), adminTest=window.kantIsAdmin===true&&window.kantAdminUnlockAll===true;
      const livePct=result.currentTotal?Math.round((Number(result.currentAnswered)||0)/Number(result.currentTotal)*100):0;
      const pct=result.completed?100:(result.inProgress?livePct:0);
      const best=Number(result.best)||0;
      const bestClass=best>=85?"best-good":best>=70?"best-ok":best>=50?"best-warn":best>0?"best-bad":"best-none";
      const card=document.createElement("article"); card.className=`module-card learning-card ${m.cor} ${unlocked?"":"locked"}`;
      card.innerHTML=`
        <div class="module-top"><div class="module-num">${m.numero}</div><button class="module-arrow" type="button" ${unlocked?"":"disabled"}>›</button></div>
        <div class="module-heading"><h3>Módulo ${m.numero}</h3><h4>${m.titulo}</h4><p>${m.descricao}</p></div>
        <div class="module-art learning-module-art"><div class="module-art-center"><span class="art-label">${m.subtitulo}</span><div class="module-symbol-shell"><div class="module-symbol-glow"></div><div class="module-symbol">${moduleIconSvg(m.numero)}</div></div></div></div>
        <div class="module-progress learning-progress">
          <div class="progress-top"><span>Domínio</span><b>${pct}%</b></div><div class="bar"><span style="width:${pct}%"></span></div>
          <div class="module-best-result ${bestClass}"><span>Melhor resultado</span><b>${best>0?best+"%":"—"}</b></div>
          <div class="learning-steps">
            <div><span>01</span><b>Teoria</b><small>conceitos + fórmulas</small></div>
            <div><span>02</span><b>Exemplo</b><small>resolução guiada</small></div>
            <div><span>03</span><b>Prática</b><small>${m.questoes.length} questões</small></div>
          </div>
          <button class="module-btn module-open-btn" type="button" ${unlocked?"":"disabled"}>${unlocked?(result.inProgress?"▶ Continuar prática":result.completed?"↻ Revisar módulo":"▶ Abrir módulo"):"🔒 Conclua o módulo anterior"}</button>
          <div class="module-note">${adminTest&&!result.completed?"🛡 Modo de teste ADM • módulo liberado somente para você":result.inProgress?`Progresso salvo • ${result.currentAnswered}/${result.currentTotal} questões respondidas`:result.completed?"Módulo concluído. Você pode revisar quando quiser.":unlocked?"Estude a teoria antes de iniciar a prática.":"Desbloqueado ao atingir 70% no módulo anterior."}</div>
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
    const practiceCta=document.querySelector("#moduleStudy .practice-cta"); if(practiceCta) practiceCta.className=`practice-cta practice-${m.cor}`;
    const objectives=$("#studyObjectives"); objectives.innerHTML=m.objetivos.map((o,i)=>`<div><span>0${i+1}</span><p>${o}</p></div>`).join("");
    const grid=$("#theoryGrid"); grid.innerHTML=m.teoria.map((t,i)=>`<article class="theory-card"><div class="theory-index">${String(i+1).padStart(2,"0")}</div><h4>${t.titulo}</h4><p>${t.texto}</p>${t.image_url?`<img class="theory-content-image" src="${t.image_url}" alt="Imagem de apoio do conteúdo">`:""}<div class="theory-formula">${t.formula}</div>${t.formula_image_url?`<img class="theory-inline-image theory-formula-image" src="${t.formula_image_url}" alt="Imagem da fórmula ou resumo">`:""}<div class="guided-example"><b>Exemplo guiado</b><span>${t.exemplo}</span>${t.example_image_url?`<img class="theory-inline-image theory-example-image" src="${t.example_image_url}" alt="Imagem do exemplo guiado">`:""}</div></article>`).join("");
    $("#practiceSummary").textContent=`${m.questoes.length} questões progressivas • feedback imediato • 70% libera o próximo módulo.`;
    show("moduleStudy");
  }

  function normalizeModuleQuestion(q,m){return {id:q.id,topic:m.titulo,visual:`Módulo ${m.numero} • ${m.subtitulo}`,q:q.enunciado,opts:[...q.alternativas],a:q.correta,exp:q.explicacao,hint:q.dica||"",imageUrl:q.image_url||"",explanationImageUrl:q.explanation_image_url||"",difficulty:q.dificuldade,xpValue:q.xp,moduleQuestion:true,moduleId:m.id};}
  function startModule(moduleId){
    const m=moduleById(moduleId); if(!m)return; lastMode="module";mode="module";currentModuleId=moduleId;lastModuleId=moduleId;questions=m.questoes.map(q=>normalizeModuleQuestion(q,m));
    const saved=moduleResult(moduleId);
    const canResume=saved.inProgress && saved.currentTotal===questions.length && saved.currentAnswered>0 && saved.currentAnswered<questions.length;
    idx=canResume?saved.currentAnswered:0; lives=3; xp=0; streak=0; bestStreak=0; score=canResume?saved.currentCorrect:0; answered=false; lightning=false;
    $("#modeLabel").textContent=`Módulo ${m.numero} • Prática`;$("#lightningToggle").style.display="none";
    if(!canResume) recordModuleCheckpoint(false);
    show("game");render();
  }
  function buildSet(m){if(m==="quick"||m==="lightning")return shuffle(bank).slice(0,10);return shuffle(bank).slice(0,24);}
  function start(m){lastMode=m;mode=m;currentModuleId=null;questions=buildSet(m);idx=0;lives=3;xp=0;streak=0;bestStreak=0;score=0;answered=false;lightning=(m==="lightning");$("#modeLabel").textContent=m==="campaign"?"Revisão integrada":m==="quick"?"Batalha Rápida":"Desafio Relâmpago";$("#lightningToggle").style.display=m==="lightning"?"none":"inline-block";show("game");render();}

  function updateStats(){$("#lives").textContent=lives+" ❤️";$("#xp").textContent=xp;$("#streak").textContent=streak+" 🔥";$("#score").textContent=score;const pct=Math.round((idx/questions.length)*100);$("#progressText").textContent=pct+"%";$("#progressBar").style.width=pct+"%";}
  function resetHint(q){const area=$("#hintArea"),btn=$("#hintBtn"),box=$("#hintBox");if(!area||!btn||!box)return;box.hidden=true;box.textContent="";btn.style.display=q.hint?"inline-flex":"none";btn.disabled=false;btn.textContent="💡 Ver dica";area.style.display=q.hint?"block":"none";}
  function render(){clearTimer();if(idx>=questions.length){finish();return;}answered=false;const q=questions[idx];$("#topic").textContent=q.topic;$("#counter").textContent=`Questão ${idx+1} de ${questions.length}`;$("#levelLabel").textContent=mode==="module"?`Prática • ${q.difficulty||"progressiva"}`:`Nível ${(q.level??0)+1}`;$("#visual").textContent=q.visual||"";$("#question").textContent=q.q;$("#feedback").innerHTML="";$("#nextBtn").style.display="none";$("#options").innerHTML="";
    const media=$("#questionMedia"),expMedia=$("#explanationMedia"); if(media){media.innerHTML="";media.hidden=!q.imageUrl;if(q.imageUrl){const img=document.createElement("img");img.src=q.imageUrl;img.alt="Imagem da questão";media.appendChild(img);}} if(expMedia){expMedia.innerHTML="";expMedia.hidden=true;}
    resetHint(q);q.opts.forEach((opt,i)=>{const b=document.createElement("button");b.className="option";b.textContent=String.fromCharCode(65+i)+") "+opt;b.addEventListener("click",()=>answer(i,b));$("#options").appendChild(b);});updateStats();if(lightning)startTimer();else $("#timerWrap").style.display="none";}
  function answer(choice,btn){if(answered)return;answered=true;clearTimer();const q=questions[idx],opts=[...document.querySelectorAll(".option")];if(window.kantRecordAnswer)window.kantRecordAnswer(choice===q.a);opts.forEach((b,i)=>{b.disabled=true;if(i===q.a)b.classList.add("correct")});if(choice===q.a){score++;streak++;bestStreak=Math.max(bestStreak,streak);let gain=q.moduleQuestion?(Number(q.xpValue)||0):(100+(q.level||0)*25+Math.min(streak*15,75)+(lightning?100:0));xp+=gain;if(window.geoquestAddXP)window.geoquestAddXP(gain);$("#feedback").innerHTML=`<span class="ok"><b>✅ Acertou!</b> +${gain} XP</span><br><span class="feedback-explanation">${q.exp}</span>`;}else{lives=Math.max(0,lives-1);streak=0;btn.classList.add("wrong");$("#feedback").innerHTML=`<span class="no"><b>❌ Resposta incorreta.</b></span><br><span class="feedback-explanation">${q.exp}</span>`;}const expMedia=$("#explanationMedia");if(expMedia){expMedia.innerHTML="";expMedia.hidden=!q.explanationImageUrl;if(q.explanationImageUrl){const img=document.createElement("img");img.src=q.explanationImageUrl;img.alt="Imagem da explicação";expMedia.appendChild(img);}}if($("#hintBtn"))$("#hintBtn").disabled=true;$("#nextBtn").style.display="inline-block";updateStats();if(mode==="module")recordModuleCheckpoint(true);}
  function timeout(){if(answered)return;answered=true;const q=questions[idx];if(window.kantRecordAnswer)window.kantRecordAnswer(false);lives=Math.max(0,lives-1);streak=0;[...document.querySelectorAll(".option")].forEach((b,i)=>{b.disabled=true;if(i===q.a)b.classList.add("correct")});$("#feedback").innerHTML=`<span class="no"><b>⏱️ Tempo esgotado.</b></span><br><span class="feedback-explanation">${q.exp}</span>`;const expMedia=$("#explanationMedia");if(expMedia){expMedia.innerHTML="";expMedia.hidden=!q.explanationImageUrl;if(q.explanationImageUrl){const img=document.createElement("img");img.src=q.explanationImageUrl;img.alt="Imagem da explicação";expMedia.appendChild(img);}}$("#nextBtn").style.display="inline-block";updateStats();if(mode==="module")recordModuleCheckpoint(true);}
  function startTimer(){$("#timerWrap").style.display="block";endAt=performance.now()+15000;tick();}
  function tick(){const rem=Math.max(0,endAt-performance.now());$("#timerText").textContent=(rem/1000).toFixed(1).replace(".",",")+" s";$("#timerBar").style.width=(rem/15000*100)+"%";if(rem<=0){timeout();return;}timerId=requestAnimationFrame(tick);}
  function clearTimer(){if(timerId){cancelAnimationFrame(timerId);timerId=null;}}
  function next(){idx++;if(lives<=0)lives=3;render();}

  async function recordModuleCheckpoint(answeredCurrent=false){
    if(mode!=="module"||!currentModuleId||!questions.length)return;
    const answeredCount=Math.min(questions.length,idx+(answeredCurrent?1:0));
    const p=getProgress(),prev=p[currentModuleId]||{best:0,completed:false,attempts:0};
    const next={...prev,currentAnswered:answeredCount,currentCorrect:score,currentTotal:questions.length,inProgress:answeredCount<questions.length,updatedAt:new Date().toISOString()};
    p[currentModuleId]=next;saveProgress(p);renderModules();
    const db=window.kantDb,userId=window.geoquestCurrentUserId;if(db&&userId){
      try{const {error}=await db.from("user_module_progress").upsert({user_id:userId,module_id:currentModuleId,best:Number(next.best)||0,completed:!!next.completed,attempts:Number(next.attempts)||0,current_answered:next.currentAnswered,current_correct:next.currentCorrect,current_total:next.currentTotal,in_progress:next.inProgress,updated_at:next.updatedAt},{onConflict:"user_id,module_id"});if(error)throw error;}catch(err){console.warn("Checkpoint não salvo no Supabase:",err?.message||err);}
    }
  }

  async function recordModuleResult(moduleId,rate){
    const p=getProgress(),prev=p[moduleId]||{best:0,completed:false,attempts:0};
    const next={best:Math.max(prev.best||0,rate),completed:prev.completed||rate>=70,attempts:(prev.attempts||0)+1,currentAnswered:questions.length,currentCorrect:score,currentTotal:questions.length,inProgress:false,updatedAt:new Date().toISOString()};
    p[moduleId]=next; saveProgress(p);
    const db=window.kantDb, userId=window.geoquestCurrentUserId;
    if(db && userId){
      try{
        const {error}=await db.from("user_module_progress").upsert({user_id:userId,module_id:moduleId,best:next.best,completed:next.completed,attempts:next.attempts,current_answered:next.currentAnswered,current_correct:next.currentCorrect,current_total:next.currentTotal,in_progress:false,updated_at:next.updatedAt},{onConflict:"user_id,module_id"});
        if(error) throw error;
      }catch(err){ console.warn("Progresso não salvo no Supabase:",err?.message||err); }
    }
    renderModules();
  }
  async function finish(){clearTimer();$("#rScore").textContent=score;$("#rTotal").textContent=questions.length;$("#rXp").textContent=xp;$("#rStreak").textContent=bestStreak;const rate=questions.length?Math.round(score/questions.length*100):0,continueBtn=$("#continuePhaseBtn");if(mode==="module"){const m=moduleById(currentModuleId);await recordModuleResult(currentModuleId,rate);const moduleIndex=modules.findIndex(x=>x.id===currentModuleId),passed=rate>=70,hasNext=moduleIndex<modules.length-1;$("#resultMessage").textContent=passed?(hasNext?`${m.titulo}: ${rate}% de acertos. Próximo módulo desbloqueado.`:`${m.titulo}: ${rate}% de acertos. Trilha principal concluída!`):`${m.titulo}: ${rate}% de acertos. Você precisa de 70% para liberar o próximo módulo.`;if(continueBtn){continueBtn.style.display=passed&&hasNext?"inline-block":"none";continueBtn.textContent=passed&&hasNext?`Abrir módulo ${moduleIndex+2} →`:"";}$("#againBtn").textContent="Refazer prática";}else{$("#resultMessage").textContent=rate>=85?"Excelente domínio. Você chegou forte nesta rodada.":rate>=65?"Bom desempenho. Vale revisar os erros antes de outra rodada.":"A base está sendo construída. Refaça a rodada e observe as explicações dos erros.";if(continueBtn)continueBtn.style.display="none";$("#againBtn").textContent="Jogar novamente";}show("results");if(window.geoquestFlushXP){try{await window.geoquestFlushXP();}catch(_e){}}}

  document.querySelectorAll("[data-mode]").forEach(el=>el.addEventListener("click",()=>start(el.dataset.mode)));
  document.getElementById("navHome")?.addEventListener("click",()=>show("home"));document.getElementById("navChallenges")?.addEventListener("click",()=>show("challenges"));document.getElementById("navProfile")?.addEventListener("click",()=>show("profile"));document.getElementById("navAdmin")?.addEventListener("click",()=>{if(window.kantIsAdmin)show("admin");});document.getElementById("profileChangePhotoBtn")?.addEventListener("click",()=>document.getElementById("settingsBtn")?.click());
  $("#studyBackBtn")?.addEventListener("click",()=>show("home"));$("#startModulePracticeBtn")?.addEventListener("click",()=>studyModuleId&&startModule(studyModuleId));
  function resetRunState(){clearTimer();idx=0;lives=3;xp=0;streak=0;bestStreak=0;score=0;answered=false;lightning=false;currentModuleId=null;}
  function leaveRun(){clearTimer();if(mode==="module"&&currentModuleId)Promise.resolve(recordModuleCheckpoint(answered)).catch(()=>{});show("home");if(window.geoquestFlushXP)Promise.resolve(window.geoquestFlushXP()).catch(()=>{});resetRunState();}
  $("#nextBtn")?.addEventListener("click",next);$("#hintBtn")?.addEventListener("click",()=>{if(answered)return;const q=questions[idx];if(!q?.hint)return;const box=$("#hintBox"),btn=$("#hintBtn");box.textContent=q.hint;box.hidden=false;btn.textContent="💡 Dica aberta";btn.disabled=true;});
  $("#restartBtn")?.addEventListener("click",(e)=>{e.preventDefault();clearTimer();if(mode==="module"&&currentModuleId)startModule(currentModuleId);else start(mode);});$("#backBtn")?.addEventListener("click",(e)=>{e.preventDefault();leaveRun();});$("#quitRunBtn")?.addEventListener("click",(e)=>{e.preventDefault();leaveRun();});
  $("#continuePhaseBtn")?.addEventListener("click",()=>{if(!lastModuleId)return;const i=modules.findIndex(m=>m.id===lastModuleId);if(i>=0&&i<modules.length-1)openStudy(modules[i+1].id);});$("#againBtn")?.addEventListener("click",()=>{if(lastMode==="module"&&lastModuleId)startModule(lastModuleId);else start(lastMode);});$("#menuBtn")?.addEventListener("click",()=>show("home"));$("#lightningToggle")?.addEventListener("click",()=>{if(answered||mode==="module")return;lightning=!lightning;$("#lightningToggle").textContent=lightning?"Desativar Relâmpago":"Ativar Relâmpago";clearTimer();if(lightning)startTimer();else $("#timerWrap").style.display="none";});
  function refreshContent(){
    modules=window.KANT_MODULES||[];
    bank=window.KANT_QUESTIONS||[];
    renderModules();
  }
  window.addEventListener("kant:content-ready",refreshContent);
  window.addEventListener("geoquest:user-ready",()=>{refreshContent();syncRemoteProgress();});
  renderModules();
  window.addEventListener("kant:admin-test-mode",()=>{renderModules();});
})();
