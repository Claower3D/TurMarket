import { useState, useEffect } from 'react';
import { Radio, Users, Heart, ShieldCheck } from 'lucide-react';
import './index.css';

export function StreamsAndInsurance() {
  const [data, setData] = useState<any>({ streams: [], insurance: [] });

  useEffect(() => {
    setData({
      streams: [
        { id: 's-1', title: 'Live: Восхождение на Эверест', streamer: 'Alpinist Pro', viewers: 14500, isLive: true },
        { id: 's-2', title: 'Прогулка по ночному Токио', streamer: 'Japan Walker', viewers: 3200, isLive: true },
      ],
      insurance: [
        { id: 'i-1', name: 'Базовая туристическая', coverage: 50000, price: 15, type: 'Медицинская' },
        { id: 'i-2', name: 'Экстрим: Горные лыжи', coverage: 100000, price: 45, type: 'Спорт' },
      ]
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.magic-card');
      cards.forEach((card: any) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [data]);

  return (
    <div className="animate-fade-in" style={{ padding: '0', position: 'relative', minHeight: '100vh' }}>
      <div style={{ padding: '5rem 2rem 4rem', background: 'radial-gradient(ellipse at top, rgba(244,63,94,0.15), transparent 60%)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.2, textShadow: '0 10px 40px rgba(244,63,94,0.3)' }}>
          Стримы & <span className="gradient-text" style={{ background: 'linear-gradient(to right, #f43f5e, #10b981)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Страховки</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem' }}>Смотрите мир в реальном времени и путешествуйте в безопасности.</p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto 6rem', padding: '0 2rem' }}>
        
        {/* Streams Section */}
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Radio size={32} color="#f43f5e" /> Прямые эфиры</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
          {data.streams.map((stream: any) => (
            <div key={stream.id} className="magic-card" style={{ padding: 0, borderRadius: '24px' }}>
              <div style={{ height: '220px', position: 'relative', background: '#000' }}>
                <img src="https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?auto=format&fit=crop&q=80&w=800" alt={stream.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, borderRadius: '24px 24px 0 0' }} />
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', background: '#f43f5e', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '100px', fontWeight: 'bold', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem', animation: 'pulse 2s infinite' }}>
                  <span style={{ width: '8px', height: '8px', background: 'white', borderRadius: '50%' }}></span> LIVE
                </div>
                <div style={{ position: 'absolute', bottom: '1rem', right: '1rem', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '8px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Users size={14} /> {stream.viewers}
                </div>
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '0.5rem' }}>{stream.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{stream.streamer}</p>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #f43f5e, #fb923c)' }}>Смотреть трансляцию</button>
              </div>
            </div>
          ))}
        </div>

        {/* Insurance Section */}
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><ShieldCheck size={32} color="#10b981" /> Страхование</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {data.insurance.map((ins: any) => (
            <div key={ins.id} className="magic-card" style={{ padding: '2rem', borderRadius: '24px', borderLeft: '4px solid #10b981' }}>
              <div style={{ color: '#10b981', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.5rem' }}>{ins.type}</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>{ins.name}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Покрытие</span>
                <span style={{ fontWeight: 'bold' }}>до ${ins.coverage.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 900, color: '#10b981' }}>
                <span>${ins.price} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ полис</span></span>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #10b981, #059669)' }}>Купить страховку</button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
