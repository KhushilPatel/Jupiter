import React from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form';
import {ZodType, any, z} from "zod"
import {zodResolver} from '@hookform/resolvers/zod'
import axios from 'axios';
import OTPInput from 'react-otp-input';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; 
import { useAuth } from '@/store/auth';


type formData={
    email:string;
    password:string;
}

const LoginForm = () => {
    const [val, setval]:any = useState()
    const [isOtpVerification, setisOtpVerification] = useState(false)
    const [otp, setotp]:any = useState()

    const router=useRouter()


   const schema:ZodType<formData> =z.object({
    email: z.string().email(),
    password: z.string().min(5).max(12)
   })

  const {register,handleSubmit,formState:{errors}}=useForm<formData>({resolver:zodResolver(schema)}); 

   const submitData=async (data:any)=>{
    console.log("It worked",data);

    let x= await axios.post('https://jupiter.cmdev.cc/admin/auth/login',data)
    console.log(x); 
    console.log(x.data);    //otpRef and Otp
    
    setval(x.data)
    
    if(x.data?.otpRef){
        setisOtpVerification(true)
    }
   }
  
   //IF YOU WANT TO STORE DATA IN LOCAL-STORAGE

//    const handleOtpSubmit=async (e:any)=>{
//        e.preventDefault()
//        try {
//         const payload={
//             otp: otp ,   //we get this direct from user input in the text field
//             otpRef: val?.otpRef       //we got it from the previous response
//           }
//           console.log(otp,"is valid");
          
//         let  y=await axios.post('https://jupiter.cmdev.cc/admin/auth/otp-verify',payload)
        
//        alert("Logged In") 
//        console.log(y.data);

//        //Generate Token and store into locak storage and Redirect to Dashboard Page
//        localStorage.setItem("token",JSON.stringify(y.data))
//                router.push("/home")
          
            
//     } catch (error) {
//         alert("Invalid OTP")
//         console.error(`Enter Valid Otp! ${error}`);
//        }
        
//     }



//IF YOU WANT TO STORE DATA IN COOKIES  

const handleOtpSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const payload = {
        otp: otp,   //we get this direct from user input in the text field
        otpRef: val?.otpRef,    //we got it from the previous response
      };

      console.log(otp, 'is valid');

      const response = await axios.post('https://jupiter.cmdev.cc/admin/auth/otp-verify', payload);
      
      console.log("Data",response.data);

      // Generate Token and store into cookies
      if (response.data && response.data.session.accessToken) {
        const token = response.data.session.accessToken;
        Cookies.set('token', token, { expires: 7 }); // Set the token in cookies, expires in 7 days
        console.log("token:",token);
        // storeTokenInCookies(token)
        alert('Logged In');

        // Redirect to Dashboard Page
        router.push('/home');
      } else {
        alert('Token not found in the response');
      }
    } catch (error) {
      alert('Invalid OTP');
      console.error(`Enter Valid Otp! ${error}`);
    }
  };

  return (

    <div className=' w-full
    h-screen
    bg-gradient-to-r
    from-pink-500
    via-red-500
    to-yellow-500
    background-animate'>
      <section>
        <main>
            <div className="section-login">
                <div className="container grid grid-col">
                    
                    <div className="login-form">
                        <h1>User Login</h1>
                        
                        <br />
                        {!isOtpVerification &&
                        <form onSubmit={handleSubmit(submitData) }>
                          
                            <div className='forms'>
                                <label htmlFor="email">Email:</label>
                                <input type="email"  {...register("email")}  required/><br />
                                 {errors.email && <div className='text-red-600' >{errors.email.message}</div>}
                                <label htmlFor="password">Password:</label>
                                <input type="password" {...register("password")}  id="password" required/><br />
                                {errors.password && <div className='text-red-600'>{"password must contain more than 5 char"}</div>}
                                 <br />
                                 <button className='btn btn-submit' type="submit" >Login</button>
                            </div>
                            
                        </form>
}
{isOtpVerification &&(
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
       
            <button className='btn-submit btn-submit:hover btn-outline-success button btn text-sm' type="submit">Submit</button>
   
    </form>
)}
                    </div>
                </div>
            </div>
        </main>
      </section>
    </div>

  )
}

export default LoginForm
