import {AxiosInstance} from 'axios';
import {User} from "./UserContext";

export const login = async (axios: AxiosInstance, idToken: string) => {
    const resp = await axios({
        url: "/auth/login",
        method: "POST",
        headers: {
            Authorization: `Bearer ${idToken}`
        },
    })

    localStorage.setItem('token', idToken);

    if (resp.data.redirect) {
        window.location.href = resp.data.redirect;
    }
};

export const isAuthenticated = (axios: AxiosInstance) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return Promise.resolve<User | undefined>(undefined);
    }
    return axios({
        url: "/auth",
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        },
    }).then(() => {
        return {token};
    }).catch(() => {
        return Promise.resolve(undefined);
    });
};