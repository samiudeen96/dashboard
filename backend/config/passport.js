import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/userModel.js";

try {
  if (
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_CALLBACK_URL
  ) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            const email = profile.emails?.[0]?.value;
            if (!email) return done(new Error("No email from Google"), null);

            let user = await userModel.findOne({ email });
            if (!user) {
              user = await userModel.create({
                googleId: profile.id,
                email: profile.emails[0].value,
                firstName: profile.name?.givenName || "",
                lastName: profile.name?.familyName || "",
                // ⬇ Save Google profile picture
                picture: profile.photos?.[0].value || "",
                password: "",
                role: "client",
              });
            }
            return done(null, user);
          } catch (err) {
            return done(err, null);
          }
        }
      )
    );
  } else {
    console.warn("[Passport] Missing Google OAuth env variables");
  }
} catch (err) {
  console.error("[Passport] Initialization failed:", err);
}

export default passport;
