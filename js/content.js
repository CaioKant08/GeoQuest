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



  const PRE_SOURCE_THEORY = {
  "1:1": {
    "texto": "O plano cartesiano funciona como um sistema de localização. Ele é formado por dois eixos perpendiculares que se cruzam na origem: o eixo x é horizontal e o eixo y é vertical. Cada ponto é escrito como um par ordenado P(x, y), e a ordem importa porque a primeira coordenada indica o deslocamento horizontal e a segunda, o deslocamento vertical.\n\n1) Comece sempre pela origem (0,0). 2) Desloque-se primeiro no eixo x: valores positivos vão para a direita e negativos para a esquerda. 3) Depois, desloque-se no eixo y: valores positivos sobem e negativos descem. 4) Observe os sinais de x e y para reconhecer o quadrante.\n\nUm ponto sobre um dos eixos não pertence a nenhum quadrante. Se x=0, ele está no eixo y; se y=0, está no eixo x. Essa leitura básica será usada em praticamente todos os módulos seguintes.",
    "formula": "latex:\\begin{array}{c|c}1^\\circ &(+,+)\\\\2^\\circ&(-,+)\\\\3^\\circ&(-,-)\\\\4^\\circ&(+,-)\\end{array}",
    "exemplo": "Considere os pontos $A(-4,3)$ e $B(2,-5)$.\n\nPara $A$, analisamos os sinais das coordenadas:\n\n$$x=-4<0 \\qquad y=3>0$$\n\nPortanto, $A$ está no $2^\\circ$ quadrante.\n\nPara $B$:\n\n$$x=2>0 \\qquad y=-5<0$$\n\nLogo, $B$ está no $4^\\circ$ quadrante."
  },
  "1:2": {
    "texto": "A distância entre dois pontos mede o comprimento do segmento que liga esses pontos. Para obtê-la, primeiro observamos quanto houve de deslocamento horizontal e quanto houve de deslocamento vertical. Esses dois deslocamentos formam os catetos de um triângulo retângulo, enquanto a distância procurada é a hipotenusa.\n\n1) Calcule Δx=x₂−x₁. 2) Calcule Δy=y₂−y₁. 3) Eleve as diferenças ao quadrado. 4) Some os resultados. 5) Tire a raiz quadrada.\n\nA fórmula é uma aplicação direta do Teorema de Pitágoras ao plano cartesiano. Trocar a ordem dos pontos não altera a distância: as diferenças mudam de sinal, mas seus quadrados permanecem iguais.",
    "formula": "latex:d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}",
    "exemplo": "Queremos calcular a distância entre $A(-2,5)$ e $B(4,-3)$.\n\nPrimeiro, substituímos as coordenadas na fórmula:\n\n$$d=\\sqrt{(4-(-2))^2+(-3-5)^2}$$\n\nCalculando as diferenças:\n\n$$d=\\sqrt{6^2+(-8)^2}$$\n\nAgora elevamos ao quadrado e somamos:\n\n$$d=\\sqrt{36+64}=\\sqrt{100}$$\n\nPortanto:\n\n$$d=10$$"
  },
  "1:3": {
    "texto": "O ponto médio fica exatamente no centro de um segmento e o divide em duas partes de mesmo comprimento. Em vez de calcular distâncias, basta obter a média das coordenadas dos dois extremos.\n\n1) Some x₁ e x₂ e divida por 2. 2) Some y₁ e y₂ e divida por 2. 3) Reúna os resultados no par ordenado M(xₘ,yₘ).\n\nGeometricamente, M está na metade do caminho tanto na direção horizontal quanto na vertical. Essa ideia reaparece em medianas, centros, baricentros e problemas de simetria.",
    "formula": "latex:M=\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)",
    "exemplo": "Queremos encontrar o ponto médio do segmento com extremos $A(7,-1)$ e $B(-3,11)$.\n\nAplicamos a média em cada coordenada:\n\n$$M=\\left(\\frac{7+(-3)}{2},\\frac{-1+11}{2}\\right)$$\n\nCalculando separadamente:\n\n$$M=\\left(\\frac{4}{2},\\frac{10}{2}\\right)$$\n\nAssim:\n\n$$M=(2,5)$$"
  },
  "1:4": {
    "texto": "Nem todo problema exige a fórmula completa da distância. Se dois pontos têm a mesma ordenada, o segmento é horizontal e a distância depende apenas da diferença entre as abscissas. Se têm a mesma abscissa, o segmento é vertical e basta comparar as ordenadas.\n\nAntes de substituir valores em fórmulas, observe o desenho e procure simplificações. Esse hábito reduz contas e evita erros de sinal.\n\nDistância e ponto médio aparecem em classificação de triângulos, diagonais, localização de centros, equidistância e construção de lugares geométricos.",
    "formula": "latex:y_1=y_2\\Rightarrow d=|x_2-x_1|\\qquad x_1=x_2\\Rightarrow d=|y_2-y_1|",
    "exemplo": "Considere $A(-3,4)$ e $B(5,4)$.\n\nComo os dois pontos possuem a mesma ordenada,\n\n$$y_A=y_B=4$$\n\no segmento é horizontal. Por isso, basta calcular a diferença entre as abscissas:\n\n$$d=|x_B-x_A|$$\n\n$$d=|5-(-3)|=|8|$$\n\nLogo:\n\n$$d=8$$"
  },
  "2:1": {
    "texto": "O coeficiente angular m descreve a inclinação de uma reta. Ele compara quanto y varia quando x varia e pode ser entendido como uma taxa: para cada avanço horizontal, quanto a reta sobe ou desce?\n\n1) Escolha dois pontos. 2) Calcule Δy=y₂−y₁. 3) Calcule Δx=x₂−x₁. 4) Faça m=Δy/Δx.\n\nSe m>0, a reta cresce da esquerda para a direita; se m<0, decresce; se m=0, é horizontal. Em uma reta vertical, Δx=0 e o coeficiente angular não é definido. O sinal e o valor de m permitem comparar direção e intensidade da inclinação.",
    "formula": "latex:m=\\frac{y_2-y_1}{x_2-x_1}=\\frac{\\Delta y}{\\Delta x}",
    "exemplo": "Considere os pontos $A(2,3)$ e $B(6,11)$.\n\nO coeficiente angular mede a variação vertical em relação à variação horizontal:\n\n$$m=\\frac{y_2-y_1}{x_2-x_1}$$\n\nSubstituindo as coordenadas:\n\n$$m=\\frac{11-3}{6-2}$$\n\n$$m=\\frac{8}{4}$$\n\nPortanto:\n\n$$m=2$$\n\nIsso significa que, para cada $1$ unidade que avançamos em $x$, a reta sobe $2$ unidades em $y$."
  },
  "2:2": {
    "texto": "A mesma reta pode ser escrita de formas algébricas diferentes. Na forma geral, Ax+By+C=0, os termos ficam reunidos em um único membro. Na forma reduzida, y=mx+b, a inclinação m e o intercepto no eixo y ficam visíveis imediatamente.\n\nPara passar da forma geral para a reduzida, isole y: mova os demais termos para o outro membro e divida tudo pelo coeficiente de y. Ao final, compare com y=mx+b.\n\nA forma geral é útil em distância ponto–reta e sistemas; a forma reduzida facilita a leitura de inclinação, intercepto e paralelismo.",
    "formula": "latex:Ax+By+C=0\\qquad\\Longleftrightarrow\\qquad y=mx+b",
    "exemplo": "Considere a reta na forma geral:\n\n$$3x-2y+6=0$$\n\nNosso objetivo é escrever a equação na forma reduzida $y=mx+b$. Para isso, isolamos $y$:\n\n$$-2y=-3x-6$$\n\nDividindo todos os termos por $-2$:\n\n$$y=\\frac{3}{2}x+3$$\n\nAgora podemos identificar diretamente:\n\n$$m=\\frac{3}{2} \\qquad b=3$$"
  },
  "2:3": {
    "texto": "A forma ponto–inclinação é ideal quando o problema fornece um ponto conhecido da reta e seu coeficiente angular. Em vez de procurar primeiro o intercepto b, usamos diretamente essas duas informações.\n\n1) Identifique P(x₀,y₀). 2) Identifique m. 3) Substitua em y−y₀=m(x−x₀). 4) Desenvolva os parênteses. 5) Se necessário, isole y para chegar à forma reduzida.\n\nO cuidado principal está nos sinais: se y₀ for negativo, y−(−1) vira y+1. A ideia central é importante: um ponto de passagem mais uma direção determinam completamente uma reta.",
    "formula": "latex:y-y_0=m(x-x_0)",
    "exemplo": "Conhecemos o ponto $P(2,-1)$ e o coeficiente angular $m=3$.\n\nUsamos a forma ponto–inclinação:\n\n$$y-y_0=m(x-x_0)$$\n\nSubstituindo $x_0=2$, $y_0=-1$ e $m=3$:\n\n$$y-(-1)=3(x-2)$$\n\nDistribuindo o $3$:\n\n$$y+1=3x-6$$\n\nIsolando $y$:\n\n$$y=3x-7$$"
  },
  "2:4": {
    "texto": "Dois pontos distintos determinam uma única reta. Quando eles são fornecidos, o caminho mais seguro é calcular primeiro o coeficiente angular e depois usar a forma ponto–inclinação com qualquer um dos pontos.\n\nOs interceptos são os pontos em que a reta cruza os eixos. Para achar o intercepto em x, faça y=0; para achar o intercepto em y, faça x=0. Esses dois pontos permitem esboçar rapidamente a reta.\n\nRetas verticais têm equação x=k e retas horizontais têm equação y=k. Reconhecer esses casos evita aplicar uma fórmula de inclinação onde ela não funciona.",
    "formula": "latex:x=k\\ \\text{(vertical)}\\qquad y=k\\ \\text{(horizontal)}",
    "exemplo": "Considere a reta:\n\n$$y=2x-6$$\n\nPara encontrar o ponto em que ela cruza o eixo $x$, fazemos $y=0$:\n\n$$0=2x-6$$\n\n$$2x=6 \\Rightarrow x=3$$\n\nAssim, o intercepto no eixo $x$ é:\n\n$$(3,0)$$\n\nAgora fazemos $x=0$ para encontrar o intercepto no eixo $y$:\n\n$$y=2(0)-6=-6$$\n\nLogo, o outro intercepto é:\n\n$$(0,-6)$$"
  },
  "3:1": {
    "texto": "Quando duas retas se cruzam, o ponto de encontro satisfaz simultaneamente as duas equações. Por isso, encontrar a interseção equivale a resolver um sistema de duas equações.\n\n1) Escreva as equações. 2) Use substituição, comparação ou eliminação para obter x. 3) Substitua o valor em uma equação para encontrar y. 4) Confira o par ordenado na outra equação.\n\nUma solução indica retas secantes; nenhuma solução indica paralelas distintas; infinitas soluções indicam que as duas equações representam a mesma reta.",
    "formula": "latex:r\\cap s=\\text{solução do sistema}",
    "exemplo": "Considere as retas:\n\n$$r:y=x+1$$\n\n$$s:y=-2x+7$$\n\nNo ponto de interseção, as duas expressões de $y$ possuem o mesmo valor. Então:\n\n$$x+1=-2x+7$$\n\nReorganizando:\n\n$$3x=6 \\Rightarrow x=2$$\n\nSubstituindo em uma das equações:\n\n$$y=2+1=3$$\n\nPortanto:\n\n$$r\\cap s=(2,3)$$"
  },
  "3:2": {
    "texto": "Retas paralelas têm a mesma direção. Para retas não verticais, isso significa possuir o mesmo coeficiente angular. Porém, m₁=m₂ não garante que sejam paralelas distintas: elas também podem coincidir.\n\nCompare primeiro as inclinações. Se m₁≠m₂, haverá interseção. Se m₁=m₂, compare os interceptos ou verifique se uma equação é múltipla da outra. Interceptos diferentes indicam paralelas distintas; equações equivalentes indicam coincidentes.\n\nEssa distinção é fundamental em sistemas e em problemas de posição relativa.",
    "formula": "latex:m_1=m_2\\Rightarrow\\text{retas paralelas ou coincidentes}",
    "exemplo": "Considere as retas:\n\n$$r:y=3x+2$$\n\n$$s:y=3x-4$$\n\nComparando os coeficientes angulares:\n\n$$m_r=3 \\qquad m_s=3$$\n\nComo:\n\n$$m_r=m_s$$\n\nas duas retas possuem a mesma inclinação. Como os interceptos são diferentes, elas não coincidem. Portanto, são paralelas distintas."
  },
  "3:3": {
    "texto": "Duas retas perpendiculares formam um ângulo de 90°. Para retas não verticais e não horizontais, seus coeficientes angulares satisfazem m₁·m₂=−1. Em outras palavras, o coeficiente de uma é o oposto do inverso da outra.\n\n1) Encontre m₁. 2) Inverta a fração. 3) Troque o sinal. 4) Verifique se o produto resulta em −1.\n\nHá um caso especial: uma reta horizontal é perpendicular a uma vertical. Nesse caso não usamos o produto porque a reta vertical não possui coeficiente angular definido.",
    "formula": "latex:m_1\\cdot m_2=-1",
    "exemplo": "Suponha que uma reta tenha coeficiente angular:\n\n$$m_1=\\frac{1}{2}$$\n\nPara que uma segunda reta seja perpendicular à primeira, seus coeficientes devem satisfazer:\n\n$$m_1m_2=-1$$\n\nSubstituindo:\n\n$$\\frac{1}{2}m_2=-1$$\n\nMultiplicando os dois lados por $2$:\n\n$$m_2=-2$$\n\nLogo, a reta perpendicular deve ter coeficiente angular $-2$."
  },
  "3:4": {
    "texto": "A posição relativa entre duas retas pode ser decidida por uma sequência organizada de verificações. Isso é mais seguro do que decorar casos isolados.\n\n1) Coloque as equações em uma forma que permita comparar as inclinações. 2) Se m₁≠m₂, são secantes. 3) Se m₁=m₂, compare os demais coeficientes: interceptos diferentes indicam paralelas; equações proporcionais indicam coincidentes. 4) Se m₁·m₂=−1, são perpendiculares.\n\nAtenção: “mesmo coeficiente angular” não significa automaticamente “paralelas distintas”.",
    "formula": "latex:m_1=m_2\\not\\Rightarrow r=s",
    "exemplo": "Considere as duas equações:\n\n$$2x-y+3=0$$\n\n$$4x-2y+6=0$$\n\nMultiplicando a primeira por $2$:\n\n$$2(2x-y+3)=0$$\n\n$$4x-2y+6=0$$\n\nObtivemos exatamente a segunda equação. Portanto, as duas expressões representam a mesma reta e são coincidentes."
  },
  "4:1": {
    "texto": "Três pontos são colineares quando pertencem à mesma reta. Geometricamente, é possível traçar uma única reta passando pelos três sem mudar de direção.\n\nUma forma intuitiva de testar isso é comparar os coeficientes angulares entre pares de pontos. Se a inclinação de AB for igual à de BC, os três pontos têm a mesma direção e estão alinhados, desde que os cálculos estejam definidos.\n\nComo esse método exige cuidado com retas verticais, o determinante é uma alternativa mais geral e robusta.",
    "formula": "latex:\\det\\begin{pmatrix}x_1&y_1&1\\\\x_2&y_2&1\\\\x_3&y_3&1\\end{pmatrix}=0",
    "exemplo": "Considere $A(1,2)$, $B(3,6)$ e $C(5,10)$.\n\nCalculamos primeiro a inclinação entre $A$ e $B$:\n\n$$m_{AB}=\\frac{6-2}{3-1}=\\frac{4}{2}=2$$\n\nAgora entre $B$ e $C$:\n\n$$m_{BC}=\\frac{10-6}{5-3}=\\frac{4}{2}=2$$\n\nComo:\n\n$$m_{AB}=m_{BC}$$\n\nos três pontos pertencem à mesma reta. Portanto, são colineares."
  },
  "4:2": {
    "texto": "O determinante permite verificar alinhamento sem separar casos de reta vertical. Organizamos as coordenadas dos três pontos em uma expressão e calculamos um valor D.\n\n1) Substitua corretamente x₁,y₁,x₂,y₂,x₃,y₃. 2) Faça os produtos indicados. 3) Some os termos com atenção aos sinais. 4) Analise o resultado.\n\nSe D=0, os pontos são colineares. Se D≠0, eles formam um triângulo de área não nula. Essa conexão prepara diretamente o cálculo de área por coordenadas.",
    "formula": "latex:D=x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)",
    "exemplo": "Para verificar se três pontos são colineares, montamos o determinante:\n\n$$D=\\begin{vmatrix}x_1&y_1&1\\\\x_2&y_2&1\\\\x_3&y_3&1\\end{vmatrix}$$\n\nDepois calculamos seu valor. Se:\n\n$$D=0$$\n\nos três pontos estão alinhados. Se:\n\n$$D\\neq0$$\n\neles não são colineares e formam um triângulo de área não nula."
  },
  "4:3": {
    "texto": "A área de um triângulo pode ser calculada diretamente pelas coordenadas de seus vértices. O mesmo determinante usado no teste de colinearidade fornece o dobro da área orientada.\n\n1) Calcule D com A, B e C. 2) Tome o módulo |D|, pois área não pode ser negativa. 3) Divida por 2.\n\nSe o resultado for zero, o triângulo está degenerado: os três pontos são colineares. Essa fórmula é especialmente útil quando base e altura não aparecem claramente no desenho.",
    "formula": "latex:A=\\frac{|D|}{2}",
    "exemplo": "Considere $A(1,1)$, $B(5,1)$ e $C(3,4)$.\n\nCalculamos o determinante associado aos três pontos:\n\n$$D=1(1-4)+5(4-1)+3(1-1)$$\n\n$$D=-3+15+0=12$$\n\nA área do triângulo é metade do módulo desse valor:\n\n$$A=\\frac{|D|}{2}$$\n\n$$A=\\frac{|12|}{2}=6$$\n\nPortanto, a área é $6$ unidades quadradas."
  },
  "4:4": {
    "texto": "Colinearidade, determinante e área são três leituras da mesma estrutura geométrica. Quando os três pontos ficam na mesma reta, o triângulo formado por eles fica “achatado” e sua área é zero; algebricamente, D=0.\n\nEssa ligação é poderosa em questões com parâmetros. Se uma coordenada contém uma incógnita, podemos impor D=0 para descobrir quando os pontos ficam alinhados ou impor uma área determinada para encontrar o valor do parâmetro.\n\nO objetivo é perceber a conexão, e não memorizar três fórmulas sem relação.",
    "formula": "latex:A=0\\qquad\\Longleftrightarrow\\qquad D=0\\qquad\\Longleftrightarrow\\qquad\\text{colinearidade}",
    "exemplo": "Suponha que um problema peça o valor de um parâmetro para que três pontos fiquem alinhados.\n\nPontos colineares não formam um triângulo com área positiva. Portanto:\n\n$$A=0$$\n\nComo a área pode ser calculada por:\n\n$$A=\\frac{|D|}{2}$$\n\nisso exige:\n\n$$D=0$$\n\nAssim, basta montar o determinante com as coordenadas, igualá-lo a zero e resolver a equação para encontrar o parâmetro."
  },
  "5:1": {
    "texto": "A distância de um ponto a uma reta é o menor comprimento possível entre o ponto e qualquer ponto dessa reta. Geometricamente, o menor caminho sempre é um segmento perpendicular à reta.\n\nPor isso, não podemos escolher um ponto qualquer da reta e usar a fórmula de distância entre pontos: o valor encontrado poderia ser maior que a distância mínima. O ponto correto é o pé da perpendicular, geralmente chamado H.\n\nVisualizar essa perpendicular ajuda a entender tanto a fórmula ponto–reta quanto a distância entre paralelas e a tangência de circunferências.",
    "formula": "latex:d(P,r)=\\text{comprimento do segmento perpendicular de }P\\text{ até }r",
    "exemplo": "Considere um ponto $P$ fora de uma reta $r$.\n\nExistem vários segmentos que podem ligar $P$ a pontos de $r$, mas o menor deles é sempre perpendicular à reta.\n\nSe $H$ é o pé da perpendicular, então:\n\n$$PH\\perp r$$\n\nE a distância procurada é exatamente o comprimento desse segmento:\n\n$$d(P,r)=PH$$\n\nPor isso, segmentos oblíquos não representam a menor distância."
  },
  "5:2": {
    "texto": "A fórmula da distância ponto–reta fornece diretamente o comprimento do segmento perpendicular. Ela é aplicada quando a reta está na forma geral Ax+By+C=0 e o ponto é P(x₀,y₀).\n\n1) Substitua x₀ e y₀ no numerador Ax₀+By₀+C. 2) Tome o módulo. 3) Calcule √(A²+B²). 4) Divida e simplifique.\n\nO módulo é indispensável porque distância não pode ser negativa. Também é importante usar A, B e C da mesma equação da reta, sem misturar coeficientes de formas equivalentes em escalas diferentes.",
    "formula": "latex:d=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}",
    "exemplo": "Considere o ponto $P(2,-1)$ e a reta:\n\n$$r:3x+4y-10=0$$\n\nUsamos a fórmula:\n\n$$d=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}$$\n\nSubstituindo $A=3$, $B=4$, $C=-10$, $x_0=2$ e $y_0=-1$:\n\n$$d=\\frac{|3(2)+4(-1)-10|}{\\sqrt{3^2+4^2}}$$\n\nCalculando:\n\n$$d=\\frac{|-8|}{5}$$\n\nPortanto:\n\n$$d=\\frac{8}{5}$$"
  },
  "5:3": {
    "texto": "Algumas retas simplificam completamente o cálculo. Se a reta é vertical, x=k, a distância de P(x₀,y₀) até ela é a diferença horizontal |x₀−k|. Se é horizontal, y=k, usamos a diferença vertical |y₀−k|.\n\nA fórmula geral também funcionaria, mas seria trabalho desnecessário. O próprio desenho mostra qual coordenada muda e qual permanece igual.\n\nEm Geometria Analítica, interpretar a figura antes de calcular costuma produzir soluções mais rápidas e mais seguras.",
    "formula": "latex:x=k\\Rightarrow d=|x_0-k|\\qquad y=k\\Rightarrow d=|y_0-k|",
    "exemplo": "Considere o ponto $P(7,-4)$ e a reta vertical:\n\n$$x=2$$\n\nComo a reta é vertical, a menor distância é puramente horizontal. Basta comparar as abscissas:\n\n$$d=|x_P-2|$$\n\nSubstituindo:\n\n$$d=|7-2|$$\n\nLogo:\n\n$$d=5$$"
  },
  "5:4": {
    "texto": "A distância entre duas retas paralelas é constante: qualquer segmento perpendicular traçado de uma à outra tem o mesmo comprimento. Quando as equações possuem os mesmos coeficientes A e B, a distância depende apenas da diferença entre C₁ e C₂.\n\n1) Garanta que A e B sejam iguais nas duas equações. 2) Calcule |C₁−C₂|. 3) Divida por √(A²+B²).\n\nSe as equações estiverem multiplicadas por fatores diferentes, normalize-as primeiro. Comparar apenas C₁ e C₂ sem igualar A e B produz um resultado incorreto.",
    "formula": "latex:d=\\frac{|C_1-C_2|}{\\sqrt{A^2+B^2}}",
    "exemplo": "Considere as retas paralelas:\n\n$$r:3x+4y-2=0$$\n\n$$s:3x+4y+18=0$$\n\nComo os coeficientes $A$ e $B$ são iguais, podemos usar:\n\n$$d=\\frac{|C_1-C_2|}{\\sqrt{A^2+B^2}}$$\n\nSubstituindo:\n\n$$d=\\frac{|-2-18|}{\\sqrt{3^2+4^2}}$$\n\n$$d=\\frac{20}{5}$$\n\nLogo:\n\n$$d=4$$"
  },
  "6:1": {
    "texto": "Uma circunferência é o conjunto dos pontos que estão a uma mesma distância r de um ponto fixo C(a,b), chamado centro. A forma reduzida nasce diretamente da fórmula da distância entre dois pontos.\n\nPara qualquer P(x,y) da circunferência, a distância até C é r. Ao elevar a relação ao quadrado, obtemos (x−a)²+(y−b)²=r².\n\nNa leitura da fórmula, os sinais parecem invertidos: (x−2)² indica a=2; (y+3)² equivale a y−(−3), portanto b=−3. Essa leitura permite identificar centro e raio imediatamente.",
    "formula": "latex:(x-a)^2+(y-b)^2=r^2",
    "exemplo": "Considere uma circunferência de centro $C(2,-3)$ e raio $r=5$.\n\nA forma reduzida de uma circunferência é:\n\n$$(x-a)^2+(y-b)^2=r^2$$\n\nSubstituindo $a=2$, $b=-3$ e $r=5$:\n\n$$(x-2)^2+(y-(-3))^2=5^2$$\n\nSimplificando:\n\n$$(x-2)^2+(y+3)^2=25$$"
  },
  "6:2": {
    "texto": "A forma geral da circunferência surge quando desenvolvemos os quadrados da forma reduzida: x²+y²+Dx+Ey+F=0. Nessa escrita, centro e raio não ficam visíveis de imediato.\n\nPara recuperar a forma reduzida, agrupe os termos em x e em y e complete quadrados. O objetivo é transformar cada grupo em algo como (x−a)² e (y−b)².\n\nDepois da reorganização algébrica, a geometria volta a aparecer claramente e podemos ler o centro e o raio.",
    "formula": "latex:x^2+y^2+Dx+Ey+F=0",
    "exemplo": "Considere a equação geral:\n\n$$x^2+y^2-6x+4y-12=0$$\n\nAgrupamos os termos de $x$ e de $y$:\n\n$$(x^2-6x)+(y^2+4y)=12$$\n\nCompletando quadrados:\n\n$$(x-3)^2-9+(y+2)^2-4=12$$\n\nPassando as constantes para o outro lado:\n\n$$(x-3)^2+(y+2)^2=25$$\n\nPortanto:\n\n$$C=(3,-2) \\qquad r=5$$"
  },
  "6:3": {
    "texto": "Para saber se um ponto está dentro, sobre ou fora de uma circunferência, compare a distância d do ponto ao centro com o raio r. O desenho ajuda, mas a decisão pode ser feita exatamente por cálculo.\n\n1) Identifique C e r. 2) Calcule d(P,C). 3) Compare: se d<r, o ponto está no interior; se d=r, pertence à circunferência; se d>r, está no exterior.\n\nPara evitar raízes, também podemos comparar d² com r². Essa estratégia frequentemente torna a conta mais rápida.",
    "formula": "latex:d<r:\\ \\text{interior}\\qquad d=r:\\ \\text{pertencente}\\qquad d>r:\\ \\text{exterior}",
    "exemplo": "Considere a circunferência de centro $C(1,2)$ e raio $r=4$, e o ponto $P(4,2)$.\n\nPrimeiro calculamos a distância entre o centro e o ponto:\n\n$$d(C,P)=\\sqrt{(4-1)^2+(2-2)^2}$$\n\n$$d(C,P)=\\sqrt{9}=3$$\n\nAgora comparamos com o raio:\n\n$$3<4$$\n\nComo $d(C,P)<r$, o ponto $P$ está no interior da circunferência."
  },
  "6:4": {
    "texto": "Uma reta tangente toca a circunferência em exatamente um ponto. Nesse ponto, o raio é perpendicular à reta tangente. Essa propriedade transforma tangência em um problema de distância ponto–reta.\n\nSe C é o centro e r é o raio, a reta será tangente exatamente quando d(C,reta)=r. Se essa distância for menor que r, a reta corta a circunferência em dois pontos; se for maior, não há interseção.\n\nAssim, tangência conecta três ideias já estudadas: circunferência, perpendicularidade e distância ponto–reta.",
    "formula": "latex:r\\text{ tangente}\\qquad\\Longleftrightarrow\\qquad d(C,r)=R",
    "exemplo": "Considere o centro $C(2,3)$ e a reta:\n\n$$r:4x+3y-2=0$$\n\nCalculamos a distância do centro até a reta:\n\n$$d=\\frac{|4(2)+3(3)-2|}{\\sqrt{4^2+3^2}}$$\n\n$$d=\\frac{|8+9-2|}{5}$$\n\n$$d=\\frac{15}{5}=3$$\n\nSe a circunferência tiver raio $r=3$, então:\n\n$$d(C,r)=r$$\n\nPortanto, a reta é tangente à circunferência."
  }
};

  const EXTRA_OLD_EXAMPLES = {
    "1:2": [
      "Entre A(-2,5) e B(4,-3): d = \\sqrt{6^2 + (-8)^2} = 10.",
      "Entre $A(-2,5)$ e $B(4,-3)$: d = \\sqrt{6^2 + (-8)^2} = 10.",
      "Entre A(−2,5) e B(4,−3): d = \\sqrt{6^2 + (-8)^2} = 10."
    ],
    "1:3": [
      "Para A(7,-1) e B(-3,11), M = (2,5).",
      "Para A(7,−1) e B(−3,11), M = (2,5).",
      "Para $A(7,-1)$ e $B(-3,11)$, M = (2,5)."
    ]
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
        const previous=PRE_SOURCE_THEORY[key]||{};
        if([LEGACY_TEXTS[key],previous.texto].some(old=>String(t.texto||"").trim()===String(old||"").trim())) t.texto=upgraded.texto;
        if([legacy.formula,previous.formula].some(old=>String(t.formula||"").trim()===String(old||"").trim())) t.formula=upgraded.formula;
        const oldExamples=[legacy.exemplo,PREVIOUS_EXAMPLES[key],previous.exemplo,...(EXTRA_OLD_EXAMPLES[key]||[])];
        if(oldExamples.some(old=>String(t.exemplo||"").trim()===String(old||"").trim())) t.exemplo=upgraded.exemplo;
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
