import User from "../models/User.model.js";
import { compare, hash } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { generateOtp } from "../utils/generateOtp.js";
import { htmlContent } from "../utils/mailLayoutHtml.js";
import { sendMail } from "../utils/sendMail.js";

const COOKIE_NAME = "auth-cookie";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All credentials are required!" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(409).json({ message: "User already exists." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password length should be more than 6 characters" });
    }

    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const symbolRegex = /[!@#$%&]/;

    if (!uppercaseRegex.test(password)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one uppercase letter" });
    }

    if (!numberRegex.test(password)) {
      return res.status(400).json({ message: "Password must contain at least one number" });
    }

    if (!symbolRegex.test(password)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one special character (!@#$%&)" });
    }

    const hashedPassword = await hash(password, 10);
    const user = new User({
      username: name,
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = createToken(user._id.toString(), email, "7d");

    res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS);
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Lax is more permissive in dev
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      name: user.username,
      email: user.email,
      profilePic:user.profilePicture
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong during signup." });
  }
};


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All credentials are required!" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User does not exist." });
    }

    const isPasswordMatched = await compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(403).json({ message: "Invalid credentials!" });
    }

    const token = createToken(user._id.toString(), email, "7d");

    res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS);
    // res.cookie(COOKIE_NAME, token, COOKIE_OPTIONS);
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // Lax is more permissive in dev
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      name: user.username,
      email: user.email,
      profilePic:user.profilePicture
    }); 
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong during login." });
  }
};


export const logoutUser = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not exist or Token Malfunctioned" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.clearCookie(COOKIE_NAME, COOKIE_OPTIONS);

    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while authorization" });
  }
};


export const verifyUser = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not exist or Token Malfunctioned" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    return res.status(200).json({
      message: "OK",
      name: user.username,
      email: user.email,
      profilePic:user.profilePicture,
      emailVerified:user.emailVerified
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while authorization" });
  }
};


export const sendVerifyEmailOtp = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not exist or Token Malfunctioned" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const otp = generateOtp();
    user.emailVerficationOtp = otp;
    user.emailVerficationOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const mailSubject = "Email Verification Otp.";
    const mailHtml = htmlContent(otp);

    await sendMail(user.email, mailSubject, mailHtml);

    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while sending email verification OTP",
    });
  }
};

export const verifyEmailOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User not exist or Token Malfunctioned" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (user.emailVerficationOtp !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    if (user.emailVerficationOtpExpiresAt < new Date()) {
      return res.status(401).json({ message: "OTP Expired" });
    }

    user.emailVerficationOtp = "";
    user.emailVerficationOtpExpiresAt = 0;
    user.emailVerified = true;
    await user.save();

    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while email verification",
    });
  }
};


export const sendPassswordResetOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({email})
    if (!user) {
      return res.status(401).json({ message: "User not exist or Token Malfunctioned" });
    }

    const otp = generateOtp();
    user.passwordResetOtp = otp;
    user.passwordResetOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    const mailSubject = "Password Reset Otp.";
    const mailHtml = htmlContent(otp);

    await sendMail(user.email, mailSubject, mailHtml);

    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong while sending password reset OTP",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { otp,newPassword,email } = req.body;
    const user = await User.findOne({email});
    if (!user) {
      return res.status(401).json({ message: "User does not exist or token malfunctioned" });
    }

    if (user.passwordResetOtp !== otp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    if (user.passwordResetOtpExpiresAt < new Date()) {
      return res.status(401).json({ message: "OTP expired" });
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password length should be more than 6 characters" });
    }

    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const symbolRegex = /[!@#$%&]/;

    if (!uppercaseRegex.test(newPassword)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one uppercase letter" });
    }

    if (!numberRegex.test(newPassword)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one number" });
    }

    if (!symbolRegex.test(newPassword)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one special character (!@#$%&)" });
    }

    const newHashedPassword = await hash(newPassword, 10);

    user.passwordResetOtp = "";
    user.passwordResetOtpExpiresAt = 0;
    user.password = newHashedPassword;
    await user.save();

    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while resetting password" });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User does not exist or token malfunctioned" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const isMatchedPassword= await compare(oldPassword,user.password)

    if(!isMatchedPassword){
      if (!isPasswordMatched) {
        return res.status(403).json({ message: "Invalid Previous Password!" });
      } 
    }

    if (newPassword.length < 6) {
      return res
        .status(400)
        .json({ message: "Password length should be more than 6 characters" });
    }

    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const symbolRegex = /[!@#$%&]/;

    if (!uppercaseRegex.test(newPassword)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one uppercase letter" });
    }

    if (!numberRegex.test(newPassword)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one number" });
    }

    if (!symbolRegex.test(newPassword)) {
      return res
        .status(400)
        .json({ message: "Password must contain at least one special character (!@#$%&)" });
    }

    const newHashedPassword = await hash(newPassword, 10);

    user.password = newHashedPassword;
    await user.save();

    return res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Something went wrong while updating password" });
  }
};


export const changeProfilePic = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res.status(401).json({ message: "User does not exist or token malfunctioned" });
    }

    if (user._id.toString() !== res.locals.jwtData.id) {
      return res.status(401).json({ message: "Unauthorized" });
    } 

    const userId = user._id

    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = req.file.path;

    // Update user profile picture in DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePicture: imageUrl },
      { new: true }
    );

    res.status(200).json({
      message: "Profile picture updated successfully",
      profilePicture: updatedUser.profilePicture,
    });
  } catch (error) {
    console.error("Error changing profile picture:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
