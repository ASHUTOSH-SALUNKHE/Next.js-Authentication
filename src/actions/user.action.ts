"use server"
import {pool} from '../lib/db'
import bcrypt from 'bcrypt'
import { generateToken } from "@/lib/cookie";

export async function addNewUser(userdata : {name : string , email:string , password : string}){
    const { name, email, password } = userdata;
    const client = await pool.connect();

    try{
         if (!name || !email || !password) {
           return { message: "All Fields are required", status: false };
         }

         if (password.length <= 6) {
           return {
             message: "Password lenght should be greater than 5",
             status: false,
           };
         }

        const {rows} = await pool.query(`SELECT id from users WHERE email = $1`,[email])
        if(rows.length > 0){
            return {
              message: "This User Already Exists In The Database",
              status: false,
            };
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password , salt)


        const result = await pool.query(
          `INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *`,
          [name, email, hashedPassword]
        );

        const token = generateToken(result.rows[0].id)
        
        return {
          user: {
            id: result.rows[0].id,
            name: result.rows[0].name,
            email: result.rows[0].email,
          },
          token,
          message: "User signed up successfully",
          status: true,
        };
    }
    catch(err :any){
        console.error("Error while inserting the user", err)
        throw err;
    }
    finally{
        client.release();
    }
    
}


export async function getUser(userdata : {email:string , password:string}){
    const {email , password} = userdata;
    const client = await pool.connect();

    try{
        const {rows} = await pool.query(`SELECT id,name,email from users where email = $1 and password = $2 `,[email,password])

        if(rows.length > 0){
            return rows[0];
        }
        else{
            return null;
        }
    }catch(err){
        console.error("Error while fetching data",err);
        throw err;
    }finally{
        client.release();
    }

}