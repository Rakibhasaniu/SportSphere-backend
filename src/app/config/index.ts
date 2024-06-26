import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export const config = {
  db_url: process.env.DATABASE_URL,
  port: process.env.PORT,
  salt_round: process.env.BCRYPT_SALT,
  access_secret: process.env.ACCESS_SECRET,
  refresh_secret: process.env.REFRESH_SECRET,
  node_env:process.env.NODE_ENV,
}
