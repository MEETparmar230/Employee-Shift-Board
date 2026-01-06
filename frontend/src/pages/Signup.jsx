import React from 'react'
import { useState } from 'react';
import  { useNavigate } from 'react-router-dom'
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Signup() {
 const [loading, setLoading] = useState(false)
 const navigate = useNavigate()
 const path = import.meta.env.VITE_SERVER;

   const [formData, setFormData] = useState({
     name:"",
     email: "",
     password: ""
   })
  

   const handleSubmit =async (e) => {
     setLoading(true)
     e.preventDefault();
 
     await axios.post(`${path}/user/signup`,formData)
     .then(res=>{
              if(res.data.success){
                toast.success(res.data.message)
                navigate("/login");
              }
              else{
                toast.error(res.data.message)
              }
              
              })
     .catch(err => {console.log("Error while creating user") ; toast.error(err.response?.data?.message)})

     setFormData({
       name:"",
       email:"",
       password:""
     })
     setLoading(false)
     
   }
 
 
   return (
     <div className='text-zinc-200 max-w-xl flex justify-center mx-auto mt-50 shadow'>
       <form onSubmit={handleSubmit} action="" className='border rounded-md p-5 w-full  items-center'>
         <h1 className='mb-8 font-bold text-3xl '>Sign up</h1>
         <div className='my-4 mx-auto w-fit text-xl'>
           <label className='font-medium' htmlFor="name">Name :</label>
           <input className='border ms-10 rounded px-2' id='name' type="text" value={formData.name} onChange={e=>setFormData({...formData,name:e.target.value})} required/>
         </div>
         <div className='my-4 mx-auto w-fit text-xl'>
           <label className='font-medium'  htmlFor="email">Email :</label>
           <input className='border ms-11 rounded px-2 ' id='email' type="text" value={formData.email} onChange={e=>setFormData({...formData,email:e.target.value})} required/>
         </div>
         <div className='mx-auto w-fit text-xl'>
           <label className='font-medium'  htmlFor="password">Password :</label>
           <input className='border ms-2 rounded px-2' id='password' type="password" value={formData.password} onChange={(e) => setFormData({...formData,password:e.target.value})} required/>
         </div>
         <div className='mx-auto w-fit text-xl mt-2'>
         <button className=' border rounded-md px-2 cursor-pointer mt-4 font-semibold hover:bg-black hover:text-white' type='submit'>{loading ? <p>Loading...</p> : <p>Sign up</p>}</button>
         </div>
       </form>
     </div>
   )
}
