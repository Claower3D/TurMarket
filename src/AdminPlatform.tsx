import { useState, useEffect } from 'react';
import { Users, Briefcase, ShieldAlert, Star, Filter, Search, ChevronRight } from 'lucide-react';
import './index.css';

export function AdminPlatform() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/admin/crm/customers')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') setData(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  if (!data) return <div style={{ padding: '5rem', textAlign: 'center' }}>Загрузка панели управления...</div>;

  return (
    <div className="animate-fade-in" style={{ padding: '0', position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Sidebar Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', minHeight: '100vh' }}>
        
        {/* Admin Sidebar */}
        <div style={{ background: 'var(--surface)', borderRight: '1px solid var(--border)', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text)', marginBottom: '0.5rem' }}>Admin Hub</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Управление платформой</p>
          </div>
          
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: 'none', cursor: 'pointer', fontWeight: 600, textAlign: 'left' }}>
              <Users size={18} /> CRM & Клиенты
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', background: 'transparent', color: 'var(--text-muted)', border: 'none', cursor: 'pointer', fontWeight: 600, textAlign: 'left' }}>
              <Briefcase size={18} /> ERP & Сотрудники
            </button>
            <button style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%', padding: '0.75rem 1rem', borderRadius: '12px', background: 'transparent', color: 'var(--text-muted)', border: 'none', cursor: 'pointer', fontWeight: 600, textAlign: 'left' }}>
              <ShieldAlert size={18} /> Модерация
            </button>
          </nav>
        </div>

        {/* Main Content Area */}
        <div style={{ padding: '3rem 4rem' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 900 }}>CRM: Клиенты</h1>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Всего клиентов: <b>{data.total_customers.toLocaleString()}</b> | Новых лидов: <b>{data.new_leads}</b></p>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ background: 'var(--surface)', padding: '0.5rem 1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--border)' }}>
                <Search size={16} color="var(--text-muted)" />
                <input type="text" placeholder="Поиск по Email..." style={{ background: 'transparent', border: 'none', color: 'var(--text)', outline: 'none' }} />
              </div>
              <button className="glass-btn">
                <Filter size={16} /> Фильтры
              </button>
            </div>
          </div>

          {/* CRM Table */}
          <div style={{ background: 'var(--surface)', borderRadius: '24px', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', color: 'var(--text-muted)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  <th style={{ padding: '1.5rem', fontWeight: 600 }}>Клиент</th>
                  <th style={{ padding: '1.5rem', fontWeight: 600 }}>Статус</th>
                  <th style={{ padding: '1.5rem', fontWeight: 600 }}>LTV (Выручка)</th>
                  <th style={{ padding: '1.5rem', fontWeight: 600 }}>Источник</th>
                  <th style={{ padding: '1.5rem', fontWeight: 600 }}>Активность</th>
                  <th style={{ padding: '1.5rem', fontWeight: 600 }}></th>
                </tr>
              </thead>
              <tbody>
                {data.customers.map((c: any) => (
                  <tr key={c.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s', cursor: 'pointer' }} className="hover:bg-white/5">
                    <td style={{ padding: '1.5rem' }}>
                      <div style={{ fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{c.email}</div>
                    </td>
                    <td style={{ padding: '1.5rem' }}>
                      <span style={{ 
                        padding: '0.25rem 0.75rem', 
                        borderRadius: '20px', 
                        fontSize: '0.8rem', 
                        fontWeight: 700,
                        background: c.status === 'VIP' ? 'rgba(234,179,8,0.2)' : c.status === 'Customer' ? 'rgba(16,185,129,0.2)' : 'rgba(139,92,246,0.2)',
                        color: c.status === 'VIP' ? '#eab308' : c.status === 'Customer' ? '#10b981' : '#8b5cf6' 
                      }}>
                        {c.status === 'VIP' && <Star size={12} style={{ display: 'inline', marginRight: '4px' }}/>}
                        {c.status}
                      </span>
                    </td>
                    <td style={{ padding: '1.5rem', fontWeight: 600, color: c.lifetime_value !== '$0' ? 'var(--text)' : 'var(--text-muted)' }}>
                      {c.lifetime_value}
                    </td>
                    <td style={{ padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      {c.source}
                    </td>
                    <td style={{ padding: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      {c.last_contact}
                    </td>
                    <td style={{ padding: '1.5rem', textAlign: 'right' }}>
                      <ChevronRight color="var(--text-muted)" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  );
}
