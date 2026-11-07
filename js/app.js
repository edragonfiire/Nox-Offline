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
    if (!gridContainer || typeof noxGamesDatabase === 'undefined') return;

    gridContainer.innerHTML = ''; 

    noxGamesDatabase.forEach(game => {
        const card = document.createElement('div');
        card.className = 'media-card';
        
        card.onclick = function() {
            launchStreamPortal(game.title, `./games/${game.folder}/index.html`);
        };

        card.innerHTML = `<h5>${game.title}</h5>`;
        gridContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadGamesGrid();
});

