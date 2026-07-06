import { useState, useEffect } from 'react';
import { Heart, MessageCircle, Share2, MapPin, MoreHorizontal } from 'lucide-react';
import './index.css';

export function Community() {
  const [likedPosts, setLikedPosts] = useState<number[]>([]);
  
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/social/feed')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') setPosts(res.data);
      })
      .catch(err => {
        setPosts([
          {
            id: 1,
            author: { name: 'Анна Смирнова', avatar: 'https://i.pravatar.cc/150?img=1' },
            date: '2 часа назад',
            location: 'Камчатка, Россия',
            content: 'Только что вернулись из невероятного тура по Камчатке! Вулканы, гейзеры и океан — это что-то нереальное. Обязательно к посещению! 🌋🌊',
            image_url: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
            likes: 124,
            comments: 18,
          },
          {
            id: 2,
            author: { name: 'Максим Иванов', avatar: 'https://i.pravatar.cc/150?img=11' },
            date: '5 часов назад',
            location: 'Алтай, Россия',
            content: 'Ищу попутчиков для поездки на Алтай в августе. Планируем арендовать джип и проехать по Чуйскому тракту. Нас уже двое, нужно еще 2 человека. Пишите в ЛС!',
            image_url: 'https://images.unsplash.com/photo-1542224566-6e85f2e6772f?w=800&q=80',
            likes: 45,
            comments: 7,
          }
        ]);
      });
  }, []);

  const toggleLike = (id: number) => {
    setLikedPosts(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

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
  }, []);

  return (
    <div className="animate-fade-in" style={{ padding: '0', position: 'relative', minHeight: '100vh' }}>
      
      <div style={{ padding: '5rem 2rem 4rem', background: 'radial-gradient(ellipse at top, rgba(236,72,153,0.15), transparent 60%)', textAlign: 'center', position: 'relative' }}>
        <h1 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1.2, textShadow: '0 10px 40px rgba(236,72,153,0.3)' }}>
          Путешествуй <br/><span className="gradient-text" style={{ background: 'linear-gradient(to right, #ec4899, #f43f5e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Вместе</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Делитесь маршрутами, находите попутчиков и читайте реальные отзывы.
        </p>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto 6rem', padding: '0 2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {posts.map(post => (
            <div key={post.id} className="magic-card" style={{ padding: 0, borderRadius: '24px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden' }}>
              
              <div style={{ padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={post.author.avatar} alt={post.author.name} style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(236,72,153,0.5)' }} />
                  <div>
                    <h4 style={{ fontWeight: 800, fontSize: '1.1rem' }}>{post.author.name}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <MapPin size={14} /> {post.location}
                    </p>
                  </div>
                </div>
                <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><MoreHorizontal /></button>
              </div>

              <div style={{ padding: '2rem' }}>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{post.content}</p>
                {post.image_url && (
                  <div style={{ borderRadius: '16px', overflow: 'hidden', height: '400px', background: 'rgba(0,0,0,0.2)' }}>
                    <img src={post.image_url} alt="Post" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s', cursor: 'pointer' }} onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} />
                  </div>
                )}
              </div>
              
              <div style={{ padding: '1.5rem 2rem', background: 'rgba(0,0,0,0.2)', display: 'flex', gap: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <button onClick={() => toggleLike(post.id)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: likedPosts.includes(post.id) ? '#ec4899' : 'var(--text)', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 600, transition: 'color 0.3s' }}>
                  <Heart size={24} fill={likedPosts.includes(post.id) ? '#ec4899' : 'none'} />
                  {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: 'var(--text)', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 600 }}>
                  <MessageCircle size={24} /> {post.comments}
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: 'var(--text)', cursor: 'pointer', fontSize: '1.1rem', fontWeight: 600, marginLeft: 'auto' }}>
                  <Share2 size={24} />
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
