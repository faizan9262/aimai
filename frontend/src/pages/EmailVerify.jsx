import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/components/ui/card";
import { Input } from "@/components/components/ui/input";
import { Button } from "@/components/components/ui/button";
import { ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

const EmailVerify = () => {
  const auth= useAuth()
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const verifyOtp = async () => {
    try {
      await auth.verifyOtpForEmail(otp); 
      toast.success("Email Verified Successfully.", { id: "otp" });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error?.message || "Verification failed", { id: "otp" });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-950 px-4">
      <Card className="w-full max-w-md p-6 shadow-lg border border-gray-800 bg-gray-900 text-white">
        <CardHeader className="text-center">
          <ShieldCheck className="mx-auto h-10 w-10 text-green-400" />
          <CardTitle className="text-2xl mt-2 font-bold">Verify Your Email</CardTitle>
          <p className="text-sm text-gray-400 mt-1">
            Enter the OTP sent to your registered email address to complete verification.
          </p>
        </CardHeader>

        <CardContent className="flex flex-col gap-4 mt-4">
          <Input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="bg-gray-800 text-white placeholder-gray-500 border border-gray-700"
          />

          <Button variant="ghost" onClick={verifyOtp} className="w-full bg-indigo-600">
            Verify Email
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailVerify;
