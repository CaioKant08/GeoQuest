(() => {
  const levels = window.KANT_LEVELS;
  const bank = window.KANT_QUESTIONS;
  

  

  const $ = (s) => document.querySelector(s);
  const screens = ["home","challenges","profile","game","results"].reduce((o,id)=>(o[id]=$("#"+id),o),{});
  let mode="campaign", questions=[], idx=0, lives=3, xp=0, streak=0, bestStreak=0, score=0, answered=false, lightning=false;
  let timerId=null, endAt=0;
  let lastMode="campaign";

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
    Object.values(screens).forEach(x=>x.classList.remove("active"));
    screens[name].classList.add("active");
    setNavActive(name);
    if(name === "profile") syncProfileScreen();
    window.scrollTo({top:0,behavior:"smooth"});
  }

  function shuffle(arr){
    const a=[...arr];
    for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
    return a;
  }

  function buildSet(m){
    if(m==="campaign") return [...bank];
    if(m==="quick") return shuffle(bank).slice(0,10);
    if(m==="lightning") return shuffle(bank).slice(0,10);
  }

  function start(m){
    lastMode=m; mode=m; questions=buildSet(m); idx=0; lives=3; xp=0; streak=0; bestStreak=0; score=0; answered=false;
    lightning = (m==="lightning");
    $("#modeLabel").textContent = m==="campaign" ? "Campanha" : m==="quick" ? "Batalha Rápida" : "Desafio Relâmpago";
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

  function render(){
    clearTimer();
    if(idx>=questions.length){finish();return;}
    answered=false;
    const q=questions[idx];
    $("#topic").textContent=q.topic;
    $("#counter").textContent=`Questão ${idx+1} de ${questions.length}`;
    $("#levelLabel").textContent=`Nível ${q.level+1} — ${levels[q.level]}`;
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
      let gain=100 + q.level*25 + Math.min(streak*15,75);
      if(lightning) gain+=100;
      xp+=gain;
      if(window.geoquestAddXP) window.geoquestAddXP(gain);
      $("#feedback").innerHTML=`<span class="ok"><b>✅ Acertou!</b> +${gain} XP</span><br>${q.exp}`;
    }else{
      lives=Math.max(0,lives-1);
      streak=0;
      btn.classList.add("wrong");
      $("#feedback").innerHTML=`<span class="no"><b>❌ Resposta incorreta.</b></span><br>${q.exp}`;
    }
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
    $("#feedback").innerHTML=`<span class="no"><b>⏱️ Tempo esgotado.</b></span><br>${q.exp}`;
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

  async function finish(){
    clearTimer();
    $("#rScore").textContent=score;
    $("#rTotal").textContent=questions.length;
    $("#rXp").textContent=xp;
    $("#rStreak").textContent=bestStreak;
    const rate=Math.round(score/questions.length*100);
    $("#resultMessage").textContent =
      rate>=85 ? "Excelente domínio. Você chegou forte nas questões de reta e circunferência." :
      rate>=65 ? "Bom desempenho. Vale revisar os erros antes de outra rodada." :
      "A base está sendo construída. Refaça a campanha e observe as explicações dos erros.";
    show("results");
    if(window.geoquestFlushXP){
      try{ await window.geoquestFlushXP(); }catch(_e){}
    }
  }

  document.querySelectorAll("[data-mode]").forEach(el=>el.addEventListener("click",()=>start(el.dataset.mode)));
  document.getElementById("navHome")?.addEventListener("click",()=>show("home"));
  document.getElementById("navChallenges")?.addEventListener("click",()=>show("challenges"));
  document.getElementById("navProfile")?.addEventListener("click",()=>show("profile"));
  document.getElementById("profileChangePhotoBtn")?.addEventListener("click",()=>{
    document.getElementById("settingsBtn")?.click();
  });
  document.getElementById("goChallengesFromModule")?.addEventListener("click",()=>show("challenges"));
  document.getElementById("unlockChallengesBtn")?.addEventListener("click",()=>show("challenges"));
  function resetRunState(){
    clearTimer();
    idx=0;
    lives=3;
    xp=0;
    streak=0;
    bestStreak=0;
    score=0;
    answered=false;
    lightning=false;
  }

  function leaveRun(){
    // Sai imediatamente. O XP global já ganho continua sendo salvo em segundo plano.
    clearTimer();
    show("home");

    if(window.geoquestFlushXP){
      Promise.resolve(window.geoquestFlushXP()).catch(()=>{});
    }

    resetRunState();
  }

  $("#nextBtn").addEventListener("click",next);

  $("#restartBtn").addEventListener("click",(event)=>{
    event.preventDefault();
    clearTimer();
    start(mode);
  });

  $("#backBtn").addEventListener("click",(event)=>{
    event.preventDefault();
    leaveRun();
  });

  $("#quitRunBtn").addEventListener("click",(event)=>{
    event.preventDefault();
    leaveRun();
  });
  $("#againBtn").addEventListener("click",()=>start(lastMode));
  $("#menuBtn").addEventListener("click",()=>show("home"));
  $("#lightningToggle").addEventListener("click",()=>{
    if(answered)return;
    lightning=!lightning;
    $("#lightningToggle").textContent=lightning?"Desativar Relâmpago":"Ativar Relâmpago";
    clearTimer();
    if(lightning) startTimer(); else $("#timerWrap").style.display="none";
  });
})();
