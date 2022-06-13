import create from 'zustand';
import { Credentials } from '../models/Credentials';

import jwt_decode from "jwt-decode";

const { REACT_APP_TOKEN_HEADER, REACT_APP_TOKEN_STORAGE_KEY } = process.env;

const setToken = (token: string) => {
    localStorage.setItem(REACT_APP_TOKEN_STORAGE_KEY!, token);
}

const securityStore = create(set => ({
    user: undefined,
    login: async (credentials: Credentials) => {
        return fetch("/login", { body: JSON.stringify(credentials), method: "POST" }).then(res => {
            if (res.status === 200) {
                const token = res.headers.get(REACT_APP_TOKEN_HEADER!);
                setToken(token!);
            }
        });
    }
}));