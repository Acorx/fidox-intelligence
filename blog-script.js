// Theme management
function initTheme() {
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.setAttribute('data-theme', 'dark');
    }
    
    updateThemeToggle();
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle();
    
    // Update charts on theme change
    if (window.heroChart) {
        window.heroChart.destroy();
        initHeroChart();
    }
    if (window.rankingChart) {
        window.rankingChart.destroy();
        initRankingChart();
    }
}

function updateThemeToggle() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    const toggle = document.querySelector('.theme-toggle');
    
    if (toggle) {
        toggle.innerHTML = isDark 
            ? '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg> Mode clair'
            : '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg> Mode sombre';
    }
}

// Model data
const modelsData = [
    { name: 'GPT-4o', score: 87, gpqa: 82, humaneval: 79, mmlu: 85 },
    { name: 'Claude 3.5', score: 85, gpqa: 88, humaneval: 85, mmlu: 84 },
    { name: 'Gemini 1.5', score: 82, gpqa: 78, humaneval: 80, mmlu: 81 },
    { name: 'Llama 3.1', score: 78, gpqa: 75, humaneval: 72, mmlu: 80 },
    { name: 'Nemotron', score: 74, gpqa: 70, humaneval: 75, mmlu: 72 }
];

// Hero mini chart
function initHeroChart() {
    const ctx = document.getElementById('heroChart');
    if (!ctx) return;
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    window.heroChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['GPT-4o', 'Claude', 'Gemini', 'Llama', 'Nemotron'],
            datasets: [{
                data: [87, 85, 82, 78, 74],
                backgroundColor: [
                    'rgba(255, 215, 0, 0.9)',
                    'rgba(192, 192, 192, 0.9)',
                    'rgba(205, 127, 50, 0.9)',
                    '#3a83f7',
                    '#3a83f7'
                ],
                borderRadius: 8,
                borderWidth: 0,
                barPercentage: 0.7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { 
                legend: { display: false },
                tooltip: {
                    backgroundColor: isDark ? '#1a1a1a' : '#fff',
                    titleColor: isDark ? '#fff' : '#111',
                    bodyColor: isDark ? '#aaa' : '#666',
                    padding: 12,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        label: ctx => `Score: ${ctx.parsed.y}/100`
                    }
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false,
                    beginAtZero: true,
                    max: 100
                }
            },
            animation: { 
                duration: 1200, 
                easing: 'easeOutQuart' 
            }
        }
    });
}

// Main ranking chart
function initRankingChart() {
    const ctx = document.getElementById('rankingChart');
    if (!ctx) return;
    
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, '#3a83f7');
    gradient.addColorStop(1, '#2d6cdf');
    
    window.rankingChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: modelsData.map(m => m.name),
            datasets: [{
                label: 'Score Global',
                data: modelsData.map(m => m.score),
                backgroundColor: gradient,
                borderRadius: 12,
                borderWidth: 0,
                barThickness: 64,
                maxBarThickness: 80
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: { duration: 1400, easing: 'easeOutQuart' },
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1a1a1a',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    padding: 16,
                    cornerRadius: 12,
                    displayColors: false,
                    callbacks: {
                        label: ctx => `Score: ${ctx.parsed.y}/100`
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(255,255,255,0.06)',
                        drawBorder: false
                    },
                    ticks: {
                        color: 'rgba(255,255,255,0.4)',
                        font: { size: 11 },
                        callback: v => v + '%'
                    }
                },
                x: {
                    grid: { display: false },
                    ticks: {
                        color: 'rgba(255,255,255,0.8)',
                        font: { size: 13, weight: '600' }
                    }
                }
            }
        }
    });
}

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.header');
    if (!navbar) return;
    
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.model-card, .article-card, .benchmark-table tr').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (!localStorage.getItem('theme')) {
        const html = document.documentElement;
        html.setAttribute('data-theme', e.matches ? 'dark' : 'light');
        updateThemeToggle();
        
        if (window.heroChart) {
            window.heroChart.destroy();
            initHeroChart();
        }
        if (window.rankingChart) {
            window.rankingChart.destroy();
            initRankingChart();
        }
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initHeroChart();
    initRankingChart();
});