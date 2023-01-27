import axios, {AxiosInstance} from 'axios';

export const axiosForToken = (idToken: string): AxiosInstance => axios.create({
    baseURL: window.env.API_URL,
    headers: {
        Authorization: `Bearer ${idToken}`
    }
});
