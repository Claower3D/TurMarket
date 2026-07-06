import { useState, useEffect } from 'react';
import { Crown, Gift, Share2, Award, Zap } from 'lucide-react';
import './index.css';

export function Premium() {
  const [data, setData] = useState<any>({ 
    subscription: { plan: 'Free', status: 'none', expires_at: '' },
    loyalty: { points: 0, tier: 'Bronze', cashback_percent: 0 },
    referrals: { invited_count: 0, earned_usd: 0, referral_link: '' }
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/premium')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') setData(res.data);
      })
      .catch(err => {
        setData({
          subscription: { plan: 'TurMarket Premium', status: 'active', expires_at: '2027-01-01' },
          loyalty: { points: 4500, tier: 'Gold', cashback_percent: 5 },
          referrals: { invited_count: 3, earned_usd: 30.00, referral_link: 'tur.market/invite/alex99' }
        });
      });
  }, []);

  return (
    <div className="animate-fade-in" style={{ padding: '0', position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1000px', margin: '4rem auto', padding: '0 2rem' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{ display: 'inline-block', padding: '1rem', background: 'linear-gradient(135deg, rgba(234, 179, 8, 0.2), transparent)', borderRadius: '50%', marginBottom: '1rem' }}>
            <Crown size={48} color="#eab308" />
          </div>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, lineHeight: 1.2, marginBottom: '1rem' }}>
            TurMarket <span style={{ background: 'linear-gradient(to right, #eab308, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Premium</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>Бонусы, кешбэк и реферальная программа</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Subscription Status */}
          <div style={{ background: 'var(--surface)', borderRadius: '24px', padding: '2.5rem', border: '1px solid rgba(234,179,8,0.3)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, padding: '0.5rem 1rem', background: '#eab308', color: 'black', fontWeight: 'bold', borderBottomLeftRadius: '16px' }}>Активна</div>
            <Zap size={32} color="#eab308" style={{ marginBottom: '1.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>{data.subscription.plan}</div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Действует до {data.subscription.expires_at}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text)', gap: '0.75rem', display: 'flex', flexDirection: 'column' }}>
              <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#eab308' }}>✓</span> 0% комиссия на бронирования</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#eab308' }}>✓</span> VIP поддержка 24/7</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><span style={{ color: '#eab308' }}>✓</span> Доступ к закрытым турам</li>
            </ul>
          </div>

          {/* Loyalty Points */}
          <div style={{ background: 'var(--surface)', borderRadius: '24px', padding: '2.5rem', border: '1px solid var(--border)' }}>
            <Award size={32} color="#ec4899" style={{ marginBottom: '1.5rem' }} />
            <div style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>Программа Лояльности ({data.loyalty.tier})</div>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: '#ec4899', marginBottom: '0.5rem' }}>{data.loyalty.points}</div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Накоплено Travel-баллов. <br/>Текущий кешбэк: <b>{data.loyalty.cashback_percent}%</b></p>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #ec4899, #f43f5e)' }}>Потратить баллы</button>
          </div>

          {/* Referrals */}
          <div style={{ background: 'var(--surface)', borderRadius: '24px', padding: '2.5rem', border: '1px solid var(--border)' }}>
            <Share2 size={32} color="#3b82f6" style={{ marginBottom: '1.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Пригласи друга</div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Получите $10 за каждого приглашенного друга, который совершит бронирование.</p>
            
            <div style={{ background: 'rgba(59,130,246,0.1)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: '#93c5fd', fontFamily: 'monospace' }}>{data.referrals.referral_link}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
              <div>Приглашено: <b style={{ color: 'white' }}>{data.referrals.invited_count}</b></div>
              <div>Заработано: <b style={{ color: '#3b82f6' }}>${data.referrals.earned_usd}</b></div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
