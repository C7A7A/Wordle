import apiRoutes from "./APIRoutes";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export const startConnection = async (userName, room, actions) => {
    try {
        const connection = new HubConnectionBuilder()
        .withUrl(apiRoutes.startConnection)
        .configureLogging(LogLevel.Information)
        .build();
        
        handleHubMethods(connection, userName, actions);

        await connection.start();
        console.log("START_GAME");
        await connection.invoke("StartGame", {userName, room});

        actions.updateUserConnection({connection: connection});
        actions.updateUserRoom({room: room});
    } catch (error) {
        console.error(error);
    }
}

export const joinRoom = async (userName, room, actions) => {
    try {
        const connection = new HubConnectionBuilder()
        .withUrl(apiRoutes.startConnection)
        .configureLogging(LogLevel.Information)
        .build();

        handleHubMethods(connection, userName, actions);

        await connection.start();
        console.log("JOIN_ROOM");
        await connection.invoke("JoinRoom", {userName, room});

        actions.updateUserConnection({connection: connection});
        actions.updateUserRoom({room: room});
    } catch(error) {
        console.error(error);
    }
}

export const checkAnswer = async (connection, userName, room, answer) => {
    console.log(connection, userName, room, answer);
    try {
        await connection.invoke("CheckAnswer", {userName, room}, answer);
    } catch(error) {
        console.error(error);
    }
}

export const lastAnswer = async (connection, userName, room, answer) => {
    console.log(connection, userName, room, answer);
    try {
        await connection.invoke("LastAnswer", {userName, room}, answer);
    } catch(error) {
        console.error(error);
    }
}

export const playAgain = async (connection, userName, room) => {
    console.log("PLAY_AGAIN");
    try {
        await connection.invoke("PlayAgain", {userName, room});
    } catch(error) {
        console.error(error);
    }
}

const handleHubMethods = (connection, currentUserName, actions) => {
    console.log('handleHubMethods:', actions)

    connection.on("StartGame", (userName, message) => {
        console.log(userName, message);
    });

    connection.on("JoinRoom", (_, userName, message, gameHost) => {
        console.log(userName, message, gameHost);
        console.log('current: ', currentUserName);

        if (currentUserName === gameHost) {
            actions.updateOpponentName({name: userName});
        } else {
            actions.updateOpponentName({name: gameHost});
        }
    });

    connection.on("CheckAnswer", (userName, response) => {
        console.log(userName, response);
        setAnswerResponse(currentUserName, userName, actions, response);
    });

    connection.on("CorrectAnswer", (userName, response, answer) => {
        console.log(userName, response, answer);
        setAnswerResponse(currentUserName, userName, actions, response);
        actions.setAnswerWordle({wordle: answer});
        updateUserStatus(currentUserName, userName, actions);
    });

    connection.on("LastAnswer", (userName, response, answer) => {
        console.log(userName, response, answer);
        setAnswerResponse(currentUserName, userName, actions, response);
        actions.setAnswerWordle({wordle: answer});
        updateUserStatusOnLastAnswer(currentUserName, userName, actions);
    });

    connection.on("PlayAgain", (_, message) => {
        console.log(message);
        actions.switchRematch();
    });

    connection.on("GameOver", (_, userName, message, answer) => {
        console.log(userName, message, answer);
        actions.setAnswerWordle({wordle: answer});
        updateUserStatusOnLastAnswer(currentUserName, userName, actions);
        
        actions.updateOpponentName({name: "LEFT THE GAME"});
    });
}

const setAnswerResponse = (currentUserName, userName, actions, response) => {
    if (currentUserName === userName) {
        actions.setAnswerResponse({response: response});
    } else {
        actions.setOpponentAnswerResponse({response: response});
    }
}

const updateUserStatus = (currentUserName, userName, actions) => {
    if (currentUserName === userName) {
        actions.updateUserStatus({status: "Won"});
    } else {
        actions.updateUserStatus({status: "Lost"});
    }
}

const updateUserStatusOnLastAnswer = (currentUserName, userName, actions) => {
    if (currentUserName === userName) {
        actions.updateUserStatus({status: "Lost"});
    } else {
        actions.updateUserStatus({status: "Won"});
    }
}