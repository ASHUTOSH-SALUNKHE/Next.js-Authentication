"use client";
import Image from "next/image";

import { protectRoute } from './../middleware/middleware';
import {useState , useEffect} from 'react'
import SignUpPage from "./pages/SignUpPage/page";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
export default function Home() {

  const [auth, setAuth] = useState<null | { userId? : string , status : boolean , message : string}>(null);
  const [loading , setLoading] = useState<boolean>(true)
  const router = useRouter();

  useEffect(()=>{
    async function checkAuth(){
        const cookie = await protectRoute();
        setAuth(cookie)
        setLoading(false)
    }
    checkAuth();

    
  },[])

 
    
  

  console.log(auth?.message || "Authentication Pending...");

  

  if(loading){
    return <div>Loading ...</div>;
  }
  
   if (!auth?.status) {
     redirect("/pages/SignUpPage"); // 🔥 Redirects before rendering
   }

    return (
      <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        
     
      </div>
    );
}
