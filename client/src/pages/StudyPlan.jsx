import { useState } from 'react';
import Navbar from '../components/Navbar';
import { generatePlan } from '../services/api';

const StudyPlan = () => {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    availableHours: 3,
    planDays: 7
  });

  const handleGenerate = async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await generatePlan(form);
      setPlan(data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate plan');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-8">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">AI Study Plan</h1>
          <p className="text-gray-400 mt-1">
            Generate a personalized study schedule
          </p>
        </div>

        {/* Settings */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-6">
          <h2 className="text-xl font-bold text-white mb-6">Plan Settings</h2>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-gray-400 text-sm mb-1 block">
                Daily Study Hours: {form.availableHours}h
              </label>
              <input
                type="range"
                min="1"
                max="12"
                value={form.availableHours}
                onChange={(e) => setForm({ ...form, availableHours: parseInt(e.target.value) })}
                className="w-full accent-indigo-500"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1 block">
                Plan Duration: {form.planDays} days
              </label>
              <input
                type="range"
                min="1"
                max="30"
                value={form.planDays}
                onChange={(e) => setForm({ ...form, planDays: parseInt(e.target.value) })}
                className="w-full accent-indigo-500"
              />
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg mt-4">
              {error}
            </div>
          )}

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-xl font-medium text-lg transition mt-6"
          >
            {loading ? 'Generating your plan...' : '✨ Generate AI Study Plan'}
          </button>
        </div>

        {/* Plan Output */}
        {plan && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">
              Your {plan.totalDays} Day Study Plan
            </h2>
            {Object.entries(plan.plan).map(([day, subjects]) => (
              <div
                key={day}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
              >
                <h3 className="text-indigo-400 font-bold text-lg mb-4">{day}</h3>
                <div className="space-y-3">
                  {subjects.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-800 rounded-xl px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-indigo-400" />
                        <span className="text-white font-medium">{item.subject}</span>
                        <span className="text-gray-500 text-sm">
                          Difficulty: {item.difficulty}/5
                        </span>
                      </div>
                      <span className="text-green-400 font-medium">
                        {item.hours}h
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-700 flex justify-between">
                  <span className="text-gray-400 text-sm">Total</span>
                  <span className="text-white font-medium">
                    {subjects.reduce((acc, s) => acc + s.hours, 0).toFixed(1)}h
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyPlan;