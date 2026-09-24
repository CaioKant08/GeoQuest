window.KANT_MODULE_1 = {
  id: "modulo-1",
  titulo: "Fundamentos do Plano Cartesiano",
  subtitulo: "Domine os pontos antes de dominar as retas.",
  descricao:
    "Distância, ponto médio, baricentro, área e alinhamento de pontos.",
  xpTotal: 600,

  fases: [

    // =====================================================
    // FASE 1 — DISTÂNCIA ENTRE PONTOS
    // =====================================================

    {
      id: "fase-1",
      titulo: "Distância entre Pontos",
      descricao: "Descubra o espaço que separa dois pontos no plano.",
      icone: "ruler",

      questoes: [
        {
          id: "m1-f1-q1",
          dificuldade: "facil",
          xp: 30,

          enunciado:
            "Os pontos A(2,3) e B(2,5) estão localizados sobre a mesma reta vertical. Qual é a distância entre eles?",

          alternativas: [
            "1 unidade",
            "2 unidades",
            "3 unidades",
            "4 unidades"
          ],

          correta: 1,

          dica:
            "Como as coordenadas x são iguais, observe apenas a diferença entre os valores de y.",

          explicacao:
            "Os pontos têm o mesmo x. Portanto, basta calcular |5 − 3| = 2. A distância é 2 unidades."
        },

        {
          id: "m1-f1-q2",
          dificuldade: "facil",
          xp: 35,

          enunciado:
            "Um personagem sai do ponto A(0,6) e vai até B(1,5). Qual é a distância percorrida em linha reta?",

          alternativas: [
            "1 unidade",
            "√2 unidades",
            "2 unidades",
            "2√2 unidades"
          ],

          correta: 1,

          dica:
            "Use d = √[(x₂ − x₁)² + (y₂ − y₁)²].",

          explicacao:
            "d = √[(1−0)² + (5−6)²] = √(1+1) = √2."
        },

        {
          id: "m1-f1-q3",
          dificuldade: "media",
          xp: 45,

          enunciado:
            "Dois checkpoints estão em A(2,1) e B(−2,4). Qual é a distância entre eles?",

          alternativas: [
            "3 unidades",
            "4 unidades",
            "5 unidades",
            "√13 unidades"
          ],

          correta: 2,

          dica:
            "Calcule separadamente a variação horizontal e a vertical.",

          explicacao:
            "Δx = −4 e Δy = 3. Assim, d = √(16+9) = √25 = 5."
        },

        {
          id: "m1-f1-q4",
          dificuldade: "desafio",
          xp: 50,

          enunciado:
            "Os pontos A(6,3) e B(2,7) formam a diagonal de um quadrado imaginário. Qual é o comprimento desse segmento?",

          alternativas: [
            "4 unidades",
            "4√2 unidades",
            "6 unidades",
            "8 unidades"
          ],

          correta: 1,

          dica:
            "As diferenças entre as coordenadas são −4 e +4.",

          explicacao:
            "d = √[(-4)² + 4²] = √32 = 4√2."
        }
      ]
    },

    // =====================================================
    // FASE 2 — PONTO MÉDIO
    // =====================================================

    {
      id: "fase-2",
      titulo: "Ponto Médio",
      descricao: "Encontre exatamente o centro de um segmento.",
      icone: "crosshair",

      questoes: [
        {
          id: "m1-f2-q1",
          dificuldade: "facil",
          xp: 30,

          enunciado:
            "Os pontos A(2,6) e B(4,10) formam um segmento. Qual é o ponto exatamente no meio deles?",

          alternativas: [
            "(2,8)",
            "(3,8)",
            "(3,6)",
            "(6,16)"
          ],

          correta: 1,

          dica:
            "Faça a média das coordenadas x e depois a média das coordenadas y.",

          explicacao:
            "M = ((2+4)/2, (6+10)/2) = (3,8)."
        },

        {
          id: "m1-f2-q2",
          dificuldade: "facil",
          xp: 35,

          enunciado:
            "Entre A(2,6) e B(4,2) existe um checkpoint exatamente no ponto médio. Onde ele está?",

          alternativas: [
            "(3,4)",
            "(2,4)",
            "(3,8)",
            "(6,8)"
          ],

          correta: 0,

          dica:
            "Some as coordenadas correspondentes e divida cada resultado por 2.",

          explicacao:
            "M = ((2+4)/2, (6+2)/2) = (3,4)."
        },

        {
          id: "m1-f2-q3",
          dificuldade: "media",
          xp: 40,

          enunciado:
            "O ponto M é o ponto médio do segmento entre A(2,3) e B(4,−2). Quais são suas coordenadas?",

          alternativas: [
            "(3, 1/2)",
            "(3, −1/2)",
            "(2, 1/2)",
            "(6,1)"
          ],

          correta: 0,

          dica:
            "Cuidado ao calcular a média de 3 e −2.",

          explicacao:
            "M = ((2+4)/2, (3−2)/2) = (3,1/2)."
        }
      ]
    },

    // =====================================================
    // FASE 3 — BARICENTRO
    // =====================================================

    {
      id: "fase-3",
      titulo: "Baricentro",
      descricao: "Encontre o ponto de equilíbrio de três vértices.",
      icone: "triangle",

      questoes: [
        {
          id: "m1-f3-q1",
          dificuldade: "facil",
          xp: 40,

          enunciado:
            "Um triângulo possui vértices A(3,1), B(2,6) e C(4,2). Qual é seu baricentro?",

          alternativas: [
            "(3,3)",
            "(3,2)",
            "(9,9)",
            "(2,3)"
          ],

          correta: 0,

          dica:
            "O baricentro é obtido fazendo a média das três coordenadas x e das três coordenadas y.",

          explicacao:
            "G = ((3+2+4)/3, (1+6+2)/3) = (3,3)."
        },

        {
          id: "m1-f3-q2",
          dificuldade: "media",
          xp: 50,

          enunciado:
            "Os vértices de uma região triangular são A(1,0), B(−2,4) e C(3,−5). Onde está seu baricentro?",

          alternativas: [
            "(2/3, −1/3)",
            "(1/3, −2/3)",
            "(2, −1)",
            "(−2/3, 1/3)"
          ],

          correta: 0,

          dica:
            "Some separadamente os três valores de x e os três valores de y.",

          explicacao:
            "xG = (1−2+3)/3 = 2/3 e yG = (0+4−5)/3 = −1/3."
        }
      ]
    },

    // =====================================================
    // FASE 4 — ÁREA
    // =====================================================

    {
      id: "fase-4",
      titulo: "Área no Plano Cartesiano",
      descricao: "Transforme coordenadas em áreas.",
      icone: "shapes",

      questoes: [
        {
          id: "m1-f4-q1",
          dificuldade: "media",
          xp: 45,

          enunciado:
            "Um terreno triangular possui vértices A(1,−1), B(2,1) e C(2,2). Qual é sua área?",

          alternativas: [
            "1/2 u²",
            "1 u²",
            "3/2 u²",
            "2 u²"
          ],

          correta: 0,

          dica:
            "Use o determinante ou a fórmula da área pelas coordenadas.",

          explicacao:
            "Aplicando a fórmula da área de um triângulo no plano cartesiano, obtemos A = 1/2 u²."
        },

        {
          id: "m1-f4-q2",
          dificuldade: "desafio",
          xp: 55,

          enunciado:
            "Considere o triângulo de vértices A(3,4), B(−2,3) e C(1,1). Qual é sua área?",

          alternativas: [
            "3/2 u²",
            "5/2 u²",
            "7/2 u²",
            "9/2 u²"
          ],

          correta: 0,

          dica:
            "Monte a expressão da área com as coordenadas e lembre-se do valor absoluto.",

          explicacao:
            "Aplicando a fórmula da área pelas coordenadas, o determinante possui módulo 3. Assim, a área é 3/2 u²."
        }
      ]
    },

    // =====================================================
    // FASE 5 — COLINEARIDADE
    // =====================================================

    {
      id: "fase-5",
      titulo: "Pontos Alinhados",
      descricao: "Descubra quando três pontos pertencem à mesma reta.",
      icone: "route",

      questoes: [
        {
          id: "m1-f5-q1",
          dificuldade: "media",
          xp: 45,

          enunciado:
            "Os pontos A(0,3), B(4,0) e C(5,0) estão alinhados em uma única reta?",

          alternativas: [
            "Sim, porque B e C têm o mesmo y",
            "Sim, porque os três estão no plano cartesiano",
            "Não, porque os coeficientes entre os pares não são iguais",
            "Não, porque nenhum ponto está na origem"
          ],

          correta: 2,

          dica:
            "Compare a inclinação de AB com a inclinação de BC.",

          explicacao:
            "AB possui inclinação −3/4, enquanto BC possui inclinação 0. Como são diferentes, os três pontos não são colineares."
        },

        {
          id: "m1-f5-q2",
          dificuldade: "media",
          xp: 45,

          enunciado:
            "Observe A(2,2), B(5,5) e C(−3,−3). O que podemos concluir?",

          alternativas: [
            "Os três pontos são colineares",
            "Apenas A e B estão alinhados",
            "O ponto C pertence a outra reta",
            "Não existe reta passando por A e B"
          ],

          correta: 0,

          dica:
            "Observe a relação entre x e y em cada ponto.",

          explicacao:
            "Nos três pontos, x = y. Portanto, todos pertencem à reta y = x e são colineares."
        },

        {
          id: "m1-f5-q3",
          dificuldade: "desafio",
          xp: 60,

          enunciado:
            "Último desafio: os pontos A(1,2), B(3,6) e C(5,10) pertencem à mesma reta. Qual característica confirma isso?",

          alternativas: [
            "Todos possuem coordenadas positivas",
            "A distância entre todos os pontos é igual",
            "A razão entre a variação de y e de x permanece constante",
            "Todos estão à mesma distância da origem"
          ],

          correta: 2,

          dica:
            "Calcule a inclinação entre A e B e depois entre B e C.",

          explicacao:
            "De A para B, Δy/Δx = 4/2 = 2. De B para C, também é 4/2 = 2. A inclinação constante mostra que os pontos estão alinhados."
        }
      ]
    }
  ]
};