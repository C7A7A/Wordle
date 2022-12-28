import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorPage from './components/ErrorPage'
import Profile from './components/Profile';
import Game from './components/Game';
import Lobby from './components/Lobby';
import 'bootstrap/dist/css/bootstrap.min.css';
import RegisterForm from './components/RegisterForm';
import { Container } from 'react-bootstrap';

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Container fluid>
      <RouterProvider router={router} />
    </Container>
  </React.StrictMode>
)


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
