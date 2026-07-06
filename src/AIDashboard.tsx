import { useState, useEffect } from 'react';
import { Cpu, Database, BrainCircuit, Network, Activity, FileText } from 'lucide-react';
import './index.css';

export function AIDashboard() {
  const [data, setData] = useState<any>({ 
    routing: { active_model: '', provider: '', latency_ms: 0, tokens_today: 0 },
    rag: { indexed_documents: 0, vector_db: '', embeddings_model: '', knowledge_bases: [] },
    memory: { user_facts: 0, preferences_learned: 0, last_learned: '' }
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/ai-core')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') setData(res.data);
      })
      .catch(err => {
        setData({
          routing: { active_model: 'Claude 3.5 Sonnet', provider: 'Anthropic', latency_ms: 240, tokens_today: 12450 },
          rag: { indexed_documents: 142, vector_db: 'pgvector', embeddings_model: 'text-embedding-3-small', knowledge_bases: ['Путеводители', 'Правила перелетов', 'Визовые требования'] },
          memory: { user_facts: 24, preferences_learned: 8, last_learned: 'Предпочитает места у окна в самолете' }
        });
      });
  }, []);

  return (
    <div className="animate-fade-in" style={{ padding: '0', position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1000px', margin: '4rem auto', padding: '0 2rem' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '16px' }}>
            <Cpu size={40} color="#a855f7" />
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.2 }}>AI <span style={{ color: '#a855f7' }}>Core Platform</span></h1>
            <p style={{ color: 'var(--text-muted)' }}>Векторные базы данных, RAG и Model Routing</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          
          {/* Model Routing */}
          <div style={{ background: 'var(--surface)', borderRadius: '24px', padding: '2.5rem', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', background: 'radial-gradient(circle, rgba(168, 85, 247, 0.2) 0%, transparent 70%)', borderRadius: '50%' }}></div>
            <Network size={32} color="#a855f7" style={{ marginBottom: '1.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Model Routing</div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Динамическая маршрутизация запросов.</p>
            
            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Текущая Модель</div>
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#a855f7' }}>{data.routing.active_model}</div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Задержка (Latency)</span>
              <span style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Activity size={14} color="#10b981"/> {data.routing.latency_ms} ms</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginTop: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Токенов за сегодня</span>
              <span style={{ fontWeight: 'bold' }}>{data.routing.tokens_today}</span>
            </div>
          </div>

          {/* RAG & Vector DB */}
          <div style={{ background: 'var(--surface)', borderRadius: '24px', padding: '2.5rem', border: '1px solid var(--border)' }}>
            <Database size={32} color="#3b82f6" style={{ marginBottom: '1.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Векторная База (RAG)</div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Retrieval-Augmented Generation для контекста.</p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Движок</span>
              <span style={{ fontWeight: 'bold', color: '#3b82f6' }}>{data.rag.vector_db}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
              <span style={{ color: 'var(--text-muted)' }}>Документов в индексе</span>
              <span style={{ fontWeight: 'bold' }}>{data.rag.indexed_documents} шт.</span>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Активные базы знаний:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {data.rag.knowledge_bases.map((kb: string, i: number) => (
                <span key={i} style={{ padding: '0.25rem 0.75rem', background: 'rgba(59,130,246,0.1)', color: '#93c5fd', borderRadius: '100px', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <FileText size={12} /> {kb}
                </span>
              ))}
            </div>
          </div>

          {/* Memory System */}
          <div style={{ background: 'var(--surface)', borderRadius: '24px', padding: '2.5rem', border: '1px solid var(--border)' }}>
            <BrainCircuit size={32} color="#ec4899" style={{ marginBottom: '1.5rem' }} />
            <div style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>Memory System</div>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Долгосрочная память ИИ о пользователе.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ec4899' }}>{data.memory.user_facts}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Фактов</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '1rem', borderRadius: '12px', textAlign: 'center' }}>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ec4899' }}>{data.memory.preferences_learned}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Предпочтений</div>
              </div>
            </div>

            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Последнее воспоминание:</div>
            <div style={{ padding: '0.75rem', background: 'rgba(236,72,153,0.1)', color: '#fbcfe8', borderRadius: '8px', fontSize: '0.9rem', fontStyle: 'italic' }}>
              "{data.memory.last_learned}"
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
