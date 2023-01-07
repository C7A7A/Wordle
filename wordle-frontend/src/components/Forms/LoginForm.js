import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const LoginForm = ({email, setEmail, setPassword, error}) => {
    return (
        <Form className="d-flex flex-column justify-content-center">
            <div className="col-12 mx-auto p-2">
                <Form.Group className="d-flex justify-content-center mb-2" controlid="formTitle">
                    <div className="d-flex justify-content-center col-8 standard-border-bottom">
                        <Form.Text>
                            <span className="standard-color text-extra-large "> Login </span>
                        </Form.Text>
                    </div>
                </Form.Group>   

                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        value={email} 
                        type="email" 
                        placeholder="Enter email" 
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        onChange={e => setPassword(e.target.value)} 
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Text className="text-danger">
                        {error}
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-2 d-flex flex-row-reverse" controlid="formRegister">
                    <Form.Text className="m-1">
                        <Link to="/register" className='no-text-decoration' > <span className="link-standard-color"> You don't have an account? Register now! </span> </Link>
                    </Form.Text>
                </Form.Group>
            </div>
        </Form>
    )
}

export default LoginForm;