export const initWordleArray = () => {
    var x = new Array(6);

    for (let i = 0; i < x.length; i++) {
        x[i] = new Array(5);
        for (let j = 0; j < 5; j++) {
            x[i][j] = "standard-bg-color";
        }
    }

    return x;
}

export const generateGuestName = (length) => {
    var result = 'guest-';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
}