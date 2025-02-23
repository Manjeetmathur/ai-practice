import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import p1 from "/p1.jpg"
function App() {
  // const backendUrl = "http://localhost:3000";
  const backendUrl = "https://ai-practice-backend.onrender.com";
  const [code, setCode] = useState("");
  const [codes, setCodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null); // Ref for auto-scroll

  // Scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [codes]);

  const review = async (e) => {
    e.preventDefault();
    if (!code.trim()) return; // Prevent empty messages

    setCodes((prev) => [...prev, code]); // Add user message
    setLoading(true);
    setCode("");

    try {
      const response = await axios.post(`${backendUrl}/ai/get-review`, {
        code,
      });

      const aiResponse = response.data.result;
      setCodes((prev) => [...prev, aiResponse]); // Add AI response
    } catch (error) {
      console.error("Error fetching AI response:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Chat Header */}
      <div className="bg-gray-900 shadow-md">
        <div className="max-w-3xl mx-auto py-3 px-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src="https://i.pinimg.com/originals/d4/61/07/d46107547da46e04a2b0d343f324203c.jpg"
              alt="Chat avatar"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <h1 className="text-xl font-semibold text-blue-700">❤️My Love❤️</h1>
              <p className="text-sm text-green-500">Online</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 border-t-2 border-gray-200 px-4 pt-4 py-3">
        <form onSubmit={review} className="relative flex">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Type a message..."
            className="w-full focus:outline-none focus:placeholder-gray-400 text-white placeholder-gray-600 pl-4 bg-gray-950 rounded-md py-3"
          />
          <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
            >
              <span className="font-bold">Send</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="h-6 w-6 ml-2 transform rotate-90"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 flex flex-col-reverse overflow-y-auto p-4 space-y-6 space-y-reverse bg-gray-950">
        {codes.map((message, idx) => (
          <div
            key={idx}
            className={`flex items-start ${idx % 2 === 0 ? 'justify-end' : 'justify-start'}`}
          >
            {idx % 2 !== 0 && (
              <img
                src="https://i.pinimg.com/originals/d4/61/07/d46107547da46e04a2b0d343f324203c.jpg"
                alt="My avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <div
              className={`p-3 rounded-lg shadow-sm max-w-xs lg:max-w-md ${idx % 2 === 0
                ? 'bg-white text-blue-800 rounded-tr-none mr-2 ml-10'
                : 'bg-blue-500 text-white rounded-tr-none mr-10'
                }`}
            >
              <p className="text-sm">{message}</p>
            </div>
            {idx % 2 === 0 && (
              <img
                src={p1}
                alt="User avatar"
                className="w-8 h-8 rounded-full mr-2"
              />
            )}

            <div ref={messagesEndRef} />
          </div>
        ))}
      </div>

      {/* Chat Input */}

    </div>

  );
}

export default App;
