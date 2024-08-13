import { Tedis } from "tedis";

const redisConnection = new Tedis({
  port: process.env.REDIS_HOST as unknown as number,
  host: process.env.REDIS_PORT
})

export default redisConnection