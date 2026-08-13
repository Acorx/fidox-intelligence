// Model Page - Dynamic loading with API structure
const API_BASE = '/api';

// Model data structure (matches DB schema)
const modelData = {
    id: null,
    slug: null,
    name: 'Chargement...',
    developer: '',
    params: null,
    contextWindow: null,
    releaseYear: null,
    globalScore: null,
    mmlu: null,
    gpqa: null,
    humaneval: null,
    description: '',
    capabilities: [],
    strengths: [],
    weaknesses: [],
    bestFor: [],
    benchmarks: {},
    priceInfo: null,
    apiAvailable: false,
    openSource: false
};

// Load model data
async function loadModel() {
    const slug = getQueryParam('slug') || 'gpt-4o';
    
    try {
        // Future: Fetch from API
        // const response = await fetch(`${API_BASE}/models/${slug}`);
        // const data = await response.json();
        
        // Mock data structure
        Object.assign(modelData, {
            id: slug,
            slug: slug,
            name: generateModelName(slug),
            developer: generateDeveloper(slug),
            params: generateParams(slug),
            contextWindow: generateContextWindow(slug),
            releaseYear: generateReleaseYear(slug),
            globalScore: generateGlobalScore(slug),
            mmlu: generateMMLUScore(slug),
            gpqa: generateGPQAScore(slug),
            humaneval: generateHumanEvalScore(slug),
            description: generateDescription(slug),
            capabilities: generateCapabilities(slug),
            strengths: generateStrengths(slug),
            weaknesses: generateWeaknesses(slug),
            bestFor: generateBestFor(slug)
        });
        
        updateModelUI();
        renderBenchmarks();
        renderComparisonTable();
        renderCapabilities();
        renderRelatedModels();
    } catch (error) {
        console.error('Failed to load model:', error);
    }
}

// Data generation functions (replace with API calls)
function generateModelName(slug) {
    const names = {
        'gpt-4o': 'GPT-4o',
        'claude-3-5': 'Claude 3.5 Sonnet',
        'llama-3-1': 'Llama 3.1 405B',
        'gemini-1-5': 'Gemini 1.5 Pro',
        'nemotron': 'Nemotron'
    };
    return names[slug] || 'Modèle';
}

function generateDeveloper(slug) {
    const devs = {
        'gpt-4o': 'OpenAI',
        'claude-3-5': 'Anthropic',
        'llama-3-1': 'Meta',
        'gemini-1-5': 'Google',
        'nemotron': 'NVIDIA'
    };
    return devs[slug] || 'Inconnu';
}

function generateParams(slug) {
    const params = {
        'gpt-4o': '1.76B',
        'claude-3-5': '~175B',
        'llama-3-1': '405B',
        'gemini-1-5': '~1.0B',
        'nemotron': '15B'
    };
    return params[slug] || 'N/A';
}

function generateContextWindow(slug) {
    const windows = {
        'gpt-4o': '128K',
        'claude-3-5': '200K',
        'llama-3-1': '128K',
        'gemini-1-5': '1M',
        'nemotron': '128K'
    };
    return windows[slug] || 'N/A';
}

function generateGlobalScore(slug) {
    const scores = {
        'gpt-4o': 87,
        'claude-3-5': 85,
        'llama-3-1': 78,
        'gemini-1-5': 82,
        'nemotron': 74
    };
    return scores[slug] || 70;
}

function generateMMLUScore(slug) {
    return {
        'gpt-4o': 85,
        'claude-3-5': 84,
        'llama-3-1': 80,
        'gemini-1-5': 81,
        'nemotron': 72
    }[slug] || 75;
}

function generateGPQAScore(slug) {
    return {
        'gpt-4o': 82,
        'claude-3-5': 88,
        'llama-3-1': 75,
        'gemini-1-5': 78,
        'nemotron': 70
    }[slug] || 75;
}

function generateHumanEvalScore(slug) {
    return {
        'gpt-4o': 79,
        'claude-3-5': 85,
        'llama-3-1': 72,
        'gemini-1-5': 80,
        'nemotron': 75
    }[slug] || 75;
}

function generateDescription(slug) {
    return 'Description du modèle...';
}

function generateCapabilities(slug) {
    return ['Langage', 'Vision', 'Code'];
}

function generateStrengths(slug) {
    return ['Raisonnement avancé', 'Multimodal'];
}

function generateWeaknesses(slug) {
    return ['Coût élevé'];
}

function generateBestFor(slug) {
    return ['Conversation', 'Création'];
}

// UI Update functions
function updateModelUI() {
    document.getElementById('model-title').textContent = `${modelData.name} - Fidox Intelligence`;
    document.getElementById('model-name').textContent = modelData.name;
    document.getElementById('model-developer').textContent = modelData.developer;
    document.getElementById('model-score').textContent = modelData.globalScore;
    document.getElementById('model-params').textContent = modelData.params;
    document.getElementById('model-context').textContent = modelData.contextWindow;
    document.getElementById('model-year').textContent = modelData.releaseYear;
    document.getElementById('model-description').textContent = modelData.description;
}

function renderBenchmarks() {
    // Render benchmark charts
    const ctx = document.getElementById('benchmark-chart');
    if (ctx) {
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['MMLU', 'GPQA', 'HumanEval'],
                datasets: [{
                    label: modelData.name,
                    data: [modelData.mmlu, modelData.gpqa, modelData.humaneval],
                    backgroundColor: '#3a83f7'
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: { display: false }
                }
            }
        });
    }
}

function renderComparisonTable() {
    const container = document.getElementById('comparison-table-body');
    if (!container) return;
    
    // This would be populated from API
    const rows = [
        ['GPT-4o', modelData.mmlu, modelData.gpqa, modelData.humaneval, modelData.globalScore, true],
        ['Claude 3.5', 84, 88, 85, 85, false],
        ['Gemini 1.5', 81, 78, 80, 82, false],
        ['Llama 3.1', 80, 75, 72, 78, false]
    ];
    
    container.innerHTML = rows.map(row => `
        <tr ${row[5] ? 'class="model-highlight"' : ''}>
            <td>${row[0]}</td>
            <td><span class="score-badge ${row[1] >= 80 ? 'high' : row[1] >= 70 ? 'medium' : 'low'}">${row[1]}</span></td>
            <td><span class="score-badge ${row[2] >= 80 ? 'high' : row[2] >= 70 ? 'medium' : 'low'}">${row[2]}</span></td>
            <td><span class="score-badge ${row[3] >= 80 ? 'high' : row[3] >= 70 ? 'medium' : 'low'}">${row[3]}</span></td>
            <td><span class="score-badge ${row[4] >= 80 ? 'high' : row[4] >= 70 ? 'medium' : 'low'}">${row[4]}</span></td>
        </tr>
    `).join('');
}

function renderCapabilities() {
    const container = document.getElementById('capabilities-grid');
    if (!container) return;
    
    container.innerHTML = modelData.capabilities.map(cap => `
        <div class="capability-item">
            <span class="capability-icon">✓</span>
            <div>
                <div class="capability-name">${cap}</div>
                <div class="capability-desc">Capacité active</div>
            </div>
        </div>
    `).join('');
}

function renderRelatedModels() {
    const container = document.getElementById('related-models-grid');
    if (!container) return;
    
    const models = [
        { name: 'Claude 3.5 Sonnet', slug: 'claude-3-5', score: 85, developer: 'Anthropic', initial: 'A' },
        { name: 'Gemini 1.5 Pro', slug: 'gemini-1-5', score: 82, developer: 'Google', initial: 'G' },
        { name: 'Llama 3.1 405B', slug: 'llama-3-1', score: 78, developer: 'Meta', initial: 'M' }
    ];
    
    container.innerHTML = models.map(m => `
        <a href="model-${m.slug}.html" class="related-model-card">
            <div class="related-logo">${m.initial}</div>
            <div>
                <h3>${m.name}</h3>
                <span class="model-developer">${m.developer}</span>
            </div>
            <div class="related-score">${m.score}</div>
        </a>
    `).join('');
}

// Helper functions
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Load model on page load
document.addEventListener('DOMContentLoaded', loadModel);