import { useState, useEffect } from 'react';
import { PlayCircle, Headphones, Star, Clock, Lock } from 'lucide-react';
import './index.css';

export function MediaPlatform() {
  const [media, setMedia] = useState<{videos: any[], podcasts: any[]}>({ videos: [], podcasts: [] });

  useEffect(() => {
    fetch('http://localhost:8080/api/media')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') setMedia(res.data);
      })
      .catch(err => {
        console.error("Failed to load media", err);
      });
  }, []);

  return (
    <div className="animate-fade-in" style={{ padding: '0', position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(236, 72, 153, 0.1)', borderRadius: '16px' }}>
            <PlayCircle size={40} color="#ec4899" />
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.2 }}>TurMarket <span style={{ color: '#ec4899' }}>Media</span></h1>
            <p style={{ color: 'var(--text-muted)' }}>Академия путешествий, подкасты и аудиогиды</p>
          </div>
        </div>

        {/* Videos Section */}
        <div style={{ marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PlayCircle color="#ec4899" /> Видео и Академия
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {media.videos.map(video => (
              <div key={video.id} style={{ background: 'var(--surface)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)', position: 'relative', cursor: 'pointer', transition: 'transform 0.3s' }} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-5px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ position: 'relative', height: '180px' }}>
                  <img src={video.cover_image} alt={video.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', bottom: '10px', right: '10px', background: 'rgba(0,0,0,0.7)', padding: '0.2rem 0.5rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>{video.duration}</div>
                  {video.is_premium && (
                    <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(234, 179, 8, 0.9)', padding: '0.2rem 0.5rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Lock size={12} /> Premium
                    </div>
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }} className="hover-play">
                    <PlayCircle size={48} color="white" />
                  </div>
                </div>
                {video.progress > 0 && (
                  <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)' }}>
                    <div style={{ height: '100%', background: '#ec4899', width: `${video.progress}%` }} />
                  </div>
                )}
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{video.title}</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{video.author}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Podcasts Section */}
        <div>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Headphones color="#8b5cf6" /> Подкасты и Аудиогиды
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {media.podcasts.map(podcast => (
              <div key={podcast.id} style={{ background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', padding: '1rem', display: 'flex', alignItems: 'center', gap: '1.5rem', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseOut={e => e.currentTarget.style.background = 'var(--surface)'}>
                <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={podcast.cover_image} alt={podcast.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <PlayCircle size={32} color="white" />
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{podcast.title}</h3>
                    {podcast.is_premium && <div style={{ background: 'rgba(234, 179, 8, 0.2)', color: '#eab308', padding: '0.1rem 0.4rem', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>PREMIUM</div>}
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{podcast.author}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> {podcast.duration}</span>
                  </div>
                </div>
                {podcast.progress > 0 && (
                  <div style={{ width: '100px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ flex: 1, height: '4px', background: 'rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', background: '#8b5cf6', width: `${podcast.progress}%` }} />
                    </div>
                    <span style={{ fontSize: '0.8rem', color: '#8b5cf6', fontWeight: 'bold' }}>{podcast.progress}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
