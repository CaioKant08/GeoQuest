window.KANT_MODULES = [
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
        "texto": "O plano cartesiano tem dois eixos perpendiculares: x, horizontal, e y, vertical. Um ponto P(x, y) é um par ordenado; trocar a ordem das coordenadas muda o ponto.",
        "formula": "1º: (+,+) • 2º: (−,+) • 3º: (−,−) • 4º: (+,−)",
        "exemplo": "A(−4,3) está no 2º quadrante; B(2,−5), no 4º."
      },
      {
        "titulo": "Distância entre dois pontos",
        "texto": "As diferenças horizontal e vertical formam os catetos de um triângulo retângulo. Por isso, a fórmula da distância é o Teorema de Pitágoras escrito em coordenadas.",
        "formula": "d = √[(x₂ − x₁)² + (y₂ − y₁)²]",
        "exemplo": "Entre A(−2,5) e B(4,−3): d = √(6² + (−8)²) = 10."
      },
      {
        "titulo": "Ponto médio",
        "texto": "O ponto médio divide o segmento em duas partes de mesmo comprimento. Suas coordenadas são as médias aritméticas das coordenadas dos extremos.",
        "formula": "M = ((x₁+x₂)/2, (y₁+y₂)/2)",
        "exemplo": "Para A(7,−1) e B(−3,11), M = (2,5)."
      },
      {
        "titulo": "Aplicações",
        "texto": "Distância e ponto médio aparecem em classificação de triângulos, diagonais, medianas, centros de segmentos e problemas de equidistância.",
        "formula": "mesma ordenada → d = |x₂−x₁| • mesma abscissa → d = |y₂−y₁|",
        "exemplo": "Se A e B têm o mesmo y, basta medir a diferença horizontal."
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
        "texto": "O coeficiente angular mede a taxa de variação de y em relação a x. Ele indica se a reta cresce, decresce ou é horizontal. Retas verticais não têm coeficiente angular definido.",
        "formula": "m = (y₂−y₁)/(x₂−x₁) = Δy/Δx",
        "exemplo": "A(2,3) e B(6,11): m=(11−3)/(6−2)=2."
      },
      {
        "titulo": "Forma geral e reduzida",
        "texto": "Toda reta pode ser escrita na forma geral. Quando B≠0, podemos isolar y e obter a forma reduzida, em que m aparece diretamente.",
        "formula": "Ax + By + C = 0   ⇄   y = mx + b",
        "exemplo": "3x−2y+6=0 → y=(3/2)x+3."
      },
      {
        "titulo": "Forma ponto–inclinação",
        "texto": "Se conhecemos um ponto da reta e seu coeficiente angular, a forma ponto–inclinação é o caminho mais direto para montar a equação.",
        "formula": "y − y₀ = m(x − x₀)",
        "exemplo": "m=3 e P(2,−1): y+1=3(x−2) → y=3x−7."
      },
      {
        "titulo": "Dois pontos e interceptos",
        "texto": "Dois pontos distintos determinam uma única reta. Para localizar os interceptos, faça y=0 para o eixo x e x=0 para o eixo y.",
        "formula": "reta vertical: x=k • reta horizontal: y=k",
        "exemplo": "y=2x−6 corta o eixo x em (3,0) e o eixo y em (0,−6)."
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
        "texto": "Duas retas concorrentes têm um único ponto em comum. Esse ponto é a solução do sistema formado pelas duas equações.",
        "formula": "r ∩ s = solução do sistema",
        "exemplo": "y=x+1 e y=−2x+7 → x=2 e y=3."
      },
      {
        "titulo": "Paralelas e coincidentes",
        "texto": "Retas não verticais paralelas têm o mesmo coeficiente angular. Se também tiverem o mesmo coeficiente linear, são coincidentes.",
        "formula": "paralelas: m₁=m₂",
        "exemplo": "y=3x+2 e y=3x−4 são paralelas distintas."
      },
      {
        "titulo": "Perpendicularidade",
        "texto": "No caso usual, os coeficientes angulares de retas perpendiculares são inversos opostos. Uma reta vertical é perpendicular a uma horizontal.",
        "formula": "m₁·m₂ = −1",
        "exemplo": "Se m₁=1/2, então m₂=−2."
      },
      {
        "titulo": "Quadro de decisão",
        "texto": "Mesmo m e interceptos diferentes: paralelas. Equações equivalentes: coincidentes. Coeficientes diferentes: concorrentes. Produto −1: perpendiculares.",
        "formula": "mesmo m ≠ mesma reta",
        "exemplo": "2x−y+3=0 e 4x−2y+6=0 representam a mesma reta."
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
        "texto": "Três pontos são colineares quando pertencem à mesma reta. Podemos comparar coeficientes angulares ou usar um determinante, inclusive em retas verticais.",
        "formula": "det |x y 1| = 0",
        "exemplo": "A(1,2), B(3,6), C(5,10): as inclinações são iguais, então os pontos estão alinhados."
      },
      {
        "titulo": "Determinante e alinhamento",
        "texto": "O determinante de ordem 3 organiza as coordenadas dos três pontos. Se o resultado for zero, a área associada também é zero.",
        "formula": "D = x₁(y₂−y₃)+x₂(y₃−y₁)+x₃(y₁−y₂)",
        "exemplo": "D=0 ⇔ os três pontos são colineares."
      },
      {
        "titulo": "Área de triângulo",
        "texto": "A área de um triângulo no plano cartesiano é metade do módulo do mesmo determinante usado para testar colinearidade.",
        "formula": "A = |D|/2",
        "exemplo": "A(1,1), B(5,1), C(3,4) → A=6."
      },
      {
        "titulo": "Ligação conceitual",
        "texto": "Colinearidade e área são duas faces do mesmo cálculo: se o determinante é zero, o triângulo “achata” e sua área é zero.",
        "formula": "área zero ⇔ colinearidade",
        "exemplo": "Esse vínculo ajuda a resolver problemas com parâmetros."
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
        "texto": "A distância de um ponto a uma reta é o comprimento do segmento perpendicular que liga o ponto à reta. É a menor distância possível.",
        "formula": "distância = segmento perpendicular mínimo",
        "exemplo": "Não basta escolher qualquer ponto da reta; o segmento precisa ser perpendicular."
      },
      {
        "titulo": "Fórmula ponto–reta",
        "texto": "Para usar a fórmula, a reta deve estar na forma geral Ax+By+C=0. O valor absoluto impede resultado negativo.",
        "formula": "d = |Ax₀+By₀+C| / √(A²+B²)",
        "exemplo": "P(2,−1) e 3x+4y−10=0 → d=8/5."
      },
      {
        "titulo": "Casos simples",
        "texto": "Em retas verticais ou horizontais, a distância é apenas a diferença absoluta entre a coordenada do ponto e a constante da reta.",
        "formula": "x=k → |x₀−k| • y=k → |y₀−k|",
        "exemplo": "De (7,−4) até x=2, a distância é 5."
      },
      {
        "titulo": "Retas paralelas",
        "texto": "Para duas retas paralelas com os mesmos coeficientes A e B, a distância depende apenas da diferença entre os termos constantes.",
        "formula": "d = |C₁−C₂| / √(A²+B²)",
        "exemplo": "3x+4y−2=0 e 3x+4y+18=0 → d=20/5=4."
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
        "texto": "Circunferência é o conjunto dos pontos que estão à mesma distância de um centro C(a,b). Essa distância constante é o raio r.",
        "formula": "(x−a)² + (y−b)² = r²",
        "exemplo": "Centro (2,−3), raio 5 → (x−2)²+(y+3)²=25."
      },
      {
        "titulo": "Forma geral",
        "texto": "Ao desenvolver a forma reduzida, obtemos uma equação com x² e y². Completando quadrados, recuperamos centro e raio.",
        "formula": "x²+y²+Dx+Ey+F=0",
        "exemplo": "x²+y²−6x+4y−12=0 → (x−3)²+(y+2)²=25."
      },
      {
        "titulo": "Posição de um ponto",
        "texto": "Compare a distância do ponto ao centro com o raio. Menor: interior; igual: sobre a circunferência; maior: exterior.",
        "formula": "d<r: interior • d=r: pertencente • d>r: exterior",
        "exemplo": "Em centro (1,2), r=4, o ponto (4,2) está no interior porque d=3."
      },
      {
        "titulo": "Tangência",
        "texto": "Uma reta é tangente quando toca a circunferência em um único ponto. Isso acontece quando a distância do centro à reta é exatamente igual ao raio.",
        "formula": "reta tangente ⇔ d(C,r)=raio",
        "exemplo": "Centro (2,3) e reta 4x+3y−2=0 → distância 3, então o raio tangente é 3."
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
