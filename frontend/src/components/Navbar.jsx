import React, { useState } from "react";
import { Button } from "./components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom"; 

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); 
  const [open, setOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  return (
    <header className="w-full sticky top-0 bg-gray-900 px-5 z-50">
      <div className="flex h-14 items-center justify-between">
        <div
          onClick={() => navigate("/")}
          className="text-2xl cursor-pointer font-space font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
        >
          Aim.ai
        </div>
        {auth.isLoggedIn && (
          <nav className="hidden md:flex font-space gap-6">
            <Button
              onClick={() => navigate("/")}
              className={`text-xl  font-semibold ${
                isActive("/") ? "bg-indigo-300" : "text-white"
              }`}
              variant="ghost"
            >
              Home
            </Button>
            <Button
              onClick={() => navigate("/chats")}
              className={`text-xl  font-semibold ${
                isActive("/chats") ? "bg-indigo-300" : "text-white"
              }`}
              variant="ghost"
            >
              Chats
            </Button>
            <Button
              onClick={() => navigate("/about")}
              className={`text-xl font-semibold ${
                isActive("/about") ? "bg-indigo-300" : "text-white"
              }`}
              variant="ghost"
            >
              About
            </Button>
          </nav>
        )}

        <div className="flex items-center gap-2">
          {auth.isLoggedIn ? (
            <Avatar
              onClick={() => navigate("/profile")}
              className="hidden md:block"
            >
              <AvatarImage src={auth.user.profilePic} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          ) : (
            <Button
              className="border-2 border-white hover:border-none text-lg rounded-md py-2 px-4 text-white font-semibold"
              variant="ghost"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          )}

          {auth.isLoggedIn && (
            <Sheet open={open} onOpenChange={setOpen}>
              {" "}
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white border-none"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-gray-900 h-[32%] rounded-md m-3 border-2 border-white w-1/2"
              >
                <nav className="flex flex-col font-space gap-4 mt-6">
                  <div className="flex items-center gap-3">
                    <Avatar
                      onClick={() => {
                        navigate("/profile");
                        setOpen(false);
                      }}
                      className="ml-4 w-12 h-12"
                    >
                      <AvatarImage src={auth.user.profilePic} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <p className="text-white  text-xl">Faizan</p>
                  </div>
                  <Button
                    onClick={() => {
                      navigate("/");
                      setOpen(false);
                    }} 
                    variant="ghost"
                    className={`w-full justify-start text-xl ${
                      isActive("/") ? "text-indigo-300" : "text-white"
                    }`}
                  >
                    Home
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/chats");
                      setOpen(false);
                    }}
                    variant="ghost"
                    className={`w-full justify-start text-xl ${
                      isActive("/chats") ? "text-indigo-300" : "text-white"
                    }`}
                  >
                    Chats
                  </Button>
                  <Button
                    onClick={() => {
                      navigate("/about");
                      setOpen(false);
                    }}
                    variant="ghost"
                    className={`w-full justify-start text-xl ${
                      isActive("/about") ? "text-indigo-300" : "text-white"
                    }`}
                  >
                    About
                  </Button>
                </nav>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
