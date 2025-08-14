// // config/mongoDB.js
// import mongoose from "mongoose";

// let cached = global.mongooseConn;
// if (!cached) cached = global.mongooseConn = { conn: null, promise: null };

// const connectDB = async () => {
//   if (cached.conn) return cached.conn;
//   if (!cached.promise) {
//     if (!process.env.MONGODB_URL) {
//       throw new Error("Missing MONGODB_URL");
//     }
//     cached.promise = mongoose
//       .connect(process.env.MONGODB_URL, {
//         dbName: "crm",
//         bufferCommands: false,
//       })
//       .then((m) => m);
//   }
//   cached.conn = await cached.promise;
//   console.log("✅ Mongo connected:", cached.conn.connection.host);
//   return cached.conn;
// };

// export default connectDB;


import mongoose from "mongoose";

let cached = global.mongooseConn;
if (!cached) cached = global.mongooseConn = { conn: null, promise: null };

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  try {
    if (!process.env.MONGODB_URL) {
      throw new Error("Missing MONGODB_URL");
    }

    if (!cached.promise) {
      cached.promise = mongoose.connect(process.env.MONGODB_URL, {
        dbName: "crm",
        bufferCommands: false,
      }).then((m) => m);
    }

    cached.conn = await cached.promise;
    console.log("✅ Mongo connected:", cached.conn.connection.host);
    return cached.conn;
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    throw err; // let caller handle
  }
};

export default connectDB;
