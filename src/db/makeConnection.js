import mongoose from 'mongoose'

mongoose.set('debug', true)

const makeConnection = async () => {
  const connectionString = process.env.DB_URI

  try {
    return await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  } catch (error) {
    console.error(error)
  }
}

export default makeConnection
