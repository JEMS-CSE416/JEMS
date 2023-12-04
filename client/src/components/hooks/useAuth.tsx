import { useAuthContext } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import {User} from "../../utils/models/User";
export const useAuth = () => {
    const auth = useAuthContext();
    const isLoggedIn = Boolean(auth.user);
    const user = auth.user;

    return {isLoggedIn, user};
};
