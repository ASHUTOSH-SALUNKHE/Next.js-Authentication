-- Users table
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name TEXT NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL
            );

        -- Posts table
            CREATE TABLE IF NOT EXISTS posts (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                content TEXT NOT NULL,
                likes INT DEFAULT 0,
                comments INT DEFAULT 0,
                user_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_posts_user

                FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
            );

        -- Comments table
            CREATE TABLE IF NOT EXISTS comments (
                id SERIAL PRIMARY KEY,
                text TEXT NOT NULL,
                post_id INT NOT NULL,
                user_id INT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                
                CONSTRAINT fk_comments_post
                    FOREIGN KEY(post_id) REFERENCES posts(id) ON DELETE CASCADE,
                
                CONSTRAINT fk_comments_user
                    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
            );