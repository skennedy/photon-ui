import React, {createContext, useEffect, useState} from 'react';
import Login from '../components/Login';
import {isAuthenticated} from './AuthService';
import {axios} from "../App";

const UserContext = createContext<[User | undefined, (u: User | undefined) => void]>([undefined, () => {}]);

export interface User {
    token: string
}

export const UserProvider: React.FC = ({children}) => {
    const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

    useEffect(() => {
        const checkLoggedIn = async () => {
            let cuser = await isAuthenticated(axios);

            setCurrentUser(cuser);
        };

        checkLoggedIn();
    }, []);

    console.log('usercontext', currentUser);

    return (
        <UserContext.Provider value={[currentUser, setCurrentUser]}>
            {currentUser ? children : <Login/>}
        </UserContext.Provider>
    );
};


export default UserContext;
