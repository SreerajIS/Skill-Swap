import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
// import axios from "axios";
// import styles from "./styles.module.css";
import success from "../../Assets/success.png"
// import { verify } from "crypto";
import { userVerify } from "../../features/axios/api/user";
import {toast, ToastContainer} from 'react-toastify'
// import { Fragment } from "react/cjs/react.production.min";

const EmailVerify = () => {
	const navigate = useNavigate()
	const [validUrl, setValidUrl] = useState(true);
	const param = useParams();
	const notify = (msg:string, type:string)=> 
  type === "error"? toast.error(msg,{position:toast.POSITION.TOP_RIGHT}): toast.success(msg,{position:toast.POSITION.TOP_RIGHT})

	const verifyEmail=async()=>{
		userVerify(param.id,param.token).then((response)=>{
			console.log(response.msg)
			notify(response.msg,"success")
			navigate("/login")
		}).catch((error)=>{
			notify(error.message,"error")
		})
	}

	return (
		<div>
			{validUrl ? (
				<div className="w-screen h-screen flex items-center justify-center flex-col">
					<img src={success} alt="success_img" />
					<h1>Email verified successfully</h1>
						<button onClick={verifyEmail} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-8 rounded-full focus:outline-none cursor-pointer">Login</button>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
			<ToastContainer/>
		</div>
	);
};

export default EmailVerify;
