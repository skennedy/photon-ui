import React from "react";
import Container from '@mui/material/Container';
import {GoogleLogin} from '@react-oauth/google';
import {login} from '../services/AuthService'
import {axios} from '../App';

const Login: React.FC = () => {

    return (
        <Container>
            <GoogleLogin
                useOneTap
                auto_select
                onSuccess={credentialResponse => {
                    if (credentialResponse.credential) {
                        console.log(credentialResponse);
                        login(axios, credentialResponse.credential);
                    }
                }}
                onError={() => {
                    console.log('Login Failed');
                }}
            />
        </Container>
    );
};

export default Login;

// <GoogleOAuthProvider clientId={clientId}>
//     <div>
//         <header className="App-header">
//             <img src={logo} className="App-logo" alt="logo"/>
//             <h1>Photon</h1>
//         </header>
//
//         {authToken
//             ? <div>
//                 <section className="container">
//                     <h3>Albums</h3>
//                     <AlbumList/>
//                 </section>
//
//                 <section className="container">
//                     <h3>Upload</h3>
//                     <Dropzone/>
//                 </section>
//             </div>
//             : <GoogleLogin
//                 useOneTap
//                 auto_select
//                 onSuccess={credentialResponse => {
//                     console.log(credentialResponse);
//                     setAuthToken(credentialResponse.credential)
//                 }}
//                 onError={() => {
//                     console.log('Login Failed');
//                 }}
//             />
//         }
//
//
//     </div>
// </GoogleOAuthProvider>
//