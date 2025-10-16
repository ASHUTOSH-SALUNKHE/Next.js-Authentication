import { Pool } from "pg";

export const pool = new Pool({
  //connectionString: process.env.DATABASE_URL,
  //ssl: true,

  user: "postgres", 
  host: "localhost", 
  database: "trash_posting", 
  password: "ashu2357", 
  port: 5432,
});
