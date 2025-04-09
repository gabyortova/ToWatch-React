import { createContext, useContext } from "react";

export const UserContext = createContext({
    _id: '',
    email: '',
    username: '',
    accessToken: '',
    userLoginHandler: () => null,
    userLogoutHandler: () => null,
    userUpdateHandler: () => null,
});

export function useUserContext() {
    const data = useContext(UserContext);

    return data;
}