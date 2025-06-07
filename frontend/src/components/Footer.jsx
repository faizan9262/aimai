import React from "react";
import { Facebook, Twitter, Github, Linkedin } from "lucide-react";
import { Button } from "@/components/components/ui/button";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate()
  return (
    <footer className="bg-gray-950 border-t border-white/10 text-gray-300 px-6 md:px-16 py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        <div className="space-y-3">
          <h2 className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent text-2xl font-bold font-space">Aim.ai</h2>
          <p className="text-sm text-gray-400 font-manrope leading-relaxed">
            Your AI companion for smarter, faster, and more insightful
            conversations. Powered by next-gen models.
          </p>
        </div>
        <div className="space-y-3 font-manrope">
          <h3 className="text-xl font-space font-semibold text-white">
            Resources & Highlights
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="text-gray-400">
              💡 Tips on getting better AI responses
            </li>
            <li className="text-gray-400">
              🚀 Latest performance & model updates
            </li>
            <li className="text-gray-400">
              🧠 Learn how Aim.Ai improves over time
            </li>
            <li className="text-gray-400">
              🎯 Customization features coming soon!
            </li>
          </ul>
        </div>
        <div className="space-y-4 font-manrope">
          <h3 className="text-xl font-semibold font-space text-white">Stay Connected</h3>
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Facebook"
              className="hover:text-blue-500 transition"
            >
              <Facebook />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-sky-400 transition"
            >
              <Twitter />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="hover:text-gray-300 transition"
            >
              <Github />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-blue-300 transition"
            >
              <Linkedin />
            </a>
          </div>
          <Button onClick={()=>navigate('/')} className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white w-full md:w-auto">
            Start Chatting
          </Button>
        </div>
      </div>

      <div className="mt-10 border-t border-white/10 pt-6 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} Aim.Ai — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
