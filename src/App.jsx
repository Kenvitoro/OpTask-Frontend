import { LandingPage } from "./components/LandingPage"
import { SignUp } from "./components/SignUp"
import { SignIn } from "./components/SignIn"
import './index.css'
import { MainInterface } from "./components/MainInterface"
import { useState } from "react"
import { categoryContext, userContext } from "./context"
import { Route, Routes } from "react-router-dom"




export const App = () => {

  const [userId, setUserId] = useState()
  
  const [state, setState] = useState()


  return (
    <div className="overflow-x-hidden">
     <userContext.Provider value={[userId, setUserId]}> 
      <categoryContext.Provider value={[state, setState]}>
        <Routes>
          <Route path="/" element={<LandingPage />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/signin" element={<SignIn />}/>
          <Route path="/interface" element={<MainInterface  />}/>
        </Routes>
      </categoryContext.Provider>
      </userContext.Provider>        
    </div>
  )
}
