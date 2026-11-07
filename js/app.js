function switchTab(sectionId, buttonElement) {
    closeStreamPortal();
    document.querySelectorAll('.tab-content').forEach(panel => {
        panel.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
    document.querySelectorAll('.nav-tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    if (buttonElement) {
        buttonElement.classList.add('active');
    }
}

function launchStreamPortal(name, hostUrl) {
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

    gridContainer.innerHTML = games;

    gridContainer.querySelectorAll('.game-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const title = this.querySelector('div').innerText;
            const url = this.getAttribute('href');
            launchStreamPortal(title, url);
        });
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
});
