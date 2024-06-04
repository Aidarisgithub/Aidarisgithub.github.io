let players = [];
let lobbyId = '';
let lobbyPassword = '';
let isCreator = false;

function generateRandomId(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

function showCreateLobby() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('create-lobby').style.display = 'block';
}

function showJoinLobby() {
    document.getElementById('home').style.display = 'none';
    document.getElementById('join-lobby').style.display = 'block';
}

function createLobby() {
    lobbyId = generateRandomId(8);
    lobbyPassword = generateRandomId(10);

    document.getElementById('lobbyId').textContent = lobbyId;
    document.getElementById('lobbyPassword').textContent = lobbyPassword;
}

function joinLobby(asCreator) {
    const username = asCreator ? document.getElementById('username-creator').value.trim() : document.getElementById('username').value.trim();
    const enteredLobbyId = asCreator ? lobbyId : document.getElementById('lobbyIdInput').value.trim();
    const enteredLobbyPassword = asCreator ? lobbyPassword : document.getElementById('lobbyPasswordInput').value.trim();

    if (username !== '' && enteredLobbyId === lobbyId && enteredLobbyPassword === lobbyPassword) {
        if (asCreator) {
            isCreator = true;
            document.getElementById('passwordDisplay').style.display = 'block';
            document.getElementById('lobbyPasswordDisplay').textContent = lobbyPassword;
        }
        players.push(username);
        updatePlayerList();
        document.getElementById('create-lobby').style.display = 'none';
        document.getElementById('join-lobby').style.display = 'none';
        document.getElementById('lobbyIdDisplay').textContent = lobbyId;
        document.getElementById('lobby').style.display = 'block';
    } else {
        alert('Invalid Lobby ID or Password');
    }
}

function updatePlayerList() {
    const playersDiv = document.getElementById('players');
    playersDiv.innerHTML = '';
    players.forEach(player => {
        const playerDiv = document.createElement('div');
        playerDiv.textContent = player;
        playersDiv.appendChild(playerDiv);
    });
}

function startGame() {
    if (players.length >= 2) {
        document.getElementById('lobby').style.display = 'none';
        document.getElementById('game').style.display = 'block';
        initializeGame();
    } else {
        alert('At least 2 players required to start the game!');
    }
}

function initializeGame() {
    // Hier kannst du die Logik für die Spielinitialisierung hinzufügen
    // Zum Beispiel: Frage laden, Spielbrett anzeigen, Timer starten usw.
}
