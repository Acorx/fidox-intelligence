// Model page scripts
function initModelCharts() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    // MMLU Chart
    const mmluCtx = document.getElementById('mmluChart');
    if (mmluCtx) {
        new Chart(mmluCtx, {
            type: 'bar',
            data: {
                labels: ['GPT-4o', 'Claude', 'Gemini', 'Llama', 'Nemo'],
                datasets: [{
                    data: [85, 84, 81, 80, 72],
                    backgroundColor: (ctx) => ctx.dataIndex === 0 ? '#3a83f7' : 'rgba(255,255,255,0.2)',
                    borderRadius: 8,
                    borderWidth: 0,
                    barPercentage: 0.7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { display: false },
                    y: { display: false, beginAtZero: true, max: 100 }
                }
            }
        });
    }
    
    // GPQA Chart
    const gpqaCtx = document.getElementById('gpqaChart');
    if (gpqaCtx) {
        new Chart(gpqaCtx, {
            type: 'bar',
            data: {
                labels: ['GPT-4o', 'Claude', 'Gemini', 'Llama', 'Nemo'],
                datasets: [{
                    data: [82, 88, 78, 75, 70],
                    backgroundColor: (ctx) => ctx.dataIndex === 0 ? '#3a83f7' : 'rgba(255,255,255,0.2)',
                    borderRadius: 8,
                    borderWidth: 0,
                    barPercentage: 0.7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { display: false },
                    y: { display: false, beginAtZero: true, max: 100 }
                }
            }
        });
    }
    
    // HumanEval Chart
    const humanevalCtx = document.getElementById('humanevalChart');
    if (humanevalCtx) {
        new Chart(humanevalCtx, {
            type: 'bar',
            data: {
                labels: ['GPT-4o', 'Claude', 'Gemini', 'Llama', 'Nemo'],
                datasets: [{
                    data: [79, 85, 80, 72, 75],
                    backgroundColor: (ctx) => ctx.dataIndex === 0 ? '#3a83f7' : 'rgba(255,255,255,0.2)',
                    borderRadius: 8,
                    borderWidth: 0,
                    barPercentage: 0.7
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    x: { display: false },
                    y: { display: false, beginAtZero: true, max: 100 }
                }
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initModelCharts();
});