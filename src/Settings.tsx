import { useState, useEffect } from 'react';
import { Bell, Smartphone, Mail, ShieldCheck, Send, CheckCircle2 } from 'lucide-react';
import './index.css';

export function Settings() {
  const [settings, setSettings] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/notifications/settings')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') setSettings(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  if (!settings) return <div style={{ padding: '5rem', textAlign: 'center' }}>Загрузка настроек...</div>;

  return (
    <div className="animate-fade-in" style={{ padding: '0', position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1000px', margin: '4rem auto', padding: '0 2rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '16px' }}>
            <Bell size={40} color="#3b82f6" />
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.2 }}>Настройки <span style={{ color: '#3b82f6' }}>Уведомлений</span></h1>
            <p style={{ color: 'var(--text-muted)' }}>Управление Telegram ботом, Push и Email рассылками</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
          
          {/* Main Settings */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* Telegram Block */}
            <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: '#0088cc', padding: '0.75rem', borderRadius: '12px', display: 'flex' }}>
                  <Send size={24} color="white" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Telegram Bot</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Получайте билеты и статусы прямо в мессенджер</p>
                </div>
              </div>
              
              {settings.telegram_connected ? (
                <div style={{ padding: '1rem', background: 'rgba(16,185,129,0.1)', borderRadius: '12px', border: '1px solid rgba(16,185,129,0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <CheckCircle2 color="#10b981" />
                    <div>
                      <div style={{ fontWeight: 'bold', color: '#10b981' }}>Подключено</div>
                      <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{settings.telegram_username}</div>
                    </div>
                  </div>
                  <button className="btn" style={{ background: 'transparent', border: '1px solid rgba(16,185,129,0.5)', color: '#10b981' }}>Отключить</button>
                </div>
              ) : (
                <button className="btn btn-primary" style={{ background: '#0088cc', width: '100%' }}>Подключить Telegram</button>
              )}
            </div>

            {/* Push Block */}
            <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(249, 115, 22, 0.1)', padding: '0.75rem', borderRadius: '12px', display: 'flex' }}>
                  <Smartphone size={24} color="#f97316" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Push-уведомления</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Уведомления в браузере и на телефоне</p>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  {/* Toggle switch mockup */}
                  <div style={{ width: '50px', height: '26px', background: settings.push_enabled ? '#f97316' : 'rgba(255,255,255,0.1)', borderRadius: '100px', position: 'relative', cursor: 'pointer' }}>
                    <div style={{ width: '22px', height: '22px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: settings.push_enabled ? '26px' : '2px', transition: 'left 0.2s' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Email Block */}
            <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.75rem', borderRadius: '12px', display: 'flex' }}>
                  <Mail size={24} color="#10b981" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Email-рассылки</h3>
                  <p style={{ color: 'var(--text-muted)' }}>Акции, дайджесты и чеки</p>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <div style={{ width: '50px', height: '26px', background: settings.email_notifications ? '#10b981' : 'rgba(255,255,255,0.1)', borderRadius: '100px', position: 'relative', cursor: 'pointer' }}>
                    <div style={{ width: '22px', height: '22px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: settings.email_notifications ? '26px' : '2px', transition: 'left 0.2s' }} />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Recent Notifications Sidebar */}
          <div style={{ background: 'var(--surface)', padding: '2rem', borderRadius: '24px', border: '1px solid var(--border)', alignSelf: 'start' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.5rem' }}>История уведомлений</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {settings.recent_notifications.map((notif: any) => (
                <div key={notif.id} style={{ padding: '1rem', background: notif.is_read ? 'rgba(255,255,255,0.02)' : 'rgba(59, 130, 246, 0.1)', borderRadius: '12px', borderLeft: `3px solid ${notif.type === 'booking' ? '#3b82f6' : notif.type === 'promo' ? '#eab308' : '#ec4899'}` }}>
                  <h4 style={{ fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{notif.title}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem', lineHeight: 1.4 }}>{notif.message}</p>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{notif.time}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
