import { UserContext } from "../components/contexts/UserContex";
import usePersistedState from "../components/hooks/usePersistedState";

export default function UserProvider({ children }) {
  const [authData, setAuthData] = usePersistedState("auth", {});

  const userLoginHandler = (resultData) => {
    setAuthData(resultData);
  };

  const userLogoutHandler = () => {
    setAuthData({});
  };

  return (
    <UserContext.Provider
      value={{ ...authData, userLoginHandler, userLogoutHandler }}
    >
      {children}
    </UserContext.Provider>
  );
}
