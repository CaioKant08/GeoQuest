window.KANT_DEFAULT_MODULES = [
  {
    "id": "modulo-1",
    "numero": 1,
    "titulo": "Fundamentos do Plano Cartesiano",
    "subtitulo": "Pontos, distância e ponto médio",
    "cor": "green",
    "icone": "⌖",
    "descricao": "Leia coordenadas, reconheça quadrantes e transforme o Teorema de Pitágoras em uma ferramenta para medir e localizar pontos.",
    "objetivos": [
      "Interpretar pontos e quadrantes",
      "Calcular distância entre dois pontos",
      "Determinar ponto médio e resolver problemas simples"
    ],
    "teoria": [
      {
        "titulo": "Coordenadas cartesianas",
        "texto": "O plano cartesiano é o sistema de referência usado por todo o restante da Geometria Analítica. Ele é formado pelos eixos x (horizontal) e y (vertical), que se cruzam na origem O(0,0). Um ponto P(x,y) é um par ordenado: primeiro lemos a abscissa x e depois a ordenada y. Trocar a ordem geralmente produz outro ponto.\n\nPara localizar um ponto: 1) parta da origem; 2) desloque-se horizontalmente conforme x; 3) depois suba ou desça conforme y; 4) observe os sinais para identificar o quadrante. Pontos sobre os eixos não pertencem a quadrante algum.\n\nEssa leitura é pré-requisito para interpretar coeficiente angular, equações de reta, determinantes, distâncias e circunferências — os conteúdos centrais do material da prova.",
        "formula": "latex:\\begin{array}{c|c}1^\\circ &(+,+)\\\\2^\\circ&(-,+)\\\\3^\\circ&(-,-)\\\\4^\\circ&(+,-)\\end{array}",
        "exemplo": "Considere os pontos $A(-4,3)$ e $B(2,-5)$.\n\nPara $A$, analisamos os sinais:\n\n$$x_A=-4<0 \\qquad y_A=3>0$$\n\nLogo, $A$ está no $2^\\circ$ quadrante.\n\nPara $B$:\n\n$$x_B=2>0 \\qquad y_B=-5<0$$\n\nPortanto, $B$ está no $4^\\circ$ quadrante.\n\nO procedimento é sempre o mesmo: primeiro leia $x$, depois $y$, e só então identifique a região do plano."
      },
      {
        "titulo": "Distância entre dois pontos",
        "texto": "A distância entre dois pontos mede o comprimento do segmento que os liga. As diferenças $\\Delta x=x_2-x_1$ e $\\Delta y=y_2-y_1$ funcionam como os catetos de um triângulo retângulo; por isso, a fórmula nasce diretamente do Teorema de Pitágoras.\n\nO roteiro é: 1) identifique as coordenadas; 2) calcule $\\Delta x$ e $\\Delta y$; 3) eleve as diferenças ao quadrado; 4) some; 5) extraia a raiz. Como as diferenças são elevadas ao quadrado, a ordem escolhida para os pontos não altera o resultado.\n\nNos casos horizontal e vertical, a fórmula se simplifica para uma diferença absoluta entre coordenadas.",
        "formula": "latex:d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}",
        "exemplo": "Considere $A(-2,5)$ e $B(4,-3)$.\n\nPrimeiro calculamos as variações entre as coordenadas:\n\n$$\\Delta x=4-(-2)=6$$\n\n$$\\Delta y=-3-5=-8$$\n\nAplicamos a fórmula da distância:\n\n$$d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}$$\n\n$$d=\\sqrt{6^2+(-8)^2}$$\n\n$$d=\\sqrt{36+64}=\\sqrt{100}$$\n\nPortanto:\n\n$$\\boxed{d=10}$$"
      },
      {
        "titulo": "Ponto médio",
        "texto": "O ponto médio é o ponto que divide um segmento em duas partes de mesmo comprimento. Para encontrá-lo, calculamos separadamente a média aritmética das abscissas e a média aritmética das ordenadas.\n\nAssim, a coordenada x do ponto médio fica exatamente entre $x_1$ e $x_2$, e a coordenada y fica exatamente entre $y_1$ e $y_2$. Essa ideia aparece em medianas, centros de segmentos, diagonais e na determinação do centro de uma circunferência quando conhecemos as extremidades de um diâmetro.\n\nUma verificação útil é conferir se a distância de $A$ até $M$ é a mesma de $M$ até $B$.",
        "formula": "latex:M=\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)",
        "exemplo": "Considere os extremos $A(7,-1)$ e $B(-3,11)$.\n\nUsamos a fórmula do ponto médio:\n\n$$M=\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)$$\n\nSubstituindo as coordenadas:\n\n$$M=\\left(\\frac{7+(-3)}{2},\\frac{-1+11}{2}\\right)$$\n\nCalculando cada coordenada:\n\n$$M=\\left(\\frac{4}{2},\\frac{10}{2}\\right)$$\n\nLogo:\n\n$$\\boxed{M=(2,5)}$$"
      },
      {
        "titulo": "Aplicações",
        "texto": "Distância e ponto médio são ferramentas básicas que reaparecem em problemas de reta e circunferência. Se dois pontos têm a mesma ordenada, o segmento é horizontal e a distância é apenas $|x_2-x_1|$. Se têm a mesma abscissa, o segmento é vertical e usamos $|y_2-y_1|$.\n\nEssas simplificações ajudam a reconhecer rapidamente comprimentos, lados de figuras, diagonais e centros. Também preparam o raciocínio para os casos simples de distância de ponto a reta vertical ou horizontal, estudados mais adiante.\n\nAntes de usar uma fórmula longa, sempre observe se a geometria permite um caminho mais direto.",
        "formula": "latex:y_1=y_2\\Rightarrow d=|x_2-x_1|\\qquad x_1=x_2\\Rightarrow d=|y_2-y_1|",
        "exemplo": "Considere $A(-3,4)$ e $B(5,4)$.\n\nComo os pontos têm a mesma ordenada,\n\n$$y_A=y_B=4,$$\n\no segmento $\\overline{AB}$ é horizontal. Então não precisamos da fórmula completa de distância:\n\n$$d=|x_B-x_A|$$\n\n$$d=|5-(-3)|=|8|$$\n\nPortanto:\n\n$$\\boxed{d=8}$$"
      }
    ],
    "questoes": [
      {
        "id": "m1q1",
        "dificuldade": "facil",
        "xp": 30,
        "enunciado": "Os pontos A(−4,3), B(2,−5) e C(−1,−7) estão, respectivamente, em quais quadrantes?",
        "alternativas": [
          "2º, 4º e 3º",
          "3º, 4º e 2º",
          "2º, 1º e 3º",
          "4º, 2º e 1º"
        ],
        "correta": 0,
        "dica": "Observe separadamente o sinal de x e o sinal de y.",
        "explicacao": "A tem x<0 e y>0; B tem x>0 e y<0; C tem x<0 e y<0. Logo: 2º, 4º e 3º."
      },
      {
        "id": "m1q2",
        "dificuldade": "facil",
        "xp": 30,
        "enunciado": "Qual é a distância entre A(0,0) e B(6,8)?",
        "alternativas": [
          "8",
          "10",
          "12",
          "14"
        ],
        "correta": 1,
        "dica": "Use d = √(6²+8²).",
        "explicacao": "d = √(36+64) = √100 = 10."
      },
      {
        "id": "m1q3",
        "dificuldade": "facil",
        "xp": 30,
        "enunciado": "Os pontos P(−3,4) e Q(5,4) têm a mesma ordenada. Qual é a distância entre eles?",
        "alternativas": [
          "6",
          "8",
          "10",
          "12"
        ],
        "correta": 1,
        "dica": "Quando y é igual, use apenas a diferença entre os x.",
        "explicacao": "d = |5−(−3)| = 8."
      },
      {
        "id": "m1q4",
        "dificuldade": "media",
        "xp": 40,
        "enunciado": "Determine o ponto médio do segmento com extremos A(2,−3) e B(10,5).",
        "alternativas": [
          "(4,1)",
          "(6,1)",
          "(6,2)",
          "(8,1)"
        ],
        "correta": 1,
        "dica": "Calcule a média dos x e a média dos y.",
        "explicacao": "M=((2+10)/2,(−3+5)/2)=(6,1)."
      },
      {
        "id": "m1q5",
        "dificuldade": "media",
        "xp": 45,
        "enunciado": "M(4,1) é o ponto médio de A(1,−2) e B(x,y). Quais são as coordenadas de B?",
        "alternativas": [
          "(7,4)",
          "(8,3)",
          "(6,4)",
          "(7,5)"
        ],
        "correta": 0,
        "dica": "Use 4=(1+x)/2 e 1=(−2+y)/2.",
        "explicacao": "x=7 e y=4. Portanto, B=(7,4)."
      },
      {
        "id": "m1q6",
        "dificuldade": "media",
        "xp": 45,
        "enunciado": "O triângulo A(0,0), B(3,4) e C(6,0) é classificado, quanto aos lados, como:",
        "alternativas": [
          "equilátero",
          "isósceles",
          "escaleno",
          "retângulo isósceles"
        ],
        "correta": 1,
        "dica": "Compare as três distâncias AB, BC e AC.",
        "explicacao": "AB=5, BC=5 e AC=6. Há dois lados iguais, então o triângulo é isósceles."
      },
      {
        "id": "m1q7",
        "dificuldade": "desafio",
        "xp": 55,
        "enunciado": "Para quais valores de x a distância entre A(1,2) e B(x,2) é igual a 7?",
        "alternativas": [
          "x=7 ou x=−7",
          "x=8 ou x=−6",
          "x=6 ou x=−8",
          "x=8 apenas"
        ],
        "correta": 1,
        "dica": "Como y é igual, resolva |x−1|=7.",
        "explicacao": "x−1=7 ou x−1=−7. Logo, x=8 ou x=−6."
      },
      {
        "id": "m1q8",
        "dificuldade": "desafio",
        "xp": 60,
        "enunciado": "A(−2,1) e B(4,9) são extremos de um segmento. Qual alternativa traz, nessa ordem, o ponto médio e o comprimento do segmento?",
        "alternativas": [
          "M=(1,5) e d=10",
          "M=(2,5) e d=8",
          "M=(1,4) e d=10",
          "M=(1,5) e d=8"
        ],
        "correta": 0,
        "dica": null,
        "explicacao": "M=(1,5). A distância é √(6²+8²)=10."
      }
    ]
  },
  {
    "id": "modulo-2",
    "numero": 2,
    "titulo": "Construindo a Reta",
    "subtitulo": "Coeficiente angular e equações",
    "cor": "yellow",
    "icone": "↗",
    "descricao": "Entenda inclinação, converta formas de equação e construa a reta a partir de pontos, coeficientes ou interceptos.",
    "objetivos": [
      "Interpretar o coeficiente angular",
      "Reconhecer formas da equação da reta",
      "Construir uma reta a partir de dados geométricos"
    ],
    "teoria": [
      {
        "titulo": "Coeficiente angular",
        "texto": "O coeficiente angular $m$ é a taxa de variação de $y$ em relação a $x$ ao longo de uma reta não vertical. Entre dois pontos $A(x_1,y_1)$ e $B(x_2,y_2)$, calculamos quanto $y$ variou e dividimos pela variação de $x$. Em uma mesma reta, essa razão permanece constante.\n\nInterpretação geométrica: se $m>0$, a reta é crescente; se $m<0$, é decrescente; se $m=0$, é horizontal. Quando $x_1=x_2$, temos $\\Delta x=0$ e a reta é vertical, portanto o coeficiente angular não é definido.\n\nAlém de indicar inclinação, $m$ deve ser interpretado como uma taxa. Por exemplo, $m=2$ significa que, a cada unidade acrescentada a $x$, $y$ aumenta duas unidades. Em $Q(t)=120-8t$, a taxa é $-8$: a quantidade diminui 8 unidades por unidade de tempo.",
        "formula": "latex:m=\\frac{y_2-y_1}{x_2-x_1}=\\frac{\\Delta y}{\\Delta x}",
        "exemplo": "No material, considere $A(2,3)$ e $B(6,11)$.\n\nCalculamos a taxa de variação:\n\n$$m=\\frac{y_2-y_1}{x_2-x_1}$$\n\n$$m=\\frac{11-3}{6-2}$$\n\n$$m=\\frac{8}{4}=2$$\n\nPortanto:\n\n$$\\boxed{m=2}$$\n\nIsso significa que, para cada aumento de $1$ unidade em $x$, o valor de $y$ aumenta $2$ unidades."
      },
      {
        "titulo": "Forma geral e reduzida",
        "texto": "Uma reta pode ser representada por formas algébricas equivalentes. Na forma reduzida, $y=ax+b$, o coeficiente $a$ é o próprio coeficiente angular $m$, e $b$ é o coeficiente linear: a ordenada do ponto onde a reta intercepta o eixo $y$.\n\nNa forma geral, escrevemos $Ax+By+C=0$, com $A$ e $B$ não simultaneamente nulos. Se $B\\neq0$, podemos isolar $y$ e identificar $m=-A/B$. Saber converter entre as formas é importante porque cada representação facilita um tipo de problema: a reduzida deixa inclinação e intercepto visíveis; a geral é a forma usada na fórmula de distância ponto–reta.\n\nAo converter, faça operações em toda a equação e preserve a equivalência.",
        "formula": "latex:Ax+By+C=0\\qquad\\Longleftrightarrow\\qquad y=mx+b",
        "exemplo": "O material pede para identificar os coeficientes da reta:\n\n$$2x+y-5=0$$\n\nIsolamos $y$:\n\n$$y=-2x+5$$\n\nComparando com $y=ax+b$, obtemos:\n\n$$a=-2 \\qquad b=5$$\n\nEm outro exercício do material:\n\n$$3x-2y+6=0$$\n\n$$-2y=-3x-6$$\n\n$$y=\\frac{3}{2}x+3$$"
      },
      {
        "titulo": "Forma ponto–inclinação",
        "texto": "Quando conhecemos um ponto $P_0(x_0,y_0)$ da reta e seu coeficiente angular $m$, a forma ponto–inclinação é o caminho mais direto. Ela evita procurar primeiro o coeficiente linear e usa imediatamente as duas informações fornecidas pelo problema.\n\nProcedimento: 1) identifique $x_0$, $y_0$ e $m$; 2) substitua em $y-y_0=m(x-x_0)$; 3) cuide dos sinais; 4) distribua $m$; 5) se o problema pedir, isole $y$ ou reorganize para a forma geral.\n\nA ideia geométrica é importante: uma inclinação fixa determina a direção da reta, e um ponto fixa por onde essa reta deve passar. Juntas, essas duas informações determinam uma única reta.",
        "formula": "latex:y-y_0=m(x-x_0)",
        "exemplo": "No exemplo resolvido do material, a reta tem coeficiente angular $m=3$ e passa por $P(2,-1)$.\n\nUsamos a forma ponto–inclinação:\n\n$$y-y_0=m(x-x_0)$$\n\nSubstituindo os dados:\n\n$$y-(-1)=3(x-2)$$\n\n$$y+1=3x-6$$\n\nIsolando $y$:\n\n$$\\boxed{y=3x-7}$$"
      },
      {
        "titulo": "Dois pontos e interceptos",
        "texto": "Dois pontos distintos determinam uma única reta. Se $x_1\\neq x_2$, primeiro calculamos o coeficiente angular e depois usamos a forma ponto–inclinação. Se $x_1=x_2$, a reta é vertical e sua equação é simplesmente $x=x_1$. O material também apresenta uma forma determinantal que permite obter a reta sem calcular previamente a inclinação.\n\nOs interceptos são os pontos em que a reta cruza os eixos. Para achar o intercepto em $x$, faça $y=0$; para achar o intercepto em $y$, faça $x=0$. Reconheça ainda os casos especiais: reta horizontal $y=k$ e reta vertical $x=k$.\n\nEsse bloco reúne habilidades que aparecem várias vezes na prova: construir reta por dois pontos, trabalhar com interceptos, reconhecer casos vertical/horizontal e escrever a equação na forma solicitada.",
        "formula": "latex:\\begin{aligned}m&=\\frac{y_2-y_1}{x_2-x_1},\\quad y-y_1=m(x-x_1)\\\\[4pt]0&=\\begin{vmatrix}x&y&1\\\\x_1&y_1&1\\\\x_2&y_2&1\\end{vmatrix}\\end{aligned}",
        "exemplo": "No material, determine a reta que passa por $A(1,4)$ e $B(5,12)$.\n\nPrimeiro calculamos a inclinação:\n\n$$m=\\frac{12-4}{5-1}=\\frac{8}{4}=2$$\n\nUsamos o ponto $A(1,4)$:\n\n$$y-4=2(x-1)$$\n\n$$y-4=2x-2$$\n\nLogo:\n\n$$\\boxed{y=2x+2}$$\n\nJá os pontos $(-3,2)$ e $(-3,8)$ têm a mesma abscissa. Portanto, determinam a reta vertical:\n\n$$\\boxed{x=-3}$$"
      }
    ],
    "questoes": [
      {
        "id": "m2q1",
        "dificuldade": "facil",
        "xp": 35,
        "enunciado": "Qual é o coeficiente angular da reta que passa por P(−2,7) e Q(4,−5)?",
        "alternativas": [
          "−3",
          "−2",
          "2",
          "3"
        ],
        "correta": 1,
        "dica": "Use Δy/Δx.",
        "explicacao": "m=(−5−7)/(4−(−2))=−12/6=−2."
      },
      {
        "id": "m2q2",
        "dificuldade": "facil",
        "xp": 35,
        "enunciado": "Qual é a equação da reta de coeficiente angular 3 que passa por (2,−1)?",
        "alternativas": [
          "y=3x−7",
          "y=3x+5",
          "y=−3x+5",
          "y=3x−1"
        ],
        "correta": 0,
        "dica": "Use y−y₀=m(x−x₀).",
        "explicacao": "y+1=3(x−2) → y=3x−7."
      },
      {
        "id": "m2q3",
        "dificuldade": "media",
        "xp": 40,
        "enunciado": "Converta 3x−2y+6=0 para a forma reduzida.",
        "alternativas": [
          "y=−(3/2)x−3",
          "y=(3/2)x+3",
          "y=3x−2",
          "y=(2/3)x−3"
        ],
        "correta": 1,
        "dica": "Isole y.",
        "explicacao": "−2y=−3x−6 → y=(3/2)x+3."
      },
      {
        "id": "m2q4",
        "dificuldade": "media",
        "xp": 40,
        "enunciado": "A forma geral equivalente a y=−4x+7 é:",
        "alternativas": [
          "4x+y−7=0",
          "4x−y+7=0",
          "−4x+y−7=0",
          "x+4y−7=0"
        ],
        "correta": 0,
        "dica": "Leve todos os termos para o mesmo lado.",
        "explicacao": "4x+y−7=0."
      },
      {
        "id": "m2q5",
        "dificuldade": "media",
        "xp": 45,
        "enunciado": "A reta y=2x−6 intercepta os eixos em quais pontos?",
        "alternativas": [
          "(2,0) e (0,−6)",
          "(3,0) e (0,−6)",
          "(−3,0) e (0,6)",
          "(6,0) e (0,−3)"
        ],
        "correta": 1,
        "dica": "Faça y=0 e depois x=0.",
        "explicacao": "No eixo x: 0=2x−6 → x=3. No eixo y: x=0 → y=−6."
      },
      {
        "id": "m2q6",
        "dificuldade": "media",
        "xp": 45,
        "enunciado": "Qual reta passa pelos pontos (2,1) e (6,9)?",
        "alternativas": [
          "y=2x−3",
          "y=2x+3",
          "y=x−1",
          "y=−2x+5"
        ],
        "correta": 0,
        "dica": null,
        "explicacao": "m=(9−1)/(6−2)=2. Usando (2,1): y−1=2(x−2), logo y=2x−3."
      },
      {
        "id": "m2q7",
        "dificuldade": "desafio",
        "xp": 55,
        "enunciado": "A reta que passa por (−1,4) e (3,−4) é:",
        "alternativas": [
          "y=−2x+2",
          "y=2x+2",
          "y=−2x−2",
          "y=−x+3"
        ],
        "correta": 0,
        "dica": null,
        "explicacao": "m=(−4−4)/(3−(−1))=−2. Substituindo um ponto: y=−2x+2."
      },
      {
        "id": "m2q8",
        "dificuldade": "desafio",
        "xp": 60,
        "enunciado": "Uma reta intercepta os eixos em (4,0) e (0,6). Qual é sua equação reduzida?",
        "alternativas": [
          "y=−(3/2)x+6",
          "y=(3/2)x+6",
          "y=−(2/3)x+4",
          "y=−3x+6"
        ],
        "correta": 0,
        "dica": null,
        "explicacao": "m=(0−6)/(4−0)=−3/2 e b=6. Logo y=−(3/2)x+6."
      }
    ]
  },
  {
    "id": "modulo-3",
    "numero": 3,
    "titulo": "Relações entre Retas",
    "subtitulo": "Interseção, paralelismo e perpendicularidade",
    "cor": "blue",
    "icone": "∥",
    "descricao": "Compare retas, encontre pontos de encontro e reconheça quando elas são paralelas, coincidentes ou perpendiculares.",
    "objetivos": [
      "Resolver interseções por sistemas",
      "Classificar pares de retas",
      "Usar condições de paralelismo e perpendicularidade"
    ],
    "teoria": [
      {
        "titulo": "Interseção",
        "texto": "Duas retas concorrentes possuem exatamente um ponto comum. Para encontrar esse ponto, resolvemos o sistema formado pelas duas equações. Se ambas estiverem na forma reduzida, podemos igualar as expressões de $y$; em outras formas, também podemos usar substituição ou eliminação.\n\nO par $(x,y)$ encontrado deve satisfazer simultaneamente as duas retas. Geometricamente, ele é exatamente o ponto onde os gráficos se cruzam. Se o sistema não tiver solução, as retas são paralelas distintas; se houver infinitas soluções, as equações representam a mesma reta.",
        "formula": "latex:r\\cap s=\\text{solução do sistema}",
        "exemplo": "No exemplo resolvido do material:\n\n$$r:y=x+1$$\n\n$$s:y=-2x+7$$\n\nNo ponto de interseção, os dois valores de $y$ são iguais:\n\n$$x+1=-2x+7$$\n\n$$3x=6 \\Rightarrow x=2$$\n\nSubstituindo em uma das retas:\n\n$$y=2+1=3$$\n\nPortanto:\n\n$$\\boxed{r\\cap s=(2,3)}$$"
      },
      {
        "titulo": "Paralelas e coincidentes",
        "texto": "Para retas não verticais, o coeficiente angular permite comparar suas direções. Retas paralelas distintas têm o mesmo coeficiente angular e interceptos diferentes. Retas coincidentes possuem todos os pontos em comum; algebricamente, uma equação pode ser obtida multiplicando a outra por uma constante não nula.\n\nNão basta olhar apenas para $m$: duas retas com o mesmo coeficiente angular podem ser paralelas distintas ou a mesma reta. Por isso, depois de comparar as inclinações, compare também os coeficientes lineares ou verifique se as equações gerais são proporcionais.",
        "formula": "latex:m_1=m_2\\Rightarrow\\text{retas paralelas ou coincidentes}",
        "exemplo": "No material aparecem as retas:\n\n$$r:y=2x+3$$\n\n$$s:y=2x-5$$\n\nAs duas possuem:\n\n$$m_r=m_s=2$$\n\nmas seus coeficientes lineares são diferentes:\n\n$$3\\neq -5$$\n\nLogo, elas têm a mesma direção e nunca se encontram:\n\n$$\\boxed{r\\parallel s}$$"
      },
      {
        "titulo": "Perpendicularidade",
        "texto": "Duas retas perpendiculares se cruzam formando um ângulo de $90^\\circ$. Para retas não verticais, seus coeficientes angulares satisfazem $m_1m_2=-1$. Assim, o coeficiente de uma perpendicular é o inverso com sinal trocado do coeficiente da outra.\n\nExemplo: se uma reta tem $m=\\frac12$, a perpendicular tem $m=-2$. Se uma reta tem $m=-3$, a perpendicular tem $m=\\frac13$. O caso especial é a relação entre reta vertical e horizontal: elas são perpendiculares mesmo que a reta vertical não possua coeficiente angular definido.\n\nPara construir uma perpendicular por um ponto, determine primeiro a nova inclinação e depois use a forma ponto–inclinação.",
        "formula": "latex:m_1\\cdot m_2=-1",
        "exemplo": "Considere uma reta com:\n\n$$m_1=\\frac12$$\n\nPara que outra reta seja perpendicular, deve ocorrer:\n\n$$m_1m_2=-1$$\n\nEntão:\n\n$$\\frac12m_2=-1$$\n\nMultiplicando por $2$:\n\n$$\\boxed{m_2=-2}$$\n\nEsse é o procedimento usado também nos exercícios do material para construir retas perpendiculares por um ponto dado."
      },
      {
        "titulo": "Quadro de decisão",
        "texto": "Para classificar duas retas, siga uma ordem. Primeiro coloque as equações em uma forma que permita comparar os coeficientes. Depois: coeficientes angulares diferentes indicam retas concorrentes; coeficientes iguais exigem uma segunda verificação para decidir entre paralelas distintas e coincidentes; produto dos coeficientes igual a $-1$ indica perpendicularidade.\n\nEm equações gerais, antes de concluir que duas retas são distintas, verifique se todos os coeficientes são proporcionais. Quando isso acontece, as equações são diferentes apenas na aparência e representam a mesma reta.\n\nEsse quadro de decisão reúne as condições cobradas no material e evita classificar retas apenas pela aparência algébrica.",
        "formula": "latex:m_1=m_2\\not\\Rightarrow r=s",
        "exemplo": "Considere:\n\n$$r:2x-y+3=0$$\n\n$$s:4x-2y+6=0$$\n\nMultiplicando a equação de $r$ por $2$:\n\n$$2(2x-y+3)=0$$\n\n$$4x-2y+6=0$$\n\nObtivemos exatamente a equação de $s$. Logo:\n\n$$\\boxed{r=s}$$\n\nAs retas são coincidentes e possuem infinitos pontos em comum."
      }
    ],
    "questoes": [
      {
        "id": "m3q1",
        "dificuldade": "facil",
        "xp": 35,
        "enunciado": "Como se classificam r:y=3x+2 e s:y=3x−4?",
        "alternativas": [
          "coincidentes",
          "paralelas distintas",
          "perpendiculares",
          "concorrentes"
        ],
        "correta": 1,
        "dica": "Compare os coeficientes angulares e lineares.",
        "explicacao": "As duas têm m=3, mas interceptos diferentes. São paralelas distintas."
      },
      {
        "id": "m3q2",
        "dificuldade": "facil",
        "xp": 35,
        "enunciado": "As retas y=(1/2)x+1 e y=−2x+5 são:",
        "alternativas": [
          "paralelas",
          "coincidentes",
          "perpendiculares",
          "verticais"
        ],
        "correta": 2,
        "dica": "Multiplique os coeficientes angulares.",
        "explicacao": "(1/2)·(−2)=−1, portanto são perpendiculares."
      },
      {
        "id": "m3q3",
        "dificuldade": "media",
        "xp": 40,
        "enunciado": "As retas 2x−y+3=0 e 4x−2y+6=0 são:",
        "alternativas": [
          "paralelas distintas",
          "coincidentes",
          "perpendiculares",
          "concorrentes"
        ],
        "correta": 1,
        "dica": "Veja se uma equação é múltipla da outra.",
        "explicacao": "A segunda equação é 2 vezes a primeira. Logo, representam a mesma reta."
      },
      {
        "id": "m3q4",
        "dificuldade": "media",
        "xp": 45,
        "enunciado": "Qual é o ponto de interseção entre y=2x−1 e y=−x+8?",
        "alternativas": [
          "(2,3)",
          "(3,5)",
          "(4,7)",
          "(5,9)"
        ],
        "correta": 1,
        "dica": "Iguale as duas expressões de y.",
        "explicacao": "2x−1=−x+8 → 3x=9 → x=3 e y=5."
      },
      {
        "id": "m3q5",
        "dificuldade": "media",
        "xp": 45,
        "enunciado": "Para que y=(k−1)x+4 seja paralela a y=3x−2, o valor de k deve ser:",
        "alternativas": [
          "2",
          "3",
          "4",
          "5"
        ],
        "correta": 2,
        "dica": "Os coeficientes angulares devem ser iguais.",
        "explicacao": "k−1=3 → k=4."
      },
      {
        "id": "m3q6",
        "dificuldade": "media",
        "xp": 45,
        "enunciado": "Para que y=kx+1 seja perpendicular a y=(1/4)x−3, k deve valer:",
        "alternativas": [
          "−4",
          "−1/4",
          "4",
          "1/4"
        ],
        "correta": 0,
        "dica": null,
        "explicacao": "k·(1/4)=−1 → k=−4."
      },
      {
        "id": "m3q7",
        "dificuldade": "desafio",
        "xp": 55,
        "enunciado": "Qual reta é paralela a 2x+3y−6=0 e passa por (3,1)?",
        "alternativas": [
          "2x+3y−9=0",
          "2x−3y−3=0",
          "3x+2y−11=0",
          "2x+3y+9=0"
        ],
        "correta": 0,
        "dica": null,
        "explicacao": "Uma paralela mantém A=2 e B=3. Substituindo (3,1), 6+3+C=0 → C=−9."
      },
      {
        "id": "m3q8",
        "dificuldade": "desafio",
        "xp": 60,
        "enunciado": "Qual reta é perpendicular a y=−2x+5 e passa por (4,−1)?",
        "alternativas": [
          "y=2x−9",
          "y=(1/2)x−3",
          "y=−(1/2)x+1",
          "y=(1/2)x+3"
        ],
        "correta": 1,
        "dica": null,
        "explicacao": "A perpendicular tem m=1/2. Usando (4,−1): y+1=(1/2)(x−4), então y=(1/2)x−3."
      }
    ]
  },
  {
    "id": "modulo-4",
    "numero": 4,
    "titulo": "Colinearidade e Área",
    "subtitulo": "Determinantes no plano",
    "cor": "purple",
    "icone": "△",
    "descricao": "Use alinhamento e determinantes para decidir se pontos pertencem à mesma reta e calcular áreas de triângulos.",
    "objetivos": [
      "Verificar colinearidade",
      "Interpretar determinante nulo",
      "Calcular área por coordenadas"
    ],
    "teoria": [
      {
        "titulo": "Pontos colineares",
        "texto": "Três ou mais pontos são colineares quando pertencem à mesma reta. Se as inclinações puderem ser calculadas, podemos comparar os coeficientes angulares determinados por pares de pontos. Por exemplo, para $A$, $B$ e $C$, se $m_{AB}=m_{AC}$, os três pontos seguem a mesma direção.\n\nEsse método é intuitivo, mas tem uma limitação: em uma reta vertical, a divisão usada para calcular $m$ teria denominador zero. Por isso, o material também apresenta o método do determinante, que funciona inclusive em retas verticais.\n\nProblemas de colinearidade podem ainda envolver uma incógnita. Nesse caso, impomos a condição de alinhamento e resolvemos a equação resultante.",
        "formula": "latex:\\det\\begin{pmatrix}x_1&y_1&1\\\\x_2&y_2&1\\\\x_3&y_3&1\\end{pmatrix}=0",
        "exemplo": "No material, verificamos $A(1,2)$, $B(3,6)$ e $C(5,10)$.\n\nCalculamos:\n\n$$m_{AB}=\\frac{6-2}{3-1}=\\frac42=2$$\n\n$$m_{AC}=\\frac{10-2}{5-1}=\\frac84=2$$\n\nComo:\n\n$$m_{AB}=m_{AC},$$\n\nos três pontos pertencem à mesma reta. Portanto:\n\n$$\\boxed{A,B,C\\text{ são colineares}}$$\n\nO material também pergunta por $k$ para que $(1,2)$, $(3,6)$ e $(5,k)$ sejam colineares. A reta dos dois primeiros pontos tem $m=2$ e equação $y=2x$. Assim:\n\n$$k=2(5)$$\n\n$$\\boxed{k=10}$$"
      },
      {
        "titulo": "Determinante e alinhamento",
        "texto": "O determinante de ordem 3 fornece uma condição algébrica geral para o alinhamento. Organizamos as coordenadas dos três pontos em três linhas e acrescentamos uma coluna de 1. Se o determinante for zero, os pontos são colineares.\n\nA principal vantagem é que o método continua válido quando a reta é vertical, situação em que o coeficiente angular não está definido. Para calcular, você pode desenvolver o determinante diretamente ou usar a expressão equivalente com produtos das coordenadas.\n\nQuando houver uma incógnita em uma coordenada, monte o determinante, imponha $D=0$ e resolva a equação para o parâmetro.",
        "formula": "latex:D=\\begin{vmatrix}x_1&y_1&1\\\\x_2&y_2&1\\\\x_3&y_3&1\\end{vmatrix}=0",
        "exemplo": "O material propõe também o caso vertical $A(2,-1)$, $B(2,4)$ e $C(2,10)$.\n\nMontamos:\n\n$$D=\\begin{vmatrix}2&-1&1\\\\2&4&1\\\\2&10&1\\end{vmatrix}$$\n\nComo a primeira coluna é constante, o determinante é nulo:\n\n$$D=0$$\n\nLogo:\n\n$$\\boxed{A,B,C\\text{ são colineares}}$$\n\nO determinante confirma o alinhamento sem precisar calcular uma inclinação vertical."
      },
      {
        "titulo": "Área de triângulo",
        "texto": "A área de um triângulo no plano cartesiano pode ser calculada com o mesmo determinante usado no teste de colinearidade. A área é metade do módulo do determinante. O módulo é indispensável porque área geométrica nunca é negativa; a ordem dos vértices pode mudar apenas o sinal do determinante.\n\nO método é especialmente útil quando a base e a altura não aparecem de modo evidente no desenho. Basta conhecer as coordenadas dos três vértices.\n\nSe o determinante for zero, a área também será zero. Nesse caso, não existe um triângulo propriamente dito: os três pontos estão alinhados.",
        "formula": "latex:A=\\frac{|D|}{2}",
        "exemplo": "No exemplo resolvido do material, temos $A(1,1)$, $B(5,1)$ e $C(3,4)$.\n\nUsando a expressão equivalente do determinante:\n\n$$D=1(1-4)+5(4-1)+3(1-1)$$\n\n$$D=-3+15+0=12$$\n\nA área é metade do módulo:\n\n$$A=\\frac{|D|}{2}$$\n\n$$A=\\frac{|12|}{2}=6$$\n\nPortanto:\n\n$$\\boxed{A=6\\text{ unidades}^2}$$"
      },
      {
        "titulo": "Ligação conceitual",
        "texto": "Colinearidade e área são duas interpretações do mesmo cálculo. Se $D=0$, os três pontos ficam sobre uma única reta e a região triangular desaparece; por isso, $A=0$. Se $D\\neq0$, os pontos formam um triângulo e sua área é $|D|/2$.\n\nEssa ligação é útil em problemas com parâmetros. Se a questão disser que a área é zero, você pode impor diretamente $D=0$. Se der uma área específica, imponha $|D|=2A$ e resolva a equação.\n\nO material explora exatamente essa conexão em exercícios que pedem valores de incógnitas para obter alinhamento ou uma área determinada.",
        "formula": "latex:A=0\\qquad\\Longleftrightarrow\\qquad D=0\\qquad\\Longleftrightarrow\\qquad\\text{colinearidade}",
        "exemplo": "Considere o exercício do material com os pontos $(1,2)$, $(x,6)$ e $(5,10)$.\n\nPara que a área seja zero, os pontos devem ser colineares:\n\n$$D=0$$\n\nComo a reta que passa por $(1,2)$ e $(5,10)$ tem inclinação:\n\n$$m=\\frac{10-2}{5-1}=2,$$\n\nsua equação é $y=2x$. Para o ponto $(x,6)$:\n\n$$6=2x$$\n\nLogo:\n\n$$\\boxed{x=3}$$"
      }
    ],
    "questoes": [
      {
        "id": "m4q1",
        "dificuldade": "facil",
        "xp": 35,
        "enunciado": "Os pontos (0,1), (2,5) e (4,9) são colineares?",
        "alternativas": [
          "sim",
          "não",
          "apenas os dois primeiros",
          "não é possível decidir"
        ],
        "correta": 0,
        "dica": "Compare as inclinações.",
        "explicacao": "Entre os pontos, a razão Δy/Δx é 2 em ambos os trechos. Logo, são colineares."
      },
      {
        "id": "m4q2",
        "dificuldade": "media",
        "xp": 40,
        "enunciado": "Determine k para que (2,3), (4,7) e (6,k) sejam colineares.",
        "alternativas": [
          "9",
          "10",
          "11",
          "12"
        ],
        "correta": 2,
        "dica": "A inclinação de (2,3) para (4,7) é 2.",
        "explicacao": "Mantendo inclinação 2: (k−7)/(6−4)=2 → k−7=4 → k=11."
      },
      {
        "id": "m4q3",
        "dificuldade": "facil",
        "xp": 35,
        "enunciado": "Os pontos (2,−1), (2,4) e (2,10) são colineares porque:",
        "alternativas": [
          "têm a mesma ordenada",
          "têm a mesma abscissa",
          "estão no mesmo quadrante",
          "formam um triângulo"
        ],
        "correta": 1,
        "dica": "Observe a coordenada x.",
        "explicacao": "Todos têm x=2, portanto pertencem à reta vertical x=2."
      },
      {
        "id": "m4q4",
        "dificuldade": "media",
        "xp": 45,
        "enunciado": "Qual é a área do triângulo A(0,0), B(6,0) e C(2,4)?",
        "alternativas": [
          "8",
          "10",
          "12",
          "16"
        ],
        "correta": 2,
        "dica": "Você pode usar base 6 e altura 4.",
        "explicacao": "A=6·4/2=12."
      },
      {
        "id": "m4q5",
        "dificuldade": "media",
        "xp": 45,
        "enunciado": "Calcule a área do triângulo A(−1,2), B(3,2) e C(1,7).",
        "alternativas": [
          "8",
          "10",
          "12",
          "14"
        ],
        "correta": 1,
        "dica": "AB é horizontal. Use-o como base.",
        "explicacao": "AB=4 e a altura é 5. A=4·5/2=10."
      },
      {
        "id": "m4q6",
        "dificuldade": "media",
        "xp": 45,
        "enunciado": "Para k>0, o triângulo (0,0), (4,0), (2,k) tem área 12. Quanto vale k?",
        "alternativas": [
          "4",
          "5",
          "6",
          "8"
        ],
        "correta": 2,
        "dica": null,
        "explicacao": "A base mede 4 e a altura é k. 4k/2=12 → 2k=12 → k=6."
      },
      {
        "id": "m4q7",
        "dificuldade": "desafio",
        "xp": 55,
        "enunciado": "Qual valor de x faz com que (1,2), (x,6) e (5,10) tenham área zero?",
        "alternativas": [
          "2",
          "3",
          "4",
          "5"
        ],
        "correta": 1,
        "dica": null,
        "explicacao": "Área zero significa colinearidade. A reta entre (1,2) e (5,10) tem m=2; para y=6, x=3."
      },
      {
        "id": "m4q8",
        "dificuldade": "desafio",
        "xp": 60,
        "enunciado": "A(0,0), B(5,0) e C(7,3) são vértices consecutivos de um paralelogramo. Qual é sua área?",
        "alternativas": [
          "12",
          "15",
          "18",
          "21"
        ],
        "correta": 1,
        "dica": null,
        "explicacao": "A base AB mede 5 e a altura em relação a essa base é 3. Área=5·3=15."
      }
    ]
  },
  {
    "id": "modulo-5",
    "numero": 5,
    "titulo": "Distâncias Envolvendo Retas",
    "subtitulo": "A menor distância no plano",
    "cor": "red",
    "icone": "⊥",
    "descricao": "Calcule a distância mínima de um ponto a uma reta e compare retas paralelas pela separação perpendicular entre elas.",
    "objetivos": [
      "Entender distância como perpendicular mínima",
      "Aplicar a fórmula ponto–reta",
      "Calcular distância entre paralelas"
    ],
    "teoria": [
      {
        "titulo": "Ideia geométrica",
        "texto": "A distância de um ponto a uma reta é a menor distância entre esse ponto e qualquer ponto da reta. Geometricamente, ela é medida pelo segmento perpendicular traçado do ponto até a reta. Um segmento oblíquo seria maior e, portanto, não representa a distância mínima.\n\nEssa interpretação ajuda a entender a fórmula algébrica e também a tangência de circunferências: quando uma circunferência é tangente a uma reta, seu raio é exatamente a distância perpendicular do centro até essa reta.\n\nAntes de calcular, identifique claramente o ponto, a reta e a forma algébrica em que ela está escrita.",
        "formula": "latex:d(P,r)=\\text{comprimento do segmento perpendicular de }P\\text{ até }r",
        "exemplo": "Considere um ponto $P$ fora de uma reta $r$.\n\nEntre todos os segmentos que ligam $P$ a pontos de $r$, o menor é aquele que forma $90^\\circ$ com a reta. Se $H$ é o pé da perpendicular, então:\n\n$$PH\\perp r$$\n\nLogo, a distância procurada é:\n\n$$\\boxed{d(P,r)=PH}$$\n\nEssa é a interpretação geométrica por trás da fórmula usada na próxima etapa."
      },
      {
        "titulo": "Fórmula ponto–reta",
        "texto": "Para calcular a distância do ponto $P(x_0,y_0)$ à reta $Ax+By+C=0$, substituímos as coordenadas do ponto no lado esquerdo da equação, tomamos o módulo e dividimos por $\\sqrt{A^2+B^2}$.\n\nA reta deve estar na forma geral antes da substituição. O valor absoluto garante distância não negativa. Se o numerador resultar em zero, o ponto satisfaz a equação da reta e, portanto, pertence a ela.\n\nO denominador normaliza os coeficientes da reta, fazendo com que o resultado represente uma distância geométrica real e não apenas o valor obtido ao substituir o ponto na expressão algébrica.",
        "formula": "latex:d=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}",
        "exemplo": "No exemplo do material, calcule a distância de $P(2,-1)$ à reta:\n\n$$r:3x+4y-10=0$$\n\nAplicamos:\n\n$$d=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}$$\n\n$$d=\\frac{|3(2)+4(-1)-10|}{\\sqrt{3^2+4^2}}$$\n\n$$d=\\frac{|-8|}{5}$$\n\nPortanto:\n\n$$\\boxed{d=\\frac85}$$"
      },
      {
        "titulo": "Casos simples",
        "texto": "Em retas verticais e horizontais, a distância pode ser obtida sem a fórmula geral. Para uma reta vertical $x=k$, comparamos apenas as abscissas: $d=|x_0-k|$. Para uma reta horizontal $y=k$, comparamos apenas as ordenadas: $d=|y_0-k|$.\n\nA razão é geométrica: a perpendicular a uma reta vertical é horizontal, e a perpendicular a uma reta horizontal é vertical. Assim, somente uma coordenada precisa variar.\n\nEsses casos simples também servem como verificação intuitiva do resultado que obteríamos pela fórmula geral.",
        "formula": "latex:x=k\\Rightarrow d=|x_0-k|\\qquad y=k\\Rightarrow d=|y_0-k|",
        "exemplo": "O material traz o ponto $P(5,2)$ e a reta vertical:\n\n$$x=-1$$\n\nComo a reta é vertical, usamos apenas as abscissas:\n\n$$d=|x_P-k|$$\n\n$$d=|5-(-1)|$$\n\n$$d=|6|$$\n\nLogo:\n\n$$\\boxed{d=6}$$"
      },
      {
        "titulo": "Retas paralelas",
        "texto": "Duas retas paralelas mantêm a mesma distância em todos os seus pontos. Quando são escritas com os mesmos coeficientes $A$ e $B$, a distância depende apenas da diferença entre os termos constantes.\n\nA fórmula pode ser entendida escolhendo qualquer ponto de uma das retas e calculando sua distância até a outra. Isso funciona porque, sendo paralelas, a separação perpendicular é constante.\n\nAntes de aplicar a expressão direta, garanta que os coeficientes de $x$ e $y$ estejam iguais nas duas equações; se necessário, multiplique uma das equações por uma constante equivalente.",
        "formula": "latex:d=\\frac{|C_1-C_2|}{\\sqrt{A^2+B^2}}",
        "exemplo": "No exercício do material:\n\n$$r:3x+4y-2=0$$\n\n$$s:3x+4y+18=0$$\n\nOs coeficientes de $x$ e $y$ já são iguais. Então:\n\n$$d=\\frac{|C_1-C_2|}{\\sqrt{A^2+B^2}}$$\n\n$$d=\\frac{|-2-18|}{\\sqrt{3^2+4^2}}$$\n\n$$d=\\frac{20}{5}$$\n\nPortanto:\n\n$$\\boxed{d=4}$$"
      }
    ],
    "questoes": [
      {
        "id": "m5q1",
        "dificuldade": "facil",
        "xp": 35,
        "enunciado": "Qual é a distância de P(1,2) à reta 3x+4y−6=0?",
        "alternativas": [
          "1",
          "2",
          "3",
          "5"
        ],
        "correta": 0,
        "dica": "Substitua o ponto no numerador e divida por √(3²+4²).",
        "explicacao": "d=|3+8−6|/5=5/5=1."
      },
      {
        "id": "m5q2",
        "dificuldade": "facil",
        "xp": 35,
        "enunciado": "Qual é a distância da origem à reta 5x−12y+26=0?",
        "alternativas": [
          "1",
          "2",
          "3",
          "13"
        ],
        "correta": 1,
        "dica": "Na origem, x=0 e y=0.",
        "explicacao": "d=|26|/√(25+144)=26/13=2."
      },
      {
        "id": "m5q3",
        "dificuldade": "media",
        "xp": 40,
        "enunciado": "Qual é a distância de P(−1,4) à reta y=2x+1?",
        "alternativas": [
          "1",
          "√5",
          "2√5",
          "5"
        ],
        "correta": 1,
        "dica": "Primeiro escreva a reta como 2x−y+1=0.",
        "explicacao": "d=|2(−1)−4+1|/√5=5/√5=√5."
      },
      {
        "id": "m5q4",
        "dificuldade": "facil",
        "xp": 35,
        "enunciado": "Qual é a distância de (7,−4) à reta vertical x=2?",
        "alternativas": [
          "3",
          "4",
          "5",
          "9"
        ],
        "correta": 2,
        "dica": "Compare apenas a coordenada x.",
        "explicacao": "d=|7−2|=5."
      },
      {
        "id": "m5q5",
        "dificuldade": "facil",
        "xp": 35,
        "enunciado": "Qual é a distância de (3,8) à reta horizontal y=−1?",
        "alternativas": [
          "7",
          "8",
          "9",
          "10"
        ],
        "correta": 2,
        "dica": "Compare apenas a coordenada y.",
        "explicacao": "d=|8−(−1)|=9."
      },
      {
        "id": "m5q6",
        "dificuldade": "media",
        "xp": 45,
        "enunciado": "Para k>0, a distância da origem à reta 3x+4y−k=0 é 6. Quanto vale k?",
        "alternativas": [
          "24",
          "30",
          "36",
          "40"
        ],
        "correta": 1,
        "dica": null,
        "explicacao": "d=k/5=6 → k=30."
      },
      {
        "id": "m5q7",
        "dificuldade": "media",
        "xp": 45,
        "enunciado": "O ponto (2,5) pertence à reta 2x−y+1=0?",
        "alternativas": [
          "sim, pois a distância é 0",
          "não, pois a distância é 1",
          "não, pois a distância é 2",
          "sim, pois x=y"
        ],
        "correta": 0,
        "dica": null,
        "explicacao": "2(2)−5+1=0. Logo, a distância até a reta é zero e o ponto pertence a ela."
      },
      {
        "id": "m5q8",
        "dificuldade": "desafio",
        "xp": 60,
        "enunciado": "Qual é a distância entre as retas 3x+4y−2=0 e 3x+4y+18=0?",
        "alternativas": [
          "2",
          "4",
          "5",
          "20"
        ],
        "correta": 1,
        "dica": null,
        "explicacao": "As retas já têm os mesmos A e B. d=|−2−18|/5=20/5=4."
      }
    ]
  },
  {
    "id": "modulo-6",
    "numero": 6,
    "titulo": "Circunferência",
    "subtitulo": "Centro, raio e tangência",
    "cor": "orange",
    "icone": "○",
    "descricao": "Feche a trilha reconhecendo a circunferência como lugar geométrico, convertendo formas e analisando posição e tangência.",
    "objetivos": [
      "Reconhecer centro e raio",
      "Converter entre formas reduzida e geral",
      "Relacionar ponto e reta com a circunferência"
    ],
    "teoria": [
      {
        "titulo": "Definição e forma reduzida",
        "texto": "Uma circunferência de centro $C(a,b)$ e raio $r>0$ é o conjunto de todos os pontos $P(x,y)$ cuja distância ao centro é exatamente $r$. Aplicando a fórmula da distância e elevando ao quadrado, obtemos a forma reduzida.\n\nNessa forma, o centro e o raio podem ser lidos diretamente: os sinais dentro dos parênteses aparecem invertidos em relação às coordenadas do centro, e o lado direito é $r^2$.\n\nSe a circunferência tem centro na origem, a expressão se simplifica para $x^2+y^2=r^2$. Essa relação entre distância e circunferência conecta este módulo diretamente aos anteriores.",
        "formula": "latex:(x-a)^2+(y-b)^2=r^2",
        "exemplo": "No primeiro exemplo resolvido do material, o centro é:\n\n$$C=(2,-3)$$\n\ne o raio é:\n\n$$r=5$$\n\nSubstituímos em:\n\n$$(x-a)^2+(y-b)^2=r^2$$\n\n$$(x-2)^2+(y-(-3))^2=5^2$$\n\nPortanto:\n\n$$\\boxed{(x-2)^2+(y+3)^2=25}$$"
      },
      {
        "titulo": "Forma geral",
        "texto": "Ao desenvolver os quadrados da forma reduzida, chegamos à forma geral $x^2+y^2+Dx+Ey+F=0$. No caminho inverso, para recuperar centro e raio, agrupamos os termos em $x$ e em $y$ e completamos quadrados.\n\nTambém podemos ler o centro diretamente pelos coeficientes: $C=(-D/2,-E/2)$. Depois, o raio pode ser obtido pela forma reduzida resultante ou pela relação $r^2=(D^2+E^2)/4-F$.\n\nCompletar quadrados exige cuidado: quando adicionamos um valor dentro de um grupo, precisamos compensá-lo corretamente para manter a igualdade.",
        "formula": "latex:\\begin{aligned}x^2+y^2+Dx+Ey+F&=0\\\\C&=\\left(-\\frac D2,-\\frac E2\\right)\\\\r^2&=\\frac{D^2+E^2}{4}-F\\end{aligned}",
        "exemplo": "No segundo exemplo do material:\n\n$$x^2+y^2-6x+4y-12=0$$\n\nPassamos o termo constante para o outro lado:\n\n$$x^2-6x+y^2+4y=12$$\n\nCompletando quadrados:\n\n$$(x-3)^2-9+(y+2)^2-4=12$$\n\nLogo:\n\n$$(x-3)^2+(y+2)^2=25$$\n\nPortanto:\n\n$$\\boxed{C=(3,-2) \\quad r=5}$$"
      },
      {
        "titulo": "Posição de um ponto",
        "texto": "Para classificar a posição de um ponto em relação a uma circunferência, calcule a distância $d$ do ponto ao centro e compare com o raio. Se $d<r$, o ponto está no interior; se $d=r$, pertence à circunferência; se $d>r$, está no exterior.\n\nTambém podemos evitar a raiz substituindo as coordenadas na expressão $(x-a)^2+(y-b)^2$ e comparando o resultado diretamente com $r^2$. Essa estratégia costuma tornar os cálculos mais rápidos.\n\nO material cobra essa interpretação e também interseções com os eixos e valores de parâmetros para que um ponto pertença à circunferência.",
        "formula": "latex:d<r:\\ \\text{interior}\\qquad d=r:\\ \\text{pertencente}\\qquad d>r:\\ \\text{exterior}",
        "exemplo": "Considere a circunferência do material:\n\n$$(x-1)^2+(y-2)^2=16$$\n\ne o ponto $P(4,2)$. O centro é $C(1,2)$ e o raio é $4$.\n\nA distância do ponto ao centro é:\n\n$$d(C,P)=\\sqrt{(4-1)^2+(2-2)^2}$$\n\n$$d(C,P)=3$$\n\nComo:\n\n$$3<4,$$\n\nconcluímos:\n\n$$\\boxed{P\\text{ está no interior da circunferência}}$$"
      },
      {
        "titulo": "Tangência",
        "texto": "Uma reta tangente toca uma circunferência em exatamente um ponto. Nesse ponto, o raio é perpendicular à reta tangente. Por isso, existe uma condição muito útil: a distância do centro à reta deve ser exatamente igual ao raio.\n\nAssim, se conhecemos o centro e uma reta tangente, podemos calcular o raio usando a fórmula de distância ponto–reta. Depois, substituímos centro e raio na equação reduzida da circunferência.\n\nEssa questão integra dois blocos do material — distância ponto–reta e circunferência — e é um excelente exemplo de como os conteúdos da prova se conectam.",
        "formula": "latex:r\\text{ tangente}\\qquad\\Longleftrightarrow\\qquad d(C,r)=R",
        "exemplo": "No exercício do material, a circunferência tem centro:\n\n$$C=(2,3)$$\n\ne é tangente à reta:\n\n$$4x+3y-2=0$$\n\nO raio é a distância do centro à reta:\n\n$$r=\\frac{|4(2)+3(3)-2|}{\\sqrt{4^2+3^2}}$$\n\n$$r=\\frac{15}{5}=3$$\n\nLogo, sua equação é:\n\n$$\\boxed{(x-2)^2+(y-3)^2=9}$$"
      }
    ],
    "questoes": [
      {
        "id": "m6q1",
        "dificuldade": "facil",
        "xp": 35,
        "enunciado": "Qual é a equação da circunferência de centro (4,−1) e raio 3?",
        "alternativas": [
          "(x−4)²+(y+1)²=9",
          "(x+4)²+(y−1)²=9",
          "(x−4)²+(y−1)²=3",
          "x²+y²=9"
        ],
        "correta": 0,
        "dica": "Use (x−a)²+(y−b)²=r².",
        "explicacao": "(x−4)²+(y+1)²=9."
      },
      {
        "id": "m6q2",
        "dificuldade": "facil",
        "xp": 35,
        "enunciado": "Uma circunferência tem centro na origem e passa por (3,4). Qual é sua equação?",
        "alternativas": [
          "x²+y²=5",
          "x²+y²=10",
          "x²+y²=25",
          "x²+y²=49"
        ],
        "correta": 2,
        "dica": "Calcule o raio pela distância da origem ao ponto.",
        "explicacao": "r=√(3²+4²)=5, então r²=25."
      },
      {
        "id": "m6q3",
        "dificuldade": "facil",
        "xp": 35,
        "enunciado": "Na equação (x+2)²+(y−5)²=16, o centro e o raio são:",
        "alternativas": [
          "C=(2,−5), r=4",
          "C=(−2,5), r=4",
          "C=(−2,5), r=16",
          "C=(2,5), r=8"
        ],
        "correta": 1,
        "dica": "Compare com (x−a)²+(y−b)²=r².",
        "explicacao": "C=(−2,5) e r=4."
      },
      {
        "id": "m6q4",
        "dificuldade": "media",
        "xp": 40,
        "enunciado": "Ao desenvolver (x−1)²+(y+3)²=9, obtemos:",
        "alternativas": [
          "x²+y²−2x+6y+1=0",
          "x²+y²+2x−6y+1=0",
          "x²+y²−2x+6y−9=0",
          "x²+y²−x+3y=0"
        ],
        "correta": 0,
        "dica": "Expanda os quadrados e reúna os termos.",
        "explicacao": "x²−2x+1+y²+6y+9=9 → x²+y²−2x+6y+1=0."
      },
      {
        "id": "m6q5",
        "dificuldade": "media",
        "xp": 45,
        "enunciado": "A forma reduzida de x²+y²−8x+6y=0 é:",
        "alternativas": [
          "(x−4)²+(y+3)²=25",
          "(x+4)²+(y−3)²=25",
          "(x−4)²+(y−3)²=7",
          "(x−8)²+(y+6)²=100"
        ],
        "correta": 0,
        "dica": null,
        "explicacao": "Completando quadrados: (x−4)²+(y+3)²=25."
      },
      {
        "id": "m6q6",
        "dificuldade": "desafio",
        "xp": 55,
        "enunciado": "O diâmetro de uma circunferência tem extremidades A(−2,1) e B(6,5). Qual é sua equação?",
        "alternativas": [
          "(x−2)²+(y−3)²=20",
          "(x−2)²+(y−3)²=80",
          "(x+2)²+(y+3)²=20",
          "x²+y²=20"
        ],
        "correta": 0,
        "dica": null,
        "explicacao": "O centro é o ponto médio (2,3). O raio é metade de AB; r²=20."
      },
      {
        "id": "m6q7",
        "dificuldade": "media",
        "xp": 45,
        "enunciado": "O ponto P(4,2) está em relação à circunferência (x−1)²+(y−2)²=16:",
        "alternativas": [
          "no exterior",
          "sobre a circunferência",
          "no interior",
          "no centro"
        ],
        "correta": 2,
        "dica": null,
        "explicacao": "O centro é (1,2), o raio é 4 e d(P,C)=3. Como 3<4, P está no interior."
      },
      {
        "id": "m6q8",
        "dificuldade": "desafio",
        "xp": 60,
        "enunciado": "Uma circunferência tem centro (2,3) e é tangente à reta 4x+3y−2=0. Qual é sua equação?",
        "alternativas": [
          "(x−2)²+(y−3)²=9",
          "(x−2)²+(y−3)²=25",
          "(x+2)²+(y+3)²=9",
          "(x−2)²+(y+3)²=9"
        ],
        "correta": 0,
        "dica": null,
        "explicacao": "A distância do centro à reta é |8+9−2|/5=3. Logo, r=3 e r²=9."
      }
    ]
  }
];
