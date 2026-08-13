-- Cloudflare D1 Schema for Fidox Intelligence
-- Execute this in the Cloudflare Dashboard or via wrangler

CREATE TABLE IF NOT EXISTS models (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    developer TEXT NOT NULL,
    params INTEGER,
    context_window INTEGER,
    release_year INTEGER,
    global_score REAL,
    description TEXT,
    api_available BOOLEAN DEFAULT false,
    open_source BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_models_slug ON models(slug);
CREATE INDEX IF NOT EXISTS idx_models_global_score ON models(global_score DESC);

CREATE TABLE IF NOT EXISTS benchmarks (
    id TEXT PRIMARY KEY,
    model_id TEXT NOT NULL,
    benchmark_name TEXT NOT NULL,
    score REAL NOT NULL,
    total_possible REAL DEFAULT 100,
    test_date DATE,
    methodology TEXT,
    FOREIGN KEY (model_id) REFERENCES models(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_benchmarks_model_id ON benchmarks(model_id);
CREATE INDEX IF NOT EXISTS idx_benchmarks_name ON benchmarks(benchmark_name);

CREATE TABLE IF NOT EXISTS articles (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    category TEXT,
    author_id TEXT,
    content TEXT,
    excerpt TEXT,
    featured_image TEXT,
    read_time INTEGER,
    published_at TIMESTAMP,
    status TEXT DEFAULT 'draft',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_articles_published ON articles(published_at DESC);

CREATE TABLE IF NOT EXISTS tags (
    id TEXT PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS article_tags (
    article_id TEXT NOT NULL,
    tag_id TEXT NOT NULL,
    PRIMARY KEY (article_id, tag_id),
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS comments (
    id TEXT PRIMARY KEY,
    article_id TEXT NOT NULL,
    user_name TEXT,
    user_email TEXT,
    content TEXT NOT NULL,
    parent_id TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_comments_article ON comments(article_id);
CREATE INDEX IF NOT EXISTS idx_comments_status ON comments(status);

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE,
    bio TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'reader',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample data for testing
INSERT INTO models (id, slug, name, developer, params, context_window, release_year, global_score) VALUES
('gpt-4o', 'gpt-4o', 'GPT-4o', 'OpenAI', 1760000000, 128000, 2024, 87.0),
('claude-3-5', 'claude-3-5-sonnet', 'Claude 3.5 Sonnet', 'Anthropic', 175000000000, 200000, 2024, 85.0),
('gemini-1-5', 'gemini-1-5-pro', 'Gemini 1.5 Pro', 'Google', 1000000000, 1000000, 2024, 82.0),
('llama-3-1', 'llama-3-1-405b', 'Llama 3.1 405B', 'Meta', 405000000000, 128000, 2024, 78.0),
('nemotron', 'nemotron-405b', 'Nemotron', 'NVIDIA', 15000000000, 128000, 2024, 74.0);

INSERT INTO benchmarks (id, model_id, benchmark_name, score) VALUES
('b1', 'gpt-4o', 'MMLU', 85.0),
('b2', 'gpt-4o', 'GPQA', 82.0),
('b3', 'gpt-4o', 'HumanEval', 79.0),
('b4', 'claude-3-5', 'MMLU', 84.0),
('b5', 'claude-3-5', 'GPQA', 88.0),
('b6', 'claude-3-5', 'HumanEval', 85.0);