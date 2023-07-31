import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCalendar } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState, useRef } from "react"
import { TaskListCom } from "./TaskListCom"
import { CreateTask } from "./createTask"
import { ModalCompletedList } from "./ModalCompletedList"

// eslint-disable-next-line react/prop-types
export const ListInfo = ({closeList, listId}) => {

  const divParent = useRef()

  const addTaskButton = useRef()

  const tasksContainer = useRef()

  const [ListById, setListById] = useState({});

  const [TasksById, setTasksById] = useState([]);

  const [taskStatus, setTasksStatus] = useState(false);

  const [taskProgres, setTaskProgres] = useState();

  const [updatedTasks, setUpdatedTasks] = useState(false);

  const [completedList, setCompletedList] = useState(false);

  const userToken = localStorage.getItem("Token")

  const updateTasksList=()=>{
    updatedTasks? setUpdatedTasks(false) : setUpdatedTasks(true)
  }

  const updateTaskStatus=()=>{
    taskStatus? setTasksStatus(false) : setTasksStatus(true)
  }

  useEffect(() => {
    if (TasksById.length > 0) {
      let completedTasks = TasksById.filter(task => task.status === true).length;

      let allTasks = TasksById.length;
      
      completedTasks === allTasks? setCompletedList(true) : setCompletedList(false);
    }
  }, [TasksById]);

  useEffect(()=>{
    fetch(`http://localhost:3000/api/List/${listId}`,{
      headers : {
        "authorization" : userToken
      }
    })
    .then((data)=> data.json())
    .then((data)=> setListById(data))
    .catch((error)=> console.log(error))
  },[listId])

  useEffect(()=>{
    fetch(`http://localhost:3000/api/Tasks/${listId}`,{
      headers : {
        "authorization" : userToken
      }
    })
    .then((data)=> data.json())
    .then((data)=> setTasksById(data))
    .catch((error)=> console.log(error))
  },[listId, taskStatus, updatedTasks])

  useEffect(() => {
    if (TasksById.length > 0) {
      const tasks = tasksContainer.current.querySelectorAll(".listCom");
      const tasksTrue = tasksContainer.current.querySelectorAll(".statusTrue");
      const taskProgress = Math.round((tasksTrue.length / tasks.length) * 100);
      if (!isNaN(taskProgress)) {
        const taskPercentage = taskProgress + "%";
        setTaskProgres(taskPercentage);
      }
    }
  }, [TasksById]);

  useEffect(()=>{
    if(divParent.current.clientHeight < divParent.current.scrollHeight){
     addTaskButton.current.classList.remove('absolute');
     addTaskButton.current.classList.add('sticky');
    }else{
      addTaskButton.current.classList.remove('sticky');
     addTaskButton.current.classList.add('absolute');
    }
  },[])
  


  const fechaOriginal = ListById.created_date;
const fecha = new Date(fechaOriginal);

const opciones = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZone: 'UTC'
};

const fechaFormateada = fecha.toLocaleString('es-ES', opciones);

const sortedTask = TasksById.sort((a, b) => a.id - b.id);

  return (
    <div ref={divParent} className="h-full relative">
        {completedList && <ModalCompletedList CloseListCompleted={()=>closeList()} id={listId}/>}
      <div className="flex justify-between items-center p-4">
        <section onClick={()=>closeList()} className="py-1 px-3 cursor-pointer">
          <FontAwesomeIcon icon={faArrowLeft} size="lg" color="#fff"></FontAwesomeIcon>
        </section>
        <h2>Tasks Details</h2>
        <div></div>
      </div>

      <div className="flex justify-center items-center p-4">
        <h2 className="text-xl capitalize">{ListById.tittle}</h2>
      </div>

      <article className="p-4 flex gap-3">
        <FontAwesomeIcon  icon={faCalendar} size="2xl"/>
        <div className="flex flex-col justify-center">
          <span className="text-xs">Fecha de creación</span>
          <span className="text-sm">{fechaFormateada}</span>
        </div>

      </article>

      <div className="p-4">
        <h2 className="text-lg">Description</h2>
        <p>{ListById.description} </p>
      </div>

      <div className="p-4 flex justify-end items-center">

          <div className="flex justify-center items-center gap-2 m-2">
              <span>Task Progress</span>
              <span className="bg-cnColor p-1 text-black">{taskProgres}</span>
          </div>
      
      </div>  

      

      <div className="p-4">
        <h2 className="text-lg">All Tasks</h2>
        <div ref={tasksContainer} className="flex flex-col justify-center items-center gap-3">  
        {sortedTask.map((task)=>(
        <TaskListCom 
          key={task.id} 
          tittle={task.tittle} 
          status={task.status} 
          id={task.id} 
          UpdateListInfo={()=>updateTaskStatus()} />))}
        </div>
      </div>


      <div ref={addTaskButton} className="bg-inColor w-full p-3 absolute bottom-0 flex justify-center items-center">
        <CreateTask id={listId} updateTaskList={()=>updateTasksList()}/>
      </div>
    </div>
  )
}
