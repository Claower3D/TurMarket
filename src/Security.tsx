import { useState, useEffect } from 'react';
import { ShieldCheck, Smartphone, Monitor, Globe, Key, AlertTriangle, Fingerprint } from 'lucide-react';
import './index.css';

export function Security() {
  const [data, setData] = useState<any>({ 
    mfa: { is_enabled: false, method: '', backup_codes_remaining: 0 },
    sessions: []
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/security')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') setData(res.data);
      })
      .catch(err => {
        setData({
          mfa: { is_enabled: true, method: 'Google Authenticator', backup_codes_remaining: 8 },
          sessions: [
            { id: 'sess-1', device_type: 'Desktop', platform: 'macOS', browser: 'Chrome', ip: '192.168.1.5', location: 'Дубай, ОАЭ', is_current: true, last_active: 'Сейчас' },
            { id: 'sess-2', device_type: 'Mobile', platform: 'iOS 17', browser: 'Safari', ip: '85.24.11.90', location: 'Анталья, Турция', is_current: false, last_active: '2 часа назад' }
          ]
        });
      });
  }, []);

  return (
    <div className="animate-fade-in" style={{ padding: '0', position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1000px', margin: '4rem auto', padding: '0 2rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '16px' }}>
            <ShieldCheck size={40} color="#10b981" />
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.2 }}>Identity & <span style={{ color: '#10b981' }}>Security</span></h1>
            <p style={{ color: 'var(--text-muted)' }}>Двухфакторная защита, сессии и устройства</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          
          {/* MFA Settings */}
          <div style={{ background: 'var(--surface)', borderRadius: '24px', padding: '2.5rem', border: data.mfa.is_enabled ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(239,68,68,0.3)', position: 'relative' }}>
            <Fingerprint size={32} color={data.mfa.is_enabled ? "#10b981" : "#ef4444"} style={{ marginBottom: '1.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Двухфакторная защита (2FA)</div>
            
            {data.mfa.is_enabled ? (
              <>
                <div style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                  <ShieldCheck size={18} /> Включена
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Текущий метод</div>
                  <div style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Key size={16}/> {data.mfa.method}</div>
                </div>
                <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
                  Резервных кодов: <b>{data.mfa.backup_codes_remaining}</b>
                </div>
                <button className="btn" style={{ width: '100%', justifyContent: 'center', border: '1px solid var(--border)', background: 'transparent' }}>Отключить 2FA</button>
              </>
            ) : (
              <>
                <div style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontWeight: 'bold' }}>
                  <AlertTriangle size={18} /> Отключена
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Ваш аккаунт уязвим. Рекомендуем включить двухфакторную аутентификацию.</p>
                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#10b981' }}>Включить 2FA</button>
              </>
            )}
          </div>

          {/* Passkeys Intro */}
          <div style={{ background: 'var(--surface)', borderRadius: '24px', padding: '2.5rem', border: '1px solid var(--border)' }}>
            <Key size={32} color="#3b82f6" style={{ marginBottom: '1.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Passkeys (Биометрия)</div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Входите в аккаунт с помощью отпечатка пальца (Touch ID) или распознавания лица (Face ID) без ввода пароля.</p>
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: '#3b82f6' }}>Добавить Passkey</button>
          </div>

        </div>

        {/* Sessions & Devices */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Monitor size={24} /> Активные сессии
        </h2>
        
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', overflow: 'hidden' }}>
          {data.sessions.map((sess: any, index: number) => (
            <div key={sess.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem', borderBottom: index < data.sessions.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ padding: '1rem', borderRadius: '16px', background: sess.is_current ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.05)', color: sess.is_current ? '#10b981' : 'var(--text-muted)' }}>
                  {sess.device_type === 'Mobile' ? <Smartphone size={28} /> : <Monitor size={28} />}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {sess.platform} • {sess.browser}
                    {sess.is_current && <span style={{ background: '#10b981', color: '#000', fontSize: '0.7rem', padding: '0.1rem 0.5rem', borderRadius: '100px', textTransform: 'uppercase' }}>Текущая</span>}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Globe size={14}/> {sess.location}</span>
                    <span>IP: {sess.ip}</span>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.25rem' }}>Активность: {sess.last_active}</div>
                </div>
              </div>
              
              {!sess.is_current && (
                <button className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                  Выйти
                </button>
              )}
            </div>
          ))}
        </div>
        
        <div style={{ textAlign: 'right', marginTop: '1.5rem' }}>
          <button style={{ background: 'transparent', border: 'none', color: '#ef4444', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>Выйти на всех других устройствах</button>
        </div>

      </div>
    </div>
  );
}
