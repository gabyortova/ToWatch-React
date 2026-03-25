import { useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { setLogoutHandler } from "../utils/request";
import { UserContext } from "../components/contexts/UserContex";
import usePersistedState from "../components/hooks/usePersistedState";

export default function UserProvider({ children }) {
  const [authData, setAuthData] = usePersistedState("auth", {});

  const userLoginHandler = (resultData) => {
    setAuthData(resultData);
  };

  const userLogoutHandler = useCallback(
    (isExpired = false) => {
      localStorage.removeItem("auth");
      setAuthData({});

      if (isExpired) {
        toast.error("Session expired. Please login again.");
      }
    },
    [setAuthData],
  );

  const userUpdateHandler = ({ username, email }) => {
    setAuthData({ ...authData, username, email });
  };

  useEffect(() => {
    setLogoutHandler(() => userLogoutHandler(true));
  }, [userLogoutHandler]);

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
