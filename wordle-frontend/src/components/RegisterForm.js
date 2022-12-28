import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setconfirmPassword] = useState();
    const navigate = useNavigate();

    const allowRegister = () => {
        return !name || !email || !password || !confirmPassword
    }

    const handleSubmit = () => {
        console.log("Register User");
        navigate("/");
    }

    return (
        <Form className="d-flex flex-column justify-content-center mt-5">
            <div className="col-6 mx-auto p-2">
                <Form.Group className="d-flex justify-content-center" controlid="formTitle">
                    <div className="d-flex justify-content-center col-8 standard-border-bottom">
                        <Form.Text>
                            <span className="standard-color text-extra-large "> Register </span>
                        </Form.Text>
                    </div>
                </Form.Group>   

                <Form.Group className="mb-2" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" onChange={e => setName(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicPasswordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm password" onChange={e => setconfirmPassword(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-2 d-flex flex-row-reverse" controlid="formLogin">
                    <Form.Text className="m-1">
                        <Link to="/" className='no-text-decoration' > <span className="standard-color"> You have an account? Login! </span> </Link>
                    </Form.Text>
                </Form.Group>

                <div className="d-flex justify-content-center">
                    <Button variant="standard" type="button" disabled={allowRegister()} onClick={handleSubmit}>
                        Register
                    </Button>
                </div>
            </div>
        </Form>
    )
}

export default RegisterForm;