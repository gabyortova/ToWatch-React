import { UserContext } from "../components/contexts/UserContex";
import usePersistedState from "../components/hooks/usePersistedState";

export default function UserProvider({ children }) {
  const [authData, setAuthData] = usePersistedState("auth", {});

  const userLoginHandler = (resultData) => {
    setAuthData(resultData);
  };

  const userLogoutHandler = () => {
    localStorage.removeItem("auth");
    setAuthData({});
  };

  const userUpdateHandler = ({ username, email }) => {
    setAuthData({ ...authData, username, email });
  };

  return (
    <UserContext.Provider
      value={{
        ...authData,
        userLoginHandler,
        userLogoutHandler,
        userUpdateHandler,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
