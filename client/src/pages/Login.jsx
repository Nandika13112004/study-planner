import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await login(form);
      loginUser(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex' }}>
      
      {/* Left Panel */}
      <div style={{
        width: '45%',
        background: 'var(--navy-2)',
        borderRight: '1px solid var(--navy-3)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '48px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '80px' }}>
            <div style={{
              width: '32px', height: '32px',
              background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
              borderRadius: '8px'
            }} />
            <span style={{ fontFamily: 'Syne', fontWeight: '700', fontSize: '18px' }}>
              StudyPlanner
            </span>
          </div>

          <div className="fade-up fade-up-1">
            <p style={{ color: 'var(--gold)', fontFamily: 'Syne', fontSize: '13px', letterSpacing: '0.1em', marginBottom: '16px' }}>
              AI-POWERED LEARNING
            </p>
            <h1 style={{ fontSize: '42px', fontWeight: '800', lineHeight: '1.15', marginBottom: '20px' }}>
              Study smarter,<br />not harder.
            </h1>
            <p style={{ color: 'var(--slate)', fontSize: '16px', lineHeight: '1.7', maxWidth: '340px' }}>
              Let AI analyze your subjects, deadlines, and habits to build a study plan that actually works.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { num: '3x', label: 'Better retention with AI scheduling' },
            { num: '94%', label: 'Students hit their exam targets' },
            { num: '2h', label: 'Saved daily with smart planning' },
          ].map((stat, i) => (
            <div key={i} className={`fade-up fade-up-${i + 2}`} style={{
              display: 'flex', alignItems: 'center', gap: '16px',
              padding: '16px', borderRadius: '12px',
              background: 'var(--navy-3)',
              border: '1px solid var(--navy-4)'
            }}>
              <span style={{ fontFamily: 'Syne', fontWeight: '800', fontSize: '22px', color: 'var(--gold)' }}>
                {stat.num}
              </span>
              <span style={{ color: 'var(--slate)', fontSize: '14px' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px',
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }} className="fade-up fade-up-1">
          <h2 style={{ fontFamily: 'Syne', fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>
            Welcome back
          </h2>
          <p style={{ color: 'var(--slate)', marginBottom: '36px', fontSize: '15px' }}>
            Sign in to your account
          </p>

          {error && (
            <div style={{
              background: 'rgba(248,113,113,0.1)',
              border: '1px solid rgba(248,113,113,0.3)',
              color: 'var(--red)',
              padding: '12px 16px',
              borderRadius: '10px',
              marginBottom: '20px',
              fontSize: '14px'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', color: 'var(--slate)', fontSize: '13px', marginBottom: '8px', fontFamily: 'Syne', letterSpacing: '0.05em' }}>
                EMAIL
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="input"
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', color: 'var(--slate)', fontSize: '13px', marginBottom: '8px', fontFamily: 'Syne', letterSpacing: '0.05em' }}>
                PASSWORD
              </label>
              <input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="input"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold"
              style={{ padding: '14px', fontSize: '15px', marginTop: '8px', width: '100%', cursor: 'pointer', border: 'none' }}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>
          </form>

          <p style={{ color: 'var(--slate)', textAlign: 'center', marginTop: '28px', fontSize: '14px' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: '500' }}>
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;