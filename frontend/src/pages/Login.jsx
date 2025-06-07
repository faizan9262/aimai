import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Label } from "@/components/components/ui/label";
import { Input } from "@/components/components/ui/input";
import { Button } from "@/components/components/ui/button";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return toast.error("All fields are required");
    }
    try {
      toast.loading("Siging In", { id: "login" });
      await auth.login(email, password);
      toast.success("Sign in Successfully", { id: "login" });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: "login" });
    }
  };

  const handleForgotPassword = async () => {
    if (!auth.email) {
      toast.error("Pvovide Your Email to Generate Otp.");
    }
    try {
      toast.loading("Sending Password Reset Otp To Yout Email", {
        id: "reset-password",
      });
      await auth.sendOtpForPasswordReset(auth.email);
      toast.success("6 digit OTP Sent to your email.", {
        id: "reset-password",
      });
      navigate("/reset-password");
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: "reset-password" });
    }
  };

  useEffect(()=>{
    if(auth?.isLoggedIn){
      navigate('/',{replace:true})
    }
  },[auth])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-[98%] md:w-full bg-gray-800 rounded-lg shadow-lg p-4 md:p-8 md:space-y-6 space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ">
          Login Here
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={auth.email}
              onChange={(e) => auth.setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 shadow-sm"
            />
          </div>

          {/* Password */}
          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                required
                placeholder="Enter your password"
                className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 pr-10 text-gray-100 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-200"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex justify-between items-center text-sm">
            <span
              onClick={handleForgotPassword}
              className="text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors"
            >
              Forgot password?
            </span>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full border-1 border-white hover:border-none text-lg rounded-md py-1 px-4 text-white font-semibold"
            variant="ghost"
          >
            Login
          </Button>
        </form>

        {/* Already have account */}
        <p className="text-center cursor-pointer text-gray-400 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
