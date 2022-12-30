import LoginForm from "./LoginForm";
import GuestForm from "./GuestForm";
import { useState } from "react";
import PlayButtons from "./PlayButtons";
import axios from "axios";
import apiRoutes from "../Common/APIRoutes";
import { useStateMachine } from "little-state-machine";
import { updateUser } from "../State/StateMethods";

const AuthenticatePlayer = () => {
    const { state, actions } = useStateMachine({ updateUser });
    const [email, setEmail] = useState(state.currentUser.email);
    const [password, setPassword] = useState();
    const [guestName, setGuestName] = useState();

    const handleLogin = async () => {
        const loginData = {
            'email': email,
            'password': password
        }

        return await axios.post(apiRoutes.login, loginData)
            .then(response => {
                if (response.status === 200) {
                    let token = response.data
                    
                    getCurrentUser(token).then(data => {
                        actions.updateUser({
                            isLoggedIn: true,
                            email: email,
                            name: data.name,
                            token: token
                        });
                    });
                    
                    return true;
                }
                return false;
            })
            .catch(error => {
                console.error(error);
                return false;
            });
    }

    const getCurrentUser = async (token) => {
        const headers = {
            'Authorization': `Bearer ${token}`,
        }

        return await axios.get(apiRoutes.currentUser, { headers })
            .then(response => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch(error => {
                console.error(error)
            });
    }

    return (
        <div className="d-flex flex-column justify-content-center col-6 mx-auto">
            <div className="standard-border">
                <div className="col-10 mx-auto ">
                <LoginForm 
                    email={email}
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
                handleLogin={handleLogin}
            />
        </div>
    )
}

export default AuthenticatePlayer;