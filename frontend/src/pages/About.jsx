import React from "react";
import { Button } from "@/components/components/ui/button";
import { Card, CardContent } from "@/components/components/ui/card";
import { motion } from "framer-motion";
import {
  Bot,
  Rocket,
  Users,
  Lightbulb,
  Code,
  BrainCog,
  Settings,
  Code2,
  Database,
  Server,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

const features = [
  {
    icon: <Bot className="text-pink-400 w-6 h-6" />,
    title: "AI-Powered Conversations",
    description:
      "Interact naturally with our smart assistant powered by state-of-the-art AI models. Built for speed and understanding.",
  },
  {
    icon: <Rocket className="text-indigo-400 w-6 h-6" />,
    title: "Blazing Fast",
    description:
      "Enjoy seamless response time and optimized performance for every chat session—whether it's your first or your hundredth.",
  },
  {
    icon: <Users className="text-green-400 w-6 h-6" />,
    title: "User-Centric Design",
    description:
      "Crafted with love to ensure a simple, intuitive experience across all screen sizes and devices.",
  },
  {
    icon: <Lightbulb className="text-yellow-400 w-6 h-6" />,
    title: "Always Learning",
    description:
      "Aim.Ai constantly evolves with your usage to better understand your needs and preferences.",
  },
];

const techStack = [
  {
    icon: <Code className="text-cyan-400 w-5 h-5" />,
    label: "React + Vite",
  },
  {
    icon: <Server className="text-cyan-400 w-5 h-5" />,
    label: "Node + Express",
  },
  {
    icon: <Database className="text-cyan-400 w-5 h-5" />,
    label: "MongoDB + Mongoose",
  },
  {
    icon: <BrainCog className="text-purple-400 w-5 h-5" />,
    label: "OpenAI GPT",
  },
  {
    icon: <Settings className="text-orange-400 w-5 h-5" />,
    label: "ShadCN + TailwindCSS",
  },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="min-h-screen px-6 md:px-16 py-20 bg-gray-950 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto text-center space-y-16"
        >
          <section className="space-y-6 font-space">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Welcome to Aim.Ai
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              An AI-powered assistant tailored to bring you smart, fast, and
              friendly conversations — whenever you need them.
            </p>
          </section>

          <section className="grid sm:grid-cols-2 gap-6 text-left">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
              >
                <Card className="bg-gray-800 border border-white/10 hover:border-white/20 hover:shadow-lg transition duration-300">
                  <CardContent className="p-6 py-3 space-y-4">
                    <div className="flex items-center gap-3">
                      {feature.icon}
                      <h3 className="text-xl font-semibold font-space text-white">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 space-manrope">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </section>

          <section className="text-left space-y-6">
            <h2 className="text-3xl font-bold font-space text-white text-center">
              Our Vision & Mission
            </h2>
            <p className="text-gray-300 font-manrope text-md leading-relaxed max-w-3xl mx-auto text-center">
              At Aim.Ai, our vision is to make artificial intelligence
              accessible and meaningful for everyone. Our mission is to empower
              users with intuitive AI tools that can assist, understand, and
              grow alongside them.
            </p>
          </section>

          <section className="text-center space-y-4">
            <h2 className="text-2xl font-space font-semibold text-white">
              Technology Used In <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Aim.Ai</span>
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {techStack.map((tech, i) => (
                <span
                  key={i}
                  className="w-60 font-space flex items-center justify-center gap-1 border border-white/10 bg-gray-800 py-2 rounded-lg text-gray-200 hover:bg-gray-700 transition"
                >
                  {tech.icon}
                  {tech.label}
                </span>
              ))}
            </div>
          </section>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default About;
