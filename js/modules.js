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
        "texto": "O plano cartesiano funciona como um sistema de localização. Ele é formado por dois eixos perpendiculares que se cruzam na origem: o eixo x é horizontal e o eixo y é vertical. Cada ponto é escrito como um par ordenado P(x, y), e a ordem importa porque a primeira coordenada indica o deslocamento horizontal e a segunda, o deslocamento vertical.\n\n1) Comece sempre pela origem (0,0). 2) Desloque-se primeiro no eixo x: valores positivos vão para a direita e negativos para a esquerda. 3) Depois, desloque-se no eixo y: valores positivos sobem e negativos descem. 4) Observe os sinais de x e y para reconhecer o quadrante.\n\nUm ponto sobre um dos eixos não pertence a nenhum quadrante. Se x=0, ele está no eixo y; se y=0, está no eixo x. Essa leitura básica será usada em praticamente todos os módulos seguintes.",
        "formula": "latex:\\begin{array}{c|c}1^\\circ &(+,+)\\\\2^\\circ&(-,+)\\\\3^\\circ&(-,-)\\\\4^\\circ&(+,-)\\end{array}",
        "exemplo": "Considere os pontos $A(-4,3)$ e $B(2,-5)$.\n\nPara $A$, analisamos os sinais das coordenadas:\n\n$$x=-4<0 \\qquad y=3>0$$\n\nPortanto, $A$ está no $2^\\circ$ quadrante.\n\nPara $B$:\n\n$$x=2>0 \\qquad y=-5<0$$\n\nLogo, $B$ está no $4^\\circ$ quadrante."
      },
      {
        "titulo": "Distância entre dois pontos",
        "texto": "A distância entre dois pontos mede o comprimento do segmento que liga esses pontos. Para obtê-la, primeiro observamos quanto houve de deslocamento horizontal e quanto houve de deslocamento vertical. Esses dois deslocamentos formam os catetos de um triângulo retângulo, enquanto a distância procurada é a hipotenusa.\n\n1) Calcule Δx=x₂−x₁. 2) Calcule Δy=y₂−y₁. 3) Eleve as diferenças ao quadrado. 4) Some os resultados. 5) Tire a raiz quadrada.\n\nA fórmula é uma aplicação direta do Teorema de Pitágoras ao plano cartesiano. Trocar a ordem dos pontos não altera a distância: as diferenças mudam de sinal, mas seus quadrados permanecem iguais.",
        "formula": "latex:d=\\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}",
        "exemplo": "Queremos calcular a distância entre $A(-2,5)$ e $B(4,-3)$.\n\nPrimeiro, substituímos as coordenadas na fórmula:\n\n$$d=\\sqrt{(4-(-2))^2+(-3-5)^2}$$\n\nCalculando as diferenças:\n\n$$d=\\sqrt{6^2+(-8)^2}$$\n\nAgora elevamos ao quadrado e somamos:\n\n$$d=\\sqrt{36+64}=\\sqrt{100}$$\n\nPortanto:\n\n$$d=10$$"
      },
      {
        "titulo": "Ponto médio",
        "texto": "O ponto médio fica exatamente no centro de um segmento e o divide em duas partes de mesmo comprimento. Em vez de calcular distâncias, basta obter a média das coordenadas dos dois extremos.\n\n1) Some x₁ e x₂ e divida por 2. 2) Some y₁ e y₂ e divida por 2. 3) Reúna os resultados no par ordenado M(xₘ,yₘ).\n\nGeometricamente, M está na metade do caminho tanto na direção horizontal quanto na vertical. Essa ideia reaparece em medianas, centros, baricentros e problemas de simetria.",
        "formula": "latex:M=\\left(\\frac{x_1+x_2}{2},\\frac{y_1+y_2}{2}\\right)",
        "exemplo": "Queremos encontrar o ponto médio do segmento com extremos $A(7,-1)$ e $B(-3,11)$.\n\nAplicamos a média em cada coordenada:\n\n$$M=\\left(\\frac{7+(-3)}{2},\\frac{-1+11}{2}\\right)$$\n\nCalculando separadamente:\n\n$$M=\\left(\\frac{4}{2},\\frac{10}{2}\\right)$$\n\nAssim:\n\n$$M=(2,5)$$"
      },
      {
        "titulo": "Aplicações",
        "texto": "Nem todo problema exige a fórmula completa da distância. Se dois pontos têm a mesma ordenada, o segmento é horizontal e a distância depende apenas da diferença entre as abscissas. Se têm a mesma abscissa, o segmento é vertical e basta comparar as ordenadas.\n\nAntes de substituir valores em fórmulas, observe o desenho e procure simplificações. Esse hábito reduz contas e evita erros de sinal.\n\nDistância e ponto médio aparecem em classificação de triângulos, diagonais, localização de centros, equidistância e construção de lugares geométricos.",
        "formula": "latex:y_1=y_2\\Rightarrow d=|x_2-x_1|\\qquad x_1=x_2\\Rightarrow d=|y_2-y_1|",
        "exemplo": "Considere $A(-3,4)$ e $B(5,4)$.\n\nComo os dois pontos possuem a mesma ordenada,\n\n$$y_A=y_B=4$$\n\no segmento é horizontal. Por isso, basta calcular a diferença entre as abscissas:\n\n$$d=|x_B-x_A|$$\n\n$$d=|5-(-3)|=|8|$$\n\nLogo:\n\n$$d=8$$"
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
        "texto": "O coeficiente angular m descreve a inclinação de uma reta. Ele compara quanto y varia quando x varia e pode ser entendido como uma taxa: para cada avanço horizontal, quanto a reta sobe ou desce?\n\n1) Escolha dois pontos. 2) Calcule Δy=y₂−y₁. 3) Calcule Δx=x₂−x₁. 4) Faça m=Δy/Δx.\n\nSe m>0, a reta cresce da esquerda para a direita; se m<0, decresce; se m=0, é horizontal. Em uma reta vertical, Δx=0 e o coeficiente angular não é definido. O sinal e o valor de m permitem comparar direção e intensidade da inclinação.",
        "formula": "latex:m=\\frac{y_2-y_1}{x_2-x_1}=\\frac{\\Delta y}{\\Delta x}",
        "exemplo": "Considere os pontos $A(2,3)$ e $B(6,11)$.\n\nO coeficiente angular mede a variação vertical em relação à variação horizontal:\n\n$$m=\\frac{y_2-y_1}{x_2-x_1}$$\n\nSubstituindo as coordenadas:\n\n$$m=\\frac{11-3}{6-2}$$\n\n$$m=\\frac{8}{4}$$\n\nPortanto:\n\n$$m=2$$\n\nIsso significa que, para cada $1$ unidade que avançamos em $x$, a reta sobe $2$ unidades em $y$."
      },
      {
        "titulo": "Forma geral e reduzida",
        "texto": "A mesma reta pode ser escrita de formas algébricas diferentes. Na forma geral, Ax+By+C=0, os termos ficam reunidos em um único membro. Na forma reduzida, y=mx+b, a inclinação m e o intercepto no eixo y ficam visíveis imediatamente.\n\nPara passar da forma geral para a reduzida, isole y: mova os demais termos para o outro membro e divida tudo pelo coeficiente de y. Ao final, compare com y=mx+b.\n\nA forma geral é útil em distância ponto–reta e sistemas; a forma reduzida facilita a leitura de inclinação, intercepto e paralelismo.",
        "formula": "latex:Ax+By+C=0\\qquad\\Longleftrightarrow\\qquad y=mx+b",
        "exemplo": "Considere a reta na forma geral:\n\n$$3x-2y+6=0$$\n\nNosso objetivo é escrever a equação na forma reduzida $y=mx+b$. Para isso, isolamos $y$:\n\n$$-2y=-3x-6$$\n\nDividindo todos os termos por $-2$:\n\n$$y=\\frac{3}{2}x+3$$\n\nAgora podemos identificar diretamente:\n\n$$m=\\frac{3}{2} \\qquad b=3$$"
      },
      {
        "titulo": "Forma ponto–inclinação",
        "texto": "A forma ponto–inclinação é ideal quando o problema fornece um ponto conhecido da reta e seu coeficiente angular. Em vez de procurar primeiro o intercepto b, usamos diretamente essas duas informações.\n\n1) Identifique P(x₀,y₀). 2) Identifique m. 3) Substitua em y−y₀=m(x−x₀). 4) Desenvolva os parênteses. 5) Se necessário, isole y para chegar à forma reduzida.\n\nO cuidado principal está nos sinais: se y₀ for negativo, y−(−1) vira y+1. A ideia central é importante: um ponto de passagem mais uma direção determinam completamente uma reta.",
        "formula": "latex:y-y_0=m(x-x_0)",
        "exemplo": "Conhecemos o ponto $P(2,-1)$ e o coeficiente angular $m=3$.\n\nUsamos a forma ponto–inclinação:\n\n$$y-y_0=m(x-x_0)$$\n\nSubstituindo $x_0=2$, $y_0=-1$ e $m=3$:\n\n$$y-(-1)=3(x-2)$$\n\nDistribuindo o $3$:\n\n$$y+1=3x-6$$\n\nIsolando $y$:\n\n$$y=3x-7$$"
      },
      {
        "titulo": "Dois pontos e interceptos",
        "texto": "Dois pontos distintos determinam uma única reta. Quando eles são fornecidos, o caminho mais seguro é calcular primeiro o coeficiente angular e depois usar a forma ponto–inclinação com qualquer um dos pontos.\n\nOs interceptos são os pontos em que a reta cruza os eixos. Para achar o intercepto em x, faça y=0; para achar o intercepto em y, faça x=0. Esses dois pontos permitem esboçar rapidamente a reta.\n\nRetas verticais têm equação x=k e retas horizontais têm equação y=k. Reconhecer esses casos evita aplicar uma fórmula de inclinação onde ela não funciona.",
        "formula": "latex:x=k\\ \\text{(vertical)}\\qquad y=k\\ \\text{(horizontal)}",
        "exemplo": "Considere a reta:\n\n$$y=2x-6$$\n\nPara encontrar o ponto em que ela cruza o eixo $x$, fazemos $y=0$:\n\n$$0=2x-6$$\n\n$$2x=6 \\Rightarrow x=3$$\n\nAssim, o intercepto no eixo $x$ é:\n\n$$(3,0)$$\n\nAgora fazemos $x=0$ para encontrar o intercepto no eixo $y$:\n\n$$y=2(0)-6=-6$$\n\nLogo, o outro intercepto é:\n\n$$(0,-6)$$"
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
        "texto": "Quando duas retas se cruzam, o ponto de encontro satisfaz simultaneamente as duas equações. Por isso, encontrar a interseção equivale a resolver um sistema de duas equações.\n\n1) Escreva as equações. 2) Use substituição, comparação ou eliminação para obter x. 3) Substitua o valor em uma equação para encontrar y. 4) Confira o par ordenado na outra equação.\n\nUma solução indica retas secantes; nenhuma solução indica paralelas distintas; infinitas soluções indicam que as duas equações representam a mesma reta.",
        "formula": "latex:r\\cap s=\\text{solução do sistema}",
        "exemplo": "Considere as retas:\n\n$$r:y=x+1$$\n\n$$s:y=-2x+7$$\n\nNo ponto de interseção, as duas expressões de $y$ possuem o mesmo valor. Então:\n\n$$x+1=-2x+7$$\n\nReorganizando:\n\n$$3x=6 \\Rightarrow x=2$$\n\nSubstituindo em uma das equações:\n\n$$y=2+1=3$$\n\nPortanto:\n\n$$r\\cap s=(2,3)$$"
      },
      {
        "titulo": "Paralelas e coincidentes",
        "texto": "Retas paralelas têm a mesma direção. Para retas não verticais, isso significa possuir o mesmo coeficiente angular. Porém, m₁=m₂ não garante que sejam paralelas distintas: elas também podem coincidir.\n\nCompare primeiro as inclinações. Se m₁≠m₂, haverá interseção. Se m₁=m₂, compare os interceptos ou verifique se uma equação é múltipla da outra. Interceptos diferentes indicam paralelas distintas; equações equivalentes indicam coincidentes.\n\nEssa distinção é fundamental em sistemas e em problemas de posição relativa.",
        "formula": "latex:m_1=m_2\\Rightarrow\\text{retas paralelas ou coincidentes}",
        "exemplo": "Considere as retas:\n\n$$r:y=3x+2$$\n\n$$s:y=3x-4$$\n\nComparando os coeficientes angulares:\n\n$$m_r=3 \\qquad m_s=3$$\n\nComo:\n\n$$m_r=m_s$$\n\nas duas retas possuem a mesma inclinação. Como os interceptos são diferentes, elas não coincidem. Portanto, são paralelas distintas."
      },
      {
        "titulo": "Perpendicularidade",
        "texto": "Duas retas perpendiculares formam um ângulo de 90°. Para retas não verticais e não horizontais, seus coeficientes angulares satisfazem m₁·m₂=−1. Em outras palavras, o coeficiente de uma é o oposto do inverso da outra.\n\n1) Encontre m₁. 2) Inverta a fração. 3) Troque o sinal. 4) Verifique se o produto resulta em −1.\n\nHá um caso especial: uma reta horizontal é perpendicular a uma vertical. Nesse caso não usamos o produto porque a reta vertical não possui coeficiente angular definido.",
        "formula": "latex:m_1\\cdot m_2=-1",
        "exemplo": "Suponha que uma reta tenha coeficiente angular:\n\n$$m_1=\\frac{1}{2}$$\n\nPara que uma segunda reta seja perpendicular à primeira, seus coeficientes devem satisfazer:\n\n$$m_1m_2=-1$$\n\nSubstituindo:\n\n$$\\frac{1}{2}m_2=-1$$\n\nMultiplicando os dois lados por $2$:\n\n$$m_2=-2$$\n\nLogo, a reta perpendicular deve ter coeficiente angular $-2$."
      },
      {
        "titulo": "Quadro de decisão",
        "texto": "A posição relativa entre duas retas pode ser decidida por uma sequência organizada de verificações. Isso é mais seguro do que decorar casos isolados.\n\n1) Coloque as equações em uma forma que permita comparar as inclinações. 2) Se m₁≠m₂, são secantes. 3) Se m₁=m₂, compare os demais coeficientes: interceptos diferentes indicam paralelas; equações proporcionais indicam coincidentes. 4) Se m₁·m₂=−1, são perpendiculares.\n\nAtenção: “mesmo coeficiente angular” não significa automaticamente “paralelas distintas”.",
        "formula": "latex:m_1=m_2\\not\\Rightarrow r=s",
        "exemplo": "Considere as duas equações:\n\n$$2x-y+3=0$$\n\n$$4x-2y+6=0$$\n\nMultiplicando a primeira por $2$:\n\n$$2(2x-y+3)=0$$\n\n$$4x-2y+6=0$$\n\nObtivemos exatamente a segunda equação. Portanto, as duas expressões representam a mesma reta e são coincidentes."
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
        "texto": "Três pontos são colineares quando pertencem à mesma reta. Geometricamente, é possível traçar uma única reta passando pelos três sem mudar de direção.\n\nUma forma intuitiva de testar isso é comparar os coeficientes angulares entre pares de pontos. Se a inclinação de AB for igual à de BC, os três pontos têm a mesma direção e estão alinhados, desde que os cálculos estejam definidos.\n\nComo esse método exige cuidado com retas verticais, o determinante é uma alternativa mais geral e robusta.",
        "formula": "latex:\\det\\begin{pmatrix}x_1&y_1&1\\\\x_2&y_2&1\\\\x_3&y_3&1\\end{pmatrix}=0",
        "exemplo": "Considere $A(1,2)$, $B(3,6)$ e $C(5,10)$.\n\nCalculamos primeiro a inclinação entre $A$ e $B$:\n\n$$m_{AB}=\\frac{6-2}{3-1}=\\frac{4}{2}=2$$\n\nAgora entre $B$ e $C$:\n\n$$m_{BC}=\\frac{10-6}{5-3}=\\frac{4}{2}=2$$\n\nComo:\n\n$$m_{AB}=m_{BC}$$\n\nos três pontos pertencem à mesma reta. Portanto, são colineares."
      },
      {
        "titulo": "Determinante e alinhamento",
        "texto": "O determinante permite verificar alinhamento sem separar casos de reta vertical. Organizamos as coordenadas dos três pontos em uma expressão e calculamos um valor D.\n\n1) Substitua corretamente x₁,y₁,x₂,y₂,x₃,y₃. 2) Faça os produtos indicados. 3) Some os termos com atenção aos sinais. 4) Analise o resultado.\n\nSe D=0, os pontos são colineares. Se D≠0, eles formam um triângulo de área não nula. Essa conexão prepara diretamente o cálculo de área por coordenadas.",
        "formula": "latex:D=x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)",
        "exemplo": "Para verificar se três pontos são colineares, montamos o determinante:\n\n$$D=\\begin{vmatrix}x_1&y_1&1\\\\x_2&y_2&1\\\\x_3&y_3&1\\end{vmatrix}$$\n\nDepois calculamos seu valor. Se:\n\n$$D=0$$\n\nos três pontos estão alinhados. Se:\n\n$$D\\neq0$$\n\neles não são colineares e formam um triângulo de área não nula."
      },
      {
        "titulo": "Área de triângulo",
        "texto": "A área de um triângulo pode ser calculada diretamente pelas coordenadas de seus vértices. O mesmo determinante usado no teste de colinearidade fornece o dobro da área orientada.\n\n1) Calcule D com A, B e C. 2) Tome o módulo |D|, pois área não pode ser negativa. 3) Divida por 2.\n\nSe o resultado for zero, o triângulo está degenerado: os três pontos são colineares. Essa fórmula é especialmente útil quando base e altura não aparecem claramente no desenho.",
        "formula": "latex:A=\\frac{|D|}{2}",
        "exemplo": "Considere $A(1,1)$, $B(5,1)$ e $C(3,4)$.\n\nCalculamos o determinante associado aos três pontos:\n\n$$D=1(1-4)+5(4-1)+3(1-1)$$\n\n$$D=-3+15+0=12$$\n\nA área do triângulo é metade do módulo desse valor:\n\n$$A=\\frac{|D|}{2}$$\n\n$$A=\\frac{|12|}{2}=6$$\n\nPortanto, a área é $6$ unidades quadradas."
      },
      {
        "titulo": "Ligação conceitual",
        "texto": "Colinearidade, determinante e área são três leituras da mesma estrutura geométrica. Quando os três pontos ficam na mesma reta, o triângulo formado por eles fica “achatado” e sua área é zero; algebricamente, D=0.\n\nEssa ligação é poderosa em questões com parâmetros. Se uma coordenada contém uma incógnita, podemos impor D=0 para descobrir quando os pontos ficam alinhados ou impor uma área determinada para encontrar o valor do parâmetro.\n\nO objetivo é perceber a conexão, e não memorizar três fórmulas sem relação.",
        "formula": "latex:A=0\\qquad\\Longleftrightarrow\\qquad D=0\\qquad\\Longleftrightarrow\\qquad\\text{colinearidade}",
        "exemplo": "Suponha que um problema peça o valor de um parâmetro para que três pontos fiquem alinhados.\n\nPontos colineares não formam um triângulo com área positiva. Portanto:\n\n$$A=0$$\n\nComo a área pode ser calculada por:\n\n$$A=\\frac{|D|}{2}$$\n\nisso exige:\n\n$$D=0$$\n\nAssim, basta montar o determinante com as coordenadas, igualá-lo a zero e resolver a equação para encontrar o parâmetro."
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
        "texto": "A distância de um ponto a uma reta é o menor comprimento possível entre o ponto e qualquer ponto dessa reta. Geometricamente, o menor caminho sempre é um segmento perpendicular à reta.\n\nPor isso, não podemos escolher um ponto qualquer da reta e usar a fórmula de distância entre pontos: o valor encontrado poderia ser maior que a distância mínima. O ponto correto é o pé da perpendicular, geralmente chamado H.\n\nVisualizar essa perpendicular ajuda a entender tanto a fórmula ponto–reta quanto a distância entre paralelas e a tangência de circunferências.",
        "formula": "latex:d(P,r)=\\text{comprimento do segmento perpendicular de }P\\text{ até }r",
        "exemplo": "Considere um ponto $P$ fora de uma reta $r$.\n\nExistem vários segmentos que podem ligar $P$ a pontos de $r$, mas o menor deles é sempre perpendicular à reta.\n\nSe $H$ é o pé da perpendicular, então:\n\n$$PH\\perp r$$\n\nE a distância procurada é exatamente o comprimento desse segmento:\n\n$$d(P,r)=PH$$\n\nPor isso, segmentos oblíquos não representam a menor distância."
      },
      {
        "titulo": "Fórmula ponto–reta",
        "texto": "A fórmula da distância ponto–reta fornece diretamente o comprimento do segmento perpendicular. Ela é aplicada quando a reta está na forma geral Ax+By+C=0 e o ponto é P(x₀,y₀).\n\n1) Substitua x₀ e y₀ no numerador Ax₀+By₀+C. 2) Tome o módulo. 3) Calcule √(A²+B²). 4) Divida e simplifique.\n\nO módulo é indispensável porque distância não pode ser negativa. Também é importante usar A, B e C da mesma equação da reta, sem misturar coeficientes de formas equivalentes em escalas diferentes.",
        "formula": "latex:d=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}",
        "exemplo": "Considere o ponto $P(2,-1)$ e a reta:\n\n$$r:3x+4y-10=0$$\n\nUsamos a fórmula:\n\n$$d=\\frac{|Ax_0+By_0+C|}{\\sqrt{A^2+B^2}}$$\n\nSubstituindo $A=3$, $B=4$, $C=-10$, $x_0=2$ e $y_0=-1$:\n\n$$d=\\frac{|3(2)+4(-1)-10|}{\\sqrt{3^2+4^2}}$$\n\nCalculando:\n\n$$d=\\frac{|-8|}{5}$$\n\nPortanto:\n\n$$d=\\frac{8}{5}$$"
      },
      {
        "titulo": "Casos simples",
        "texto": "Algumas retas simplificam completamente o cálculo. Se a reta é vertical, x=k, a distância de P(x₀,y₀) até ela é a diferença horizontal |x₀−k|. Se é horizontal, y=k, usamos a diferença vertical |y₀−k|.\n\nA fórmula geral também funcionaria, mas seria trabalho desnecessário. O próprio desenho mostra qual coordenada muda e qual permanece igual.\n\nEm Geometria Analítica, interpretar a figura antes de calcular costuma produzir soluções mais rápidas e mais seguras.",
        "formula": "latex:x=k\\Rightarrow d=|x_0-k|\\qquad y=k\\Rightarrow d=|y_0-k|",
        "exemplo": "Considere o ponto $P(7,-4)$ e a reta vertical:\n\n$$x=2$$\n\nComo a reta é vertical, a menor distância é puramente horizontal. Basta comparar as abscissas:\n\n$$d=|x_P-2|$$\n\nSubstituindo:\n\n$$d=|7-2|$$\n\nLogo:\n\n$$d=5$$"
      },
      {
        "titulo": "Retas paralelas",
        "texto": "A distância entre duas retas paralelas é constante: qualquer segmento perpendicular traçado de uma à outra tem o mesmo comprimento. Quando as equações possuem os mesmos coeficientes A e B, a distância depende apenas da diferença entre C₁ e C₂.\n\n1) Garanta que A e B sejam iguais nas duas equações. 2) Calcule |C₁−C₂|. 3) Divida por √(A²+B²).\n\nSe as equações estiverem multiplicadas por fatores diferentes, normalize-as primeiro. Comparar apenas C₁ e C₂ sem igualar A e B produz um resultado incorreto.",
        "formula": "latex:d=\\frac{|C_1-C_2|}{\\sqrt{A^2+B^2}}",
        "exemplo": "Considere as retas paralelas:\n\n$$r:3x+4y-2=0$$\n\n$$s:3x+4y+18=0$$\n\nComo os coeficientes $A$ e $B$ são iguais, podemos usar:\n\n$$d=\\frac{|C_1-C_2|}{\\sqrt{A^2+B^2}}$$\n\nSubstituindo:\n\n$$d=\\frac{|-2-18|}{\\sqrt{3^2+4^2}}$$\n\n$$d=\\frac{20}{5}$$\n\nLogo:\n\n$$d=4$$"
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
        "texto": "Uma circunferência é o conjunto dos pontos que estão a uma mesma distância r de um ponto fixo C(a,b), chamado centro. A forma reduzida nasce diretamente da fórmula da distância entre dois pontos.\n\nPara qualquer P(x,y) da circunferência, a distância até C é r. Ao elevar a relação ao quadrado, obtemos (x−a)²+(y−b)²=r².\n\nNa leitura da fórmula, os sinais parecem invertidos: (x−2)² indica a=2; (y+3)² equivale a y−(−3), portanto b=−3. Essa leitura permite identificar centro e raio imediatamente.",
        "formula": "latex:(x-a)^2+(y-b)^2=r^2",
        "exemplo": "Considere uma circunferência de centro $C(2,-3)$ e raio $r=5$.\n\nA forma reduzida de uma circunferência é:\n\n$$(x-a)^2+(y-b)^2=r^2$$\n\nSubstituindo $a=2$, $b=-3$ e $r=5$:\n\n$$(x-2)^2+(y-(-3))^2=5^2$$\n\nSimplificando:\n\n$$(x-2)^2+(y+3)^2=25$$"
      },
      {
        "titulo": "Forma geral",
        "texto": "A forma geral da circunferência surge quando desenvolvemos os quadrados da forma reduzida: x²+y²+Dx+Ey+F=0. Nessa escrita, centro e raio não ficam visíveis de imediato.\n\nPara recuperar a forma reduzida, agrupe os termos em x e em y e complete quadrados. O objetivo é transformar cada grupo em algo como (x−a)² e (y−b)².\n\nDepois da reorganização algébrica, a geometria volta a aparecer claramente e podemos ler o centro e o raio.",
        "formula": "latex:x^2+y^2+Dx+Ey+F=0",
        "exemplo": "Considere a equação geral:\n\n$$x^2+y^2-6x+4y-12=0$$\n\nAgrupamos os termos de $x$ e de $y$:\n\n$$(x^2-6x)+(y^2+4y)=12$$\n\nCompletando quadrados:\n\n$$(x-3)^2-9+(y+2)^2-4=12$$\n\nPassando as constantes para o outro lado:\n\n$$(x-3)^2+(y+2)^2=25$$\n\nPortanto:\n\n$$C=(3,-2) \\qquad r=5$$"
      },
      {
        "titulo": "Posição de um ponto",
        "texto": "Para saber se um ponto está dentro, sobre ou fora de uma circunferência, compare a distância d do ponto ao centro com o raio r. O desenho ajuda, mas a decisão pode ser feita exatamente por cálculo.\n\n1) Identifique C e r. 2) Calcule d(P,C). 3) Compare: se d<r, o ponto está no interior; se d=r, pertence à circunferência; se d>r, está no exterior.\n\nPara evitar raízes, também podemos comparar d² com r². Essa estratégia frequentemente torna a conta mais rápida.",
        "formula": "latex:d<r:\\ \\text{interior}\\qquad d=r:\\ \\text{pertencente}\\qquad d>r:\\ \\text{exterior}",
        "exemplo": "Considere a circunferência de centro $C(1,2)$ e raio $r=4$, e o ponto $P(4,2)$.\n\nPrimeiro calculamos a distância entre o centro e o ponto:\n\n$$d(C,P)=\\sqrt{(4-1)^2+(2-2)^2}$$\n\n$$d(C,P)=\\sqrt{9}=3$$\n\nAgora comparamos com o raio:\n\n$$3<4$$\n\nComo $d(C,P)<r$, o ponto $P$ está no interior da circunferência."
      },
      {
        "titulo": "Tangência",
        "texto": "Uma reta tangente toca a circunferência em exatamente um ponto. Nesse ponto, o raio é perpendicular à reta tangente. Essa propriedade transforma tangência em um problema de distância ponto–reta.\n\nSe C é o centro e r é o raio, a reta será tangente exatamente quando d(C,reta)=r. Se essa distância for menor que r, a reta corta a circunferência em dois pontos; se for maior, não há interseção.\n\nAssim, tangência conecta três ideias já estudadas: circunferência, perpendicularidade e distância ponto–reta.",
        "formula": "latex:r\\text{ tangente}\\qquad\\Longleftrightarrow\\qquad d(C,r)=R",
        "exemplo": "Considere o centro $C(2,3)$ e a reta:\n\n$$r:4x+3y-2=0$$\n\nCalculamos a distância do centro até a reta:\n\n$$d=\\frac{|4(2)+3(3)-2|}{\\sqrt{4^2+3^2}}$$\n\n$$d=\\frac{|8+9-2|}{5}$$\n\n$$d=\\frac{15}{5}=3$$\n\nSe a circunferência tiver raio $r=3$, então:\n\n$$d(C,r)=r$$\n\nPortanto, a reta é tangente à circunferência."
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
