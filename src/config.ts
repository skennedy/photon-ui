import axios, {AxiosInstance} from 'axios';

export const clientId = '130594197045-8b15dglnmepjhei5svpth3v8sjlt60m0.apps.googleusercontent.com';

export const apiBase = "http://localhost:8080";

export const axiosForToken = (idToken: string): AxiosInstance => axios.create({
    baseURL: apiBase,
    headers: {
        Authorization: `Bearer ${idToken}`
    }
});
