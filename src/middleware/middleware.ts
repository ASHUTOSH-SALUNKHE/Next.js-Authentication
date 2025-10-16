"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function protectRoute(){
  try {
    
     const cookieStore = await cookies();
     const token: any = cookieStore.get("jwt")?.value;
     
    
    if (!token) {
      console.error("Unauthorized - No Token Provided");
      return { message: "Unauthorized - No Token Provided", status: false };  
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {userId : string}

    if (!decoded) {
      console.error("Unauthorized - Invalid Token");
      return { message: "Unauthorized - Invalid Token", status: false};
    }
    
    return {
      status: true,
      userId: decoded.userId,
      message: "Authentication Successful",
    }; 

  } catch (error: any) {
    console.error("Error in protectRoute:", error.message);
    return {
      message: "Unauthorized - Invalid or Expired Token",
      status: false,
    };
  }
};
