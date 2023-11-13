import { Route, Routes } from "react-router-dom";
import HomePage from "../../Pages/worker/HomePage";


function WorkerRouter(){
  return(
    <Routes>
      <Route path="/home" element={<HomePage/>}/>
    </Routes>
  )
}

export default WorkerRouter;