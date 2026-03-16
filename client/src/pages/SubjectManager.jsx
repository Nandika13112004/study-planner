import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { getSubjects, createSubject, deleteSubject } from '../services/api';

const COLORS = ['#6366f1', '#ec4899', '#14b8a6', '#f59e0b', '#10b981', '#3b82f6'];

const SubjectManager = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: '',
    difficulty: 3,
    examDate: '',
    estimatedHours: '',
    totalChapters: 1,
    color: '#6366f1'
  });

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const { data } = await getSubjects();
      setSubjects(data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createSubject(form);
      setForm({
        name: '',
        difficulty: 3,
        examDate: '',
        estimatedHours: '',
        totalChapters: 1,
        color: '#6366f1'
      });
      setShowForm(false);
      fetchSubjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSubject(id);
      fetchSubjects();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-8">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Subjects</h1>
            <p className="text-gray-400 mt-1">Manage your subjects and exam dates</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition"
          >
            {showForm ? 'Cancel' : '+ Add Subject'}
          </button>
        </div>

        {/* Add Subject Form */}
        {showForm && (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold text-white mb-6">Add New Subject</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Subject Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Mathematics"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Exam Date</label>
                  <input
                    type="date"
                    value={form.examDate}
                    onChange={(e) => setForm({ ...form, examDate: e.target.value })}
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">
                    Difficulty: {form.difficulty}/5
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="5"
                    value={form.difficulty}
                    onChange={(e) => setForm({ ...form, difficulty: parseInt(e.target.value) })}
                    className="w-full accent-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-gray-400 text-sm mb-1 block">Estimated Hours</label>
                  <input
                    type="number"
                    placeholder="e.g. 20"
                    value={form.estimatedHours}
                    onChange={(e) => setForm({ ...form, estimatedHours: e.target.value })}
                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border border-gray-700 focus:outline-none focus:border-indigo-500"
                    required
                  />
                </div>
              </div>

              {/* Color picker */}
              <div>
                <label className="text-gray-400 text-sm mb-2 block">Color</label>
                <div className="flex gap-3">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setForm({ ...form, color })}
                      className={`w-8 h-8 rounded-full border-2 transition ${
                        form.color === color ? 'border-white scale-110' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition"
              >
                Add Subject
              </button>
            </form>
          </div>
        )}

        {/* Subjects List */}
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : subjects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-lg">No subjects yet!</p>
            <p className="text-gray-500 mt-2">Click "Add Subject" to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {subjects.map((subject) => {
              const daysLeft = Math.ceil(
                (new Date(subject.examDate) - new Date()) / (1000 * 60 * 60 * 24)
              );
              return (
                <div
                  key={subject._id}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: subject.color }}
                    />
                    <div>
                      <h3 className="text-white font-semibold text-lg">{subject.name}</h3>
                      <div className="flex gap-4 mt-1">
                        <span className="text-gray-400 text-sm">
                          Difficulty: {subject.difficulty}/5
                        </span>
                        <span className="text-gray-400 text-sm">
                          {subject.estimatedHours}h estimated
                        </span>
                        <span className={`text-sm font-medium ${
                          daysLeft <= 3 ? 'text-red-400' :
                          daysLeft <= 7 ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          {daysLeft} days until exam
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(subject._id)}
                    className="text-gray-500 hover:text-red-400 transition text-sm"
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectManager;