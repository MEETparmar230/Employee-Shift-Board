import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export default function EmployeeTable() {

    const path = import.meta.env.VITE_SERVER

    const [employees, setEmployees] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const fetchEmployee = async () =>{
        try{
           const res = await axios.get(`${path}/admin/getEmployees`,{withCredentials:true})

           if(!res.data?.success){
            throw new Error(res.data?.message || "Unable to fetch employees");
           }

           setEmployees(res.data?.employees)
        }
        catch(err){
            console.log(err)
            toast.error(err.response?.data?.message || "Failed to fetch data")
        }
        finally{
            setLoading(false)
        }
    }

    fetchEmployee()
        
    },[])

    if(loading){
        return(
            <div className='text-2xl text-zinc-200 flex min-h-screen justify-center items-center'>
                loading...
            </div>
        )
    }
  return (
    <div className='text-zinc-200 px-5'>
        <h1 className='text-3xl font-bold my-6'>EmployeeTable</h1>
        <table className='w-full border border-zinc-700  rounded-lg overflow-hidden shadow-lg'>
            <thead className='bg-zinc-800 text-zinc-200'>
            <tr className=''>
                <th className='px-4 py-3 text-left'>Employee Code</th>
                <th className='px-4 py-3 text-left'>Name</th>
                <th className='px-4 py-3 text-left'>Department</th>
            </tr>
            </thead>
            <tbody>
            {employees &&
                employees.map((e,idx)=>(
                   <tr key={e._id}  className={'hover:bg-zinc-800 transition '}>
                    <td className='p-3 border-b border-zinc-700'>{e.employeeCode}</td>
                    <td className='p-3 border-b border-zinc-700'>{e.name}</td>
                    <td className='p-3 border-b border-zinc-700 capitalize'>{e.department}</td>
                   </tr>
                ))
            }
            </tbody>
        </table>

        

    </div>
  )
}
