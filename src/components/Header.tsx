import { useSecurityStore } from "../stores/SecutiryStore";
import SignInSignUpButtons from "./SignInSignUpButtons";
import UserDropdown from "./UserDropdown";

export default function Header() {

    const { logged } = useSecurityStore();
    
    return (
        <div className="bg-gray-800">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <h1 className="text-white">Security Sample</h1>
                    {logged ? <UserDropdown /> : <SignInSignUpButtons />}
                </div>
            </div>
        </div >
    )
}