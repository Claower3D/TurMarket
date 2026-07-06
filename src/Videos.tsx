import { useState, useEffect } from 'react';
import { Play, Eye, User } from 'lucide-react';
import './index.css';

export function Videos() {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    // Fetch from our new Go API
    fetch('http://localhost:8080/api/videos')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success' && data.data.length > 0) {
          setVideos(data.data);
        } else {
          throw new Error("No data");
        }
      })
      .catch(err => {
        console.error("Backend unreachable, using fallback UI data", err);
        setVideos([
          { id: 'vid-1', title: 'Путешествие по Исландии: Зимняя Сказка', views: 15400, author: 'Антон Птушкин' },
          { id: 'vid-2', title: 'Как собрать рюкзак в горы', views: 8900, author: 'TurMarket Academy' },
          { id: 'vid-3', title: 'Топ 10 скрытых пляжей Бали', views: 24500, author: 'Travel Secrets' },
        ]);
      });
  }, []);

  useEffect(() => {
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
  }, [videos]);

  return (
    <div className="animate-fade-in" style={{ padding: '0', position: 'relative', minHeight: '100vh' }}>
      
      <div style={{ padding: '5rem 2rem 4rem', background: 'radial-gradient(ellipse at top, rgba(239,68,68,0.15), transparent 60%)', textAlign: 'center', position: 'relative' }}>
        <h1 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1.2, textShadow: '0 10px 40px rgba(239,68,68,0.3)' }}>
          TurMarket <br/><span className="gradient-text" style={{ background: 'linear-gradient(to right, #ef4444, #f97316)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Video Platform</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Вдохновляйтесь лучшими видео из путешествий.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto 6rem', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
          
          {videos.map((video) => (
            <div key={video.id} className="magic-card" style={{ padding: 0, borderRadius: '24px' }}>
              <div style={{ height: '220px', position: 'relative', background: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800" alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5, transition: 'opacity 0.3s' }} />
                
                <div style={{ position: 'absolute', width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(239,68,68,0.8)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(10px)', boxShadow: '0 0 30px rgba(239,68,68,0.5)' }}>
                  <Play size={24} fill="currentColor" />
                </div>
              </div>
              
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.4 }}>{video.title}</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={16}/> {video.author}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Eye size={16}/> {video.views}</span>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
