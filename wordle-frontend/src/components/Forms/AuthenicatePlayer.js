import LoginForm from "./LoginForm";
import GuestForm from "./GuestForm";
import { useState } from "react";
import PlayButtons from "./PlayButtons";

const AuthenticatePlayer = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [guestName, setGuestName] = useState();

    return (
        <div className="d-flex flex-column justify-content-center col-6 mx-auto">
            <div className="standard-border">
                <div className="col-10 mx-auto ">
                <LoginForm 
                    setEmail={setEmail}
                    setPassword={setPassword}
                />
                
                <div className="d-flex justify-content-center mt-2">
                    <span className="white-color text-extra-large"> OR </span>
                </div>

                <GuestForm 
                    setGuestName={setGuestName}
                />
                </div>
            </div>

            <PlayButtons
                email={email}
                password={password}
                guestName={guestName}
            />
        </div>
    )
}

export default AuthenticatePlayer;