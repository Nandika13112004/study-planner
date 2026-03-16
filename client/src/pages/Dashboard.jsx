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

  const getUrgency = (examDate) => {
    const days = Math.ceil((new Date(examDate) - new Date()) / (1000 * 60 * 60 * 24));
    if (days <= 3) return { text: `${days} days left`, color: 'text-red-400' };
    if (days <= 7) return { text: `${days} days left`, color: 'text-yellow-400' };
    return { text: `${days} days left`, color: 'text-green-400' };
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-400 mt-1">
            Here's your study overview
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400 text-sm">Total Subjects</p>
            <p className="text-4xl font-bold text-white mt-1">{subjects.length}</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400 text-sm">Upcoming Exams</p>
            <p className="text-4xl font-bold text-indigo-400 mt-1">
              {subjects.filter(s => new Date(s.examDate) > new Date()).length}
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <p className="text-gray-400 text-sm">Total Study Hours</p>
            <p className="text-4xl font-bold text-green-400 mt-1">
              {subjects.reduce((acc, s) => acc + s.estimatedHours, 0)}h
            </p>
          </div>
        </div>

        {/* Subjects list */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Your Subjects</h2>
            <Link
              to="/subjects"
              className="text-indigo-400 hover:underline text-sm"
            >
              Manage subjects →
            </Link>
          </div>

          {loading ? (
            <p className="text-gray-400">Loading...</p>
          ) : subjects.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No subjects yet!</p>
              <Link
                to="/subjects"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition"
              >
                Add your first subject
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {subjects.map((subject) => {
                const urgency = getUrgency(subject.examDate);
                return (
                  <div
                    key={subject._id}
                    className="flex items-center justify-between bg-gray-800 rounded-xl px-5 py-4"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: subject.color }}
                      />
                      <div>
                        <p className="text-white font-medium">{subject.name}</p>
                        <p className="text-gray-400 text-sm">
                          Difficulty: {subject.difficulty}/5
                        </p>
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${urgency.color}`}>
                      {urgency.text}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Generate Plan Button */}
        <Link
          to="/plan"
          className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-4 rounded-2xl font-medium text-lg transition"
        >
          Generate AI Study Plan ✨
        </Link>

      </div>
    </div>
  );
};

export default Dashboard;