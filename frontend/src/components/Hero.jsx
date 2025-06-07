import React from "react";
import { Button } from "@/components/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto px-4 sm:px-6 text-center space-y-8"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
        Welcome to Your AI Companion, The Aim.Ai
      </h1>
      <p className="text-gray-300 text-lg md:text-xl">
        Ask anything. Get instant answers. Powered by intelligent technology.
      </p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left text-gray-200"
      >
        <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <h3 className="font-semibold text-lg mb-2">🚀 Instant Responses</h3>
          <p className="text-sm text-gray-400">
            Get answers to complex queries in seconds with smart AI.
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <h3 className="font-semibold text-lg mb-2">🧠 Smart Learning</h3>
          <p className="text-sm text-gray-400">
            The AI adapts and improves with every interaction.
          </p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition duration-300">
          <h3 className="font-semibold text-lg mb-2">🔒 Secure & Private</h3>
          <p className="text-sm text-gray-400">
            Your conversations stay private and encrypted.
          </p>
        </div>
      </motion.div>

      <div className="flex justify-center flex-wrap gap-4 mt-6">
        <Button
          className="border-2 border-white hover:border-none text-lg rounded-md py-2 px-4 text-white font-semibold"
          variant="ghost"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </Button>
      </div>

      <p className="text-sm text-gray-500 mt-6 italic">
        “Empowering the curious minds, one question at a time.” – Aim.Ai
      </p>
    </motion.div>
  );
};

export default Hero;
