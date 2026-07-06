import { useState, useEffect } from 'react';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, ShieldCheck, CreditCard, Plus } from 'lucide-react';
import './index.css';

export function Wallet() {
  const [wallet, setWallet] = useState<any>({ balance: 0, currency: 'USD', transactions: [] });

  useEffect(() => {
    fetch('http://localhost:8080/api/wallet')
      .then(res => res.json())
      .then(res => {
        if (res.status === 'success') setWallet(res.data);
      })
      .catch(err => {
        setWallet({
          balance: 1450.75,
          currency: 'USD',
          transactions: [
            { id: 'tx-1', type: 'deposit', amount: 1500.00, date: '01.07.2026', status: 'completed' },
            { id: 'tx-2', type: 'payment', amount: -49.25, date: '05.07.2026', status: 'completed' },
          ]
        });
      });
  }, []);

  return (
    <div className="animate-fade-in" style={{ padding: '0', position: 'relative', minHeight: '100vh', background: 'var(--bg)' }}>
      <div style={{ maxWidth: '1000px', margin: '4rem auto', padding: '0 2rem' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
          <div style={{ padding: '1rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '16px' }}>
            <WalletIcon size={40} color="#38bdf8" />
          </div>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, lineHeight: 1.2 }}>TurMarket <span style={{ color: '#38bdf8' }}>Pay</span></h1>
            <p style={{ color: 'var(--text-muted)' }}>Ваш персональный финансовый хаб и Escrow-счета</p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
          
          {/* Balance Card */}
          <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', padding: '2.5rem', borderRadius: '24px', border: '1px solid rgba(56,189,248,0.2)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(56,189,248,0.2) 0%, transparent 70%)', borderRadius: '50%' }}></div>
            <div style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>Доступный баланс</div>
            <div style={{ fontSize: '3.5rem', fontWeight: 900, color: 'white', marginBottom: '2rem' }}>
              ${wallet.balance.toFixed(2)}
            </div>
            
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', background: '#38bdf8', color: '#0f172a' }}>
                <Plus size={20} /> Пополнить
              </button>
              <button className="btn btn-secondary glass-btn" style={{ flex: 1, justifyContent: 'center' }}>
                <ArrowUpRight size={20} /> Вывести
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '24px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', color: '#10b981' }}><ShieldCheck size={24} /></div>
              <div>
                <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Escrow защита</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Ваши сделки защищены системой безопасных платежей</p>
              </div>
            </div>
            <div style={{ flex: 1, background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: '24px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ padding: '0.75rem', background: 'rgba(168, 85, 247, 0.1)', borderRadius: '12px', color: '#a855f7' }}><CreditCard size={24} /></div>
              <div>
                <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Привязанные карты</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Visa ending in •••• 4242</p>
              </div>
            </div>
          </div>

        </div>

        {/* Transactions */}
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>История транзакций</h2>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', overflow: 'hidden' }}>
          {wallet.transactions.map((tx: any, index: number) => (
            <div key={tx.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.5rem 2rem', borderBottom: index < wallet.transactions.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '0.75rem', borderRadius: '50%', background: tx.amount > 0 ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: tx.amount > 0 ? '#10b981' : '#ef4444' }}>
                  {tx.amount > 0 ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                </div>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{tx.type === 'deposit' ? 'Пополнение баланса' : 'Оплата услуг'}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{tx.date} • {tx.status}</div>
                </div>
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: tx.amount > 0 ? '#10b981' : 'white' }}>
                {tx.amount > 0 ? '+' : ''}{tx.amount.toFixed(2)} USD
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
