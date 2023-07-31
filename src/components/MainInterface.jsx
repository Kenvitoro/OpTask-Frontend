import { CategoryList } from "./Category/CategoryList"
import { Tasks } from "./Tasks"
import { User } from "./User"
import { Navigate } from "react-router-dom"

// eslint-disable-next-line react/prop-types
export const MainInterface = () => {

  const user = localStorage.getItem("Token")

  if(!user){
    return   <Navigate to="/"/>
  } 


  return (
    <>
      <div className="h-screen w-screen bg-bgColor flex items-center flex-col">
          <div className="bg-inColor w-full text-center p-3">
            <h1 className="text-5xl">Optimal<span className="text-cnColor">Task</span></h1>  
          </div>
          <div className="w-full h-full grid grid-cols-1161 md:grid-cols-121 overflow-hidden">
            <CategoryList />
            <Tasks />
            <User />
          </div>
      </div>
    
    </>
  )
}
