import { Form, Button } from "react-bootstrap"

const Lobby = ( { joinRoom, setUserName, setRoom }) => {
    return <Form className='lobby'
        onSubmit={e => {
            e.preventDefault();
            joinRoom();
        }} >
        <Form.Group>
            <Form.Control placeholder='name' onChange={e => setUserName(e.target.value)} />
            <Form.Control placeholder='room' onChange={e => setRoom(e.target.value)} />
        </Form.Group>

        <Button variant='success' type='submit'> Join </Button>
    </Form>
}

export default Lobby;