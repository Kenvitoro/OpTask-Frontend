import { useNavigate } from "react-router-dom";

export const LandingPage = () => {

  const navigate = useNavigate();

  const RedirectPage = ()=>{
    navigate("/signup")

  }


  return (
    <>
    <div className="h-screen w-screen bg-bgColor flex justify-center items-center" >
      <div className="sm:w-4/5  md:w-1/2 h-2/3  flex justify-center items-center flex-col gap-4">
        <img className="w-full h-auto rounded-lg"  src="../checkLista.png" alt="landingPage image"/>
        <p className="text-3xl text-center">Manage your Task with <span className="text-cnColor">OpTask</span> </p>
        <div onClick={RedirectPage} className="bg-cnColor text-black p-3 active:scale-95 cursor-pointer select-none">Let’s Start</div>
      </div>
    </div>
    </>
  )
}
