import { useState, useEffect } from 'react';
import { FileText, Clock, Check, Globe2 } from 'lucide-react';
import './index.css';

export function Visas() {
  const [visas, setVisas] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/visas')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success' && res.data.length > 0) setVisas(res.data);
        else throw new Error("No data");
      })
      .catch(err => {
        setVisas([
          { id: 'visa-1', country: 'США', visa_type: 'Туристическая (B1/B2)', price: 250, processing_days: 45 },
          { id: 'visa-2', country: 'Шенген (Испания)', visa_type: 'Туристическая (С)', price: 120, processing_days: 14 },
          { id: 'visa-3', country: 'ОАЭ', visa_type: 'Freelance Visa', price: 1500, processing_days: 21 },
        ]);
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
  }, [visas]);

  return (
    <div className="animate-fade-in" style={{ padding: '0', position: 'relative', minHeight: '100vh' }}>
      <div style={{ padding: '5rem 2rem 4rem', background: 'radial-gradient(ellipse at top, rgba(59,130,246,0.15), transparent 60%)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.2, textShadow: '0 10px 40px rgba(59,130,246,0.3)' }}>
          Визовый <span className="gradient-text" style={{ background: 'linear-gradient(to right, #3b82f6, #06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Центр</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem' }}>Оформление виз, ВНЖ и гражданства "под ключ" по всему миру.</p>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto 6rem', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {visas.map((visa: any) => (
            <div key={visa.id} className="magic-card" style={{ padding: '2rem', borderRadius: '24px', borderTop: '4px solid #3b82f6' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{visa.country}</h3>
                <FileText size={32} color="#3b82f6" />
              </div>
              <div style={{ color: '#93c5fd', fontSize: '1.1rem', fontWeight: 600, marginBottom: '2rem' }}>{visa.visa_type}</div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(59,130,246,0.05)', borderRadius: '16px', marginBottom: '2rem' }}>
                <div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Срок оформления</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}><Clock size={16}/> ~{visa.processing_days} дней</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>Стоимость</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#3b82f6' }}>${visa.price}</div>
                </div>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>Оформить заявку</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
