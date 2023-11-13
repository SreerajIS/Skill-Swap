export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  name: string;
  phone: string;
  confirmPassword: string;
}

export interface forgotPassword {
  email:string;
}

export interface ResetPasswordPayload {
  // id:string;
  password:string;
  confirmPassword:string;
}

export interface RegisterWorkerPayload {
  profile_photo:any;
  certificate_photo:object;
  about:string;
  works: string;
  charges:number;
}