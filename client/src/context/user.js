import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext(null);

function UserProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        console.log('HI')
        fetch('/check-session')
            .then(r => {
                if (r.ok) {
                    r.json().then(userObj => { console.log(userObj.user); setUser(userObj.user) })
                }
            })
    }, [setUser])


    return <UserContext.Provider value={{ user, setUser }}>{children} </UserContext.Provider>
}



export { UserContext, UserProvider }