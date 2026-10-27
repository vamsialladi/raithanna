import { useState } from 'react';
import { Send, CheckCheck, User, Phone, MapPin } from 'lucide-react';
import { mockMessages } from '../data/mockNotifications';
import { useToast } from '../context/ToastContext';

export const MessagesPage = () => {
  const [messagesList, setMessagesList] = useState(mockMessages);
  const [selectedFarmerId, setSelectedFarmerId] = useState(mockMessages[0].farmerId);
  const [inputMessage, setInputMessage] = useState('');
  const showToast = useToast();

  const activeChat = messagesList.find((m) => m.farmerId === selectedFarmerId) || messagesList[0];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: 'buyer',
      text: inputMessage.trim(),
      time: 'Just now'
    };

    setMessagesList((prev) =>
      prev.map((c) =>
        c.farmerId === selectedFarmerId
          ? {
              ...c,
              lastMessage: inputMessage.trim(),
              lastTime: 'Just now',
              conversation: [...c.conversation, newMsg]
            }
          : c
      )
    );

    setInputMessage('');
    showToast('Message sent to farmer!');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          Direct Farmer Messages
        </h2>
        <p className="text-xs text-gray-500 mt-0.5">
          Ask questions directly to farmers regarding harvests, organic methods, and dispatch
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-xs grid grid-cols-1 md:grid-cols-12 min-h-[550px] overflow-hidden">
        {/* Left: Chat List */}
        <div className="md:col-span-4 border-r border-gray-100 flex flex-col">
          <div className="p-4 border-b border-gray-100">
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">
              Farmers ({messagesList.length})
            </h4>
          </div>

          <div className="divide-y divide-gray-50 overflow-y-auto flex-1">
            {messagesList.map((chat) => (
              <div
                key={chat.farmerId}
                onClick={() => setSelectedFarmerId(chat.farmerId)}
                className={`p-3.5 flex items-center gap-3 cursor-pointer transition-colors ${
                  selectedFarmerId === chat.farmerId
                    ? 'bg-emerald-50/70 border-l-4 border-[#198754]'
                    : 'hover:bg-gray-50'
                }`}
              >
                <img
                  src={chat.farmerAvatar}
                  alt={chat.farmerName}
                  className="w-10 h-10 rounded-full object-cover shrink-0 ring-1 ring-emerald-500/20"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h5 className="text-xs font-bold text-gray-900 truncate">
                      {chat.farmerName}
                    </h5>
                    <span className="text-[10px] text-gray-400">{chat.lastTime}</span>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate mt-0.5">
                    {chat.lastMessage}
                  </p>
                </div>
                {chat.unread > 0 && (
                  <span className="w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                    {chat.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right: Active Conversation */}
        <div className="md:col-span-8 flex flex-col justify-between">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-white">
            <div className="flex items-center gap-3">
              <img
                src={activeChat.farmerAvatar}
                alt={activeChat.farmerName}
                className="w-9 h-9 rounded-full object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-gray-900">{activeChat.farmerName}</h4>
                <p className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Online
                </p>
              </div>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="p-5 overflow-y-auto space-y-3 flex-1 bg-gray-50/40">
            {activeChat.conversation.map((msg) => {
              const isMe = msg.sender === 'buyer';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-2xl text-xs leading-relaxed ${
                      isMe
                        ? 'bg-[#198754] text-white rounded-br-xs shadow-2xs'
                        : 'bg-white text-gray-800 rounded-bl-xs border border-gray-200 shadow-2xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-gray-400 mt-1 px-1">{msg.time}</span>
                </div>
              );
            })}
          </div>

          {/* Input Box */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 border-t border-gray-100 bg-white flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Message ${activeChat.farmerName}...`}
              className="flex-1 px-4 py-2.5 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-[#198754] focus:bg-white"
            />
            <button
              type="submit"
              className="p-2.5 bg-[#198754] hover:bg-[#14532D] text-white rounded-xl transition-colors shadow-2xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
