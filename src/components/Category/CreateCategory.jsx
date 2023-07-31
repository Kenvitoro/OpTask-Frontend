import { useEffect, useRef } from "react"

// eslint-disable-next-line react/prop-types
export const CreateCategory = ({cancelCategory, onCreatedCategory}) => {

    const formRef = useRef()

    const userId = localStorage.getItem("Id")
    
    const userToken = localStorage.getItem("Token")


    useEffect(()=>{
 

        const creatingCategory =(event)=>{

            event.preventDefault();

            const formData = {
                tittle: formRef.current.title.value,
                priority: formRef.current.priority.value,
                user: userId
              };

            fetch("http://localhost:3000/api/category",{
            method : "POST",
            headers : {
                "Content-Type": "application/json",
                "authorization" : userToken
            },
            body : JSON.stringify(formData)
            })
            .then(()=>onCreatedCategory(false))
            .catch((error)=>console.log(error))
        }

        formRef.current.addEventListener("submit", creatingCategory);



        return () => {
            
            if (formRef.current) {
                formRef.current.removeEventListener("submit", creatingCategory);
              }
        };
        
    },[])

  return (
    <div className="border-solid border-inColor border-2 p-1">
       <form ref={formRef} className="flex gap-1">
            <div className="w-4/5">
                <input className="w-full text-white bg-inColor outline-none" name="title" type="text" placeholder="Category name" />
                <input className="w-full text-white bg-inColor outline-none" name="priority" type="number" placeholder="priority" min="1" max="10" step= "1"/>
            </div>
                <button type="submit" className="bg-cnColor p-1 text-black" >Create</button>
                <div className="text-white bg-inColor cursor-pointer flex justify-center items-center p-1" onClick={()=>cancelCategory(false)}>cancel</div>
        </form>
    </div>
  )
}
