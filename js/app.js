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

function launchStreamPortal(name, hostUrl) {
    if (!hostUrl || hostUrl === 'URL_HERE') return;
    document.getElementById('active-stream-title').innerText = "Playing: " + name;
    document.getElementById('nox-secure-iframe').src = hostUrl;
    document.getElementById('inline-stream-layer').style.display = "flex";
}

function closeStreamPortal() {
    const iframe = document.getElementById('nox-secure-iframe');
    if (iframe) iframe.src = "";
    document.getElementById('inline-stream-layer').style.display = "none";
}

function loadGamesGrid() {
    const gridContainer = document.querySelector('#games-section .media-grid');
    if (!gridContainer || typeof games === 'undefined') return;

    gridContainer.innerHTML = games.replace(/<img /g, '<img loading="lazy" ');

    gridContainer.addEventListener('click', function(e) {
        if (e.target.closest('.gams-star')) return;
        const link = e.target.closest('.game-link');
        if (!link) return;

        e.preventDefault();
        const title = link.querySelector('div').innerText;
        const url = link.getAttribute('href');
        launchStreamPortal(title, url);
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

function filterGames() {
    const query = document.getElementById('game-search').value.toLowerCase();
    document.querySelectorAll('#games-section .game-link').forEach(card => {
        const title = card.querySelector('div').innerText.toLowerCase();
        card.style.display = title.includes(query) ? 'flex' : 'none';
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadGamesGrid();
    loadStreamsGrid();
});
