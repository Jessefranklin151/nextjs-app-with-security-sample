import create from 'zustand';
import { persist } from 'zustand/middleware';
import type Credentials from '../types/Credentials';
import type SecurityStore from '../types/SecurityStore';

import HttpClient from '../core/http-client-adapter';

const useSecurityStore = create<SecurityStore>(
    persist(
        (set, _get) => ({
            user: undefined,
            logged: false,
            token: undefined,
            login: async (credentials: Credentials) => {
                const response = await HttpClient.post("/api/login", credentials)
                if (response.status === 200) {
                    const authToken = response.headers.get("Authorization");
                    const user = await response.json();
                    set(({ token: authToken, logged: true, user }))
                }
                return response;
            },
            getUser: async () => {
                const response = await HttpClient.get("/api/user");
                const user = await response.json();
                set(({ user }))
                return user;
            },
            signOut: () => set(() => ({ token: undefined, logged: false, user: undefined })),
        }),
        {
            name: "auth_store"
        }
    )
);

export default useSecurityStore;