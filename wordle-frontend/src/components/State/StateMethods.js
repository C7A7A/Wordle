export const updateUser = (state, payload) => {
    return {
        ...state,
        currentUser: {
        ...state.currentUser,
        ...payload,
        },
    };
}

export const updateUserName = (state, payload) => {
    return {
        ...state,
        currentUser: {
            ...state.currentUser,
            name: payload.name,
        },
    };
}

export const updateUserConnection = (state, payload) => {
    return {
        ...state,
        currentUser: {
            ...state.currentUser,
            connection: payload.connection,
        },
    };
}

export const updateUserRoom = (state, payload) => {
    return {
        ...state,
        currentUser: {
            ...state.currentUser,
            room: payload.room,
        },
    };
}

export const updateUserStatus = (state, payload) => {
    return {
        ...state,
        currentUser: {
            ...state.currentUser,
            status: payload.status,
        },
    };
}


export const updateOpponentName = (state, payload) => {
    return {
        ...state,
        opponent: {
            name: payload.name
        },
    };
}

export const setAnswerResponse = (state, payload) => {
    return {
        ...state,
        answerResponse: payload.response
    };
}

export const setOpponentAnswerResponse = (state, payload) => {
    return {
        ...state,
        opponentAnswerResponse: payload.response
    };
}

export const setAnswerWordle = (state, payload) => {
    return {
        ...state,
        wordleAnswer: payload.wordle
    };
}

export const clearData = (state) => {
    return {
        ...state,
        currentUser: {
            ...state.currentUser,
            status: 'draw'
          },
        
        answerResponse: [],
        opponentAnswerResponse: [],
        wordleAnswer: 'undefined',
    };
}

export const switchRematch = (state) => {
    return {
        ...state, 
        rematch: !state.rematch
    };
}
