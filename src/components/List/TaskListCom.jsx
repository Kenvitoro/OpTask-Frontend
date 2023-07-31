import { faCircle, faCircleCheck } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useState, useRef, useEffect } from "react"

// eslint-disable-next-line react/prop-types
export const TaskListCom = ({tittle, status, id, UpdateListInfo}) => {

  const userToken = localStorage.getItem("Token")

  // eslint-disable-next-line no-unused-vars
  const [taskStatus, setTaskStatus] = useState(status)

  const taskCom = useRef()

  useEffect(()=>{
    const setFirstStatus=()=>{
      if(taskStatus){
        taskCom.current.classList.add("statusTrue")
      }else{
        taskCom.current.classList.add("statusFalse")
      }
    }

    setFirstStatus()
  },[])

  


  const changeStatus =()=>{

    if(taskStatus){

      fetch("http://localhost:3000/api/Task", {
      method: "PATCH",
      headers: {
        "content-type" : "application/json",
        "authorization" : userToken
      },
      body: JSON.stringify({
        id : id,
        status : false
      })
      })
      .then(()=>setStatusFalse())
      .then(()=>UpdateListInfo())
      .catch((error)=>console.log(error))
    }
    else{
      fetch("http://localhost:3000/api/Task", {
      method: "PATCH",
      headers: {
        "content-type" : "application/json",
        "authorization" : userToken
      },
      body: JSON.stringify({
        id : id,
        status : true
      })
      })
      .then(()=>setStatusTrue())
      .then(()=>UpdateListInfo())
      .catch((error)=>console.log(error))
    }

    
  const setStatusTrue=()=>{
    setTaskStatus(true)
    
    if( taskCom.current.classList.contains("statusFalse") ){
      taskCom.current.classList.remove("statusFalse")
    }

    taskCom.current.classList.add("statusTrue")

  }

  const setStatusFalse=()=>{
    setTaskStatus(false)

    if( taskCom.current.classList.contains("statusTrue") ){
      taskCom.current.classList.remove("statusTrue");
    }
    taskCom.current.classList.add("statusFalse")
  }


  }

  return (
    <div ref={taskCom} className="w-full bg-inColor flex justify-between items-center p-2 relative listCom">
        <span>{tittle}</span>
        <span onClick={changeStatus}  className="bg-cnColor p-1 active:scale-95"> {taskStatus? <FontAwesomeIcon icon={faCircleCheck} size="xl" /> : <FontAwesomeIcon icon={faCircle} size="xl" /> }</span>

    </div>
  )
}
