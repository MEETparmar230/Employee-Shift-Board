import axios from 'axios';
import { useState } from 'react'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../componenets/AuthContex';

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const path = import.meta.env.VITE_SERVER;
  const { setLoggedIn ,checkAuth} = useAuth()

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();

    console.log(path)
    await axios.post(`${path}/user/login`, formData,{withCredentials:true})

      .then(async res =>{
        if (!res.data.success) {
          console.log("Some Error occured while login", res.data.message)
          toast.error(res.data.message || "Something went Wrong")
        }
        
        toast.success(res.data.message);
         
        setLoggedIn(true);
        await checkAuth()
        navigate("/")
      
            setFormData({
      email: "",
      password: ""
    })
    
    setLoading(false)
      })
      .catch(err => {
        console.log("Some Error occured while login", err.response?.data?.message)
        toast.error(err.response?.data?.message)
        setLoading(false)
      })


  }

  const [formData, setFormData] = useState({
    email: "hire-me@anshumat.org",
    password: "HireMe@2025!"
  })

  return (
    <div className='text-zinc-200 max-w-xl flex justify-center mx-auto mt-50 shadow'>
      <form onSubmit={handleSubmit} action="" className='border rounded-md p-5 w-full  items-center'>
        <h1 className='mb-8 font-bold text-3xl '>Login</h1>
        <div className='my-4 mx-auto w-fit text-xl'>
          <label className='font-medium' htmlFor="email">Email :</label>
          <input className='border ms-11 rounded px-2' id='email' type="text" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required/>
        </div>
        <div className='mx-auto w-fit text-xl'>
          <label className='font-medium' htmlFor="password">Password :</label>
          <input className='border ms-2 rounded px-2' id='password' type="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required/>
        </div>
        <div className='mx-auto w-fit text-xl mt-2'>
          <button className=' border rounded-md px-2 cursor-pointer mt-4 font-semibold hover:bg-black hover:text-white' type='submit'>{loading ? <p>Loading...</p> : <p>Login</p>}</button>
        </div>
      </form>
    </div>
  )
}
