import { CompletedList } from "./List/CompletedList"
import { ListInfo } from "./List/ListInfo"
import { Lists } from "./List/Lists"
import { useState, useRef } from "react"

export const Tasks = () => {

  const ListInfoRef = useRef()

  const [showListInfo, setShowListInfo] = useState(false)

  const [ListInfoId, setListInfoId] = useState()



  const showListById=(e)=>{
    setShowListInfo(true)
    setListInfoId(e)
  }

  return (
    <div ref={ListInfoRef} className="h-full overflow-y-auto">
       {showListInfo && <ListInfo  closeList={()=>setShowListInfo(false)} listId={ListInfoId} />}
       {!showListInfo && 
       <><CompletedList/> 
       <Lists showListCom={showListById} /> </>}
    </div>
  )
}
