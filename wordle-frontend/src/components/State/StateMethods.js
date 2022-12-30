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
        currentUser: {
            isLoggedIn: false,
            email: '', 
            name: payload.name,
            token: ''
        },
    };
}
