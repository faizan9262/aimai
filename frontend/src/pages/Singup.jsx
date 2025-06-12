import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Input } from "@/components/components/ui/input";
import { Button } from "@/components/components/ui/button";
import { Label } from "@/components/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const Singup = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");
    const reEnterPassword = formData.get("reEnterPassword");

    if (!name || !email || !password || !reEnterPassword) {
      return toast.error("All fields are required");
    }

    if (password !== reEnterPassword) {
      return toast.error("Password Did Matched");
    }
    try {
      toast.loading("Siging In", { id: "signup" });
      await auth.signup(name, email, password);
      toast.success("Sign in Successfully", { id: "signup" });
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message, { id: "signup" });
    }
  };

  // useEffect(()=>{
  //     if(auth?.user){
  //       navigate('/',{replace:true})
  //     }
  //   },[auth])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-[98%] md:w-full bg-gray-900 rounded-lg shadow-lg p-4 md:p-8 md:space-y-6 space-y-3">
      <h2 className="text-2xl md:text-3xl font-bold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ">
          Sign Up Here
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <Label
              htmlFor="name"
              className="block text-sm font-medium text-gray-300"
            >
              Name
            </Label>
            <Input
              id="name"
              type="text"
              name="name"
              required
              placeholder="Your full name"
              className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1"
            />
          </div>

          {/* Email */}
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
              required
              placeholder="you@example.com"
              className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1"
            />
          </div>

          {/* Password */}
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
                className="mt-1 block w-full pr-10 rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-white"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <Label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-300"
            >
              Confirm Password
            </Label>
            <div className="relative">
              <Input
                id="confirm-password"
                type={showConfirmPassword ? "text" : "password"}
                name="reEnterPassword"
                required
                placeholder="Confirm your password"
                className="mt-1 block w-full pr-10 rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-gray-100 placeholder-gray-500 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1"
              />
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer text-gray-400 hover:text-white"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </div>
            </div>
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            className="w-full border-1 border-white hover:border-none text-lg rounded-md py-2 px-4 text-white font-semibold"
            variant="ghost"
          >
            Sign Up
          </Button>
        </form>

        {/* Already have account */}
        <p className="text-center cursor-pointer text-gray-400 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-indigo-400 hover:text-indigo-300 font-medium"
          >
            Log in
          </span>
        </p>
      </div>
    </div>
  );
};

export default Singup;
