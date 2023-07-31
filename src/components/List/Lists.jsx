import { useEffect, useState, useContext } from "react"
import { ListCom } from "./ListCom"
import { categoryContext } from "../../context"
import CreateList from "./CreateList"
import { DeleteList } from "./DeleteList"
import { UpdateList } from "./UpdateList"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"



// eslint-disable-next-line react/prop-types
export const Lists = ({showListCom}) => {

    const [lists, setLists] = useState([])

    const [createList, setCreateList] = useState(false)

    const [deleteList, setDeleteList] = useState(false)

    const [updateList, setUpdateList] = useState(false)

    const [idList, setIdList] = useState(null)

    const userId = localStorage.getItem("Id")

    const userToken = localStorage.getItem("Token")


    const handleDeletedList=(e)=>{
        setDeleteList(true)
        setIdList(e)
    }

    const handleUpdatedList=(e)=>{
        setUpdateList(true)
        setIdList(e)
    }

    const handleShowList=(e)=>{
        showListCom(e)
    }

    // eslint-disable-next-line no-unused-vars
    const [listsFiltered, setListsFiltered] = useContext(categoryContext)

        useEffect(()=>{ 

            if(!listsFiltered){
                fetch(`http://localhost:3000/api/Lists/${userId}`, {
                    headers : {
                     "authorization" : userToken
                    }
                })
                .then((data)=> data.json())
                .then((data)=> setLists(data))
                .catch((error)=> console.log(error))
            }

            if(listsFiltered){
                fetch(`http://localhost:3000/api/Listsc/${listsFiltered}`,{
                    headers : {
                        "authorization" : userToken
                       }
                })
                .then((data)=> data.json())
                .then((data)=> setLists(data))
                .catch((error)=> console.log(error))
            }
            
        },[listsFiltered, createList, deleteList, updateList, userId])

        const sortedLists = lists.sort((a, b)=> a.id - b.id)

        const filterLists = sortedLists.filter(list => list.status === false)


  return (
    <div >
        {updateList && <UpdateList CancelUpdate={()=>setUpdateList(false)} onUpdatedList={()=>setUpdateList(false)} id={idList.id} tittle={idList.tittle} description={idList.description}/>}
        {deleteList && <DeleteList CancelDelete={()=>setDeleteList(false)} onDeletedList={()=>setDeleteList(false)} id={idList.id} tittle={idList.tittle}/>}
        {createList && <CreateList CancelCreate={()=>setCreateList(false)} onCreatedList={()=>setCreateList(false)}/>}
        <div className="flex justify-between items-center p-3 border-inColor border-t">
            <h2>Ongoing Tasks</h2>
            <section onClick={()=>setCreateList(true)} className="text-white text-2xl cursor-pointer"><FontAwesomeIcon icon={faPlus} color="#fff"/></section>
        </div>
            <div className="flex flex-col gap-3 justify-center items-center py-5">
                {filterLists.map((list)=>(
                    <ListCom 
                        key={list.id} 
                        listId={list.id} 
                        tittle={list.tittle} 
                        description={list.description} 
                        listCategory={list.category.tittle } 
                        DeleteList={handleDeletedList}  
                        UpdateList={handleUpdatedList} 
                        showList={handleShowList} />
                ))}
            </div>

    </div>
  )
}


