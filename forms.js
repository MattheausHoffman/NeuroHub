(function () {
  const questions = [
    // DISLEXIA
    {
      nd: "Dislexia",
      text: "Você sente dificuldade em pensar o que escrever?",
      scores: ["N", "S", "S", "S", "S", "S"],
    },
    {
      nd: "Dislexia",
      text: "Você sente dificuldade em cálculo mental e na gestão de tempo?",
      scores: ["N", "N", "S", "S", "S", "S"],
    },
    {
      nd: "Dislexia",
      text: "Você sente dificuldade na escrita, com erros e trocas de letras?",
      scores: ["N", "N", "N", "S", "S", "S"],
    },
    {
      nd: "Dislexia",
      text: "Você confunde instruções ou números de telefone?",
      scores: ["N", "N", "N", "N", "S", "S"],
    },
    {
      nd: "Dislexia",
      text: "Você precisa reler várias vezes o mesmo texto para entender?",
      scores: ["N", "N", "N", "N", "N", "S"],
    },

    // TDAH
    {
      nd: "TDAH",
      text: "Você costuma interromper pessoas sem querer ou ser muito sincero?",
      scores: ["N", "N", "N", "N", "N", "S"],
    },
    {
      nd: "TDAH",
      text: "Você troca constantemente de hobbies ou projetos sem finalizar?",
      scores: ["N", "N", "N", "N", "S", "S"],
    },
    {
      nd: "TDAH",
      text: "Você tem dificuldade em se organizar e procrastina com frequência?",
      scores: ["N", "N", "S", "S", "S", "S"],
    },
    {
      nd: "TDAH",
      text: "Você tem excesso de energia ou inquietação constante?",
      scores: ["N", "N", "N", "S", "S", "S"],
    },
    {
      nd: "TDAH",
      text: "Você tem dificuldade de concentração regularmente?",
      scores: ["N", "S", "S", "S", "S", "S"],
    },

    // TEA
    {
      nd: "TEA",
      text: "Você tem dificuldade em manter contato visual?",
      scores: ["N", "N", "S", "S", "S", "S"],
    },
    {
      nd: "TEA",
      text: "Você tem sensibilidade a sons, luzes, cheiros ou texturas?",
      scores: ["N", "N", "N", "S", "S", "S"],
    },
    {
      nd: "TEA",
      text: "Você sente dificuldade em iniciar ou participar de conversas?",
      scores: ["N", "S", "S", "S", "S", "S"],
    },
    {
      nd: "TEA",
      text: "Você se sente exausto socialmente com frequência?",
      scores: ["N", "N", "N", "N", "N", "S"],
    },
    {
      nd: "TEA",
      text: "Você tem um assunto ou tópico que gosta excessivamente?",
      scores: ["N", "N", "N", "N", "S", "S"],
    },

    // TOC
    {
      nd: "TOC",
      text: "Você evita locais ou objetos com medo de algo ruim acontecer?",
      scores: ["N", "N", "N", "S", "S", "S"],
    },
    {
      nd: "TOC",
      text: "Você tem pensamentos súbitos e difíceis de controlar com desastres?",
      scores: ["N", "N", "N", "N", "N", "S"],
    },
    {
      nd: "TOC",
      text: "Quando ansioso, precisa repetir um gesto ou checar algo para aliviar?",
      scores: ["N", "S", "S", "S", "S", "S"],
    },
    {
      nd: "TOC",
      text: "Você lava uma parte do corpo várias vezes por sentir que está sujo?",
      scores: ["N", "N", "N", "N", "S", "S"],
    },
    {
      nd: "TOC",
      text: "Você sente que precisa realizar certos comportamentos para aliviar ansiedade?",
      scores: ["N", "N", "S", "S", "S", "S"],
    },
  ];

  const shuffled = questions.slice().sort(() => Math.random() - 0.5);

  const root = document.getElementById("form-root");
  if (!root) {
    console.error(
      "forms.js: elemento #form-root não encontrado. Verifique forms.html"
    );
    return;
  }

  let idx = -1;
  const answers = new Array(shuffled.length).fill(null);

  function renderStart() {
    root.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow border">
        <h2 class="text-2xl font-semibold mb-2">Questionário Neurodivergente</h2>
        <p class="text-sm text-gray-600 mb-4">Este questionário não substitui avaliação profissional. As respostas servem apenas como indicativo.</p>
        <div class="flex gap-3">
          <button id="start-btn" class="px-4 py-2 bg-blue-600 text-white rounded-md">Iniciar Questionário</button>
          <button id="example-btn" class="px-4 py-2 border rounded-md">Exemplo de Pergunta</button>
        </div>
      </div>
    `;

    document.getElementById("start-btn").addEventListener("click", () => {
      idx = 0;
      renderQuestion();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.getElementById("example-btn").addEventListener("click", () => {
      alert(
        "Cada pergunta tem opções 0 a 5. 0 = N (não pontua). 1..5 podem pontuar conforme a tabela interna."
      );
    });
  }

  function renderQuestion() {
    const q = shuffled[idx];

    let optionsHtml = '<div class="flex gap-3">';
    for (let g = 0; g <= 5; g++) {
      const active =
        answers[idx] === g
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-800";
      optionsHtml += `
        <button type="button"
                class="option-btn px-3 py-2 rounded-md border flex items-center justify-center ${active} focus:outline-none"
                data-grade="${g}">
          <svg class="w-4 h-4 mr-2 ${
            answers[idx] === g ? "text-white" : "text-gray-400"
          }" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
          <span class="font-medium">${g}</span>
        </button>
      `;
    }
    optionsHtml += "</div>";

    const progressPercent = Math.round((idx / shuffled.length) * 100);

    root.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow border">
        <div class="text-sm text-gray-500 mb-2">Pergunta ${idx + 1} de ${
      shuffled.length
    }</div>
        <div class="mb-4">
          <div class="h-2 bg-gray-200 rounded overflow-hidden">
            <div style="width:${progressPercent}%" class="h-full bg-blue-600 transition-all"></div>
          </div>
        </div>

        <h3 class="text-lg font-medium mb-4">${q.text}</h3>

        <div id="options-container">
          ${optionsHtml}
        </div>

        <div class="flex justify-between mt-6">
          <button id="prev-btn" class="px-4 py-2 border rounded-md">Voltar</button>
          <button id="next-btn" class="px-4 py-2 bg-blue-600 text-white rounded-md">${
            idx === shuffled.length - 1 ? "Finalizar" : "Próxima"
          }</button>
        </div>
      </div>
    `;

    document
      .querySelectorAll("#options-container .option-btn")
      .forEach((btn, i) => {
        btn.addEventListener("click", () => {
          const grade = Number(btn.getAttribute("data-grade"));
          answers[idx] = grade;
          document
            .querySelectorAll("#options-container .option-btn")
            .forEach((b) => {
              b.classList.remove("bg-blue-600", "text-white");
              b.classList.add("bg-white", "text-gray-800");
              const svg = b.querySelector("svg");
              if (svg) svg.classList.remove("text-white");
            });
          btn.classList.add("bg-blue-600", "text-white");
          const svg = btn.querySelector("svg");
          if (svg) svg.classList.add("text-white");
        });
      });

    document.getElementById("prev-btn").addEventListener("click", () => {
      if (idx > 0) {
        idx--;
        renderQuestion();
      } else {
        renderStart();
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.getElementById("next-btn").addEventListener("click", () => {
      const selected = answers[idx];
      if (selected === null || selected === undefined) {
        alert("Por favor, selecione um valor (0 a 5) antes de continuar.");
        return;
      }
      if (idx < shuffled.length - 1) {
        idx++;
        renderQuestion();
      } else {
        finish();
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function finish() {
    const counts = { Dislexia: 0, TDAH: 0, TEA: 0, TOC: 0 };

    shuffled.forEach((q, i) => {
      const grade = answers[i] ?? 0;
      const flag = q.scores[grade];
      if (flag === "S") counts[q.nd]++;
    });

    const possible = Object.keys(counts).filter((k) => counts[k] >= 3);

    const tableHtml = `
      <div class="bg-white p-4 rounded-md border">
        <h3 class="text-xl font-semibold mb-3">Pontuação por neurodivergência</h3>
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-2 border text-left">Neurodivergência</th>
              <th class="p-2 border text-center">Pontuação</th>
            </tr>
          </thead>
          <tbody>
            <tr><td class="p-2 border">Dislexia</td><td class="p-2 border text-center">${counts.Dislexia}</td></tr>
            <tr><td class="p-2 border">TDAH</td><td class="p-2 border text-center">${counts.TDAH}</td></tr>
            <tr><td class="p-2 border">TEA</td><td class="p-2 border text-center">${counts.TEA}</td></tr>
            <tr><td class="p-2 border">TOC</td><td class="p-2 border text-center">${counts.TOC}</td></tr>
          </tbody>
        </table>
      </div>
    `;

    let detectedHtml = "";
    if (possible.length === 0) {
      detectedHtml = `<p class="text-green-700">Nenhuma neurodivergência atingiu 3 pontos ou mais.</p>`;
    } else {
      detectedHtml =
        `<div class="space-y-2">` +
        possible
          .map(
            (p) =>
              `<p class="text-blue-700 font-semibold">Possível traço de ${p}</p>`
          )
          .join("") +
        `</div>`;
    }

    root.innerHTML = `
      <div class="space-y-4">
        <div class="bg-white p-6 rounded-lg shadow border">
          <h2 class="text-2xl font-bold mb-3">Resultado</h2>
          ${tableHtml}
          <div class="mt-4">
            <h3 class="text-lg font-semibold mb-2">Interpretação</h3>
            ${detectedHtml}
            <p class="text-sm text-gray-600 mt-3">Observação: este é um indicador preliminar, não substitui avaliação profissional.</p>
          </div>
          <div class="mt-6 flex gap-3">
            <button id="retry-btn" class="px-4 py-2 bg-gray-200 rounded">Refazer</button>
            <button id="download-btn" class="px-4 py-2 bg-blue-600 text-white rounded">Baixar resumo</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById("retry-btn").addEventListener("click", () => {
      idx = -1;
      answers.fill(null);
      renderStart();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.getElementById("download-btn").addEventListener("click", () => {
      const content =
        `Resumo - Questionário NI\n\n` +
        `Dislexia: ${counts.Dislexia}\nTDAH: ${counts.TDAH}\nTEA: ${counts.TEA}\nTOC: ${counts.TOC}\n\n` +
        `Possíveis: ${possible.length ? possible.join(", ") : "Nenhuma"}`;
      const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "resumo_questionario_ni.txt";
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  renderStart();
})();
