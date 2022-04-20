const url = 'http://localhost:8080';
let stompClient;
let gameId;
let playerType;

function connectToSocket(gameId) {

    console.log("Connecting to Game, Please Wait.");
    let socket = new SockJS(url + "/gameplay");
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log("Connected to Frame: " + frame);
        stompClient.subscribe("/topic/game-progress/" + gameId, function (response) {
            let data = JSON.parse(response.body);
            console.log(data);
            displayResponse(data);
        })
    })
}

function create_game() {
    let login = document.getElementById("login").value;
    if (login == null || login === '') {
        alert("Enter Player Name");
    } else {
        $.ajax({
            url: url + "/game/start",
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                "login": login
            }),
            success: function (data) {
                gameId = data.gameId;
                playerType = 'X';
                reset();
                connectToSocket(gameId);
                alert("Game Created. Game ID is: " + data.gameId);
                gameOn = true;
            },
            error: function (error) {
                console.log(error);
            }
        })
    }
}


function connect() {
    let login = document.getElementById("login").value;
    if (login == null || login === '') {
        alert("Please Login");
    } else {
        $.ajax({
            url: url + "/game/connect/random",
            type: 'POST',
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                "login": login
            }),
            success: function (data) {
                gameId = data.gameId;
                playerType = 'O';
                reset();
                connectToSocket(gameId);
                alert("Game Connected! You are playing with: " + data.player1.login);
            },
            error: function (error) {
                console.log(error);
            }
        })
    }
}

// function connectToSpecificGame() {
//     let login = document.getElementById("login").value;
//     if (login == null || login === '') {
//         alert("Please Login");
//     } else {
//         let gameId = document.getElementById("game_id").value;
//         if (gameId == null || gameId === '') {
//             alert("Enter Game ID");
//         }
//         $.ajax({
//             url: url + "/game/connect",
//             type: 'POST',
//             dataType: "json",
//             contentType: "application/json",
//             data: JSON.stringify({
//                 "player": {
//                     "login": login
//                 },
//                 "gameId": gameId
//             }),
//             success: function (data) {
//                 gameId = data.gameId;
//                 playerType = 'O';
//                 reset();
//                 connectToSocket(gameId);
//                 alert("Game Connected! Your opponent is: " + data.player1.login);
//             },
//             error: function (error) {
//                 console.log(error);
//             }
//         })
//     }
// }
