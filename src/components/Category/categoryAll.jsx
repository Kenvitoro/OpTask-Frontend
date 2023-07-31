import { useContext } from "react"
import { categoryContext } from "../../context"

// eslint-disable-next-line react/prop-types, no-unused-vars
const CategoryAll = () => {

  // eslint-disable-next-line no-unused-vars
  const [category, setCategory] = useContext(categoryContext)

  const sendCategory = ()=>{
    setCategory(null)
  }

  return (
    <div onClick={sendCategory} 
    className=" w-3/5  bg-inColor text-white text-center p-3 cursor-pointer hover:bg-cnColor hover:text-black active:scale-95 select-none transition-all">
        Todo
    </div>
  )
}

export default CategoryAll
