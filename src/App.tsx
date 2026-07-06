import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import { Compass, Users, Bot, ShoppingBag, LogOut, User as UserIcon, ChevronDown, Settings, Sparkles, Zap, Globe, ShieldCheck, Cpu, Plane, Bell, BarChart3, Briefcase, Menu, X } from 'lucide-react';
import { Community } from './Community';
import { AI } from './AI';
import { Travel } from './Travel';
import { Marketplace } from './Marketplace';
import { Coworking } from './Coworking';
import { Transport } from './Transport';
import { Nomads } from './Nomads';
import { Visas } from './Visas';
import { StreamsAndInsurance } from './StreamsAndInsurance';
import { Wallet } from './Wallet';
import { Premium } from './Premium';
import { Security } from './Security';
import { AIDashboard } from './AIDashboard';
import { Cart } from './Cart';
import { Bookings } from './Bookings';
import { MediaPlatform } from './MediaPlatform';
import { Settings as SettingsPage } from './Settings';
import { Analytics } from './Analytics';
import { AdminPlatform } from './AdminPlatform';
import { Login } from './Login';
import { useAuthStore } from './store/useAuthStore';
import './index.css';

function Home() {
  return (
    <div className="animate-fade-in" style={{ padding: '0', textAlign: 'center', position: 'relative' }}>
      
      {/* Epic Hero Image Background with Shimmer Lines */}
      <div className="hero-wrapper">
        <div className="bg-image-container">
          <img src="/images/bg.png" alt="Travel Background" className="hero-bg-img" />
        </div>
        <div className="hero-gradient-overlay"></div>
        <div className="shimmer-lines"></div>

        <div className="hero-content">
          <div className="hero-badge magic-card">
            <span className="badge-dot"></span>
            TurMarket v2.0
            <Sparkles size={14} style={{ marginLeft: '4px', color: '#fbcfe8' }} />
          </div>
          
          <h1 className="hero-title">
            Откройте мир <br/>с <span className="gradient-text animated-gradient">TurMarket</span>
          </h1>
          <p className="hero-subtitle">
            Интеллектуальная экосистема для путешествий нового поколения. Бронируйте, покупайте, общайтесь.
          </p>

          <div className="hero-actions">
            <Link to="/travel" style={{ textDecoration: 'none' }}>
              <button className="btn btn-primary magic-btn">
                <Globe size={20} />
                Начать путешествие
              </button>
            </Link>
            <Link to="/ai" style={{ textDecoration: 'none' }}>
              <button className="btn btn-secondary glass-btn">
                <Zap size={20} className="zap-icon" />
                Спросить AI
              </button>
            </Link>
          </div>

          {/* Floating UI Widget Element */}
          <div className="floating-widget magic-card">
            <div className="widget-header">
              <div className="widget-dot red"></div>
              <div className="widget-dot yellow"></div>
              <div className="widget-dot green"></div>
              <span style={{ marginLeft: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem' }}>AI Booking Route</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>FROM</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>NYC</div>
                <div style={{ fontSize: '0.8rem', color: '#a5b4fc' }}>09:00 AM</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', color: 'var(--primary)' }}>
                <Globe className="spin-slow" size={32} />
              </div>
              <div style={{ flex: 1, background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>TO</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>BALI</div>
                <div style={{ fontSize: '0.8rem', color: '#a5b4fc' }}>14:30 PM</div>
              </div>
            </div>
            <div style={{ marginTop: '1rem', background: 'var(--success)', color: 'white', padding: '0.5rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
              Flight Matched • 98% Savings
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards with Community Image */}
      <div className="feature-grid-container">
        <div className="feature-grid">
          
          <div className="card magic-card">
            <div className="card-icon-wrapper indigo-glow">
              <Compass size={32} />
            </div>
            <h2 className="card-heading">Маркетплейс</h2>
            <p className="card-desc">Покупайте лучшее снаряжение от проверенных брендов для ваших будущих приключений. От рюкзаков до палаток.</p>
          </div>

          <div className="card magic-card feature-img-card">
            <div className="img-wrapper">
              <img src="/images/community.png" alt="Community" className="card-featured-img" />
            </div>
            <div className="card-content-bottom">
              <div className="card-icon-wrapper purple-glow overlap-icon">
                <Users size={24} />
              </div>
              <h2 className="card-heading">Сообщество</h2>
              <p className="card-desc">Делитесь маршрутами, находите попутчиков и читайте реальные отзывы. Путешествуйте вместе.</p>
            </div>
          </div>

          <div className="card magic-card">
            <div className="card-icon-wrapper pink-glow">
              <Bot size={32} />
            </div>
            <h2 className="card-heading">AI Ассистент</h2>
            <p className="card-desc">Персональный гид на базе ИИ. Спланирует маршрут, подберет билеты и ответит на любые вопросы мгновенно.</p>
          </div>

        </div>
      </div>
    </div>
  );
}

function App() {
  const { user, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Magic Mouse Spotlight effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const cards = document.querySelectorAll('.magic-card');
    cards.forEach((card: any) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  };

  return (
    <BrowserRouter>
      <div className="app-container" onMouseMove={handleMouseMove}>
        <nav className="navbar">
          <div className="nav-top-row">
            <div className="nav-brand">
              <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <Compass size={28} />
              <span>TurMarket</span>
            </div>
            <div className="nav-actions">
              <Link to="/settings" style={{ color: 'var(--text)', position: 'relative' }}>
                <Bell size={24} />
                <div style={{ position: 'absolute', top: '-5px', right: '-8px', background: '#f97316', color: 'white', fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '100px', fontWeight: 'bold' }}>3</div>
              </Link>
              <Link to="/cart" style={{ color: 'var(--text)', position: 'relative' }}>
                <ShoppingBag size={24} />
                <div style={{ position: 'absolute', top: '-5px', right: '-8px', background: '#3b82f6', color: 'white', fontSize: '0.7rem', padding: '0.1rem 0.4rem', borderRadius: '100px', fontWeight: 'bold' }}>2</div>
              </Link>
              {user ? (
                <div style={{ position: 'relative' }}>
                  <button 
                    onClick={() => setShowDropdown(!showDropdown)}
                    className="user-dropdown-btn hover:border-primary"
                  >
                    <div className="user-avatar">
                      <UserIcon size={14} />
                    </div>
                    <span className="user-name" style={{ fontWeight: 600, fontSize: '0.95rem' }}>{user.name}</span>
                    <ChevronDown size={16} color="var(--text-muted)" style={{ transform: showDropdown ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                  </button>

                  {showDropdown && (
                    <div className="glass-dropdown">
                      <div style={{ padding: '1rem', borderBottom: '1px solid var(--border)', marginBottom: '0.5rem' }}>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Ваш баланс</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          $0.00
                        </div>
                      </div>
                      
                      <Link to="/settings" style={{ textDecoration: 'none' }} onClick={() => setShowDropdown(false)}>
                        <button className="dropdown-item">
                          <Settings size={18} />
                          Настройки
                        </button>
                      </Link>
                      <Link to="/analytics" style={{ textDecoration: 'none' }} onClick={() => setShowDropdown(false)}>
                        <button className="dropdown-item">
                          <BarChart3 size={18} color="#8b5cf6" />
                          BI Аналитика
                        </button>
                      </Link>
                      <Link to="/admin" style={{ textDecoration: 'none' }} onClick={() => setShowDropdown(false)}>
                        <button className="dropdown-item">
                          <Briefcase size={18} color="#f97316" />
                          Admin CRM
                        </button>
                      </Link>
                      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0.5rem 0' }} />
                      <Link to="/bookings" style={{ textDecoration: 'none' }} onClick={() => setShowDropdown(false)}>
                        <button className="dropdown-item">
                          <Plane size={18} color="#f97316" />
                          <span style={{ color: '#f97316' }}>Мои поездки</span>
                        </button>
                      </Link>
                      <Link to="/premium" style={{ textDecoration: 'none' }} onClick={() => setShowDropdown(false)}>
                        <button className="dropdown-item">
                          <Sparkles size={18} color="#eab308" />
                          <span style={{ color: '#eab308' }}>Premium & Бонусы</span>
                        </button>
                      </Link>
                      <Link to="/security" style={{ textDecoration: 'none' }} onClick={() => setShowDropdown(false)}>
                        <button className="dropdown-item">
                          <ShieldCheck size={18} color="#10b981" />
                          Безопасность (2FA)
                        </button>
                      </Link>
                      <Link to="/ai-core" style={{ textDecoration: 'none' }} onClick={() => setShowDropdown(false)}>
                        <button className="dropdown-item">
                          <Cpu size={18} color="#a855f7" />
                          AI Ядро & RAG
                        </button>
                      </Link>
                      <button className="dropdown-item" style={{ color: 'var(--danger)' }} onClick={() => { logout(); setShowDropdown(false); }}>
                        <LogOut size={18} />
                        Выйти
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <button className="btn btn-primary login-btn">Войти</button>
                </Link>
              )}
            </div>
          </div>
          <div className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`}>
            <Link to="/" className="nav-link active" onClick={() => setIsMobileMenuOpen(false)}>Главная</Link>
            <Link to="/travel" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Туризм</Link>
            <Link to="/marketplace" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Маркетплейс</Link>
            <Link to="/community" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Сообщество</Link>
            <Link to="/ai" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>AI Ассистент</Link>
            <Link to="/coworking" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Коворкинг</Link>
            <Link to="/videos" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Видео</Link>
            <Link to="/transport" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Транспорт</Link>
            <Link to="/academy" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Академия</Link>
            <Link to="/nomads" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Номады</Link>
            <Link to="/visas" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Визы</Link>
            <Link to="/streams" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Стримы & Страховки</Link>
          </div>

        </nav>

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/travel" element={<Travel />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/community" element={<Community />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/coworking" element={<Coworking />} />
            <Route path="/videos" element={<MediaPlatform />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/academy" element={<MediaPlatform />} />
            <Route path="/nomads" element={<Nomads />} />
            <Route path="/visas" element={<Visas />} />
            <Route path="/streams" element={<StreamsAndInsurance />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/premium" element={<Premium />} />
            <Route path="/security" element={<Security />} />
            <Route path="/ai-core" element={<AIDashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/admin" element={<AdminPlatform />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>

        <footer style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)', borderTop: '1px solid var(--border)' }}>
          <p>© 2026 TurMarket Enterprise Ultimate. Все права защищены.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
