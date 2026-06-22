import React, { useState, useEffect } from 'react';
import { Search, Trash2, Eye, Plus, Mail, Phone, MapPin, Calendar, Book, AlertCircle, Download } from 'lucide-react';
import toast from 'react-hot-toast';

export default function StudentManagement() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewModal, setViewModal] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await getStudents();
      // setStudents(response.data || []);
      
      // Mock data for now
      setStudents([
        {
          id: 1,
          name: 'Rahul Kumar',
          email: 'rahul.kumar@email.com',
          phone: '+91-9876543210',
          enrollment: '2024-01-15',
          status: 'active',
          courses: ['Mathematics', 'Physics'],
          enrolledClasses: 2,
          totalFeesPaid: 15000,
          city: 'Delhi'
        },
        {
          id: 2,
          name: 'Priya Singh',
          email: 'priya.singh@email.com',
          phone: '+91-9876543211',
          enrollment: '2024-02-20',
          status: 'active',
          courses: ['Chemistry', 'Biology'],
          enrolledClasses: 3,
          totalFeesPaid: 22500,
          city: 'Mumbai'
        },
        {
          id: 3,
          name: 'Amit Patel',
          email: 'amit.patel@email.com',
          phone: '+91-9876543212',
          enrollment: '2023-11-10',
          status: 'inactive',
          courses: ['English', 'History'],
          enrolledClasses: 1,
          totalFeesPaid: 7500,
          city: 'Bangalore'
        }
      ]);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      // TODO: Replace with actual API call
      // await deleteStudent(id);
      
      setStudents(prev => prev.filter(s => s.id !== id));
      toast.success('Student deleted successfully');
    } catch (error) {
      console.error('Error deleting student:', error);
      toast.error('Failed to delete student');
    }
  };

  const handleDownloadReport = () => {
    try {
      const csvContent = [
        ['Name', 'Email', 'Phone', 'Status', 'Enrollment Date', 'Total Fees Paid'],
        ...filteredStudents.map(s => [
          s.name,
          s.email,
          s.phone,
          s.status,
          s.enrollment,
          s.totalFeesPaid
        ])
      ]
        .map(row => row.join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `students-report-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      toast.success('Report downloaded successfully');
    } catch (error) {
      console.error('Error downloading report:', error);
      toast.error('Failed to download report');
    }
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.phone.includes(searchTerm);
    
    const matchesFilter = filterStatus === 'all' || student.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: 'Total Students', count: students.length, color: 'bg-blue-900 text-white' },
    { label: 'Active', count: students.filter(s => s.status === 'active').length, color: 'bg-green-100 text-green-800' },
    { label: 'Inactive', count: students.filter(s => s.status === 'inactive').length, color: 'bg-red-100 text-red-800' },
    { label: 'Total Revenue', count: `₹${students.reduce((sum, s) => sum + s.totalFeesPaid, 0).toLocaleString()}`, color: 'bg-purple-100 text-purple-800' },
  ];

  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="bg-white border-b-2 border-blue-900 rounded-xl p-6 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Student Management</h1>
          <p className="text-gray-500 text-sm mt-1">Manage and monitor all students in the system</p>
        </div>
        <button
          onClick={handleDownloadReport}
          className="flex items-center gap-2 px-4 py-3 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 transition-all shadow-lg"
        >
          <Download size={20} /> Download Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-xl p-4 text-center font-semibold ${s.color}`}>
            <div className="text-2xl font-bold">{s.count}</div>
            <div className="text-xs mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
          </div>

          <div className="flex gap-2">
            {['all', 'active', 'inactive'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors text-sm ${
                  filterStatus === status
                    ? 'bg-blue-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Students Table */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-900"></div>
          <p className="text-gray-600 mt-4">Loading students...</p>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <AlertCircle className="mx-auto mb-3 text-gray-400" size={40} />
          <p className="text-gray-600">
            {searchTerm ? 'No students found matching your search' : 'No students found'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-blue-900 text-white text-left">
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">Student Name</th>
                <th className="px-4 py-3 font-semibold">Contact</th>
                <th className="px-4 py-3 font-semibold">Enrollment Date</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Total Fees Paid</th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, idx) => (
                <tr key={student.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                  <td className="px-4 py-3 font-semibold text-gray-800">{student.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-1 text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Mail size={14} /> {student.email}
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone size={14} /> {student.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar size={16} className="text-blue-600" />
                      {new Date(student.enrollment).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      student.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    ₹{student.totalFeesPaid.toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedStudent(student);
                          setViewModal(true);
                        }}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors text-xs font-medium"
                        title="View details"
                      >
                        <Eye size={14} /> View
                      </button>
                      <button
                        onClick={() => handleDeleteStudent(student.id)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-xs font-medium"
                        title="Delete student"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* View Student Modal */}
      {viewModal && selectedStudent && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setViewModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-blue-900">Student Details</h2>
              <button
                onClick={() => setViewModal(false)}
                className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Personal Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Name</label>
                    <p className="text-gray-800 font-semibold">{selectedStudent.name}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Email</label>
                    <p className="text-gray-800">{selectedStudent.email}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Phone</label>
                    <p className="text-gray-800">{selectedStudent.phone}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">City</label>
                    <p className="text-gray-800 flex items-center gap-2">
                      <MapPin size={16} className="text-blue-600" />
                      {selectedStudent.city}
                    </p>
                  </div>
                </div>
              </div>

              {/* Enrollment Information */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-4">Enrollment Information</h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Enrollment Date</label>
                    <p className="text-gray-800 flex items-center gap-2">
                      <Calendar size={16} className="text-green-600" />
                      {new Date(selectedStudent.enrollment).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
                    <p className={`font-bold ${
                      selectedStudent.status === 'active' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {selectedStudent.status.toUpperCase()}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Enrolled Classes</label>
                    <p className="text-gray-800 flex items-center gap-2">
                      <Book size={16} className="text-purple-600" />
                      {selectedStudent.enrolledClasses}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase">Total Fees Paid</label>
                    <p className="text-gray-800 font-semibold text-lg">₹{selectedStudent.totalFeesPaid.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses */}
            <div className="mt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Enrolled Courses</h3>
              <div className="flex flex-wrap gap-2">
                {selectedStudent.courses.map((course, idx) => (
                  <span
                    key={idx}
                    className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg font-semibold text-sm"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200 mt-6">
              <button
                onClick={() => setViewModal(false)}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg font-bold hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
