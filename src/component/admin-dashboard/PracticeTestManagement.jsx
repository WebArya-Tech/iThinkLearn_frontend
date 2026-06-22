import React, { useState, useEffect } from 'react';
import Pagination from '../ui/Pagination';

const DEFAULT_TESTS = [
  { id: 1, name: 'Calculus Test 1', subject: 'Mathematics', duration: 60, questions: 30, difficulty: 'Medium' },
  { id: 2, name: 'Physics Mechanics', subject: 'Physics', duration: 90, questions: 45, difficulty: 'Hard' },
  { id: 3, name: 'GRE Verbal Practice', subject: 'GRE', duration: 30, questions: 20, difficulty: 'Hard' },
]

const loadTests = () => {
  try {
    const saved = JSON.parse(localStorage.getItem('icfy_practice_tests') || 'null')
    return saved && saved.length > 0 ? saved : DEFAULT_TESTS
  } catch { return DEFAULT_TESTS }
}

export default function PracticeTestManagement() {
  const [tests, setTests] = useState(loadTests);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', subject: '', duration: 0, questions: 0, difficulty: 'Medium' });
  const [editId, setEditId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  const totalPages = Math.ceil(tests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTests = tests.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => { localStorage.setItem('icfy_practice_tests', JSON.stringify(tests)) }, [tests])

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      setTests(tests.map(t => t.id === editId ? { ...form, id: editId } : t));
    } else {
      setTests([...tests, { ...form, id: Date.now() }]);
    }
    setForm({ name: '', subject: '', duration: 0, questions: 0, difficulty: 'Medium' });
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (t) => {
    setForm({ name: t.name, subject: t.subject, duration: t.duration, questions: t.questions, difficulty: t.difficulty || 'Medium' });
    setEditId(t.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (!window.confirm('Delete this test?')) return;
    setTests(tests.filter(t => t.id !== id));
  };

  return (
    <div className="space-y-6 w-full">
      <div className="bg-white border-b-2 border-blue-900 rounded-xl p-4 md:p-6">
        <h2 className="text-xl md:text-2xl font-bold text-blue-900">Practice Test Management</h2>
        <p className="text-gray-500 text-xs md:text-sm mt-1">Create and manage practice tests</p>
      </div>
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 lg:p-8">
        <button
          className="w-full sm:w-auto mb-4 px-3 md:px-4 py-2 md:py-2.5 rounded bg-blue-900 text-white font-bold text-sm hover:bg-blue-800 transition"
          onClick={() => {
            setShowForm(!showForm);
            setForm({ name: '', subject: '', duration: 0, questions: 0 });
            setEditId(null);
          }}
        >
          {showForm ? 'Cancel' : 'Add Practice Test'}
        </button>
        
        {showForm && (
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            <input
              name="name"
              value={form.name}
              onChange={handleInputChange}
              placeholder="Test Name"
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
            <input
              name="subject"
              value={form.subject}
              onChange={handleInputChange}
              placeholder="Subject"
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
              required
            />
            <input
              name="duration"
              type="number"
              value={form.duration}
              onChange={handleInputChange}
              placeholder="Duration (minutes)"
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
              min={0}
              required
            />
            <input
              name="questions"
              type="number"
              value={form.questions}
              onChange={handleInputChange}
              placeholder="No. of Questions"
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
              min={0}
              required
            />
            <select
              name="difficulty"
              value={form.difficulty || 'Medium'}
              onChange={handleInputChange}
              className="w-full px-3 md:px-4 py-2 border border-gray-300 rounded text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-blue-900"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <button
              type="submit"
              className="w-full sm:col-span-2 px-3 md:px-4 py-2 md:py-2.5 rounded bg-blue-900 text-white font-bold text-sm hover:bg-blue-800 transition"
            >
              {editId ? 'Update' : 'Create'}
            </button>
          </form>
        )}
        
        {tests.length === 0 ? (
          <div className="text-gray-600 text-center py-8 text-sm">No practice tests found.</div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden sm:block overflow-x-auto rounded-lg border border-gray-200">
              <table className="w-full divide-y divide-gray-200 text-xs md:text-sm">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold text-gray-700">#</th>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold text-gray-700">Test Name</th>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold text-gray-700">Subject</th>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold text-gray-700 hidden md:table-cell">Duration</th>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold text-gray-700 hidden lg:table-cell">Questions</th>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-left font-semibold text-gray-700 hidden lg:table-cell">Difficulty</th>
                    <th className="px-3 md:px-4 py-2 md:py-3 text-center font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {paginatedTests.map((t, idx) => (
                    <tr key={t.id} className="hover:bg-gray-50 transition">
                      <td className="px-3 md:px-4 py-2 md:py-3 text-gray-600">{startIndex + idx + 1}</td>
                      <td className="px-3 md:px-4 py-2 md:py-3 font-medium text-gray-800 truncate">{t.name}</td>
                      <td className="px-3 md:px-4 py-2 md:py-3 text-gray-600">{t.subject}</td>
                      <td className="px-3 md:px-4 py-2 md:py-3 text-gray-600 hidden md:table-cell">{t.duration} min</td>
                      <td className="px-3 md:px-4 py-2 md:py-3 text-gray-600 hidden lg:table-cell">{t.questions}</td>
                      <td className="px-3 md:px-4 py-2 md:py-3 hidden lg:table-cell">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          t.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                          t.difficulty === 'Hard' ? 'bg-red-100 text-red-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {t.difficulty}
                        </span>
                      </td>
                      <td className="px-3 md:px-4 py-2 md:py-3">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            className="px-2 md:px-3 py-1 md:py-1.5 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                            onClick={() => handleEdit(t)}
                          >Edit</button>
                          <button
                            className="px-2 md:px-3 py-1 md:py-1.5 rounded bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition"
                            onClick={() => handleDelete(t.id)}
                          >Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="sm:hidden space-y-3">
              {paginatedTests.map((t, idx) => (
                <div key={t.id} className="bg-white border border-gray-200 rounded-lg p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm truncate">{t.name}</p>
                      <p className="text-xs text-gray-500">{t.subject}</p>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold whitespace-nowrap ${
                      t.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      t.difficulty === 'Hard' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {t.difficulty}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-500">Duration</p>
                      <p className="font-semibold text-gray-800">{t.duration} min</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-500">Questions</p>
                      <p className="font-semibold text-gray-800">{t.questions}</p>
                    </div>
                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-gray-500">ID</p>
                      <p className="font-semibold text-gray-800">{startIndex + idx + 1}</p>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-gray-200">
                    <button
                      className="flex-1 px-2 py-1.5 rounded bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition"
                      onClick={() => handleEdit(t)}
                    >Edit</button>
                    <button
                      className="flex-1 px-2 py-1.5 rounded bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition"
                      onClick={() => handleDelete(t.id)}
                    >Delete</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={tests.length}
              itemsPerPage={itemsPerPage}
              alwaysShow={true}
            />
          </>
        )}
      </div>
    </div>
  );
}
