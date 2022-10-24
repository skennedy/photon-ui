import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axiosFactory from 'axios';
import {makeUseAxios} from 'axios-hooks';

import { UserProvider } from './services/UserContext';

import Routes from './Routes'

const clientId = '130594197045-8b15dglnmepjhei5svpth3v8sjlt60m0.apps.googleusercontent.com';

export const axios = axiosFactory.create({ baseURL: "http://localhost:8080" });
export const useAxios = makeUseAxios({ axios });

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
