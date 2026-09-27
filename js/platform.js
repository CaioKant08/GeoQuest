(() => {
  const { SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, SITE_URL } = window.KANT_CONFIG;
  
  
  

  const authLoading = document.getElementById("authLoading");
  const authGate = document.getElementById("authGate");
  const appWrap = document.getElementById("appWrap");
  const accountArea = document.getElementById("accountArea");
  const accountUser = document.getElementById("accountUser");
  const headerAvatar = document.getElementById("headerAvatar");
  const menuUserName = document.getElementById("menuUserName");
  const menuUserEmail = document.getElementById("menuUserEmail");
  const profileTrigger = document.getElementById("profileTrigger");
  const profileMenu = document.getElementById("profileMenu");
  const themeToggle = document.getElementById("themeToggle");
  const settingsBtn = document.getElementById("settingsBtn");
  const settingsModal = document.getElementById("settingsModal");
  const closeSettings = document.getElementById("closeSettings");
  const avatarInput = document.getElementById("avatarInput");
  const avatarPreview = document.getElementById("avatarPreview");
  const saveAvatarBtn = document.getElementById("saveAvatarBtn");
  const removeAvatarBtn = document.getElementById("removeAvatarBtn");
  const settingsStatus = document.getElementById("settingsStatus");
  const authMessage = document.getElementById("authMessage");
  const globalLevel = document.getElementById("globalLevel");
  const globalXpText = document.getElementById("globalXpText");
  const globalXpBar = document.getElementById("globalXpBar");
  const globalXpNext = document.getElementById("globalXpNext");
  const rankingBtn = document.getElementById("rankingBtn");
  const rankingModal = document.getElementById("rankingModal");
  const closeRanking = document.getElementById("closeRanking");
  const rankingList = document.getElementById("rankingList");
  const myRankSummary = document.getElementById("myRankSummary");
  const tabLogin = document.getElementById("tabLogin");
  const tabSignup = document.getElementById("tabSignup");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const nicknameModal = document.getElementById("nicknameModal");
  const closeNicknameModal = document.getElementById("closeNicknameModal");
  const nicknameInput = document.getElementById("nicknameInput");
  const saveNicknameBtn = document.getElementById("saveNicknameBtn");
  const nicknameStatus = document.getElementById("nicknameStatus");
  const profileChangeNicknameBtn = document.getElementById("profileChangeNicknameBtn");

  function showAuthMessage(text,type="error"){
    authMessage.textContent=text;
    authMessage.className="auth-message show "+type;
  }
  function clearAuthMessage(){
    authMessage.textContent="";
    authMessage.className="auth-message";
  }
  function friendlyError(message){
    const m=(message||"").toLowerCase();
    if(m.includes("invalid login credentials")) return "E-mail ou senha incorretos.";
    if(m.includes("email not confirmed")) return "Confirme seu e-mail antes de entrar.";
    if(m.includes("user already registered")) return "Já existe uma conta com este e-mail.";
    if(m.includes("password should be")) return "A senha não atende aos requisitos mínimos.";
    if(m.includes("rate limit")) return "Muitas tentativas em sequência. Aguarde um pouco.";
    return message || "Não foi possível concluir a operação.";
  }
  function setTab(mode){
    const isLogin=mode==="login";
    tabLogin.classList.toggle("active",isLogin);
    tabSignup.classList.toggle("active",!isLogin);
    loginForm.hidden=!isLogin;
    signupForm.hidden=isLogin;
    clearAuthMessage();
  }
  function showLoggedOut(){
    window.geoquestCurrentUserId=null;
    window.kantCurrentProfile=null;
    window.kantIsAdmin=false;
    document.getElementById("navAdmin")?.setAttribute("hidden","");
    authLoading.hidden=true;
    appWrap.hidden=true;
    authGate.hidden=false;
    accountArea?.classList.remove("show");
  }
  function initials(name){
    return (name || "G").trim().split(/\s+/).slice(0,2).map(x=>x[0]||"").join("").toUpperCase() || "G";
  }
  function paintAvatar(target,url,name){
    if(!target) return;
    target.innerHTML="";
    if(url){
      const img=document.createElement("img");
      img.src=url;
      img.alt="Foto de perfil";
      target.appendChild(img);
    }else{
      target.textContent=initials(name);
    }
  }
  async function showLoggedIn(user){
    window.geoquestCurrentUserId=user?.id || null;
    window.kantCurrentUserEmail=(user?.email||"").toLowerCase();
    window.kantIsSuperAdmin=window.kantCurrentUserEmail==="caiokvalcanti@gmail.com";
    authLoading.hidden=true;
    authGate.hidden=true;
    appWrap.hidden=false;
    accountArea?.classList.add("show");

    const name=user?.user_metadata?.display_name || user?.email?.split("@")[0] || "Jogador";
    const avatarUrl=user?.user_metadata?.avatar_url || "";

    if(accountUser){
      accountUser.textContent=name;
      accountUser.title=user?.email || name;
    }
    if(menuUserName) menuUserName.textContent=name;
    if(menuUserEmail) menuUserEmail.textContent=user?.email || "";
    paintAvatar(headerAvatar,avatarUrl,name);
    paintAvatar(avatarPreview,avatarUrl,name);

    const profile=await ensureProfile(user);
    window.kantCurrentProfile=profile;
    Promise.resolve(loadPerformanceStats()).catch(()=>{});
    window.kantIsAdmin=profile?.role==="admin";
    document.body.classList.toggle("kant-admin-user",window.kantIsAdmin);
    const adminButton=document.getElementById("navAdmin");
    if(adminButton){
      if(window.kantIsAdmin) adminButton.removeAttribute("hidden");
      else adminButton.setAttribute("hidden","");
    }
    if(typeof syncProfileScreen === "function") syncProfileScreen();
    window.dispatchEvent(new CustomEvent("geoquest:user-ready",{detail:{userId:user?.id || null,profile,isAdmin:window.kantIsAdmin,isSuperAdmin:window.kantIsSuperAdmin}}));
  }

  if(!window.supabase || !window.supabase.createClient){
    authLoading.innerHTML="<div><b>Não foi possível carregar o login.</b><br><span style='color:var(--muted)'>Atualize a página e verifique sua conexão.</span></div>";
    return;
  }

  const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY,{
    auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}
  });
  window.kantDb=db;

  const XP_PER_LEVEL = 1000;
  let currentProfile = null;
  let profileBusy = false;

  function renderGlobalXP(totalXp=0){
    const xp=Math.max(0,Number(totalXp)||0);
    const level=Math.floor(xp/XP_PER_LEVEL)+1;
    const inside=xp%XP_PER_LEVEL;
    const pct=Math.min(100,(inside/XP_PER_LEVEL)*100);

    if(globalLevel) globalLevel.textContent=`Nível ${level}`;
    if(globalXpText) globalXpText.textContent=`${xp.toLocaleString("pt-BR")} XP`;
    if(globalXpBar) globalXpBar.style.width=pct+"%";
    if(globalXpNext) globalXpNext.textContent=`${inside} / ${XP_PER_LEVEL} XP`;
    if(typeof syncProfileScreen === "function") syncProfileScreen();
  }

  async function ensureProfile(user){
    if(!user) return null;
    const displayName=user.user_metadata?.display_name || user.email?.split("@")[0] || "Jogador";
    const avatarUrl=user.user_metadata?.avatar_url || null;

    const {data:existing,error:readError}=await db
      .from("profiles")
      .select("id,display_name,avatar_url,xp,role")
      .eq("id",user.id)
      .maybeSingle();

    if(readError){
      console.warn("profiles:",readError.message);
      return null;
    }

    if(existing){
      currentProfile=existing;
      displayedGlobalXp=Number(existing.xp)||0;
      renderGlobalXP(displayedGlobalXp);
      if(existing.display_name!==displayName || (existing.avatar_url||null)!==avatarUrl){
        const {data:updated}=await db.from("profiles")
          .update({display_name:displayName,avatar_url:avatarUrl,updated_at:new Date().toISOString()})
          .eq("id",user.id)
          .select("id,display_name,avatar_url,xp,role")
          .single();
        if(updated) currentProfile=updated;
      }
      return currentProfile;
    }

    const {data:created,error:createError}=await db
      .from("profiles")
      .insert({id:user.id,display_name:displayName,avatar_url:avatarUrl,xp:0,role:"user"})
      .select("id,display_name,avatar_url,xp,role")
      .single();

    if(createError){
      console.warn("create profile:",createError.message);
      return null;
    }
    currentProfile=created;
    displayedGlobalXp=Number(created.xp)||0;
    renderGlobalXP(displayedGlobalXp);
    return created;
  }

  let xpQueue = Promise.resolve();
  let displayedGlobalXp = 0;

  function setCurrentProfileXP(value){
    const xp=Math.max(0,Number(value)||0);
    displayedGlobalXp=xp;
    if(currentProfile) currentProfile.xp=xp;
    renderGlobalXP(xp);
    if(typeof syncProfileScreen === "function") syncProfileScreen();
  }

  function renderPerformanceStats(stats={}){
    const answered=Math.max(0,Number(stats.total_answered)||0);
    const correct=Math.max(0,Number(stats.total_correct)||0);
    const wrong=Math.max(0,Number(stats.total_wrong)||0);
    const accuracy=answered?Math.round((correct/answered)*100):0;
    const name=(currentProfile?.display_name || document.getElementById("accountUser")?.textContent || "Jogador").trim();
    const motivation=answered===0?"Sua trilha começa com uma questão. Faça a primeira e construa seu ritmo.":accuracy>=85?"Excelente consistência. Continue refinando o que você já domina.":accuracy>=70?"Você está construindo uma base forte. Mantenha a sequência.":accuracy>=50?"Cada erro está mostrando exatamente onde vale revisar agora.":"Seu progresso começa na repetição. Revise, tente de novo e acompanhe a evolução.";
    const map={homeGreetingName:name,homeTotalAnswered:answered.toLocaleString("pt-BR"),homeTotalCorrect:correct.toLocaleString("pt-BR"),homeTotalWrong:wrong.toLocaleString("pt-BR"),homeAccuracyPct:accuracy+"%",homeMotivationalText:motivation,profileAnsweredMetric:answered.toLocaleString("pt-BR"),profileAccuracyMetric:accuracy+"%"};
    Object.entries(map).forEach(([id,value])=>{const el=document.getElementById(id);if(el)el.textContent=value;});
    const homeAvatar=document.getElementById("homeGreetingAvatar");
    if(homeAvatar){homeAvatar.innerHTML="";if(currentProfile?.avatar_url){const img=document.createElement("img");img.src=currentProfile.avatar_url;img.alt="Foto de perfil";homeAvatar.appendChild(img);}else{homeAvatar.textContent=(name||"K").trim().charAt(0).toUpperCase()||"K";}}
    const gauge=document.getElementById("homeAccuracyGauge");
    if(gauge)gauge.style.setProperty("--gauge-deg",(Math.max(0,Math.min(100,accuracy))*1.8)+"deg");
  }

  async function loadPerformanceStats(){
    const {data:{user}}=await db.auth.getUser();
    if(!user){renderPerformanceStats();return null;}
    try{
      const {data,error}=await db.from("profiles").select("total_answered,total_correct,total_wrong").eq("id",user.id).single();
      if(error)throw error;
      if(currentProfile)Object.assign(currentProfile,data||{});
      renderPerformanceStats(data||{});
      return data;
    }catch(err){console.warn("Estatísticas indisponíveis:",err?.message||err);renderPerformanceStats(currentProfile||{});return null;}
  }
  window.kantLoadPerformanceStats=loadPerformanceStats;

  let answerStatsQueue=Promise.resolve();
  window.kantRecordAnswer=function(correct){
    answerStatsQueue=answerStatsQueue.then(async()=>{
      const {data,error}=await db.rpc("record_answer_result",{p_correct:!!correct});
      if(error)throw error;
      const row=Array.isArray(data)?data[0]:data;
      if(row){if(currentProfile)Object.assign(currentProfile,row);renderPerformanceStats(row);}else await loadPerformanceStats();
      return row;
    }).catch(err=>{console.warn("Resposta não contabilizada:",err?.message||err);return null;});
    return answerStatsQueue;
  };

  window.geoquestAddXP=function(amount){
    const gain=Math.max(0,Math.round(Number(amount)||0));
    if(!gain) return xpQueue;

    // Cada ganho entra em sequência. O próximo só começa depois do anterior.
    xpQueue=xpQueue.then(async()=>{
      const {data:{user},error:userError}=await db.auth.getUser();
      if(userError || !user) throw userError || new Error("Usuário não autenticado.");

      const {data:row,error:readError}=await db
        .from("profiles")
        .select("xp")
        .eq("id",user.id)
        .single();

      if(readError) throw readError;

      const next=(Number(row.xp)||0)+gain;

      const {data:updated,error:updateError}=await db
        .from("profiles")
        .update({
          xp:next,
          updated_at:new Date().toISOString()
        })
        .eq("id",user.id)
        .select("id,display_name,avatar_url,xp,role")
        .single();

      if(updateError) throw updateError;

      currentProfile=updated;
      setCurrentProfileXP(updated.xp);
      return updated.xp;
    }).catch(err=>{
      console.warn("XP não salvo:",err?.message || err);
      // Não zera a barra se houver erro; mantém o último valor válido.
      return displayedGlobalXp;
    });

    return xpQueue;
  };

  function localQuestionAwardKey(userId){return `kant:${userId||"local"}:question-xp-v1`;}
  function getLocalAwardedQuestions(userId){try{return new Set(JSON.parse(localStorage.getItem(localQuestionAwardKey(userId))||"[]"));}catch(_e){return new Set();}}
  function saveLocalAwardedQuestions(userId,set){try{localStorage.setItem(localQuestionAwardKey(userId),JSON.stringify([...set]));}catch(_e){}}

  window.kantAwardQuestionXPOnce=async function(questionId,amount){
    const gain=Math.max(0,Math.round(Number(amount)||0));
    const qid=String(questionId||"").trim();
    if(!gain||!qid)return {awarded:false,xp:displayedGlobalXp,reason:"invalid"};
    const {data:{user}}=await db.auth.getUser();
    if(!user)return {awarded:false,xp:displayedGlobalXp,reason:"auth"};
    try{
      const {data,error}=await db.rpc("award_question_xp_once",{p_question_id:qid,p_amount:gain});
      if(error)throw error;
      const row=Array.isArray(data)?data[0]:data;
      if(row&&Number.isFinite(Number(row.total_xp)))setCurrentProfileXP(Number(row.total_xp));
      return {awarded:!!row?.awarded,xp:Number(row?.total_xp)||displayedGlobalXp,reason:row?.awarded?"first":"already"};
    }catch(err){
      // Compatibilidade enquanto a migração SQL ainda não foi aplicada: bloqueio local no dispositivo.
      const set=getLocalAwardedQuestions(user.id);
      if(set.has(qid))return {awarded:false,xp:displayedGlobalXp,reason:"already-local"};
      await window.geoquestAddXP(gain);
      set.add(qid);saveLocalAwardedQuestions(user.id,set);
      console.warn("Anti-farm usando fallback local; aplique a migração SQL para proteção entre dispositivos.",err?.message||err);
      return {awarded:true,xp:displayedGlobalXp,reason:"fallback-local"};
    }
  };

  window.geoquestFlushXP=function(){
    return xpQueue;
  };

  function rankInitials(name){
    return (name||"G").trim().split(/\s+/).slice(0,2).map(p=>p[0]||"").join("").toUpperCase()||"G";
  }

  async function loadRanking(){
    if(!rankingList) return;
    rankingList.innerHTML='<div class="ranking-loading">Carregando ranking...</div>';

    const {data:{user}}=await db.auth.getUser();
    const {data,error}=await db
      .from("profiles")
      .select("id,display_name,avatar_url,xp,role")
      .order("xp",{ascending:false})
      .order("display_name",{ascending:true})
      .limit(100);

    if(error){
      rankingList.innerHTML='<div class="ranking-empty">O ranking ainda não está configurado no banco.</div>';
      if(myRankSummary) myRankSummary.innerHTML='<span>Sua posição</span><b>—</b>';
      return;
    }

    if(!data?.length){
      rankingList.innerHTML='<div class="ranking-empty">Ainda não há jogadores no ranking.</div>';
      return;
    }

    const myIndex=data.findIndex(p=>p.id===user?.id);
    if(myRankSummary){
      myRankSummary.innerHTML=`<span>Sua posição</span><b>${myIndex>=0 ? "#"+(myIndex+1) : "—"}</b>`;
    }

    rankingList.innerHTML="";

    const makeAvatar=(p,className)=>{
      const avatar=document.createElement("div");avatar.className=className;
      if(p.avatar_url){const img=document.createElement("img");img.src=p.avatar_url;img.alt="";avatar.appendChild(img);}else avatar.textContent=rankInitials(p.display_name);
      return avatar;
    };

    const top=data.slice(0,3);
    if(top.length){
      const podium=document.createElement("div");podium.className="rank-podium";
      const order=top.length===1?[0]:top.length===2?[1,0]:[1,0,2];
      order.forEach(index=>{
        const p=top[index]; if(!p)return;
        const place=index+1;
        const item=document.createElement("article");item.className=`podium-player podium-${place}`+(p.id===user?.id?" me":"");
        const crown=document.createElement("div");crown.className="podium-crown";crown.textContent=place===1?"♛":place===2?"♜":"♜";
        const avatar=makeAvatar(p,"podium-avatar");
        const badge=document.createElement("div");badge.className="podium-place";badge.textContent=place===1?"1":place===2?"2":"3";
        const name=document.createElement("b");name.textContent=p.display_name||"Jogador";
        const level=document.createElement("small");level.textContent=`Nível ${Math.floor((Number(p.xp)||0)/XP_PER_LEVEL)+1}`;
        const xp=document.createElement("strong");xp.textContent=`${(Number(p.xp)||0).toLocaleString("pt-BR")} XP`;
        item.append(crown,avatar,badge,name,level,xp);podium.appendChild(item);
      });
      rankingList.appendChild(podium);
    }

    data.slice(3).forEach((p,index)=>{
      const absoluteIndex=index+3;
      const row=document.createElement("div");row.className="ranking-row"+(p.id===user?.id?" me":"");
      const pos=document.createElement("div");pos.className="rank-pos";pos.textContent=String(absoluteIndex+1);
      const avatar=makeAvatar(p,"rank-avatar");
      const userBox=document.createElement("div");userBox.className="rank-user";
      const name=document.createElement("b");name.textContent=p.display_name||"Jogador";
      const level=document.createElement("small");level.textContent=`Nível ${Math.floor((Number(p.xp)||0)/XP_PER_LEVEL)+1}`;userBox.append(name,level);
      const xpBox=document.createElement("div");xpBox.className="rank-xp";xpBox.textContent=`${(Number(p.xp)||0).toLocaleString("pt-BR")} XP`;
      row.append(pos,avatar,userBox,xpBox);rankingList.appendChild(row);
    });
  }

  async function openRanking(){
    if(!rankingModal || !rankingList) return;
    rankingModal.classList.add("open");
    rankingModal.setAttribute("aria-hidden","false");
    try{
      await loadRanking();
    }catch(err){
      console.warn("Erro ao carregar ranking:",err?.message || err);
      rankingList.innerHTML='<div class="ranking-empty">Não foi possível carregar o ranking agora.</div>';
    }
  }

  function hideRanking(){
    if(!rankingModal) return;
    rankingModal.classList.remove("open");
    rankingModal.setAttribute("aria-hidden","true");
  }

  // Delegação de eventos: não depende da ordem em que o botão foi criado.
  document.addEventListener("click",(event)=>{
    const rankButton=event.target.closest?.("#rankingBtn");
    if(rankButton){
      event.preventDefault();
      openRanking();
      return;
    }

    const refreshButton=event.target.closest?.("#refreshRankingBtn");
    if(refreshButton){
      event.preventDefault();
      loadRanking();
      return;
    }

    const closeButton=event.target.closest?.("#closeRanking");
    if(closeButton){
      event.preventDefault();
      hideRanking();
      return;
    }

    if(event.target===rankingModal){
      hideRanking();
    }
  });

  document.addEventListener("keydown",(event)=>{
    if(event.key==="Escape" && rankingModal?.classList.contains("open")){
      hideRanking();
    }
  });

  tabLogin.addEventListener("click",()=>setTab("login"));
  tabSignup.addEventListener("click",()=>setTab("signup"));

  loginForm.addEventListener("submit",async(e)=>{
    e.preventDefault();
    clearAuthMessage();
    const btn=document.getElementById("loginSubmit");
    btn.disabled=true; btn.textContent="Entrando...";
    try{
      const email=document.getElementById("loginEmail").value.trim();
      const password=document.getElementById("loginPassword").value;
      const {data,error}=await db.auth.signInWithPassword({email,password});
      if(error) throw error;
      if(data.user) showLoggedIn(data.user);
    }catch(err){
      showAuthMessage(friendlyError(err.message));
    }finally{
      btn.disabled=false; btn.textContent="Entrar no KANT";
    }
  });

  signupForm.addEventListener("submit",async(e)=>{
    e.preventDefault();
    clearAuthMessage();
    const btn=document.getElementById("signupSubmit");
    btn.disabled=true; btn.textContent="Criando conta...";
    try{
      const displayName=document.getElementById("signupName").value.trim();
      const email=document.getElementById("signupEmail").value.trim();
      const password=document.getElementById("signupPassword").value;
      const {data,error}=await db.auth.signUp({
        email,password,
        options:{
          data:{display_name:displayName},
          emailRedirectTo:SITE_URL
        }
      });
      if(error) throw error;
      if(data.session && data.user){
        showLoggedIn(data.user);
      }else{
        showAuthMessage("Conta criada. Confira seu e-mail para confirmar o cadastro e depois faça login.","success");
        signupForm.reset();
      }
    }catch(err){
      showAuthMessage(friendlyError(err.message));
    }finally{
      btn.disabled=false; btn.textContent="Criar minha conta";
    }
  });


  let pendingAvatarFile=null;

  function setSettingsStatus(text,type="ok"){
    if(!settingsStatus) return;
    settingsStatus.textContent=text;
    settingsStatus.className="settings-status show "+type;
  }
  function clearSettingsStatus(){
    if(!settingsStatus) return;
    settingsStatus.textContent="";
    settingsStatus.className="settings-status";
  }

  function setTheme(theme){
    const dark=theme==="dark";
    document.body.classList.toggle("dark",dark);
    localStorage.setItem("geoquest-theme",dark?"dark":"light");
  }
  setTheme(localStorage.getItem("geoquest-theme")==="dark" ? "dark" : "light");

  profileTrigger?.addEventListener("click",(e)=>{
    e.stopPropagation();
    const open=profileMenu.classList.toggle("open");
    profileTrigger.setAttribute("aria-expanded",String(open));
  });
  document.addEventListener("click",(e)=>{
    if(profileMenu && !profileMenu.contains(e.target) && !profileTrigger?.contains(e.target)){
      profileMenu.classList.remove("open");
      profileTrigger?.setAttribute("aria-expanded","false");
    }
  });

  themeToggle?.addEventListener("click",()=>{
    const dark=!document.body.classList.contains("dark");
    setTheme(dark?"dark":"light");
  });

  function openSettings(){
    profileMenu?.classList.remove("open");
    settingsModal?.classList.add("open");
    settingsModal?.setAttribute("aria-hidden","false");
    clearSettingsStatus();
  }
  function closeSettingsModal(){
    settingsModal?.classList.remove("open");
    settingsModal?.setAttribute("aria-hidden","true");
    pendingAvatarFile=null;
    if(saveAvatarBtn) saveAvatarBtn.disabled=true;
    if(avatarInput) avatarInput.value="";
  }

  settingsBtn?.addEventListener("click",openSettings);
  closeSettings?.addEventListener("click",closeSettingsModal);
  settingsModal?.addEventListener("click",(e)=>{
    if(e.target===settingsModal) closeSettingsModal();
  });

  avatarInput?.addEventListener("change",(e)=>{
    const file=e.target.files?.[0];
    if(!file) return;
    if(!file.type.startsWith("image/")){
      setSettingsStatus("Escolha um arquivo de imagem.","err");
      return;
    }
    if(file.size > 5*1024*1024){
      setSettingsStatus("A imagem deve ter no máximo 5 MB.","err");
      avatarInput.value="";
      return;
    }
    pendingAvatarFile=file;
    saveAvatarBtn.disabled=false;
    const url=URL.createObjectURL(file);
    avatarPreview.innerHTML="";
    const img=document.createElement("img");
    img.src=url; img.alt="Prévia da foto";
    img.onload=()=>URL.revokeObjectURL(url);
    avatarPreview.appendChild(img);
    clearSettingsStatus();
  });

  saveAvatarBtn?.addEventListener("click",async()=>{
    if(!pendingAvatarFile) return;
    saveAvatarBtn.disabled=true;
    saveAvatarBtn.textContent="Salvando...";
    clearSettingsStatus();

    try{
      const {data:{user},error:userError}=await db.auth.getUser();
      if(userError || !user) throw userError || new Error("Usuário não encontrado.");

      const ext=(pendingAvatarFile.name.split(".").pop() || "jpg").toLowerCase().replace(/[^a-z0-9]/g,"");
      const path=`${user.id}/avatar.${ext}`;

      const {error:uploadError}=await db.storage
        .from("avatars")
        .upload(path,pendingAvatarFile,{upsert:true,contentType:pendingAvatarFile.type,cacheControl:"3600"});
      if(uploadError) throw uploadError;

      const {data:publicData}=db.storage.from("avatars").getPublicUrl(path);
      const publicUrl=publicData.publicUrl + "?v=" + Date.now();

      const {data:updateData,error:updateError}=await db.auth.updateUser({
        data:{avatar_url:publicUrl}
      });
      if(updateError) throw updateError;

      await db.from("profiles").update({
        avatar_url:publicUrl,
        display_name:updateData.user?.user_metadata?.display_name || updateData.user?.email?.split("@")[0] || "Jogador",
        updated_at:new Date().toISOString()
      }).eq("id",user.id);
      showLoggedIn(updateData.user);
      pendingAvatarFile=null;
      avatarInput.value="";
      if(typeof syncProfileScreen === "function") syncProfileScreen();
      setSettingsStatus("Foto de perfil salva com sucesso.","ok");
    }catch(err){
      const msg=(err?.message || "").toLowerCase();
      if(msg.includes("bucket") || msg.includes("not found")){
        setSettingsStatus('O bucket "avatars" ainda não foi criado no Supabase. Crie-o em Storage e tente novamente.',"err");
      }else if(msg.includes("row-level security") || msg.includes("policy")){
        setSettingsStatus("O Supabase bloqueou o upload por política de segurança. Precisamos configurar as permissões do bucket avatars.","err");
      }else{
        setSettingsStatus(err?.message || "Não foi possível salvar a foto.","err");
      }
    }finally{
      saveAvatarBtn.textContent="Salvar foto";
      saveAvatarBtn.disabled=!pendingAvatarFile;
    }
  });

  removeAvatarBtn?.addEventListener("click",async()=>{
    clearSettingsStatus();
    try{
      const {data:{user},error:userError}=await db.auth.getUser();
      if(userError || !user) throw userError || new Error("Usuário não encontrado.");

      const oldUrl=user.user_metadata?.avatar_url || "";
      if(oldUrl){
        const marker="/storage/v1/object/public/avatars/";
        const pos=oldUrl.indexOf(marker);
        if(pos>=0){
          const storedPath=oldUrl.slice(pos+marker.length).split("?")[0];
          await db.storage.from("avatars").remove([storedPath]);
        }
      }

      const {data,error}=await db.auth.updateUser({data:{avatar_url:null}});
      if(error) throw error;
      await db.from("profiles").update({
        avatar_url:null,
        updated_at:new Date().toISOString()
      }).eq("id",user.id);
      showLoggedIn(data.user);
      if(typeof syncProfileScreen === "function") syncProfileScreen();
      setSettingsStatus("Foto removida.","ok");
    }catch(err){
      setSettingsStatus(err?.message || "Não foi possível remover a foto.","err");
    }
  });

  function openNicknameModal(){
    profileMenu?.classList.remove("open");
    if(nicknameInput) nicknameInput.value=(currentProfile?.display_name || accountUser?.textContent || "").trim();
    if(nicknameStatus){nicknameStatus.textContent="";nicknameStatus.className="settings-status";}
    nicknameModal?.classList.add("open");
    nicknameModal?.setAttribute("aria-hidden","false");
    setTimeout(()=>nicknameInput?.focus(),50);
  }
  function closeNickname(){
    nicknameModal?.classList.remove("open");
    nicknameModal?.setAttribute("aria-hidden","true");
  }
  profileChangeNicknameBtn?.addEventListener("click",openNicknameModal);
  closeNicknameModal?.addEventListener("click",closeNickname);
  // O modal de nickname não fecha ao clicar/arrastar fora do campo.
  // Isso evita perder a edição ao selecionar texto e ultrapassar os limites do input.
  nicknameInput?.addEventListener("keydown",e=>{if(e.key==="Enter")saveNicknameBtn?.click();});
  document.addEventListener("keydown",e=>{
    if(e.key==="Escape" && nicknameModal?.classList.contains("open")) closeNickname();
  });
  saveNicknameBtn?.addEventListener("click",async()=>{
    const name=(nicknameInput?.value||"").trim();
    if(name.length<2){if(nicknameStatus){nicknameStatus.textContent="Use pelo menos 2 caracteres.";nicknameStatus.className="settings-status err";}return;}
    saveNicknameBtn.disabled=true; saveNicknameBtn.textContent="Salvando...";
    if(nicknameStatus){nicknameStatus.textContent="";nicknameStatus.className="settings-status";}
    try{
      const {data:{user},error:userError}=await db.auth.getUser();
      if(userError||!user)throw userError||new Error("Usuário não encontrado.");
      const {data:updateData,error:updateError}=await db.auth.updateUser({data:{display_name:name}});
      if(updateError)throw updateError;
      const {error:profileError}=await db.from("profiles").update({display_name:name,updated_at:new Date().toISOString()}).eq("id",user.id);
      if(profileError)throw profileError;
      if(currentProfile)currentProfile.display_name=name;
      accountUser.textContent=name; accountUser.title=user.email||name;
      if(menuUserName)menuUserName.textContent=name;
      if(typeof syncProfileScreen==="function")syncProfileScreen();
      renderPerformanceStats(currentProfile||{});
      if(nicknameStatus){nicknameStatus.textContent="Nickname atualizado.";nicknameStatus.className="settings-status ok";}
      setTimeout(closeNickname,600);
    }catch(err){
      if(nicknameStatus){nicknameStatus.textContent=err?.message||"Não foi possível alterar o nickname.";nicknameStatus.className="settings-status err";}
    }finally{saveNicknameBtn.disabled=false;saveNicknameBtn.textContent="Salvar nickname";}
  });

  document.getElementById("logoutBtn")?.addEventListener("click",async()=>{
    await db.auth.signOut();
    setTab("login");
    showLoggedOut();
  });

  db.auth.onAuthStateChange((_event,session)=>{
    if(session?.user) showLoggedIn(session.user);
    else showLoggedOut();
  });

  (async()=>{
    try{
      const {data}=await db.auth.getSession();
      if(data.session?.user) showLoggedIn(data.session.user);
      else showLoggedOut();
    }catch(_e){
      showLoggedOut();
    }
  })();
})();
