(() => {
  const bank = window.KANT_QUESTIONS || [];
  const module1 = window.KANT_MODULE_1;

  const $ = (s) => document.querySelector(s);
  const screens = ["home","challenges","profile","game","results"].reduce((o,id)=>(o[id]=$("#"+id),o),{});

  let mode="quick", questions=[], idx=0, lives=3, xp=0, streak=0, bestStreak=0, score=0, answered=false, lightning=false;
  let timerId=null, endAt=0;
  let lastMode="quick";
  let currentPhaseIndex=null;
  let lastPhaseIndex=null;

  function setNavActive(name){
    const map={home:"navHome",challenges:"navChallenges",profile:"navProfile"};
    ["navHome","navChallenges","navProfile"].forEach(id=>document.getElementById(id)?.classList.remove("active"));
    if(map[name]) document.getElementById(map[name])?.classList.add("active");
  }

  function syncProfileScreen(){
    const largeAvatar=document.getElementById("profileAvatarLarge");
    const headerAvatar=document.getElementById("headerAvatar");
    const profileName=document.getElementById("profileNameLarge");
    const profileEmail=document.getElementById("profileEmailLarge");
    const profileLevel=document.getElementById("profileLevelMirror");
    const profileXp=document.getElementById("profileXpMirror");

    if(largeAvatar && headerAvatar){
      const avatarImg=headerAvatar.querySelector("img");
      if(avatarImg){
        largeAvatar.innerHTML="";
        const img=document.createElement("img");
        img.src=avatarImg.src;
        img.alt="Avatar do jogador";
        largeAvatar.appendChild(img);
      }else{
        largeAvatar.textContent=headerAvatar.textContent || "K";
      }
    }
    if(profileName) profileName.textContent=document.getElementById("accountUser")?.textContent || "Jogador";
    if(profileEmail) profileEmail.textContent=document.getElementById("menuUserEmail")?.textContent || "—";
    if(profileLevel) profileLevel.textContent=document.getElementById("globalLevel")?.textContent || "Nível 1";
    if(profileXp) profileXp.textContent=document.getElementById("globalXpText")?.textContent || "0 XP";
  }

  function show(name){
    Object.values(screens).forEach(x=>x?.classList.remove("active"));
    screens[name]?.classList.add("active");
    setNavActive(name);
    if(name === "profile") syncProfileScreen();
    if(name === "home") renderModuleProgress();
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function shuffle(arr){
    const a=[...arr];
    for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
    return a;
  }

  function progressKey(){
    const identity=window.geoquestCurrentUserId || document.getElementById("menuUserEmail")?.textContent || "local";
    return `geoquest:${identity}:modulo-1`;
  }

  function getModuleProgress(){
    try{
      const parsed=JSON.parse(localStorage.getItem(progressKey()) || "{}");
      const completed=Array.isArray(parsed.completed) ? parsed.completed.filter(n=>Number.isInteger(n) && n>=0 && n<5) : [];
      return {completed:[...new Set(completed)].sort((a,b)=>a-b)};
    }catch(_e){
      return {completed:[]};
    }
  }

  function saveModuleProgress(progress){
    try{
      localStorage.setItem(progressKey(), JSON.stringify({completed:progress.completed,updatedAt:new Date().toISOString()}));
    }catch(_e){}
  }

  function isPhaseUnlocked(phaseIndex, progress=getModuleProgress()){
    if(phaseIndex===0) return true;
    return progress.completed.includes(phaseIndex-1);
  }

  function firstOpenPhase(progress=getModuleProgress()){
    for(let i=0;i<module1.fases.length;i++){
      if(!progress.completed.includes(i) && isPhaseUnlocked(i,progress)) return i;
    }
    return 0;
  }

  function renderModuleProgress(){
    if(!module1) return;
    const progress=getModuleProgress();
    const total=module1.fases.length;
    const done=progress.completed.length;
    const pct=Math.round(done/total*100);
    const text=document.getElementById("moduleOneProgressText");
    const bar=document.getElementById("moduleOneProgressBar");
    const continueBtn=document.getElementById("moduleOneContinueBtn");
    const note=document.getElementById("moduleOneNote");
    if(text) text.textContent=`${pct}%`;
    if(bar) bar.style.width=`${pct}%`;

    document.querySelectorAll("[data-module-phase]").forEach((el)=>{
      const phaseIndex=Number(el.dataset.modulePhase);
      const completed=progress.completed.includes(phaseIndex);
      const unlocked=isPhaseUnlocked(phaseIndex,progress);
      el.disabled=!unlocked;
      el.classList.toggle("locked",!unlocked);
      el.classList.toggle("done",completed);
      el.classList.toggle("current",unlocked && !completed && firstOpenPhase(progress)===phaseIndex);
      const state=el.querySelector(".phase-state");
      const badge=el.querySelector(".phase-badge");
      if(state) state.textContent=completed ? "✓" : unlocked ? "▶" : "🔒";
      if(badge) badge.textContent=completed ? "✓" : String(phaseIndex+1);
    });

    if(continueBtn){
      if(done===total){
        continueBtn.textContent="↻ Revisar módulo desde a fase 1";
      }else{
        const next=firstOpenPhase(progress);
        continueBtn.textContent=`▶ Continuar: fase ${next+1}`;
      }
    }
    if(note){
      note.textContent=done===total
        ? "Módulo concluído. Todas as fases estão liberadas para revisão."
        : `${done} de ${total} fases concluídas • as próximas etapas são liberadas em sequência.`;
    }
  }

  function normalizeModuleQuestion(q,phase,phaseIndex){
    return {
      id:q.id,
      topic:phase.titulo,
      visual:`Fase ${phaseIndex+1} • ${phase.titulo}`,
      q:q.enunciado,
      opts:[...q.alternativas],
      a:q.correta,
      exp:q.explicacao,
      hint:q.dica || "",
      difficulty:q.dificuldade,
      xpValue:q.xp,
      moduleQuestion:true,
      phaseIndex
    };
  }

  function startModulePhase(phaseIndex){
    if(!module1 || !module1.fases[phaseIndex]) return;
    const progress=getModuleProgress();
    if(!isPhaseUnlocked(phaseIndex,progress)) return;

    const phase=module1.fases[phaseIndex];
    lastMode="module";
    mode="module";
    currentPhaseIndex=phaseIndex;
    lastPhaseIndex=phaseIndex;
    questions=phase.questoes.map(q=>normalizeModuleQuestion(q,phase,phaseIndex));
    idx=0;lives=3;xp=0;streak=0;bestStreak=0;score=0;answered=false;lightning=false;
    $("#modeLabel").textContent=`Módulo 1 • Fase ${phaseIndex+1}`;
    $("#lightningToggle").style.display="none";
    show("game");
    render();
  }

  function startModuleContinue(){
    const progress=getModuleProgress();
    startModulePhase(firstOpenPhase(progress));
  }

  function buildSet(m){
    if(m==="quick") return shuffle(bank).slice(0,10);
    if(m==="lightning") return shuffle(bank).slice(0,10);
    return [...bank];
  }

  function start(m){
    lastMode=m; mode=m; currentPhaseIndex=null; questions=buildSet(m); idx=0; lives=3; xp=0; streak=0; bestStreak=0; score=0; answered=false;
    lightning = (m==="lightning");
    $("#modeLabel").textContent = m==="campaign" ? "Campanha livre" : m==="quick" ? "Batalha Rápida" : "Desafio Relâmpago";
    $("#lightningToggle").style.display = m==="lightning" ? "none" : "inline-block";
    show("game");
    render();
  }

  function updateStats(){
    $("#lives").textContent=lives+" ❤️";
    $("#xp").textContent=xp;
    $("#streak").textContent=streak+" 🔥";
    $("#score").textContent=score;
    const pct=Math.round((idx/questions.length)*100);
    $("#progressText").textContent=pct+"%";
    $("#progressBar").style.width=pct+"%";
  }

  function resetHint(q){
    const area=$("#hintArea");
    const btn=$("#hintBtn");
    const box=$("#hintBox");
    if(!area || !btn || !box) return;
    box.hidden=true;
    box.textContent="";
    btn.style.display=q.hint ? "inline-flex" : "none";
    btn.disabled=false;
    btn.textContent="💡 Ver dica";
    area.style.display=q.hint ? "block" : "none";
  }

  function render(){
    clearTimer();
    if(idx>=questions.length){finish();return;}
    answered=false;
    const q=questions[idx];
    $("#topic").textContent=q.topic;
    $("#counter").textContent=`Questão ${idx+1} de ${questions.length}`;
    $("#levelLabel").textContent=mode==="module" ? `Fase ${currentPhaseIndex+1}` : `Nível ${(q.level ?? 0)+1}`;
    if(q.image){
      $("#visual").innerHTML="";
      const img=document.createElement("img");
      img.src=q.image;
      img.alt="Figura de geometria analítica usada na questão";
      $("#visual").appendChild(img);
    }else{
      $("#visual").textContent=q.visual || "";
    }
    $("#question").textContent=q.q;
    $("#feedback").innerHTML="";
    $("#nextBtn").style.display="none";
    $("#options").innerHTML="";
    resetHint(q);
    q.opts.forEach((opt,i)=>{
      const b=document.createElement("button");
      b.className="option";
      b.textContent=String.fromCharCode(65+i)+") "+opt;
      b.addEventListener("click",()=>answer(i,b));
      $("#options").appendChild(b);
    });
    updateStats();
    if(lightning) startTimer();
    else $("#timerWrap").style.display="none";
  }

  function answer(choice,btn){
    if(answered)return;
    answered=true;
    clearTimer();
    const q=questions[idx];
    const opts=[...document.querySelectorAll(".option")];
    opts.forEach((b,i)=>{b.disabled=true;if(i===q.a)b.classList.add("correct")});
    if(choice===q.a){
      score++;
      streak++;
      bestStreak=Math.max(bestStreak,streak);
      let gain;
      if(q.moduleQuestion){
        gain=Number(q.xpValue)||0;
      }else{
        gain=100 + (q.level||0)*25 + Math.min(streak*15,75);
        if(lightning) gain+=100;
      }
      xp+=gain;
      if(window.geoquestAddXP) window.geoquestAddXP(gain);
      $("#feedback").innerHTML=`<span class="ok"><b>✅ Acertou!</b> +${gain} XP</span><br><span class="feedback-explanation">${q.exp}</span>`;
    }else{
      lives=Math.max(0,lives-1);
      streak=0;
      btn.classList.add("wrong");
      $("#feedback").innerHTML=`<span class="no"><b>❌ Resposta incorreta.</b></span><br><span class="feedback-explanation">${q.exp}</span>`;
    }
    $("#hintBtn") && ($("#hintBtn").disabled=true);
    $("#nextBtn").style.display="inline-block";
    updateStats();
  }

  function timeout(){
    if(answered)return;
    answered=true;
    const q=questions[idx];
    lives=Math.max(0,lives-1);
    streak=0;
    [...document.querySelectorAll(".option")].forEach((b,i)=>{b.disabled=true;if(i===q.a)b.classList.add("correct")});
    $("#feedback").innerHTML=`<span class="no"><b>⏱️ Tempo esgotado.</b></span><br><span class="feedback-explanation">${q.exp}</span>`;
    $("#nextBtn").style.display="inline-block";
    updateStats();
  }

  function startTimer(){
    $("#timerWrap").style.display="block";
    endAt=performance.now()+15000;
    tick();
  }

  function tick(){
    const rem=Math.max(0,endAt-performance.now());
    $("#timerText").textContent=(rem/1000).toFixed(1).replace(".",",")+" s";
    $("#timerBar").style.width=(rem/15000*100)+"%";
    if(rem<=0){timeout();return;}
    timerId=requestAnimationFrame(tick);
  }

  function clearTimer(){
    if(timerId){cancelAnimationFrame(timerId);timerId=null;}
  }

  function next(){
    idx++;
    if(lives<=0) lives=3;
    render();
  }

  function completeCurrentPhase(){
    if(mode!=="module" || currentPhaseIndex===null) return;
    const progress=getModuleProgress();
    if(!progress.completed.includes(currentPhaseIndex)){
      progress.completed.push(currentPhaseIndex);
      progress.completed.sort((a,b)=>a-b);
      saveModuleProgress(progress);
    }
    renderModuleProgress();
  }

  async function finish(){
    clearTimer();
    if(mode==="module") completeCurrentPhase();
    $("#rScore").textContent=score;
    $("#rTotal").textContent=questions.length;
    $("#rXp").textContent=xp;
    $("#rStreak").textContent=bestStreak;
    const rate=questions.length ? Math.round(score/questions.length*100) : 0;
    const continuePhaseBtn=$("#continuePhaseBtn");

    if(mode==="module"){
      const phase=module1.fases[currentPhaseIndex];
      const hasNext=currentPhaseIndex < module1.fases.length-1;
      $("#resultMessage").textContent = hasNext
        ? `${phase.titulo} concluída com ${rate}% de acertos. A próxima fase foi desbloqueada.`
        : `Módulo 1 concluído com ${rate}% de acertos nesta fase. Todas as etapas estão liberadas para revisão.`;
      if(continuePhaseBtn){
        continuePhaseBtn.style.display=hasNext ? "inline-block" : "none";
        continuePhaseBtn.textContent=hasNext ? `Fase ${currentPhaseIndex+2} →` : "";
      }
      $("#againBtn").textContent="Refazer esta fase";
    }else{
      $("#resultMessage").textContent =
        rate>=85 ? "Excelente domínio. Você chegou forte nesta rodada." :
        rate>=65 ? "Bom desempenho. Vale revisar os erros antes de outra rodada." :
        "A base está sendo construída. Refaça a rodada e observe as explicações dos erros.";
      if(continuePhaseBtn) continuePhaseBtn.style.display="none";
      $("#againBtn").textContent="Jogar novamente";
    }

    show("results");
    if(window.geoquestFlushXP){
      try{ await window.geoquestFlushXP(); }catch(_e){}
    }
  }

  document.querySelectorAll("[data-mode]").forEach(el=>el.addEventListener("click",()=>start(el.dataset.mode)));
  document.querySelectorAll("[data-module-start]").forEach(el=>el.addEventListener("click",startModuleContinue));
  document.querySelectorAll("[data-module-phase]").forEach(el=>el.addEventListener("click",()=>startModulePhase(Number(el.dataset.modulePhase))));

  document.getElementById("navHome")?.addEventListener("click",()=>show("home"));
  document.getElementById("navChallenges")?.addEventListener("click",()=>show("challenges"));
  document.getElementById("navProfile")?.addEventListener("click",()=>show("profile"));
  document.getElementById("profileChangePhotoBtn")?.addEventListener("click",()=>document.getElementById("settingsBtn")?.click());
  document.getElementById("goChallengesFromModule")?.addEventListener("click",()=>show("challenges"));
  document.getElementById("unlockChallengesBtn")?.addEventListener("click",()=>show("challenges"));

  function resetRunState(){
    clearTimer();idx=0;lives=3;xp=0;streak=0;bestStreak=0;score=0;answered=false;lightning=false;currentPhaseIndex=null;
  }

  function leaveRun(){
    clearTimer();show("home");
    if(window.geoquestFlushXP) Promise.resolve(window.geoquestFlushXP()).catch(()=>{});
    resetRunState();
  }

  $("#nextBtn")?.addEventListener("click",next);
  $("#hintBtn")?.addEventListener("click",()=>{
    if(answered) return;
    const q=questions[idx];
    if(!q?.hint) return;
    const box=$("#hintBox");
    const btn=$("#hintBtn");
    box.textContent=q.hint;
    box.hidden=false;
    btn.textContent="💡 Dica aberta";
    btn.disabled=true;
  });

  $("#restartBtn")?.addEventListener("click",(event)=>{
    event.preventDefault();clearTimer();
    if(mode==="module" && currentPhaseIndex!==null) startModulePhase(currentPhaseIndex); else start(mode);
  });
  $("#backBtn")?.addEventListener("click",(event)=>{event.preventDefault();leaveRun();});
  $("#quitRunBtn")?.addEventListener("click",(event)=>{event.preventDefault();leaveRun();});
  $("#continuePhaseBtn")?.addEventListener("click",()=>{
    if(lastPhaseIndex!==null && lastPhaseIndex<module1.fases.length-1) startModulePhase(lastPhaseIndex+1);
  });
  $("#againBtn")?.addEventListener("click",()=>{
    if(lastMode==="module" && lastPhaseIndex!==null) startModulePhase(lastPhaseIndex); else start(lastMode);
  });
  $("#menuBtn")?.addEventListener("click",()=>show("home"));
  $("#lightningToggle")?.addEventListener("click",()=>{
    if(answered || mode==="module")return;
    lightning=!lightning;
    $("#lightningToggle").textContent=lightning?"Desativar Relâmpago":"Ativar Relâmpago";
    clearTimer();
    if(lightning) startTimer(); else $("#timerWrap").style.display="none";
  });

  window.addEventListener("geoquest:user-ready",renderModuleProgress);
  renderModuleProgress();
})();
