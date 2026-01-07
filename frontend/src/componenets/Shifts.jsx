import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useAuth } from './AuthContex';


export default function Shifts() {
 const path = import.meta.env.VITE_SERVER;

  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date,setDate] = useState("")
  const [deleteId,setDeleteId] = useState("")
  const {role}  = useAuth()


  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const url = date ? `${path}/shifts/getShifts?date=${date}` : `${path}/shifts/getShifts`

        const res = await axios.get(url, {withCredentials: true})

        if (!res.data.success) {
          throw new Error(res.data.message || "Failed to fetch shifts")
        }

        setShifts(res.data.shifts);
      } catch (err) {

        console.error(err);
        toast.error(err.response?.data?.message || "Unable to load shifts")
      }
       finally {
        setLoading(false);
      }
    };

    fetchShifts();
  }, [date]);

   if (role !== "admin") {
    return <p className='text-zinc-300 text-center my-50 text-3xl '>Please Login first</p>
  }

     if(loading){
    return (
      <div className="text-zinc-200 flex justify-center items-center min-h-screen text-xl">
        Loading shifts...
      </div>
    );
  }

  const handleDelete =async (id) =>{
    setDeleteId(id)
    try {
     const res = await axios.delete(`${path}/shifts/delete/${id}`,{withCredentials:true})
     if(!res.data.success){
      throw new Error("Failed to Delete Shift")
     }

     toast.success("Shift Deleted")
     setShifts(prev => prev.filter(s=> s._id != id))
    } catch (err) {
      console.log(err)
      toast.error(err.response?.data?.message || "Failed to Delete shift")
    }
    finally{
      setDeleteId("")
    }
  }

  return (
    <div className="text-zinc-200 max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">My Shifts</h1>
      <div className='flex flex-col'>
        <input className='ms-auto mb-2 border border-zinc-400 rounded p-1' value={date} type="date" onChange={(e) => setDate(e.target.value)}/>

      {shifts.length === 0 ? (
        <p className="text-zinc-400">No shifts assigned.</p>) 
        
        : 
      (
        
        
      
      <table className="w-full border border-zinc-700 rounded-md overflow-hidden">
          <thead className="bg-zinc-800">
            <tr>
              <th className="p-3 text-left border-b border-zinc-700">
                Employee
              </th>
              <th className="p-3 text-left border-b border-zinc-700">
                Date
              </th>
              <th className="p-3 text-left border-b border-zinc-700">
                Start Time
              </th>
              <th className="p-3 text-left border-b border-zinc-700">
                End Time
              </th>
              <th className="p-3 text-left border-b border-zinc-700"></th>
            </tr>
          </thead>

          <tbody>
            {shifts.map((shift) => (
              <tr
                key={shift._id}
                className="hover:bg-zinc-800 transition"
              >
                <td className="p-3 border-b border-zinc-700">
                  {shift.employeeId?.name}
                </td>
                <td className="p-3 border-b border-zinc-700">
                  {(shift.date).split("-").reverse().join("/")}
                </td>
                <td className="p-3 border-b border-zinc-700">
                  {shift.startTime}
                </td>
                <td className="p-3 border-b border-zinc-700">
                  {shift.endTime}
                </td>
                <td  className="p-3 border-b border-zinc-700"><button className='px-2 border bg-red-500 rounded hover:bg-red-600' onClick={()=>handleDelete(shift._id)}>
                  {(deleteId === shift._id)? "Deleting" : "Delete" }
                  </button></td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}</div>
    </div>
    
  );
}