import { useState, useEffect } from 'react';
import { MapPin, Wifi, Coffee, Monitor, Check } from 'lucide-react';
import './index.css';

export function Coworking() {
  const [spaces, setSpaces] = useState<any[]>([]);

  useEffect(() => {
    // Fetch from our new Go API
    fetch('http://localhost:8080/api/coworkings')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' && data.data.length > 0) {
          setSpaces(data.data);
        } else {
          throw new Error("No data");
        }
      })
      .catch(err => {
        console.error("Backend unreachable, using fallback UI data", err);
        setSpaces([
          { id: 'cow-1', name: 'Bali Nomad Hub', city: 'Чангу', country: 'Индонезия', price_daily: 15 },
          { id: 'cow-2', name: 'Digital Tbilisi', city: 'Тбилиси', country: 'Грузия', price_daily: 10 },
          { id: 'cow-3', name: 'Lisbon Tech Hub', city: 'Лиссабон', country: 'Португалия', price_daily: 20 },
        ]);
      });
  }, []);

  useEffect(() => {
    // Magic Mouse Spotlight
    const handleMouseMove = (e: MouseEvent) => {
      const cards = document.querySelectorAll('.magic-card');
      cards.forEach((card: any) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [spaces]);

  return (
    <div className="animate-fade-in" style={{ padding: '0', position: 'relative', minHeight: '100vh' }}>
      
      <div style={{ padding: '5rem 2rem 4rem', background: 'radial-gradient(ellipse at top, rgba(16,185,129,0.15), transparent 60%)', textAlign: 'center', position: 'relative' }}>
        <h1 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1.2, textShadow: '0 10px 40px rgba(16,185,129,0.3)' }}>
          Coworking <br/><span className="gradient-text" style={{ background: 'linear-gradient(to right, #10b981, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Spaces</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Лучшие пространства для работы по всему миру.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto 6rem', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
          
          {spaces.map((space) => (
            <div key={space.id} className="magic-card" style={{ padding: 0, borderRadius: '24px' }}>
              <div style={{ height: '250px', position: 'relative', background: 'linear-gradient(45deg, #0f172a, #1e293b)' }}>
                <img src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&q=80&w=800" alt={space.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, mixBlendMode: 'luminosity' }} />
                
                <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'rgba(16,185,129,0.2)', color: '#10b981', backdropFilter: 'blur(10px)', padding: '0.5rem 1rem', borderRadius: '100px', fontWeight: 'bold', border: '1px solid rgba(16,185,129,0.4)' }}>
                  {space.price_daily}$ / день
                </div>
              </div>
              
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{space.name}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  <MapPin size={16} /> {space.city}, {space.country}
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Wifi size={16}/> 1Gbps</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Coffee size={16}/> Кофе</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Monitor size={16}/> Мониторы</span>
                </div>

                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', borderRadius: '16px', background: 'linear-gradient(135deg, #10b981, #3b82f6)' }}>
                  <Check size={20} /> Забронировать место
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
