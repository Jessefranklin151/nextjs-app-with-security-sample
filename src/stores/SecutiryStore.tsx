import create from 'zustand';
import { persist } from 'zustand/middleware';
import { Credentials } from '../models/Credentials';

interface SecurityStore {
    user?: User;
    login: (credentials: Credentials) => Promise<User | undefined>;
    logged: boolean;
    token?: string | null;
    signOut: () => void
}

interface User {
    name: string;
    email: string;
}

export const useSecurityStore = create<SecurityStore>(
    persist(
        (set, get) => ({
            user: undefined,
            logged: false,
            token: undefined,
            login: async (credentials: Credentials) => {
                console.log(credentials);
                const response = await fetch("/api/login", { body: JSON.stringify(credentials), method: "POST" });
                if (response.status === 200) {
                    const authToken = response.headers.get("Authorization");
                    const user = await response.json();
                    console.log(user);
                    set(({ token: authToken, logged: true, user }))
                    return user;
                }
            },
            signOut: () => set(() => ({ token: undefined, logged: false, user: undefined }))
        }),
        {
            name: "auth_store"
        }
    )
);