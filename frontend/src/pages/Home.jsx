import EmployeeTable from '../componenets/EmployeeTable'
import { useAuth } from '../componenets/AuthContex';
import Shifts from '../componenets/Shifts';
import SingleShift from '../componenets/SingleShift';


export default function Home() {
   const {role } = useAuth()

   if(role === "admin")
  return (

<div>
  <div className='mb-10'>
    {(role==="admin") && <EmployeeTable/>}
  </div>
  
  <Shifts/>
</div>

  )

  else if(role!= "user"){
    return(
  <div>
  <SingleShift/>
  </div>
    )}

}
