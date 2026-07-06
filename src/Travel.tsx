import { useState, useEffect } from 'react';
import { MapPin, Calendar, Users, Search, Star, Plane, Coffee, Wifi, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from './store/useAuthStore';
import './index.css';

export function Travel() {
  const hotels = [
    {
      id: 1,
      name: 'Rixos Premium Tekirova',
      location: 'Анталья, Турция',
      rating: 4.9,
      reviews: 1250,
      price: '15 000',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Всё включено', '1 линия', 'Спа']
    },
    {
      id: 2,
      name: 'Radisson Blu Resort',
      location: 'Сочи, Россия',
      rating: 4.7,
      reviews: 840,
      price: '12 500',
      image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Бассейн', 'Завтрак', 'Фитнес']
    },
    {
      id: 3,
      name: 'The Ritz-Carlton',
      location: 'Дубай, ОАЭ',
      rating: 5.0,
      reviews: 3200,
      price: '45 000',
      image: 'https://images.unsplash.com/photo-1542314831-c6a4d1409a50?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['Люкс', 'Частный пляж', 'Вид на залив']
    }
  ];

  const { user } = useAuthStore();
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);

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

  const handleBook = async (hotelId: number) => {
    if (!user) {
      alert("Пожалуйста, войдите в систему для бронирования");
      return;
    }
    setBookingStatus('loading');
    setTimeout(() => {
      setBookingStatus(`Бронирование отеля успешно оформлено!`);
      setTimeout(() => setBookingStatus(null), 3000);
    }, 1000);
  };

  return (
    <div className="animate-fade-in" style={{ padding: '0', position: 'relative' }}>
      
      <div style={{ padding: '6rem 2rem', background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.2), transparent 70%)', textAlign: 'center', position: 'relative' }}>
        <h1 style={{ fontSize: '4rem', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
          Куда отправимся <span className="gradient-text">сегодня?</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 3rem' }}>Откройте для себя эксклюзивные туры и отели по всему миру с умным бронированием.</p>

        <div style={{ maxWidth: '900px', margin: '0 auto', background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(20px)', borderRadius: '100px', padding: '1rem', display: 'flex', gap: '1rem', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '100px' }}>
            <MapPin size={20} color="var(--primary)" />
            <input type="text" placeholder="Направление" style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none', fontSize: '1.1rem' }} />
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '100px' }}>
            <Calendar size={20} color="var(--primary)" />
            <input type="text" placeholder="Даты" style={{ background: 'transparent', border: 'none', color: 'white', width: '100%', outline: 'none', fontSize: '1.1rem' }} />
          </div>
          <button className="btn btn-primary" style={{ borderRadius: '100px', padding: '0 2.5rem', fontSize: '1.1rem', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
            <Search size={20} />
            Найти
          </button>
        </div>
      </div>

      {bookingStatus && bookingStatus !== 'loading' && (
        <div className="animate-fade-in" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '1rem', borderRadius: '0.5rem', marginBottom: '2rem', border: '1px solid var(--success)', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', maxWidth: '600px', margin: '0 auto 2rem' }}>
          <CheckCircle2 size={24} />
          <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>{bookingStatus}</span>
        </div>
      )}

      {/* Hotel Cards Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 4rem', padding: '0 2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem' }}>Популярные направления</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2.5rem' }}>
          
          {hotels.map(hotel => (
            <div key={hotel.id} className="magic-card" style={{ padding: 0, borderRadius: '24px' }}>
              <div style={{ height: '250px', background: 'linear-gradient(45deg, #1e293b, #334155)', position: 'relative' }}>
                <img src={hotel.image} alt={hotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', padding: '0.5rem 1rem', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold' }}>
                  <Star size={16} color="#eab308" fill="#eab308" /> {hotel.rating}
                </div>
              </div>
              
              <div style={{ padding: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{hotel.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}>
                      <MapPin size={16} /> {hotel.location}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                      {hotel.price}₽
                    </div>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>за ночь</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Wifi size={16}/> Wi-Fi</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Coffee size={16}/> Завтрак</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Plane size={16}/> Трансфер</span>
                </div>

                <button 
                  onClick={() => handleBook(hotel.id)}
                  disabled={bookingStatus === 'loading'}
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '1rem', borderRadius: '16px' }}
                >
                  {bookingStatus === 'loading' ? 'Оформление...' : 'Забронировать'}
                </button>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
