# Authentication API Testing Guide

## 🧪 Test Setup Complete

All authentication APIs have been integrated and are ready for testing.

## 📍 Test URL
Visit: **http://localhost:5173/test-auth-api**

## 🔧 Integrated APIs

### User Authentication APIs (authApi)
1. ✅ **loginWithPassword** - POST /api/auth/login-password
2. ✅ **forgotPassword** - POST /api/auth/forgot-password  
3. ✅ **resetPassword** - POST /api/auth/reset-password
4. ✅ **startLogin** - POST /api/auth/start (OTP login)
5. ✅ **verifyOtp** - POST /api/auth/verify
6. ✅ **getMyProfile** - GET /api/account/me (requires auth token)
7. ✅ **changePassword** - POST /api/account/change-password (requires auth token)

### Admin Authentication APIs (adminAuthApi)
8. ✅ **login** - POST /api/admin/auth/login
9. ✅ **forgotPassword** - POST /api/admin/auth/forgot-password
10. ✅ **resetPassword** - POST /api/admin/auth/reset-password
11. ✅ **requestLoginOtp** - POST /api/admin/auth/login-otp/request
12. ✅ **verifyLoginOtp** - POST /api/admin/auth/login-otp/verify

## 🎯 Testing Methods

### Method 1: Visual Component Tester (Recommended)
1. Start your dev server: `npm run dev`
2. Navigate to: **http://localhost:5173/test-auth-api**
3. Enter test credentials:
   - Email: test@example.com
   - Password: Test@1234
4. Click test buttons to run individual tests
5. Click "🚀 Run All" to run all tests sequentially
6. View results in real-time with success/error indicators

### Method 2: Browser Console Testing
Open browser console and run:

```javascript
// Quick individual tests
await quickTest.login('test@example.com', 'Test@1234')
await quickTest.forgotPassword('test@example.com')
await quickTest.startOtpLogin('test@example.com')
await quickTest.getProfile() // requires login first

// Run full test suite
await testAuthApis()

// Test authenticated APIs (after login)
const token = localStorage.getItem('icfy_token')
await testAuthenticatedApis(token)
```

### Method 3: Integrated UI Testing
Test through actual UI components:

#### Login Modal Test
1. Go to home page: http://localhost:5173/
2. Click "Login" button in header
3. Enter credentials:
   - Email: test@example.com
   - Password: Test@1234
4. Click "Login"
5. Check console for API calls
6. Verify token stored in localStorage

#### Forgot Password Modal Test
1. Click "Login" → "Forgot Password?"
2. Enter email: test@example.com
3. Click "Send OTP"
4. Check email for OTP code
5. Enter OTP and verify
6. Set new password
7. Verify password reset success

## 📊 Expected Results

### Success Scenarios
- **Login**: Returns `{ token, user: { id, email, name, role } }`
- **Forgot Password**: Returns `{ message: "OTP sent successfully" }`
- **Reset Password**: Returns `{ message: "Password reset successful" }`
- **Get Profile**: Returns `{ user: {...} }`

### Error Scenarios
- Invalid credentials: 401 Unauthorized
- Invalid OTP: 400 Bad Request
- Expired OTP: 400 Bad Request
- Missing token: 401 Unauthorized

## 🔍 Fallback Behavior

All authentication functions have **localStorage fallback**:
1. API call attempted first
2. If API fails → localStorage fallback used
3. Toast notification shows success/error
4. Console logs show which method was used

## 📝 Test Checklist

- [ ] User login with password
- [ ] User forgot password (send OTP)
- [ ] User reset password (with OTP)
- [ ] User OTP login (start)
- [ ] User OTP login (verify)
- [ ] Get user profile (authenticated)
- [ ] Change password (authenticated)
- [ ] Admin login
- [ ] Admin forgot password
- [ ] Admin OTP login
- [ ] Token storage verification
- [ ] Automatic redirection after login
- [ ] Error handling (wrong credentials)
- [ ] Error handling (expired OTP)
- [ ] Fallback to localStorage

## 🚨 Common Issues

### Issue: CORS Error
**Solution**: Backend must allow requests from http://localhost:5173

### Issue: 404 Not Found
**Solution**: Verify backend is running at https://blog.ithinklearn.com

### Issue: No Token in Response
**Solution**: Check backend response structure matches expected format

### Issue: Token Not Stored
**Solution**: Check localStorage after login: `localStorage.getItem('icfy_token')`

## 📞 API Endpoints Reference

```
Base URL: https://blog.ithinklearn.com

User Auth:
- POST /api/auth/login-password
- POST /api/auth/forgot-password
- POST /api/auth/reset-password
- POST /api/auth/start
- POST /api/auth/verify
- GET  /api/account/me
- POST /api/account/change-password

Admin Auth:
- POST /api/admin/auth/login
- POST /api/admin/auth/forgot-password
- POST /api/admin/auth/reset-password
- POST /api/admin/auth/login-otp/request
- POST /api/admin/auth/login-otp/verify
```

## ✅ Testing Complete When

1. All API calls return expected responses
2. Tokens are stored correctly in localStorage
3. Login redirects to appropriate dashboard
4. Forgot password flow completes successfully
5. Error messages display correctly
6. Fallback mechanism works when API unavailable
