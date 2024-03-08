import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import {ZodType, any, z} from "zod"
import {zodResolver} from '@hookform/resolvers/zod'
import axios from 'axios';
import OTPInput from 'react-otp-input';
import { useRouter } from 'next/router';
import { useCookies } from 'react-cookie';
import Loader  from './Loader'
import { useApi } from '@/store/context';
type formData={
    email:string;
    password:string;
}


const LoginForm = ()=> {
  const [val, setval]:any = useState();
  const [isOtpVerification, setisOtpVerification] = useState(false);
  const [otp, setotp]:any = useState();
  const [cookies, setCookie] = useCookies(["auth"]);
  const [loading, setLoading] = useState(false); // Added loading state
 const api=useApi()
  const router = useRouter();

  const schema:ZodType<formData> =z.object({
    email: z.string().email(),
    password: z.string().min(5, { message: 'Password must contain at least 5 characters' }).max(12, { message: 'Password must not exceed 12 characters' })
   })

  const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<formData>({resolver:zodResolver(schema)}); 
  

  const submitData = async (data: any) => {
    console.log("It worked", data);

    try {
      setLoading(true); // Show loader when the form is submitted

      // let x = await axios.post('https://jupiter.cmdev.cc/admin/auth/login', data);
      let x=await api.logInApi(data);

      console.log(x);
      console.log(x.data);

      setval(x.data);

      if (x.data?.otpRef) {
        setisOtpVerification(true);
      }
    } catch (error) {
      alert(`Error submitting data: ${error}`);
    } finally {
      setLoading(false); // Hide loader when data is received or on error
    }
  };



  const handleOtpSubmit = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true); // Show loader when OTP is submitted

      const payload = {
        otp: otp,
        otpRef: val?.otpRef,
      };

      console.log(otp, 'is valid');

      // const response = await axios.post('https://jupiter.cmdev.cc/admin/auth/otp-verify', payload);
      const response=await api.verifyOtpApi(payload);

      console.log("Data", response.data);

      if (response.data && response.data.session.accessToken) {
        const token = response.data.session.accessToken;
        setCookie('auth', token,{ expires: new Date(Date.now() +7 * 24 * 60 * 60 * 1000) });

        
        console.log("token:", token);
        console.log('Logged In');
        router.push('/dashboard');
      } else {
        alert('Token not found in the response');
      }
    } catch (error) {
      alert('Invalid OTP');
      console.error(`Enter Valid Otp! ${error}`);
    } finally {
      setLoading(false); // Hide loader when data is received or on error
    }
  };

  return (
    <div className='w-full h-screen bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 background-animate'>
    
      <section>
        <main>
          <div className="section-login">
            <div className="container grid grid-col">

              <div className="login-form">
                <h1>User Login</h1>

                <br />
                {!isOtpVerification &&
                  <form onSubmit={handleSubmit(submitData)}>
                    <div className='forms'>
                                <label htmlFor="email">Email:</label>
                                <input type="email"  {...register("email")}  required/><br />
                                 {errors.email && <div className='text-red-600' >{errors.email.message}</div>}
                                <label htmlFor="password">Password:</label>
                                <input type="password" {...register("password")}  id="password" required/><br />
                                {errors.password && <div className='text-red-600'>{errors.password.message}</div>}
                                 <br />
                                 <div className='flex'>
                    <button disabled={isSubmitting} className='btn btn-submit' type="submit">Login</button>
                                 {loading && <div><Loader/></div>}
                                 </div>
                    </div>
                  </form>
                }
                {isOtpVerification && (
                   <form action="" onSubmit={handleOtpSubmit}>
                   <OTPInput
                   value={otp}
                   onChange={setotp}
                   numInputs={6}
                   inputType={'text'}
                   renderSeparator={<span className='!w-3'></span>}
                   inputStyle={`text-gray-900 !w-[4rem] h-10 outline-blue-600 flex gap-x-3`}
                   shouldAutoFocus={true}
                   placeholder='000000'
                   renderInput={(props:any) => <input {...props} />}
                   />
                  <div className="flex">

                    <button disabled={isSubmitting} className='btn btn-submit' type="submit">Submit</button>
                    {loading && <div><Loader/></div>}
                  </div>
                  </form>
                )}
              </div>
            </div>
                   {/* Display loader when loading is true */}
          </div>
        </main>
      </section>
    </div>
  );
}

export default LoginForm;
