import { Form } from "react-bootstrap";

const GuestForm = ({setGuestName}) => {
    return (
        <Form className="d-flex flex-column justify-content-center">
            <div className="col-12 mx-auto p-2">
                <Form.Group className="d-flex justify-content-center" controlid="formTitle">
                <div className="d-flex justify-content-center col-8 standard-border-bottom">
                        <Form.Text>
                            <span className="standard-color text-extra-large "> Play as Guest </span>
                        </Form.Text>
                    </div>
                </Form.Group>   

                <Form.Group className="mb-4" controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" onChange={e => setGuestName(e.target.value)} />
                </Form.Group>
            </div>
        </Form>
    )
}

export default GuestForm;