import type User from "./User";
import type Credentials from "./Credentials";

export default interface SecurityStore {
    user?: User;
    login: (credentials: Credentials) => Promise<User | undefined>;
    logged: boolean;
    token?: string | null;
    signOut: () => void,
    getUser: () => Promise<User>
}