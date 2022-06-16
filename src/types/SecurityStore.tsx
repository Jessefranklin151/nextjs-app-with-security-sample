import Credentials from "./Credentials";
import User from "./User";

export default interface SecurityStore {
    user?: User;
    login: (credentials: Credentials) => Promise<User | undefined>;
    logged: boolean;
    token?: string | null;
    signOut: () => void
}