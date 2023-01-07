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
    const [error, setError] = useState('');

    const handleLogin = () => {
        const loginData = {
            'email': email,
            'password': password
        }

        return axios.post(apiRoutes.login, loginData)
            .then(response => {
                if (response.status === 200) {
                    let token = response.data
                    
                    getCurrentUser(token).then(data => {
                        console.log("data:", data)
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
                setError("Invalid email or password")
                console.error(error);
                return false;
            });
    }

    const getCurrentUser = (token) => {
        const headers = {
            'Authorization': `Bearer ${token}`,
        }

        return axios.get(apiRoutes.currentUser, { headers })
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
        <div className="d-flex flex-column justify-content-center">
            <div className="col-6 mx-auto">
                <LoginForm 
                    email={email}
                    setEmail={setEmail}
                    setPassword={setPassword}
                    error={error}
                />
                
                <div className="d-flex justify-content-center mt-2">
                    <span className="white-color text-extra-large"> OR </span>
                </div>

                <GuestForm 
                    setGuestName={setGuestName}
                />


                <hr className="standard-border-bottom"/>

                <PlayButtons
                    email={email}
                    password={password}
                    guestName={guestName}
                    handleLogin={handleLogin}
                    setError={setError}
                />
            </div>
        </div>
    )
}

export default AuthenticatePlayer;