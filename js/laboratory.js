(() => {
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const PRESETS = {
    distance:{tool:'distance',values:{labDistX1:-2,labDistY1:5,labDistX2:4,labDistY2:-3}},
    midpoint:{tool:'midpoint',values:{labMidX1:7,labMidY1:-1,labMidX2:-3,labMidY2:11}},
    line2pts:{tool:'line2pts',values:{labLine2X1:2,labLine2Y1:3,labLine2X2:6,labLine2Y2:11}},
    lineeq:{tool:'lineeq',values:{labEqM:2,labEqB:3}},
    intersection:{tool:'intersection',values:{labIntM1:1,labIntB1:1,labIntM2:-2,labIntB2:7}},
  };
  let currentTool = 'distance';
  let presetIndex = 0;

  const fmt = (n) => {
    if(!Number.isFinite(n)) return '—';
    const rounded = Math.round(n * 100) / 100;
    return Number.isInteger(rounded) ? String(rounded) : String(rounded).replace('.', ',');
  };
  const latexNum = (n) => Number.isInteger(n) ? String(n) : String(Math.round(n*100)/100);
  const read = (id) => Number(document.getElementById(id)?.value);
  const setValues = (obj={}) => Object.entries(obj).forEach(([id,val]) => { const el=document.getElementById(id); if(el) el.value=val; });
  const showOutput = (title, bodyText) => {
    const host = document.getElementById('labOutput');
    if(!host) return;
    host.innerHTML = `<div class="lab-output-title">${title}</div><div class="lab-output-body"></div>`;
    const body = host.querySelector('.lab-output-body');
    if(window.KantMath?.renderTextWithMath) window.KantMath.renderTextWithMath(body, bodyText);
    else body.textContent = bodyText;
  };
  const showError = (message) => showOutput('Confira os dados', message);
  const activateTool = (tool) => {
    currentTool = tool;
    $$('.lab-tool').forEach(btn => btn.classList.toggle('active', btn.dataset.tool === tool));
    $$('.lab-form').forEach(form => {
      const active = form.dataset.form === tool;
      form.hidden = !active;
      form.classList.toggle('active', active);
    });
  };
  const ensurePlane = () => document.getElementById('labPlane');

  function runDistance(){
    const x1=read('labDistX1'), y1=read('labDistY1'), x2=read('labDistX2'), y2=read('labDistY2');
    if([x1,y1,x2,y2].some(v => Number.isNaN(v))) return showError('Preencha as quatro coordenadas com números válidos.');
    const dx = x2 - x1, dy = y2 - y1, d = Math.sqrt(dx*dx + dy*dy);
    window.KantCartesian?.renderDistance(ensurePlane(), {A:{x:x1,y:y1,label:'A'}, B:{x:x2,y:y2,label:'B'}});
    showOutput('Distância entre dois pontos',
`Dados: A(${fmt(x1)}, ${fmt(y1)}) e B(${fmt(x2)}, ${fmt(y2)}).

$$\\Delta x = ${latexNum(x2)} - (${latexNum(x1)}) = ${latexNum(dx)}$$
$$\\Delta y = ${latexNum(y2)} - (${latexNum(y1)}) = ${latexNum(dy)}$$

Aplicando a fórmula:
$$d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$$
$$d = \\sqrt{(${latexNum(dx)})^2 + (${latexNum(dy)})^2} = ${latexNum(d)}$$

Interpretação: a distância entre A e B é ${fmt(d)} unidade(s).`);
  }

  function runMidpoint(){
    const x1=read('labMidX1'), y1=read('labMidY1'), x2=read('labMidX2'), y2=read('labMidY2');
    if([x1,y1,x2,y2].some(v => Number.isNaN(v))) return showError('Preencha as quatro coordenadas com números válidos.');
    const mx=(x1+x2)/2, my=(y1+y2)/2;
    window.KantCartesian?.renderMidpoint(ensurePlane(), {A:{x:x1,y:y1,label:'A'}, B:{x:x2,y:y2,label:'B'}});
    showOutput('Ponto médio',
`Dados: A(${fmt(x1)}, ${fmt(y1)}) e B(${fmt(x2)}, ${fmt(y2)}).

Usamos:
$$M = \\left(\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2}\\right)$$

Substituindo:
$$M = \\left(\\frac{${latexNum(x1)} + ${latexNum(x2)}}{2}, \\frac{${latexNum(y1)} + ${latexNum(y2)}}{2}\\right)$$
$$M = (${latexNum(mx)}, ${latexNum(my)})$$

Interpretação: o ponto médio divide o segmento AB em duas partes iguais.`);
  }

  function runLine2pts(){
    const x1=read('labLine2X1'), y1=read('labLine2Y1'), x2=read('labLine2X2'), y2=read('labLine2Y2');
    if([x1,y1,x2,y2].some(v => Number.isNaN(v))) return showError('Preencha as quatro coordenadas com números válidos.');
    const host=ensurePlane();
    if(x1===x2){
      window.KantCartesian?.renderLines(host,{points:[{x:x1,y:y1,label:'A'},{x:x2,y:y2,label:'B'}], lines:[{x:x1,label:`x = ${fmt(x1)}`}], xRange:[x1-5,x1+5], yRange:[Math.min(y1,y2)-4, Math.max(y1,y2)+4]});
      showOutput('Reta por dois pontos',
`Dados: A(${fmt(x1)}, ${fmt(y1)}) e B(${fmt(x2)}, ${fmt(y2)}).

Como os dois pontos têm a mesma abscissa, a reta é vertical.

$$x = ${latexNum(x1)}$$

Interpretação: toda a reta é formada pelos pontos cuja coordenada x vale ${fmt(x1)}.`);
      return;
    }
    const m=(y2-y1)/(x2-x1), b=y1-m*x1;
    window.KantCartesian?.renderLines(host,{points:[{x:x1,y:y1,label:'A'},{x:x2,y:y2,label:'B'}], lines:[{m,b,label:`y = ${fmt(m)}x ${b>=0?'+':'−'} ${fmt(Math.abs(b))}`}], xRange:[Math.min(x1,x2)-4,Math.max(x1,x2)+4], yRange:[Math.min(y1,y2)-4,Math.max(y1,y2)+4]});
    showOutput('Reta determinada por dois pontos',
`Dados: A(${fmt(x1)}, ${fmt(y1)}) e B(${fmt(x2)}, ${fmt(y2)}).

Primeiro calculamos o coeficiente angular:
$$m = \\frac{y_2-y_1}{x_2-x_1} = \\frac{${latexNum(y2)}-${latexNum(y1)}}{${latexNum(x2)}-${latexNum(x1)}} = ${latexNum(m)}$$

Agora usamos a forma reduzida $$y = mx + b$$ e substituímos um dos pontos para descobrir $$b$$:
$$${latexNum(y1)} = ${latexNum(m)}\\cdot(${latexNum(x1)}) + b$$
$$b = ${latexNum(b)}$$

Logo, a reta é:
$$y = ${latexNum(m)}x ${b>=0?'+':'-'} ${latexNum(Math.abs(b))}$$`);
  }

  function runLineEq(){
    const m=read('labEqM'), b=read('labEqB');
    if([m,b].some(v => Number.isNaN(v))) return showError('Informe valores válidos para m e b.');
    const host=ensurePlane();
    window.KantCartesian?.renderLines(host,{lines:[{m,b,label:`y = ${fmt(m)}x ${b>=0?'+':'−'} ${fmt(Math.abs(b))}`}], xRange:[-6,6], yRange:[Math.min(-6,m*(-6)+b,m*6+b)-2, Math.max(6,m*(-6)+b,m*6+b)+2]});
    showOutput('Reta por equação',
`Equação informada:
$$y = ${latexNum(m)}x ${b>=0?'+':'-'} ${latexNum(Math.abs(b))}$$

Leitura rápida:
- $$m = ${latexNum(m)}$$ é o coeficiente angular, que indica a inclinação da reta.
- $$b = ${latexNum(b)}$$ é o coeficiente linear, ou seja, o ponto em que a reta corta o eixo y.

Se $$m>0$$, a reta cresce da esquerda para a direita. Se $$m<0$$, ela decresce.`);
  }

  function runIntersection(){
    const m1=read('labIntM1'), b1=read('labIntB1'), m2=read('labIntM2'), b2=read('labIntB2');
    if([m1,b1,m2,b2].some(v => Number.isNaN(v))) return showError('Informe valores válidos para as duas retas.');
    const host=ensurePlane();
    if(m1===m2 && b1===b2){
      window.KantCartesian?.renderLines(host,{lines:[{m:m1,b:b1,label:'r = s'}], xRange:[-6,6], yRange:[-6,6]});
      return showOutput('Interseção de retas', `As duas equações representam a mesma reta.

$$y = ${latexNum(m1)}x ${b1>=0?'+':'-'} ${latexNum(Math.abs(b1))}$$

Interpretação: as retas são coincidentes, portanto possuem infinitos pontos em comum.`);
    }
    if(m1===m2){
      window.KantCartesian?.renderLines(host,{lines:[{m:m1,b:b1,label:'r'},{m:m2,b:b2,label:'s',className:'kant-math-line alt'}], xRange:[-6,6], yRange:[-6,6]});
      return showOutput('Interseção de retas', `As retas têm o mesmo coeficiente angular:
$$m_1 = m_2 = ${latexNum(m1)}$$

Como os coeficientes lineares são diferentes, elas são paralelas e não se cruzam.`);
    }
    const x=(b2-b1)/(m1-m2), y=m1*x+b1;
    window.KantCartesian?.renderLines(host,{points:[{x,y,label:'I'}], lines:[{m:m1,b:b1,label:'r'},{m:m2,b:b2,label:'s',className:'kant-math-line alt'}], xRange:[Math.min(-6,x)-2,Math.max(6,x)+2], yRange:[Math.min(-6,y)-2,Math.max(6,y)+2]});
    showOutput('Interseção de retas',
`Retas informadas:
$$r: y = ${latexNum(m1)}x ${b1>=0?'+':'-'} ${latexNum(Math.abs(b1))}$$
$$s: y = ${latexNum(m2)}x ${b2>=0?'+':'-'} ${latexNum(Math.abs(b2))}$$

No ponto de interseção, os dois valores de $$y$$ são iguais:
$$${latexNum(m1)}x ${b1>=0?'+':'-'} ${latexNum(Math.abs(b1))} = ${latexNum(m2)}x ${b2>=0?'+':'-'} ${latexNum(Math.abs(b2))}$$

Resolvendo, obtemos:
$$x = ${latexNum(x)}$$
$$y = ${latexNum(y)}$$

Logo, o ponto de interseção é $$I(${latexNum(x)}, ${latexNum(y)})$$.`);
  }

  function runCurrent(){
    ({distance:runDistance, midpoint:runMidpoint, line2pts:runLine2pts, lineeq:runLineEq, intersection:runIntersection}[currentTool]||runDistance)();
  }

  function resetForms(){
    setValues(PRESETS.distance.values); setValues(PRESETS.midpoint.values); setValues(PRESETS.line2pts.values); setValues(PRESETS.lineeq.values); setValues(PRESETS.intersection.values);
    activateTool('distance');
    runDistance();
  }

  function applyPreset(){
    const keys = Object.keys(PRESETS);
    const preset = PRESETS[keys[presetIndex % keys.length]];
    presetIndex += 1;
    activateTool(preset.tool);
    setValues(preset.values);
    runCurrent();
  }

  function bind(){
    $$('.lab-tool').forEach(btn => btn.addEventListener('click', () => { activateTool(btn.dataset.tool); runCurrent(); }));
    document.getElementById('labPresetBtn')?.addEventListener('click', applyPreset);
    document.getElementById('labResetBtn')?.addEventListener('click', resetForms);
    $$('[data-action]').forEach(btn => btn.addEventListener('click', (ev) => {
      ev.preventDefault();
      const action = btn.dataset.action;
      if(action==='run-distance') runDistance();
      if(action==='run-midpoint') runMidpoint();
      if(action==='run-line2pts') runLine2pts();
      if(action==='run-lineeq') runLineEq();
      if(action==='run-intersection') runIntersection();
    }));
  }

  function init(){
    if(!document.getElementById('laboratory')) return;
    bind();
    activateTool('distance');
    runDistance();
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.KantLab = { open(tool='distance'){ activateTool(tool); document.getElementById('navLaboratory')?.click(); runCurrent(); } };
})();
