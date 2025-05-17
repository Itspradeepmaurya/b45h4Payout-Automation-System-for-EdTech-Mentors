import React, { useState } from 'react';
import { Send, User, Search, PaperclipIcon, Smile, MoreVertical } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';

// Mock data for conversations
const conversationsMock = [
  { id: 1, name: 'Alex Johnson', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100', lastMessage: 'I have a question about React hooks', time: '5m ago', unread: 2 },
  { id: 2, name: 'Maria Garcia', avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100', lastMessage: 'Thank you for the session today!', time: '1h ago', unread: 0 },
  { id: 3, name: 'James Wilson', avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100', lastMessage: 'When is our next session?', time: '3h ago', unread: 0 },
  { id: 4, name: 'Emma Thompson', avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=100', lastMessage: 'I finished the assignment', time: '1d ago', unread: 0 },
  { id: 5, name: 'Daniel Lee', avatar: 'https://images.pexels.com/photos/775358/pexels-photo-775358.jpeg?auto=compress&cs=tinysrgb&w=100', lastMessage: 'Can we reschedule?', time: '2d ago', unread: 1 },
];

// Mock data for messages
const messagesMock = [
  { id: 1, sender: 'them', text: 'Hi there, I have a question about React hooks.', time: '10:30 AM' },
  { id: 2, sender: 'me', text: 'Sure, what would you like to know?', time: '10:32 AM' },
  { id: 3, sender: 'them', text: 'I\'m struggling with useEffect dependencies. Whenever I update a state in the useEffect, it causes an infinite loop.', time: '10:34 AM' },
  { id: 4, sender: 'me', text: 'That\'s a common issue. You\'re probably updating a state that\'s also in the dependency array. Can you share your code?', time: '10:36 AM' },
  { id: 5, sender: 'them', text: 'Here it is:\n\nconst [data, setData] = useState([]);\n\nuseEffect(() => {\n  setData([...data, newItem]);\n}, [data]);', time: '10:38 AM' },
  { id: 6, sender: 'me', text: 'I see the problem. You\'re updating `data` inside the effect, but also including it in the dependency array. Try this instead:\n\nuseEffect(() => {\n  setData(prevData => [...prevData, newItem]);\n}, []);', time: '10:40 AM' },
  { id: 7, sender: 'them', text: 'That makes sense! I\'ll try it now.', time: '10:42 AM' },
  { id: 8, sender: 'them', text: 'It worked! Thank you so much for the help.', time: '10:45 AM' },
];

const Chat: React.FC = () => {
  const { user, role } = useAuth();
  const [conversations, setConversations] = useState(conversationsMock);
  const [activeConversation, setActiveConversation] = useState(conversationsMock[0]);
  const [messages, setMessages] = useState(messagesMock);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredConversations = conversations.filter(conversation => 
    conversation.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
  };

  return (
    <div className="h-[calc(100vh-120px)]">
      <div className="flex h-full">
        {/* Conversation sidebar */}
        <div className="w-full md:w-80 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
            <div className="mt-2 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search conversations..."
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map(conversation => (
              <div 
                key={conversation.id}
                onClick={() => setActiveConversation(conversation)}
                className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  activeConversation.id === conversation.id ? 'bg-indigo-50' : ''
                }`}
              >
                <div className="flex items-start">
                  <img 
                    src={conversation.avatar} 
                    alt={conversation.name}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-sm font-medium text-gray-900 truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <span className="ml-2 bg-indigo-600 text-white text-xs font-medium px-2 py-0.5 rounded-full">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat area */}
        <div className="hidden md:flex flex-1 flex-col bg-gray-50">
          {activeConversation ? (
            <>
              <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={activeConversation.avatar} 
                    alt={activeConversation.name}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                  />
                  <div>
                    <h2 className="text-md font-medium text-gray-900">{activeConversation.name}</h2>
                    <p className="text-xs text-gray-500">Last active 5 minutes ago</p>
                  </div>
                </div>
                <button className="p-1 rounded-full hover:bg-gray-100">
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map(message => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[75%] px-4 py-3 rounded-lg ${
                          message.sender === 'me' 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-white text-gray-800 border border-gray-200'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        <p className={`text-xs mt-1 ${message.sender === 'me' ? 'text-indigo-200' : 'text-gray-500'}`}>
                          {message.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex items-center">
                  <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
                    <PaperclipIcon className="h-5 w-5" />
                  </button>
                  <div className="flex-1 mx-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Type your message..."
                    />
                  </div>
                  <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 mr-2">
                    <Smile className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={handleSendMessage}
                    className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <User className="h-12 w-12 text-gray-400 mx-auto" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">No conversation selected</h3>
                <p className="mt-2 text-gray-500">Choose a conversation from the sidebar</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Mobile: Show a message to select a conversation */}
        <div className="flex-1 md:hidden flex items-center justify-center bg-gray-50">
          <div className="text-center p-6">
            <User className="h-12 w-12 text-gray-400 mx-auto" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">Chat Details</h3>
            <p className="mt-2 text-gray-500">
              Select a conversation to view on a larger screen or rotate your device.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;