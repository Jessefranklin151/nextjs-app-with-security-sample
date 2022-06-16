import type User from "./User";
import type Credentials from "./Credentials";

export default interface SecurityStore {
    user?: User;
    login: (credentials: Credentials) => Promise<Response>;
    logged: boolean;
    token?: string | null;
    signOut: () => void,
    getUser: () => Promise<User>
}