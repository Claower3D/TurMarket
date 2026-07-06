import { useState } from 'react';
import { Compass, Mail, Lock } from 'lucide-react';
import { useAuthStore } from './store/useAuthStore';
import './index.css';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const res = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        throw new Error('Неверный email или пароль');
      }

      const data = await res.json();
      login(data.user, data.token);
      setSuccess(`Успешный вход! Добро пожаловать, ${data.user.name}`);
      
      // Usually you would redirect here
      // window.location.href = '/';
      
    } catch (err: any) {
      setError(err.message || 'Ошибка подключения к серверу');
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem', color: 'var(--primary)' }}>
            <Compass size={48} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Вход в TurMarket</h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Откройте мир без границ</p>
        </div>

        {error && <div style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--danger)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem', border: '1px solid var(--danger)' }}>{error}</div>}
        {success && <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1rem', fontSize: '0.9rem', border: '1px solid var(--success)' }}>{success}</div>}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" 
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '0.5rem', color: 'var(--text)', outline: 'none' }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', fontWeight: 600 }}>Пароль</label>
            <div style={{ position: 'relative' }}>
              <Lock size={20} color="var(--text-muted)" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••" 
                style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 3rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '0.5rem', color: 'var(--text)', outline: 'none' }}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem', padding: '0.875rem' }}>
            Войти
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Нет аккаунта? <a href="#" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Зарегистрироваться</a>
        </div>
      </div>
    </div>
  );
}
