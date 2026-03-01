const Redis = require("ioredis").default;

const redis = new Redis({
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD
})

redis.on("connect", () => {
    console.log("Server connected to redis...")
})

redis.on("error", (error) => {
    console.log(error)
})

module.exports = redis