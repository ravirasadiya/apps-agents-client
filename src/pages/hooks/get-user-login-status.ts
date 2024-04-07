import { useEffect, useState } from "react";
import { getLocalStorage, LocalStorageKeys, setLocalStorage } from "../helper";

// [TODO] we can use this custom hook for getting user information.

// export const useUser = () => {
//     const [token, setToken] = useToken();

//     const [user, setUser] = useState(() => {
//         if (!token) return null;
//         return getLocalStorage(LocalStorageKeys.ACCESS_TOKEN);
//     });

//     useEffect(() => {
//         if (!token) {
//             setUser(null);
//         } else {
//             setUser(getPayloadFromToken(token));
//         }
//     }, [token]);

//     const logout = () => {
//         setUser(null);
//         setToken(null);
//     };

//     return { user, logout };
// }

export const defineWindows = typeof window !== "undefined";

export const useToken = () => {
  const [token, setTokenInternal] = useState(() => {
    if (defineWindows) {
      return getLocalStorage(LocalStorageKeys.ACCESS_TOKEN);
    } else {
      return "";
    }
  });

  useEffect(() => {
    if (defineWindows) {
      setLocalStorage(LocalStorageKeys.ACCESS_TOKEN, token);
    }
  }, [token]);

  const setToken = (newToken: any) => {
    setTokenInternal(newToken);
  };

  return [token, setToken];
};
