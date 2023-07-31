import { useRef } from "react"


// eslint-disable-next-line react/prop-types
export const UpdateList = ({CancelUpdate, onUpdatedList, id, tittle, description})=>{

    const userToken = localStorage.getItem("Token")

    const formRef = useRef() 
  
      const UpdateListById=()=>{

        const updateList = {
            id : id,
            tittle : formRef.current.tittle.value,
            description : formRef.current.description.value,
         }

          fetch("http://localhost:3000/api/List",{
            method: "PATCH",
            headers: {
              "Content-Type" : "application/json",
              "authorization" : userToken
            },
            body: JSON.stringify(updateList)
          })
          .then(()=>onUpdatedList())
          .catch((error)=>console.log(error))
      }
        
  
      return(
          <div className="fixed top-0 left-0 bg-black bg-opacity-90 w-screen h-screen z-50 flex justify-center items-center">
          <div className="bg-bgColor w-4/5 lg:w-2/5 xl:w-1/5 h-auto p-4">

          <form ref={formRef}  className="w-full h-full flex justify-center items-center flex-col gap-8">
            <h2 className="text-xl">Editing {tittle}</h2>
            <div className="flex justify-center items-center flex-col gap-5 w-full">
                <label>Tittle</label>
                <input className=" p-2 w-4/5 bg-inColor" type="text" name="tittle" defaultValue={tittle} />
                <label>Description</label>
                <textarea className=" w-4/5 h-40 bg-inColor" name="description" defaultValue={description}></textarea>

            </div>
           
           
            <div className="flex gap-4">
                <div onClick={UpdateListById} className="bg-green-500 p-2 active:scale-95 cursor-pointer">Accept</div>
                <div onClick={()=>CancelUpdate()} className="bg-red-500 p-2 active:scale-95 cursor-pointer">Cancel</div>
              </div>
          </form>
          
          </div>
        </div>
      )
  }