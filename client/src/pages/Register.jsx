import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await signup(form);
      loginUser(data.user, data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '100%', maxWidth: '460px', padding: '48px' }} className="fade-up fade-up-1">
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px', justifyContent: 'center' }}>
          <div style={{
            width: '32px', height: '32px',
            background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
            borderRadius: '8px'
          }} />
          <span style={{ fontFamily: 'Syne', fontWeight: '700', fontSize: '18px' }}>StudyPlanner</span>
        </div>

        <div className="card" style={{ padding: '36px' }}>
          <h2 style={{ fontFamily: 'Syne', fontSize: '26px', fontWeight: '700', marginBottom: '6px' }}>
            Create your account
          </h2>
          <p style={{ color: 'var(--slate)', marginBottom: '32px', fontSize: '14px' }}>
            Start planning smarter today — it's free
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
                FULL NAME
              </label>
              <input
                type="text"
                placeholder="Nandika"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="input"
                required
              />
            </div>
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
              {loading ? 'Creating account...' : 'Get Started →'}
            </button>
          </form>

          <p style={{ color: 'var(--slate)', textAlign: 'center', marginTop: '24px', fontSize: '14px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: '500' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;