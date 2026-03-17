import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getSubjects } from '../services/api';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const { data } = await getSubjects();
        setSubjects(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchSubjects();
  }, []);

  const getDaysLeft = (examDate) => {
    return Math.ceil((new Date(examDate) - new Date()) / (1000 * 60 * 60 * 24));
  };

  const getUrgencyStyle = (days) => {
    if (days <= 3) return { color: 'var(--red)', bg: 'rgba(248,113,113,0.1)' };
    if (days <= 7) return { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)' };
    return { color: 'var(--green)', bg: 'rgba(52,211,153,0.1)' };
  };

  const totalHours = subjects.reduce((acc, s) => acc + s.estimatedHours, 0);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--navy)' }}>
      <Navbar />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>

        {/* Header */}
        <div className="fade-up fade-up-1" style={{ marginBottom: '40px' }}>
          <p style={{ color: 'var(--gold)', fontFamily: 'Syne', fontSize: '13px', letterSpacing: '0.1em', marginBottom: '8px' }}>
            OVERVIEW
          </p>
          <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '8px' }}>
            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'},{' '}
            <span className="gold-shimmer">{user?.name}</span>
          </h1>
          <p style={{ color: 'var(--slate)', fontSize: '16px' }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
          </p>
        </div>

        {/* Stats Row */}
        <div className="fade-up fade-up-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Total Subjects', value: subjects.length, unit: '', color: 'var(--white)' },
            { label: 'Upcoming Exams', value: subjects.filter(s => getDaysLeft(s.examDate) > 0).length, unit: '', color: 'var(--gold)' },
            { label: 'Study Hours Planned', value: totalHours, unit: 'h', color: 'var(--green)' },
          ].map((stat, i) => (
            <div key={i} className="card" style={{ padding: '24px' }}>
              <p style={{ color: 'var(--slate)', fontSize: '13px', fontFamily: 'Syne', letterSpacing: '0.05em', marginBottom: '12px' }}>
                {stat.label.toUpperCase()}
              </p>
              <p style={{ fontSize: '40px', fontWeight: '800', fontFamily: 'Syne', color: stat.color }}>
                {stat.value}<span style={{ fontSize: '20px' }}>{stat.unit}</span>
              </p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px' }}>
          
          {/* Subjects */}
          <div className="fade-up fade-up-3 card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: 'Syne', fontSize: '18px', fontWeight: '700' }}>Your Subjects</h2>
              <Link to="/subjects" style={{ color: 'var(--gold)', fontSize: '13px', textDecoration: 'none', fontWeight: '500' }}>
                Manage →
              </Link>
            </div>

            {loading ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{ height: '64px', background: 'var(--navy-3)', borderRadius: '10px', opacity: 0.5 }} />
                ))}
              </div>
            ) : subjects.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '48px 0' }}>
                <p style={{ color: 'var(--slate)', marginBottom: '16px' }}>No subjects added yet</p>
                <Link to="/subjects" className="btn-gold" style={{ padding: '12px 24px', textDecoration: 'none', fontSize: '14px', display: 'inline-block' }}>
                  Add First Subject
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {subjects.map((subject) => {
                  const days = getDaysLeft(subject.examDate);
                  const urgency = getUrgencyStyle(days);
                  return (
                    <div key={subject._id} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '16px', borderRadius: '12px',
                      background: 'var(--navy-3)',
                      border: '1px solid var(--navy-4)',
                      transition: 'border-color 0.2s',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <div style={{
                          width: '10px', height: '10px',
                          borderRadius: '50%',
                          background: subject.color,
                          boxShadow: `0 0 8px ${subject.color}80`
                        }} />
                        <div>
                          <p style={{ fontWeight: '600', fontSize: '15px', marginBottom: '2px' }}>{subject.name}</p>
                          <p style={{ color: 'var(--slate)', fontSize: '12px' }}>
                            Difficulty {subject.difficulty}/5 · {subject.estimatedHours}h planned
                          </p>
                        </div>
                      </div>
                      <div style={{
                        padding: '4px 12px', borderRadius: '6px',
                        background: urgency.bg, color: urgency.color,
                        fontSize: '12px', fontWeight: '600', fontFamily: 'Syne'
                      }}>
                        {days}d left
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Generate Plan CTA */}
            <div className="fade-up fade-up-3" style={{
              padding: '28px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, rgba(201,168,76,0.15), rgba(232,201,122,0.05))',
              border: '1px solid rgba(201,168,76,0.3)',
            }}>
              <p style={{ color: 'var(--gold)', fontFamily: 'Syne', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '10px' }}>
                AI POWERED
              </p>
              <h3 style={{ fontFamily: 'Syne', fontSize: '20px', fontWeight: '700', marginBottom: '10px' }}>
                Generate your study plan
              </h3>
              <p style={{ color: 'var(--slate)', fontSize: '13px', lineHeight: '1.6', marginBottom: '20px' }}>
                Let AI analyze your subjects and create a personalized daily schedule.
              </p>
              <Link to="/plan" className="btn-gold" style={{
                display: 'block', textAlign: 'center',
                padding: '13px', textDecoration: 'none',
                fontSize: '14px', borderRadius: '10px'
              }}>
                Generate Plan →
              </Link>
            </div>

            {/* Quick tip */}
            <div className="fade-up fade-up-4 card" style={{ padding: '24px' }}>
              <p style={{ color: 'var(--gold)', fontFamily: 'Syne', fontSize: '12px', letterSpacing: '0.1em', marginBottom: '10px' }}>
                STUDY TIP
              </p>
              <p style={{ color: 'var(--slate)', fontSize: '13px', lineHeight: '1.7' }}>
                Start with your hardest subject when your energy is highest. Save revision for the evening.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;