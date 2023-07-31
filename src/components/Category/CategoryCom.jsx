import { useContext, useState } from "react"
import { categoryContext } from "../../context"
import EditCategory from "./EditCategory"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPen } from "@fortawesome/free-solid-svg-icons"

// eslint-disable-next-line react/prop-types, no-unused-vars
const CategoryCom = ({name, idCategory, priority, aceptedEditCategoryPg}) => {

  const [editCategory, setEditCategory] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const [category, setCategory] = useContext(categoryContext)

  const sendCategory = ()=>{
    setCategory(idCategory)
  }

 const cancelEditCategoryP=()=>{
  setEditCategory(false)
 }

 const aceptedEditCategoryP=()=>{
  setEditCategory(false),
  aceptedEditCategoryPg(true)
 }


  return (
    <>
    {editCategory && <EditCategory cancelEditCategory={cancelEditCategoryP} aceptedEditCategory={aceptedEditCategoryP} id={idCategory} categoryName={name}/>}
    <div className="w-full lg:w-4/5 bg-inColor text-white text-center flex cursor-pointer  active:scale-95 select-none transition-all">
     
      <div className="w-1/4 text-inherit bg-bgColor border border-white h-9 flex items-center justify-center">{priority}.</div>
      <div  onClick={sendCategory} className="w-3/4 hover:bg-cnColor hover:text-black text-inherit h-9 flex items-center justify-center">
      {name}
      </div>
      <div onClick={()=>{setEditCategory(true)}} className="w-fit text-inherit bg-cnColor px-1 h-9 flex items-center justify-center">
        <FontAwesomeIcon className="hover:scale-110" icon={faPen}/>
      </div>
      
    </div>
    </>
  )
}

export default CategoryCom