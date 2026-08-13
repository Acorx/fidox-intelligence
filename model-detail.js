// Model Detail Page - Dynamic loading with real benchmarks
document.addEventListener('DOMContentLoaded', function() {
    const slug = getQueryParam('slug');
    if (!slug) {
        window.location.href = 'index.html';
        return;
    }
    
    const model = getModelBySlug(slug);
    if (!model) {
        window.location.href = 'index.html';
        return;
    }
    
    renderModelPage(model);
    renderComparisonTable(model);
    renderCapabilities(model);
    renderBestFor(model);
    renderRelatedModels(model);
    renderLMSYSRanking(model);
});

function renderModelPage(model) {
    // Update page title
    document.getElementById('page-title').textContent = `${model.name} - Fidox Intelligence`;
    
    // Update breadcrumb
    document.getElementById('breadcrumb-model').textContent = model.name;
    
    // Update hero content
    document.getElementById('model-name').textContent = model.name;
    document.getElementById('model-developer').textContent = model.developer;
    document.getElementById('model-description').textContent = model.description;
    document.getElementById('model-category').textContent = model.category;
    document.getElementById('model-score').textContent = model.globalScore;
    document.getElementById('model-params').textContent = model.params;
    document.getElementById('model-context').textContent = model.contextWindow;
    document.getElementById('model-year').textContent = model.releaseYear;
    document.getElementById('model-price').textContent = model.price;
    
    // Update benchmark scores
    document.getElementById('score-mmlu').textContent = model.mmlu;
    document.getElementById('score-gpqa').textContent = model.gpqa;
    document.getElementById('score-humaneval').textContent = model.humaneval;
    
    // Update benchmark bars
    document.getElementById('bar-mmlu').style.width = `${model.mmlu}%`;
    document.getElementById('bar-gpqa').style.width = `${model.gpqa}%`;
    document.getElementById('bar-humaneval').style.width = `${model.humaneval}%`;
    
    // Update API and Open Source status
    document.getElementById('api-status').textContent = model.apiAvailable ? 'Oui, disponible' : 'Non disponible';
    document.getElementById('open-source-status').textContent = model.openSource ? 'Oui, open weights' : 'Non, fermé';
    
    // Render chart
    renderBenchmarkChart(model);
}

function renderBenchmarkChart(model) {
    const ctx = document.getElementById('benchmark-chart').getContext('2d');
    
    // Prepare data - include LMSYS if available
    const data = [model.mmlu, model.gpqa, model.humaneval];
    const labels = ['MMLU', 'GPQA', 'HumanEval'];
    
    if (model.lmsysElo) {
        data.push(Math.min(model.lmsysElo - 1000, 100)); // Normalize to 0-100 scale
        labels.push('LMSYS*');
    }
    
    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: labels,
            datasets: [{
                label: model.name,
                data: data,
                backgroundColor: 'rgba(58, 131, 247, 0.2)',
                borderColor: '#3a83f7',
                borderWidth: 2,
                pointBackgroundColor: '#3a83f7',
                pointRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: { family: 'Inter', size: 14, weight: '600' },
                        color: 'var(--text-primary)'
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    grid: { color: 'var(--border)' },
                    angleLines: { color: 'var(--border)' },
                    pointLabels: {
                        font: { family: 'Inter', size: 12, weight: '600' },
                        color: 'var(--text-secondary)'
                    },
                    ticks: {
                        display: false
                    }
                }
            }
        }
    });
}

function renderLMSYSRanking(model) {
    const container = document.getElementById('lmsys-ranking');
    if (!container || !model.lmsysElo) return;
    
    const topModels = getTopModelsByElo(10);
    const rank = topModels.findIndex(m => m.id === model.id) + 1;
    
    container.innerHTML = `
        <div class="lmsys-badge">
            <span class="lmsys-rank">#${rank}</span>
            <span class="lmsys-score">${model.lmsysElo} Elo</span>
        </div>
    `;
}

function renderComparisonTable(currentModel) {
    const allModels = getAllModels().sort((a, b) => b.globalScore - a.globalScore);
    const tbody = document.getElementById('comparison-table-body');
    
    tbody.innerHTML = allModels.map(model => `
        <tr ${model.id === currentModel.id ? 'class="model-highlight"' : ''}>
            <td>
                <a href="model-detail.html?slug=${model.slug}" style="color: inherit; text-decoration: none; font-weight: 600;">
                    ${model.name}
                </a>
                <span style="display: block; font-size: 0.75rem; color: var(--text-muted);">${model.developer}</span>
            </td>
            <td><span class="score-badge ${getScoreClass(model.mmlu)}">${model.mmlu}</span></td>
            <td><span class="score-badge ${getScoreClass(model.gpqa)}">${model.gpqa}</span></td>
            <td><span class="score-badge ${getScoreClass(model.humaneval)}">${model.humaneval}</span></td>
            <td><span class="score-badge ${getScoreClass(model.globalScore)}">${model.globalScore}</span></td>
        </tr>
    `).join('');
}

function getScoreClass(score) {
    if (score >= 85) return 'high';
    if (score >= 75) return 'medium';
    return 'low';
}

function renderCapabilities(model) {
    const container = document.getElementById('capabilities-grid');
    const icons = ['🧠', '👁️', '🎙️', '⚡', '🔧', '📊', '💻', '🌐'];
    
    container.innerHTML = model.strengths.map((strength, index) => `
        <div class="capability-item">
            <span class="capability-icon">${icons[index % icons.length]}</span>
            <div>
                <div class="capability-name">${strength}</div>
                <div class="capability-desc">Point fort principal</div>
            </div>
        </div>
    `).join('');
}

function renderBestFor(model) {
    const container = document.getElementById('best-for-list');
    const icons = ['🎯', '💼', '🔬', '📝', '🚀', '⚙️'];
    
    container.innerHTML = model.bestFor.map((useCase, index) => `
        <div class="usage-example">
            <span class="usage-example-icon">${icons[index % icons.length]}</span>
            <div class="usage-example-content">
                <h4>${useCase}</h4>
                <p>Idéalement adapté pour ce type de tâche et utilisation professionnelle.</p>
            </div>
        </div>
    `).join('');
}

function renderRelatedModels(currentModel) {
    const container = document.getElementById('related-models-grid');
    const competitors = getCompetitorModels(currentModel);
    const topModels = getTopModels(6).filter(m => m.id !== currentModel.id);
    
    const related = [...competitors, ...topModels].slice(0, 6);
    
    container.innerHTML = related.map(model => `
        <a href="model-detail.html?slug=${model.slug}" class="related-model-card">
            <div class="related-logo ${getModelLogoClass(model.developer)}">${model.name[0]}</div>
            <div>
                <h3>${model.name}</h3>
                <span class="model-developer">${model.developer}</span>
            </div>
            <div class="related-score">${model.globalScore}</div>
        </a>
    `).join('');
}

function getModelLogoClass(developer) {
    const classes = {
        'OpenAI': 'openai',
        'Anthropic': 'anthropic',
        'Google': 'google',
        'Meta': 'meta',
        'NVIDIA': 'nvidia',
        'xAI': 'xai',
        'DeepSeek': 'deepseek',
        'Moonshot AI': 'moonshot',
        'Alibaba': 'alibaba',
        'Zhipu AI': 'zhipu',
        'Mistral AI': 'mistral',
        'LG AI': 'lg',
        'Upstage': 'upstage',
        'Conjecture AI': 'conjecture',
        'Muse AI': 'muse',
        'MiniMax': 'minimax',
        'Motif AI': 'motif',
        'Inkling AI': 'inkling',
        'A.X Labs': 'ax'
    };
    return classes[developer] || 'generic';
}

function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}