import React from 'react'

function MessagesSection() {
  const messages = [
    { id: 1, name: 'Edem Quist', lastMessage: 'Just woke up bruh', time: '2m ago' },
    { id: 2, name: 'Franca Delia', lastMessage: 'Received bruh. Thanks!', time: '5m ago' },
    // Add more messages as needed
  ];

  return (
    <div className="w-80 bg-[#1a1a1a]  p-4 border-l border-gray-200 shadow-lg">
      <input
        type="text"
        placeholder="Search for messages..."
        className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
      />
      <div className="space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className="flex items-center justify-between p-3 hover:bg-gray-600 rounded-lg transition-all cursor-pointer"
          >
            <div className="flex items-center">
              {/* Add user avatar */}
              <div className="w-10 h-10 bg-gray-100 rounded-full flex-shrink-0 mr-3"></div>
              <div>
                <h3 className="font-semibold text-gray-200">{message.name}</h3>
                <p className="text-sm text-gray-200">{message.lastMessage}</p>
              </div>
            </div>
            <span className="text-xs text-gray-300">{message.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default MessagesSection