import React, { useState, useEffect } from "react";
import { Search, SortAsc, SortDesc } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/components/ui/select";
import ConvoCard from "@/components/ConvoCard";
import { useChat } from "@/context/ChatContext";
import ConvoCardSkeleton from "@/components/skeleton/ConvocardSkeleton";

const AllConvos = () => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showSkeleton, setShowSkeleton] = useState(true);

  const chat = useChat();

  // Delay skeleton hide for at least 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [chat.loadingConvos]);

  const filteredAndSorted = Array.isArray(chat.allConvo)
    ? [...chat.allConvo]
        .filter((c) => c.title.toLowerCase().includes(search.toLowerCase()))
        .sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        })
    : [];

  return (
    <div className="min-h-screen bg-gray-900 px-4 py-10 md:px-12">
      <motion.h1
        className="text-3xl md:text-4xl font-extrabold text-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Your Conversations
      </motion.h1>

      {/* Search and Sort Controls */}
      <div className="sticky top-10 z-20 bg-gray-900 py-4 mb-8">
        <div className="flex justify-center">
          <div className="flex gap-3 w-full md:w-2/3 lg:w-1/2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search Conversations..."
                className="pl-10 bg-gray-800 font-manrope font-semibold border-white/10 text-white w-full"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-20 md:w-38 font-space">
              <Select value={sortOrder} onValueChange={setSortOrder}>
                <SelectTrigger className="bg-gray-800 text-white border-white/10 h-full flex items-center justify-center">
                  {sortOrder === "desc" ? (
                    <SortDesc className="w-5 h-5" />
                  ) : (
                    <SortAsc className="w-5 h-5" />
                  )}
                </SelectTrigger>
                <SelectContent className="font-space text-white">
                  <SelectItem value="desc">
                    <SortDesc className="inline-block w-4 h-4 mr-1" />
                    <span className="inline">Newest First</span>
                  </SelectItem>
                  <SelectItem value="asc">
                    <SortAsc className="inline-block w-4 h-4 mr-1" />
                    <span className="inline">Oldest First</span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {chat.loadingConvos || showSkeleton ? (
        <ConvoCardSkeleton count={6} />
      ) : filteredAndSorted.length === 0 ? (
        <p className="text-white text-center col-span-full">
          No conversations found.
        </p>
      ) : (
        <ConvoCard convos={filteredAndSorted} />
      )}
    </div>
  );
};

export default AllConvos;
