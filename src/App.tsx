import React from "react";
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter} from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';

import {UserProvider} from './services/UserContext';

import Routes from './Routes'
import {clientId} from "./config";

const App: React.FC = () => {

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <Container component="main" maxWidth="sm">
                <CssBaseline/>
                <BrowserRouter>
                    <UserProvider>
                        <Routes/>
                    </UserProvider>
                </BrowserRouter>
            </Container>
        </GoogleOAuthProvider>
    );
};

export default App;
