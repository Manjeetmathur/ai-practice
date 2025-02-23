import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

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
    <div className="bg-gray-800 flex justify-center items-center min-h-screen w-full p-4">
      <div className="relative flex flex-col w-full max-w-lg h-[90vh] bg-gray-700 rounded-lg shadow-2xl overflow-hidden">
        {/* Chat Messages */}
        <div className="flex flex-col w-full h-full p-4 space-y-2 overflow-auto">
          {codes.map((message, idx) => (
            <p
              key={idx}
              className={`p-2 border-2 rounded-lg text-sm sm:text-base ${
                idx % 2 === 0
                  ? "text-gray-300 self-end bg-gray-600"
                  : "text-white self-start bg-gray-500"
              }`}
            >
              {message}
            </p>
          ))}
          {/* Empty div to ensure scrolling to the latest message */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={review} className="flex w-full bg-gray-600 p-2 rounded-b-lg">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="flex-grow px-3 py-2 text-white bg-gray-800 rounded-l-md outline-none"
            placeholder="Type a message..."
          />
          <button
            type="submit"
            className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-r-md"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
