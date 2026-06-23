import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { demoApi } from '../../api/demoApi';
import toast from 'react-hot-toast';

export default function DemoSettings() {
  const [boards, setBoards] = useState([]);
  const [grades, setGrades] = useState([]);
  const [loadingBoards, setLoadingBoards] = useState(true);
  const [loadingGrades, setLoadingGrades] = useState(true);
  const [newBoard, setNewBoard] = useState('');
  const [newGrade, setNewGrade] = useState('');
  const [addingBoard, setAddingBoard] = useState(false);
  const [addingGrade, setAddingGrade] = useState(false);

  const loadAll = async () => {
    setLoadingBoards(true);
    setLoadingGrades(true);
    try {
      const [bRes, gRes] = await Promise.allSettled([
        demoApi.getAdminBoards(),
        demoApi.getAdminGrades()
      ]);
      if (bRes.status === 'fulfilled') {
        const d = bRes.value?.data || bRes.value;
        setBoards(Array.isArray(d) ? d : []);
      }
      if (gRes.status === 'fulfilled') {
        const d = gRes.value?.data || gRes.value;
        setGrades(Array.isArray(d) ? d : []);
      }
    } catch (_) {}
    setLoadingBoards(false);
    setLoadingGrades(false);
  };

  useEffect(() => { loadAll(); }, []);

  const handleAddBoard = async () => {
    const name = newBoard.trim();
    if (!name) { toast.error('Enter board name'); return; }
    setAddingBoard(true);
    try {
      const res = await demoApi.createAdminBoard({ name });
      const created = res?.data || res;
      setBoards(prev => [...prev, created]);
      setNewBoard('');
      toast.success('Board added');
    } catch (_) {
      toast.error('Failed to add board');
    } finally { setAddingBoard(false); }
  };

  const handleDeleteBoard = async (id) => {
    if (!confirm('Delete this board?')) return;
    try {
      await demoApi.deleteAdminBoard(id);
      setBoards(prev => prev.filter(b => b.id !== id));
      toast.success('Board deleted');
    } catch (_) { toast.error('Failed to delete board'); }
  };

  const handleAddGrade = async () => {
    const name = newGrade.trim();
    if (!name) { toast.error('Enter grade name'); return; }
    setAddingGrade(true);
    try {
      const res = await demoApi.createAdminGrade({ name });
      const created = res?.data || res;
      setGrades(prev => [...prev, created]);
      setNewGrade('');
      toast.success('Grade added');
    } catch (_) {
      toast.error('Failed to add grade');
    } finally { setAddingGrade(false); }
  };

  const handleDeleteGrade = async (id) => {
    if (!confirm('Delete this grade?')) return;
    try {
      await demoApi.deleteAdminGrade(id);
      setGrades(prev => prev.filter(g => g.id !== id));
      toast.success('Grade deleted');
    } catch (_) { toast.error('Failed to delete grade'); }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Demo Settings</h2>
        <p className="text-sm text-gray-500">Manage grades and boards for the Schedule Free Demo form</p>
      </div>

      {/* Boards */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Boards</h3>
        <div className="flex gap-2 mb-4">
          <input type="text" value={newBoard} onChange={(e) => setNewBoard(e.target.value)} placeholder="Enter board name"
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyDown={(e) => e.key === 'Enter' && handleAddBoard()} />
          <button onClick={handleAddBoard} disabled={addingBoard}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2 font-medium">
            <Plus className="w-4 h-4" /> {addingBoard ? 'Adding...' : 'Add'}
          </button>
        </div>
        {loadingBoards ? (
          <div className="text-center py-8 text-gray-400">Loading...</div>
        ) : boards.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No boards added yet</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {boards.map(board => (
              <div key={board.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                <span className="text-sm font-medium text-gray-700">{board.displayName || board.name}</span>
                <button onClick={() => handleDeleteBoard(board.id)} className="text-gray-400 hover:text-red-500 transition p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Grades */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Grades</h3>
        <div className="flex gap-2 mb-4">
          <input type="text" value={newGrade} onChange={(e) => setNewGrade(e.target.value)} placeholder="Enter grade name"
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            onKeyDown={(e) => e.key === 'Enter' && handleAddGrade()} />
          <button onClick={handleAddGrade} disabled={addingGrade}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2 font-medium">
            <Plus className="w-4 h-4" /> {addingGrade ? 'Adding...' : 'Add'}
          </button>
        </div>
        {loadingGrades ? (
          <div className="text-center py-8 text-gray-400">Loading...</div>
        ) : grades.length === 0 ? (
          <div className="text-center py-8 text-gray-400">No grades added yet</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {grades.map(grade => (
              <div key={grade.id} className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-100">
                <span className="text-sm font-medium text-gray-700">{grade.displayName || grade.name}</span>
                <button onClick={() => handleDeleteGrade(grade.id)} className="text-gray-400 hover:text-red-500 transition p-1">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
