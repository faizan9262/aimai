import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/components/ui/avatar";
import { Button } from "@/components/components/ui/button";
import { useAuth } from "../context/AuthContext";
import { MailCheck, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const { user } = auth;
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);


  const emailVerificationOtp = async () => {
    try {
      await auth.sendEmailVerifyOtp();
      toast.success("6 Digit OTP sent to your registered email.", {
        id: "otp",
      });
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: "otp" });
    }
  };

  const handleEditProfilePic = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0]; 
    setSelectedFile(file)
    if (!file) return;

    try {
      toast.loading("Updating Your Profile", { id: "update-profile" });

      const formData = new FormData();
      formData.append("profile", file); 

      await auth.updateProfilePic(formData);

      toast.success("Profile Updated",{id:'update-profile'})

    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: "update-profile" });
    }
  };

  const handleLogout = async () => {
    try {
      toast.loading("Logging out...", { id: "logout" });
      await auth.logout();
      navigate("/");
      toast.success("Logged out successfully", { id: "logout" });
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: "logout" });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-950 px-4 py-10 space-y-6">
      <div className="text-center text-white max-w-md">
      <h2 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Manage Your Account</h2>
        <p className="text-gray-400 text-sm">
          This is your personal profile page. Make sure your information is up
          to date.
          {!user?.isEmailVerified && (
            <>
              <br />
              <span className="text-green-400">Tip:</span> Verify your email to
              access full features.
            </>
          )}
        </p>
      </div>

      <Card className="w-full max-w-md p-6 shadow-lg border border-gray-800 bg-gray-900 text-white">
        <CardHeader className="flex flex-col items-center gap-4 relative">
          <div className="relative">
            <Avatar className="w-20 h-20 border-2 border-indigo-600">
              <AvatarImage src={selectedFile ? URL.createObjectURL(selectedFile) : user?.profilePic} alt="Profile" />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <button
              onClick={handleEditProfilePic}
              className="absolute bottom-0 right-0 bg-gray-800 hover:bg-gray-700 text-white p-1 rounded-full border border-gray-600"
              title="Edit profile picture"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              hidden
            />
          </div>

          <CardTitle className="text-2xl font-bold">
            {user?.name || "User"}
          </CardTitle>
          <p className="text-sm text-gray-400 flex items-center gap-2">
            {user?.email || "user@example.com"}
            {user?.isEmailVerified && (
              <MailCheck className="text-green-500 w-4 h-4" />
            )}
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 mt-4">
          {!user?.isEmailVerified && (
            <Button
              onClick={emailVerificationOtp}
              variant="ghost"
              className="w-full flex items-center border-2 border-white gap-2"
            >
              <MailCheck className="w-5 h-5" />
              Verify Email
            </Button>
          )}
          <Button
            onClick={() => navigate("/update-password")}
            variant="ghost"
            className="w-full border-2 border-white"
          >
            Update Password
          </Button>
          <Button
            onClick={handleLogout}
            variant="destructive"
            className="w-full"
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
