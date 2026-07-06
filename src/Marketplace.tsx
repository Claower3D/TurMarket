import { useState, useEffect } from 'react';
import { ShoppingCart, Tag, Filter, Star, Check } from 'lucide-react';
import './index.css';

export function Marketplace() {
  const products = [
    {
      id: 1,
      name: 'Туристический рюкзак Osprey 65L',
      price: '18 990 ₽',
      rating: 4.8,
      reviews: 342,
      image: 'https://images.unsplash.com/photo-1622560480654-d96214fdc887?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Снаряжение'
    },
    {
      id: 2,
      name: 'Треккинговые ботинки Salomon',
      price: '14 500 ₽',
      rating: 4.9,
      reviews: 890,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Обувь'
    },
    {
      id: 3,
      name: 'Спальный мешок The North Face (до -10°C)',
      price: '12 300 ₽',
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1556815343-4ce432a6cb75?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Снаряжение'
    },
    {
      id: 4,
      name: 'Экшн-камера GoPro Hero 12',
      price: '45 990 ₽',
      rating: 5.0,
      reviews: 2104,
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      category: 'Электроника'
    }
  ];

  const [cart, setCart] = useState<number[]>([]);

  const toggleCart = (id: number) => {
    if (cart.includes(id)) {
      setCart(cart.filter(item => item !== id));
    } else {
      setCart([...cart, id]);
    }
  };

  useEffect(() => {
    // Magic Mouse Spotlight for Marketplace
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
      
      {/* Marketplace Header */}
      <div style={{ padding: '5rem 2rem 4rem', background: 'radial-gradient(ellipse at top, rgba(168,85,247,0.15), transparent 60%)', textAlign: 'center', position: 'relative' }}>
        <h1 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1.2, textShadow: '0 10px 40px rgba(168,85,247,0.3)' }}>
          Экипировка <br/><span className="gradient-text" style={{ background: 'linear-gradient(to right, #a855f7, #6366f1)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Высшего Класса</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Премиальное снаряжение для любых условий. Проверено профессионалами.
        </p>

        {/* Floating Controls Bar */}
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(15, 23, 42, 0.7)', backdropFilter: 'blur(30px)', padding: '1rem 2rem', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.8)' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-secondary glass-btn" style={{ borderRadius: '100px', padding: '0.5rem 1.5rem' }}>
              <Tag size={18} /> Все товары
            </button>
            <button className="btn btn-secondary glass-btn" style={{ borderRadius: '100px', padding: '0.5rem 1.5rem' }}>
              <Filter size={18} /> Фильтры
            </button>
          </div>
          
          <button className="btn btn-primary" style={{ position: 'relative', borderRadius: '100px', padding: '0.75rem 2rem', background: 'linear-gradient(135deg, #a855f7, #6366f1)', boxShadow: '0 0 20px rgba(168,85,247,0.4)' }}>
            <ShoppingCart size={20} /> 
            Корзина
            {cart.length > 0 && (
              <span className="animate-scale-in" style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ec4899', color: 'white', fontSize: '0.8rem', fontWeight: 'bold', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--bg)' }}>
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div style={{ maxWidth: '1200px', margin: '0 auto 6rem', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2.5rem' }}>
          
          {products.map((product, idx) => (
            <div key={product.id} className="magic-card" style={{ padding: 0, borderRadius: '24px', transform: `translateY(${idx % 2 !== 0 ? '30px' : '0'})` }}>
              <div style={{ height: '300px', position: 'relative', padding: '2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)' }}>
                <img src="/images/bg.png" alt={product.name} style={{ width: '80%', height: '80%', objectFit: 'cover', borderRadius: '16px', opacity: 0.6, mixBlendMode: 'luminosity' }} />
                
                <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', background: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(10px)', padding: '0.5rem 1rem', borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Star size={14} color="#a855f7" fill="#a855f7" /> {product.rating}
                </div>
              </div>
              
              <div style={{ padding: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                <div style={{ color: '#a855f7', fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  {product.category}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', lineHeight: 1.3 }}>{product.name}</h3>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900 }}>{product.price}₽</div>
                  <button 
                    onClick={() => toggleCart(product.id)}
                    className={`btn ${cart.includes(product.id) ? 'btn-secondary glass-btn' : 'btn-primary'}`} 
                    style={{ padding: '1rem', borderRadius: '16px', background: cart.includes(product.id) ? 'rgba(16,185,129,0.1)' : 'linear-gradient(135deg, #a855f7, #6366f1)' }}
                  >
                    {cart.includes(product.id) ? <Check size={20} color="#10b981" /> : <ShoppingCart size={20} />}
                  </button>
                </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
