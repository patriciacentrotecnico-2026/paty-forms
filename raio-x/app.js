/* =========================================================
   Raio-X Detox Terapêutico 5D — app.js
   Vanilla JS. Sem framework. Sem build.
   ========================================================= */

// ========== CONFIG ==========

// Endpoint FormSubmit — patricia.centrotecnico já ativado no form de consultoria-coletiva (commit 7ff3ebd)
const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/patricia.centrotecnico@gmail.com';
const MENTORIA_URL = 'https://workshop.detoxterapeutico.com.br/?src=raio-x-5d';

const DIMENSOES = [
  { id: 'inflamacao', nome: 'Inflamação',  cor: '#8C3A4A' },
  { id: 'microbiota', nome: 'Microbiota', cor: '#C4A240' },
  { id: 'imunidade',  nome: 'Imunidade',  cor: '#4A8C6A' },
  { id: 'energia',    nome: 'Energia',    cor: '#B15868' },
  { id: 'emocional',  nome: 'Emocional',  cor: '#8B7320' }
];

// 25 perguntas — 5 por dimensão. Conteúdo aprovado.
const QUESTIONS = [
  // INFLAMAÇÃO
  { eixo: 'inflamacao', texto: 'Você sente cansaço constante, como se a disposição nunca voltasse por inteiro, mesmo depois de dormir?' },
  { eixo: 'inflamacao', texto: 'Você tem dores recorrentes (cabeça, musculares, articulações) sem uma causa clara?' },
  { eixo: 'inflamacao', texto: 'Você sente o corpo inchado, principalmente a barriga, o rosto ou as pernas ao fim do dia?' },
  { eixo: 'inflamacao', texto: 'Você convive com rinite, sinusite, alergias de pele ou outros "ites" que vão e voltam?' },
  { eixo: 'inflamacao', texto: 'Você percebe que depois das refeições seu corpo fica pesado, quente ou estufado?' },
  // MICROBIOTA
  { eixo: 'microbiota', texto: 'Seu intestino funciona fora do ritmo (vai ao banheiro demais, de menos, ou com desconforto)?' },
  { eixo: 'microbiota', texto: 'Você sente gases, arrotos frequentes ou aquela sensação de que a comida fica "conversando" com você por horas?' },
  { eixo: 'microbiota', texto: 'Você tem cólicas, ardência, azia ou queimação depois de comer?' },
  { eixo: 'microbiota', texto: 'Você tem vontade forte e frequente de açúcar, pão ou farinha branca — aquela fissura que parece que não passa?' },
  { eixo: 'microbiota', texto: 'Você percebe que sua pele, unha ou cabelo estão mais opacos, frágeis ou com manchas novas?' },
  // IMUNIDADE
  { eixo: 'imunidade', texto: 'Você pega resfriado, gripe ou infecção com facilidade, e demora mais do que o normal pra se recuperar?' },
  { eixo: 'imunidade', texto: 'Você sente que seu corpo está mais lento pra cicatrizar (feridas, cortes, machucados demoram a fechar)?' },
  { eixo: 'imunidade', texto: 'Você tem aftas, herpes, candidíase ou infecções urinárias recorrentes?' },
  { eixo: 'imunidade', texto: 'Você acorda sem aquela sensação de descanso, como se o sono não tivesse reparado o corpo?' },
  { eixo: 'imunidade', texto: 'Você percebe que pequenas indisposições (dor de garganta, mal-estar, febre baixa) aparecem com mais frequência do que antes?' },
  // ENERGIA
  { eixo: 'energia', texto: 'Você acorda com preguiça e dificuldade pra sair da cama, mesmo tendo dormido as horas necessárias?' },
  { eixo: 'energia', texto: 'Você sente aquele "baque" de sono e cansaço depois do almoço, que atrapalha o restante do dia?' },
  { eixo: 'energia', texto: 'Você tem dificuldade pra pegar no sono, acorda várias vezes durante a noite ou tem sono agitado?' },
  { eixo: 'energia', texto: 'Você sente que seu metabolismo está lento — retenção de líquido, ganho de peso sem mudança na rotina, sensação de corpo "parado"?' },
  { eixo: 'energia', texto: 'Você sente falta de vontade pra fazer as coisas simples da sua rotina, como se a energia não desse conta?' },
  // EMOCIONAL
  { eixo: 'emocional', texto: 'Você come por ansiedade, angústia ou vazio — mesmo sem fome de verdade?' },
  { eixo: 'emocional', texto: 'Você sente culpa, remorso ou arrependimento depois de algumas refeições?' },
  { eixo: 'emocional', texto: 'Você convive com estresse, preocupação ou pensamentos acelerados na maior parte dos dias?' },
  { eixo: 'emocional', texto: 'Você sente irritação, impaciência ou explosões de mau humor com mais frequência do que gostaria?' },
  { eixo: 'emocional', texto: 'Você tem dificuldade pra parar, respirar, estar presente — como se estivesse sempre correndo por dentro?' }
];

// Narrativas por dimensão × faixa — conteúdo aprovado. HTML inline: <strong>título</strong> + parágrafos + <em>frase mentoria</em>.
const NARRATIVAS = {
  inflamacao: {
    healthy: `<strong>Seu corpo está desinflamado.</strong><br><br>Parabéns. Os sinais que o seu corpo tem mandado indicam que a inflamação crônica está baixa — e isso é uma conquista. Corpo sem dor errante, sem peso constante, sem inchaço diário é corpo que consegue colocar energia no que importa: trabalhar, conviver, se recuperar, viver.<br><br>Isso não aconteceu à toa. Ou você vem cuidando da alimentação, do sono, do estresse — ou seu organismo ainda tem reservas boas. De qualquer forma, o cuidado precisa continuar. Inflamação é daquelas coisas que sobe devagar, sem avisar, por pequenas escolhas do dia a dia. A melhor hora pra manter um corpo desinflamado é agora.<br><br><em class="narr-mentoria">Na mentoria Detox Terapêutico a gente trabalha pra manter esse estado e blindar o corpo contra os gatilhos inflamatórios do dia a dia.</em>`,
    attention: `<strong>Seu corpo está pedindo pra desinflamar.</strong><br><br>Seu corpo está dando recados. Dor que vem e vai, cansaço que insiste, peso depois das refeições, aquele inchaço ao fim do dia — nada disso é "frescura" e nada disso é "da idade". É inflamação crônica instalada em silêncio, ainda num nível que dá pra reverter.<br><br>A boa notícia é que esse é exatamente o momento de agir. Inflamação responde rápido à mudança de alimentação, ao descanso, ao movimento. Em poucas semanas o corpo começa a dar sinais diferentes — mais leveza, menos dor, sono melhor. Mas o movimento precisa partir de você.<br><br><em class="narr-mentoria">Na mentoria Detox Terapêutico a gente começa exatamente aqui — desinflamar é a primeira engrenagem, e a partir dela todo o resto se reorganiza.</em>`,
    critical: `<strong>Seu corpo está inflamado e pedindo socorro.</strong><br><br>Os sinais são claros e somam. Cansaço que não passa, dores que se acumulam, inchaço constante, "ites" que voltam sempre — esse conjunto de sintomas indica que o seu corpo está num estado de inflamação crônica acentuada. E esse estado não é só desconforto. É o terreno biológico onde as doenças crônicas prosperam.<br><br>Respira. Isso não é sentença. É informação. Seu corpo está falando com você — e você está escutando, que é o primeiro passo. A partir daqui, o que conta é começar o processo de desinflamar de forma direcionada, com acompanhamento. Esse é o exato ponto de virada.<br><br><em class="narr-mentoria">Na mentoria Detox Terapêutico a gente trabalha esse ponto com protocolo estruturado, cardápio completo e acompanhamento próximo — porque ninguém desinflama sozinho no escuro.</em>`
  },
  microbiota: {
    healthy: `<strong>Sua microbiota está em equilíbrio.</strong><br><br>Intestino funcionando bem, digestão tranquila, sem fissuras incontroláveis por açúcar, pele e cabelo em ordem — esses são os sinais de uma microbiota equilibrada. E microbiota equilibrada significa 70% da sua imunidade trabalhando a seu favor, porque é no intestino que mora o grosso do exército do corpo.<br><br>Esse equilíbrio é delicado. Um ciclo de antibiótico, um período de estresse, uma temporada de comida industrializada — e o cenário muda. A missão agora é manter: fibras, fermentados, comida de verdade, água, movimento. O intestino agradece com disposição e clareza.<br><br><em class="narr-mentoria">Na mentoria Detox Terapêutico a gente ensina a alimentar essa microbiota boa que você já construiu, pra que ela se mantenha forte.</em>`,
    attention: `<strong>Sua microbiota está desregulada.</strong><br><br>Intestino fora do ritmo, gases, azia, fissura por doce, pele mais opaca — esses sinais juntos desenham um intestino que está pedindo ajuste. A microbiota está desequilibrada, as bactérias boas estão em menor número do que deveriam, e as respostas do corpo começam a sair do eixo.<br><br>A microbiota é muito responsiva à alimentação. Em poucos dias de comida de verdade, fibra boa, água morna pela manhã, o intestino já começa a mudar. Mas é preciso método — não é sobre "comer mais salada", é sobre entender o que alimenta as bactérias certas e o que alimenta as erradas.<br><br><em class="narr-mentoria">Na mentoria Detox Terapêutico a segunda engrenagem é exatamente essa — equilibrar a microbiota intestinal com protocolo específico pra remontar o terreno de dentro pra fora.</em>`,
    critical: `<strong>Seu intestino está em desequilíbrio acentuado.</strong><br><br>O quadro que as respostas desenham é de uma microbiota em desequilíbrio intenso. Disbiose, inflamação intestinal, perda de barreira, fissuras descontroladas — e isso repercute no corpo inteiro. Quando o intestino está assim, a imunidade vai junto, o humor vai junto, a pele vai junto, a energia vai junto.<br><br>O caminho de volta existe e é conhecido. Ele passa por retirar o que inflama (açúcar refinado, trigo, lácteos, ultraprocessados), repor o que nutre, e respeitar o ritmo do corpo. Não é do dia pra noite. Mas é consistente — e os primeiros sinais chegam na primeira semana de protocolo bem feito.<br><br><em class="narr-mentoria">Na mentoria Detox Terapêutico a gente estrutura esse caminho com você do começo ao fim, porque remontar microbiota é trabalho de fôlego e merece acompanhamento de perto.</em>`
  },
  imunidade: {
    healthy: `<strong>Sua imunidade está firme.</strong><br><br>Corpo que não pega tudo que aparece, que cicatriza bem, que se recupera rápido de uma noite ruim — esse é o sinal de uma imunidade em dia. Seu sistema imunológico é o exército silencioso que trabalha 24h por dia, e os sinais que você marcou indicam que esse exército está em posição.<br><br>Manter a imunidade forte não é sobre tomar vitamina. É sobre um conjunto: sono reparador, alimentação que nutre, microbiota equilibrada (lembra que 70% da imunidade mora lá?), estresse sob controle e movimento. É estilo de vida. E estilo de vida se constrói no dia a dia.<br><br><em class="narr-mentoria">Na mentoria Detox Terapêutico a gente fortalece esse estado com a alimentação anticâncer aplicada à sua rotina — pra que a imunidade se mantenha firme mesmo nas estações difíceis.</em>`,
    attention: `<strong>Sua imunidade está pedindo reforço.</strong><br><br>Resfriados que chegam com facilidade, cicatrização mais lenta, aftas e herpes que voltam — esse conjunto indica um sistema imunológico que está trabalhando no limite. Não está falido, mas está cansado, sem reserva. E imunidade cansada é imunidade que deixa passar.<br><br>A imunidade responde a estímulos certos com velocidade. Alimentos ricos em antioxidantes, sucos funcionais, chás terapêuticos, sono de qualidade, redução do inflamatório no prato — esses são os reforços reais. Não é suplemento-milagre, é base consistente aplicada com intenção.<br><br><em class="narr-mentoria">Na mentoria Detox Terapêutico a terceira engrenagem é fortalecer a imunidade — e fazemos isso com comida, com repouso e com acompanhamento, não com promessas.</em>`,
    critical: `<strong>Sua imunidade está fragilizada.</strong><br><br>Esse cenário pede atenção imediata. Corpo que não se defende bem, cicatrização lenta, infecções recorrentes, sono que não repara — são sinais de um sistema imunológico em déficit. Isso não é pra ignorar, nem pra "deixar passar com o tempo". É pra cuidar agora, com direcionamento.<br><br>A imunidade se reconstrói, mas precisa de estratégia. As três engrenagens — desinflamar, equilibrar microbiota, fortalecer imunidade — são inseparáveis, e nesse cenário elas precisam trabalhar juntas, em ordem, com um plano claro. Corpo fragilizado merece cuidado estruturado, não remendo.<br><br><em class="narr-mentoria">Na mentoria Detox Terapêutico a gente constrói esse plano com você — é onde os protocolos se encontram com a sua história e viram um caminho real de recuperação.</em>`
  },
  energia: {
    healthy: `<strong>Sua vitalidade está em dia.</strong><br><br>Acordar com disposição, atravessar o dia com energia, dormir bem à noite — esses são os marcadores de um corpo em equilíbrio energético. No Ayurveda, essa é a assinatura do agni ativo, do fogo digestivo aceso, do metabolismo que trabalha no seu potencial. Não é sorte — é sinal de rotina alinhada.<br><br>Vitalidade se preserva com ritmo. Comer nos mesmos horários, dormir antes das 22h sempre que possível, respeitar a pausa entre as refeições, permitir pausa no dia. Parece simples, e é — mas é também o que a correria tira primeiro. A disciplina do ritmo é o maior remédio invisível que existe.<br><br><em class="narr-mentoria">Na mentoria Detox Terapêutico a gente ancora essa rotina com ferramentas ayurvédicas simples que cabem na vida real.</em>`,
    attention: `<strong>Sua vitalidade está em queda.</strong><br><br>Preguiça pra levantar, queda depois do almoço, sono agitado, metabolismo lento — o padrão aponta pra uma energia que está escapando por fissuras da rotina. No Ayurveda, é o agni fraco: o fogo digestivo não está processando o que entra, e por isso o corpo acumula em vez de gerar vitalidade.<br><br>A boa notícia é que energia volta rápido quando o corpo é respeitado. Água morna no jejum, refeições nos horários, sono antes da meia-noite, reduzir o frio e o cru em excesso — em uma semana de rotina ayurvédica simples já se percebe diferença. É reorganização, não reforma total.<br><br><em class="narr-mentoria">Na mentoria Detox Terapêutico a gente trabalha energia com os princípios do Ayurveda aplicados ao prato brasileiro — e a diferença aparece antes do que você imagina.</em>`,
    critical: `<strong>Sua vitalidade está comprometida.</strong><br><br>Esse é o cenário da fadiga instalada. Corpo que acorda mais cansado do que deitou, dias arrastados, sono que não repara, metabolismo travado. No Ayurveda, é o quadro de ama acumulado — toxinas não processadas que atravancam o sistema e bloqueiam a circulação de energia. Não é preguiça. É o corpo avisando que precisa de uma reorganização profunda.<br><br>Sair desse lugar exige método. Não é motivação que resolve, é protocolo — um que desobstrua o sistema digestivo, dê descanso pros órgãos, e permita que o corpo volte a gerar energia em vez de só consumir. Esse é o propósito central do Detox Terapêutico: destravar o fluxo.<br><br><em class="narr-mentoria">Na mentoria Detox Terapêutico a gente conduz esse destravamento com cardápio, ritmo e acompanhamento — porque sair da fadiga crônica sozinha é quase impossível.</em>`
  },
  emocional: {
    healthy: `<strong>Sua relação com a comida e com você está tranquila.</strong><br><br>Comer por fome, não por vazio. Fechar a refeição sem culpa. Conviver com o estresse sem ser engolido por ele. Esses marcadores desenham uma relação emocional equilibrada com a comida e com a vida — e isso é uma conquista real, porque comida carrega afeto, memória, angústia e alegria, tudo junto.<br><br>Esse equilíbrio merece ser cuidado com leveza, sem rigidez. Momentos de pausa, respiração, presença, vínculo — são esses pequenos atos que sustentam a saúde emocional a longo prazo. Não é sobre ser zen o tempo todo. É sobre saber voltar pro centro quando a vida sai do eixo.<br><br><em class="narr-mentoria">Na mentoria Detox Terapêutico a gente preserva essa relação saudável com a comida e ensina a usá-la como aliada — nunca como algoz.</em>`,
    attention: `<strong>Sua relação emocional com a comida está desafiada.</strong><br><br>Comer por ansiedade, sentir culpa depois, carregar estresse, irritação, aquela sensação de estar sempre acelerada por dentro — esse padrão mostra que a comida virou também ferramenta de regulação emocional. E quando isso acontece, o corpo paga duas vezes: pelo que come e pelo como come.<br><br>Esse movimento é reversível, e começa pela consciência. Perceber o gatilho antes da colherada, respirar antes de abrir a geladeira, nomear o que está sentindo — são micro-hábitos que destravam a relação. Não é sobre proibir. É sobre escolher com presença.<br><br><em class="narr-mentoria">Na mentoria Detox Terapêutico a dimensão emocional entra lado a lado com a alimentação — porque prato bom sem cabeça alinhada não sustenta.</em>`,
    critical: `<strong>Sua relação emocional com a comida e com a vida pede cuidado urgente.</strong><br><br>O quadro que se desenha é de estresse crônico instalado, relação tensa com a comida, culpa recorrente, irritação frequente e pouca pausa pra respirar. Isso não é falta de disciplina — é um sistema nervoso em sobrecarga. E sistema nervoso sobrecarregado inflama o corpo, desequilibra a microbiota e derruba a imunidade. Os 5 eixos conversam, e esse é o eixo que muitas vezes comanda os outros.<br><br>Respira. Esse ponto de partida é mais comum do que parece — e é reversível. Mas exige mais do que força de vontade. Exige ambiente, acompanhamento, protocolo que entenda o corpo e a cabeça ao mesmo tempo. Não é pra se virar sozinha.<br><br><em class="narr-mentoria">Na mentoria Detox Terapêutico a gente trabalha emocional e alimentação juntos — com acolhimento de verdade, não com pressão. É esse o jeito que funciona.</em>`
  }
};

const LOADING_MESSAGES = [
  'Analisando seu corpo...',
  'Cruzando as 5 dimensões...',
  'Calculando seu Raio-X...',
  'Montando sua leitura personalizada...'
];

// ========== STATE ==========

const state = {
  name: '',
  email: '',
  currentQ: 0,
  answers: new Array(QUESTIONS.length).fill(null),
  scores: null,
  submitted: false
};

// ========== HELPERS ==========

function $(sel) { return document.querySelector(sel); }
function $$(sel) { return document.querySelectorAll(sel); }

function showScreen(id) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  $(`#${id}`).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function capitalize(s) {
  if (!s) return '';
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
}

function classify(scoreOn10) {
  // 0-3.3 saudável (poucas respostas "sim"), 3.3-6.6 atenção, 6.6-10 crítico
  if (scoreOn10 <= 3.3) return 'healthy';
  if (scoreOn10 <= 6.6) return 'attention';
  return 'critical';
}

function classLabel(c) {
  return c === 'healthy' ? 'Saudável' : (c === 'attention' ? 'Atenção' : 'Crítico');
}

// ========== SCORING ==========
// Score interno 0..2 por pergunta. Soma por dimensão 0..10.
// Quanto mais alto, pior (mais sintomas).
// Pra classificação "saudável = verde", invertemos visualmente (barra cheia = saudável).
// Decisão: o score exibido é o SINTOMA (0-10). Classificação baseada nesse valor.

function computeScores() {
  const dimAccum = {};
  DIMENSOES.forEach(d => dimAccum[d.id] = { sum: 0, count: 0 });
  QUESTIONS.forEach((q, i) => {
    const v = state.answers[i] ?? 0;
    dimAccum[q.eixo].sum += v;
    dimAccum[q.eixo].count += 1;
  });
  const out = {};
  DIMENSOES.forEach(d => {
    const { sum, count } = dimAccum[d.id];
    // max = count*2. Normalizar pra 0..10.
    const max = count * 2;
    const raw = (sum / max) * 10;
    out[d.id] = Math.round(raw * 10) / 10;
  });
  // Score geral 0..100 (quanto menor, mais saudável)
  const total = DIMENSOES.reduce((acc, d) => acc + out[d.id], 0);
  const overall = Math.round((total / (DIMENSOES.length * 10)) * 100);
  return { dims: out, overall };
}

// ========== RADAR SVG ==========

function renderRadar(scores) {
  const svg = $('#radar-svg');
  svg.innerHTML = '';
  const cx = 200, cy = 200;
  const R = 140;
  const levels = 5;
  const n = DIMENSOES.length;
  const angleFor = (i) => (-Math.PI / 2) + (i * (2 * Math.PI / n));

  // Grade concêntrica (5 níveis pentagonais)
  for (let lvl = 1; lvl <= levels; lvl++) {
    const r = (R / levels) * lvl;
    const pts = [];
    for (let i = 0; i < n; i++) {
      const a = angleFor(i);
      pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
    }
    const poly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    poly.setAttribute('points', pts.join(' '));
    poly.setAttribute('fill', lvl === levels ? 'rgba(253, 252, 248, 1)' : 'none');
    poly.setAttribute('stroke', '#d6d2c8');
    poly.setAttribute('stroke-width', '1');
    svg.appendChild(poly);
  }

  // Eixos
  for (let i = 0; i < n; i++) {
    const a = angleFor(i);
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', cx);
    line.setAttribute('y1', cy);
    line.setAttribute('x2', cx + R * Math.cos(a));
    line.setAttribute('y2', cy + R * Math.sin(a));
    line.setAttribute('stroke', '#d6d2c8');
    line.setAttribute('stroke-width', '1');
    svg.appendChild(line);
  }

  // Dados — polígono preenchido marsala
  const dataPts = [];
  for (let i = 0; i < n; i++) {
    const d = DIMENSOES[i];
    const val = scores[d.id]; // 0..10
    const r = (val / 10) * R;
    const a = angleFor(i);
    dataPts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  const dataPoly = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
  dataPoly.setAttribute('points', dataPts.join(' '));
  dataPoly.setAttribute('fill', 'rgba(140, 58, 74, 0.35)');
  dataPoly.setAttribute('stroke', '#8C3A4A');
  dataPoly.setAttribute('stroke-width', '2.5');
  dataPoly.setAttribute('stroke-linejoin', 'round');
  svg.appendChild(dataPoly);

  // Pontos nos vértices
  for (let i = 0; i < n; i++) {
    const d = DIMENSOES[i];
    const val = scores[d.id];
    const r = (val / 10) * R;
    const a = angleFor(i);
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', cx + r * Math.cos(a));
    circle.setAttribute('cy', cy + r * Math.sin(a));
    circle.setAttribute('r', 5);
    circle.setAttribute('fill', '#C4A240');
    circle.setAttribute('stroke', '#fff');
    circle.setAttribute('stroke-width', 2);
    svg.appendChild(circle);
  }

  // Labels dos eixos
  for (let i = 0; i < n; i++) {
    const d = DIMENSOES[i];
    const a = angleFor(i);
    const labelR = R + 28;
    const lx = cx + labelR * Math.cos(a);
    const ly = cy + labelR * Math.sin(a);
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    text.setAttribute('x', lx);
    text.setAttribute('y', ly);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('dominant-baseline', 'middle');
    text.setAttribute('font-family', "'Lato', sans-serif");
    text.setAttribute('font-weight', '700');
    text.setAttribute('font-size', '13');
    text.setAttribute('fill', '#2a2a2a');
    text.textContent = d.nome;
    svg.appendChild(text);

    // Score ao lado do label
    const scoreTxt = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    scoreTxt.setAttribute('x', lx);
    scoreTxt.setAttribute('y', ly + 14);
    scoreTxt.setAttribute('text-anchor', 'middle');
    scoreTxt.setAttribute('font-family', "'Playfair Display', serif");
    scoreTxt.setAttribute('font-weight', '700');
    scoreTxt.setAttribute('font-size', '14');
    scoreTxt.setAttribute('fill', '#8C3A4A');
    scoreTxt.textContent = `${scores[d.id].toFixed(1)}/10`;
    svg.appendChild(scoreTxt);
  }
}

// ========== RENDER BARS ==========

function renderBars(scores) {
  const wrap = $('#dim-bars');
  wrap.innerHTML = '';
  DIMENSOES.forEach(d => {
    const val = scores[d.id];
    const cls = classify(val);
    const pct = (val / 10) * 100;
    const row = document.createElement('div');
    row.className = `dim-bar-row ${cls}`;
    row.innerHTML = `
      <div class="dim-bar-top">
        <span class="dim-bar-name">${d.nome}</span>
        <span class="dim-bar-score">${val.toFixed(1)}<small style="font-size:13px;color:#6b6b6b;font-weight:700;">/10</small></span>
      </div>
      <div class="dim-bar-track"><div class="dim-bar-fill ${cls}" style="width:${pct}%"></div></div>
      <span class="dim-bar-label ${cls}">${classLabel(cls)}</span>
    `;
    wrap.appendChild(row);
  });
}

// ========== RENDER NARRATIVAS ==========

function renderNarratives(scores) {
  const wrap = $('#narratives');
  wrap.innerHTML = '';
  DIMENSOES.forEach(d => {
    const val = scores[d.id];
    const cls = classify(val);
    const text = (NARRATIVAS[d.id] && NARRATIVAS[d.id][cls]) || '';
    const block = document.createElement('div');
    block.className = `narrative-block ${cls}`;
    block.innerHTML = `
      <div class="narrative-head">
        <span class="narrative-title">${d.nome}</span>
        <span class="narrative-class ${cls}">${classLabel(cls)} · ${val.toFixed(1)}/10</span>
      </div>
      <p class="narrative-text">${text}</p>
    `;
    wrap.appendChild(block);
  });
}

// ========== QUIZ RENDER ==========

function renderQuestion() {
  const i = state.currentQ;
  const q = QUESTIONS[i];
  const dim = DIMENSOES.find(d => d.id === q.eixo);
  const dimIndex = DIMENSOES.findIndex(d => d.id === q.eixo);

  $('#question-text').textContent = q.texto;
  $('#dim-tag').textContent = `Dimensão ${dimIndex + 1} · ${dim.nome}`;
  $('#progress-count').textContent = i + 1;
  $('#progress-dim').textContent = dim.nome;
  $('#progress-fill').style.width = `${((i + 1) / QUESTIONS.length) * 100}%`;

  // Highlight answer previamente selecionado se houver
  $$('.answer').forEach(btn => {
    btn.classList.remove('selected');
    if (state.answers[i] !== null && parseInt(btn.dataset.value) === state.answers[i]) {
      btn.classList.add('selected');
    }
  });

  $('#btn-back').disabled = (i === 0);
}

function onAnswer(value) {
  state.answers[state.currentQ] = value;

  // Feedback visual
  $$('.answer').forEach(btn => btn.classList.remove('selected'));
  const chosen = document.querySelector(`.answer[data-value="${value}"]`);
  if (chosen) chosen.classList.add('selected');

  // Avança (com pequeno delay pra feedback)
  setTimeout(() => {
    if (state.currentQ < QUESTIONS.length - 1) {
      state.currentQ++;
      renderQuestion();
    } else {
      finishQuiz();
    }
  }, 220);
}

function goBack() {
  if (state.currentQ > 0) {
    state.currentQ--;
    renderQuestion();
  }
}

// ========== LOADING ==========

function runLoading(done) {
  showScreen('screen-loading');
  const titleEl = $('#loading-title');
  let i = 0;
  titleEl.textContent = LOADING_MESSAGES[0];
  const interval = setInterval(() => {
    i = (i + 1) % LOADING_MESSAGES.length;
    titleEl.textContent = LOADING_MESSAGES[i];
  }, 900);
  const duration = 3600;
  setTimeout(() => {
    clearInterval(interval);
    done();
  }, duration);
}

// ========== FINALIZAR QUIZ ==========

function finishQuiz() {
  state.scores = computeScores();
  runLoading(() => {
    renderResult();
    showScreen('screen-result');
    submitToFormSubmit();
  });
}

function renderResult() {
  $('#result-name').textContent = state.name || 'Paciente';
  const overall = state.scores.overall;
  $('#overall-score').textContent = overall;

  // Classificação geral: mesma lógica sobre 0..100 (converter pra 0..10 escala)
  const overallOn10 = overall / 10;
  const overallCls = classify(overallOn10);
  $('#overall-class').textContent = classLabel(overallCls);

  // Mentoria link (placeholder)
  $('#btn-mentoria').href = MENTORIA_URL;

  renderRadar(state.scores.dims);
  renderBars(state.scores.dims);
  renderNarratives(state.scores.dims);
}

// ========== FORMSUBMIT (envio de dados) ==========

function submitToFormSubmit() {
  if (state.submitted) return;
  const payload = {
    Nome: state.name,
    Email: state.email,
    Classificacao_Geral: classLabel(classify(state.scores.overall / 10)),
    Score_Geral: `${state.scores.overall}/100`,
    Score_Inflamacao: `${state.scores.dims.inflamacao.toFixed(1)}/10`,
    Score_Microbiota: `${state.scores.dims.microbiota.toFixed(1)}/10`,
    Score_Imunidade: `${state.scores.dims.imunidade.toFixed(1)}/10`,
    Score_Energia: `${state.scores.dims.energia.toFixed(1)}/10`,
    Score_Emocional: `${state.scores.dims.emocional.toFixed(1)}/10`,
    _subject: `Novo Raio-X 5D — ${state.name}`,
    _template: 'table',
    _captcha: 'false'
  };

  fetch(FORMSUBMIT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(payload)
  }).then(r => {
    if (r.ok) { state.submitted = true; console.log('[Raio-X] dados enviados'); }
    else { console.warn('[Raio-X] falha no envio', r.status); }
  }).catch(err => console.warn('[Raio-X] erro de rede', err));
}

// ========== PDF ==========

async function downloadPDF() {
  const btn = $('#btn-pdf');
  const originalText = btn.textContent;
  btn.textContent = 'Gerando PDF...';
  btn.disabled = true;

  try {
    document.body.classList.add('capturing');
    const node = $('#result-capture');

    const canvas = await html2canvas(node, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      windowWidth: node.scrollWidth
    });

    const imgData = canvas.toDataURL('image/png');
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });

    const pageW = pdf.internal.pageSize.getWidth();   // 210mm
    const pageH = pdf.internal.pageSize.getHeight();  // 297mm
    const margin = 8;
    const imgW = pageW - margin * 2;
    const imgH = (canvas.height * imgW) / canvas.width;

    // Se couber em 1 página:
    if (imgH <= pageH - margin * 2) {
      pdf.addImage(imgData, 'PNG', margin, margin, imgW, imgH);
    } else {
      // Multi-página: recorta a imagem em faixas do tamanho da página
      const pageHpx = Math.floor((canvas.width * (pageH - margin * 2)) / imgW);
      let y = 0;
      let first = true;
      while (y < canvas.height) {
        const sliceH = Math.min(pageHpx, canvas.height - y);
        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = sliceH;
        const ctx = sliceCanvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
        ctx.drawImage(canvas, 0, y, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
        const sliceData = sliceCanvas.toDataURL('image/png');
        const sliceImgH = (sliceH * imgW) / canvas.width;
        if (!first) pdf.addPage();
        pdf.addImage(sliceData, 'PNG', margin, margin, imgW, sliceImgH);
        first = false;
        y += sliceH;
      }
    }

    const safeName = (state.name || 'paciente').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    pdf.save(`raio-x-detox-5d-${safeName}.pdf`);
  } catch (err) {
    console.error(err);
    alert('Ops, não consegui gerar o PDF. Tira um print da tela e me chama no direct.');
  } finally {
    document.body.classList.remove('capturing');
    btn.textContent = originalText;
    btn.disabled = false;
  }
}

// ========== EVENTS ==========

document.addEventListener('DOMContentLoaded', () => {

  // INTRO
  $('#btn-start').addEventListener('click', () => showScreen('screen-capture'));

  // CAPTURA
  $('#form-capture').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    if (!name || !email) return;
    state.name = capitalize(name.split(' ')[0]);
    state.email = email.toLowerCase();
    state.currentQ = 0;
    state.answers = new Array(QUESTIONS.length).fill(null);
    showScreen('screen-quiz');
    renderQuestion();
  });

  // QUIZ — respostas
  $$('.answer').forEach(btn => {
    btn.addEventListener('click', () => {
      const v = parseInt(btn.dataset.value);
      onAnswer(v);
    });
  });

  // QUIZ — voltar
  $('#btn-back').addEventListener('click', goBack);

  // Teclado: 1/2/3 pra responder, ← pra voltar
  document.addEventListener('keydown', (e) => {
    if (!$('#screen-quiz').classList.contains('active')) return;
    if (e.key === '1') onAnswer(0);
    else if (e.key === '2') onAnswer(1);
    else if (e.key === '3') onAnswer(2);
    else if (e.key === 'ArrowLeft') goBack();
  });

  // RESULTADO
  $('#btn-pdf').addEventListener('click', downloadPDF);
  $('#btn-restart').addEventListener('click', () => {
    state.currentQ = 0;
    state.answers = new Array(QUESTIONS.length).fill(null);
    state.scores = null;
    state.submitted = false;
    showScreen('screen-intro');
  });

});
