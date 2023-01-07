import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiRoutes from "../Common/APIRoutes";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
    const { register, handleSubmit, watch, formState: { errors }} = useForm();
    const navigate = useNavigate();

    const onSubmit = (data) => {

        const registerData = {
            "email": data.email,
            "password": data.password,
            "passwordConfirmation": data.confirmPassword,
            "name": data.name
          }

        axios.post(apiRoutes.register, registerData)
            .then(response => {
                if (response.status === 200) {
                    navigate("/");
                }

                return;
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <Form 
            className="d-flex flex-column justify-content-center"
            onSubmit={handleSubmit(onSubmit)}
        >
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
                    <Form.Control 
                        type="text" 
                        placeholder="Enter your name" 
                        {...register("name", { required: "Name is required" })} 
                    />
                    {errors.name && (
                        <Form.Text className="text-danger">
                            {errors.name.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        {...register("email", {
                            required: "Email is required",
                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                        })}
                    />
                    {errors.email && (
                        <Form.Text className="text-danger">
                            {errors.email.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        {...register("password", {
                            required: 'Password is required',
                            minLength: {value: 6, message: "Password must have at least 6 characters"}
                        })}
                    />
                    {errors.password && (
                        <Form.Text className="text-danger">
                            {errors.password.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-2" controlId="formBasicPasswordConfirm">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Confirm password" 
                        {...register("confirmPassword", {
                            required: "Confirm password is required",
                            validate: (val) => {
                                if (watch('password') !== val) {
                                    return "Your passwords do not match";
                                }
                            }
                        })}
                    />
                    {errors.confirmPassword && (
                        <Form.Text className="text-danger">
                            {errors.confirmPassword.message}
                        </Form.Text>
                    )}
                </Form.Group>

                <Form.Group className="mb-2 d-flex flex-row-reverse" controlid="formLogin">
                    <Form.Text className="m-1">
                        <Link to="/" className='no-text-decoration' > <span className="link-standard-color"> You have an account? Login! </span> </Link>
                    </Form.Text>
                </Form.Group>

                <div className="d-flex justify-content-center">
                    <Button variant="standard" type="submit">
                        Register
                    </Button>
                </div>
            </div>
        </Form>
    )
}

export default RegisterForm;