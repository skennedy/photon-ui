import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import {makeUseAxios} from 'axios-hooks';

import { UserProvider } from './services/UserContext';

import Routes from './Routes'
import {clientId} from "./config";

const App: React.FC = () => {

    return (
        <GoogleOAuthProvider clientId={clientId}>
            <CssBaseline />
            <BrowserRouter>
                <UserProvider>
                    <Routes />
                </UserProvider>
            </BrowserRouter>
        </GoogleOAuthProvider>
    );
};

export default App;
