import axios from 'axios';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useAuth } from './AuthContex';
import { useNavigate } from 'react-router-dom'

export default function SingleShift() {
  const path = import.meta.env.VITE_SERVER;
  const [shift, setShift] = useState(null);
  const [loading, setLoading] = useState(true);
  const { role } = useAuth()

  useEffect(() => {
    const fetchMyShift = async () => {
      try {
        const res = await axios.get(`${path}/shifts/getMy`, { withCredentials: true });
        if (!res.data.success) {
          throw new Error("Failed to fetch shift");
        }
        if (!res.data.shift) {
          toast("No upcoming shift");
          setShift(null);
        } else {
          setShift(res.data.shift);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMyShift();
  }, []); // Fixed: Empty dependency array

  if (role !== "user") {
    return <p className='text-zinc-300 text-center my-50 text-3xl '>Please Login first</p>
  }

  if (loading) {
    return <p className="text-zinc-400">Loading shift...</p>;
  }

  if (!shift) {
    return <p className="text-zinc-400">No upcoming shift</p>;
  }

  return (
    <div className="border border-zinc-700 rounded p-4 text-zinc-200 my-7 mx-auto w-2xl flex flex-col">
      <h2 className="text-2xl font-semibold mb-2">Today's Shift</h2>
      <div className='mx-auto text-2xl mt-2'>
      <p><b>Date:</b> {(shift.date).split("-").reverse().join("-")}</p>
      <p className='my-2'><b>Start:</b> {shift.startTime}</p>
      <p><b>End:</b> {shift.endTime}</p>
      </div>
    </div>
  );
}