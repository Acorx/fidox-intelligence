// Fidox Intelligence - Main Data & Logic

// ===== THEME HELPERS =====
function getChartColors() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  return {
    textPrimary: isDark ? '#f8fafc' : '#0f172a',
    textSecondary: isDark ? '#cbd5e1' : '#475569',
    textMuted: isDark ? '#64748b' : '#94a3b8',
    border: isDark ? '#1e293b' : '#e2e8f0',
    grid: isDark ? 'rgba(148,163,184,0.15)' : 'rgba(15,23,42,0.08)',
    tooltipBg: isDark ? '#1e293b' : '#ffffff',
    tooltipText: isDark ? '#f8fafc' : '#0f172a',
    tooltipBorder: isDark ? '#334155' : '#e2e8f0'
  };
}

// ===== MODEL DATA =====
const MODELS = [
  { id: "claude-fable-5", slug: "claude-fable-5", name: "Claude Fable 5", developer: "Anthropic", params: "2T", contextWindow: "1M", releaseYear: 2026, globalScore: 95, mmlu: 93, gpqa: 91, humaneval: 92, lmsysElo: 1506, description: "Le modèle le plus performant du classement LMSYS Arena (1506 Elo). Version sécurisée de Mythos 5, conçue pour le coding autonome longue durée et les tâches agents complexes.", capabilities: ["Coding autonome", "Agents multi-étapes", "Vision", "Mémoire longue"], strengths: ["N°1 LMSYS Arena", "Sessions autonomes 24h+", "Qualité code production"], bestFor: ["Projets coding complexes", "Migrations autonomes", "Recherche agentique"], price: "Inclus Pro/Max", apiAvailable: true, openSource: false, category: "Frontier" },
  { id: "claude-opus-5-high", slug: "claude-opus-5-high", name: "Claude Opus 5 (High)", developer: "Anthropic", params: "2T", contextWindow: "1M", releaseYear: 2026, globalScore: 94, mmlu: 92, gpqa: 90, humaneval: 93, lmsysElo: 1493, description: "Modèle de référence Anthropic pour le raisonnement complexe et le coding agentic.", capabilities: ["Raisonnement avancé", "Coding expert", "Agents", "Analyse documentaire"], strengths: ["Performances frontier", "Rapport qualité/prix", "Fiabilité élevée"], bestFor: ["Coding complexe", "Recherche", "Analyse technique"], price: "$5/$25 per 1M", apiAvailable: true, openSource: false, category: "Frontier" },
  { id: "claude-opus-5-max", slug: "claude-opus-5-max", name: "Claude Opus 5 (Max)", developer: "Anthropic", params: "2T", contextWindow: "1M", releaseYear: 2026, globalScore: 93, mmlu: 91, gpqa: 89, humaneval: 91, lmsysElo: 1489, description: "Version max de Opus 5, optimisée pour les tâches les plus exigeantes.", capabilities: ["Raisonnement extrême", "Coding deep", "Security research"], strengths: ["Top performance", "Code quality", "Raisonnement scientifique"], bestFor: ["Recherche sécurité", "Problèmes mathématiques"], price: "$12.50/$62.50 per 1M", apiAvailable: true, openSource: false, category: "Frontier" },
  { id: "kimi-k3", slug: "kimi-k3", name: "Kimi K3", developer: "Moonshot AI", params: "2.8T", contextWindow: "1M", releaseYear: 2026, globalScore: 92, mmlu: 90, gpqa: 93.5, humaneval: 89, lmsysElo: 1475, description: "Le plus grand modèle open-weights jamais publié (2.8T). Record GPQA Diamond 93.5%.", capabilities: ["Science", "Raisonnement long", "Coding", "Open weights"], strengths: ["Record GPQA", "Open weights 2.8T", "1M tokens"], bestFor: ["Recherche scientifique", "Auto-hébergement"], price: "$2.90/$14 per 1M", apiAvailable: true, openSource: true, category: "Frontier" },
  { id: "gpt-5-6-sol", slug: "gpt-5-6-sol", name: "GPT-5.6 Sol", developer: "OpenAI", params: "~1.8T", contextWindow: "1.05M", releaseYear: 2026, globalScore: 91, mmlu: 89, gpqa: 87, humaneval: 91, lmsysElo: 1468, description: "Leader Terminal-Bench 2.1 (91.9%), excellence en coding terminal.", capabilities: ["Coding terminal", "Agents web", "Computer use"], strengths: ["N°1 Terminal-Bench", "Efficacité tokens"], bestFor: ["Coding production", "Workflows agents"], price: "$3/$15 per 1M", apiAvailable: true, openSource: false, category: "Frontier" },
  { id: "glm-5-2", slug: "glm-5-2", name: "GLM-5.2", developer: "Zhipu AI", params: "753B", contextWindow: "1M", releaseYear: 2026, globalScore: 90, mmlu: 88, gpqa: 86, humaneval: 92, lmsysElo: 1460, description: "Premier open-weight à battre GPT-5 sur SWE-bench Pro (62.1%).", capabilities: ["Coding expert", "Agents SWE", "Open weights"], strengths: ["SWE-bench Pro 62.1%", "MIT license"], bestFor: ["Développement logiciel", "Self-hosting"], price: "Gratuit", apiAvailable: true, openSource: true, category: "Frontier" },
  { id: "grok-4-6", slug: "grok-4-6", name: "Grok 4.6", developer: "xAI", params: "N/A", contextWindow: "500K", releaseYear: 2026, globalScore: 89, mmlu: 87, gpqa: 85, humaneval: 88, lmsysElo: 1445, description: "Dernier modèle xAI, performances frontier comparables à Claude et GPT.", capabilities: ["Raisonnement multi-étapes", "Coding", "Agents"], strengths: ["Performance frontier", "Intégration X"], bestFor: ["Applications X/Twitter", "Coding agentic"], price: "$2.50/$12.50 per 1M", apiAvailable: true, openSource: false, category: "Frontier" },
  { id: "qwen3-8-max", slug: "qwen3-8-max", name: "Qwen3.8 Max", developer: "Alibaba", params: "2.4T", contextWindow: "1M", releaseYear: 2026, globalScore: 88, mmlu: 86, gpqa: 84, humaneval: 87, lmsysElo: 1440, description: "Modèle phare Alibaba, 2.4T paramètres. Leader Vision Arena.", capabilities: ["Multimodal", "Vision", "Coding", "Long contexte"], strengths: ["Open weights", "Vision leader", "Bon prix"], bestFor: ["Applications Chine", "Vision"], price: "$2/$6 per 1M", apiAvailable: true, openSource: true, category: "High-End" },
  { id: "muse-spark-1-2", slug: "muse-spark-1-2", name: "Muse Spark 1.2", developer: "Muse AI", params: "720B", contextWindow: "200K", releaseYear: 2026, globalScore: 86, mmlu: 84, gpqa: 82, humaneval: 85, lmsysElo: 1425, description: "Modèle équilibré Meta, bon rapport performance/coût.", capabilities: ["Coding", "Raisonnement", "Vision"], strengths: ["Bon rapport qualité/prix", "Vitesse"], bestFor: ["Applications web", "Services"], price: "$1.25/$4.25 per 1M", apiAvailable: true, openSource: false, category: "High-End" },
  { id: "gpt-5-6-terra", slug: "gpt-5-6-terra", name: "GPT-5.6 Terra", developer: "OpenAI", params: "~900B", contextWindow: "1M", releaseYear: 2026, globalScore: 85, mmlu: 84, gpqa: 82, humaneval: 83, lmsysElo: 1410, description: "Version équilibrée GPT-5.6, optimale pour usage général.", capabilities: ["Langage", "Coding", "Vision", "Agents"], strengths: ["Équilibre perf/coût", "Écosystème OpenAI"], bestFor: ["Usage général", "Productivité"], price: "$1.50/$7.50 per 1M", apiAvailable: true, openSource: false, category: "High-End" },
  { id: "gemini-3-6-flash", slug: "gemini-3-6-flash", name: "Gemini 3.6 Flash", developer: "Google", params: "N/A", contextWindow: "1M", releaseYear: 2026, globalScore: 84, mmlu: 83, gpqa: 81, humaneval: 82, lmsysElo: 1395, description: "Optimisé pour agents multi-étapes et coding full-stack.", capabilities: ["Orchestration", "Refactoring", "Raisonnement"], strengths: ["Rapide", "Intégration Google"], bestFor: ["Agents Google", "Refactoring"], price: "$1.50/$7.50 per 1M", apiAvailable: true, openSource: false, category: "High-End" },
  { id: "nemotron-3-ultra", slug: "nemotron-3-ultra", name: "Nemotron 3 Ultra", developer: "NVIDIA", params: "55B/550B", contextWindow: "128K", releaseYear: 2026, globalScore: 83, mmlu: 82, gpqa: 80, humaneval: 81, lmsysElo: 1380, description: "Modèle open frontier NVIDIA, optimisé pour GPU NVIDIA.", capabilities: ["Raisonnement", "Coding", "Open weights"], strengths: ["Open weights", "Gratuit", "Optimisé NVIDIA"], bestFor: ["Self-hosting", "GPU NVIDIA"], price: "Gratuit", apiAvailable: true, openSource: true, category: "Open" },
  { id: "command-a-plus", slug: "command-a-plus", name: "Command A+", developer: "Conjecture AI", params: "N/A", contextWindow: "128K", releaseYear: 2026, globalScore: 82, mmlu: 81, gpqa: 79, humaneval: 80, lmsysElo: 1365, description: "Spécialisé agents autonomes avec excellent reasoning.", capabilities: ["Agent workflows", "Planning", "Execution"], strengths: ["Spécialisé agents", "Open weights"], bestFor: ["Agents autonomes", "Workflows complexes"], price: "$2 per 1M", apiAvailable: true, openSource: true, category: "High-End" },
  { id: "mistral-medium-3-5", slug: "mistral-medium-3-5", name: "Mistral Medium 3.5", developer: "Mistral AI", params: "N/A", contextWindow: "128K", releaseYear: 2026, globalScore: 81, mmlu: 80, gpqa: 78, humaneval: 79, lmsysElo: 1350, description: "Modèle européen performant, excellent multilingue.", capabilities: ["Multilingue EU", "Coding", "Raisonnement"], strengths: ["Multilingue", "Open weights option"], bestFor: ["Europe", "Multilingue"], price: "$1.50/$7.50 per 1M", apiAvailable: true, openSource: true, category: "High-End" },
  { id: "minimax-m3", slug: "minimax-m3", name: "MiniMax-M3", developer: "MiniMax", params: "N/A", contextWindow: "1M", releaseYear: 2026, globalScore: 80, mmlu: 79, gpqa: 77, humaneval: 78, lmsysElo: 1335, description: "Modèle chinois avec large contexte 1M.", capabilities: ["Langage", "Vision", "Long contexte"], strengths: ["1M tokens", "Bon prix"], bestFor: ["Applications Asie", "Long documents"], price: "$0.80/$4 per 1M", apiAvailable: true, openSource: false, category: "High-End" },
  { id: "gemini-3-5-flash-lite", slug: "gemini-3-5-flash-lite", name: "Gemini 3.5 Flash-Lite", developer: "Google", params: "N/A", contextWindow: "1M", releaseYear: 2026, globalScore: 79, mmlu: 78, gpqa: 76, humaneval: 77, lmsysElo: 1320, description: "Version allégée ultra-rapide pour high volume.", capabilities: ["Rapidité", "Coding basique"], strengths: ["Très rapide", "1M tokens"], bestFor: ["High volume", "Latence faible"], price: "$0.75/$3.75 per 1M", apiAvailable: true, openSource: false, category: "Efficiency" },
  { id: "nemotron-3-super", slug: "nemotron-3-super", name: "Nemotron 3 Super", developer: "NVIDIA", params: "N/A", contextWindow: "128K", releaseYear: 2026, globalScore: 78, mmlu: 77, gpqa: 75, humaneval: 76, lmsysElo: 1305, description: "Version intermédiaire NVIDIA.", capabilities: ["Raisonnement", "Coding"], strengths: ["Open weights", "Bon prix"], bestFor: ["Self-hosting milieu"], price: "Gratuit", apiAvailable: true, openSource: true, category: "Open" },
  { id: "deepseek-v4-pro", slug: "deepseek-v4-pro", name: "DeepSeek V4 Pro", developer: "DeepSeek", params: "1.6T", contextWindow: "1M", releaseYear: 2026, globalScore: 76, mmlu: 74, gpqa: 72, humaneval: 75, lmsysElo: 1280, description: "Modèle MoE à prix très bas. Meilleur rapport qualité/prix.", capabilities: ["Coding", "Knowledge"], strengths: ["Prix ultra-bas", "1M tokens"], bestFor: ["Applications volume", "Budget limité"], price: "$0.435/$0.87 per 1M", apiAvailable: true, openSource: true, category: "Value" },
  { id: "solar-open2-250b", slug: "solar-open2-250b", name: "Solar Open2 250B", developer: "Upstage", params: "250B", contextWindow: "32K", releaseYear: 2026, globalScore: 75, mmlu: 74, gpqa: 72, humaneval: 73, lmsysElo: 1265, description: "Modèle coréen open source avec bonne vision.", capabilities: ["Langage", "Vision", "Coding"], strengths: ["Open source", "Bon vision"], bestFor: ["Usage général", "Vision"], price: "$1 per 1M", apiAvailable: true, openSource: true, category: "Value" },
  { id: "muse-glimmer", slug: "muse-glimmer", name: "Muse Glimmer", developer: "Muse AI", params: "360B", contextWindow: "200K", releaseYear: 2026, globalScore: 74, mmlu: 73, gpqa: 71, humaneval: 72, lmsysElo: 1250, description: "Version high-performance pour coding rapide.", capabilities: ["Coding rapide", "Raisonnement"], strengths: ["Vitesse", "Bon coding"], bestFor: ["Prototypage rapide"], price: "$2 per 1M", apiAvailable: true, openSource: false, category: "High-End" },
  { id: "claude-4-5-haiku", slug: "claude-4-5-haiku", name: "Claude 4.5 Haiku", developer: "Anthropic", params: "N/A", contextWindow: "200K", releaseYear: 2026, globalScore: 72, mmlu: 71, gpqa: 69, humaneval: 70, lmsysElo: 1220, description: "Version rapide et économique Claude.", capabilities: ["Langage rapide", "Coding basique"], strengths: ["Rapide", "Bon marché"], bestFor: ["Usage quotidien", "Chat"], price: "$0.25/$1.25 per 1M", apiAvailable: true, openSource: false, category: "Efficiency" },
  { id: "gpt-oss-120b", slug: "gpt-oss-120b", name: "gpt-oss-120b", developer: "Community", params: "120B", contextWindow: "32K", releaseYear: 2026, globalScore: 70, mmlu: 68, gpqa: 67, humaneval: 69, lmsysElo: 1190, description: "Modèle communautaire open-source.", capabilities: ["Langage", "Coding"], strengths: ["Open weights", "Community"], bestFor: ["Self-hosting", "Éducation"], price: "Gratuit", apiAvailable: false, openSource: true, category: "Open" },
  { id: "nemotron-3-5-lightning", slug: "nemotron-3-5-lightning", name: "Nemotron 3.5 Lightning", developer: "NVIDIA", params: "N/A", contextWindow: "64K", releaseYear: 2026, globalScore: 69, mmlu: 68, gpqa: 66, humaneval: 67, lmsysElo: 1175, description: "Version ultra-rapide pour latency critique.", capabilities: ["Rapidité extrême"], strengths: ["Très rapide", "Faible latence"], bestFor: ["Temps réel", "Chatbots"], price: "Gratuit", apiAvailable: true, openSource: true, category: "Efficiency" },
  { id: "motif-3", slug: "motif-3", name: "Motif 3", developer: "Motif AI", params: "N/A", contextWindow: "200K", releaseYear: 2026, globalScore: 68, mmlu: 67, gpqa: 65, humaneval: 66, lmsysElo: 1160, description: "Nouveau venu prometteur.", capabilities: ["Langage", "Coding"], strengths: ["Prix compétitif"], bestFor: ["Startups", "PMV rapide"], price: "$1 per 1M", apiAvailable: true, openSource: false, category: "Value" },
  { id: "inkling", slug: "inkling", name: "Inkling", developer: "Inkling AI", params: "N/A", contextWindow: "128K", releaseYear: 2026, globalScore: 66, mmlu: 65, gpqa: 63, humaneval: 64, lmsysElo: 1130, description: "Modèle émergent axé créativité.", capabilities: ["Création contenu"], strengths: ["Créativité", "Prix bas"], bestFor: ["Création", "Brainstorming"], price: "$0.50/$2.50 per 1M", apiAvailable: true, openSource: false, category: "Emerging" },
  { id: "ax-k2", slug: "ax-k2", name: "A.X-K2", developer: "A.X Labs", params: "N/A", contextWindow: "128K", releaseYear: 2026, globalScore: 65, mmlu: 64, gpqa: 62, humaneval: 63, lmsysElo: 1115, description: "Nouveau modèle avec approche innovante.", capabilities: ["Raisonnement", "Analyse"], strengths: ["Approche unique"], bestFor: ["Expérimentation"], price: "$0.75/$3.75 per 1M", apiAvailable: true, openSource: false, category: "Emerging" },
  { id: "k-exaone-2-0", slug: "k-exaone-2-0", name: "K-EXAONE 2.0", developer: "LG AI", params: "N/A", contextWindow: "32K", releaseYear: 2026, globalScore: 64, mmlu: 63, gpqa: 61, humaneval: 62, lmsysElo: 1100, description: "Modèle coréen LG AI.", capabilities: ["Coréen", "Multilingue"], strengths: ["Coréen excellent"], bestFor: ["Applications Corée"], price: "$0.50/$2.50 per 1M", apiAvailable: true, openSource: true, category: "Regional" }
];

// ===== ARTICLES DATA =====
const ARTICLES = [
  { id: "1", slug: "claude-fable-5-review", title: "Claude Fable 5 : Le nouveau roi du coding autonome", excerpt: "Analyse approfondie du modèle le plus performant du classement LMSYS Arena avec 1506 Elo.", category: "Benchmark", date: "2026-08-10", readTime: "12 min", author: "Fidox Team", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800" },
  { id: "2", slug: "kimi-k3-review", title: "Kimi K3 : 2.8T paramètres ouverts défient les leaders", excerpt: "Moonshot AI publie le plus grand modèle open-weights avec un record GPQA de 93.5%.", category: "News", date: "2026-08-08", readTime: "8 min", author: "Fidox Team", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800" },
  { id: "3", slug: "gpt-5-6-sol-review", title: "GPT-5.6 Sol : OpenAI domine le coding terminal", excerpt: "91.9% sur Terminal-Bench 2.1, GPT-5.6 Sol établit un nouveau standard pour les workflows agents.", category: "Benchmark", date: "2026-08-05", readTime: "10 min", author: "Fidox Team", image: "https://images.unsplash.com/photo-1555949963-ff9fe0c802eb?w=800" }
];

// ===== UTILS =====
function getModelLogoClass(developer) {
  const classes = {
    'OpenAI': 'openai', 'Anthropic': 'anthropic', 'Google': 'google',
    'Meta': 'meta', 'NVIDIA': 'nvidia', 'xAI': 'xai', 'DeepSeek': 'deepseek',
    'Moonshot AI': 'moonshot', 'Alibaba': 'alibaba', 'Zhipu AI': 'zhipu',
    'Mistral AI': 'mistral', 'LG AI': 'lg', 'Muse AI': 'muse',
    'MiniMax': 'minimax', 'Conjecture AI': 'conjecture'
  };
  return classes[developer] || 'generic';
}

function getScoreClass(score) {
  if (score >= 85) return 'high';
  if (score >= 75) return 'medium';
  return 'low';
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

// ===== THEME =====
function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute('data-theme');
  const newTheme = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeIcons();
}

function updateThemeIcons() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.querySelectorAll('.icon-sun').forEach(el => el.style.display = isDark ? 'block' : 'none');
  document.querySelectorAll('.icon-moon').forEach(el => el.style.display = isDark ? 'none' : 'block');
}

function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcons();
}

// ===== RENDER FUNCTIONS =====
function renderTopModels(containerId, count = 6) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const topModels = [...MODELS].sort((a, b) => b.globalScore - a.globalScore).slice(0, count);
  
  container.innerHTML = topModels.map(model => `
    <a href="model.html?slug=${model.slug}" class="model-card">
      <div class="model-card-header">
        <div class="model-logo ${getModelLogoClass(model.developer)}">${model.name[0]}</div>
        <div class="model-card-info">
          <h3>${model.name}</h3>
          <span class="model-provider">${model.developer}</span>
        </div>
        <div class="model-score ${getScoreClass(model.globalScore)}">${model.globalScore}</div>
      </div>
      <div class="model-card-meta">
        <span>${model.params}</span>
        <span>${model.contextWindow}</span>
        <span>${model.releaseYear}</span>
      </div>
      <p class="model-card-desc">${model.description.substring(0, 80)}...</p>
      <div class="model-card-tags">
        ${model.openSource ? '<span class="tag tag-open">Open</span>' : ''}
        <span class="tag">${model.category}</span>
      </div>
    </a>
  `).join('');
}

function renderArticles(containerId, count = 3) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = ARTICLES.slice(0, count).map(article => `
    <article class="article-card">
      <div class="article-card-image" style="background-image: url('${article.image}')"></div>
      <div class="article-card-content">
        <div class="article-card-meta">
          <span class="article-category">${article.category}</span>
          <span class="article-date">${formatDate(article.date)}</span>
          <span class="article-read-time">${article.readTime}</span>
        </div>
        <h3><a href="article.html?slug=${article.slug}" style="color:inherit;text-decoration:none;">${article.title}</a></h3>
        <p>${article.excerpt}</p>
        <a href="article.html?slug=${article.slug}" class="btn btn-text">Lire l'article →</a>
      </div>
    </article>
  `).join('');
}

// ===== CHARTS =====
function initHeroChart() {
  const canvas = document.getElementById('heroChart');
  if (!canvas) return;
  
  const topModels = [...MODELS].sort((a, b) => b.lmsysElo - a.lmsysElo).slice(0, 8);
  const colors = getChartColors();
  
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: topModels.map(m => m.name.replace(' (', ' ').replace(')', '')),
      datasets: [{
        label: 'LMSYS Elo',
        data: topModels.map(m => m.lmsysElo),
        backgroundColor: topModels.map((_, i) => i === 0 ? '#3a83f7' : 'rgba(58, 131, 247, 0.6)'),
        borderRadius: 6,
        borderSkipped: false
      }]
    },
    options: {
      indexAxis: 'x',
      responsive: true,
      plugins: { 
        legend: { display: false },
        tooltip: {
          backgroundColor: colors.tooltipBg,
          titleColor: colors.tooltipText,
          bodyColor: colors.tooltipText,
          borderColor: colors.tooltipBorder,
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: ctx => `Elo: ${ctx.parsed.x}`
          }
        }
      },
      scales: {
        x: { 
          grid: { color: colors.grid }, 
          ticks: { color: colors.textMuted } 
        },
        y: { 
          grid: { display: false }, 
          ticks: { color: colors.textSecondary, font: { size: 12 } } 
        }
      }
    }
  });
}

function initBenchmarkChart() {
  const canvas = document.getElementById('benchmarkChart');
  if (!canvas) return;
  
  const topModels = [...MODELS].sort((a, b) => b.globalScore - a.globalScore).slice(0, 6);
  const colors = getChartColors();
  
  new Chart(canvas, {
    type: 'radar',
    data: {
      labels: ['MMLU', 'GPQA', 'HumanEval', 'LMSYS*'],
      datasets: topModels.map((model, i) => ({
        label: model.name,
        data: [model.mmlu, model.gpqa, model.humaneval, Math.min(model.lmsysElo - 1000, 100)],
        borderColor: i === 0 ? '#3a83f7' : 'rgba(58, 131, 247, 0.5)',
        backgroundColor: i === 0 ? 'rgba(58, 131, 247, 0.2)' : 'rgba(58, 131, 247, 0.1)',
        borderWidth: 2,
        pointRadius: 3
      }))
    },
    options: {
      responsive: true,
      plugins: { 
        legend: { position: 'bottom', labels: { font: { size: 11 }, color: colors.textSecondary } },
        tooltip: {
          backgroundColor: colors.tooltipBg,
          titleColor: colors.tooltipText,
          bodyColor: colors.tooltipText,
          borderColor: colors.tooltipBorder,
          borderWidth: 1,
          padding: 12
        }
      },
      scales: {
        r: { 
          beginAtZero: true, max: 100, 
          grid: { color: colors.grid }, 
          angleLines: { color: colors.grid }, 
          pointLabels: { font: { size: 12 }, color: colors.textSecondary },
          ticks: { color: colors.textMuted, backdropColor: 'transparent' }
        }
      }
    }
  });
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  renderTopModels('top-models-grid', 6);
  renderArticles('articles-grid', 3);
  initHeroChart();
  if (document.getElementById('benchmarkChart')) initBenchmarkChart();
});