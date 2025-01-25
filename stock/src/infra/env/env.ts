import * as dotenv from 'dotenv'
import z from 'zod'

dotenv.config()

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  RABBITMQ_URL: z.string().url(),
})

export const env = envSchema.parse(process.env)