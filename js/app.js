let showOnlyFavorites = false;
let currentHeroIndex = 0;

const heroSlides = [
    {
        title: "Hollow Knight",
        href: "gamefiles/Hollow Knight.html",
        img: "gameimages/hollowknight.png",
        tags: ["Action", "Metroidvania", "Indie"],
        meta: "★ 4.9  •  Featured Pick",
        desc: "Explore twisting caverns, battle tainted creatures, and uncover ancient mysteries in a vast hand-drawn subterranean kingdom."
    },
    {
        title: "Celeste",
        href: "gamefiles/Celeste.html",
        img: "gameimages/celeste.png",
        tags: ["Platformer", "Precision", "Story"],
        meta: "★ 4.9  •  Top Rated",
        desc: "Help Madeline survive her inner demons on her journey to the top of Celeste Mountain in this tight, hand-crafted platformer."
    },
    {
        title: "ULTRAKILL",
        href: "gamefiles/ULTRAKILL.html",
        img: "gameimages/ultrakill.jpg",
        tags: ["FPS", "Fast-Paced", "Retro"],
        meta: "★ 4.8  •  Trending #1",
        desc: "Mankind is dead. Blood is fuel. Hell is full. Chain relentless movement and combos in a high-speed retro shooter."
    },
    {
        title: "Minecraft 1.12.2",
        href: "gamefiles/Minecraft 1.12.2.html",
        img: "gameimages/minecraft.webp",
        tags: ["Sandbox", "Survival", "Open World"],
        meta: "★ 4.9  •  Classic",
        desc: "Build anything you can imagine, mine deep underground, and survive the night in an infinite blocky world."
    }
];

const featuredGamesData = [
    { title: "Pizza Tower", href: "gamefiles/Pizza Tower.html", img: "gameimages/pizzatower.png", genre: "Platformer", badge: "HOT" },
    { title: "Deltarune", href: "gamefiles/Deltarune.html", img: "gameimages/deltarune.png", genre: "RPG", badge: "TOP" },
    { title: "Balatro", href: "gamefiles/Balatro.html", img: "gameimages/balatro.png", genre: "Card Roguelike", badge: "NEW" },
    { title: "Cuphead", href: "gamefiles/Cuphead.html", img: "gameimages/cuphead.png", genre: "Run & Gun", badge: "CLASSIC" }
];

const quickLaunchData = [
    { title: "Geometry Dash", href: "gamefiles/Geometry Dash.html", img: "gameimages/geometrydash.png", tag: "Rhythm" },
    { title: "Retro Bowl", href: "gamefiles/Retro Bowl.html", img: "gameimages/retrobowl.png", tag: "Sports" },
    { title: "Subway Surfers", href: "gamefiles/Subway Surfers.html", img: "gameimages/subwaysurfers.png", tag: "Runner" },
    { title: "Terraria", href: "gamefiles/Terraria.html", img: "gameimages/terraria.png", tag: "Adventure" },
    { title: "Slope 1", href: "gamefiles/Slope 1.html", img: "gameimages/slope1.png", tag: "Arcade" }
];

const topMediaCache = { anime: null, manga: null };

const fallbackTopMedia = {
    anime: [
        { title: "Frieren: Beyond Journey's End", score: "9.32", sub: "28 eps", img: "https://myanimelist.net" },
        { title: "Fullmetal Alchemist: Brotherhood", score: "9.09", sub: "64 eps", img: "https://myanimelist.net" },
        { title: "Steins;Gate", score: "9.07", sub: "24 eps", img: "https://myanimelist.net" },
        { title: "Attack on Titan", score: "8.95", sub: "Final Season", img: "https://myanimelist.net" },
        { title: "Hunter x Hunter (2011)", score: "9.03", sub: "148 eps", img: "https://myanimelist.net" },
        { title: "Bleach: Thousand-Year Blood War", score: "9.02", sub: "Part 3", img: "https://myanimelist.net" }
    ],
    manga: [
        { title: "Berserk", score: "9.47", sub: "375+ ch", img: "https://myanimelist.net" },
        { title: "JoJo Part 7: Steel Ball Run", score: "9.30", sub: "95 ch", img: "https://myanimelist.net" },
        { title: "Vagabond", score: "9.25", sub: "327 ch", img: "https://myanimelist.net" },
        { title: "One Piece", score: "9.22", sub: "1100+ ch", img: "https://myanimelist.net" },
        { title: "Monster", score: "9.15", sub: "162 ch", img: "https://myanimelist.net" },
        { title: "Vinland Saga", score: "9.06", sub: "210+ ch", img: "https://myanimelist.net" }
    ]
};

function renderHeroSlide(index) {
    currentHeroIndex = (index + heroSlides.length) % heroSlides.length;
    const slide = heroSlides[currentHeroIndex];

    const banner = document.getElementById('hero-banner');
    if (banner) {
        banner.style.backgroundImage = "linear-gradient(to right, rgba(12, 16, 26, 0.96) 36%, rgba(19, 25, 43, 0.35)), url('" + slide.img + "')";
    }
    const tagsEl = document.getElementById('hero-tags');
    if (tagsEl) {
        tagsEl.innerHTML = slide.tags.map(function(t) { return "<span>" + t + "</span>"; }).join('');
    }
    const titleEl = document.getElementById('hero-title');
    if (titleEl) titleEl.innerText = slide.title;

    const descEl = document.getElementById('hero-desc');
    if (descEl) descEl.innerText = slide.desc;

    const metaEl = document.getElementById('hero-meta');
    if (metaEl) metaEl.innerText = slide.meta;

    const playBtn = document.getElementById('hero-play-btn');
    if (playBtn) {
        playBtn.onclick = function() { launchStreamPortal(slide.title, slide.href, slide.img); };
    }

    document.querySelectorAll('.hero-thumb-card').forEach(function(card, i) {
        card.classList.toggle('active', i === currentHeroIndex);
    });
}

function cycleHero(delta) {
    renderHeroSlide(currentHeroIndex + delta);
}

function renderHeroSelectors() {
    const row = document.getElementById('hero-selector-row');
    if (!row) return;
    row.innerHTML = '';
    heroSlides.forEach(function(slide, i) {
        const card = document.createElement('div');
        card.className = 'hero-thumb-card' + (i === 0 ? ' active' : '');
        card.innerHTML =
            '<img src="' + slide.img + '" alt="' + slide.title + '">' +
            '<div>' +
                '<div class="hero-thumb-title">' + slide.title + '</div>' +
                '<div class="hero-thumb-sub">' + slide.tags + '</div>' +
            '</div>';
        card.addEventListener('click', function() { renderHeroSlide(i); });
        row.appendChild(card);
    });
}

function switchTab(sectionId, buttonElement) {
    closeStreamPortal();
    document.querySelectorAll('.tab-content').forEach(function(panel) {
        panel.style.display = 'none';
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) targetSection.style.display = 'block';

    document.querySelectorAll('.nav-tab-btn').forEach(function(btn) {
        btn.classList.remove('active');
    });
    if (buttonElement) {
        buttonElement.classList.add('active');
    }
}

function launchStreamPortal(name, hostUrl, imgSrc) {
    if (!hostUrl || hostUrl === 'URL_HERE') return;
    document.getElementById('active-stream-title').innerText = name;
    document.getElementById('nox-secure-iframe').src = hostUrl;
    document.getElementById('inline-stream-layer').style.display = "flex";

    if (hostUrl.indexOf('gamefiles/') === 0) {
        saveRecentGame(name, hostUrl, imgSrc || "");
    }
}

function closeStreamPortal() {
    const iframe = document.getElementById('nox-secure-iframe');
    if (iframe) iframe.src = "";
    document.getElementById('inline-stream-layer').style.display = "none";
}

function saveRecentGame(title, href, img) {
    let recent = JSON.parse(localStorage.getItem('nox_recent_games')) || [];
    recent = recent.filter(function(item) { return item.title !== title; });
    recent.unshift({ title: title, href: href, img: img || 'gameimages/minecraft.webp' });
    recent = recent.slice(0, 4);
    localStorage.setItem('nox_recent_games', JSON.stringify(recent));
    renderRecentGames();
}

function renderRecentGames() {
    const list = document.getElementById('recent-games-list');
    if (!list) return;
    const recent = JSON.parse(localStorage.getItem('nox_recent_games')) || [];
    if (!recent.length) return;

    list.innerHTML = '';
    recent.forEach(function(item) {
        const row = document.createElement('div');
        row.className = 'recent-item';
        row.innerHTML =
            '<img src="' + item.img + '" alt="' + item.title + '">' +
            '<div>' +
                '<div class="recent-item-title">' + item.title + '</div>' +
                '<div class="recent-item-sub">Resume</div>' +
            '</div>';
        row.addEventListener('click', function() { launchStreamPortal(item.title, item.href, item.img); });
        list.appendChild(row);
    });
}


function renderHomeWidgets() {
    const featuredRow = document.getElementById('featured-games-row');
    if (featuredRow) {
        featuredRow.innerHTML = '';
        featuredGamesData.forEach(function(g) {
            const card = document.createElement('div');
            card.className = 'featured-poster';
            card.innerHTML =
                '<img src="' + g.img + '" alt="' + g.title + '">' +
                '<span class="featured-badge">' + g.badge + '</span>' +
                '<div class="featured-poster-overlay">' +
                    '<div class="featured-poster-title">' + g.title + '</div>' +
                    '<div class="featured-poster-genre">' + g.genre + '</div>' +
                '</div>';
            card.addEventListener('click', function() { launchStreamPortal(g.title, g.href, g.img); });
            featuredRow.appendChild(card);
        });
    }

    const quickList = document.getElementById('quick-launch-list');
    if (quickList) {
        quickList.innerHTML = '';
        quickLaunchData.forEach(function(q) {
            const item = document.createElement('div');
            item.className = 'quick-item';
            item.innerHTML =
                '<img src="' + q.img + '" alt="' + q.title + '">' +
                '<div>' +
                    '<div class="quick-item-title">' + q.title + '</div>' +
                    '<div class="quick-item-status">' + q.tag + '</div>' +
                '</div>';
            item.addEventListener('click', function() { launchStreamPortal(q.title, q.href, q.img); });
            quickList.appendChild(item);
        });
    }
}

function loadGamesGrid() {
    const gridContainer = document.querySelector('#games-section .media-grid');
    if (!gridContainer || typeof games === 'undefined') return;

    gridContainer.innerHTML = games.replace(/<img /g, '<img loading="lazy" ');

    const countBadge = document.getElementById('total-games-badge');
    const totalCount = gridContainer.querySelectorAll('.game-link').length;
    if (countBadge && totalCount > 0) countBadge.innerText = totalCount;

    const libText = document.getElementById('library-count-text');
    if (libText && totalCount > 0) libText.innerText = 'Showing ' + totalCount + ' playable titles';

    gridContainer.addEventListener('click', function(e) {
        if (e.target.closest('.gams-star')) return;
        const link = e.target.closest('.game-link');
        if (!link) return;

        e.preventDefault();
        const title = link.querySelector('div').innerText;
        const url = link.getAttribute('href');
        const imgEl = link.querySelector('img');
        const imgSrc = imgEl ? imgEl.getAttribute('src') : '';
        launchStreamPortal(title, url, imgSrc);
    });
}

function loadStreamsGrid() {
    if (typeof streamsList === 'undefined') return;

    const defaultMeta = {
        "anime-section": { tag: "ANIME", desc: "Stream episodes directly inside your active browser tab." },
        "manga-section": { tag: "MANGA", desc: "Read chapters and series inside your active browser tab." },
        "video-section": { tag: "PLAYER", desc: "Watch embeds or load local video files seamlessly." }
    };

    streamsList.forEach(function(item) {
        const container = document.querySelector('#' + item.section + ' .portal-grid');
        if (!container) return;

        const meta = defaultMeta[item.section] || { tag: "PORTAL", desc: "Open directly inside Nox." };
        const tag = item.tag || meta.tag;
        const desc = item.desc || meta.desc;
        const initial = item.title.charAt(0).toUpperCase();

        const card = document.createElement('div');
        card.className = 'portal-card';
        card.innerHTML =
            '<div class="portal-card-top">' +
                '<div class="portal-icon-box">' + initial + '</div>' +
                '<span class="portal-tag">' + tag + '</span>' +
            '</div>' +
            '<div class="portal-card-title">' + item.title + '</div>' +
            '<div class="portal-card-desc">' + desc + '</div>' +
            '<div class="portal-card-footer">' +
                '<span>Launch Portal</span>' +
                '<span>→</span>' +
            '</div>';
        card.addEventListener('click', function() { launchStreamPortal(item.title, item.url); });
        container.appendChild(card);
    });
}

function handleGlobalSearch(query) {
    const gamesTab = document.getElementById('games-section');
    if (query.trim().length > 0 && gamesTab.style.display === 'none') {
        switchTab('games-section', document.getElementById('nav-games'));
    }
    applyGameFilters();
}

function setFavoritesMode(favState) {
    showOnlyFavorites = favState;
    const favBtn = document.getElementById('fav-filter-btn');
    const libFavBtn = document.getElementById('lib-fav-btn');
    const libAllBtn = document.getElementById('lib-all-btn');
    if (favBtn) favBtn.classList.toggle('active', showOnlyFavorites);
    if (libFavBtn) libFavBtn.classList.toggle('active', showOnlyFavorites);
    if (libAllBtn) libAllBtn.classList.toggle('active', !showOnlyFavorites);
    applyGameFilters();
}

function toggleFavoritesFilter() {
    const nextState = !showOnlyFavorites;
    const gamesTab = document.getElementById('games-section');
    if (nextState && gamesTab.style.display === 'none') {
        switchTab('games-section', document.getElementById('nav-games'));
    }
    setFavoritesMode(nextState);
}

function applyGameFilters() {
    const searchEl = document.getElementById('global-search');
    const query = (searchEl ? searchEl.value : '').toLowerCase();
    let visibleCount = 0;

    document.querySelectorAll('#games-section .game-link').forEach(function(card) {
        const title = card.querySelector('div').innerText.toLowerCase();
        const matchesSearch = title.indexOf(query) !== -1;
        const matchesFav = !showOnlyFavorites || card.classList.contains('is-bookmarked');
        const isVisible = matchesSearch && matchesFav;
        card.style.display = isVisible ? 'flex' : 'none';
        if (isVisible) visibleCount++;
    });

    const libText = document.getElementById('library-count-text');
    if (libText) {
        libText.innerText = showOnlyFavorites
            ? 'Showing ' + visibleCount + ' saved favorite' + (visibleCount === 1 ? '' : 's')
            : 'Showing ' + visibleCount + ' playable titles';
    }
}

function launchRandomGame() {
    const links = Array.from(document.querySelectorAll('#games-section .game-link'))
        .filter(function(a) {
            const href = a.getAttribute('href') || '';
            return href.indexOf('gamefiles/') === 0;
        });
    if (!links.length) return;
    const pick = links[Math.floor(Math.random() * links.length)];
    const title = pick.querySelector('div').innerText;
    const url = pick.getAttribute('href');
    const imgEl = pick.querySelector('img');
    const imgSrc = imgEl ? imgEl.getAttribute('src') : '';
    launchStreamPortal(title, url, imgSrc);
}

async function fetchTopMediaData(type) {
    if (topMediaCache[type]) return topMediaCache[type];

    try {
        const res = await fetch('https://jikan.moe' + type + '?limit=6');
        if (!res.ok) throw new Error('Rate limited');
        const json = await res.json();
        const items = (json.data || []).slice(0, 6).map(function(entry) {
            return {
                title: entry.title_english || entry.title,
                score: entry.score ? entry.score.toFixed(2) : "N/A",
                sub: type === 'anime'
                    ? (entry.episodes ? entry.episodes + ' eps' : 'Airing')
                    : (entry.chapters ? entry.chapters + ' ch' : 'Publishing'),
                img: (entry.images && entry.images.jpg && entry.images.jpg.large_image_url)
                    ? entry.images.jpg.large_image_url
                    : ((entry.images && entry.images.jpg && entry.images.jpg.small_image_url) ? entry.images.jpg.small_image_url : "")
            };
        });
        if (items.length) {
            topMediaCache[type] = items;
            return items;
        }
    } catch (e) {}

    topMediaCache[type] = fallbackTopMedia[type];
    return topMediaCache[type];
}

async function switchTopMedia(type) {
    const animeBtn = document.getElementById('top-anime-btn');
    const mangaBtn = document.getElementById('top-manga-btn');
    if (animeBtn) animeBtn.classList.toggle('active', type === 'anime');
    if (mangaBtn) mangaBtn.classList.toggle('active', type === 'manga');

    const listEl = document.getElementById('top-media-list');
    if (!listEl) return;

    if (!topMediaCache[type]) {
        listEl.innerHTML = '<div class="empty-note">Loading rankings...</div>';
    }

    const items = await fetchTopMediaData(type);
    renderTopMediaList(items.slice(0, 5), type);
}

function renderTopMediaList(items, type) {
    const listEl = document.getElementById('top-media-list');
    if (!listEl) return;
    listEl.innerHTML = '';

    items.forEach(function(item, idx) {
        const row = document.createElement('div');
        row.className = 'top-media-item';
        const thumbHtml = item.img ? '<img src="' + item.img + '" alt="' + item.title + '">' : '';
        row.innerHTML =
            '<div class="top-rank-badge">' + (idx + 1) + '</div>' +
            thumbHtml +
            '<div class="top-media-info">' +
                '<div class="top-media-title" title="' + item.title + '">' + item.title + '</div>' +
                '<div class="top-media-meta">★ ' + item.score + '  •  ' + item.sub + '</div>' +
            '</div>';
        row.addEventListener('click', function() {
            switchTab(type === 'anime' ? 'anime-section' : 'manga-section', null);
        });
        listEl.appendChild(row);
    });
}

async function loadMediaSpotlight(type, containerId) {
    const grid = document.getElementById(containerId);
    if (!grid) return;

    const items = await fetchTopMediaData(type);
    grid.innerHTML = '';

    items.forEach(function(item, idx) {
        const card = document.createElement('div');
        card.className = 'anime-poster-card';
        const imgHtml = item.img
            ? '<img src="' + item.img + '" alt="' + item.title + '" loading="lazy">'
            : '<div style="width:100%;height:100%;background:var(--accent-gradient);opacity:0.35;"></div>';

        card.innerHTML =
            imgHtml +
            '<span class="anime-poster-rank">#' + (idx + 1) + '</span>' +
            '<span class="anime-poster-score">★ ' + item.score + '</span>' +
            '<div class="anime-poster-overlay">' +
                '<div class="anime-poster-title">' + item.title + '</div>' +
                '<div class="anime-poster-sub">' + item.sub + '</div>' +
            '</div>';
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    renderHeroSelectors();
    renderHeroSlide(0);
    loadGamesGrid();
    loadStreamsGrid();
    renderHomeWidgets();
    renderRecentGames();

    switchTopMedia('anime');
    loadMediaSpotlight('anime', 'anime-spotlight-grid');
    setTimeout(function() {
        loadMediaSpotlight('manga', 'manga-spotlight-grid');
    }, 1200);
});
