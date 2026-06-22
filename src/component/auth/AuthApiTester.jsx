import React, { useState } from 'react';
import { authApi, adminAuthApi } from '../../api/authApi';
import toast from 'react-hot-toast';

export default function AuthApiTester() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [testEmail, setTestEmail] = useState('test@example.com');
  const [testPassword, setTestPassword] = useState('Test@1234');

  const addResult = (test, status, message, data = null) => {
    setResults(prev => [...prev, { test, status, message, data, timestamp: new Date().toISOString() }]);
  };

  const clearResults = () => setResults([]);

  // Test 1: Login with Password
  const testLogin = async () => {
    setLoading(true);
    try {
      const response = await authApi.loginWithPassword({
        email: testEmail,
        password: testPassword
      });
      
      if (response.data && response.data.token) {
        addResult('Login with Password', 'success', 'Login successful', response.data);
        toast.success('Login successful!');
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      addResult('Login with Password', 'error', error.response?.data?.message || error.message);
      toast.error('Login failed');
    }
    setLoading(false);
  };

  // Test 2: Forgot Password
  const testForgotPassword = async () => {
    setLoading(true);
    try {
      const response = await authApi.forgotPassword({ email: testEmail });
      addResult('Forgot Password', 'success', 'OTP sent successfully', response.data);
      toast.success('OTP sent to email!');
    } catch (error) {
      addResult('Forgot Password', 'error', error.response?.data?.message || error.message);
      toast.error('Forgot password failed');
    }
    setLoading(false);
  };

  // Test 3: Start OTP Login
  const testStartLogin = async () => {
    setLoading(true);
    try {
      const response = await authApi.startLogin({ email: testEmail });
      addResult('Start OTP Login', 'success', 'OTP login initiated', response.data);
      toast.success('OTP sent for login!');
    } catch (error) {
      addResult('Start OTP Login', 'error', error.response?.data?.message || error.message);
      toast.error('OTP login failed');
    }
    setLoading(false);
  };

  // Test 4: Get Profile (requires token)
  const testGetProfile = async () => {
    setLoading(true);
    try {
      const response = await authApi.getMyProfile();
      addResult('Get Profile', 'success', 'Profile retrieved', response.data);
      toast.success('Profile loaded!');
    } catch (error) {
      addResult('Get Profile', 'error', error.response?.data?.message || error.message);
      toast.error('Get profile failed - login first');
    }
    setLoading(false);
  };

  // Test 5: Admin Login
  const testAdminLogin = async () => {
    setLoading(true);
    try {
      const response = await adminAuthApi.login({
        email: testEmail,
        password: testPassword
      });
      
      if (response.data && response.data.token) {
        addResult('Admin Login', 'success', 'Admin login successful', response.data);
        toast.success('Admin login successful!');
      } else {
        throw new Error('No token received');
      }
    } catch (error) {
      addResult('Admin Login', 'error', error.response?.data?.message || error.message);
      toast.error('Admin login failed');
    }
    setLoading(false);
  };

  // Run all tests
  const runAllTests = async () => {
    clearResults();
    await testLogin();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await testForgotPassword();
    await new Promise(resolve => setTimeout(resolve, 1000));
    await testStartLogin();
    toast.success('All tests completed!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-blue-900 mb-6">🧪 Authentication API Tester</h1>
          
          {/* Test Configuration */}
          <div className="mb-6 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Test Configuration</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Test Email</label>
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Test Password</label>
                <input
                  type="password"
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Test Buttons */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Available Tests</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <button
                onClick={testLogin}
                disabled={loading}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 transition"
              >
                1️⃣ User Login
              </button>
              <button
                onClick={testForgotPassword}
                disabled={loading}
                className="px-4 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 transition"
              >
                2️⃣ Forgot Password
              </button>
              <button
                onClick={testStartLogin}
                disabled={loading}
                className="px-4 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 transition"
              >
                3️⃣ OTP Login
              </button>
              <button
                onClick={testGetProfile}
                disabled={loading}
                className="px-4 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50 transition"
              >
                4️⃣ Get Profile
              </button>
              <button
                onClick={testAdminLogin}
                disabled={loading}
                className="px-4 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50 transition"
              >
                5️⃣ Admin Login
              </button>
              <button
                onClick={runAllTests}
                disabled={loading}
                className="px-4 py-3 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 disabled:opacity-50 transition"
              >
                🚀 Run All
              </button>
            </div>
            <button
              onClick={clearResults}
              className="mt-3 px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition"
            >
              Clear Results
            </button>
          </div>

          {/* Results */}
          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Test Results ({results.length})
            </h2>
            {results.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                <p className="text-gray-500 text-lg">No tests run yet. Click a test button above.</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 ${
                      result.status === 'success'
                        ? 'bg-green-50 border-green-300'
                        : 'bg-red-50 border-red-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-bold text-lg">
                        {result.status === 'success' ? '✅' : '❌'} {result.test}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {new Date(result.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className={`text-sm font-semibold mb-2 ${
                      result.status === 'success' ? 'text-green-700' : 'text-red-700'
                    }`}>
                      {result.message}
                    </p>
                    {result.data && (
                      <details className="text-xs">
                        <summary className="cursor-pointer font-semibold text-gray-600 hover:text-gray-800">
                          View Response Data
                        </summary>
                        <pre className="mt-2 p-3 bg-gray-800 text-green-400 rounded overflow-x-auto">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      </details>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
