(() => {
  const NS = "http://www.w3.org/2000/svg";
  const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));

  function el(tag, attrs={}, text=""){
    const node=document.createElementNS(NS,tag);
    Object.entries(attrs).forEach(([k,v])=>node.setAttribute(k,String(v)));
    if(text!=="") node.textContent=text;
    return node;
  }

  function niceRange(values, pad=2){
    const min=Math.min(...values,0), max=Math.max(...values,0);
    return [Math.floor(min-pad),Math.ceil(max+pad)];
  }

  function makePlane(container, points, options={}){
    if(!container) return null;
    container.innerHTML="";
    const width=640, height=370, margin={l:48,r:28,t:28,b:42};
    const [xMin,xMax]=options.xRange||niceRange(points.map(p=>p.x),2);
    const [yMin,yMax]=options.yRange||niceRange(points.map(p=>p.y),2);
    const sx=x=>margin.l+((x-xMin)/(xMax-xMin))*(width-margin.l-margin.r);
    const sy=y=>height-margin.b-((y-yMin)/(yMax-yMin))*(height-margin.t-margin.b);
    const svg=el("svg",{viewBox:`0 0 ${width} ${height}`,role:"img","aria-label":options.ariaLabel||"Plano cartesiano"});
    svg.classList.add("kant-cartesian-svg");

    const defs=el("defs");
    const marker=el("marker",{id:`arrow-${Math.random().toString(36).slice(2)}`,markerWidth:8,markerHeight:8,refX:6,refY:3,orient:"auto",markerUnits:"strokeWidth"});
    marker.appendChild(el("path",{d:"M0,0 L0,6 L7,3 z",class:"kant-axis-arrow"}));
    defs.appendChild(marker); svg.appendChild(defs);
    const arrowId=marker.id;

    // grid
    for(let x=Math.ceil(xMin);x<=Math.floor(xMax);x++){
      svg.appendChild(el("line",{x1:sx(x),y1:margin.t,x2:sx(x),y2:height-margin.b,class:x===0?"kant-grid-zero":"kant-grid-line"}));
    }
    for(let y=Math.ceil(yMin);y<=Math.floor(yMax);y++){
      svg.appendChild(el("line",{x1:margin.l,y1:sy(y),x2:width-margin.r,y2:sy(y),class:y===0?"kant-grid-zero":"kant-grid-line"}));
    }

    const x0=clamp(sx(0),margin.l,width-margin.r), y0=clamp(sy(0),margin.t,height-margin.b);
    svg.appendChild(el("line",{x1:margin.l,y1:y0,x2:width-margin.r+2,y2:y0,class:"kant-axis",'marker-end':`url(#${arrowId})`}));
    svg.appendChild(el("line",{x1:x0,y1:height-margin.b,x2:x0,y2:margin.t-2,class:"kant-axis",'marker-end':`url(#${arrowId})`}));

    const xStep=(xMax-xMin)>14?2:1, yStep=(yMax-yMin)>12?2:1;
    for(let x=Math.ceil(xMin);x<=Math.floor(xMax);x+=xStep){
      if(x===0) continue;
      const tx=el("text",{x:sx(x),y:Math.min(height-margin.b+19,y0+19),class:"kant-tick",'text-anchor':"middle"},String(x));
      svg.appendChild(tx);
    }
    for(let y=Math.ceil(yMin);y<=Math.floor(yMax);y+=yStep){
      if(y===0) continue;
      svg.appendChild(el("text",{x:Math.max(margin.l-9,x0-9),y:sy(y)+4,class:"kant-tick",'text-anchor':"end"},String(y)));
    }
    svg.appendChild(el("text",{x:width-margin.r-2,y:y0-10,class:"kant-axis-label",'text-anchor':"end"},"x"));
    svg.appendChild(el("text",{x:x0+11,y:margin.t+5,class:"kant-axis-label"},"y"));

    container.appendChild(svg);
    return {svg,sx,sy,width,height,margin,xMin,xMax,yMin,yMax};
  }

  function pointLabel(svg, plane, p, opts={}){
    const x=plane.sx(p.x), y=plane.sy(p.y);
    svg.appendChild(el("circle",{cx:x,cy:y,r:6.5,class:opts.midpoint?"kant-point kant-midpoint":"kant-point"}));
    const dx=opts.dx ?? (p.x>=0?10:-10), dy=opts.dy ?? -12;
    svg.appendChild(el("text",{x:x+dx,y:y+dy,class:"kant-point-label",'text-anchor':dx<0?"end":"start"},`${p.label}(${p.x}, ${p.y})`));
  }

  function renderDistance(container, options={}){
    const A=options.A||{x:-2,y:5,label:"A"}, B=options.B||{x:4,y:-3,label:"B"};
    const plane=makePlane(container,[A,B],{ariaLabel:`Distância entre ${A.label} e ${B.label}`,...options}); if(!plane)return;
    const {svg,sx,sy}=plane, ax=sx(A.x),ay=sy(A.y),bx=sx(B.x),by=sy(B.y);
    svg.appendChild(el("line",{x1:ax,y1:ay,x2:bx,y2:by,class:"kant-segment"}));
    svg.appendChild(el("line",{x1:ax,y1:ay,x2:bx,y2:ay,class:"kant-guide"}));
    svg.appendChild(el("line",{x1:bx,y1:ay,x2:bx,y2:by,class:"kant-guide"}));
    const mx=(ax+bx)/2,my=(ay+by)/2;
    const label=el("g",{class:"kant-segment-label"});
    label.appendChild(el("rect",{x:mx-21,y:my-17,width:42,height:26,rx:13,class:"kant-label-bg"}));
    label.appendChild(el("text",{x:mx,y:my+2,'text-anchor':"middle",class:"kant-distance-label"},"d?"));
    svg.appendChild(label);
    pointLabel(svg,plane,A,{dx:A.x<0?-10:10,dy:-13}); pointLabel(svg,plane,B,{dx:B.x>0?10:-10,dy:20});
    const dx=Math.abs(B.x-A.x),dy=Math.abs(B.y-A.y);
    const hx=(ax+bx)/2, hy=ay-9, vx=bx+12, vy=(ay+by)/2;
    svg.appendChild(el("text",{x:hx,y:hy,class:"kant-delta-label",'text-anchor':"middle"},`Δx = ${dx}`));
    svg.appendChild(el("text",{x:vx,y:vy,class:"kant-delta-label"},`Δy = ${dy}`));
  }

  function renderMidpoint(container, options={}){
    const A=options.A||{x:7,y:-1,label:"A"}, B=options.B||{x:-3,y:11,label:"B"};
    const M={x:(A.x+B.x)/2,y:(A.y+B.y)/2,label:"M"};
    const plane=makePlane(container,[A,B,M],{ariaLabel:`Ponto médio do segmento ${A.label}${B.label}`,...options}); if(!plane)return;
    const {svg,sx,sy}=plane, ax=sx(A.x),ay=sy(A.y),bx=sx(B.x),by=sy(B.y),mx=sx(M.x),my=sy(M.y);
    svg.appendChild(el("line",{x1:ax,y1:ay,x2:bx,y2:by,class:"kant-segment"}));
    // equal half markers
    const q1x=(ax+mx)/2,q1y=(ay+my)/2,q2x=(mx+bx)/2,q2y=(my+by)/2;
    [ [q1x,q1y], [q2x,q2y] ].forEach(([x,y])=>svg.appendChild(el("circle",{cx:x,cy:y,r:3.2,class:"kant-half-marker"})));
    pointLabel(svg,plane,A,{dx:10,dy:21}); pointLabel(svg,plane,B,{dx:-10,dy:-13}); pointLabel(svg,plane,M,{midpoint:true,dx:12,dy:-13});
  }

  function renderForTheoryCard(card, kind){
    if(!card) return;
    let host=card.querySelector(".kant-theory-viz");
    if(!host){
      host=document.createElement("div"); host.className="kant-theory-viz";
      const formula=card.querySelector(".theory-formula");
      if(formula) formula.insertAdjacentElement("beforebegin",host); else card.appendChild(host);
    }
    if(kind==="distance") renderDistance(host,{A:{x:-2,y:5,label:"A"},B:{x:4,y:-3,label:"B"},xRange:[-5,7],yRange:[-5,7]});
    if(kind==="midpoint") renderMidpoint(host,{A:{x:7,y:-1,label:"A"},B:{x:-3,y:11,label:"B"},xRange:[-5,9],yRange:[-3,13]});
  }

  window.KantCartesian={renderDistance,renderMidpoint,renderForTheoryCard};
})();
