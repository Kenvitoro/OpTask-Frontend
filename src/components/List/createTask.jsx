import { useState, useRef, useEffect } from "react"

// eslint-disable-next-line react/prop-types
export const CreateTask = ({id, updateTaskList}) => {

  const [modalCreateTask, setModalCreateTask] = useState(false)

  useEffect(()=>{
    updateTaskList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[modalCreateTask])


  return (
    <>
      {modalCreateTask && <CreateNewTask cancelTask={()=>setModalCreateTask(false)} listIdS={id} onCreatedTask={()=>setModalCreateTask(false)}/>}
      <div onClick={()=>setModalCreateTask(true)} className="bg-cnColor text-black text-center p-2 w-4/5 cursor-pointer select-none active:scale-95 transition-all">Add Task</div>
    </>
  )
}


// eslint-disable-next-line react/prop-types
export const CreateNewTask = ({cancelTask, listIdS, onCreatedTask})=>{

  const FormRef = useRef();

  const userToken = localStorage.getItem("Token")

  const AceptedTask=()=>{
        const formData = {
          tittle: FormRef.current.tittle.value,
          list: listIdS
        };

        fetch("http://localhost:3000/api/task",{
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            "authorization" : userToken
        },
        body : JSON.stringify(formData)
        })
        .then(()=>onCreatedTask())
        .catch((error)=>console.log(error))
    }
  

    return(
        <div className="fixed top-0 left-0 bg-black bg-opacity-90 w-screen h-screen z-50 flex justify-center items-center">
        <div className="bg-bgColor w-4/5 lg:w-2/5 xl:w-1/5 h-72">

          <form ref={FormRef}  className="w-full h-full flex justify-center items-center flex-col gap-6">
            <h2>Task</h2>
            <input name="tittle" className="w-4/5 bg-inColor p-2" />

            <div className="flex gap-4">
              <div onClick={AceptedTask} className="bg-green-500 p-2 active:scale-95 cursor-pointer">Accept</div>
              <div onClick={()=>cancelTask()} className="bg-red-500 p-2 active:scale-95 cursor-pointer">Cancel</div>
            </div>
            
          </form>
        </div>
      </div>
    )
}