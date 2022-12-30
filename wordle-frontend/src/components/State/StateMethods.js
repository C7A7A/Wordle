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
            isLoggedIn: false,
            email: '', 
            name: payload.name,
            token: ''
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
