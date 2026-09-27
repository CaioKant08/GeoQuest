(() => {
  const LEGACY_FORMULAS = new Map([
    ["1º: (+,+) • 2º: (−,+) • 3º: (−,−) • 4º: (+,−)", String.raw`\text{1º: }(+,+)\quad\bullet\quad\text{2º: }(-,+)\quad\bullet\quad\text{3º: }(-,-)\quad\bullet\quad\text{4º: }(+,-)`],
    ["d = √[(x₂ − x₁)² + (y₂ − y₁)²]", String.raw`d=\sqrt{(x_2-x_1)^2+(y_2-y_1)^2}`],
    ["M = ((x₁+x₂)/2, (y₁+y₂)/2)", String.raw`M=\left(\frac{x_1+x_2}{2},\frac{y_1+y_2}{2}\right)`],
    ["mesma ordenada → d = |x₂−x₁| • mesma abscissa → d = |y₂−y₁|", String.raw`\text{mesma ordenada}\;\to\;d=|x_2-x_1|\quad\bullet\quad\text{mesma abscissa}\;\to\;d=|y_2-y_1|`],
    ["m = (y₂−y₁)/(x₂−x₁) = Δy/Δx", String.raw`m=\frac{y_2-y_1}{x_2-x_1}=\frac{\Delta y}{\Delta x}`],
    ["Ax + By + C = 0   ⇄   y = mx + b", String.raw`Ax+By+C=0\quad\Longleftrightarrow\quad y=mx+b`],
    ["y − y₀ = m(x − x₀)", String.raw`y-y_0=m(x-x_0)`],
    ["reta vertical: x=k • reta horizontal: y=k", String.raw`\text{reta vertical: }x=k\quad\bullet\quad\text{reta horizontal: }y=k`],
    ["r ∩ s = solução do sistema", String.raw`r\cap s=\text{ solução do sistema}`],
    ["paralelas: m₁=m₂", String.raw`\text{paralelas: }m_1=m_2`],
    ["m₁·m₂ = −1", String.raw`m_1\cdot m_2=-1`],
    ["mesmo m ≠ mesma reta", String.raw`\text{mesmo }m\neq\text{ mesma reta}`],
    ["det |x y 1| = 0", String.raw`\det\!\begin{pmatrix}x&y&1\end{pmatrix}=0`],
    ["D = x₁(y₂−y₃)+x₂(y₃−y₁)+x₃(y₁−y₂)", String.raw`D=x_1(y_2-y_3)+x_2(y_3-y_1)+x_3(y_1-y_2)`],
    ["A = |D|/2", String.raw`A=\frac{|D|}{2}`],
    ["área zero ⇔ colinearidade", String.raw`\text{área zero}\quad\Longleftrightarrow\quad\text{colinearidade}`],
    ["distância = segmento perpendicular mínimo", String.raw`\text{distância}=\text{segmento perpendicular mínimo}`],
    ["d = |Ax₀+By₀+C| / √(A²+B²)", String.raw`d=\frac{|Ax_0+By_0+C|}{\sqrt{A^2+B^2}}`],
    ["x=k → |x₀−k| • y=k → |y₀−k|", String.raw`x=k\;\to\;|x_0-k|\quad\bullet\quad y=k\;\to\;|y_0-k|`],
    ["d = |C₁−C₂| / √(A²+B²)", String.raw`d=\frac{|C_1-C_2|}{\sqrt{A^2+B^2}}`],
    ["(x−a)² + (y−b)² = r²", String.raw`(x-a)^2+(y-b)^2=r^2`],
    ["x²+y²+Dx+Ey+F=0", String.raw`x^2+y^2+Dx+Ey+F=0`],
    ["d<r: interior • d=r: pertencente • d>r: exterior", String.raw`d<r:\ \text{interior}\quad\bullet\quad d=r:\ \text{pertencente}\quad\bullet\quad d>r:\ \text{exterior}`],
    ["reta tangente ⇔ d(C,r)=raio", String.raw`\text{reta tangente}\quad\Longleftrightarrow\quad d(C,r)=\text{raio}`]
  ]);

  function formulaToLatex(value){
    const source=String(value ?? "").trim();
    if(!source) return "";
    if(source.toLowerCase().startsWith("latex:")) return source.slice(6).trim();
    if(LEGACY_FORMULAS.has(source)) return LEGACY_FORMULAS.get(source);
    // Se o conteúdo já usa comandos LaTeX, não altera.
    if(/\\[a-zA-Z]+|[_^]\{/.test(source)) return source;
    // Conversão simples para fórmulas novas digitadas no padrão antigo.
    return source
      .replaceAll("−","-")
      .replaceAll("×",String.raw`\times `)
      .replaceAll("·",String.raw`\cdot `)
      .replaceAll("Δ",String.raw`\Delta `)
      .replaceAll("→",String.raw`\to `)
      .replaceAll("⇔",String.raw`\Longleftrightarrow `)
      .replaceAll("⇄",String.raw`\Longleftrightarrow `)
      .replaceAll("≠",String.raw`\neq `)
      .replaceAll("∩",String.raw`\cap `)
      .replaceAll("₀","_0").replaceAll("₁","_1").replaceAll("₂","_2").replaceAll("₃","_3")
      .replaceAll("²","^2").replaceAll("³","^3");
  }

  function renderFormula(el,value){
    if(!el) return;
    const source=String(value ?? "").trim();
    if(!source){ el.textContent=""; return; }
    const latex=formulaToLatex(source);
    if(window.katex?.render){
      try{
        window.katex.render(latex,el,{displayMode:true,throwOnError:false,strict:"ignore",trust:false,output:"htmlAndMathml"});
        el.dataset.mathRendered="true";
        return;
      }catch(err){ console.warn("KANT Math: falha ao renderizar fórmula",err); }
    }
    el.textContent=source;
  }

  function renderInline(el){
    if(!el || !window.renderMathInElement) return;
    try{
      window.renderMathInElement(el,{
        delimiters:[
          {left:"$$",right:"$$",display:true},
          {left:"\\[",right:"\\]",display:true},
          {left:"$",right:"$",display:false},
          {left:"\\(",right:"\\)",display:false}
        ],
        throwOnError:false,
        strict:"ignore",
        trust:false
      });
    }catch(err){ console.warn("KANT Math: falha ao renderizar matemática inline",err); }
  }

  window.KantMath={formulaToLatex,renderFormula,renderInline};
})();
