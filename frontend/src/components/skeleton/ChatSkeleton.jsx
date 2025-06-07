import React from "react";

const ChatSkeleton = ({ count = 6 }) => {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 px-4 pt-20 pb-6 scrollbar-hide">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className={`flex gap-3 items-start max-w-[92%] sm:max-w-[80%] animate-pulse ${
            idx % 2 === 0 ? "ml-auto flex-row-reverse" : ""
          }`}
        >
          {/* Avatar */}
          <div className="shrink-0">
            <div className="w-7 h-7 rounded-full bg-gray-700" />
          </div>

          {/* Message bubble */}
          <div
            className={`w-full p-1 rounded-md space-y-2 ${
              idx % 2 === 0 ? "bg-indigo-600" : "bg-gray-900"
            }`}
          >
            {/* Alternate text and code mimic */}
            {idx % 3 === 0 ? (
              <div className="space-y-1">
                <div className="h-3 w-3/4 rounded bg-gray-700" />
                <div className="h-3 w-2/3 rounded bg-gray-700" />
                <div className="h-3 w-1/2 rounded bg-gray-700" />
              </div>
            ) : (
              <div className="rounded bg-gray-950 p-3 space-y-2">
                <div className="flex justify-between items-center text-xs bg-gray-800 px-3 py-2 rounded">
                  <div className="h-2 w-12 bg-gray-600 rounded" />
                  <div className="h-2 w-8 bg-gray-600 rounded" />
                </div>
                <div className="h-3 w-11/12 rounded bg-gray-700" />
                <div className="h-3 w-10/12 rounded bg-gray-700" />
                <div className="h-3 w-8/12 rounded bg-gray-700" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatSkeleton;
