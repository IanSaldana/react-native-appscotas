import React, {useState, useEffect,createContext} from "react";

const Context = createContext();

const Provider = ({children}) => {
    const [domain,setDomain] = useState("http://10.0.2.2:8000")
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    function initAppSettings(){
        fetch(`${domain}/tesis/pets/`,{
            method: 'GET',
            })
            .then(res=> {
                if (res.ok) {
                    return res.json()
                } else {
                    throw res.json()
                }
            })
            .then(json => {
                console.log(json)
            })
            .catch(error => {
                console.log(error)
            })       
    }

    useEffect(() => {
        initAppSettings()
    })


    const globalContext = {
        isLoggedIn,
        setIsLoggedIn

    }

    return <Context.Provider value = {globalContext}>{children}</Context.Provider>

};

export {Context, Provider}