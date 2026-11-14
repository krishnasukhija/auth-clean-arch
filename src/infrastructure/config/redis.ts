// import 'dotenv/config'
// import { rateLimit } from 'express-rate-limit';
// import { RedisStore } from 'rate-limit-redis';
// import { createClient } from 'redis';



// const client = createClient({
//     url: String(process.env.REDIS_URL) || "redis://localhost:6379"
// })

// // async function createRateLimiterMiddleware(client: typeof RedisClient) {
// client.connect()
//     .then(() => console.log("Connected to Redis")
//     )
//     .catch(err => console.error("Redis connection err", err)
//     );

// const LoginLimiter = rateLimit({
//     store: new RedisStore({
//         sendCommand: async (...args) => {
//             if (!client.isOpen) {
//                 await client.connect();
//             }
//             return client.sendCommand(args);
//         },
//     }),
//     windowMs: 1 * 60 * 1000,
//     limit: 2,
//     message: { error: "You have sent too many request to server please try again later." },
// });

// export default LoginLimiter;


import { createClient, RedisClientType } from 'redis';

let redisClient: RedisClientType | undefined;

(async () => {
    if (!redisClient) {
        redisClient = createClient({ url: String(process.env.REDIS_URL) || "redis://localhost:6379" });
    }
    await redisClient.connect();
})();

export default redisClient;


