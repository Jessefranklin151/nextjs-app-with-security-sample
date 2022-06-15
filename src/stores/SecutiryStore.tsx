import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Credentials } from '../models/Credentials';

// const { REACT_APP_TOKEN_HEADER, REACT_APP_TOKEN_STORAGE_KEY } = process.env;

interface TokenStore {
    token?: string;
    setToken?: (token: string | undefined) => void
}

interface SecutiryStore {
    user: User | undefined;
    login: (credentials: Credentials) => Promise<void | Response>
}

interface User {
    name: string;
    email: string;
}


const tokenStore = create(
    persist(
        (set, get) => ({
            token: undefined,
            setToken: () => set((token) => ({ token }))
        }),
        {
            name: "AUTH_TOKEN",
            getStorage: () => sessionStorage,
        }
    ));

export const securityStore = create<SecutiryStore>(set => ({
    user: undefined,
    login: async (credentials: Credentials) => {
        console.log(credentials);
        return fetch("/login", { body: JSON.stringify(credentials), method: "POST" }).then(res => {
            if (res.status === 200) {
                // const token = res.headers.get(REACT_APP_TOKEN_HEADER!);
                // const { setToken } = tokenStore();

                // setToken(token);
            }
        });
    }
}));