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

    // Speichere die Lobby-Informationen in Firebase
    database.ref('lobbies/' + lobbyId).set({
        password: lobbyPassword,
        players: []
    });

    document.getElementById('lobbyId').textContent = lobbyId;
    document.getElementById('lobbyPassword').textContent = lobbyPassword;
}

function joinLobby(asCreator) {
    const username = asCreator ? document.getElementById('username-creator').value.trim() : document.getElementById('username').value.trim();
    const enteredLobbyId = asCreator ? lobbyId : document.getElementById('lobbyIdInput').value.trim();
    const enteredLobbyPassword = asCreator ? lobbyPassword : document.getElementById('lobbyPasswordInput').value.trim();

    // Überprüfe die Lobby-Informationen in Firebase
    database.ref('lobbies/' + enteredLobbyId).once('value').then((snapshot) => {
        const lobbyData = snapshot.val();
        if (lobbyData && lobbyData.password === enteredLobbyPassword) {
            if (username !== '') {
                if (asCreator) {
                    isCreator = true;
                    document.getElementById('passwordDisplay').style.display = 'block';
                    document.getElementById('lobbyPasswordDisplay').textContent = lobbyPassword;
                }
                players.push(username);
                database.ref('lobbies/' + enteredLobbyId + '/players').set(players);
                updatePlayerList();
                document.getElementById('create-lobby').style.display = 'none';
                document.getElementById('join-lobby').style.display = 'none';
                document.getElementById('lobbyIdDisplay').textContent = enteredLobbyId;
                document.getElementById('lobby').style.display = 'block';
            } else {
                alert('Username cannot be empty');
            }
        } else {
            alert('Invalid Lobby ID or Password');
        }
    });
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

database.ref('lobbies/' + lobbyId + '/players').on('value', (snapshot) => {
    players = snapshot.val() || [];
    updatePlayerList();
});

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

// Firebase-Konfiguration
var firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
// Initialisiere Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

