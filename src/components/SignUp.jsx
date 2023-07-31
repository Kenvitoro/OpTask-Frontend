import { useRef } from "react"
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useForm } from "react-hook-form";

export const SignUp = () => {

  const {register, formState: {errors}, handleSubmit} = useForm()

  const navigate = useNavigate()

  const formRef = useRef();


  const SubmitSignUp=()=>{

    const formData = {
      name: formRef.current.name.value,
      lastName: formRef.current.lastName.value,
      email: formRef.current.email.value,
      password: formRef.current.password.value
    }

    fetch("http://localhost:3000/Auth/signup",{
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
    .then((data)=>console.log(data))
    .catch((error)=>console.log(error))

  }


  const RedirectLogIn =()=>{
    navigate("/signin")
  }



  return (
    <>
      <div className="h-screen w-screen bg-bgColor flex justify-center items-center flex-col gap-4">
        <h1 className="text-5xl">Optimal<span className="text-cnColor">Task</span></h1>
        <h2>Create your account</h2>
        <form ref={formRef} onSubmit={handleSubmit(SubmitSignUp)} className="h-auto w-4/5 sm:w-3/5 md:w-2/5 lg:w-1/5 flex justify-center items-center flex-col gap-4 p-3">

        <div className="w-full">
              <label className="block" htmlFor="name">Name</label>
              <input className="bg-inColor w-full p-2" type="text" placeholder="Name" name="name" {...register("name", {required : true,  pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "just letters and spaces"
                }})} />
              {errors.name?.type==="required" && (<p>Necessary field</p>)}
              {errors.name?.type==="pattern" && (<p>{errors.name.message}</p>)}
        </div>

        <div className="w-full">
              <label className="block" htmlFor="lastName">Last Name</label>
              <input className="bg-inColor w-full p-2" type="text" placeholder="Lastname" name="lastName" {...register("lastName", {required : true, pattern: {
                  value: /^[A-Za-z\s]+$/,
                  message: "just letters and spaces"
                }} )} />
              {errors.lastName?.type==="required" && (<p>Necessary field</p>)}
              {errors.lastName?.type==="pattern" && (<p>{errors.lastName.message}</p>)}
        </div>

        <div className="w-full">
              <label className="block" htmlFor="email">Email</label>
              <input className="bg-inColor w-full p-2" type="email" placeholder="Email" name="email" {...register("email", {required : true, pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address"
              }
              })}/>
              {errors.email?.type==="required" && (<p>Necessary field</p>)}
              {errors.email?.type==="pattern" && (<p>{errors.email.message}</p>)}
        </div>

        <div className="w-full">
              <label className="block" htmlFor="password">Password</label>
              <input className="bg-inColor w-full p-2" type="password" placeholder="Password" name="password"/>
        </div>

          <button /*onClick={SubmitSignUp}*/ className="bg-cnColor text-black w-full p-3 mt-2.5">Sign Up</button>
        </form>

        <div className="flex justify-center items-center gap-1.5">
          <div className="bg-inColor h-px w-8"></div>
          <div onClick={RedirectLogIn} className="text-inColor text-center">or if you already have an account <span className="text-cnColor"><a href="#">Log In</a></span></div>
          <div className="bg-inColor h-px w-8"></div>
        </div>
      </div>
    </>
  )
}
