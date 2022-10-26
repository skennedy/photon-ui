import React from "react";
import Container from '@mui/material/Container';
import {CredentialResponse, GoogleLogin} from '@react-oauth/google';
import {useNavigate} from 'react-router-dom';
import {axiosForToken} from "../config";

const Login: React.FC = () => {
    const navigate = useNavigate();

    const completeLogin = async (googleResponse: CredentialResponse) => {
        if (googleResponse.credential) {
            const idToken = googleResponse.credential;
            try {
                const resp = await axiosForToken(idToken)({
                    url: "/auth/login",
                    method: "POST",
                })

                localStorage.setItem('token', idToken);

                if (resp.data.redirect) {
                    console.log("Redirecting")
                    window.location.href = resp.data.redirect;
                } else {
                    navigate("/")
                }
            } catch (e) {
                console.error(e);
            }
        }
    };

    return (
        <Container>
            <GoogleLogin
                useOneTap
                auto_select
                onSuccess={completeLogin}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </Container>
    );
};

export default Login;
