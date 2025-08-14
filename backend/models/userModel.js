// // models/userModel.js
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     firstName: { type: String, default: "" },       // not required for OAuth
//     lastName:  { type: String, default: "" },       // not required for OAuth
//     email:     { type: String, required: true, unique: true },
//     password:  { type: String, default: "" },       // empty for Google users
//     googleId:  { type: String, default: "" },       // present for Google users
//     role: {
//       type: String,
//       enum: ["admin", "manager", "sales", "client"],
//       default: "client",
//     },
//   },
//   { minimize: false, timestamps: true }
// );

// userSchema.index({ email: 1 }, { unique: true });

// const userModel = mongoose.models.user || mongoose.model("user", userSchema);
// export default userModel;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, default: "" },
    lastName:  { type: String, default: "" },
    email:     { type: String, required: true, unique: true },
    password:  { type: String, default: "" },
    googleId:  { type: String, default: "" },
    role: {
      type: String,
      enum: ["admin", "manager", "sales", "client"],
      default: "client",
    },
  },
  { minimize: false, timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
