import { useState } from "react";

import appFirebase from '../src/Credentials'

import { getAuth, onAuthStateChanged } from "firebase/auth"
const auth = getAuth(appFirebase)

import Login from "../src/components/Login"
import Home from '../src/components/Home'

function App(){

    const[user, setUser] = useState(null)
    onAuthStateChanged(auth, (userFirebase) => {
        if(userFirebase){
            setUser(userFirebase)
        }
        else{
            setUser(null)
        }
    })

    return(
        <div>
            {user ? <Home userMail = {user.email} /> : <Login/>}
        </div>          
    )
}

export default App