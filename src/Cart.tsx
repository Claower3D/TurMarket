import { useState, useEffect } from 'react';
import { ShoppingCart, Trash2, CreditCard, Package } from 'lucide-react';
import './index.css';

export function Cart() {
  const [cart, setCart] = useState<any>({ 
    items: [], items_count: 0, subtotal: 0, tax: 0, total: 0 
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/cart')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') setCart(res.data);
      })
      .catch(err => {
        setCart({
          cart_id: "cart-8842",
          items_count: 2,
          subtotal: 1250.00,
          tax: 62.50,
          total: 1312.50,
          currency: "USD",
          items: [
            {
              id: "item-1",
              product_name: "Premium Экскурсия на вертолете (Дубай)",
              quantity: 1,
              unit_price: 850.00,
              total_price: 850.00,
              image_url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&q=80",
            },
            {
              id: "item-2",
              product_name: "Аренда Mercedes S-Class (Сутки)",
              quantity: 1,
              unit_price: 400.00,
              total_price: 400.00,
              image_url: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&q=80",
            }
          ]
        });
      });
  }, []);

  return (
    <div className="animate-fade-in" style={{ padding: '0', position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px' }}>
            <ShoppingCart size={40} color="#3b82f6" />
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.2 }}>Корзина <span style={{ color: '#3b82f6' }}>({cart.items_count})</span></h1>
            <p style={{ color: 'var(--text-muted)' }}>Оформление заказов и бронирований</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          
          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cart.items.length === 0 ? (
              <div style={{ background: 'var(--surface)', borderRadius: '24px', padding: '4rem', textAlign: 'center', border: '1px dashed var(--border)' }}>
                <Package size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Ваша корзина пуста</h3>
                <p style={{ color: 'var(--text-muted)' }}>Самое время найти интересные туры!</p>
              </div>
            ) : (
              cart.items.map((item: any) => (
                <div key={item.id} style={{ display: 'flex', gap: '1.5rem', background: 'var(--surface)', borderRadius: '24px', padding: '1.5rem', border: '1px solid var(--border)' }}>
                  <img src={item.image_url} alt={item.product_name} style={{ width: '120px', height: '120px', borderRadius: '16px', objectFit: 'cover' }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', maxWidth: '80%' }}>{item.product_name}</h3>
                      <button style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem' }}>
                        <Trash2 size={20} />
                      </button>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'rgba(255,255,255,0.05)', padding: '0.5rem', borderRadius: '8px' }}>
                        <button style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>-</button>
                        <span>{item.quantity}</span>
                        <button style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>+</button>
                      </div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 900 }}>${item.total_price.toFixed(2)}</div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Checkout Summary */}
          <div>
            <div style={{ background: 'var(--surface)', borderRadius: '24px', padding: '2rem', border: '1px solid var(--border)', position: 'sticky', top: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>Итого</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Товары ({cart.items_count})</span>
                  <span>${cart.subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                  <span>Налоги и сборы</span>
                  <span>${cart.tax.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 900, color: 'white', marginTop: '1rem' }}>
                  <span>К оплате</span>
                  <span>${cart.total.toFixed(2)}</span>
                </div>
              </div>

              <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#3b82f6', marginBottom: '1rem' }}>
                <CreditCard size={20} /> Оформить заказ
              </button>
              
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                Защищенный платеж через TurMarket Pay Escrow.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
