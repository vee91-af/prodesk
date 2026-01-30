const API_URL = "https://api.github.com/users/";

// View Toggling Logic
const searchBtn = document.getElementById('search-mode-btn');
const battleBtn = document.getElementById('battle-mode-btn');
const searchSection = document.getElementById('search-section');
const battleSection = document.getElementById('battle-section');

searchBtn.addEventListener('click', () => {
    toggleMode(searchBtn, searchSection, battleBtn, battleSection);
});

battleBtn.addEventListener('click', () => {
    toggleMode(battleBtn, battleSection, searchBtn, searchSection);
});

function toggleMode(activeBtn, activeSec, inactiveBtn, inactiveSec) {
    activeBtn.classList.add('active');
    inactiveBtn.classList.remove('active');
    activeSec.classList.add('active-view');
    inactiveSec.classList.remove('active-view');
}

// Helper: Format Date
function formatDate(isoString) {
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    return new Date(isoString).toLocaleDateString('en-GB', options);
}

// Logic: Fetch User Data
async function fetchUser(username) {
    const response = await fetch(API_URL + username);
    if (!response.ok) throw new Error("User Not Found");
    return await response.json();
}

// Logic: Fetch Repos
async function fetchRepos(username) {
    const response = await fetch(`${API_URL}${username}/repos?sort=created&per_page=5`);
    return await response.json();
}

// UI: Render Single Profile
async function renderProfile(username) {
    const container = document.getElementById('profile-container');
    const status = document.getElementById('status-msg');
    container.innerHTML = "";
    status.innerText = "LOADING...";

    try {
        const user = await fetchUser(username);
        const repos = await fetchRepos(username);

        status.innerText = "";
        container.innerHTML = `
            <div class="profile-card">
                <img src="${user.avatar_url}" class="avatar">
                <div class="info">
                    <h2>${user.name || user.login}</h2>
                    <p>${user.bio || "This player has no bio."}</p>
                    <p>Joined: ${formatDate(user.created_at)}</p>
                    <p>Followers: ${user.followers}</p>
                    <div class="repo-list">
                        <strong>Recent Missions (Repos):</strong>
                        ${repos.map(r => `<a href="${r.html_url}" target="_blank" class="repo-item">${r.name}</a>`).join('')}
                    </div>
                </div>
            </div>
        `;
    } catch (err) {
        status.innerText = "PLAYER ELIMINATED: USER NOT FOUND";
        status.style.color = "var(--red)";
    }
}

// Logic: Battle Mode
async function runBattle() {
    const p1Name = document.getElementById('player1-input').value;
    const p2Name = document.getElementById('player2-input').value;
    const results = document.getElementById('battle-results');
    results.innerHTML = "CALCULATING...";

    try {
        const p1 = await fetchUser(p1Name);
        const p2 = await fetchUser(p2Name);

        const p1Score = p1.followers + p1.public_repos;
        const p2Score = p2.followers + p2.public_repos;

        results.innerHTML = `
            <div class="battle-results">
                <div class="profile-card ${p1Score >= p2Score ? 'winner' : 'loser'}">
                    <img src="${p1.avatar_url}" class="avatar">
                    <div class="info"><h3>${p1.login}</h3><p>Score: ${p1Score}</p></div>
                </div>
                <div class="profile-card ${p2Score >= p1Score ? 'winner' : 'loser'}">
                    <img src="${p2.avatar_url}" class="avatar">
                    <div class="info"><h3>${p2.login}</h3><p>Score: ${p2Score}</p></div>
                </div>
            </div>
        `;
    } catch (err) {
        results.innerHTML = "Error: Ensure both usernames are valid.";
    }
}

// Event Listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const user = document.getElementById('username-input').value;
    if(user) renderProfile(user);
});

document.getElementById('battle-btn').addEventListener('click', runBattle);