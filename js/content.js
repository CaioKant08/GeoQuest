(() => {
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const defaults = clone(window.KANT_DEFAULT_MODULES || window.KANT_MODULES || []);


  const LEGACY_TEXTS = {
    "1:1": "O plano cartesiano tem dois eixos perpendiculares: x, horizontal, e y, vertical. Um ponto P(x, y) é um par ordenado; trocar a ordem das coordenadas muda o ponto.",
    "1:2": "As diferenças horizontal e vertical formam os catetos de um triângulo retângulo. Por isso, a fórmula da distância é o Teorema de Pitágoras escrito em coordenadas.",
    "1:3": "O ponto médio divide o segmento em duas partes de mesmo comprimento. Suas coordenadas são as médias aritméticas das coordenadas dos extremos.",
    "1:4": "Distância e ponto médio aparecem em classificação de triângulos, diagonais, medianas, centros de segmentos e problemas de equidistância.",
    "2:1": "O coeficiente angular mede a taxa de variação de y em relação a x. Ele indica se a reta cresce, decresce ou é horizontal. Retas verticais não têm coeficiente angular definido.",
    "2:2": "Toda reta pode ser escrita na forma geral. Quando B≠0, podemos isolar y e obter a forma reduzida, em que m aparece diretamente.",
    "2:3": "Se conhecemos um ponto da reta e seu coeficiente angular, a forma ponto–inclinação é o caminho mais direto para montar a equação.",
    "2:4": "Dois pontos distintos determinam uma única reta. Para localizar os interceptos, faça y=0 para o eixo x e x=0 para o eixo y.",
    "3:1": "Duas retas concorrentes têm um único ponto em comum. Esse ponto é a solução do sistema formado pelas duas equações.",
    "3:2": "Retas não verticais paralelas têm o mesmo coeficiente angular. Se também tiverem o mesmo coeficiente linear, são coincidentes.",
    "3:3": "No caso usual, os coeficientes angulares de retas perpendiculares são inversos opostos. Uma reta vertical é perpendicular a uma horizontal.",
    "3:4": "Mesmo m e interceptos diferentes: paralelas. Equações equivalentes: coincidentes. Coeficientes diferentes: concorrentes. Produto −1: perpendiculares.",
    "4:1": "Três pontos são colineares quando pertencem à mesma reta. Podemos comparar coeficientes angulares ou usar um determinante, inclusive em retas verticais.",
    "4:2": "O determinante de ordem 3 organiza as coordenadas dos três pontos. Se o resultado for zero, a área associada também é zero.",
    "4:3": "A área de um triângulo no plano cartesiano é metade do módulo do mesmo determinante usado para testar colinearidade.",
    "4:4": "Colinearidade e área são duas faces do mesmo cálculo: se o determinante é zero, o triângulo “achata” e sua área é zero.",
    "5:1": "A distância de um ponto a uma reta é o comprimento do segmento perpendicular que liga o ponto à reta. É a menor distância possível.",
    "5:2": "Para usar a fórmula, a reta deve estar na forma geral Ax+By+C=0. O valor absoluto impede resultado negativo.",
    "5:3": "Em retas verticais ou horizontais, a distância é apenas a diferença absoluta entre a coordenada do ponto e a constante da reta.",
    "5:4": "Para duas retas paralelas com os mesmos coeficientes A e B, a distância depende apenas da diferença entre os termos constantes.",
    "6:1": "Circunferência é o conjunto dos pontos que estão à mesma distância de um centro C(a,b). Essa distância constante é o raio r.",
    "6:2": "Ao desenvolver a forma reduzida, obtemos uma equação com x² e y². Completando quadrados, recuperamos centro e raio.",
    "6:3": "Compare a distância do ponto ao centro com o raio. Menor: interior; igual: sobre a circunferência; maior: exterior.",
    "6:4": "Uma reta é tangente quando toca a circunferência em um único ponto. Isso acontece quando a distância do centro à reta é exatamente igual ao raio."
  };

  const LEGACY_THEORY = {
    "1:1": {formula:"1º: (+,+) • 2º: (−,+) • 3º: (−,−) • 4º: (+,−)", exemplo:"A(−4,3) está no 2º quadrante; B(2,−5), no 4º."},
    "1:2": {formula:"latex:d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}", exemplo:"Entre $A(-2,5)$ e $B(4,-3)$:\n$$d=\\sqrt{(4-(-2))^2+(-3-5)^2}=\\sqrt{6^2+(-8)^2}=10$$"},
    "1:3": {formula:"latex:M=\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)", exemplo:"Para $A(7,-1)$ e $B(-3,11)$:\n$$M=\\left(\\frac{7+(-3)}{2},\\frac{-1+11}{2}\\right)=(2,5)$$"},
    "1:4": {formula:"mesma ordenada → d = |x₂−x₁| • mesma abscissa → d = |y₂−y₁|", exemplo:"Se A e B têm o mesmo y, basta medir a diferença horizontal."},
    "2:1": {formula:"latex:m=\\frac{y_2-y_1}{x_2-x_1}=\\frac{\\Delta y}{\\Delta x}", exemplo:"A(2,3) e B(6,11): m=(11−3)/(6−2)=2."},
    "2:2": {formula:"Ax + By + C = 0   ⇄   y = mx + b", exemplo:"3x−2y+6=0 → y=(3/2)x+3."},
    "2:3": {formula:"y − y₀ = m(x − x₀)", exemplo:"m=3 e P(2,−1): y+1=3(x−2) → y=3x−7."},
    "2:4": {formula:"reta vertical: x=k • reta horizontal: y=k", exemplo:"y=2x−6 corta o eixo x em (3,0) e o eixo y em (0,−6)."},
    "3:1": {formula:"r ∩ s = solução do sistema", exemplo:"y=x+1 e y=−2x+7 → x=2 e y=3."},
    "3:2": {formula:"paralelas: m₁=m₂", exemplo:"y=3x+2 e y=3x−4 são paralelas distintas."},
    "3:3": {formula:"m₁·m₂ = −1", exemplo:"Se m₁=1/2, então m₂=−2."},
    "3:4": {formula:"mesmo m ≠ mesma reta", exemplo:"2x−y+3=0 e 4x−2y+6=0 representam a mesma reta."},
    "4:1": {formula:"det |x y 1| = 0", exemplo:"A(1,2), B(3,6), C(5,10): as inclinações são iguais, então os pontos estão alinhados."},
    "4:2": {formula:"D = x₁(y₂−y₃)+x₂(y₃−y₁)+x₃(y₁−y₂)", exemplo:"D=0 ⇔ os três pontos são colineares."},
    "4:3": {formula:"latex:A=\\frac{|D|}{2}", exemplo:"A(1,1), B(5,1), C(3,4) → A=6."},
    "4:4": {formula:"área zero ⇔ colinearidade", exemplo:"Esse vínculo ajuda a resolver problemas com parâmetros."},
    "5:1": {formula:"distância = segmento perpendicular mínimo", exemplo:"Não basta escolher qualquer ponto da reta; o segmento precisa ser perpendicular."},
    "5:2": {formula:"latex:d=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}", exemplo:"P(2,−1) e 3x+4y−10=0 → d=8/5."},
    "5:3": {formula:"x=k → |x₀−k| • y=k → |y₀−k|", exemplo:"De (7,−4) até x=2, a distância é 5."},
    "5:4": {formula:"latex:d=\\frac{|C_1-C_2|}{\\sqrt{A^2+B^2}}", exemplo:"3x+4y−2=0 e 3x+4y+18=0 → d=20/5=4."},
    "6:1": {formula:"(x−a)² + (y−b)² = r²", exemplo:"Centro (2,−3), raio 5 → (x−2)²+(y+3)²=25."},
    "6:2": {formula:"x²+y²+Dx+Ey+F=0", exemplo:"x²+y²−6x+4y−12=0 → (x−3)²+(y+2)²=25."},
    "6:3": {formula:"d<r: interior • d=r: pertencente • d>r: exterior", exemplo:"Em centro (1,2), r=4, o ponto (4,2) está no interior porque d=3."},
    "6:4": {formula:"reta tangente ⇔ d(C,r)=raio", exemplo:"Centro (2,3) e reta 4x+3y−2=0 → distância 3, então o raio tangente é 3."}
  };

  const PREVIOUS_EXAMPLES = {
    "1:1": "O ponto $A(-4,3)$ tem $x<0$ e $y>0$, portanto está no $2^\\circ$ quadrante. Já $B(2,-5)$ tem $x>0$ e $y<0$, logo está no $4^\\circ$ quadrante.",
    "1:2": "Entre $A(-2,5)$ e $B(4,-3)$:\n$$d=\\sqrt{(4-(-2))^2+(-3-5)^2}$$\n$$d=\\sqrt{6^2+(-8)^2}=\\sqrt{100}=10$$",
    "1:3": "Para $A(7,-1)$ e $B(-3,11)$:\n$$M=\\left(\\frac{7+(-3)}{2},\\frac{-1+11}{2}\\right)$$\n$$M=(2,5)$$",
    "1:4": "Se $A(-3,4)$ e $B(5,4)$ têm a mesma ordenada, então:\n$$d=|5-(-3)|=8$$",
    "2:1": "Para $A(2,3)$ e $B(6,11)$:\n$$m=\\frac{11-3}{6-2}=\\frac{8}{4}=2$$",
    "2:2": "Partindo de $3x-2y+6=0$:\n$$-2y=-3x-6$$\n$$y=\\frac{3}{2}x+3$$",
    "2:3": "Com $m=3$ e $P(2,-1)$:\n$$y-(-1)=3(x-2)$$\n$$y=3x-7$$",
    "2:4": "Na reta $y=2x-6$:\n$$y=0\\Rightarrow x=3\\Rightarrow (3,0)$$\n$$x=0\\Rightarrow y=-6\\Rightarrow (0,-6)$$",
    "3:1": "Para $r:y=x+1$ e $s:y=-2x+7$:\n$$x+1=-2x+7\\Rightarrow 3x=6\\Rightarrow x=2$$\n$$y=2+1=3$$\nLogo, $r\\cap s=(2,3)$.",
    "3:2": "As retas $y=3x+2$ e $y=3x-4$ têm o mesmo coeficiente angular $m=3$, mas interceptos diferentes. Portanto, são paralelas distintas.",
    "3:3": "Se $m_1=\\frac12$, a reta perpendicular deve ter:\n$$\\frac12\\cdot m_2=-1\\Rightarrow m_2=-2$$",
    "3:4": "Multiplicando $2x-y+3=0$ por $2$, obtemos:\n$$4x-2y+6=0$$\nAs duas equações representam a mesma reta.",
    "4:1": "Para $A(1,2)$, $B(3,6)$ e $C(5,10)$:\n$$m_{AB}=\\frac{6-2}{3-1}=2\\qquad m_{BC}=\\frac{10-6}{5-3}=2$$\nComo as inclinações são iguais, os três pontos estão alinhados.",
    "4:2": "Se, após substituir as coordenadas, obtivermos\n$$D=0,$$\nentão os três pontos são colineares.",
    "4:3": "Para $A(1,1)$, $B(5,1)$ e $C(3,4)$:\n$$D=1(1-4)+5(4-1)+3(1-1)=12$$\n$$A=\\frac{|12|}{2}=6$$",
    "4:4": "Se um problema pede o valor de um parâmetro para que três pontos fiquem alinhados, podemos impor diretamente:\n$$A=0\\quad\\text{ou}\\quad D=0$$",
    "5:1": "A menor distância de um ponto $P$ até uma reta $r$ é medida sobre a perpendicular a $r$. Um segmento oblíquo seria maior.",
    "5:2": "Para $P(2,-1)$ e $r:3x+4y-10=0$:\n$$d=\\frac{|3(2)+4(-1)-10|}{\\sqrt{3^2+4^2}}$$\n$$d=\\frac{8}{5}$$",
    "5:3": "Do ponto $P(7,-4)$ até a reta vertical $x=2$:\n$$d=|7-2|=5$$",
    "5:4": "Para $r:3x+4y-2=0$ e $s:3x+4y+18=0$:\n$$d=\\frac{|-2-18|}{\\sqrt{3^2+4^2}}=\\frac{20}{5}=4$$",
    "6:1": "Com centro $C(2,-3)$ e raio $r=5$:\n$$(x-2)^2+(y+3)^2=25$$",
    "6:2": "Em $x^2+y^2-6x+4y-12=0$, completando quadrados:\n$$(x-3)^2+(y+2)^2=25$$\nLogo, $C=(3,-2)$ e $r=5$.",
    "6:3": "Na circunferência de centro $C(1,2)$ e raio $4$, para $P(4,2)$:\n$$d(C,P)=3<4$$\nLogo, $P$ está no interior.",
    "6:4": "Para centro $C(2,3)$ e reta $4x+3y-2=0$:\n$$d=\\frac{|4(2)+3(3)-2|}{\\sqrt{4^2+3^2}}=3$$\nAssim, uma circunferência de raio $3$ é tangente a essa reta."
  };

  function enhanceLegacyTheory(modules){
    (modules||[]).forEach(module=>{
      const local=defaults.find(d=>Number(d.numero)===Number(module.numero));
      (module.teoria||[]).forEach((t,i)=>{
        const key=`${Number(module.numero)}:${i+1}`, legacy=LEGACY_THEORY[key], upgraded=local?.teoria?.[i];
        if(!legacy||!upgraded)return;
        if(String(t.texto||"").trim()===String(LEGACY_TEXTS[key]||"").trim()) t.texto=upgraded.texto;
        if(String(t.formula||"").trim()===String(legacy.formula||"").trim()) t.formula=upgraded.formula;
        if([legacy.exemplo,PREVIOUS_EXAMPLES[key]].some(old=>String(t.exemplo||"").trim()===String(old||"").trim())) t.exemplo=upgraded.exemplo;
      });
    });
    return modules;
  }

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
      return applyContent(enhanceLegacyTheory(modules),"supabase");
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
