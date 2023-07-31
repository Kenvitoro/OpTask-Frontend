/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react"

const CreateList =({CancelCreate, onCreatedList})=>{

    const formRef = useRef()

    const [category, setCategory] = useState([])

    const userId = localStorage.getItem("Id")

    const userToken = localStorage.getItem("Token")

 

    useEffect(()=>{
  
        fetch(`http://localhost:3000/api/category/${userId}`,{
          headers : {
            "authorization" : userToken
          }
        })
        .then((data)=> data.json())
        .then((response)=>{setCategory(response)} )
        .catch((error)=> console.log(error))
      
    },[userId])

 

      const SendCreatedList =()=>{

        const formData = {
          tittle: formRef.current.tittle.value,
          description: formRef.current.description.value,
          category: formRef.current.categoryValue.value,
          user: userId
        }

        
        fetch("http://localhost:3000/api/List",{
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                "authorization" : userToken
            },
            body : JSON.stringify(formData)
            })
            .then(()=>onCreatedList())
            .catch((error)=>console.log(error))
      }
 


  return (
      <div className="fixed top-0 left-0 bg-black bg-opacity-90 w-screen h-screen z-50 flex justify-center items-center">
        <div className="bg-bgColor w-4/5 lg:w-2/5 xl:w-1/5 h-auto p-3">

          <form ref={formRef}  className="w-full h-full flex justify-center items-center flex-col gap-8">
            <h2 className="text-2xl">Create Task</h2>
            <div className="flex justify-center items-center flex-col gap-5 w-full">
                <label>Tittle</label>
                <input className=" p-2 w-4/5 bg-inColor" type="text" name="tittle" />
                <label>Description</label>
                <textarea className=" w-4/5 h-40 bg-inColor" name="description" ></textarea>
                <div className="flex gap-3">
                  <label>Category</label>
                  <select className="bg-inColor" name="categoryValue">
                      {category.map((categories)=>{
                          return(<option  key={categories.id}  value={categories.id}>{categories.tittle}</option>)
                      })}
                  </select>
                </div>
            </div>
           
           
            <div className="flex gap-4">
              <div onClick={SendCreatedList} className="bg-green-500 p-2 active:scale-95 cursor-pointer">Accept</div>
              <div onClick={()=>CancelCreate()}  className="bg-red-500 p-2 active:scale-95 cursor-pointer">Cancel</div>
            </div>
            
          </form>
        </div>
      </div>
  )
}
  

export default CreateList