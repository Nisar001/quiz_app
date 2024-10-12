import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
dotenv.config()

export const ConnectDB = async() => {
   try {
      const connection = await mongoose.connect(process.env.MONGO_URL)
      console.log(`Databse Connected on ${connection.connection.host}`.bgGreen.white)
   } catch (error) {
      console.log(`Databse not Connected`.bgRed.white, error)
      process.exit(1);
   }
}