import React, { useState } from 'react';

const ChatInterface = () => {
  // Demo data - would come from API in production
  const adminName = "Sarah Johnson";
  const demoMessages = [
    {
      id: 1,
      sender: "student",
      name: "Alex Thompson",
      content: "Hi, I'm interested in the Web Development Bootcamp course. Could you tell me more about the schedule?",
      timestamp: "7:51 PM",
      date: "November 17, 2024"
    },
    {
      id: 2,
      sender: "admin",
      name: adminName,
      content: "Hello Alex! I'd be happy to help you with information about the Web Development Bootcamp. The course runs for 12 weeks with flexible timing options.",
      timestamp: "7:52 PM",
      date: "November 17, 2024"
    }
  ];

  const [messages, setMessages] = useState(demoMessages);
  const [newMessage, setNewMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSendMessage = () => {
    if (newMessage.trim() || selectedFile) {
      const message = {
        id: messages.length + 1,
        sender: "student",
        name: "Alex Thompson",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString(),
        file: selectedFile
      };
      setMessages([...messages, message]);
      setNewMessage('');
      setSelectedFile(null);
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="w-full flex justify-between mt-20 mx-auto max-w-full ">
      {/* Header */}
      <div className=' max-w-5xl  h-full flex flex-col bg-white rounded-lg '>
      <div className=" border-b border-black border-opacity-20 p-4 flex justify-between items-center">
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange  flex items-center justify-center text-white font-semibold">
            {adminName.split(' ').map(word => word[0]).join('')}
          </div>
          <div>
            <h2 className="font-semibold text-black text-2xl">{adminName}</h2>
            <p className="text-sm text-grey">Course Administrator</p>
          </div>


          <svg className="w-6 h-6 relative left-[300%] text-grey hover:text-gray-700 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
         

        </div>

      </div>
      <div className='mx-auto my-5'>
        <div className="text-lg text-black hover:text-gray-700">
          November 17, 2024
        </div>
        <p className="text-sm relative right-20 text-grey hover:text-blue" >By using Hillpad.com, you agree to our <a href="https://www.hillpad.com/blog/terms-of-use" className="text-sm text-orange hover:text-red">
          Terms of Use.
        </a></p>
      </div>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'admin' ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[70%] ${message.sender === 'admin'
                ? 'bg-tmpt_light_blue '
                : 'bg-grey bg-opacity-5  text-black'
                } rounded-lg p-3`}
            >
              <div className="text-sm font-medium">{message.name}</div>
              <hr />
              <br />
              <div className="text-sm">{message.content}</div>
              {message.file && (
                <div className="mt-2 text-sm font-medium">
                  📎 {message.file.name}
                </div>
              )}
              <div className="text-xs mt-1 opacity-70">{message.timestamp}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      {/* Input Area */}
      <div className="border-t p-4 flex items-center">
      <label className="cursor-pointer mr-2">
          <input
            type="file"
            className="hidden"
            onChange={handleFileSelect}
          />
          <svg
            className="w-6 h-6 text-gray-500 hover:text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            />
          </svg>
        </label>
        {/* Message Input */}
        <div className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 flex items-center">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write your message..."
            className="flex-1 focus:outline-none"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          {/* Send Button */}
          <button
            onClick={handleSendMessage}
            className="bg-orange text-white rounded-full p-2 hover:bg-red ml-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 12h14M5 12l6-6m-6 6l6 6"
              />
            </svg>
          </button>
        </div>

        {/* File Upload Button */}
     
      </div>


      {/* File Preview */}
      {selectedFile && (
        <div className="mt-2 text-sm text-gray ">
          Selected file: {selectedFile.name}
        </div>
      )}


      {/* User Info Box */}
   
      </div>
      <div className="sticky  h-full hidden sm:block top-[20%] bg-white rounded-lg shadow-lg p-4 w-64">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange  flex items-center justify-center text-white font-semibold">
            {adminName.split(' ').map(word => word[0]).join('')}
          </div>
          <div>
            <h2 className="font-semibold text-lg">{adminName}</h2>
            <p className="text-sm text-grey">Course Administrator</p>
          </div>
        </div>
        <hr className="my-2" />
        <p className="text-sm text-grey">
          Hillpad Agent 
        </p>
        {/* <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
          View Profile
        </a> */}
      </div>
    </div>
  );
};

export default ChatInterface;