import { useEffect, useState } from "react"
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";


export const User = () => {

  const navigate = useNavigate()

  const [user, setUser] = useState({})

  useEffect(()=>{
    const token = localStorage.getItem("Token").split(" ")[1]
 
    const userPayload = jwtDecode(token)

    setUser(userPayload)

  },[])

  const LogOut = async ()=>{
    localStorage.removeItem("Token")
    localStorage.removeItem("Id")
    navigate("/")
  }

  return (
    <div  className="border-solid border-inColor border-l flex justify-center items-center flex-col gap-5">
      <div className="w-4/5 flex justify-center items-center flex-col">
        <h2 className="text-lg">
          Nombre: {user.name}
        </h2>
        <h2 className="text-lg">
          Apellidos: {user.lastName}
        </h2>
        <h2 className="text-lg">
          {user.email}
        </h2>
      </div>
      <div onClick={LogOut} className="bg-red-500 p-3 cursor-pointer select-none active:scale-95">Log Out</div>
    </div>
  )
}
