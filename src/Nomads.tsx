import { useState, useEffect } from 'react';
import { Briefcase, Code, MapPin, CheckCircle } from 'lucide-react';
import './index.css';

export function Nomads() {
  const [nomads, setNomads] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/nomads')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success' && res.data.length > 0) setNomads(res.data);
        else throw new Error("No data");
      })
      .catch(err => {
        setNomads([
          { id: 'nom-1', user_name: 'Alex Developer', profession: 'Senior Go Engineer', skills: ['Golang', 'Docker', 'PostgreSQL'], status: 'active', location: 'Бали, Индонезия' },
          { id: 'nom-2', user_name: 'Sarah Designer', profession: 'UI/UX Designer', skills: ['Figma', 'Framer', 'CSS'], status: 'active', location: 'Тбилиси, Грузия' },
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
  }, [nomads]);

  return (
    <div className="animate-fade-in" style={{ padding: '0', position: 'relative', minHeight: '100vh' }}>
      <div style={{ padding: '5rem 2rem 4rem', background: 'radial-gradient(ellipse at top, rgba(168,85,247,0.15), transparent 60%)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '1.5rem', lineHeight: 1.2, textShadow: '0 10px 40px rgba(168,85,247,0.3)' }}>
          Digital <span className="gradient-text" style={{ background: 'linear-gradient(to right, #a855f7, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Nomads</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem' }}>База цифровых кочевников. Находите специалистов и объединяйтесь.</p>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto 6rem', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {nomads.map((nomad: any) => (
            <div key={nomad.id} className="magic-card" style={{ padding: '2rem', borderRadius: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #a855f7, #ec4899)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'white', fontWeight: 'bold' }}>
                  {nomad.user_name[0]}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{nomad.user_name}</h3>
                  <div style={{ color: '#a855f7', fontWeight: 600 }}>{nomad.profession}</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                <MapPin size={16} /> {nomad.location}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
                {nomad.skills.map((skill: string) => (
                  <span key={skill} style={{ padding: '0.25rem 0.75rem', background: 'rgba(168,85,247,0.1)', color: '#d8b4fe', borderRadius: '100px', fontSize: '0.85rem' }}>{skill}</span>
                ))}
              </div>
              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #a855f7, #ec4899)' }}>Связаться</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
