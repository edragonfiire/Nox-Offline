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

function renderHeroSlide(index) {
    currentHeroIndex = (index + heroSlides.length) % heroSlides.length;
    const slide = heroSlides[currentHeroIndex];

    const banner = document.getElementById('hero-banner');
    if (banner) {
        banner.style.backgroundImage = `linear-gradient(to right, rgba(11, 11, 16, 0.95) 36%, rgba(11, 11, 16, 0.25)), url('${slide.img}')`;
    }
    const tagsEl = document.getElementById('hero-tags');
    if (tagsEl) {
        tagsEl.innerHTML = slide.tags.map(t => `<span>${t}</span>`).join('');
    }
    const titleEl = document.getElementById('hero-title');
    if (titleEl) titleEl.innerText = slide.title;

    const descEl = document.getElementById('hero-desc');
    if (descEl) descEl.innerText = slide.desc;

    const metaEl = document.getElementById('hero-meta');
    if (metaEl) metaEl.innerText = slide.meta;

    const playBtn = document.getElementById('hero-play-btn');
    if (playBtn) {
        playBtn.onclick = () => launchStreamPortal(slide.title, slide.href, slide.img);
    }

    document.querySelectorAll('.hero-thumb-card').forEach((card, i) => {
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
    heroSlides.forEach((slide, i) => {
        const card = document.createElement('div');
        card.className = 'hero-thumb-card' + (i === 0 ? ' active' : '');
        card.innerHTML = `
            <img src="${slide.img}" alt="${slide.title}">
            <div>
                <div class="hero-thumb-title">${slide.title}</div>
                <div class="hero-thumb-sub">${slide.tags[0]}</div>
            </div>
        `;
        card.addEventListener('click', () => renderHeroSlide(i));
        row.appendChild(card);
    });
}

function switchTab(sectionId, buttonElement) {
    closeStreamPortal();
    document.querySelectorAll('.tab-content').forEach(panel => {
        panel.style.display = 'none';
    });
    const targetSection = document.getElementById(sectionId);
    if (targetSection) targetSection.style.display = 'block';

    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (buttonElement) {
        buttonElement.classList.add('active');
    }
}

function launchStreamPortal(name, hostUrl, imgSrc = "") {
    if (!hostUrl || hostUrl === 'URL_HERE') return;
    document.getElementById('active-stream-title').innerText = name;
    document.getElementById('nox-secure-iframe').src = hostUrl;
    document.getElementById('inline-stream-layer').style.display = "flex";

    if (hostUrl.startsWith('gamefiles/')) {
        saveRecentGame(name, hostUrl, imgSrc);
    }
}

function closeStreamPortal() {
    const iframe = document.getElementById('nox-secure-iframe');
    if (iframe) iframe.src = "";
    document.getElementById('inline-stream-layer').style.display = "none";
}

function saveRecentGame(title, href, img) {
    let recent = JSON.parse(localStorage.getItem('nox_recent_games')) || [];
    recent = recent.filter(item => item.title !== title);
    recent.unshift({ title, href, img: img || 'gameimages/minecraft.webp' });
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
    recent.forEach(item => {
        const row = document.createElement('div');
        row.className = 'recent-item';
        row.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div>
                <div class="recent-item-title">${item.title}</div>
                <div class="recent-item-sub">Resume</div>
            </div>
        `;
        row.addEventListener('click', () => launchStreamPortal(item.title, item.href, item.img));
        list.appendChild(row);
    });
}

function renderHomeWidgets() {
    const featuredRow = document.getElementById('featured-games-row');
    if (featuredRow) {
        featuredRow.innerHTML = '';
        featuredGamesData.forEach(g => {
            const card = document.createElement('div');
            card.className = 'featured-poster';
            card.innerHTML = `
                <img src="${g.img}" alt="${g.title}">
                <span class="featured-badge">${g.badge}</span>
                <div class="featured-poster-overlay">
                    <div class="featured-poster-title">${g.title}</div>
                    <div class="featured-poster-genre">${g.genre}</div>
                </div>
            `;
            card.addEventListener('click', () => launchStreamPortal(g.title, g.href, g.img));
            featuredRow.appendChild(card);
        });
    }

    const quickList = document.getElementById('quick-launch-list');
    if (quickList) {
        quickList.innerHTML = '';
        quickLaunchData.forEach(q => {
            const item = document.createElement('div');
            item.className = 'quick-item';
            item.innerHTML = `
                <img src="${q.img}" alt="${q.title}">
                <div>
                    <div class="quick-item-title">${q.title}</div>
                    <div class="quick-item-status">${q.tag}</div>
                </div>
            `;
            item.addEventListener('click', () => launchStreamPortal(q.title, q.href, q.img));
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

    streamsList.forEach(item => {
        const container = document.querySelector(`#${item.section} .media-grid`);
        if (!container) return;

        const card = document.createElement('div');
        card.className = 'media-card';
        card.innerHTML = `<h5>${item.title}</h5>`;
        card.addEventListener('click', () => launchStreamPortal(item.title, item.url));
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
function toggleFavoritesFilter() {
showOnlyFavorites = !showOnlyFavorites;
const btn = document.getElementById('fav-filter-btn');
if (btn) btn.classList.toggle('active', showOnlyFavorites);
const gamesTab = document.getElementById('games-section');
if (showOnlyFavorites && gamesTab.style.display === 'none') {
switchTab('games-section', document.getElementById('nav-games'));
}
applyGameFilters();
}
function applyGameFilters() {
const query = (document.getElementById('global-search')?.value || '').toLowerCase();
document.querySelectorAll('#games-section .game-link').forEach(card => {
const title = card.querySelector('div').innerText.toLowerCase();
const matchesSearch = title.includes(query);
const matchesFav = !showOnlyFavorites || card.classList.contains('is-bookmarked');
card.style.display = (matchesSearch && matchesFav) ? 'flex' : 'none';
});
}
function launchRandomGame() {
const links = Array.from(document.querySelectorAll('#games-section .game-link'))
.filter(a => a.getAttribute('href')?.startsWith('gamefiles/'));
if (!links.length) return;
const pick = links[Math.floor(Math.random() * links.length)];
const title = pick.querySelector('div').innerText;
const url = pick.getAttribute('href');
const imgSrc = pick.querySelector('img')?.getAttribute('src') || '';
launchStreamPortal(title, url, imgSrc);
}
document.addEventListener('DOMContentLoaded', () => {
renderHeroSelectors();
renderHeroSlide(0);
loadGamesGrid();
loadStreamsGrid();
renderHomeWidgets();
renderRecentGames();
});
