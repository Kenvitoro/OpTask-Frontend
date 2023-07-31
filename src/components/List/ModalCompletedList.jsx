
// eslint-disable-next-line react/prop-types
export const ModalCompletedList = ({CloseListCompleted, id}) => {

  const userToken = localStorage.getItem("Token")

  const UpdateListStatus = ()=>{
      const updateList = {
        id : id,
        status: true
    }

     fetch("http://localhost:3000/api/List",{
        method: "PATCH",
        headers: {
          "Content-Type" : "application/json",
          "authorization" : userToken
        },
        body: JSON.stringify(updateList)
      })
      .then(()=>CloseListCompleted())
      .catch((error)=>console.log(error))
  }


  return (
    <div className="fixed top-0 left-0 bg-black bg-opacity-90 w-screen h-screen z-50 flex justify-center items-center">
    <div className="bg-bgColor w-4/5 lg:w-2/5 xl:w-1/5 h-auto p-3">

        <div className="w-full h-full flex justify-center items-center flex-col gap-8">
            <h2 className="text-2xl text-center">Task Succeed, Congratulations</h2>
            
            <div className="flex gap-4">
                <div onClick={()=>UpdateListStatus()}  className="bg-cnColor p-2 active:scale-95 cursor-pointer text-black">Close</div>
            </div>
        </div>

        
        
    </div>
  </div>
  )
}
