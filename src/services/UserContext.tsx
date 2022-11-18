import React, {createContext, useEffect, useState} from 'react';
import Login from '../components/Login';
import {AxiosInstance} from 'axios';
import {makeUseAxios, UseAxios} from 'axios-hooks';
import {axiosForToken} from "../config";


const UserContext = createContext<User | undefined>(undefined);

export interface User {
    token: string
    axios: AxiosInstance
    useAxios: UseAxios
}

const authenticatedUserFromStorage = async (): Promise<User | undefined> => {
    const token = localStorage.getItem('token');
    if (!token) {
        return undefined;
    }

    const axios = axiosForToken(token);

    try {
        await axios({
            url: "/auth",
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        return {token, axios, useAxios: makeUseAxios({axios})};
    } catch {
        return undefined;
    }
};

type Props = {
    children?: React.ReactNode
};

export const UserProvider: React.FC<Props> = ({children}) => {
    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        const checkLoggedIn = async () => {
            let cuser = await authenticatedUserFromStorage();

            setCurrentUser(cuser);
        };

        checkLoggedIn();
    }, []);

    console.log('usercontext', currentUser);

    return (
        <UserContext.Provider value={currentUser}>
            {currentUser ? children : <Login/>}
        </UserContext.Provider>
    );
};


export default UserContext;
