import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { faPen } from "@fortawesome/free-solid-svg-icons"

// eslint-disable-next-line react/prop-types
export const ListCom = ({tittle, listCategory, listId, description, DeleteList, UpdateList, showList}) => {

  const list = {
    id: listId,
    tittle: tittle,
    description: description
  }


  return (
    <div  className="w-11/12 bg-inColor flex justify-between relative">
      <div className="bg-bgColor border border-white flex justify-center items-center px-2 w-fit relative">{listCategory}</div>
      <div onClick={()=>showList(listId)} className=" hover:bg-cnColor w-full hover:text-black transition-all  cursor-pointer p-2">
        {tittle} 
      </div>
        <div className="w-fit h-full flex absolute right-0 top-0 ">
          <div onClick={()=>UpdateList(list)} className="bg-cnColor border-l border-black flex justify-center items-center text-black px-2 h-full cursor-pointer select-none">
            <FontAwesomeIcon className="hover:scale-110" icon={faPen}/>
          </div>
          <div onClick={()=>DeleteList(list)} className="bg-cnColor border-l border-black flex justify-center items-center text-black px-2 h-full cursor-pointer select-none">
            <FontAwesomeIcon className="hover:scale-110" icon={faTrash}/>
          </div>
        </div>
    </div>
  )
}
