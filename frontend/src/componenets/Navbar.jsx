import axios from 'axios'
import { Link } from 'react-router-dom'
import { useAuth } from './AuthContex';


export default function Navbar() {

  const { loggedIn, setLoggedIn,loading,setLoading,setRole,role } = useAuth();

  const path = import.meta.env.VITE_SERVER;


  const logout =async () =>{
    setLoading(true)
    await axios.post(`${path}/user/logout`,{}, {withCredentials:true})
    .then(res=>
      setLoggedIn(false)
     
    )
    .catch(err=>{
      setLoggedIn(false)
     
      console.log(err)
    })
    setRole(null)
    setLoading(false)
  }

 
  return (
    <div  className='text-zinc-200 flex felx-wrap  py-2 mx-auto border-b border-zinc-700 w-full justify-center'>
     {loading ? <div className='gap-4 flex felx-wrap'>
        <Link to="/" className='w-20 h-6 rounded  bg-gray-700 animate-pulse'></Link>
       {!loggedIn && <Link to="/login" className='w-20 h-6 rounded  bg-gray-700 animate-pulse'></Link>}
        {!loggedIn && <Link to="/signup"  className='w-20 h-6 rounded  bg-gray-700 animate-pulse'></Link>}
        {loggedIn && <button onClick={logout}  className='w-20 h-6 rounded  bg-gray-700 animate-pulse'></button>}
        {role=="admin" && <Link to="/" className='w-20 h-6 rounded  bg-gray-700 animate-pulse'></Link>}
    </div>
    :
    <div className='flex felx-wrap gap-4'>
        <Link  className='hover:underline' to="/">Home</Link>
       {!loggedIn && <Link  className='hover:underline'  to="/login">login</Link>}
        {!loggedIn && <Link className='hover:underline'  to="/signup">sign Up</Link>}
        {role === "admin" && (<Link className='hover:underline'  to="/assignshift">Assign Shift</Link>)}
        {role === "admin" && (<Link className='hover:underline'  to="/addemployee">Add Employee</Link>)}
        {loggedIn && <button className="cursor-pointer hover:underline" onClick={logout}>Log out</button>}
        
    </div> }
    </div>
  )
}
