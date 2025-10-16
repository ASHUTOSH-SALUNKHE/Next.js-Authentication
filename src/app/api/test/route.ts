import {pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await pool.connect();
    const { rows } = await pool.query(`

        -- Users table
            CREATE TABLE IF NOT EXISTS users (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            );

        -- Posts table
            CREATE TABLE IF NOT EXISTS posts (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                likes INT DEFAULT 0,
                comments INT DEFAULT 0,
                user_id UUID NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

                CONSTRAINT fk_posts_user
                    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
            );

        -- Comments table
            CREATE TABLE IF NOT EXISTS comments (
                id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
                text TEXT NOT NULL,
                post_id UUID NOT NULL,
                user_id UUID NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                
                CONSTRAINT fk_comments_post
                    FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE,
                
                CONSTRAINT fk_comments_user
                    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
            );
    `);

    client.release();

    return NextResponse.json({ rows });
  } catch (err : any) {
    console.error("Database error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
