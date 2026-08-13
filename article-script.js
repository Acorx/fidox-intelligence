// Article page - Dynamic loading from API
const API_BASE = '/api'; // Future API endpoint

// Parse URL params
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Article data structure (to be populated from DB)
const articleData = {
    id: null,
    slug: null,
    title: 'Chargement...',
    subtitle: '',
    category: 'Benchmark',
    date: new Date().toISOString(),
    readTime: '8 min',
    author: {
        name: 'Fidox Team',
        role: 'Expert IA',
        bio: 'Équipe dédiée à l\'analyse des modèles d\'intelligence artificielle.'
    },
    heroImage: 'placeholder-hero.jpg',
    content: '',
    tags: [],
    relatedArticles: []
};

// Load article data
async function loadArticle() {
    const articleId = getQueryParam('id') || 'gpt-4o-analysis';
    const slug = getQueryParam('slug') || 'gpt-4o-analysis';
    
    try {
        // Future: Fetch from API
        // const response = await fetch(`${API_BASE}/articles/${slug}`);
        // const data = await response.json();
        
        // For now, use mock data structure
        Object.assign(articleData, {
            id: articleId,
            slug: slug,
            title: generateArticleTitle(slug),
            subtitle: 'Analyse approfondie des performances et capacités du modèle',
            category: getCategoryFromSlug(slug),
            date: formatDate(new Date()),
            readTime: estimateReadTime(),
            tags: generateTags(slug),
            heroImage: `/api/images/articles/${slug}.jpg`
        });
        
        updateArticleUI();
        generateTableOfContents();
    } catch (error) {
        console.error('Failed to load article:', error);
    }
}

function generateArticleTitle(slug) {
    const titles = {
        'gpt-4o-analysis': 'Analyse complète du GPT-4o : Le nouveau standard',
        'claude-3-5-review': 'Claude 3.5 Sonnet : Révolution ou évolution ?',
        'llama-3-1-test': 'Llama 3.1 405B : La puissance open-source',
        'gemini-1-5-test': 'Gemini 1.5 Pro : 1 million de tokens'
    };
    return titles[slug] || 'Article';
}

function getCategoryFromSlug(slug) {
    const categories = {
        'gpt-': 'Benchmark',
        'claude-': 'Review',
        'llama-': 'Open Source',
        'gemini-': 'Benchmark',
        ' Hermes': 'Cas d\'usage'
    };
    for (const [prefix, cat] of Object.entries(categories)) {
        if (slug.startsWith(prefix)) return cat;
    }
    return 'Benchmark';
}

function formatDate(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    if (diff === 0) return "Aujourd'hui";
    if (diff === 1) return 'Hier';
    if (diff < 7) return `Il y a ${diff} jours`;
    return date.toLocaleDateString('fr-FR');
}

function estimateReadTime() {
    return `${Math.floor(Math.random() * 10) + 5} min`;
}

function generateTags(slug) {
    const tags = ['#LLM', '#Benchmark', '#IA'];
    if (slug.includes('gpt')) tags.push('#GPT-4o');
    if (slug.includes('claude')) tags.push('#Claude');
    if (slug.includes('llama')) tags.push('#OpenSource');
    return tags;
}

function updateArticleUI() {
    document.getElementById('article-title').textContent = `${articleData.title} - Fidox Intelligence`;
    document.getElementById('article-title-main').textContent = articleData.title;
    document.getElementById('article-subtitle').textContent = articleData.subtitle;
    document.getElementById('article-category').textContent = articleData.category;
    document.getElementById('article-date').textContent = `Publié le ${articleData.date}`;
    document.getElementById('article-read-time').textContent = `${articleData.readTime} de lecture`;
    document.getElementById('author-name').textContent = articleData.author.name;
    document.getElementById('author-role').textContent = articleData.author.role;
    document.getElementById('author-avatar').textContent = articleData.author.name[0];
    document.getElementById('sidebar-author-avatar').textContent = articleData.author.name[0];
    document.getElementById('sidebar-author-name').textContent = articleData.author.name;
    document.getElementById('sidebar-author-bio').textContent = articleData.author.bio;
    
    // Tags
    const tagsContainer = document.getElementById('article-tags');
    tagsContainer.innerHTML = articleData.tags.map(tag => 
        `<span class="tag">${tag}</span>`
    ).join('');
    
    // Hero image
    document.getElementById('article-hero-image').src = articleData.heroImage;
}

function generateTableOfContents() {
    const headings = document.querySelectorAll('.prose h2, .prose h3');
    const tocList = document.getElementById('toc-list');
    
    headings.forEach((heading, index) => {
        const id = `section-${index}`;
        heading.id = id;
        const li = document.createElement('li');
        const level = heading.tagName.toLowerCase() === 'h3' ? 'padding-left: 16px;' : '';
        li.innerHTML = `<a href="#${id}" style="${level}">${heading.textContent}</a>`;
        tocList.appendChild(li);
    });
}

// Share functionality
function shareArticle(platform) {
    const url = window.location.href;
    const title = articleData.title;
    
    switch(platform) {
        case 'twitter':
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`);
            break;
        case 'linkedin':
            window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`);
            break;
        case 'copy':
            navigator.clipboard.writeText(url);
            alert('Lien copié !');
            break;
    }
}

// Load article on page load
document.addEventListener('DOMContentLoaded', loadArticle);