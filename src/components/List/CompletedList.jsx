import { useEffect, useState } from "react"
import { CompletedListCom } from "./CompletedListCom"

export const CompletedList = () => {

  const [lists, setLists] = useState([])

  const userId = localStorage.getItem("Id")

  const userToken = localStorage.getItem("Token")


  useEffect(()=>{ 
    
        fetch(`http://localhost:3000/api/Lists/${userId}`,{
          headers : {
            "authorization" : userToken
          }
        })
        .then((data)=> data.json())
        .then((data)=> setLists(data))
        .catch((error)=> console.log(error))

},[userId])

const filterLists = lists.filter(list => list.status === true)

  return (
    <div>
      <div className="flex justify-between items-center p-3 border-inColor border-t">
            <h2>Completed Tasks</h2>
        </div>
            <div className="grid gap-3  p-3 grid-rows-1 grid-flow-col overflow-x-auto" >
                {filterLists.map((list)=>(
                  <CompletedListCom key={list.id} tittle={list.tittle}/>
                ))}
            </div>

    </div>
  )
}


