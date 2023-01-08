import './App.scss';
import AuthenticatePlayer from './components/Forms/AuthenicatePlayer';
import { useStateMachine } from 'little-state-machine';

const App = () => {
    const { state } = useStateMachine();

    // console.log(state.currentUser);
    // console.log(state.opponent);

    return (
        <div>
            <AuthenticatePlayer />
        </div>
    )
}

export default App;
