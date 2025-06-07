import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const StartConversation = () => {

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="max-w-3xl mx-auto text-center space-y-8 mt-20 px-4"
    >
      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 bg-clip-text text-transparent">
        Ready to Chat?
      </h2>

      <p className="text-gray-300 text-lg md:text-xl max-w-xl mx-auto">
        Kickstart your journey by sending your first message. Whether it’s a question, a doubt, or a random idea—Aim.Ai is here to help you out, 24/7.
      </p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-left text-gray-200"
      >
        <div className="bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
          <h4 className="font-semibold text-lg mb-2">💬 Just Ask</h4>
          <p className="text-sm text-gray-400">
            Type anything—from homework questions to startup ideas.
          </p>
        </div>
        <div className="bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
          <h4 className="font-semibold text-lg mb-2">🎯 Always On Point</h4>
          <p className="text-sm text-gray-400">
            Aim.Ai gives you thoughtful and accurate answers instantly.
          </p>
        </div>
        <div className="bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition duration-300">
          <h4 className="font-semibold text-lg mb-2">✨ No Limits</h4>
          <p className="text-sm text-gray-400">
            Ask as much as you want. Curiosity is always welcome.
          </p>
        </div>
      </motion.div>
      <p className="text-sm text-gray-500 italic mt-4">
        “Every great answer starts with a simple question.” – Start your journey now.
      </p>
    </motion.div>
  );
};

export default StartConversation;
