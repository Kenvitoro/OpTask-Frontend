/* eslint-disable react/prop-types */
import { useRef } from "react"

const EditCategory =({cancelEditCategory, aceptedEditCategory, id, categoryName})=>{

const FormRef = useRef()

const AceptedEditCategory =()=>{

  const userToken = localStorage.getItem("Token")

  const FormData = {
    id : id,
    tittle : FormRef.current.tittle.value
  }
  
  fetch("http://localhost:3000/api/category", {
  method: "PATCH",
  headers: {
    "content-type" : "application/json", 
    "authorization" : userToken
  },
  body: JSON.stringify(FormData)
  })
  .then(()=>aceptedEditCategory())
  .catch((error)=>console.log(error))

}


  return (
      <div className="fixed top-0 left-0 bg-black bg-opacity-90 w-screen h-screen z-50 flex justify-center items-center">
        <div className="bg-bgColor w-4/5 lg:w-2/5 xl:w-1/5 h-72">

          <form ref={FormRef}  className="w-full h-full flex justify-center items-center flex-col gap-6">
            <h2>Rename Category {categoryName}</h2>
            <input name="tittle" className="w-4/5 bg-inColor p-2" />

            <div className="flex gap-4">
              <div onClick={AceptedEditCategory} className="bg-green-500 p-2 active:scale-95 cursor-pointer">Accept</div>
              <div onClick={()=>cancelEditCategory()} className="bg-red-500 p-2 active:scale-95 cursor-pointer">Cancel</div>
            </div>
            
          </form>
        </div>
      </div>
  )
}
  

export default EditCategory
