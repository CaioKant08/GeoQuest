(() => {
  let modules = window.KANT_MODULES || [];
  let bank = window.KANT_QUESTIONS || [];
  const $ = (s) => document.querySelector(s);
  const screens = ["home","moduleStudy","challenges","profile","admin","game","results"].reduce((o,id)=>(o[id]=$("#"+id),o),{});

  let mode="quick", questions=[], idx=0, lives=3, xp=0, streak=0, bestStreak=0, score=0, answered=false, lightning=false, hintUsed=false;
  let timerId=null, endAt=0, runDeadline=0, runDuration=0, lastMode="quick";
  let currentModuleId=null, lastModuleId=null, studyModuleId=null;

  const moduleById=(id)=>modules.find(m=>m.id===id);
  const difficultyLabel=(value)=>({facil:"Fácil",media:"Média",desafio:"Desafio",vestibular:"Vestibular"}[String(value||"").toLowerCase()]||value||"Progressiva");
  const allModulesCompleted=()=>modules.length>0&&modules.every(m=>moduleResult(m.id).completed);
  const challengeAccess=()=>window.kantIsAdmin===true||allModulesCompleted();
  const vestibularAccess=()=>window.kantIsAdmin===true||!!moduleResult(modules[2]?.id).completed;
  const vestibularBank=()=>window.KANT_VESTIBULAR_QUESTIONS||[];
  function challengeUsedKey(kind){return `geoquest:${identity()}:challenge-used:${kind}:v1`;}
  function getChallengeUsed(kind){try{return new Set(JSON.parse(localStorage.getItem(challengeUsedKey(kind))||"[]"));}catch(_e){return new Set();}}
  function saveChallengeUsed(kind,set){try{localStorage.setItem(challengeUsedKey(kind),JSON.stringify([...set]));}catch(_e){}}
  function markChallengeUsed(kind,id){if(!["quick","lightning","vestibular"].includes(kind)||!id)return;const used=getChallengeUsed(kind);used.add(String(id));saveChallengeUsed(kind,used);}
  function remainingChallengePool(kind){const pool=kind==="vestibular"?vestibularBank():challengeQuestionPool();const used=getChallengeUsed(kind);return pool.filter(q=>!used.has(String(q.id)));}
  function challengeRemaining(kind){return remainingChallengePool(kind).length;}
  const moduleQuestionPool=(m)=>[...(m?.questoes||[]),...((window.KANT_EXTRA_QUESTIONS||{})[Number(m?.numero)]||[])];
  function challengeQuestionPool(){return modules.flatMap(m=>moduleQuestionPool(m).map(q=>normalizeModuleQuestion(q,m)));}
  function renderChallenges(){
    const unlocked=challengeAccess();
    const quickRemaining=challengeRemaining("quick"), lightningRemaining=challengeRemaining("lightning");
    [["quickChallengeBtn","quickChallengeStatus","quickUnlockNote","quick",quickRemaining],["lightningChallengeBtn","lightningChallengeStatus","lightningUnlockNote","lightning",lightningRemaining]].forEach(([btnId,statusId,noteId,kind,remaining])=>{
      const btn=document.getElementById(btnId),status=document.getElementById(statusId),note=document.getElementById(noteId);
      const exhausted=remaining<=0;
      if(btn)btn.disabled=!unlocked||exhausted;
      if(status){status.textContent=exhausted?"Banco concluído":unlocked?"Desbloqueado":"Bloqueado";status.classList.toggle("is-ready",unlocked&&!exhausted);}
      if(note){
        if(exhausted)note.textContent=`✓ Você já resolveu todas as ${challengeQuestionPool().length} questões disponíveis neste desafio.`;
        else if(unlocked)note.textContent=`${window.kantIsAdmin===true&&!allModulesCompleted()?"🛡 Acesso ADM liberado para teste.":"✓ Todos os módulos concluídos."} ${remaining} questões inéditas restantes neste modo.`;
        else note.textContent="🔒 Conclua os 6 módulos para desbloquear.";
      }
    });
    const vUnlocked=vestibularAccess(), vRemaining=challengeRemaining("vestibular"), vTotal=vestibularBank().length;
    const vBtn=document.getElementById("vestibularChallengeBtn"),vStatus=document.getElementById("vestibularChallengeStatus"),vNote=document.getElementById("vestibularUnlockNote");
    const vExhausted=vRemaining<=0&&vTotal>0;
    if(vBtn)vBtn.disabled=!vUnlocked||vExhausted||!vTotal;
    if(vStatus){vStatus.textContent=vExhausted?"Banco concluído":vUnlocked?"Desbloqueado":"Bloqueado";vStatus.classList.toggle("is-ready",vUnlocked&&!vExhausted);}
    if(vNote){
      if(vExhausted)vNote.textContent=`✓ Banco concluído: você já resolveu as ${vTotal} questões de vestibulares.`;
      else if(vUnlocked)vNote.textContent=`${window.kantIsAdmin===true&&!moduleResult(modules[2]?.id).completed?"🛡 Acesso ADM liberado para teste.":"✓ Módulo 3 concluído."} ${vRemaining} de ${vTotal} questões inéditas restantes.`;
      else vNote.textContent="🔒 Conclua o Módulo 3 para desbloquear.";
    }
  }
  function moduleIconSvg(numero){
    const common='viewBox="0 0 64 64" aria-hidden="true"';
    const map={
      1:`<svg ><circle cx="32" cy="32" r="8" fill="none" stroke="currentColor" stroke-width="4"/><path d="M32 10v14M32 40v14M10 32h14M40 32h14" stroke="currentColor" stroke-width="4" stroke-linecap="round"/><circle cx="32" cy="32" r="2.5" fill="currentColor"/></svg>`,
      2:`<svg ><path d="M14 46L46 14" stroke="currentColor" stroke-width="6" stroke-linecap="round"/><path d="M31 14h15v15" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 51h38" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".35"/></svg>`,
      3:`<svg ><path d="M20 12v40M44 12v40" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><path d="M12 22h8M44 42h8" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".45"/></svg>`,
      4:`<svg ><path d="M32 10L53 49H11L32 10Z" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round"/><path d="M18 43l28-20" stroke="currentColor" stroke-width="3" stroke-linecap="round" opacity=".35"/></svg>`,
      5:`<svg ><path d="M13 48L49 16" stroke="currentColor" stroke-width="5" stroke-linecap="round"/><circle cx="18" cy="17" r="5" fill="currentColor"/><path d="M18 17l13 14" stroke="currentColor" stroke-width="4" stroke-dasharray="5 5"/><path d="M27 35l5-5 5 5" fill="none" stroke="currentColor" stroke-width="3"/></svg>`,
      6:`<svg ><circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" stroke-width="5"/><circle cx="32" cy="32" r="4" fill="currentColor"/><path d="M32 32l14-10" stroke="currentColor" stroke-width="4" stroke-linecap="round"/></svg>`
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
    if(name==="profile") syncProfileScreen();
    if(name==="challenges") renderChallenges();
    if(name==="home"){renderModules();if(window.kantLoadPerformanceStats)window.kantLoadPerformanceStats();}
    window.scrollTo({top:0,behavior:"smooth"});
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
        <div class="module-art learning-module-art"><div class="module-art-center"><div class="module-symbol-shell"><div class="module-symbol-glow"></div><div class="module-symbol">${moduleIconSvg(m.numero)}</div></div></div></div>
        <div class="module-progress learning-progress">
          <div class="progress-top"><span>Domínio</span><b>${pct}%</b></div><div class="bar"><span style="width:${pct}%"></span></div>
          <div class="module-best-result ${bestClass}"><span>Melhor resultado</span><b>${best>0?best+"%":"—"}</b></div>
          <div class="learning-steps">
            <div><span>01</span><b>Teoria</b><small>conceitos + fórmulas</small></div>
            <div><span>02</span><b>Exemplo</b><small>resolução guiada</small></div>
            <div><span>03</span><b>Vídeos</b><small>2 aulas no YouTube</small></div>
            <div><span>04</span><b>Prática</b><small>8 obrigatórias + 12 extras</small></div>
          </div>
          <button class="module-btn module-open-btn" type="button" ${unlocked?"":"disabled"}>${unlocked?(result.inProgress?"▶ Continuar prática":result.completed?"↻ Revisar módulo":"▶ Abrir módulo"):"🔒 Conclua o módulo anterior"}</button>
          <div class="module-note">${adminTest&&!result.completed?"🛡 Modo de teste ADM • módulo liberado somente para você":result.inProgress?`Progresso salvo • ${result.currentAnswered}/${result.currentTotal} questões respondidas`:result.completed?"Módulo concluído. Você pode revisar quando quiser.":unlocked?"Estude a teoria antes de iniciar a prática.":"Desbloqueado ao atingir 70% no módulo anterior."}</div>
        </div>`;
      if(unlocked){ card.querySelectorAll(".module-arrow,.module-open-btn").forEach(btn=>btn.addEventListener("click",()=>openStudy(m.id))); }
      grid.appendChild(card);
    });
    renderChallenges();
  }



  const SIMPLE_THEORY = {
    1:{
      "Coordenadas cartesianas":`Imagine o plano cartesiano como um mapa com duas ruas que se cruzam no centro. A rua horizontal é o eixo $x$ e a vertical é o eixo $y$. O ponto onde elas se encontram é a origem, $O(0,0)$.

Para localizar $P(x,y)$, olhe primeiro para $x$: vá para a direita se for positivo e para a esquerda se for negativo. Depois olhe para $y$: suba se for positivo e desça se for negativo.

A ordem importa. O ponto $P(2,5)$ não é o mesmo que $P(5,2)$. Pense sempre: **primeiro horizontal, depois vertical**.`,
      "Distância entre dois pontos":`A distância entre dois pontos é simplesmente o tamanho do segmento que liga um ao outro.

Para descobrir esse tamanho, observe quanto mudamos na horizontal e quanto mudamos na vertical. Essas duas mudanças formam os lados de um triângulo retângulo. A distância que queremos é a diagonal desse triângulo.

Por isso usamos Pitágoras: calculamos $\\Delta x$, calculamos $\\Delta y$ e depois fazemos $d=\\sqrt{(\\Delta x)^2+(\\Delta y)^2}$.

Se os pontos estiverem na mesma linha horizontal ou vertical, a conta fica ainda mais simples: basta calcular a diferença entre as coordenadas que mudaram.`,
      "Ponto médio":`O ponto médio é o ponto que fica exatamente no meio de dois pontos.

Para achar sua coordenada $x$, fazemos a média dos dois valores de $x$. Para achar sua coordenada $y$, fazemos a média dos dois valores de $y$.

É como encontrar o número que fica no meio de dois números, só que fazemos isso duas vezes: uma para a horizontal e outra para a vertical.

Se $M$ for realmente o ponto médio de $A$ e $B$, então a distância de $A$ até $M$ será igual à distância de $M$ até $B$.`,
      "Aplicações":`Antes de usar uma fórmula grande, olhe o desenho.

Se dois pontos têm o mesmo $y$, eles estão na mesma altura. Então a distância é apenas a diferença entre os valores de $x$.

Se têm o mesmo $x$, eles estão na mesma linha vertical. Então usamos apenas a diferença entre os valores de $y$.

Essa observação simples economiza contas e ajuda a entender vários problemas que aparecem depois, como distância até retas horizontais e verticais.`
    },
    2:{
      "Coeficiente angular":`O coeficiente angular, chamado de $m$, diz quanto uma reta sobe ou desce quando caminhamos para a direita.

Se $m=2$, por exemplo, cada vez que $x$ aumenta 1, o valor de $y$ aumenta 2. Se $m=-3$, quando $x$ aumenta 1, $y$ diminui 3.

Por isso: $m>0$ significa reta crescente; $m<0$ significa reta decrescente; $m=0$ significa reta horizontal.

Para calcular, fazemos “quanto $y$ mudou” dividido por “quanto $x$ mudou”: $m=\\frac{\\Delta y}{\\Delta x}$. Uma reta vertical não tem $m$ definido porque teríamos divisão por zero.`,
      "Forma geral e reduzida":`Uma mesma reta pode ser escrita de jeitos diferentes.

Na forma reduzida, $y=mx+b$, conseguimos enxergar duas informações rapidamente: $m$ mostra a inclinação e $b$ mostra onde a reta corta o eixo $y$.

Na forma geral, escrevemos $Ax+By+C=0$. Essa forma é muito útil em contas de distância entre ponto e reta.

As duas formas podem representar exatamente a mesma reta. Então aprender a passar de uma para outra é como aprender a escrever a mesma informação em dois formatos diferentes.`,
      "Forma ponto–inclinação":`Use esta forma quando o problema já entrega duas coisas: um ponto da reta e sua inclinação $m$.

A fórmula é $y-y_0=m(x-x_0)$. O par $(x_0,y_0)$ é o ponto conhecido.

Faça assim: coloque $x_0$, $y_0$ e $m$ na fórmula; depois resolva os parênteses e organize a equação.

A ideia é simples: $m$ diz para onde a reta aponta, e o ponto diz por onde ela precisa passar. Essas duas informações já determinam a reta.`,
      "Dois pontos e interceptos":`Dois pontos diferentes são suficientes para determinar uma única reta.

Primeiro calcule a inclinação entre eles. Depois use um dos pontos na forma ponto–inclinação para construir a equação.

Há uma exceção importante: se os dois pontos têm o mesmo $x$, a reta é vertical e sua equação é $x=k$.

Para descobrir onde uma reta corta o eixo $x$, faça $y=0$. Para descobrir onde corta o eixo $y$, faça $x=0$. Esses pontos são chamados de interceptos.`
    },
    3:{
      "Interseção":`Quando duas retas se cruzam, existe um ponto que pertence às duas ao mesmo tempo. Esse é o ponto de interseção.

Para encontrá-lo, precisamos achar valores de $x$ e $y$ que façam as duas equações serem verdadeiras ao mesmo tempo. Por isso resolvemos um sistema.

Se as duas equações estiverem como $y=...$, podemos igualar os lados direitos, descobrir $x$ e depois substituir para encontrar $y$.

Uma solução significa que as retas se cruzam uma vez. Nenhuma solução indica paralelas distintas. Infinitas soluções indicam que são a mesma reta.`,
      "Paralelas e coincidentes":`Retas paralelas apontam na mesma direção e nunca se encontram. Na forma $y=mx+b$, elas têm o mesmo valor de $m$, mas valores diferentes de $b$.

Retas coincidentes também têm a mesma direção, mas na verdade são a mesma reta desenhada duas vezes. Nesse caso, todos os pontos são comuns.

Então não basta ver que os coeficientes angulares são iguais. Depois disso, compare os outros coeficientes para decidir se são paralelas diferentes ou a mesma reta.`,
      "Perpendicularidade":`Duas retas são perpendiculares quando se cruzam formando um ângulo reto, de $90^\\circ$.

Para retas comuns, se uma tem inclinação $m_1$, a outra deve ter uma inclinação que satisfaça $m_1m_2=-1$.

Um jeito prático é inverter a fração e trocar o sinal. Por exemplo: se $m=\\frac12$, a perpendicular tem $m=-2$.

Também existe o caso mais fácil de visualizar: uma reta horizontal e uma reta vertical são perpendiculares.`,
      "Quadro de decisão":`Para classificar duas retas sem se perder, siga uma ordem.

Primeiro descubra as inclinações. Se forem diferentes, as retas se cruzam em um único ponto. Se forem iguais, compare o restante das equações: podem ser paralelas distintas ou coincidentes.

Se o produto das inclinações for $-1$, as retas são perpendiculares.

A ideia é não decorar casos soltos. Faça sempre a mesma sequência de perguntas e a classificação aparece naturalmente.`
    },
    4:{
      "Pontos colineares":`Pontos colineares são pontos que cabem sobre uma mesma reta.

Uma maneira de testar isso é comparar as inclinações. Calcule a inclinação de $A$ para $B$ e depois de $B$ para $C$. Se forem iguais, os três pontos seguem a mesma direção.

Esse método funciona bem na maioria dos casos, mas exige cuidado quando aparece uma reta vertical. Por isso também existe o teste pelo determinante.`,
      "Determinante e alinhamento":`O determinante é uma forma mais geral de verificar se três pontos estão alinhados.

Colocamos as coordenadas dos três pontos na expressão do determinante e calculamos o resultado.

Se o resultado for $0$, os pontos estão na mesma reta. Se o resultado for diferente de $0$, eles formam um triângulo de verdade.

A vantagem é que esse método também funciona quando a reta é vertical, sem precisar dividir por nada.`,
      "Área de triângulo":`As coordenadas dos três vértices são suficientes para calcular a área de um triângulo.

Primeiro calculamos o mesmo determinante usado no teste de alinhamento. Depois pegamos o valor absoluto e dividimos por 2.

Por isso a fórmula é $A=\\frac{|D|}{2}$.

Se o determinante der zero, a área também será zero. Isso significa que os três pontos ficaram alinhados e não formaram um triângulo com área.`,
      "Ligação conceitual":`Colinearidade e área são duas formas de olhar para a mesma situação.

Se três pontos estão alinhados, o “triângulo” fica completamente achatado. Então sua área é zero. Ao mesmo tempo, o determinante também é zero.

Por isso, quando uma questão traz uma letra ou parâmetro, podemos usar $D=0$ para descobrir quando os pontos ficam alinhados, ou usar $\\frac{|D|}{2}$ para impor uma área específica.`
    },
    5:{
      "Ideia geométrica":`A distância de um ponto até uma reta é o menor caminho possível entre eles.

Esse menor caminho não vai em qualquer direção: ele encontra a reta formando um ângulo de $90^\\circ$.

Por isso desenhamos um segmento perpendicular saindo do ponto e chegando à reta. O comprimento desse segmento é a distância procurada.

Essa ideia é importante porque explica a fórmula e também aparece na distância entre retas paralelas e na tangência de circunferências.`,
      "Fórmula ponto–reta":`Para calcular diretamente a distância de $P(x_0,y_0)$ até a reta $Ax+By+C=0$, usamos uma fórmula pronta.

No numerador, substitua o ponto na expressão $Ax+By+C$ e use o valor absoluto. No denominador, calcule $\\sqrt{A^2+B^2}$.

Depois é só dividir.

O valor absoluto é necessário porque uma distância nunca pode ser negativa. Antes de começar, confira se a reta realmente está escrita na forma geral.`,
      "Casos simples":`Algumas distâncias podem ser resolvidas sem a fórmula grande.

Se a reta é vertical, como $x=2$, basta olhar a diferença horizontal entre o $x$ do ponto e o número 2.

Se a reta é horizontal, como $y=5$, basta olhar a diferença vertical entre o $y$ do ponto e o número 5.

Em resumo: reta vertical → compare $x$; reta horizontal → compare $y$.`,
      "Retas paralelas":`Duas retas paralelas ficam sempre à mesma distância uma da outra.

Se elas estiverem escritas como $Ax+By+C_1=0$ e $Ax+By+C_2=0$, com os mesmos $A$ e $B$, podemos calcular essa distância usando a diferença entre $C_1$ e $C_2$.

O cuidado principal é garantir que os coeficientes $A$ e $B$ estejam realmente iguais nas duas equações. Se não estiverem, primeiro precisamos multiplicar ou dividir uma das equações para deixá-las na mesma escala.`
    },
    6:{
      "Definição e forma reduzida":`Uma circunferência é formada por todos os pontos que estão à mesma distância de um centro.

Se o centro é $C(a,b)$ e o raio é $r$, qualquer ponto $P(x,y)$ da borda está exatamente a distância $r$ do centro.

Da fórmula da distância nasce a equação $(x-a)^2+(y-b)^2=r^2$.

Para ler o centro, preste atenção aos sinais: $(x-2)^2$ dá coordenada $2$, enquanto $(y+3)^2$ significa $y-(-3)$, então a coordenada é $-3$.`,
      "Forma geral":`A forma geral da circunferência aparece quando abrimos os quadrados da forma reduzida.

Nela, o centro e o raio ficam escondidos dentro da expressão. Para encontrá-los novamente, precisamos reorganizar os termos e completar quadrados.

O objetivo é transformar a equação de volta em algo como $(x-a)^2+(y-b)^2=r^2$.

Quando chegamos nessa forma, conseguimos ler diretamente o centro $C(a,b)$ e o raio $r$.`,
      "Posição de um ponto":`Para saber se um ponto está dentro, em cima ou fora de uma circunferência, compare sua distância até o centro com o raio.

Se a distância for menor que $r$, o ponto está dentro. Se for igual a $r$, o ponto está exatamente sobre a circunferência. Se for maior, está fora.

Podemos comparar também os valores ao quadrado, $d^2$ e $r^2$, para evitar calcular raízes desnecessárias.`,
      "Tangência":`Uma reta tangente encosta na circunferência em apenas um ponto.

Nesse ponto de contato, o raio é perpendicular à reta. Isso cria um jeito simples de testar tangência: calcule a distância do centro até a reta.

Se essa distância for exatamente igual ao raio, a reta é tangente. Se for menor, a reta atravessa a circunferência em dois pontos. Se for maior, ela não toca a circunferência.`
    }
  };
  function simpleTheoryText(moduleNumber,title){return SIMPLE_THEORY[Number(moduleNumber)]?.[title]||"";}

  const MODULE_VIDEO_GUIDES = {
    1:[
      {title:"Distância entre 2 pontos",channel:"Equaciona com Paulo Pereira",id:"ZJ5Aqwcx9f4"},
      {title:"Distância entre dois pontos | Plano Cartesiano | Geometria Analítica",channel:"Gis com Giz",id:"C2vQ9pMkvpU"}
    ],
    2:[
      {title:"Equação reduzida da reta (com exemplos)",channel:"Equaciona com Paulo Pereira",id:"N4QfzVvgH4Y"},
      {title:"Equação geral da reta",channel:"Equaciona com Paulo Pereira",id:"pRNnguDcR6Y"}
    ],
    3:[
      {title:"Posição relativa de retas — Paralelismo e Perpendicularismo",channel:"Equaciona com Paulo Pereira",id:"toO6S_gbKC4"},
      {title:"Interseção de duas retas no plano",channel:"Prof. Cláudio Teodista",id:"edppmt9dYmA"}
    ],
    4:[
      {title:"G.A. Alinhamentos de Pontos (c/ macete)",channel:"Equaciona com Paulo Pereira",id:"vMK8ehuAZk8"},
      {title:"Área de triângulo a partir do cálculo de um determinante",channel:"Prof. Alexandre Soares",id:"Xl-q-o1tiDE"}
    ],
    5:[
      {title:"Distância entre ponto e reta (com exemplos)",channel:"Equaciona com Paulo Pereira",id:"FSfwY1fM4EI"},
      {title:"Distância entre ponto e reta e entre paralelas",channel:"Pense Matemática com Professor Orestes",id:"2Xgi_O3D9-k"}
    ],
    6:[
      {title:"Equação reduzida da circunferência",channel:"Equaciona com Paulo Pereira",id:"p93CirSoL8A"},
      {title:"Equação geral da circunferência | Geometria Analítica",channel:"Dicasdemat Sandro Curió",id:"ItWiSvXxsww"}
    ]
  };

  function videoGuidePage(module){
    const videos=MODULE_VIDEO_GUIDES[Number(module.numero)]||[];
    return `<article class="theory-card theory-page theory-video-page" data-theory-index="${module.teoria.length}" aria-hidden="true">
      <div class="theory-page-top"><div class="theory-index">05</div><span class="theory-page-count">Etapa 5 de 5</span></div>
      <div class="video-page-heading"><span class="video-page-kicker">Aprofunde com vídeo</span><h4>Veja o conteúdo por outra abordagem</h4><p>A teoria do KANT continua sendo sua base. Se quiser revisar por uma explicação em vídeo, selecione uma das aulas abaixo. O link abre diretamente no YouTube.</p></div>
      <div class="study-video-grid">${videos.map(v=>`<a class="study-video-card" href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener noreferrer" aria-label="Abrir ${v.title} no YouTube"><div class="study-video-thumb"><img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="Miniatura do vídeo ${v.title}" loading="lazy"><span class="study-video-play" aria-hidden="true">▶</span></div><div class="study-video-copy"><small>${v.channel}</small><h5>${v.title}</h5><span>Abrir no YouTube ↗</span></div></a>`).join("")}</div>
      <div class="video-page-note"><b>Dica de estudo</b><p>Use a videoaula para reforçar um ponto que ainda não ficou claro. Depois, volte ao KANT e faça a prática sem consultar a resolução.</p></div>
    </article>`;
  }

  function openStudy(moduleId){
    const m=moduleById(moduleId); if(!m)return; const index=modules.findIndex(x=>x.id===moduleId); if(!isUnlocked(index))return;
    studyModuleId=moduleId;
    $("#studyModuleNumber").textContent=m.numero; $("#studyKicker").textContent=`Módulo ${m.numero} • ${m.subtitulo}`; $("#studyTitle").textContent=m.titulo; $("#studyDescription").textContent=m.descricao;
    const hero=$("#moduleStudyHero"); hero.className=`module-study-hero study-${m.cor}`;
    const practiceCta=document.querySelector("#moduleStudy .practice-cta"); if(practiceCta) practiceCta.className=`practice-cta practice-${m.cor}`;
    const moduleDone=!!moduleResult(moduleId).completed;
    const reviewChoice=$("#completedReviewChoice");
    if(reviewChoice){
      reviewChoice.hidden=!moduleDone;
      reviewChoice.innerHTML=moduleDone?`<div><span class="review-choice-kicker">Módulo concluído ✓</span><b>Você voltou para revisar. Como quer estudar agora?</b><p>Você pode reler a teoria normalmente ou pular direto para as 12 questões extras.</p></div><div class="review-choice-actions"><button class="btn secondary" type="button" id="reviewTheoryBtn">Rever teoria</button><button class="btn primary" type="button" id="reviewExtrasBtn">Ir direto às 12 extras →</button></div>`:"";
      reviewChoice.querySelector("#reviewTheoryBtn")?.addEventListener("click",()=>document.querySelector("#moduleStudy .theory-heading")?.scrollIntoView({behavior:"smooth",block:"start"}));
      reviewChoice.querySelector("#reviewExtrasBtn")?.addEventListener("click",()=>startModule(moduleId,true,true));
    }
    const objectives=$("#studyObjectives"); objectives.innerHTML=m.objetivos.map((o,i)=>`<div><span>0${i+1}</span><p>${o}</p></div>`).join("");
    const grid=$("#theoryGrid");
    grid.classList.add("theory-paged-grid");
    grid.innerHTML=m.teoria.map((t,i)=>`<article class="theory-card theory-page" data-theory-index="${i}" aria-hidden="true"><div class="theory-page-top"><div class="theory-index">${String(i+1).padStart(2,"0")}</div><span class="theory-page-count">Etapa ${i+1} de 5</span></div><div class="theory-title-row"><h4>${t.titulo}</h4><button type="button" class="simplify-theory-btn" data-simplify-index="${i}" aria-pressed="false"><span class="simplify-icon" aria-hidden="true">✨</span><span class="simplify-label">Simplificar explicação</span></button></div><div class="simple-mode-note" data-simple-note="${i}" hidden><b>Versão simples</b><span>Mesma ideia, explicada com palavras mais diretas.</span></div><p class="theory-explanation" data-explanation-index="${i}">${t.texto}</p>${t.image_url?`<img class="theory-content-image" src="${t.image_url}" alt="Imagem de apoio do conteúdo">`:""}<div class="theory-formula" data-formula-index="${i}"></div>${t.formula_image_url?`<img class="theory-inline-image theory-formula-image" src="${t.formula_image_url}" alt="Imagem da fórmula ou resumo">`:""}<div class="guided-example"><b>Exemplo guiado</b><div class="guided-example-content" data-example-index="${i}"></div>${t.example_image_url?`<img class="theory-inline-image theory-example-image" src="${t.example_image_url}" alt="Imagem do exemplo guiado">`:""}</div></article>`).join("")+videoGuidePage(m);
    m.teoria.forEach((t,i)=>{
      window.KantMath?.renderFormula(grid.querySelector(`[data-formula-index="${i}"]`),t.formula);
      const exampleEl=grid.querySelector(`[data-example-index="${i}"]`);
      window.KantMath?.renderTextWithMath(exampleEl,t.exemplo,{allowLatexPrefix:true});
    });
    grid.querySelectorAll(".theory-explanation").forEach((el,i)=>window.KantMath?.renderTextWithMath(el,m.teoria[i]?.texto||el.textContent));
    grid.querySelectorAll("[data-simplify-index]").forEach(btn=>{
      btn.addEventListener("click",()=>{
        const i=Number(btn.dataset.simplifyIndex),theory=m.teoria[i],el=grid.querySelector(`[data-explanation-index="${i}"]`),note=grid.querySelector(`[data-simple-note="${i}"]`);
        if(!theory||!el)return;
        const isSimple=btn.getAttribute("aria-pressed")!=="true";
        const simple=simpleTheoryText(m.numero,theory.titulo);
        btn.setAttribute("aria-pressed",String(isSimple));
        btn.classList.toggle("is-simple",isSimple);
        const label=btn.querySelector(".simplify-label");if(label)label.textContent=isSimple?"Ver explicação completa":"Simplificar explicação";
        if(note)note.hidden=!isSimple;
        el.classList.toggle("is-simple",isSimple);
        window.KantMath?.renderTextWithMath(el,isSimple&&simple?simple:theory.texto);
      });
    });
    if(window.KantCartesian){
      const cards=[...grid.querySelectorAll(".theory-card")];
      m.teoria.forEach((t,i)=>window.KantCartesian.renderForTheoryCard(cards[i],m,t));
    }

    let pager=document.querySelector("#theoryPager");
    if(!pager){
      pager=document.createElement("nav");pager.id="theoryPager";pager.className="theory-pager";pager.setAttribute("aria-label","Navegação da teoria");grid.insertAdjacentElement("afterend",pager);
    }
    const total=m.teoria.length+1;
    let current=0;
    const renderTheoryPage=(nextIndex,scroll=false)=>{
      current=Math.max(0,Math.min(total-1,nextIndex));
      const cards=[...grid.querySelectorAll(".theory-page")];
      cards.forEach((card,i)=>{const active=i===current;card.classList.toggle("active",active);card.hidden=!active;card.setAttribute("aria-hidden",String(!active));});
      const currentTheory=current<m.teoria.length?m.teoria[current]:{titulo:"Videoaulas selecionadas"};
      const pageTitles=[...m.teoria.map(t=>t.titulo),"Videoaulas selecionadas"];
      pager.innerHTML=`<button class="theory-nav-btn theory-prev" type="button" ${current===0?"disabled":""}>← Anterior</button><div class="theory-pager-center"><span>${current+1} de ${total}</span><div class="theory-dots">${pageTitles.map((_,i)=>`<button type="button" class="theory-dot ${i===current?"active":""}" data-theory-page="${i}" aria-label="Abrir etapa ${i+1}" aria-current="${i===current?"step":"false"}"></button>`).join("")}</div></div><button class="theory-nav-btn theory-next" type="button">${current===total-1?"Ir para a prática →":`Próximo: ${pageTitles[current+1]||"etapa"} →`}</button>`;
      pager.querySelector(".theory-prev")?.addEventListener("click",()=>renderTheoryPage(current-1,true));
      pager.querySelector(".theory-next")?.addEventListener("click",()=>{
        if(current<total-1)renderTheoryPage(current+1,true);
        else practiceCta?.scrollIntoView({behavior:"smooth",block:"center"});
      });
      pager.querySelectorAll("[data-theory-page]").forEach(btn=>btn.addEventListener("click",()=>renderTheoryPage(Number(btn.dataset.theoryPage),true)));
      if(practiceCta)practiceCta.hidden=current!==total-1;
      if(scroll){document.querySelector("#moduleStudy .theory-heading")?.scrollIntoView({behavior:"smooth",block:"start"});}
      pager.dataset.currentTitle=currentTheory?.titulo||"";
    };
    renderTheoryPage(0,false);
    $("#practiceSummary").textContent=moduleDone?`Módulo já concluído • você pode refazer as 8 principais ou ir direto às 12 extras.`:`8 questões obrigatórias • 12 questões extras de treino • feedback imediato • 70% libera o próximo módulo.`;
    const mainPracticeBtn=$("#startModulePracticeBtn"),extraPracticeBtn=$("#startModuleExtraBtn");
    if(mainPracticeBtn)mainPracticeBtn.textContent=moduleDone?"Refazer 8 principais →":"Começar exercícios →";
    if(extraPracticeBtn){extraPracticeBtn.hidden=!moduleDone;}
    show("moduleStudy");
  }

  function normalizeModuleQuestion(q,m){return {id:q.id,topic:m.titulo,visual:`Módulo ${m.numero} • ${m.subtitulo}`,q:q.enunciado,opts:[...q.alternativas],a:q.correta,exp:q.explicacao,hint:q.dica||"",imageUrl:q.image_url||"",explanationImageUrl:q.explanation_image_url||"",difficulty:q.dificuldade,xpValue:Number(q.xp)||30,moduleQuestion:true,moduleId:m.id,moduleNumber:Number(m.numero)||0};}
  function startModule(moduleId,forceFresh=false,extra=false){
    const m=moduleById(moduleId); if(!m)return;
    lastMode=extra?"module-extra":"module";mode=lastMode;currentModuleId=moduleId;lastModuleId=moduleId;
    const source=extra?((window.KANT_EXTRA_QUESTIONS||{})[Number(m.numero)]||[]):(m.questoes||[]).slice(0,8);
    questions=source.map(q=>normalizeModuleQuestion(q,m));
    const saved=moduleResult(moduleId);
    const canResume=!extra&&!forceFresh&&saved.inProgress&&saved.currentTotal===questions.length&&saved.currentAnswered>0&&saved.currentAnswered<questions.length;
    idx=canResume?saved.currentAnswered:0;lives=3;xp=0;streak=0;bestStreak=0;score=canResume?saved.currentCorrect:0;answered=false;lightning=false;runDeadline=0;runDuration=0;
    $("#modeLabel").textContent=extra?`Módulo ${m.numero} • Treino extra`:`Módulo ${m.numero} • Prática`;
    $("#lightningToggle").style.display="none";
    if(!extra&&!canResume) recordModuleCheckpoint(false);
    show("game");render();
  }
  function buildSet(m){
    if(m==="quick")return shuffle(remainingChallengePool("quick")).slice(0,10);
    if(m==="lightning")return shuffle(remainingChallengePool("lightning")).slice(0,5);
    if(m==="vestibular")return shuffle(remainingChallengePool("vestibular")).slice(0,10);
    return shuffle(challengeQuestionPool()).slice(0,24);
  }
  function start(m,forceFresh=false){
    if((m==="quick"||m==="lightning")&&!challengeAccess()){renderChallenges();return;}
    if(m==="vestibular"&&!vestibularAccess()){renderChallenges();return;}
    const nextSet=buildSet(m);
    if(["quick","lightning","vestibular"].includes(m)&&!nextSet.length){renderChallenges();window.alert("Banco concluído: não há mais questões inéditas disponíveis neste desafio.");return;}
    lastMode=m;mode=m;currentModuleId=null;questions=nextSet;idx=0;lives=3;xp=0;streak=0;bestStreak=0;score=0;answered=false;lightning=(m==="lightning");runDeadline=0;runDuration=0;
    if(lightning){runDuration=120000;runDeadline=performance.now()+runDuration;}
    $("#modeLabel").textContent=m==="campaign"?"Revisão integrada":m==="quick"?"Batalha Rápida":m==="lightning"?"Desafio Relâmpago":"Desafio Vestibulares";
    $("#lightningToggle").style.display="none";
    show("game");render();
  }

  function updateStats(){$("#lives").textContent=lives+" ❤️";$("#xp").textContent=xp;const mult=(1+streak*.1).toFixed(1).replace(".0","");$("#streak").textContent=`${streak} 🔥 • ${mult}×`;$("#score").textContent=score;const pct=Math.round((idx/questions.length)*100);$("#progressText").textContent=pct+"%";$("#progressBar").style.width=pct+"%";}
  function resetHint(q){const area=$("#hintArea"),btn=$("#hintBtn"),box=$("#hintBox");if(!area||!btn||!box)return;box.hidden=true;box.textContent="";btn.style.display=q.hint?"inline-flex":"none";btn.disabled=false;btn.textContent="💡 Ver dica • −50% XP";area.style.display=q.hint?"block":"none";}
  function render(){
    clearTimer();
    if(idx>=questions.length){finish();return;}
    answered=false;hintUsed=false;const q=questions[idx];
    $("#topic").textContent=q.topic||q.source||"Geometria Analítica";
    $("#counter").textContent=`Questão ${idx+1} de ${questions.length}`;
    $("#levelLabel").textContent=(mode==="module"||mode==="module-extra")?`${mode==="module-extra"?"Treino extra":"Prática"} • ${difficultyLabel(q.difficulty)}`:mode==="vestibular"?`Vestibular • 45 XP base • 2× XP`:`${difficultyLabel(q.difficulty)} • ${Number(q.xpValue)||30} XP base`;
    $("#visual").textContent=q.visual||"";$("#question").textContent=q.q;$("#feedback").innerHTML="";$("#nextBtn").style.display="none";$("#nextBtn").textContent="Próxima questão →";$("#options").innerHTML="";const reveal=$("#answerRevealActions");if(reveal)reveal.hidden=true;
    const media=$("#questionMedia"),expMedia=$("#explanationMedia");if(media){media.innerHTML="";media.hidden=!q.imageUrl;if(q.imageUrl){const img=document.createElement("img");img.src=q.imageUrl;img.alt="Imagem da questão";media.appendChild(img);}}if(expMedia){expMedia.innerHTML="";expMedia.hidden=true;}
    window.KantMath?.renderInline($("#question"));resetHint(q);
    q.opts.forEach((opt,i)=>{const b=document.createElement("button");b.className="option";b.textContent=String.fromCharCode(65+i)+") "+opt;b.addEventListener("click",()=>answer(i,b));$("#options").appendChild(b);window.KantMath?.renderInline(b);});
    updateStats();if(lightning)startRunTimer();else $("#timerWrap").style.display="none";
  }
  function xpForCorrect(q){
    const base=Number(q.xpValue)||30;
    const streakMultiplier=1+streak*.1;
    const modeMultiplier=mode==="lightning"?1.5:mode==="vestibular"?2:1;
    const hintMultiplier=hintUsed?.5:1;
    return {base,streakMultiplier,modeMultiplier,hintMultiplier,gain:Math.round(base*streakMultiplier*modeMultiplier*hintMultiplier)};
  }
  function plainMathText(value){
    return String(value||"")
      .replace(/\\left|\\right/g,"")
      .replace(/\\cdot/g,"·")
      .replace(/\\times/g,"×")
      .replace(/\\Delta/g,"Δ")
      .replace(/\\sqrt/g,"√")
      .replace(/\\frac/g,"fração ")
      .replace(/\$/g,"")
      .replace(/[{}]/g,"")
      .replace(/\\/g,"")
      .replace(/\s+/g," ")
      .trim();
  }
  function resolutionRule(q){
    const text=(q.q+" "+q.exp+" "+q.hint).toLowerCase();
    if(/quadrante/.test(text))return "Observe primeiro os sinais das coordenadas: x indica esquerda/direita e y indica baixo/cima. Depois associe essa combinação ao quadrante correto.";
    if(/ponto médio|ponto medio/.test(text))return "Use M = ((x1 + x2)/2, (y1 + y2)/2). Faça separadamente a média das abscissas e a média das ordenadas.";
    if(/distância|distancia/.test(text)&&/reta/.test(text)&&!/entre.*ponto/.test(text))return "Se a reta estiver na forma Ax + By + C = 0, use d = |Ax0 + By0 + C| / √(A² + B²). Em retas verticais ou horizontais, a diferença direta das coordenadas costuma ser mais simples.";
    if(/distância|distancia/.test(text)&&/(ponto|a\(|p\()/.test(text))return "Para dois pontos, calcule Δx e Δy e use d = √[(Δx)² + (Δy)²]. Se os pontos tiverem a mesma coordenada x ou y, basta calcular a diferença na outra coordenada.";
    if(/coeficiente angular|inclinação|inclinacao|taxa de variação|taxa de variacao/.test(text))return "O coeficiente angular mede quanto y varia quando x varia: m = (y2 − y1)/(x2 − x1). Atenção à ordem: use a mesma ordem no numerador e no denominador.";
    if(/ponto.?inclinação|ponto.?inclinacao/.test(text))return "Quando conhecemos um ponto (x0,y0) e a inclinação m, use y − y0 = m(x − x0) e depois simplifique apenas se a questão pedir outra forma.";
    if(/forma reduzida|y=|y =/.test(text)&&/reta/.test(text))return "Compare ou transforme a equação para y = mx + b. Nessa forma, m é a inclinação e b é o ponto em que a reta corta o eixo y.";
    if(/forma geral/.test(text))return "Leve todos os termos para o mesmo lado até obter Ax + By + C = 0. Depois confira se a nova equação é equivalente à original.";
    if(/intercepta|eixo x|eixo y/.test(text))return "Para encontrar o intercepto no eixo x, faça y = 0. Para o intercepto no eixo y, faça x = 0. Resolva a equação restante.";
    if(/interseção|intersecao/.test(text))return "No ponto de interseção, as duas retas têm o mesmo x e o mesmo y. Iguale as expressões (ou resolva o sistema) e depois substitua para encontrar a outra coordenada.";
    if(/paralela/.test(text))return "Retas paralelas não verticais têm o mesmo coeficiente angular. Depois de manter a inclinação, use o ponto dado para descobrir o termo independente quando necessário.";
    if(/perpendicular/.test(text))return "Para retas não verticais, inclinações perpendiculares satisfazem m1·m2 = −1. Portanto, a nova inclinação é o inverso com sinal trocado.";
    if(/coincidente/.test(text))return "Retas coincidentes representam exatamente o mesmo conjunto de pontos. Coloque ambas na mesma forma e compare todos os coeficientes, não apenas a inclinação.";
    if(/colinear|alinhad/.test(text))return "Três pontos são colineares quando pertencem à mesma reta. Você pode comparar inclinações ou verificar se o determinante associado aos três pontos é zero.";
    if(/área|area|triângulo|triangulo/.test(text))return "Para triângulos no plano, use base·altura/2 quando base e altura forem fáceis de enxergar; caso contrário, use o determinante. Área zero indica pontos colineares.";
    if(/circunfer/.test(text)&&/centro|raio|equação|equacao/.test(text))return "Na forma reduzida, (x − a)² + (y − b)² = r²: o centro é C(a,b) e o raio é r. Ao passar para a forma geral, desenvolva os quadrados e reúna os termos semelhantes.";
    if(/interior|exterior|sobre/.test(text)&&/circunfer/.test(text))return "Calcule a distância do ponto ao centro e compare com o raio: menor que r significa interior, igual a r significa sobre a circunferência e maior que r significa exterior.";
    return "Identifique os dados fornecidos, escolha a relação matemática adequada e substitua os valores com atenção aos sinais antes de simplificar.";
  }
  function detailedResolution(q){
    const letter=String.fromCharCode(65+Number(q.a||0));
    const strategy=plainMathText(q.hint)||"Separe os dados do enunciado antes de calcular.";
    const development=plainMathText(q.exp)||"Faça as substituições indicadas e simplifique passo a passo.";
    const answer=plainMathText(q.opts?.[q.a]??"");
    return `RESOLUÇÃO PASSO A PASSO

1. Ideia principal
${resolutionRule(q)}

2. Como começar
${strategy}

3. Desenvolvimento
${development}

4. Conclusão
A alternativa correta é ${letter}) ${answer}.`;
  }
  function renderResolution(q,leadHtml){
    const fb=$("#feedback");
    fb.innerHTML=leadHtml;
    const box=document.createElement("div");box.className="detailed-resolution";fb.appendChild(box);
    if(q.resolution){
      const title=document.createElement("div");title.className="resolution-title";title.textContent="RESOLUÇÃO PASSO A PASSO";box.appendChild(title);
      const body=document.createElement("div");body.className="resolution-rich";box.appendChild(body);
      window.KantMath?.renderTextWithMath(body,q.resolution);
    }else box.textContent=detailedResolution(q);
  }
  const repeatableXpMode=()=>!["module","module-extra"].includes(mode);
  async function answer(choice,btn){
    if(answered||btn.disabled)return;
    clearTimer();
    const q=questions[idx],opts=[...document.querySelectorAll(".option")],correct=choice===q.a;
    if(window.kantRecordAnswer)window.kantRecordAnswer(correct);
    if(correct){
      answered=true;score++;streak++;bestStreak=Math.max(bestStreak,streak);if(["quick","lightning","vestibular"].includes(mode))markChallengeUsed(mode,q.id);
      opts.forEach((b,i)=>{b.disabled=true;if(i===q.a)b.classList.add("correct")});
      const calc=xpForCorrect(q);let awarded=true;
      if(repeatableXpMode()){
        xp+=calc.gain;if(window.geoquestAddXP)window.geoquestAddXP(calc.gain);
      }else if(window.kantAwardQuestionXPOnce){
        const result=await window.kantAwardQuestionXPOnce(q.id,calc.gain);awarded=!!result?.awarded;if(awarded)xp+=calc.gain;
      }else{xp+=calc.gain;if(window.geoquestAddXP)window.geoquestAddXP(calc.gain);}
      const parts=[`${calc.streakMultiplier.toFixed(1)}× sequência`];
      if(calc.modeMultiplier>1)parts.push(mode==="vestibular"?`${calc.modeMultiplier.toFixed(1)}× vestibulares`:`${calc.modeMultiplier.toFixed(1)}× relâmpago`);
      if(calc.hintMultiplier<1)parts.push("0,5× por uso da dica");
      const lead=awarded?`<span class="ok"><b>✅ Acertou!</b> +${calc.gain} XP <small>(${parts.join(" • ")})</small></span>`:`<span class="ok"><b>✅ Acertou!</b> <small>XP desta questão já recebido anteriormente.</small></span><br><span class="xp-repeat-note">Você pode refazer para estudar e manter a sequência, mas questões comuns concedem XP apenas no primeiro acerto.</span>`;
      renderResolution(q,lead);
      const reveal=$("#answerRevealActions");if(reveal)reveal.hidden=true;
      if($("#hintBtn"))$("#hintBtn").disabled=true;
      $("#nextBtn").style.display="inline-block";
    }else{
      lives=Math.max(0,lives-1);streak=0;btn.classList.add("wrong");btn.disabled=true;
      if(lives===0){
        answered=true;if(["quick","lightning","vestibular"].includes(mode))markChallengeUsed(mode,q.id);opts.forEach(b=>b.disabled=true);
        $("#feedback").innerHTML='<span class="no"><b>❌ Suas vidas acabaram.</b> A tentativa termina aqui e deve recomeçar desde a primeira questão.</span>';
        const reveal=$("#answerRevealActions");if(reveal)reveal.hidden=true;
        $("#nextBtn").style.display="inline-block";$("#nextBtn").textContent="Recomeçar do início ↻";
        if($("#hintBtn"))$("#hintBtn").disabled=true;
      }else{
        $("#feedback").innerHTML=`<span class="no"><b>❌ Essa alternativa não está correta.</b></span><br><span class="retry-note">Você ainda tem ${lives} ${lives===1?"vida":"vidas"}. Tente outra alternativa ou, se preferir encerrar a questão, use “Mostrar resposta”.</span>`;
        const reveal=$("#answerRevealActions");if(reveal)reveal.hidden=false;
        if(lightning&&runDeadline>performance.now())startRunTimer();
      }
    }
    const expMedia=$("#explanationMedia");if(expMedia){expMedia.innerHTML="";expMedia.hidden=true;}
    updateStats();if(mode==="module"&&answered)recordModuleCheckpoint(true);
  }
  function revealAnswer(){
    if(answered||idx>=questions.length)return;
    const q=questions[idx],opts=[...document.querySelectorAll(".option")];
    answered=true;streak=0;clearTimer();if(["quick","lightning","vestibular"].includes(mode))markChallengeUsed(mode,q.id);
    opts.forEach((b,i)=>{b.disabled=true;if(i===q.a)b.classList.add("correct")});
    renderResolution(q,'<span class="answer-shown"><b>👁 Resposta revelada.</b> Esta questão não concede XP porque a resposta foi mostrada.</span>');
    const expMedia=$("#explanationMedia");if(expMedia){expMedia.innerHTML="";expMedia.hidden=!q.explanationImageUrl;if(q.explanationImageUrl){const img=document.createElement("img");img.src=q.explanationImageUrl;img.alt="Imagem da explicação";expMedia.appendChild(img);}}
    const reveal=$("#answerRevealActions");if(reveal)reveal.hidden=true;
    if($("#hintBtn"))$("#hintBtn").disabled=true;
    $("#nextBtn").style.display="inline-block";updateStats();if(mode==="module")recordModuleCheckpoint(true);
  }
  function startRunTimer(){
    if(!lightning)return;$("#timerWrap").style.display="block";if(!runDeadline){runDuration=120000;runDeadline=performance.now()+runDuration;}tickRunTimer();
  }
  function tickRunTimer(){const rem=Math.max(0,runDeadline-performance.now());$("#timerText").textContent=Math.ceil(rem/1000)+" s";$("#timerBar").style.width=(rem/runDuration*100)+"%";if(rem<=0){runDeadline=0;clearTimer();finish();return;}timerId=requestAnimationFrame(tickRunTimer);}
  function clearTimer(){if(timerId){cancelAnimationFrame(timerId);timerId=null;}}
  function restartCurrent(){
    clearTimer();
    if((mode==="module"||mode==="module-extra")&&currentModuleId)startModule(currentModuleId,true,mode==="module-extra");
    else start(mode,true);
  }
  function next(){if(lives<=0){restartCurrent();return;}idx++;render();}


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
  async function finish(){
    clearTimer();runDeadline=0;
    $("#rScore").textContent=score;$("#rTotal").textContent=questions.length;$("#rXp").textContent=xp;$("#rStreak").textContent=bestStreak;
    const rate=questions.length?Math.round(score/questions.length*100):0,continueBtn=$("#continuePhaseBtn"),extraBtn=$("#extraPracticeBtn");if($("#againBtn"))$("#againBtn").disabled=false;
    if(extraBtn)extraBtn.style.display="none";
    if(mode==="module"){
      const m=moduleById(currentModuleId);await recordModuleResult(currentModuleId,rate);const moduleIndex=modules.findIndex(x=>x.id===currentModuleId),passed=rate>=70,hasNext=moduleIndex<modules.length-1;
      $("#resultMessage").textContent=passed?(hasNext?`${m.titulo}: ${rate}% de acertos. Próximo módulo desbloqueado. Você também liberou 12 exercícios extras para reforço.`:`${m.titulo}: ${rate}% de acertos. Trilha principal concluída! Os 12 exercícios extras continuam disponíveis para treino.`):`${m.titulo}: ${rate}% de acertos. Você precisa de 70% para liberar o próximo módulo, mas pode usar os exercícios extras para reforçar o conteúdo.`;
      if(continueBtn){continueBtn.style.display=passed&&hasNext?"inline-block":"none";continueBtn.textContent=passed&&hasNext?`Abrir módulo ${moduleIndex+2} →`:"";}
      if(extraBtn){extraBtn.style.display="inline-block";extraBtn.textContent="Treinar 12 questões extras →";}
      $("#againBtn").textContent="Refazer 8 obrigatórias";
    }else if(mode==="module-extra"){
      const m=moduleById(currentModuleId);$("#resultMessage").textContent=`Treino extra de ${m?.titulo||"módulo"}: ${rate}% de acertos. Essas questões não alteram o desbloqueio da trilha; servem para ganhar domínio e XP.`;
      if(continueBtn)continueBtn.style.display="none";$("#againBtn").textContent="Refazer treino extra";
    }else{
      const remaining=["quick","lightning","vestibular"].includes(mode)?challengeRemaining(mode):null;
      if(mode==="vestibular")$("#resultMessage").textContent=`${rate}% de acertos. ${remaining>0?`${remaining} questões inéditas de vestibulares ainda não apareceram.`:"Banco de vestibulares concluído: você já passou por todas as 50 questões."}`;
      else if(mode==="quick"||mode==="lightning")$("#resultMessage").textContent=`${rate}% de acertos. ${remaining>0?`${remaining} questões inéditas ainda restam neste modo.`:`Banco concluído neste desafio: todas as ${challengeQuestionPool().length} questões já apareceram.`}`;
      else $("#resultMessage").textContent=rate>=85?"Excelente domínio. Você chegou forte nesta rodada.":rate>=65?"Bom desempenho. Vale revisar os erros antes de outra rodada.":"A base está sendo construída. Refaça a rodada e observe as explicações dos erros.";
      if(continueBtn)continueBtn.style.display="none";$("#againBtn").textContent=remaining===0?"Banco concluído":"Jogar próximas inéditas";$("#againBtn").disabled=remaining===0;
    }
    show("results");if(window.geoquestFlushXP){try{await window.geoquestFlushXP();}catch(_e){}}
  }


  document.querySelectorAll("[data-mode]").forEach(el=>el.addEventListener("click",()=>start(el.dataset.mode)));
  document.getElementById("navHome")?.addEventListener("click",()=>show("home"));document.getElementById("navChallenges")?.addEventListener("click",()=>show("challenges"));document.getElementById("navProfile")?.addEventListener("click",()=>show("profile"));document.getElementById("navAdmin")?.addEventListener("click",()=>{if(window.kantIsAdmin)show("admin");});document.getElementById("profileChangePhotoBtn")?.addEventListener("click",()=>document.getElementById("settingsBtn")?.click());
  $("#studyBackBtn")?.addEventListener("click",()=>show("home"));$("#startModulePracticeBtn")?.addEventListener("click",()=>studyModuleId&&startModule(studyModuleId));$("#startModuleExtraBtn")?.addEventListener("click",()=>studyModuleId&&startModule(studyModuleId,true,true));
  function resetRunState(){clearTimer();idx=0;lives=3;xp=0;streak=0;bestStreak=0;score=0;answered=false;lightning=false;runDeadline=0;runDuration=0;currentModuleId=null;}
  function leaveRun(){clearTimer();if(mode==="module"&&currentModuleId)Promise.resolve(recordModuleCheckpoint(answered)).catch(()=>{});show("home");if(window.geoquestFlushXP)Promise.resolve(window.geoquestFlushXP()).catch(()=>{});resetRunState();}
  $("#nextBtn")?.addEventListener("click",next);$("#hintBtn")?.addEventListener("click",()=>{if(answered)return;const q=questions[idx];if(!q?.hint)return;if(!hintUsed){const ok=window.confirm("Abrir a dica reduz pela metade o XP que esta questão pode conceder. Deseja ver a dica mesmo assim?");if(!ok)return;hintUsed=true;}const box=$("#hintBox"),btn=$("#hintBtn");box.textContent=q.hint;box.hidden=false;window.KantMath?.renderInline(box);btn.textContent="💡 Dica aberta • XP pela metade";btn.disabled=true;});
  $("#showAnswerBtn")?.addEventListener("click",revealAnswer);
  $("#restartBtn")?.addEventListener("click",(e)=>{e.preventDefault();restartCurrent();});$("#backBtn")?.addEventListener("click",(e)=>{e.preventDefault();leaveRun();});$("#quitRunBtn")?.addEventListener("click",(e)=>{e.preventDefault();leaveRun();});
  $("#continuePhaseBtn")?.addEventListener("click",()=>{if(!lastModuleId)return;const i=modules.findIndex(m=>m.id===lastModuleId);if(i>=0&&i<modules.length-1)openStudy(modules[i+1].id);});$("#extraPracticeBtn")?.addEventListener("click",()=>{if(lastModuleId)startModule(lastModuleId,true,true);});$("#againBtn")?.addEventListener("click",()=>{if((lastMode==="module"||lastMode==="module-extra")&&lastModuleId)startModule(lastModuleId,true,lastMode==="module-extra");else start(lastMode,true);});$("#menuBtn")?.addEventListener("click",()=>show("home"));$("#lightningToggle")?.addEventListener("click",()=>{});
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
