import * as mongoose from 'mongoose'

const connectToMongoDB = async () => {
    try {
      await mongoose.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`)
       console.log('success connected to mongoDB');
    } catch (error: any) {
      console.log(`Failed to connect to MongoDB: ${error.message}`)
    }
  }
  
export default connectToMongoDB