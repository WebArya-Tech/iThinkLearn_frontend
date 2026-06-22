# Demo Request System - Testing Guide

## Test Environment Setup

### Prerequisites
- Clean browser cache or private/incognito mode
- Test on both desktop and mobile browsers
- Internet connection for email/WhatsApp verification
- Access to demo email account (ithinklearn@ixpoe.com)
- WhatsApp access for notifications

---

## Test Cases

### Section 1: Form Submission - Desktop View

#### TC001: Complete Form Submission
**Steps:**
1. Open website on desktop browser (1920x1080 or larger)
2. Click "Schedule Free Demo" button
3. Fill all required fields:
   - Student Name: "Test Student"
   - Parent Name: "Test Parent"
   - Grade: "11-12"
   - Board: "CBSE"
   - Email: "test@example.com"
   - Phone: "9876543210"
   - Preferred Date: Select future date
   - Preferred Time: "9:00 AM - 10:00 AM"
   - Message: (optional) "Test message"
4. Click "Send OTP"

**Expected Result:**
- ✅ Form validates all required fields
- ✅ No validation errors appear
- ✅ OTP sent message displays
- ✅ Step 2 (OTP verification) appears
- ✅ 5-minute countdown timer starts

---

#### TC002: OTP Verification
**Steps:**
1. From TC001, check email or browser console for OTP
2. Enter OTP in the input field
3. Click "Verify OTP" or wait for auto-submission
4. Submit form

**Expected Result:**
- ✅ OTP verified message shows
- ✅ Step 3 (confirmation) appears
- ✅ All submitted details display for review
- ✅ Consent checkbox is present

---

#### TC003: Form Data Storage Verification
**Steps:**
1. After successful submission:
2. Open Developer Tools (F12)
3. Go to Application → Local Storage
4. Check "runningClassDemoRequests"
5. Navigate to Admin Panel → Demo Requests

**Expected Result:**
- ✅ Data exists in localStorage with all fields
- ✅ Demo appears in admin panel
- ✅ Status shows "Pending"
- ✅ Demo number is unique
- ✅ All form data matches what was entered

---

### Section 2: Form Submission - Mobile View

#### TC004: Mobile Form Display
**Steps:**
1. Open website on mobile browser (iPhone 12 or similar)
2. Scroll to demo section or click "Schedule Free Demo"

**Expected Result:**
- ✅ Modal displays full screen
- ✅ Close button (×) is accessible
- ✅ Form fields stack vertically
- ✅ All inputs are readable and accessible
- ✅ Touch-friendly tap areas (min 44x44px)

---

#### TC005: Mobile Form Submission
**Steps:**
1. On mobile, fill form with same data as TC001
2. Submit form step by step
3. Verify each step renders correctly

**Expected Result:**
- ✅ Form validation works on mobile
- ✅ Keyboard doesn't hide important fields
- ✅ OTP input field is touch-friendly
- ✅ Confirmation step displays all info
- ✅ Submit button is clickable without scrolling

---

#### TC006: Mobile Admin Panel View
**Steps:**
1. Access admin panel on mobile (iPhone size)
2. Go to Demo Requests
3. Try to view request details

**Expected Result:**
- ✅ Card view displays (not table)
- ✅ Each request shows in card format
- ✅ All info is readable
- ✅ Action buttons are full-width and clickable
- ✅ "View Details" modal opens properly
- ✅ Modal content is scrollable

---

### Section 3: Validation & Error Handling

#### TC007: Email Validation
**Steps:**
1. Open demo form
2. Try to submit with invalid emails:
   - "notanemail"
   - "test@"
   - "@example.com"

**Expected Result:**
- ✅ Error message: "Please enter a valid email"
- ✅ Field highlights in red
- ✅ Submit button disabled

---

#### TC008: Phone Number Validation
**Steps:**
1. Try to submit with:
   - Less than 10 digits: "98765"
   - More than 10 digits: "98765432101"
   - Non-numeric characters: "9876543210a"

**Expected Result:**
- ✅ Error: "Phone number must be exactly 10 digits"
- ✅ Automatically strips non-numeric characters
- ✅ Limits input to 10 digits max
- ✅ Field shows red border

---

#### TC009: Required Fields Validation
**Steps:**
1. Click "Send OTP" without filling any fields

**Expected Result:**
- ✅ All required fields show error messages
- ✅ Errors clear when field is focused
- ✅ Submit button is disabled until all required fields are filled

---

#### TC010: Date Validation
**Steps:**
1. Try to select a past date in the date picker

**Expected Result:**
- ✅ Past dates are disabled (grayed out)
- ✅ Only future dates can be selected
- ✅ Today's date is available

---

### Section 4: Admin Panel

#### TC011: Admin Panel Access
**Steps:**
1. Log in as admin
2. Navigate to Dashboard → Demo Requests

**Expected Result:**
- ✅ Admin panel loads
- ✅ Existing demo requests display in table (desktop) or cards (mobile)
- ✅ Total count of requests shows

---

#### TC012: Admin Search & Filter
**Steps:**
1. In Admin Panel, try:
   - Search by student name: "Test"
   - Search by email: "test@"
   - Search by phone: "9876543210"
   - Filter by status: "Pending"

**Expected Result:**
- ✅ Search results filter in real-time
- ✅ Multiple filters can be applied
- ✅ Result count updates
- ✅ "No results" message if nothing found

---

#### TC013: Admin View Details
**Steps:**
1. Click "View Details" on any demo request
2. Review all information displayed

**Expected Result:**
- ✅ Modal shows all demo details
- ✅ Demo number is copyable
- ✅ Email and phone are clickable (mailto/tel links)
- ✅ Preferred date/time display correctly
- ✅ Additional message shows if provided
- ✅ Modal scrolls on mobile

---

#### TC014: Status Update
**Steps:**
1. In admin panel, change status from "Pending" to "Contacted"
2. Refresh the page

**Expected Result:**
- ✅ Status updates immediately
- ✅ Status persists after page refresh
- ✅ Status badge color changes
- ✅ History is maintained in localStorage

---

#### TC015: Admin Send Email
**Steps:**
1. In details modal, click "Email Student"
2. Pre-filled compose window opens

**Expected Result:**
- ✅ Default email client opens (or mail URL works)
- ✅ Email template is pre-filled
- ✅ Student email is in "To" field
- ✅ Subject line is appropriate

---

#### TC016: Admin Send WhatsApp
**Steps:**
1. In details modal, click "💬 WhatsApp Student"

**Expected Result:**
- ✅ WhatsApp opens (web or app)
- ✅ Message template is pre-filled
- ✅ Student phone number is correct
- ✅ Conversation is ready to send

---

#### TC017: CSV Download
**Steps:**
1. In admin panel, click "Download CSV"

**Expected Result:**
- ✅ CSV file downloads
- ✅ Filename format: "demo-requests-YYYY-MM-DD.csv"
- ✅ All columns present: Demo #, Student, Parent, Contact, Details, Date & Time, Status
- ✅ All data is correctly formatted
- ✅ Can be opened in Excel/Sheets

---

### Section 5: Notifications

#### TC018: Email Notification
**Steps:**
1. Submit demo request with valid email
2. Wait 30 seconds
3. Check email inbox

**Expected Result:**
- ✅ Confirmation email received
- ✅ Email contains:
  - Student name
  - Demo date & time
  - Demo number
  - Contact information
  - Next steps

---

#### TC019: WhatsApp Notification
**Steps:**
1. Submit demo request with valid phone
2. Wait 30 seconds
3. Check WhatsApp messages

**Expected Result:**
- ✅ WhatsApp message received
- ✅ Message contains:
  - Greeting with student name
  - Demo date & time
  - Demo number
  - Course info

---

#### TC020: Admin Email Notification
**Steps:**
1. Submit demo request
2. Check admin email (ithinklearn@ixpoe.com)

**Expected Result:**
- ✅ Admin receives notification
- ✅ Subject: "New Demo Request: DEMO{number}"
- ✅ Contains all student information
- ✅ Notes "Action Required: Contact within 24 hours"

---

#### TC021: Admin WhatsApp Notification
**Steps:**
1. Submit demo request
2. Check admin WhatsApp (+91 8197 466 607)

**Expected Result:**
- ✅ Admin receives WhatsApp notification
- ✅ Contains demo request summary
- ✅ Shows student phone and email
- ✅ Marks as "Pending" action

---

### Section 6: OTP Functionality

#### TC022: OTP Expiry
**Steps:**
1. Submit demo form to get OTP
2. Wait for 5+ minutes
3. Try to verify OTP

**Expected Result:**
- ✅ Timer shows "0:00"
- ✅ Error message: "OTP has expired"
- ✅ "Resend OTP" option appears
- ✅ Can request new OTP

---

#### TC023: OTP Resend
**Steps:**
1. Request OTP
2. Click "Resend OTP"

**Expected Result:**
- ✅ New OTP is sent
- ✅ Previous OTP becomes invalid
- ✅ Timer restarts (5:00)
- ✅ Can only resend after some delay

---

#### TC024: Invalid OTP
**Steps:**
1. Request OTP
2. Enter wrong OTP (e.g., "000000")
3. Click verify

**Expected Result:**
- ✅ Error message: "Invalid OTP"
- ✅ Input field highlights in red
- ✅ Can try again
- ✅ Does not proceed to next step

---

### Section 7: Data Integrity

#### TC025: Form Data Persistence
**Steps:**
1. Fill demo form partially
2. Close modal without submitting
3. Reopen modal

**Expected Result:**
- ✅ Form resets (no persistence of unsaved data)
- ✅ Each new session starts fresh

---

#### TC026: Successful Submission Confirmation
**Steps:**
1. Submit form successfully
2. Wait for completion

**Expected Result:**
- ✅ Success message displays
- ✅ Modal closes automatically
- ✅ Form resets for next use

---

#### TC027: Multiple Concurrent Submissions
**Steps:**
1. Open 2-3 demo forms in different tabs
2. Submit each form with different data

**Expected Result:**
- ✅ Each submission is stored separately
- ✅ No data conflicts
- ✅ Each gets unique demo number
- ✅ All appear in admin panel

---

### Section 8: Responsive Breakpoints

#### TC028: Tablet View (768px)
**Steps:**
1. Open on tablet (iPad or 768px width)
2. Fill and submit form

**Expected Result:**
- ✅ Form displays correctly
- ✅ 2-column layouts where appropriate
- ✅ Admin panel shows intermediate view
- ✅ All buttons are accessible

---

#### TC029: Large Desktop (2560px+)
**Steps:**
1. Open on large monitor (2560px+)
2. Navigate through all features

**Expected Result:**
- ✅ Layout scales appropriately
- ✅ Not too much empty space
- ✅ Text remains readable
- ✅ Buttons are accessible

---

### Section 9: Browser Compatibility

#### TC030: Chrome Latest
- [ ] Form displays correctly
- [ ] All features work
- [ ] No console errors
- [ ] Responsive works

#### TC031: Firefox Latest
- [ ] Form displays correctly
- [ ] All features work
- [ ] No console errors
- [ ] Responsive works

#### TC032: Safari Latest
- [ ] Form displays correctly
- [ ] All features work
- [ ] No console errors
- [ ] Responsive works

#### TC033: Mobile Chrome
- [ ] Form displays correctly
- [ ] All features work
- [ ] No console errors
- [ ] Touch-friendly

#### TC034: Mobile Safari
- [ ] Form displays correctly
- [ ] All features work
- [ ] No console errors
- [ ] Touch-friendly

---

### Section 10: Performance

#### TC035: Form Load Time
**Steps:**
1. Load demo form modal
2. Check DevTools Network tab

**Expected Result:**
- ✅ Modal loads < 1 second
- ✅ No large resources block rendering
- ✅ Smooth animations

---

#### TC036: Admin Panel Load Time
**Steps:**
1. Navigate to admin panel
2. Check load time

**Expected Result:**
- ✅ Loads within 2 seconds
- ✅ Smooth pagination
- ✅ Fast search/filter response

---

## Test Results Summary

### Desktop Tests
- [ ] Form submission
- [ ] OTP verification
- [ ] Data storage
- [ ] Admin panel access
- [ ] Notifications
- [ ] CSV download

**Status**: ______ (Pass/Fail)
**Issues Found**: ________________

### Mobile Tests
- [ ] Form display
- [ ] Form submission
- [ ] Admin panel cards
- [ ] Details modal
- [ ] Touch interactions

**Status**: ______ (Pass/Fail)
**Issues Found**: ________________

### Validation Tests
- [ ] Email validation
- [ ] Phone validation
- [ ] Required fields
- [ ] Date validation

**Status**: ______ (Pass/Fail)
**Issues Found**: ________________

### Notification Tests
- [ ] Email to student
- [ ] Email to admin
- [ ] WhatsApp to student
- [ ] WhatsApp to admin

**Status**: ______ (Pass/Fail)
**Issues Found**: ________________

---

## Known Limitations & Workarounds

1. **OTP fallback**: If backend unavailable, OTP shows in console
   - Workaround: Check browser console F12

2. **Email/WhatsApp optional**: Notifications require backend endpoints
   - Workaround: Data still saves locally, notifications can be retried later

3. **LocalStorage limit**: ~5-10MB per domain
   - Workaround: Implement backend database sync

---

## Bug Report Template

When filing bugs, use this format:

```
Title: [Component] Issue Description

Severity: Critical/High/Medium/Low

Environment:
- Browser: 
- Device: 
- OS: 
- Viewport: 

Steps to Reproduce:
1. 
2. 
3. 

Expected Result:

Actual Result:

Screenshots/Videos:

Console Errors:
```

---

**Test Date**: _______________
**Tester Name**: _______________
**Overall Status**: ✅ Pass / ❌ Fail / 🟡 Partial
**Notes**: _________________________________________________

---

Version: 1.0
Last Updated: May 28, 2026
