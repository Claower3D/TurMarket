import { useState, useEffect } from 'react';
import { BookOpen, Users, Star, PlayCircle } from 'lucide-react';
import './index.css';

export function Academy() {
  const [courses, setCourses] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/academy')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success' && res.data.length > 0) {
          setCourses(res.data);
        } else {
          throw new Error("No data");
        }
      })
      .catch(err => {
        console.error("Backend unreachable, using fallback UI data", err);
        setCourses([
          { id: 'course-1', title: 'Профессия: Travel-блогер с нуля', price: 299, students: 1250, rating: 4.9 },
          { id: 'course-2', title: 'Мастер-класс по мобильной фотографии', price: 99, students: 3400, rating: 4.8 },
          { id: 'course-3', title: 'Как создать успешный турбизнес', price: 599, students: 450, rating: 5.0 },
        ]);
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
  }, [courses]);

  return (
    <div className="animate-fade-in" style={{ padding: '0', position: 'relative', minHeight: '100vh' }}>
      
      <div style={{ padding: '5rem 2rem 4rem', background: 'radial-gradient(ellipse at top, rgba(234,179,8,0.15), transparent 60%)', textAlign: 'center', position: 'relative' }}>
        <h1 style={{ fontSize: '4.5rem', fontWeight: 900, marginBottom: '1.5rem', letterSpacing: '-0.03em', lineHeight: 1.2, textShadow: '0 10px 40px rgba(234,179,8,0.3)' }}>
          TurMarket <br/><span className="gradient-text" style={{ background: 'linear-gradient(to right, #eab308, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Academy</span>
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Обучающие курсы и сертификация от ведущих экспертов индустрии.
        </p>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto 6rem', padding: '0 2rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2.5rem' }}>
          {courses.map((course: any) => (
            <div key={course.id} className="magic-card" style={{ padding: 0, borderRadius: '24px' }}>
              <div style={{ height: '200px', position: 'relative' }}>
                <img src="https://images.unsplash.com/photo-1513258496099-481620202020?auto=format&fit=crop&q=80&w=800" alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, borderRadius: '24px 24px 0 0' }} />
                <div style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(234,179,8,0.2)', color: '#facc15', backdropFilter: 'blur(10px)', padding: '0.5rem 1rem', borderRadius: '100px', fontWeight: 'bold' }}>
                  {course.price}$
                </div>
              </div>
              
              <div style={{ padding: '2rem' }}>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.4 }}>{course.title}</h3>
                
                <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={16} color="#eab308" /> {course.students}</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Star size={16} color="#eab308" fill="#eab308" /> {course.rating}</span>
                </div>

                <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', background: 'linear-gradient(135deg, #eab308, #f59e0b)' }}>
                  <PlayCircle size={20} /> Начать обучение
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
