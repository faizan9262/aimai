import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/components/ui/input";
import { Button } from "@/components/components/ui/button";
import { Label } from "@/components/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  // This would usually come from the previous page

  console.log("Email: ",auth.email);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const otp = formData.get("otp");
    const newPassword = formData.get("newPassword") ;
    const confirmPassword = formData.get("confirmPassword")


    if (!otp || !newPassword || !confirmPassword) {
      return toast.error("All fields are required");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      toast.loading("Resetting password...", { id: "reset" });
      await auth.resetYourPassword(otp,newPassword,auth.email);
      toast.success("Password reset successfully", { id: "reset" });
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong", { id: "reset" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-[98%] md:w-full bg-gray-800 rounded-lg shadow-lg p-4 md:p-8 space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ">
          Reset Password
        </h2>

        {/* Static Email Display */}
        <div>
          <Label className="block text-sm font-medium text-gray-300">Email</Label>
          <Input
            type="email"
            value={auth.email}
            disabled
            className="mt-1 w-full bg-gray-700 text-gray-200 cursor-not-allowed"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input */}
          <div>
            <Label htmlFor="otp" className="block text-sm font-medium text-gray-300">
              OTP
            </Label>
            <Input
              id="otp"
              name="otp"
              type="text"
              required
              placeholder="Enter OTP"
              className="mt-1 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 shadow-sm"
            />
          </div>

          {/* New Password Input */}
          <div className="relative">
            <Label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">
              New Password
            </Label>
            <Input
              id="newPassword"
              name="newPassword"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Enter new password"
              className="mt-1 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 shadow-sm pr-10"
            />
            <div
              className="absolute right-3 bottom-2.5 cursor-pointer text-gray-400"
              onClick={togglePassword}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <Label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
              placeholder="Confirm new password"
              className="mt-1 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 shadow-sm pr-10"
            />
            <div
              className="absolute right-3 bottom-2.5 cursor-pointer text-gray-400"
              onClick={togglePassword}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full border-1 border-white hover:border-none text-lg rounded-md py-1 px-4 text-white font-semibold"
            variant="ghost"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
