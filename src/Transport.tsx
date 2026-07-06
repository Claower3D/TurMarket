import { useState, useEffect } from 'react';
import { Car, Ship, Check, MapPin } from 'lucide-react';
import './index.css';

export function Transport() {
  const [data, setData] = useState<any>({ cars: [], cruises: [] });

  useEffect(() => {
    fetch('http://localhost:8080/api/transport')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success' && res.data) {
          setData(res.data);
        } else {
          throw new Error("No data");
        }
      })
      .catch(err => {
        console.error("Backend unreachable, using fallback UI data", err);
        setData({
          cars: [
            { id: 'car-1', brand: 'Tesla', model: 'Model 3', price_daily: 85, location: 'Дубай' },
            { id: 'car-2', brand: 'Porsche', model: 'Macan', price_daily: 150, location: 'Барселона' },
          ],
          cruises: [
            { id: 'cr-1', ship: 'Royal Caribbean', route: 'Средиземноморье', price: 1200, days: 7 },
            { id: 'cr-2', ship: 'Viking River', route: 'Северная Европа', price: 1800, days: 10 },
          ]
        });
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
  }, [data]);

  return (
    <div className="animate-fade-in" style={{ padding: '0', position: 'relative', minHeight: '100vh' }}>
      
      <div style={{ padding: '5rem 2rem 4rem', background: 'radial-gradient(ellipse at top, rgba(56,189,248,0.15), transparent 60%)', textAlign: 'center', position: 'relative' }}>
        <h1 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1.2, textShadow: '0 10px 40px rgba(56,189,248,0.3)' }}>
          Транспорт <br/><span className="gradient-text" style={{ background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>И Круизы</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Арендуйте премиум-авто или отправляйтесь в круиз своей мечты.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto 6rem', padding: '0 2rem' }}>
        
        {/* Cars Section */}
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Car size={32} color="#38bdf8" /> Аренда автомобилей</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem', marginBottom: '5rem' }}>
          {data.cars.map((car: any) => (
            <div key={car.id} className="magic-card" style={{ padding: 0, borderRadius: '24px' }}>
              <div style={{ height: '200px', position: 'relative', background: 'radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)' }}>
                <img src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=800" alt={car.brand} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6, borderRadius: '24px 24px 0 0' }} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(56,189,248,0.2)', color: '#38bdf8', backdropFilter: 'blur(10px)', padding: '0.5rem 1rem', borderRadius: '100px', fontWeight: 'bold' }}>
                  {car.price_daily}$ / день
                </div>
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{car.brand} {car.model}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', margin: '1rem 0' }}>
                  <MapPin size={16} /> {car.location}
                </div>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #38bdf8, #818cf8)' }}><Check size={20} /> Забронировать</button>
              </div>
            </div>
          ))}
        </div>

        {/* Cruises Section */}
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Ship size={32} color="#818cf8" /> Круизные лайнеры</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {data.cruises.map((cruise: any) => (
            <div key={cruise.id} className="magic-card" style={{ padding: 0, borderRadius: '24px' }}>
              <div style={{ height: '250px', position: 'relative' }}>
                <img src="https://images.unsplash.com/photo-1599640842225-85d111c60e6b?auto=format&fit=crop&q=80&w=800" alt={cruise.ship} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, borderRadius: '24px 24px 0 0' }} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(129,140,248,0.2)', color: '#818cf8', backdropFilter: 'blur(10px)', padding: '0.5rem 1rem', borderRadius: '100px', fontWeight: 'bold' }}>
                  от {cruise.price}$
                </div>
              </div>
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{cruise.ship}</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', margin: '1rem 0' }}>
                  <MapPin size={16} /> {cruise.route} ({cruise.days} дней)
                </div>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #818cf8, #c084fc)' }}><Check size={20} /> Подробнее</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
