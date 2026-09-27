(() => {
  const q=(id,dificuldade,xp,enunciado,alternativas,correta,dica,explicacao)=>({id,dificuldade,xp,enunciado,alternativas,correta,dica,explicacao});
  window.KANT_EXTRA_QUESTIONS={
    1:[
      q('m1e1','facil',30,'Em qual quadrante está o ponto P(−6,4)?',['1º quadrante','2º quadrante','3º quadrante','4º quadrante'],1,'Observe os sinais de x e y.','Como x<0 e y>0, P está no 2º quadrante.'),
      q('m1e2','facil',30,'Qual é a distância entre A(0,0) e B(3,4)?',['4','5','6','7'],1,'Use d=√(3²+4²).','d=√(9+16)=√25=5.'),
      q('m1e3','facil',30,'Qual é a distância entre P(−2,6) e Q(5,6)?',['5','6','7','8'],2,'Os pontos têm a mesma ordenada.','d=|5−(−2)|=7.'),
      q('m1e4','facil',30,'Qual é a distância entre A(3,−5) e B(3,4)?',['7','8','9','10'],2,'Os pontos têm a mesma abscissa.','d=|4−(−5)|=9.'),
      q('m1e5','facil',30,'Determine o ponto médio de A(−2,4) e B(6,8).',['(1,6)','(2,6)','(2,5)','(4,6)'],1,'Faça a média das coordenadas correspondentes.','M=((−2+6)/2,(4+8)/2)=(2,6).'),
      q('m1e6','facil',30,'Determine o ponto médio de P(4,−6) e Q(10,2).',['(6,−2)','(7,−2)','(7,−4)','(8,−2)'],1,'Faça a média dos x e dos y.','M=((4+10)/2,(−6+2)/2)=(7,−2).'),
      q('m1e7','facil',30,'M(3,4) é ponto médio de A(1,2) e B(x,y). Determine B.',['(4,6)','(5,6)','(5,5)','(6,5)'],1,'Use 3=(1+x)/2 e 4=(2+y)/2.','x=5 e y=6. Logo, B=(5,6).'),
      q('m1e8','media',40,'A distância entre A(2,1) e B(x,1) é 5. Quais valores de x são possíveis?',['x=5 ou x=−5','x=7 ou x=−3','x=6 ou x=−4','x=7 apenas'],1,'Resolva |x−2|=5.','x−2=±5, então x=7 ou x=−3.'),
      q('m1e9','media',40,'Qual é a distância entre A(−1,−1) e B(7,5)?',['8','9','10','12'],2,'As diferenças são 8 e 6.','d=√(8²+6²)=√100=10.'),
      q('m1e10','media',40,'A(0,0), B(6,8) e C(12,0) formam um triângulo classificado, quanto aos lados, como:',['equilátero','isósceles','escaleno','retângulo equilátero'],1,'Compare AB, BC e AC.','AB=10, BC=10 e AC=12. Logo, é isósceles.'),
      q('m1e11','media',40,'A(−4,2) e B(2,10) são extremos de um segmento. Qual é seu ponto médio?',['(−1,6)','(1,6)','(−1,4)','(3,6)'],0,'Faça a média das coordenadas.','M=((−4+2)/2,(2+10)/2)=(−1,6).'),
      q('m1e12','media',40,'A distância entre P(−3,2) e Q(5,2) e o ponto médio do segmento são, respectivamente:',['8 e (1,2)','8 e (2,2)','6 e (1,2)','10 e (1,2)'],0,'Como y é igual, a distância é horizontal.','d=8 e M=((−3+5)/2,(2+2)/2)=(1,2).')
    ],
    2:[
      q('m2e1','facil',30,'Qual é o coeficiente angular da reta que passa por A(1,2) e B(5,10)?',['1','2','3','4'],1,'m=(10−2)/(5−1).','m=8/4=2.'),
      q('m2e2','facil',30,'Qual é o coeficiente angular da reta que passa por P(−2,5) e Q(2,1)?',['−2','−1','1','2'],1,'Calcule Δy/Δx.','m=(1−5)/(2−(−2))=−4/4=−1.'),
      q('m2e3','facil',30,'Qual equação representa a reta de inclinação 2 que passa por (1,3)?',['y−3=2(x−1)','y+3=2(x+1)','y−1=3(x−2)','y=2x+3'],0,'Use y−y₀=m(x−x₀).','Substituindo m=2 e (1,3): y−3=2(x−1).'),
      q('m2e4','facil',30,'Na reta y=−3x+7, o coeficiente angular e o coeficiente linear são:',['−3 e 7','3 e 7','−3 e −7','7 e −3'],0,'Compare com y=mx+b.','m=−3 e b=7.'),
      q('m2e5','facil',30,'A forma reduzida de 2x+y−6=0 é:',['y=2x−6','y=−2x+6','y=−2x−6','y=2x+6'],1,'Isole y.','y=−2x+6.'),
      q('m2e6','facil',30,'A forma geral equivalente a y=5x−4 é:',['5x−y−4=0','5x+y−4=0','5x−y+4=0','x−5y−4=0'],0,'Leve todos os termos para um lado.','5x−y−4=0.'),
      q('m2e7','facil',30,'A reta y=−2x+8 intercepta o eixo y em:',['(0,−2)','(0,8)','(4,0)','(8,0)'],1,'No eixo y, x=0.','Com x=0, y=8. Logo, (0,8).'),
      q('m2e8','media',40,'A reta y=−2x+8 intercepta o eixo x em:',['(0,8)','(2,0)','(4,0)','(8,0)'],2,'No eixo x, y=0.','0=−2x+8, então x=4. Logo, (4,0).'),
      q('m2e9','media',40,'Qual reta passa por (0,1) e (3,7)?',['y=x+1','y=2x+1','y=3x+1','y=2x−1'],1,'Primeiro calcule m.','m=(7−1)/3=2 e b=1. Logo, y=2x+1.'),
      q('m2e10','media',40,'Qual é a equação da reta vertical que passa por (−4,3)?',['y=−4','x=3','x=−4','y=3'],2,'Reta vertical mantém x constante.','A equação é x=−4.'),
      q('m2e11','media',40,'Qual é a equação da reta horizontal que passa por (5,−2)?',['x=5','y=5','x=−2','y=−2'],3,'Reta horizontal mantém y constante.','A equação é y=−2.'),
      q('m2e12','media',40,'A reta passa por (2,5) e tem m=−2. Sua forma reduzida é:',['y=−2x+9','y=−2x+1','y=2x+1','y=2x+9'],0,'Use y−5=−2(x−2).','y−5=−2x+4, então y=−2x+9.')
    ],
    3:[
      q('m3e1','facil',30,'As retas y=2x+1 e y=2x−5 são:',['concorrentes','paralelas distintas','coincidentes','perpendiculares'],1,'Compare os coeficientes angulares.','Mesmo m=2 e diferentes termos independentes: paralelas distintas.'),
      q('m3e2','facil',30,'As retas y=−3x+4 e 3x+y−4=0 são:',['paralelas distintas','perpendiculares','coincidentes','concorrentes distintas'],2,'Coloque a segunda na forma reduzida.','3x+y−4=0 equivale a y=−3x+4. São coincidentes.'),
      q('m3e3','facil',30,'As retas y=2x+3 e y=−(1/2)x+1 são:',['paralelas','perpendiculares','coincidentes','horizontais'],1,'Multiplique os coeficientes angulares.','2·(−1/2)=−1. Logo, são perpendiculares.'),
      q('m3e4','facil',30,'Qual é o ponto de interseção de y=x+2 e y=−x+6?',['(1,3)','(2,4)','(3,5)','(4,2)'],1,'Iguale as expressões de y.','x+2=−x+6 ⇒ 2x=4 ⇒ x=2 e y=4.'),
      q('m3e5','facil',30,'Para y=(k+1)x−2 ser paralela a y=4x+5, k deve ser:',['2','3','4','5'],1,'Retas paralelas têm o mesmo m.','k+1=4, então k=3.'),
      q('m3e6','facil',30,'Para y=kx+3 ser perpendicular a y=−2x+1, k deve ser:',['−2','−1/2','1/2','2'],2,'m₁m₂=−1.','k·(−2)=−1, então k=1/2.'),
      q('m3e7','facil',30,'Duas retas não verticais têm m₁=5 e m₂=5. O que ainda é preciso verificar para saber se são coincidentes?',['os coeficientes lineares','os sinais de x','a distância à origem','o número de pontos dados'],0,'Mesmo m pode indicar paralelas ou coincidentes.','É preciso comparar os demais coeficientes, especialmente o coeficiente linear.'),
      q('m3e8','media',40,'Qual é o ponto de interseção de y=3x−2 e y=x+4?',['(2,4)','(3,7)','(1,1)','(4,10)'],1,'Iguale 3x−2 e x+4.','2x=6 ⇒ x=3 e y=7.'),
      q('m3e9','media',40,'Uma reta paralela a y=−x+2 que passa por (3,5) é:',['y=−x+8','y=x+2','y=−x+2','y=x+8'],0,'Mantenha m=−1 e determine b.','5=−3+b, então b=8. Logo, y=−x+8.'),
      q('m3e10','media',40,'Uma reta perpendicular a y=3x−1 que passa pela origem é:',['y=3x','y=−3x','y=(1/3)x','y=−(1/3)x'],3,'A inclinação perpendicular é o inverso oposto.','m=−1/3 e, passando pela origem, y=−(1/3)x.'),
      q('m3e11','media',40,'As retas 2x+y−3=0 e 4x+2y+5=0 são:',['coincidentes','paralelas distintas','perpendiculares','a mesma reta vertical'],1,'Compare as formas reduzidas.','Ambas têm m=−2, mas termos independentes diferentes. São paralelas distintas.'),
      q('m3e12','media',40,'As retas x=4 e y=−2 são:',['paralelas','coincidentes','perpendiculares','oblíquas não perpendiculares'],2,'Uma é vertical e a outra horizontal.','Reta vertical e reta horizontal são perpendiculares.')
    ],
    4:[
      q('m4e1','facil',30,'Os pontos (1,2), (2,4) e (3,6) são colineares?',['Sim','Não','Somente os dois primeiros','Não é possível saber'],0,'Compare as inclinações.','As inclinações são iguais a 2. Portanto, são colineares.'),
      q('m4e2','facil',30,'Os pontos (0,0), (2,3) e (4,7) são colineares?',['Sim','Não','Apenas se x=0','São coincidentes'],1,'Compare m entre pares.','m₁₂=3/2 e m₂₃=4/2=2. Como são diferentes, não são colineares.'),
      q('m4e3','facil',30,'Três pontos em uma mesma reta vertical têm:',['sempre área de triângulo zero','sempre área positiva','coeficiente angular zero','coordenadas y iguais'],0,'Pontos colineares não formam triângulo com área positiva.','Se são colineares, o determinante e a área são zero.'),
      q('m4e4','facil',30,'Qual é a área do triângulo A(0,0), B(4,0), C(0,3)?',['5','6','7','12'],1,'Base 4 e altura 3.','A=(4·3)/2=6.'),
      q('m4e5','facil',30,'Qual é a área do triângulo A(0,0), B(8,0), C(3,2)?',['6','8','10','16'],1,'Use base 8 e altura 2.','A=(8·2)/2=8.'),
      q('m4e6','facil',30,'Se o determinante usado na área de três pontos é zero, então:',['a área é 1','os pontos são colineares','o triângulo é equilátero','as retas são perpendiculares'],1,'Área é metade do módulo do determinante.','Determinante zero implica área zero e pontos colineares.'),
      q('m4e7','facil',30,'Os pontos (2,1), (2,5) e (2,9) são colineares?',['Sim','Não','Só os dois primeiros','Só os dois últimos'],0,'Observe as abscissas.','Todos têm x=2, portanto pertencem à mesma reta vertical.'),
      q('m4e8','media',40,'Determine k para que (0,0), (2,2) e (4,k) sejam colineares.',['2','3','4','6'],2,'A reta pelos dois primeiros tem m=1.','A reta é y=x. Para x=4, y=4. Logo, k=4.'),
      q('m4e9','media',40,'O triângulo A(0,0), B(6,0), C(3,k), com k>0, tem área 15. Quanto vale k?',['3','4','5','6'],2,'A=base·altura/2.','15=6k/2=3k, então k=5.'),
      q('m4e10','media',40,'Qual é a área do triângulo A(−2,1), B(4,1), C(1,5)?',['10','12','14','24'],1,'A base horizontal mede 6 e a altura mede 4.','A=(6·4)/2=12.'),
      q('m4e11','media',40,'Se A(1,1), B(3,5) e C(5,9), então a área de ABC é:',['0','2','4','8'],0,'Verifique se as inclinações são iguais.','Os três pontos estão na reta y=2x−1. Logo, a área é zero.'),
      q('m4e12','media',40,'Um paralelogramo tem base horizontal de comprimento 7 e altura 4. Sua área é:',['11','14','21','28'],3,'Área do paralelogramo = base·altura.','A=7·4=28.')
    ],
    5:[
      q('m5e1','facil',30,'Qual é a distância de P(0,0) à reta 3x+4y−10=0?',['1','2','3','5'],1,'Use |C|/√(A²+B²) na origem.','d=10/5=2.'),
      q('m5e2','facil',30,'Qual é a distância de P(6,2) à reta vertical x=1?',['3','4','5','6'],2,'Use |x₀−k|.','d=|6−1|=5.'),
      q('m5e3','facil',30,'Qual é a distância de P(−2,7) à reta horizontal y=3?',['2','3','4','5'],2,'Use |y₀−k|.','d=|7−3|=4.'),
      q('m5e4','facil',30,'Se a distância de um ponto até uma reta é zero, então o ponto:',['é perpendicular à reta','pertence à reta','está na origem','tem x=0'],1,'Interprete geometricamente a distância zero.','Distância zero significa que o ponto está sobre a reta.'),
      q('m5e5','facil',30,'Qual é a distância da origem à reta 6x+8y−20=0?',['1','2','4','10'],1,'√(6²+8²)=10.','d=20/10=2.'),
      q('m5e6','facil',30,'Antes de usar a fórmula de distância ponto–reta em y=2x+5, devemos escrever:',['2x−y+5=0','2x+y+5=0','y−2x=0','x−2y+5=0'],0,'Leve todos os termos para um lado.','y=2x+5 equivale a 2x−y+5=0.'),
      q('m5e7','facil',30,'A distância entre as retas horizontais y=2 e y=9 é:',['5','6','7','11'],2,'Basta calcular a diferença entre as ordenadas.','d=|9−2|=7.'),
      q('m5e8','media',40,'Qual é a distância de P(1,1) à reta 3x+4y−12=0?',['1/5','1','5','7/5'],1,'Calcule o numerador com atenção.','d=|3+4−12|/5=5/5=1.'),
      q('m5e9','media',40,'Qual é a distância de P(2,−1) à reta x−2y+4=0?',['4/√5','6/√5','8/√5','10/√5'],2,'Substitua x=2 e y=−1.','d=|2−2(−1)+4|/√5=8/√5.'),
      q('m5e10','media',40,'As retas 3x+4y−5=0 e 3x+4y+10=0 são paralelas. A distância entre elas é:',['2','3','4','5'],1,'Use |C₂−C₁|/√(A²+B²).','d=|10−(−5)|/5=15/5=3.'),
      q('m5e11','media',40,'Para k>0, a distância da origem à reta 5x+12y−k=0 é 2. Quanto vale k?',['13','24','26','30'],2,'√(5²+12²)=13.','k/13=2, então k=26.'),
      q('m5e12','media',40,'O ponto P(3,2) pertence à reta 2x+y−8=0?',['Sim','Não, distância 1','Não, distância 2','Não é possível saber'],0,'Substitua as coordenadas na equação.','2·3+2−8=0. Logo, P pertence à reta.')
    ],
    6:[
      q('m6e1','facil',30,'Qual é a equação da circunferência de centro (2,3) e raio 4?',['(x−2)²+(y−3)²=16','(x+2)²+(y+3)²=16','(x−2)²+(y−3)²=4','x²+y²=16'],0,'Use (x−a)²+(y−b)²=r².','(x−2)²+(y−3)²=16.'),
      q('m6e2','facil',30,'Na circunferência (x−5)²+(y+1)²=25, o centro é:',['(5,1)','(−5,−1)','(5,−1)','(−5,1)'],2,'Lembre que y+1=y−(−1).','C=(5,−1).'),
      q('m6e3','facil',30,'Na circunferência x²+y²=49, o raio vale:',['7','14','49','√49²'],0,'r²=49.','r=7.'),
      q('m6e4','facil',30,'Uma circunferência de centro na origem passa por (5,12). Seu raio é:',['12','13','17','25'],1,'Calcule a distância até a origem.','r=√(5²+12²)=13.'),
      q('m6e5','facil',30,'O ponto P está sobre uma circunferência quando a distância ao centro é:',['menor que r','igual a r','maior que r','igual a r²'],1,'Use a definição de circunferência.','P está sobre a circunferência quando d(C,P)=r.'),
      q('m6e6','facil',30,'O ponto P está no interior de uma circunferência quando:',['d<r','d=r','d>r','d=2r'],0,'Compare distância e raio.','Interior significa d(C,P)<r.'),
      q('m6e7','facil',30,'Ao desenvolver (x−2)²+(y−1)²=9, qual termo linear em x aparece?',['−2x','−4x','2x','4x'],1,'Expanda (x−2)².','(x−2)²=x²−4x+4.'),
      q('m6e8','media',40,'A forma geral de (x−2)²+(y+3)²=16 é:',['x²+y²−4x+6y−3=0','x²+y²−4x+6y+13=0','x²+y²+4x−6y−3=0','x²+y²−2x+3y−16=0'],0,'Expanda e reúna as constantes.','x²−4x+4+y²+6y+9=16 ⇒ x²+y²−4x+6y−3=0.'),
      q('m6e9','media',40,'Qual é o centro de x²+y²−6x+8y=0?',['(−3,4)','(3,−4)','(6,−8)','(3,4)'],1,'Complete quadrados ou use −D/2 e −E/2.','C=(3,−4).'),
      q('m6e10','media',40,'Para a circunferência (x−1)²+(y−2)²=25, o ponto (4,6) está:',['no interior','sobre a circunferência','no exterior','no centro'],1,'Calcule d do ponto ao centro.','d=√(3²+4²)=5=r. Logo, está sobre a circunferência.'),
      q('m6e11','media',40,'Uma circunferência tem centro (0,0) e é tangente à reta x=6. Seu raio é:',['3','6','12','36'],1,'O raio é a distância do centro à reta tangente.','A distância da origem a x=6 é 6. Logo, r=6.'),
      q('m6e12','media',40,'O diâmetro tem extremidades A(0,0) e B(8,0). A circunferência tem centro e raio:',['C=(4,0), r=4','C=(8,0), r=4','C=(4,0), r=8','C=(0,0), r=8'],0,'O centro é o ponto médio do diâmetro.','C=(4,0) e o raio é metade do diâmetro: r=4.')
    ]
  };
})();
