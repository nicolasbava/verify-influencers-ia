import React, { useState } from "react";
import { fetchDataFromIA } from "../api/perplexityApi";

const ChatBox: React.FC = () => {
  const [userInput, setUserInput] = useState<string>("");
  const [messages, setMessages] = useState<any[]>([
    {
      "role": "system",
      "content": "You are an AI that searches health claims in tweets and podcast transcripts of health influencers. Extract and provide the result in JSON format with the following structure: { name, biography (max 75 words), claims (array of strings), yearlyRevenue (number in USD), qFollowers (number, total followers across all social media platforms) }. Focus only on health-related claims. Example claim: 'Viewing sunlight within 30-60 minutes of waking enhances cortisol release'. Return only the JSON output and nothing else."
    }
    
  ]); 
  const [ setResponses] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const updatedMessages = [
      ...messages,
      { role: "user", content: userInput },
    ];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const result = await fetchDataFromIA(updatedMessages);
      setResponses((prev) => [...prev, result.choices[0].message.content]);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: result.choices[0].message.content },
      ]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      setUserInput("");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">AI Medical Chat Assistant</h1>
      </div>
      <div className="border p-4 mb-4 rounded-lg h-64 overflow-y-auto bg-gray-100">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 ${
              message.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block px-3 py-2 rounded-lg ${
                message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
            >
              {message.content}
            </span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your query..."
          className="flex-grow px-4 py-2 border rounded-lg"
        />
        <button
          onClick={handleSend}
          disabled={loading}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
