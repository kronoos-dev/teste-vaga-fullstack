import axios, { AxiosError } from 'axios';


export function setupAPIClient() {
    const api = axios.create({
        baseURL: 'http://localhost:3000',
    });

    return api;
}
