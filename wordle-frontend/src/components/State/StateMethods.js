export const updateUser = (state, payload) => {
    return {
        ...state,
        currentUser: {
        ...state.currentUser,
        ...payload,
        },
    };
}
