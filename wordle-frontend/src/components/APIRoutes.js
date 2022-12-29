const mainURL = 'https://localhost:7190/';

const rootRoutes = {
    user: mainURL + 'api/v1/User',
    wordle: mainURL + 'api/v1/Wordle'
}

const apiRoutes = {
    startConnection: mainURL + 'room',

    user: rootRoutes.user,
    currentUser: rootRoutes.user + '/currentUser',

    wordle: rootRoutes.wordle,
}

export default apiRoutes;