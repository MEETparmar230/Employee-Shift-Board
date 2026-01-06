import axios from 'axios';
import  { useState } from 'react'
import toast from 'react-hot-toast';


export default function AddEmployee() {

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        employeeCode: "",
        department: ""
    })

    const path = import.meta.env.VITE_SERVER

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try{
            const res =await axios.post(`${path}/admin/addemployee`,formData,{withCredentials:true})

            if(res.data?.success){
                toast.success(res.data?.message)    
            }
            else{
                toast.error(res.data?.message)
            }
        }
        catch(err){
            console.log(err)
        }
        finally{
            setLoading(false)
            setFormData({
        name: "",
        employeeCode: "",
        department: ""
    })
        }   
    }
    return (
        <div className='text-zinc-200 max-w-xl flex justify-center mx-auto mt-50 shadow'>
            <form onSubmit={handleSubmit} action="" className='border rounded-md p-5 w-full  items-center'>
                <h1 className='mb-10 mt-2 font-bold text-3xl '>Add Employee</h1>
                <div className='flex flex-col w-md  mx-auto'>
                    <div className=' flex justify-between   text-xl'>
                        <label className='font-medium' htmlFor="name">Name</label>
                        <input className='border rounded px-2' id='name' type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className='flex justify-between items-center text-xl my-4'>
                        <label className='font-medium whitespace-nowrap' htmlFor="employeeCode">Employee Code</label>
                        <input className='border my-2 rounded px-2' id='employeeCode' type="number" value={formData.employeeCode} onChange={(e) => setFormData({ ...formData, employeeCode: Number(e.target.value) })} required />
                    </div>
                    <div className='flex justify-between  text-xl'>
                        <label className='font-medium' htmlFor="department">Department</label>
                        <select className='border  rounded px-2 w-70 px-4' id='department' type="text" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} required >
                            <option value="" disabled>Select department</option>
                            <option value="ui/ux">ui/ux</option>
                            <option value="frontend">FrontEnd</option>
                            <option value="Backend">Backend</option>
                            <option value="dev-ops">Devops</option>
                            <option value="testing">Testing</option>
                            <option value="Hr">Hr</option>
                        </select>
                    </div>
                </div>
                <div className='mx-auto w-fit text-xl mt-6'>
                    <button className=' border rounded-md px-4 cursor-pointer mt-4 font-semibold hover:bg-black hover:text-white' type='submit'>{loading ? <p>Loading...</p> : <p>Add</p>}</button>
                </div>
            </form>
        </div>
    )
}
