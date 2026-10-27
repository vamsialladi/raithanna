import React, { useState } from 'react';
import { useMarketplace } from '../../context/MarketplaceContext';
import { ChatIcon } from '../../components/common/Icons';

export default function MessagesPage() {
  const { messages, showToast } = useMarketplace();
  const [selectedMsgId, setSelectedMsgId] = useState(messages[0]?.id);
  const [chatInput, setChatInput] = useState('');
  const [threadMessages, setThreadMessages] = useState([
    { id: '1', sender: 'other', text: 'Namaskaram Ravi Teja. Received the lease payment for North Field.', time: '11:30 AM' },
    { id: '2', sender: 'user', text: 'Thank you Narayana Rao garu. The paddy crop is growing well.', time: '11:35 AM' },
  ]);

  const activeContact = messages.find((m) => m.id === selectedMsgId) || messages[0];

  function handleSend(e) {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setThreadMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), sender: 'user', text: chatInput, time: nowTime },
    ]);
    setChatInput('');
    showToast('Message sent to landowner (Simulated).');
  }

  return (
    <div className="rm-dashboard-content">
      <div className="rm-panel-header" style={{ marginBottom: '18px' }}>
        <div>
          <h1 className="rm-panel-title" style={{ fontSize: '1.5rem' }}>
            Farmer Communications & Messages
          </h1>
          <p style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>
            Direct messaging with landowners, agriculture extension officers, and equipment rental providers.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '16px', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', minHeight: '520px' }}>
        {/* Contact List */}
        <div style={{ borderRight: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #e2e8f0', fontWeight: 800, fontSize: '0.92rem' }}>
            Conversations
          </div>
          <div>
            {messages.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedMsgId(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px 16px',
                  borderBottom: '1px solid #f1f5f9',
                  cursor: 'pointer',
                  background: selectedMsgId === item.id ? '#ffffff' : 'transparent',
                }}
              >
                <img
                  src={item.avatar}
                  alt={item.sender}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.84rem', fontWeight: 750, color: '#0f172a' }}>{item.sender}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.lastMessage}
                  </div>
                </div>
                <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{item.timestamp}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Message Thread */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img
              src={activeContact?.avatar}
              alt={activeContact?.sender}
              style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800 }}>{activeContact?.sender}</div>
              <div style={{ fontSize: '0.72rem', color: '#15803d', fontWeight: 600 }}>Active Online</div>
            </div>
          </div>

          <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {threadMessages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '70%',
                  background: msg.sender === 'user' ? '#16a34a' : '#f1f5f9',
                  color: msg.sender === 'user' ? '#ffffff' : '#0f172a',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  fontSize: '0.85rem',
                }}
              >
                <div>{msg.text}</div>
                <div
                  style={{
                    fontSize: '0.65rem',
                    textAlign: 'right',
                    marginTop: '4px',
                    opacity: 0.8,
                  }}
                >
                  {msg.time}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} style={{ display: 'flex', gap: '10px', padding: '14px 20px', borderTop: '1px solid #e2e8f0' }}>
            <input
              type="text"
              placeholder="Type message to landowner or extension officer..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              style={{
                flex: 1,
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '0.85rem',
                outline: 'none',
              }}
            />
            <button type="submit" className="rm-add-cart-btn" style={{ width: 'auto', padding: '10px 20px' }}>
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
