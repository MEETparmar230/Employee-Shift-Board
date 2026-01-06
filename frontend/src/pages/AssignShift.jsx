import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function AssignShift() {

  const path = import.meta.env.VITE_SERVER
  const [loading,setLoading] = useState(false)
  const [submiting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    employeeId: "",
    date: "",
    startTime: "",
    endTime: ""
  })
  const [employees,setEmployees] = useState([])

  const handleShiftSubmit =async (e) => {
    setSubmitting(true)
    e.preventDefault()
    console.log(formData)
    try{
      const res = await axios.post(`${path}/shifts/createShift`,formData, {withCredentials:true})
      if(!res.data.success){
        throw new Error(res.data.message || "Failed to assign shift")
      }

      toast.success("Shift Assigned")
      setFormData({
    employeeId: "",
    date: "",
    startTime: "",
    endTime: ""
  })
    }
    catch(err){
      console.log(err)
      toast.error(err.response?.data?.message || "Failed to assign shift")
    }
    finally{
      setSubmitting(false)
    }
  }

 

  useEffect(()=>{
    setLoading(true)
    
    const fetchEmployees = async () =>{
      try {
      const res = await axios.get(`${path}/admin/getEmployees`,{withCredentials:true})

      if(!res.data.success){
        throw new Error(res.data.message || "Failes to fetch Employees")
      }

      setEmployees(res.data.employees)
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || "Failed to fetch Employees")
    }
    finally{
      setLoading(false)
    }
    }

    fetchEmployees()
  },[])

  return (
    <div className='text-zinc-200'>
      <form onSubmit={handleShiftSubmit} action="" className='border max-w-3xl mx-auto rounded p-5 mt-50'>
        <h1 className='mb-8 font-bold text-3xl '>Assign Shift</h1>
        <div className='flex flex-col mx-auto w-xs'>
          <div className='my-4 mx-auto w-fit text-xl flex justify-between w-full'>
            <label className='font-medium' htmlFor="employeeId">Employee</label>
            <span>:</span>
            <select className='border w-34 rounded px-2 ' id='employeeId' value={formData.employeeId} onChange={e => setFormData({ ...formData, employeeId: e.target.value })} required>
              <option className='bg-zinc-800' value="" disabled >Employee</option>
              {employees.map((e) => <option className='bg-zinc-800' key={e._id} value={e._id}>{e.name}</option>)}
            </select>
          </div>
          <div className='mx-auto w-fit text-xl flex justify-between w-full'>
            <label className='font-medium' htmlFor="date">Date</label>
            <span className='ms-12'>:</span>
            <input className='border  rounded px-2 text-sm py-1' id='date' type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} required />
          </div>
          <div className='mx-auto w-fit text-xl my-4 flex justify-between w-full'>
            <label className='font-medium' htmlFor="date">Start Time</label>
            <span>:</span>
            <input className='border ms-11 rounded px-4 ' id='startTime' type="time" value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} required />
          </div>
          <div className='mx-auto w-fit text-xl flex justify-between w-full'>
            <label className='font-medium' htmlFor="endTime">End Time</label>
            <span className=''>:</span>
            <input className='border  rounded px-4 ms-8' id='endTime' type="time" value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} required />
          </div>
          <div className='mx-auto w-fit text-xl mt-4'>
            <button className=' border rounded-md px-2 cursor-pointer mt-4 font-semibold hover:bg-black hover:text-white' type='submit'>{submiting ? <p>Submitting...</p> : <p>Assign Shift</p>}</button>
          </div>
        </div>
      </form>
    </div>
  )
}
