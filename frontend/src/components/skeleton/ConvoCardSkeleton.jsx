import React from "react";
import { Card, CardContent } from "../components/ui/card";
import { motion } from "framer-motion";

const ConvoCardSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * index }}
          className="flex h-full"
        >
          <Card className="flex flex-col justify-between bg-gray-800 border border-white/10 w-full h-full animate-pulse">
            <CardContent className="flex flex-col flex-1 px-6 py-4 text-white gap-4">
              <div className="flex justify-between items-center">
                <div className="w-2/3 h-5 bg-gray-700 rounded-md"></div>
                <div className="w-20 h-4 bg-gray-700 rounded-md"></div>
              </div>
              <div className="w-full h-4 bg-gray-700 rounded-md"></div>
              <div className="w-5/6 h-4 bg-gray-700 rounded-md"></div>
              <div className="w-4/6 h-4 bg-gray-700 rounded-md mb-4"></div>
              <div className="flex gap-2">
                <div className="w-full h-10 bg-gray-700 rounded-md"></div>
                <div className="w-10 h-10 bg-pink-400 rounded-md"></div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default ConvoCardSkeleton;
