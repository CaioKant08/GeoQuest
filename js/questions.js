(() => {
  const modules = window.KANT_MODULES || [];
  window.KANT_QUESTIONS = modules.flatMap((module, moduleIndex) =>
    module.questoes.map((q, questionIndex) => ({
      id: q.id,
      level: Math.min(4, Math.floor((moduleIndex * 8 + questionIndex) / 10)),
      topic: module.titulo,
      visual: `Módulo ${module.numero} • ${module.subtitulo}`,
      q: q.enunciado,
      opts: [...q.alternativas],
      a: q.correta,
      exp: q.explicacao,
      hint: q.dica || "",
      difficulty: q.dificuldade,
      sourceModuleId: module.id
    }))
  );
})();
