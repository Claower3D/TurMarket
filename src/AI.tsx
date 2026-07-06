import { useState, useRef, useEffect } from 'react';
import { Bot, Send, User as UserIcon, Sparkles } from 'lucide-react';
import './index.css';

export function AI() {
  const [messages, setMessages] = useState([
    {
      text: 'Привет! Я твой персональный AI-ассистент TurMarket. Куда бы ты хотел отправиться в следующий раз?',
      isBot: true
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Scroll to bottom of chat
    const chatContainer = document.getElementById('chat-container');
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { text: input, isBot: false }]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        text: 'Анализирую ваш запрос... Я могу предложить несколько отличных вариантов для путешествия. Какой климат вы предпочитаете?', 
        isBot: true 
      }]);
    }, 1500);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '0', position: 'relative', minHeight: 'calc(100vh - 80px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* Sci-Fi Ambient Background */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(236,72,153,0.15) 0%, rgba(0,0,0,0) 70%)', zIndex: -1, pointerEvents: 'none', filter: 'blur(60px)' }}></div>
      <div style={{ position: 'absolute', top: '20%', left: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, rgba(0,0,0,0) 70%)', zIndex: -1, pointerEvents: 'none', filter: 'blur(40px)' }}></div>

      <div style={{ width: '100%', maxWidth: '1000px', padding: '2rem' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(236,72,153,0.1)', color: '#ec4899', marginBottom: '1.5rem', boxShadow: '0 0 40px rgba(236,72,153,0.3)', border: '1px solid rgba(236,72,153,0.4)', animation: 'float 6s ease-in-out infinite' }}>
            <Bot size={40} />
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            TurMarket <span className="gradient-text" style={{ background: 'linear-gradient(to right, #ec4899, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>AI Assistant</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Ваш персональный квантовый гид. Задайте вопрос или попросите составить идеальный маршрут.</p>
        </div>

        {/* Floating Glass Terminal */}
        <div className="magic-card" style={{ background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(30px)', borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }}>
          
          {/* Mac-like Header */}
          <div style={{ padding: '1rem 1.5rem', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <div className="widget-dot red"></div>
            <div className="widget-dot yellow"></div>
            <div className="widget-dot green"></div>
            <span style={{ marginLeft: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={14} color="#ec4899" /> AI Brain Active
            </span>
          </div>

          <div id="chat-container" style={{ height: '450px', overflowY: 'auto', padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {messages.map((msg, idx) => (
              <div key={idx} className="animate-fade-in" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', flexDirection: msg.isBot ? 'row' : 'row-reverse' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: msg.isBot ? 'linear-gradient(135deg, #ec4899, #a855f7)' : 'rgba(99, 102, 241, 0.2)', color: msg.isBot ? 'white' : 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: msg.isBot ? '0 0 20px rgba(236,72,153,0.4)' : 'none' }}>
                  {msg.isBot ? <Bot size={20} /> : <UserIcon size={20} />}
                </div>
                <div style={{ background: msg.isBot ? 'rgba(255,255,255,0.05)' : 'var(--primary)', color: 'white', padding: '1rem 1.5rem', borderRadius: '1.5rem', borderTopLeftRadius: msg.isBot ? '0' : '1.5rem', borderTopRightRadius: !msg.isBot ? '0' : '1.5rem', maxWidth: '80%', lineHeight: 1.6, border: msg.isBot ? '1px solid rgba(255,255,255,0.1)' : 'none', boxShadow: !msg.isBot ? '0 10px 20px -10px var(--primary)' : 'none' }}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="animate-fade-in" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #ec4899, #a855f7)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(236,72,153,0.4)' }}>
                  <Bot size={20} />
                </div>
                <div style={{ display: 'flex', gap: '0.3rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '1.5rem', borderTopLeftRadius: '0', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ width: '8px', height: '8px', background: '#ec4899', borderRadius: '50%', animation: 'float 1s infinite' }}></span>
                  <span style={{ width: '8px', height: '8px', background: '#ec4899', borderRadius: '50%', animation: 'float 1s infinite 0.2s' }}></span>
                  <span style={{ width: '8px', height: '8px', background: '#ec4899', borderRadius: '50%', animation: 'float 1s infinite 0.4s' }}></span>
                </div>
              </div>
            )}
          </div>

          <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', gap: '1rem', background: 'rgba(255,255,255,0.03)', padding: '0.5rem', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSend()}
                placeholder="Спланируй мне маршрут в Японию на 7 дней..." 
                style={{ flex: 1, background: 'transparent', border: 'none', color: 'white', padding: '0.5rem 1.5rem', outline: 'none', fontSize: '1.1rem' }}
              />
              <button onClick={handleSend} className="btn btn-primary" style={{ borderRadius: '100px', padding: '0 1.5rem', background: 'linear-gradient(135deg, #ec4899, #a855f7)', boxShadow: '0 0 20px rgba(236,72,153,0.4)' }}>
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
