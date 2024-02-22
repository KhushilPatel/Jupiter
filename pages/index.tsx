import Image from "next/image";
import { Inter } from "next/font/google";
import login from "./login";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router=useRouter()
  return (
    <div className="flex items-center justify-center h-screen bg-gray-950    w-full
    bg-gradient-to-r
    from-pink-500
    via-red-500
    to-yellow-500
    background-animate">
   
   <button onClick={e=>{
    router.push({
      pathname:"/login"
    })
   }}>Login</button>
    </div>
  )
}
