import { useState } from "react";
import { Send, Image } from "@mui/icons-material";

const Messages = () => {
  const contacts = [
    { name: "Emma Watsons", avatar: "https://via.placeholder.com/50" },
    { name: "Jonnald Pimienta", avatar: "https://via.placeholder.com/50" },
    { name: "Alice Smith", avatar: "https://via.placeholder.com/50" },
    { name: "Michael Brown", avatar: "https://via.placeholder.com/50" }
  ];

  const [activeChat, setActiveChat] = useState(contacts[0]);
  const [messages, setMessages] = useState({
    "Emma Watsons": [
      { id: 1, sender: "Emma Watsons", text: "Hi! How are you?", type: "text", avatar: "https://via.placeholder.com/50" },
      { id: 2, sender: "Me", text: "I'm good! How about you?", type: "text", avatar: "https://via.placeholder.com/50" },
    ],
    "Jonnald Pimienta": [],
    "Alice Smith": [],
    "Michael Brown": []
  });
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages({
        ...messages,
        [activeChat.name]: [...messages[activeChat.name], { id: messages[activeChat.name].length + 1, sender: "Me", text: input, type: "text", avatar: "https://via.placeholder.com/50" }]
      });
      setInput("");
    }
  };

  const sendImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setMessages({
          ...messages,
          [activeChat.name]: [...messages[activeChat.name], { id: messages[activeChat.name].length + 1, sender: "Me", text: reader.result, type: "image", avatar: "https://via.placeholder.com/50" }]
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 border-r">
        <h2 className="text-lg font-semibold mb-4">Chat</h2>
        <input type="text" placeholder="Search..." className="w-full p-2 border rounded-lg mb-4" />
        <div className="space-y-2">
          {contacts.map((contact) => (
            <div key={contact.name} className={`flex items-center p-2 rounded-lg cursor-pointer ${activeChat.name === contact.name ? "bg-gray-300" : "bg-gray-200"}`} onClick={() => setActiveChat(contact)}>
              <img src={contact.avatar} alt={contact.name} className="w-10 h-10 rounded-full mr-3" />
              <span className="text-sm font-semibold">{contact.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="w-3/4 flex flex-col">
        {/* Header */}
        <div className="flex items-center bg-white p-4 border-b shadow-sm">
          <img src={activeChat.avatar} alt={activeChat.name} className="w-10 h-10 rounded-full mr-3" />
          <h2 className="text-lg font-semibold">{activeChat.name}</h2>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          {messages[activeChat.name].map((msg) => (
            <div key={msg.id} className={`flex items-start mb-4 ${msg.sender === "Me" ? "justify-end" : "justify-start"}`}>
              {msg.sender !== "Me" && <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full mr-2" />}
              <div className={`p-3 max-w-xs rounded-lg ${msg.sender === "Me" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
                {msg.type === "text" ? msg.text : <img src={msg.text} alt="sent" className="max-w-xs rounded-lg" />}
              </div>
              {msg.sender === "Me" && <img src={msg.avatar} alt={msg.sender} className="w-8 h-8 rounded-full ml-2" />}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="flex items-center p-3 bg-white border-t shadow-md">
          <label htmlFor="imageInput" className="cursor-pointer text-gray-500 mr-2">
            <Image />
          </label>
          <input type="file" id="imageInput" accept="image/*" className="hidden" onChange={sendImage} />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-2 border rounded-lg outline-none"
            placeholder="Type your message..."
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} className="ml-2 p-2 bg-blue-500 text-white rounded-lg">
            <Send />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
