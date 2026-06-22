// Authentication API Test Suite
// Run this in browser console or create a test component to verify API integration

import { authApi, adminAuthApi } from '../authApi';

// Test configuration
const TEST_EMAIL = 'test@example.com';
const TEST_PASSWORD = 'Test@1234';
const TEST_ADMIN_EMAIL = 'admin@example.com';

export const testAuthApis = async () => {
  console.log('🧪 Starting Authentication API Tests...\n');
  
  const results = {
    passed: [],
    failed: [],
    skipped: []
  };

  // ============================================
  // 1. TEST: Login with Password (User)
  // ============================================
  try {
    console.log('1️⃣ Testing: User Login with Password');
    const response = await authApi.loginWithPassword({
      email: TEST_EMAIL,
      password: TEST_PASSWORD
    });
    
    if (response.data && response.data.token) {
      console.log('✅ PASSED: Login successful');
      console.log('   Token:', response.data.token.substring(0, 20) + '...');
      console.log('   User:', response.data.user);
      results.passed.push('User Login with Password');
    } else {
      throw new Error('No token received');
    }
  } catch (error) {
    console.log('❌ FAILED: User Login with Password');
    console.log('   Error:', error.response?.data?.message || error.message);
    results.failed.push({ test: 'User Login with Password', error: error.message });
  }
  console.log('');

  // ============================================
  // 2. TEST: Forgot Password (Send OTP)
  // ============================================
  try {
    console.log('2️⃣ Testing: Forgot Password (Send OTP)');
    const response = await authApi.forgotPassword({
      email: TEST_EMAIL
    });
    
    console.log('✅ PASSED: OTP sent successfully');
    console.log('   Response:', response.data);
    results.passed.push('Forgot Password (Send OTP)');
  } catch (error) {
    console.log('❌ FAILED: Forgot Password (Send OTP)');
    console.log('   Error:', error.response?.data?.message || error.message);
    results.failed.push({ test: 'Forgot Password (Send OTP)', error: error.message });
  }
  console.log('');

  // ============================================
  // 3. TEST: Reset Password (with OTP)
  // ============================================
  console.log('3️⃣ SKIPPED: Reset Password (requires valid OTP from email)');
  console.log('   Manual test required - use actual OTP from email');
  results.skipped.push('Reset Password (requires manual OTP)');
  console.log('');

  // ============================================
  // 4. TEST: Start Login (OTP-based)
  // ============================================
  try {
    console.log('4️⃣ Testing: Start Login (Request OTP)');
    const response = await authApi.startLogin({
      email: TEST_EMAIL
    });
    
    console.log('✅ PASSED: OTP login initiated');
    console.log('   Response:', response.data);
    results.passed.push('Start Login (Request OTP)');
  } catch (error) {
    console.log('❌ FAILED: Start Login (Request OTP)');
    console.log('   Error:', error.response?.data?.message || error.message);
    results.failed.push({ test: 'Start Login (Request OTP)', error: error.message });
  }
  console.log('');

  // ============================================
  // 5. TEST: Verify OTP Login
  // ============================================
  console.log('5️⃣ SKIPPED: Verify OTP Login (requires valid OTP from email)');
  console.log('   Manual test required - use actual OTP from email');
  results.skipped.push('Verify OTP Login (requires manual OTP)');
  console.log('');

  // ============================================
  // 6. TEST: Get My Profile (Authenticated)
  // ============================================
  console.log('6️⃣ SKIPPED: Get My Profile (requires authentication token)');
  console.log('   Run this after successful login with token in localStorage');
  results.skipped.push('Get My Profile (requires auth token)');
  console.log('');

  // ============================================
  // 7. TEST: Change Password (Authenticated)
  // ============================================
  console.log('7️⃣ SKIPPED: Change Password (requires authentication token)');
  console.log('   Run this after successful login with token in localStorage');
  results.skipped.push('Change Password (requires auth token)');
  console.log('');

  // ============================================
  // ADMIN AUTH TESTS
  // ============================================
  console.log('\n🔐 ADMIN AUTHENTICATION TESTS\n');

  // ============================================
  // 8. TEST: Admin Login
  // ============================================
  try {
    console.log('8️⃣ Testing: Admin Login');
    const response = await adminAuthApi.login({
      email: TEST_ADMIN_EMAIL,
      password: TEST_PASSWORD
    });
    
    if (response.data && response.data.token) {
      console.log('✅ PASSED: Admin login successful');
      console.log('   Token:', response.data.token.substring(0, 20) + '...');
      results.passed.push('Admin Login');
    } else {
      throw new Error('No token received');
    }
  } catch (error) {
    console.log('❌ FAILED: Admin Login');
    console.log('   Error:', error.response?.data?.message || error.message);
    results.failed.push({ test: 'Admin Login', error: error.message });
  }
  console.log('');

  // ============================================
  // 9. TEST: Admin Forgot Password
  // ============================================
  try {
    console.log('9️⃣ Testing: Admin Forgot Password');
    const response = await adminAuthApi.forgotPassword({
      email: TEST_ADMIN_EMAIL
    });
    
    console.log('✅ PASSED: Admin password reset OTP sent');
    console.log('   Response:', response.data);
    results.passed.push('Admin Forgot Password');
  } catch (error) {
    console.log('❌ FAILED: Admin Forgot Password');
    console.log('   Error:', error.response?.data?.message || error.message);
    results.failed.push({ test: 'Admin Forgot Password', error: error.message });
  }
  console.log('');

  // ============================================
  // SUMMARY
  // ============================================
  console.log('\n📊 TEST SUMMARY\n');
  console.log(`✅ Passed: ${results.passed.length}`);
  results.passed.forEach(test => console.log(`   • ${test}`));
  console.log(`\n❌ Failed: ${results.failed.length}`);
  results.failed.forEach(({ test, error }) => console.log(`   • ${test}: ${error}`));
  console.log(`\n⏭️  Skipped: ${results.skipped.length}`);
  results.skipped.forEach(test => console.log(`   • ${test}`));
  
  return results;
};

// Manual tests with actual token
export const testAuthenticatedApis = async (token) => {
  console.log('\n🔒 Testing Authenticated APIs...\n');
  
  // Store token temporarily
  const originalToken = localStorage.getItem('icfy_token');
  localStorage.setItem('icfy_token', token);
  
  try {
    // Test Get Profile
    console.log('1️⃣ Testing: Get My Profile');
    const profileResponse = await authApi.getMyProfile();
    console.log('✅ Profile retrieved:', profileResponse.data);
    
    // Test Change Password
    console.log('\n2️⃣ Testing: Change Password');
    const changePasswordResponse = await authApi.changePassword({
      currentPassword: 'oldPassword',
      newPassword: 'newPassword'
    });
    console.log('✅ Password change response:', changePasswordResponse.data);
    
  } catch (error) {
    console.log('❌ Error:', error.response?.data?.message || error.message);
  } finally {
    // Restore original token
    if (originalToken) {
      localStorage.setItem('icfy_token', originalToken);
    } else {
      localStorage.removeItem('icfy_token');
    }
  }
};

// Quick manual test helper
export const quickTest = {
  login: (email, password) => authApi.loginWithPassword({ email, password }),
  forgotPassword: (email) => authApi.forgotPassword({ email }),
  resetPassword: (email, otp, newPassword) => authApi.resetPassword({ email, otp, newPassword }),
  startOtpLogin: (email) => authApi.startLogin({ email }),
  verifyOtp: (email, otp) => authApi.verifyOtp({ email, otp }),
  getProfile: () => authApi.getMyProfile(),
  changePassword: (currentPassword, newPassword) => authApi.changePassword({ currentPassword, newPassword }),
  adminLogin: (email, password) => adminAuthApi.login({ email, password }),
  adminForgotPassword: (email) => adminAuthApi.forgotPassword({ email })
};

// Export for console usage
if (typeof window !== 'undefined') {
  window.testAuthApis = testAuthApis;
  window.testAuthenticatedApis = testAuthenticatedApis;
  window.quickTest = quickTest;
}

export default testAuthApis;
