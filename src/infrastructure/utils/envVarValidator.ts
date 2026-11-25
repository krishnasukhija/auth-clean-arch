import { cleanEnv, str, email, json, num, url, host, port } from 'envalid';

const envVarValidator = async () => {
    const env = cleanEnv(process.env, {
        DB_HOST: host(),
        DB_PORT: port({ default: 5434 }),
        DB_NAME: str(),
        DB_USER: str(),
        DB_PASSWORD: str(),
        JWT_SECRET: str(),
        PORT: num({ default: 3000 }),
        REDIS_URL: url(),
        REDIS_PORT: port({ default: 6379 }),
        REDIS_HOST: host(),
    })
}

export default envVarValidator;

