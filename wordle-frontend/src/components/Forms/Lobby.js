import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Lobby = () => {
    const [room, setRoom] = useState();
    const navigate = useNavigate();

    const handlePlay = () => {
        navigate(`/game/${room}`)
    }

    // const joinRoom = async () => {
    //     try {
    //         const connection = new HubConnectionBuilder()
    //         .withUrl(apiRoutes.startConnection)
    //         .configureLogging(LogLevel.Information)
    //         .build();

    //         connection.on("JoinRoom", (userName, message) => {
    //             console.log(userName, message);
    //         });
    
    //         await connection.start();
    //         await connection.invoke("JoinRoom", {userName, room});
    //         setConnection(connection);

    //     } catch(error) {
    //         console.error(error);
    //     }
    // }

    return (
        <Form className="d-flex flex-column justify-content-center mt-4">
            <div className="col-6 mx-auto p-2">
                <Form.Group className="d-flex justify-content-center mb-2" controlid="formTitle">
                    <div className="d-flex justify-content-center col-8 standard-border-bottom">
                        <Form.Text>
                            <span className="standard-color text-extra-large "> Join Room </span>
                        </Form.Text>
                    </div>
                </Form.Group>   

                <Form.Group className="mb-2" controlId="formRoom">
                    <Form.Label>Room code</Form.Label>
                    <Form.Control type="text" placeholder="Enter room code" onChange={e => setRoom(e.target.value)} />
                </Form.Group>

                <div className="d-flex justify-content-center mt-3">
                    <Button variant="standard" type="button" disabled={!room} onClick={handlePlay} >
                        Play
                    </Button>
                </div>
            </div>
        </Form>
    )
}

export default Lobby;
