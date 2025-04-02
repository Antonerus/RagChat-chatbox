"use client";

import { MessageSquare } from "lucide-react";
import React, { useState } from "react";

const Page = () => {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/input-website", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: input }),
      });

      if (!response.ok) throw new Error("Failed to submit");
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 overflow-hidden">
      <div className="flex flex-col items-center gap-6 w-full max-w-md overflow-hidden text-white"> {/* Set text to white */}
        <div className="flex flex-col justify-center items-center gap-2">
          <MessageSquare className="size-20 text-blue-500" />
          <h3 className="font-semibold text-xl">Welcome to Chatbox</h3>
          <p className="text-zinc-300 text-sm">To expand the AI’s knowledge and improve the accuracy of its responses, you can easily add a website for it to reference. When you ask the AI questions, it will be able to draw information from this website, allowing it to provide more relevant and informed answers. Insert a website here:</p>
        </div>

        <form className="w-full sm:w-[400px] mx-auto" onSubmit={handleSubmit}>
          <div className="mb-5 flex items-center space-x-2">
            <input
              onChange={handleChange}
              type="url"
              id="website"
              className="w-full bg-zing-800 border border-gray-800 text-white-900 text-sm rounded-lg focus:ring-gray-800 focus:border-gray-800 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="https://lotr.fandom.com/wiki/Aragorn_II"
              required
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
