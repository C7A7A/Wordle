const mainURL = 'https://localhost:7190/';

const rootRoutes = {
    user: mainURL + 'api/v1/User',
    wordle: mainURL + 'api/v1/Wordle'
}

const apiRoutes = {
    startConnection: mainURL + 'room',

    register: rootRoutes.user + '/register',
    login: rootRoutes.user + '/login',
    currentUser: rootRoutes.user + '/currentUser',

    wordle: rootRoutes.wordle,
    wordleGameData: rootRoutes.wordle + '/gameData',
}

export default apiRoutes;