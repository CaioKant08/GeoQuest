(() => {
  const NS="http://www.w3.org/2000/svg";
  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
  const norm=s=>String(s||"").normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();

  function el(tag,attrs={},text=""){
    const node=document.createElementNS(NS,tag);
    Object.entries(attrs).forEach(([k,v])=>node.setAttribute(k,String(v)));
    if(text!=="") node.textContent=text;
    return node;
  }
  function niceRange(values,pad=2){
    const min=Math.min(...values,0),max=Math.max(...values,0);
    return [Math.floor(min-pad),Math.ceil(max+pad)];
  }
  function makePlane(container,points=[],options={}){
    if(!container)return null;
    container.innerHTML="";
    const width=680,height=390,margin={l:48,r:30,t:28,b:42};
    let [xMin,xMax]=options.xRange||niceRange(points.map(p=>p.x),2);
    let [yMin,yMax]=options.yRange||niceRange(points.map(p=>p.y),2);
    if(xMax===xMin)xMax=xMin+1;if(yMax===yMin)yMax=yMin+1;
    const plotW=width-margin.l-margin.r,plotH=height-margin.t-margin.b;
    const unit=Math.min(plotW/(xMax-xMin),plotH/(yMax-yMin));
    const usedW=unit*(xMax-xMin),usedH=unit*(yMax-yMin);
    const ox=margin.l+(plotW-usedW)/2,oy=margin.t+(plotH-usedH)/2;
    const sx=x=>ox+(x-xMin)*unit;
    const sy=y=>oy+usedH-(y-yMin)*unit;
    const svg=el("svg",{viewBox:`0 0 ${width} ${height}`,role:"img","aria-label":options.ariaLabel||"Plano cartesiano"});
    svg.classList.add("kant-cartesian-svg");
    const defs=el("defs"),arrowId=`arrow-${Math.random().toString(36).slice(2)}`;
    const marker=el("marker",{id:arrowId,markerWidth:8,markerHeight:8,refX:6,refY:3,orient:"auto",markerUnits:"strokeWidth"});
    marker.appendChild(el("path",{d:"M0,0 L0,6 L7,3 z",class:"kant-axis-arrow"}));defs.appendChild(marker);svg.appendChild(defs);
    const xStep=(xMax-xMin)>16?2:1,yStep=(yMax-yMin)>14?2:1;
    for(let x=Math.ceil(xMin);x<=Math.floor(xMax);x++)svg.appendChild(el("line",{x1:sx(x),y1:oy,x2:sx(x),y2:oy+usedH,class:x===0?"kant-grid-zero":"kant-grid-line"}));
    for(let y=Math.ceil(yMin);y<=Math.floor(yMax);y++)svg.appendChild(el("line",{x1:ox,y1:sy(y),x2:ox+usedW,y2:sy(y),class:y===0?"kant-grid-zero":"kant-grid-line"}));
    const x0=clamp(sx(0),ox,ox+usedW),y0=clamp(sy(0),oy,oy+usedH);
    svg.appendChild(el("line",{x1:ox,y1:y0,x2:ox+usedW+2,y2:y0,class:"kant-axis",'marker-end':`url(#${arrowId})`}));
    svg.appendChild(el("line",{x1:x0,y1:oy+usedH,x2:x0,y2:oy-2,class:"kant-axis",'marker-end':`url(#${arrowId})`}));
    for(let x=Math.ceil(xMin);x<=Math.floor(xMax);x+=xStep){if(x===0)continue;svg.appendChild(el("text",{x:sx(x),y:Math.min(oy+usedH+19,y0+19),class:"kant-tick",'text-anchor':"middle"},String(x)));}
    for(let y=Math.ceil(yMin);y<=Math.floor(yMax);y+=yStep){if(y===0)continue;svg.appendChild(el("text",{x:Math.max(ox-9,x0-9),y:sy(y)+4,class:"kant-tick",'text-anchor':"end"},String(y)));}
    svg.appendChild(el("text",{x:ox+usedW-2,y:y0-10,class:"kant-axis-label",'text-anchor':"end"},"x"));
    svg.appendChild(el("text",{x:x0+11,y:oy+6,class:"kant-axis-label"},"y"));
    container.appendChild(svg);
    return {svg,sx,sy,width,height,margin,xMin,xMax,yMin,yMax,unit,ox,oy,usedW,usedH};
  }
  function pointLabel(svg,plane,p,opts={}){
    const x=plane.sx(p.x),y=plane.sy(p.y);
    svg.appendChild(el("circle",{cx:x,cy:y,r:opts.r||6.5,class:opts.special?"kant-point kant-midpoint":"kant-point"}));
    const dx=opts.dx??(p.x>=0?10:-10),dy=opts.dy??-12,label=opts.text||`${p.label||"P"}(${p.x}, ${p.y})`;
    svg.appendChild(el("text",{x:x+dx,y:y+dy,class:"kant-point-label",'text-anchor':dx<0?"end":"start"},label));
  }
  function lineEnds(plane,m,b){
    const {xMin,xMax,yMin,yMax}=plane,pts=[];
    const add=(x,y)=>{if(x>=xMin-1e-9&&x<=xMax+1e-9&&y>=yMin-1e-9&&y<=yMax+1e-9&&!pts.some(p=>Math.abs(p.x-x)<1e-6&&Math.abs(p.y-y)<1e-6))pts.push({x,y});};
    add(xMin,m*xMin+b);add(xMax,m*xMax+b);
    if(Math.abs(m)>1e-9){add((yMin-b)/m,yMin);add((yMax-b)/m,yMax);}
    return pts.slice(0,2);
  }
  function drawLine(plane,{m,b,x,className="kant-math-line",label,labelAt=.72}){
    let p1,p2;
    if(Number.isFinite(x)){p1={x,y:plane.yMin};p2={x,y:plane.yMax};}
    else {const ends=lineEnds(plane,m,b);if(ends.length<2)return;[p1,p2]=ends;}
    const x1=plane.sx(p1.x),y1=plane.sy(p1.y),x2=plane.sx(p2.x),y2=plane.sy(p2.y);
    plane.svg.appendChild(el("line",{x1,y1,x2,y2,class:className}));
    if(label){const t=labelAt;plane.svg.appendChild(el("text",{x:x1+(x2-x1)*t+8,y:y1+(y2-y1)*t-8,class:"kant-line-label"},label));}
  }
  function drawSegment(plane,A,B,className="kant-segment"){
    plane.svg.appendChild(el("line",{x1:plane.sx(A.x),y1:plane.sy(A.y),x2:plane.sx(B.x),y2:plane.sy(B.y),class:className}));
  }
  function renderPoints(container,opts={}){
    const points=opts.points||[];const p=makePlane(container,points,opts);if(!p)return;
    (opts.segments||[]).forEach(([a,b])=>drawSegment(p,points[a],points[b]));
    points.forEach((pt,i)=>pointLabel(p.svg,p,pt,opts.pointOptions?.[i]||{}));
  }
  function renderDistance(container,opts={}){
    const A=opts.A||{x:-2,y:5,label:"A"},B=opts.B||{x:4,y:-3,label:"B"};const p=makePlane(container,[A,B],opts);if(!p)return;
    drawSegment(p,A,B);p.svg.appendChild(el("line",{x1:p.sx(A.x),y1:p.sy(A.y),x2:p.sx(B.x),y2:p.sy(A.y),class:"kant-guide"}));p.svg.appendChild(el("line",{x1:p.sx(B.x),y1:p.sy(A.y),x2:p.sx(B.x),y2:p.sy(B.y),class:"kant-guide"}));
    const mx=(p.sx(A.x)+p.sx(B.x))/2,my=(p.sy(A.y)+p.sy(B.y))/2;const g=el("g",{class:"kant-segment-label"});g.appendChild(el("rect",{x:mx-21,y:my-17,width:42,height:26,rx:13,class:"kant-label-bg"}));g.appendChild(el("text",{x:mx,y:my+2,'text-anchor':"middle",class:"kant-distance-label"},opts.distanceLabel||"d?"));p.svg.appendChild(g);
    pointLabel(p.svg,p,A,{dx:-10,dy:-13});pointLabel(p.svg,p,B,{dx:10,dy:20});
    p.svg.appendChild(el("text",{x:(p.sx(A.x)+p.sx(B.x))/2,y:p.sy(A.y)-9,class:"kant-delta-label",'text-anchor':"middle"},`Δx = ${Math.abs(B.x-A.x)}`));
    p.svg.appendChild(el("text",{x:p.sx(B.x)+12,y:(p.sy(A.y)+p.sy(B.y))/2,class:"kant-delta-label"},`Δy = ${Math.abs(B.y-A.y)}`));
  }
  function renderMidpoint(container,opts={}){
    const A=opts.A||{x:7,y:-1,label:"A"},B=opts.B||{x:-3,y:11,label:"B"},M={x:(A.x+B.x)/2,y:(A.y+B.y)/2,label:"M"};const p=makePlane(container,[A,B,M],opts);if(!p)return;drawSegment(p,A,B);
    pointLabel(p.svg,p,A,{dx:10,dy:21});pointLabel(p.svg,p,B,{dx:-10,dy:-13});pointLabel(p.svg,p,M,{special:true,dx:12,dy:-13});
  }
  function renderLines(container,opts={}){
    const pts=opts.points||[];const p=makePlane(container,pts,opts);if(!p)return;(opts.lines||[]).forEach(draw=>drawLine(p,draw));(opts.segments||[]).forEach(([a,b])=>drawSegment(p,pts[a],pts[b],"kant-perpendicular"));pts.forEach((pt,i)=>pointLabel(p.svg,p,pt,opts.pointOptions?.[i]||{}));
  }
  function renderTriangle(container,opts={}){
    const pts=opts.points||[];const p=makePlane(container,pts,opts);if(!p)return;if(pts.length>=3){drawSegment(p,pts[0],pts[1]);drawSegment(p,pts[1],pts[2]);drawSegment(p,pts[2],pts[0]);}
    pts.forEach((pt,i)=>pointLabel(p.svg,p,pt,opts.pointOptions?.[i]||{}));
    if(opts.areaLabel){const cx=pts.reduce((s,a)=>s+a.x,0)/pts.length,cy=pts.reduce((s,a)=>s+a.y,0)/pts.length;p.svg.appendChild(el("text",{x:p.sx(cx),y:p.sy(cy),class:"kant-area-label",'text-anchor':"middle"},opts.areaLabel));}
  }
  function renderPointLineDistance(container,opts={}){
    const P=opts.P||{x:2,y:-1,label:"P"};const p=makePlane(container,[P,opts.H||{x:0,y:0}],opts);if(!p)return;drawLine(p,{m:opts.m??-.75,b:opts.b??2.5,label:opts.lineLabel||"r"});
    let H=opts.H;
    if(!H){const m=opts.m??-.75,b=opts.b??2.5;const hp=(P.x+m*(P.y-b))/(1+m*m);H={x:hp,y:m*hp+b,label:"H"};}
    drawSegment(p,P,H,"kant-perpendicular");pointLabel(p.svg,p,P,{dx:10,dy:-13});pointLabel(p.svg,p,H,{special:true,dx:10,dy:20});
    const mx=(p.sx(P.x)+p.sx(H.x))/2,my=(p.sy(P.y)+p.sy(H.y))/2;p.svg.appendChild(el("text",{x:mx+8,y:my-8,class:"kant-distance-label"},opts.distanceLabel||"d"));
  }
  function renderCircle(container,opts={}){
    const C=opts.C||{x:2,y:-3,label:"C"},r=opts.r||5,points=[C,...(opts.points||[])];const p=makePlane(container,points,{...opts,xRange:opts.xRange||[C.x-r-2,C.x+r+2],yRange:opts.yRange||[C.y-r-2,C.y+r+2]});if(!p)return;
    p.svg.appendChild(el("circle",{cx:p.sx(C.x),cy:p.sy(C.y),r:r*p.unit,class:"kant-circle"}));
    drawSegment(p,C,{x:C.x+r,y:C.y},"kant-radius");p.svg.appendChild(el("text",{x:p.sx(C.x+r/2),y:p.sy(C.y)-10,class:"kant-distance-label",'text-anchor':"middle"},`r = ${r}`));pointLabel(p.svg,p,C,{special:true,dx:10,dy:-13});
    (opts.points||[]).forEach((pt,i)=>pointLabel(p.svg,p,pt,opts.pointOptions?.[i]||{}));
    if(opts.tangent)drawLine(p,opts.tangent);
  }
  function renderApplicationHorizontal(container){renderDistance(container,{A:{x:-3,y:4,label:"A"},B:{x:5,y:4,label:"B"},xRange:[-5,7],yRange:[-2,7],distanceLabel:"8"});}

  function specFor(moduleNumber,title){
    const t=norm(title);
    if(moduleNumber===1){
      if(t.includes("coordenadas"))return ["points",{points:[{x:3,y:3,label:"A"},{x:-3,y:3,label:"B"},{x:-3,y:-3,label:"C"},{x:3,y:-3,label:"D"}],xRange:[-5,5],yRange:[-5,5]}];
      if(t.includes("distancia entre"))return ["distance",{A:{x:-2,y:5,label:"A"},B:{x:4,y:-3,label:"B"},xRange:[-5,7],yRange:[-5,7]}];
      if(t.includes("ponto medio"))return ["midpoint",{A:{x:7,y:-1,label:"A"},B:{x:-3,y:11,label:"B"},xRange:[-5,9],yRange:[-3,13]}];
      if(t.includes("aplicacoes"))return ["horizontal",{}];
    }
    if(moduleNumber===2){
      if(t.includes("coeficiente angular"))return ["lines",{points:[{x:2,y:3,label:"A"},{x:6,y:11,label:"B"}],lines:[{m:2,b:-1,label:"m = 2"}],xRange:[-1,8],yRange:[-3,13]}];
      if(t.includes("forma geral"))return ["lines",{lines:[{m:1.5,b:3,label:"y = 3/2x + 3"}],points:[{x:0,y:3,label:"B"},{x:-2,y:0,label:"A"}],xRange:[-5,5],yRange:[-3,9]}];
      if(t.includes("ponto")&&t.includes("inclinacao"))return ["lines",{lines:[{m:3,b:-7,label:"r"}],points:[{x:2,y:-1,label:"P"}],xRange:[-1,5],yRange:[-9,7]}];
      if(t.includes("interceptos"))return ["lines",{lines:[{m:2,b:-6,label:"y = 2x - 6"}],points:[{x:3,y:0,label:"A"},{x:0,y:-6,label:"B"}],xRange:[-2,6],yRange:[-8,6]}];
    }
    if(moduleNumber===3){
      if(t.includes("intersecao"))return ["lines",{lines:[{m:1,b:1,label:"r"},{m:-2,b:7,label:"s",className:"kant-math-line alt"}],points:[{x:2,y:3,label:"I"}],xRange:[-2,6],yRange:[-3,9]}];
      if(t.includes("paralelas"))return ["lines",{lines:[{m:3,b:2,label:"r"},{m:3,b:-4,label:"s",className:"kant-math-line alt"}],xRange:[-2,3],yRange:[-8,10]}];
      if(t.includes("perpendicular"))return ["lines",{lines:[{m:.5,b:1,label:"r"},{m:-2,b:1,label:"s",className:"kant-math-line alt"}],points:[{x:0,y:1,label:"I"}],xRange:[-5,5],yRange:[-6,8]}];
      if(t.includes("quadro"))return ["lines",{lines:[{m:2,b:3,label:"r = s"}],xRange:[-4,4],yRange:[-6,10]}];
    }
    if(moduleNumber===4){
      if(t.includes("colineares"))return ["points",{points:[{x:1,y:2,label:"A"},{x:3,y:6,label:"B"},{x:5,y:10,label:"C"}],segments:[[0,2]],xRange:[-1,7],yRange:[-1,12]}];
      if(t.includes("determinante"))return ["points",{points:[{x:-2,y:-1,label:"A"},{x:1,y:3,label:"B"},{x:4,y:7,label:"C"}],segments:[[0,2]],xRange:[-4,6],yRange:[-3,9]}];
      if(t.includes("area de triangulo"))return ["triangle",{points:[{x:1,y:1,label:"A"},{x:5,y:1,label:"B"},{x:3,y:4,label:"C"}],areaLabel:"A = 6",xRange:[-1,7],yRange:[-1,6]}];
      if(t.includes("ligacao"))return ["points",{points:[{x:-3,y:-2,label:"A"},{x:0,y:1,label:"B"},{x:3,y:4,label:"C"}],segments:[[0,2]],xRange:[-5,5],yRange:[-4,6]}];
    }
    if(moduleNumber===5){
      if(t.includes("ideia geometrica"))return ["pointline",{P:{x:3,y:5,label:"P"},m:-.5,b:1,H:{x:.8,y:.6,label:"H"},xRange:[-4,7],yRange:[-3,8],lineLabel:"r"}];
      if(t.includes("ponto")&&t.includes("reta"))return ["pointline",{P:{x:2,y:-1,label:"P"},m:-.75,b:2.5,H:{x:2.96,y:.28,label:"H"},xRange:[-3,7],yRange:[-4,7],lineLabel:"3x+4y-10=0",distanceLabel:"8/5"}];
      if(t.includes("casos simples"))return ["lines",{lines:[{x:2,label:"x = 2"}],points:[{x:7,y:-4,label:"P"},{x:2,y:-4,label:"H"}],segments:[[0,1]],xRange:[-1,9],yRange:[-7,4]}];
      if(t.includes("retas paralelas"))return ["lines",{lines:[{m:-.75,b:.5,label:"r"},{m:-.75,b:-4.5,label:"s",className:"kant-math-line alt"}],xRange:[-6,6],yRange:[-8,6]}];
    }
    if(moduleNumber===6){
      if(t.includes("definicao"))return ["circle",{C:{x:2,y:-3,label:"C"},r:5,xRange:[-5,9],yRange:[-10,4]}];
      if(t.includes("forma geral"))return ["circle",{C:{x:3,y:-2,label:"C"},r:5,xRange:[-4,10],yRange:[-9,5]}];
      if(t.includes("posicao de um ponto"))return ["circle",{C:{x:1,y:2,label:"C"},r:4,points:[{x:4,y:2,label:"P"}],xRange:[-5,7],yRange:[-4,8]}];
      if(t.includes("tangencia"))return ["circle",{C:{x:2,y:3,label:"C"},r:3,tangent:{m:-4/3,b:2/3,label:"r",className:"kant-math-line alt"},xRange:[-3,7],yRange:[-2,8]}];
    }
    return null;
  }
  function renderForTheoryCard(card,moduleOrKind,theory){
    if(!card)return;
    // Compatibilidade com a versão anterior.
    if(typeof moduleOrKind==="string"&&!theory){
      let host=card.querySelector(".kant-theory-viz");if(!host){host=document.createElement("div");host.className="kant-theory-viz";card.querySelector(".theory-formula")?.insertAdjacentElement("beforebegin",host);}
      if(moduleOrKind==="distance")renderDistance(host);if(moduleOrKind==="midpoint")renderMidpoint(host);return;
    }
    const module=moduleOrKind||{},spec=specFor(Number(module.numero),theory?.titulo||"");if(!spec)return;
    let host=card.querySelector(".kant-theory-viz");if(!host){host=document.createElement("div");host.className="kant-theory-viz";const formula=card.querySelector(".theory-formula");if(formula)formula.insertAdjacentElement("beforebegin",host);else card.appendChild(host);}
    const [kind,opts]=spec;
    if(kind==="points")renderPoints(host,opts);else if(kind==="distance")renderDistance(host,opts);else if(kind==="midpoint")renderMidpoint(host,opts);else if(kind==="horizontal")renderApplicationHorizontal(host);else if(kind==="lines")renderLines(host,opts);else if(kind==="triangle")renderTriangle(host,opts);else if(kind==="pointline")renderPointLineDistance(host,opts);else if(kind==="circle")renderCircle(host,opts);
  }
  window.KantCartesian={renderDistance,renderMidpoint,renderPoints,renderLines,renderTriangle,renderPointLineDistance,renderCircle,renderForTheoryCard};
})();
