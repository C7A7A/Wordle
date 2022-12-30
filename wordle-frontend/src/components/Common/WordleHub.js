import apiRoutes from "./APIRoutes";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

export const startConnection = async (userName, room, state, actions) => {
    try {
        const connection = new HubConnectionBuilder()
        .withUrl(apiRoutes.startConnection)
        .configureLogging(LogLevel.Information)
        .build();
        
        handleHubMethods(connection, state, actions);

        await connection.start();
        await connection.invoke("StartGame", {userName, room});
        
    } catch (error) {
        console.error(error);
    }
}

export const joinRoom = async (userName, room, state, actions) => {
    try {
        const connection = new HubConnectionBuilder()
        .withUrl(apiRoutes.startConnection)
        .configureLogging(LogLevel.Information)
        .build();

        handleHubMethods(connection, state, actions);

        await connection.start();
        await connection.invoke("JoinRoom", {userName, room});

    } catch(error) {
        console.error(error);
    }
}

const handleHubMethods = (connection, state, actions) => {
    console.log(state, actions)
    const currentUserName = state.currentUser.name;

    connection.on("StartGame", (userName, message) => {
        console.log(userName, message);
    });

    connection.on("JoinRoom", (_, userName, message, gameHost) => {
        console.log(userName, message, gameHost);
        if (currentUserName === gameHost) {
            actions.updateOpponentName({name: userName});
        } else {
            actions.updateOpponentName({name: gameHost});
        }
    });

    connection.on("GameOver", (userName, message) => {
        console.log(userName, message)
    });
}