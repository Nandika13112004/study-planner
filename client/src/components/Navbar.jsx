import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const navLinks = [
    { path: '/dashboard', label: 'Overview' },
    { path: '/subjects', label: 'Subjects' },
    { path: '/plan', label: 'Study Plan' },
  ];

  return (
    <nav style={{
      background: 'var(--navy-2)',
      borderBottom: '1px solid var(--navy-3)',
      padding: '0 40px',
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: '28px', height: '28px',
          background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
          borderRadius: '7px'
        }} />
        <span style={{ fontFamily: 'Syne', fontWeight: '700', fontSize: '16px' }}>
          StudyPlanner
        </span>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              textDecoration: 'none',
              color: location.pathname === link.path ? 'var(--white)' : 'var(--slate)',
              background: location.pathname === link.path ? 'var(--navy-3)' : 'transparent',
              transition: 'all 0.2s ease',
            }}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '6px 12px',
          background: 'var(--navy-3)',
          borderRadius: '8px',
          border: '1px solid var(--navy-4)'
        }}>
          <div style={{
            width: '24px', height: '24px',
            background: 'linear-gradient(135deg, var(--gold), var(--gold-light))',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '11px', fontWeight: '700', color: 'var(--navy)',
            fontFamily: 'Syne'
          }}>
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <span style={{ fontSize: '13px', color: 'var(--white)', fontWeight: '500' }}>
            {user?.name}
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="btn-ghost"
          style={{ padding: '8px 16px', fontSize: '13px', cursor: 'pointer', border: '1px solid var(--navy-4)' }}
        >
          Sign out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;