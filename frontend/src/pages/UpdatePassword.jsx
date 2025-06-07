import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Label } from "@/components/components/ui/label";
import { Input } from "@/components/components/ui/input";
import { Button } from "@/components/components/ui/button";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react"; // If using lucide-react

const UpdatePassword = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const oldPassword = formData.get("oldPassword");
    const newPassword = formData.get("newPassword");

    if (!oldPassword || !newPassword) {
      return toast.error("All fields are required");
    }
    try {
      toast.loading("Updating Your Password", { id: "update-password" });
      await auth.updateYourPassword(oldPassword, newPassword);
      toast.success("Your Password Is Successfully Updated", { id: "update-password" });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: "update-password" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-[95%] md:w-full bg-gray-800 rounded-lg shadow-lg p-4 md:p-8 md:space-y-6 space-y-3">
      <h2 className="text-xl md:text-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-bold text-center">
          Update Your Password
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="relative">
            <Label htmlFor="oldPassword" className="block text-sm font-medium text-gray-300">
              Current Password
            </Label>
            <Input
              id="oldPassword"
              type={showOldPassword ? "text" : "password"}
              name="oldPassword"
              required
              placeholder="Enter your current password"
              className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 shadow-sm pr-10"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword((prev) => !prev)}
              className="absolute top-8 right-3 text-gray-400 hover:text-gray-200"
              tabIndex={-1}
            >
              {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="relative">
            <Label htmlFor="newPassword" className="block text-sm font-medium text-gray-300">
              New Password
            </Label>
            <Input
              id="newPassword"
              type={showNewPassword ? "text" : "password"}
              name="newPassword"
              required
              placeholder="Enter new password"
              className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 shadow-sm pr-10"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((prev) => !prev)}
              className="absolute top-8 right-3 text-gray-400 hover:text-gray-200"
              tabIndex={-1}
            >
              {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div className="flex justify-between items-center text-sm">
            <span
              onClick={() => navigate("/forgot-password")}
              className="text-indigo-400 cursor-pointer hover:text-indigo-300 transition-colors"
            >
              Forgot password?
            </span>
          </div>

          <Button
            type="submit"
            className="w-full border-1 border-white hover:border-none text-lg rounded-md py-1 px-4 text-white font-semibold"
            variant="ghost"
          >
            Update Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
