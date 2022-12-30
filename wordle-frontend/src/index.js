import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Profile from './components/Profile';
import Lobby from './components/Forms/Lobby';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from './components/Forms/RegisterForm';
import { Container } from 'react-bootstrap';
import ErrorPage from './components/Common/ErrorPage';
import Game from './components/Board/Game';
import { createStore, StateMachineProvider } from 'little-state-machine';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
  {
    path: "/lobby",
    element: <Lobby />,
  },
  {
    path: "/game/:room",
    element: <Game />,
  },
  {
    path: "/profile/:user",
    element: <Profile />,
  },
]);

createStore({

  currentUser: {
    isLoggedIn: false,
    email: '', 
    name: '',
    token: ''
  }

});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StateMachineProvider>
      <Container fluid>
        <RouterProvider router={router} />
      </Container>
    </StateMachineProvider>
  </React.StrictMode>
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
