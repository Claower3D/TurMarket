import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, Users, DollarSign, Activity, MapPin } from 'lucide-react';
import './index.css';

export function Analytics() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/analytics/dashboard')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') setData(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  if (!data) return <div style={{ padding: '5rem', textAlign: 'center' }}>Загрузка аналитики...</div>;

  return (
    <div className="animate-fade-in" style={{ padding: '0', position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(139, 92, 246, 0.1)', borderRadius: '16px' }}>
            <BarChart3 size={40} color="#8b5cf6" />
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.2 }}>BI <span style={{ color: '#8b5cf6' }}>Дашборд</span></h1>
            <p style={{ color: 'var(--text-muted)' }}>Аналитика платформы в реальном времени</p>
          </div>
        </div>

        {/* KPIs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {data.kpis.map((kpi: any) => (
            <div key={kpi.id} style={{ background: 'var(--surface)', padding: '1.5rem', borderRadius: '24px', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 600 }}>{kpi.title}</span>
                <div style={{ padding: '0.5rem', borderRadius: '12px', background: kpi.id === 'kpi-rev' ? 'rgba(16,185,129,0.1)' : kpi.id === 'kpi-users' ? 'rgba(59,130,246,0.1)' : 'rgba(139,92,246,0.1)' }}>
                  {kpi.id === 'kpi-rev' ? <DollarSign color="#10b981" size={20} /> : kpi.id === 'kpi-users' ? <Users color="#3b82f6" size={20} /> : <Activity color="#8b5cf6" size={20} />}
                </div>
              </div>
              <div style={{ fontSize: '2rem', fontWeight: 800 }}>{kpi.value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: kpi.is_positive ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                {kpi.is_positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {kpi.trend} с прошлого месяца
              </div>
            </div>
          ))}
        </div>

        {/* Main Charts Area */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          
          {/* Revenue Chart Mockup */}
          <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem' }}>Динамика выручки (2026)</h3>
            <div style={{ height: '300px', display: 'flex', alignItems: 'flex-end', gap: '1rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border)', position: 'relative' }}>
              {data.revenue_chart.map((month: any) => {
                const heightPercent = (month.revenue / 150000) * 100;
                return (
                  <div key={month.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', height: '100%' }}>
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'flex-end' }}>
                      <div style={{ width: '100%', height: `${heightPercent}%`, background: 'linear-gradient(to top, rgba(139,92,246,0.2), rgba(139,92,246,0.8))', borderRadius: '8px 8px 0 0', transition: 'height 1s ease-out' }}></div>
                    </div>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>{month.month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top Destinations */}
          <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin color="#f97316" /> Топ направлений
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {data.top_destinations.map((dest: any) => (
                <div key={dest.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 600 }}>{dest.name}</span>
                    <span style={{ fontWeight: 800 }}>{dest.bookings}</span>
                  </div>
                  <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${dest.percentage}%`, background: 'linear-gradient(90deg, #f97316, #fb923c)', borderRadius: '4px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
