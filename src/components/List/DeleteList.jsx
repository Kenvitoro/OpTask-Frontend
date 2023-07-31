
// eslint-disable-next-line react/prop-types
export const DeleteList = ({CancelDelete, onDeletedList, id, tittle})=>{

  const userToken = localStorage.getItem("Token")

  const listId = {
    id : id
  }

    const DeleteListById=()=>{
        fetch("http://localhost:3000/api/List",{
          method: "DELETE",
          headers: {
            "Content-Type" : "application/json",
            "authorization" : userToken
          },
          body: JSON.stringify(listId)
        })
        .then(()=>onDeletedList())
        .catch((error)=>console.log(error))
    }
      

    return(
        <div className="fixed top-0 left-0 bg-black bg-opacity-90 w-screen h-screen z-50 flex justify-center items-center">
        <div className="bg-bgColor w-4/5 lg:w-2/5 xl:w-1/5 h-72 flex flex-col justify-center items-center gap-7">

            <h2>Do you wanna delete {tittle}?</h2>

            <div className="flex gap-4">
              <div onClick={DeleteListById} className="bg-green-500 p-2 active:scale-95 cursor-pointer">Accept</div>
              <div onClick={()=>CancelDelete()} className="bg-red-500 p-2 active:scale-95 cursor-pointer">Cancel</div>
            </div>
        
        </div>
      </div>
    )
}