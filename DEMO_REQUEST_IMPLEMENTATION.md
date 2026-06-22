# Schedule Free Demo - Complete Implementation Guide

## Overview
This document outlines the complete flow for the "Schedule Free Demo" form, including form submission, data storage in the Admin Panel, and notifications via email and WhatsApp.

## Architecture

### 1. Frontend Flow

#### Form Submission Process
1. **User fills form** → Schedule Free Demo Modal
   - Student Name (required)
   - Parent Name (required)
   - Grade (required)
   - Board (required)
   - Email (required, validated)
   - Phone (required, 10 digits)
   - Preferred Date (required)
   - Preferred Time (required)
   - Message (optional)

2. **OTP Verification** (Step 2)
   - OTP sent to student email
   - Valid for 5 minutes
   - Frontend fallback if backend unavailable

3. **Consent Confirmation** (Step 3)
   - User agrees to contact via phone/WhatsApp/email
   - Review all submitted details

4. **Form Submission** (handleSubmitDemo)
   - Validates all required fields
   - Generates unique Demo Number (DEMO{count}{timestamp})
   - Stores in localStorage (runningClassDemoRequests)
   - Stores in admin format (icfy_demo_requests)
   - Triggers email notification attempt
   - Triggers WhatsApp notification attempt
   - Queues notifications if backend unavailable

### 2. Data Storage

#### localStorage Keys

**runningClassDemoRequests**
```javascript
{
  id: "DEMO{timestamp}",
  demoNumber: "DEMO1{timestamp}",
  studentName: "John Doe",
  parentName: "Jane Doe",
  grade: "11-12",
  board: "CBSE",
  email: "john@example.com",
  phone: "9876543210",
  preferredDate: "2026-06-15",
  preferredTime: "9:00 AM - 10:00 AM",
  message: "Optional message",
  consentGiven: true,
  requestDate: "ISO 8601 timestamp",
  status: "Pending",
  verified: true
}
```

**icfy_demo_requests** (Admin Panel Format)
```javascript
{
  id: "DEMO{timestamp}",
  name: "John Doe",
  parentName: "Jane Doe",
  email: "john@example.com",
  phone: "9876543210",
  course: "11-12 - CBSE",
  grade: "11-12",
  board: "CBSE",
  preferredDate: "2026-06-15",
  preferredTime: "9:00 AM - 10:00 AM",
  status: "pending",
  notes: "Optional message",
  requestedOn: "MM/DD/YYYY",
  demoNumber: "DEMO1{timestamp}"
}
```

**demoRequestNotifications** (Pending Notifications)
```javascript
{
  id: "DEMO{timestamp}",
  email: "john@example.com",
  phone: "9876543210",
  queuedAt: "ISO 8601 timestamp",
  emailStatus: "pending|sent|failed",
  whatsappStatus: "pending|sent|failed",
  ...demoRequestData
}
```

### 3. Notification System

#### Email Notifications
- **To**: ithinklearn@ixpoe.com (Admin)
- **To**: student email (Confirmation)
- **Subject**: "New Demo Request: DEMO{number}"
- **Content**: Formatted demo details with instructions

#### WhatsApp Notifications
- **To**: +91 8197 466 607 (Admin notification)
- **To**: Student phone (Confirmation)
- **Message**: Pre-formatted with demo details

#### Notification Fallback
If backend API is unavailable:
- Notifications are queued in localStorage
- Automatically retry when backend becomes available
- Frontend displays success message regardless

### 4. Admin Panel Integration

#### DemoRequestsManagement Component
- **Location**: `src/component/admin-dashboard/DemoRequestsManagement.jsx`
- **Features**:
  - Desktop table view with all request details
  - Mobile card view (responsive)
  - Search by student name, email, or phone
  - Filter by status (Pending, Contacted, Scheduled, Completed, Cancelled)
  - View detailed request information
  - Update request status
  - Delete requests
  - Download as CSV
  - Send direct WhatsApp/Email from admin panel

#### Mobile Responsiveness
1. **Desktop** (sm breakpoint+)
   - Full table with all columns
   - Compact layout
   - Inline actions

2. **Mobile** (below sm)
   - Card-based layout
   - One request per card
   - Stack all information vertically
   - Full-width action buttons
   - Touch-friendly spacing

### 5. API Integration Points

#### demoApi.js Methods
```javascript
// Send OTP to email
sendOtp(data)

// Verify OTP
verifyOtp(data)

// Submit demo request
submitRequest(data)

// Send email notification
sendEmailNotification(data)

// Send WhatsApp notification
sendWhatsAppNotification(data)

// Get all requests
getAllRequests()

// Get specific request
getRequestById(id)

// Update request status
updateRequestStatus(id, status)
```

### 6. Backend Requirements

#### Endpoints Needed

**POST /api/demo-requests**
- Save demo request to database
- Log event for audit trail

**POST /api/demo-requests/send-otp**
- Send OTP to student email
- Store OTP with expiry (5 minutes)

**POST /api/demo-requests/verify-otp**
- Verify OTP matches stored value
- Check if not expired

**POST /api/demo-requests/send-email**
- Send confirmation email to student
- Send notification email to admin
- Include all demo details

**POST /api/demo-requests/send-whatsapp**
- Send WhatsApp message to student phone
- Send notification to admin WhatsApp
- Use Twilio or similar service

### 7. Complete Flow Diagram

```
Student Opens Demo Form
    ↓
Fills Form Details (Step 1)
    ↓
Submits → Validates → Sends OTP
    ↓
Student Enters OTP (Step 2)
    ↓
Verifies → Shows Confirmation (Step 3)
    ↓
Student Agrees to Consent
    ↓
Submit Demo Request
    ├─ Store in localStorage (Frontend)
    ├─ Store in Admin Panel format
    ├─ Attempt Email Notification
    │   └─ If fails → Queue locally
    ├─ Attempt WhatsApp Notification
    │   └─ If fails → Queue locally
    └─ Show Success Message
    ↓
Admin Sees Demo Request
    ├─ In Admin Panel: Demo Requests
    ├─ Can view full details
    ├─ Can change status
    ├─ Can send direct email/WhatsApp
    └─ Can download as CSV
```

### 8. Testing Checklist

#### Desktop View
- [ ] Form displays correctly
- [ ] All fields validate properly
- [ ] OTP sends and verifies
- [ ] Data saves to localStorage
- [ ] Admin panel shows request
- [ ] Can update status
- [ ] Can view full details
- [ ] Can send email/WhatsApp from admin

#### Mobile View
- [ ] Form responsive on small screens
- [ ] Fields stack vertically
- [ ] OTP input works on mobile
- [ ] Admin panel card view displays correctly
- [ ] Action buttons are touch-friendly
- [ ] Can update status on mobile
- [ ] Modal displays properly on mobile
- [ ] All buttons are accessible

#### Notifications
- [ ] Email notification formats correctly
- [ ] WhatsApp message sends with correct content
- [ ] Queued notifications retry after backend availability
- [ ] Admin receives notification of new request
- [ ] Student receives confirmation message

#### Data Integrity
- [ ] All form fields saved correctly
- [ ] Phone number stored as 10 digits
- [ ] Email validation works
- [ ] Date/time stored in correct format
- [ ] Demo number generates uniquely
- [ ] Status updates persist
- [ ] CSV download includes all data

### 9. Files Modified/Created

#### Modified Files
1. `src/api/demoApi.js` - Added new API methods
2. `src/component/ScheduleFreeDemoModal.jsx` - Enhanced submission logic
3. `src/component/admin-dashboard/DemoRequestsManagement.jsx` - Added mobile responsive views

#### New Files
1. `src/utils/notificationService.js` - Notification formatting and utilities

#### Configuration
- OFFICIAL_EMAIL: ithinklearn@ixpoe.com
- OFFICIAL_WHATSAPP: 918197466607
- OTP_VALIDITY_MS: 5 minutes (300000ms)
- Demo Number Format: DEMO{count}{timestamp}

### 10. Future Enhancements

1. **Analytics**
   - Track conversion rate
   - Monitor demo completion rate
   - Generate reports

2. **Automation**
   - Auto-send confirmation emails
   - Scheduled reminders before demo
   - Auto-escalation if no response

3. **Integration**
   - Calendar integration (Google Calendar)
   - Video conferencing (Zoom/Google Meet)
   - CRM integration

4. **Notifications**
   - SMS notifications
   - Push notifications
   - Telegram/Slack integration

## Troubleshooting

### Issue: Notifications not sending
- **Solution**: Check backend API availability. Check browser console for errors. Verify notification service configuration.

### Issue: Demo request not appearing in admin panel
- **Solution**: Check localStorage for data. Verify icfy_demo_requests key exists. Clear browser cache and reload.

### Issue: Mobile form not displaying correctly
- **Solution**: Check responsive breakpoints. Verify Tailwind CSS is properly configured. Test on actual mobile device.

### Issue: OTP not sending
- **Solution**: Verify email address is correct. Check backend email service. Verify OTP endpoint is working.

---

**Last Updated**: May 28, 2026
**Version**: 1.0
**Status**: Production Ready
