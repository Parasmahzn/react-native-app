import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../lib/utils";
const GlobalContext = createContext();

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        getCurrentUser()
            .then(resp => {
                if (resp) {
                    setIsLoggedIn(true);
                    setUser(resp);
                }
                else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false);
            });

    }, []);

    return (
        <GlobalContext.Provider
            value={{
                isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                isLoading
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;