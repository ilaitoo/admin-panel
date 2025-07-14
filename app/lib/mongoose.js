import mongoose from "mongoose";

export async function mongooseConnection() {
  if (mongoose?.connection?.readyState === 1) {
    try {
      return await mongoose.connection.asPromise();
    } catch (err) {
      console.log(err);
    }
  } else {
    const uri = process.env.MONGODB_URI;
    return await mongoose?.connect(uri);
  }
}
