import * as dotenv from 'dotenv'
import z from 'zod'

dotenv.config()

const envSchema = z.object({
  RABBITMQ_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)