import { useState, useEffect } from 'react';
import { Plane, Calendar, MapPin, Users, CheckCircle, Clock } from 'lucide-react';
import './index.css';

export function Bookings() {
  const [bookings, setBookings] = useState<any>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/bookings')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') setBookings(res.data);
      })
      .catch(err => {
        setBookings([
          {
            id: "bkg-101",
            booking_number: "TRM-88219-DXB",
            hotel_name: "Burj Al Arab Jumeirah",
            location: "Дубай, ОАЭ",
            start_date: "2024-11-15",
            end_date: "2024-11-22",
            guests_count: 2,
            total_price: 8500.00,
            currency: "USD",
            status: "confirmed",
            image_url: "https://images.unsplash.com/photo-1582653291997-079a1c04e5d1?w=400&q=80",
          },
          {
            id: "bkg-102",
            booking_number: "TRM-44123-IST",
            hotel_name: "Raffles Istanbul",
            location: "Стамбул, Турция",
            start_date: "2024-05-10",
            end_date: "2024-05-15",
            guests_count: 1,
            total_price: 2100.00,
            currency: "USD",
            status: "completed",
            image_url: "https://images.unsplash.com/photo-1542314831-c6a4d14d8c85?w=400&q=80",
          }
        ]);
      });
  }, []);

  return (
    <div className="animate-fade-in" style={{ padding: '0', position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1000px', margin: '4rem auto', padding: '0 2rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(249, 115, 22, 0.1)', borderRadius: '16px' }}>
            <Plane size={40} color="#f97316" />
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.2 }}>Мои <span style={{ color: '#f97316' }}>Поездки</span></h1>
            <p style={{ color: 'var(--text-muted)' }}>Ваши бронирования отелей, билеты и туры</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {bookings.map((booking: any) => (
            <div key={booking.id} style={{ background: 'var(--surface)', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column' }}>
              
              {/* Image & Main Info Row */}
              <div style={{ display: 'flex', gap: '2rem', padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
                <img src={booking.image_url} alt={booking.hotel_name} style={{ width: '160px', height: '160px', borderRadius: '16px', objectFit: 'cover' }} />
                
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{booking.hotel_name}</h2>
                      <div style={{ 
                        background: booking.status === 'confirmed' ? 'rgba(16,185,129,0.1)' : 'rgba(255,255,255,0.05)', 
                        color: booking.status === 'confirmed' ? '#10b981' : 'var(--text-muted)',
                        padding: '0.25rem 0.75rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem'
                      }}>
                        {booking.status === 'confirmed' ? <CheckCircle size={14} /> : <Clock size={14} />}
                        {booking.status === 'confirmed' ? 'Подтверждено' : 'Завершено'}
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                      <MapPin size={16} /> {booking.location}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '2rem' }}>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Даты поездки</div>
                      <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Calendar size={16} color="#f97316"/> {booking.start_date} — {booking.end_date}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Гости</div>
                      <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Users size={16} color="#3b82f6"/> {booking.guests_count} человека
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Row */}
              <div style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Номер бронирования</div>
                  <div style={{ fontWeight: 'bold', fontFamily: 'monospace' }}>{booking.booking_number}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Итого</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>${booking.total_price.toFixed(2)}</div>
                  </div>
                  {booking.status === 'confirmed' ? (
                    <button className="btn btn-primary" style={{ background: '#f97316' }}>Управление бронью</button>
                  ) : (
                    <button className="btn" style={{ border: '1px solid var(--border)', background: 'transparent' }}>Забронировать снова</button>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
