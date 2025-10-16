import jwt from "jsonwebtoken";
import { cookies } from "next/headers";


export const generateToken = async (userId: string) => {
  // Generate JWT
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  // Set cookie in the browser (httpOnly)
  const cookieStore = cookies();
  cookieStore.set({
    name: "jwt",
    value: token,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development",
    maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
    path: "/",
  });

  return token;
};