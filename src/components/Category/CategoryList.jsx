import { useEffect, useState  } from "react"
import { CreateCategory } from "./CreateCategory"
import   CategoryCom   from "./CategoryCom"
import CategoryAll from "./categoryAll"



export const CategoryList = () => {
  
  const [editCategory, setEditCategory] = useState(false);
  const [createCategory, setCreateCategory] = useState(false)

  const userId = localStorage.getItem("Id")
  const userToken = localStorage.getItem("Token")

  const crearCategory = () =>{
    setCreateCategory(true)
  }

 const aceptedEditCategoryPG = (e)=>{
    editCategory? setEditCategory(false) : setEditCategory(e);
  }

  const [categories, setCategories] = useState([]);

  const cancelCategoryHandler = (e)=>{
    setCreateCategory(e)
  }

  const createdCategoryHandler = (e)=>{
    setCreateCategory(e)
  }


  useEffect(()=>{
  
      fetch(`http://localhost:3000/api/category/${userId}`, {
        headers : {
          "authorization" : userToken
        }
      })
      .then((data)=> data.json())
      .then((response)=> setCategories(response))
      .catch((error)=> console.log(error))
    
  },[createCategory, editCategory, userId])

  const sortedCategories = categories.sort((a, b) => b.priority - a.priority);

  return (
    <div className="border-solid border-inColor border-r flex justify-center items-start py-9 md:px-2">
        <div className="flex flex-col justify-center items-center w-full ">
            <div className="flex justify-center items-center flex-col">
              <div className="flex justify-center items-center gap-2">
                <h3>Categories</h3>
                <div className="text-white text-2xl cursor-pointer" onClick={crearCategory}>+</div>
              </div>
                {createCategory && <CreateCategory cancelCategory={cancelCategoryHandler} onCreatedCategory={createdCategoryHandler} />}
            </div>
            
            <div className="flex flex-col justify-center items-center py-2 gap-2 w-4/5 md:w-3/5">
              <CategoryAll/>
            {sortedCategories.map((category) => (
            <CategoryCom idCategory={category.id} key={category.id} name={category.tittle}  priority={category.priority} aceptedEditCategoryPg={aceptedEditCategoryPG}/>
            ))}
            </div>
        </div>
    </div>
  )
}
