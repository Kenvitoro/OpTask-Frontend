import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import jwtDecode from "jwt-decode"
import { useForm } from "react-hook-form"


export const SignIn = () => {

  const {register, formState : {errors}, handleSubmit} = useForm()

  const formRef = useRef()

  const navigate = useNavigate()



  const SubmitSignIp=()=>{


    const formData = {
      email: formRef.current.email.value,
      password: formRef.current.password.value
    }

    fetch("http://localhost:3000/Auth/signin",{
      method : "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body : JSON.stringify(formData),
    })
    .then(response => {
      const headers = response.headers;

      const autorization = headers.get("Authorization")

      const userPayload = jwtDecode(autorization.split(" ")[1])

      const userId = userPayload.id

      localStorage.setItem("Id", userId)

      localStorage.setItem("Token", autorization)

      return response; 

    })
    .then((response)=>response.json())
    .then(()=>navigate("/interface"))
    .catch((error)=>console.log(error))

  }



  return (
    <>
      <div className="h-screen w-screen bg-bgColor flex justify-center items-center flex-col gap-4">
        <h1 className="text-5xl">Optimal<span className="text-cnColor">Task</span></h1>
        <h2>Wellcome Back!</h2>
        <form ref={formRef} onSubmit={handleSubmit(SubmitSignIp)} className="h-auto w-4/5 sm:w-3/5 md:w-3/5 lg:w-1/5 flex justify-center items-center flex-col gap-4 p-3">
        <div className="w-full">
              <label className="block" htmlFor="email">Email Address</label>
              <input className="bg-inColor w-full p-2" type="email" placeholder="Email" name="email" {...register("email", {required : true,
              pattern : {
                value : /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
              } })}/>
              {errors.email?.type==="required" && (<p>Necessary field</p>)}
              {errors.email?.type==="pattern" && (<p>{errors.email.message}</p>)}
        </div>

        <div className="w-full">
              <label className="block" htmlFor="password">Password</label>
              <input className="bg-inColor w-full p-2" type="password" placeholder="Password" name="password"/>
        </div>

          <button className="bg-cnColor text-black w-full p-3 mt-2.5 active:scale-95 select-none cursor-pointer">Log In</button>
        </form>
      </div>
    </>
  )
}
