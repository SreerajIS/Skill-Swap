import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import UserRouter from "./routes/user/UserRouter"
import { ToastContainer } from 'react-toastify';
import AdminRouter from './routes/admin/AdminRouter';
import WorkerRouter from './routes/worker/WorkerRouter'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path= "/*" element={<UserRouter/>} />
          <Route path="/admin/*" element={<AdminRouter/>}/>
          <Route path="/worker/*" element={<WorkerRouter/>}/>

        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </div>
  );
}

export default App;
