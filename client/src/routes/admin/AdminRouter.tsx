import { Route, Routes } from "react-router-dom";
import Login from "../../Pages/admin/Login";
import Homepage from "../../Pages/admin/Homepage";
import UserList from "../../Pages/admin/UserList"
import WorkerList from "../../Pages/admin/WorkerList"
import NotFound from "../../Pages/admin/NotFoundAdmin";

function AdminRouter(){
  return(
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<Homepage/>}/>
      <Route path="/userlist" element={<UserList/>}/>
      <Route path="/workerlist" element={<WorkerList/>}/>

      <Route path ="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default AdminRouter