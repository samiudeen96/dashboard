

import bcrypt from "bcrypt";
import validator from "validator";
import generateToken from "../lib/generateToken.js";
import userModel from "../models/userModel.js"

// Local register
export const register = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;

    if (!validator.isEmail(email))
      return res.status(400).json({ success: false, message: "Invalid email" });
    if (!password || password.length < 6)
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });

    const existing = await userModel.findOne({ email });
    if (existing)
      return res.status(409).json({ success: false, message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await userModel.create({ firstName, lastName, email, password: hashed, role });

    generateToken(res, user);
    res.status(201).json({
      success: true,
      user: { id: user._id, firstName, lastName, email, role },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Local login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    if (!user.password)
      return res.status(401).json({ success: false, message: "Use Google login" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: "Incorrect password" });

    generateToken(res, user);
    res.status(200).json({
      success: true,
      user: { id: user._id, firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};


export const googleAuthSuccess = (req, res) => {
  try {
    console.log("Google user:", req.user);
    generateToken(res, req.user);
    return res.redirect(`${process.env.CLIENT_URL}/dashboard`);
  } catch (err) {
    console.error("Google OAuth error:", err);
    return res.redirect(`${process.env.CLIENT_URL}/login?error=oauth`);
  }
};


// Logout
export const logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
  res.json({ success: true, message: "Logged out successfully" });
};

// Get profile
export const getMyProfile = (req, res) => {
  if (!req.user) return res.status(401).json({ message: "Not authorized" });
  res.status(200).json({ success: true, user: req.user });
};
