import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { fetchApi } from "../utils";

const UserContext = createContext(null);

function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchApi('/check-session')
            .then(r => {
                if (r.ok) {
                    r.json().then(userObj => { 
                        setUser(userObj.user)
                        
                        if (!userObj.user) {
                            navigate('/authentication')
                        }
                    })
                } else {
                    navigate('/authentication')
                }

            })
    }, [setUser])


    return <UserContext.Provider value={{ user, setUser }}>{children} </UserContext.Provider>
}



export { UserContext, UserProvider }