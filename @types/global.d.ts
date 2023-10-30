import {User} from "@prisma/client";

declare global {
    namespace Express {
        interface Request{
            user: User;
        }
    }

    namespace NodeJS{
        interface ProcessEnv{
            DATABASE_URL: string,
            APP_URL: string,
            SECRET_KEY: string,
            JWT_EXPIRATION: string,
            NODE_ENV: string,
            EMAIL_USER: string,
            EMAIL_PASSWORD: string,
            PORT: string

        }
    }
}

