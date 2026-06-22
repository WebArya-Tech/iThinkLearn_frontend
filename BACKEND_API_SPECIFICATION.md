# Backend API Specification - Demo Requests

## Overview
This document specifies the backend API endpoints required to complete the Schedule Free Demo feature implementation.

## Base URL
```
https://api.ithinklearn.com/api/demo-requests
```

## Authentication
- Include JWT token in Authorization header
- Format: `Authorization: Bearer {token}`

---

## Endpoints

### 1. Send OTP Email

**Endpoint:** `POST /api/demo-requests/send-otp`

**Description:** Send OTP to student's email address

**Request Body:**
```json
{
  "email": "student@example.com",
  "studentName": "John Doe",
  "otp": "123456",
  "otpValidityMinutes": 5,
  "message": "This OTP is valid for only 5 minutes."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "OTP sent successfully",
  "timestamp": "2026-05-28T10:30:00Z"
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Invalid email address",
  "timestamp": "2026-05-28T10:30:00Z"
}
```

**Email Template:**
```
Subject: Your iThinkLearn Demo OTP

Dear {studentName},

Your OTP for the demo scheduling is: {otp}

This OTP is valid for only {otpValidityMinutes} minutes.

If you didn't request this, please ignore this email.

Best regards,
iThinkLearn Team
```

---

### 2. Verify OTP

**Endpoint:** `POST /api/demo-requests/verify-otp`

**Description:** Verify OTP entered by student

**Request Body:**
```json
{
  "email": "student@example.com",
  "otp": "123456"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "OTP verified successfully",
  "verified": true,
  "timestamp": "2026-05-28T10:32:00Z"
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Invalid or expired OTP",
  "verified": false,
  "timestamp": "2026-05-28T10:32:00Z"
}
```

---

### 3. Submit Demo Request

**Endpoint:** `POST /api/demo-requests`

**Description:** Save demo request to database and trigger notifications

**Request Body:**
```json
{
  "id": "DEMO1748338000000",
  "demoNumber": "DEMO11748338000000",
  "studentName": "John Doe",
  "parentName": "Jane Doe",
  "grade": "11-12",
  "board": "CBSE",
  "email": "john@example.com",
  "phone": "9876543210",
  "preferredDate": "2026-06-15",
  "preferredTime": "9:00 AM - 10:00 AM",
  "message": "Optional message from student",
  "consentGiven": true,
  "requestDate": "2026-05-28T10:33:00Z",
  "status": "Pending",
  "verified": true,
  "officialEmail": "ithinklearn@ixpoe.com",
  "officialWhatsApp": "918197466607"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Demo request created successfully",
  "data": {
    "id": "DEMO1748338000000",
    "demoNumber": "DEMO11748338000000",
    "status": "Pending",
    "createdAt": "2026-05-28T10:33:00Z"
  },
  "timestamp": "2026-05-28T10:33:00Z"
}
```

**Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Missing required fields",
  "missingFields": ["email", "phone"],
  "timestamp": "2026-05-28T10:33:00Z"
}
```

---

### 4. Send Email Notification

**Endpoint:** `POST /api/demo-requests/send-email`

**Description:** Send email notification to student and admin

**Request Body:**
```json
{
  "to": "ithinklearn@ixpoe.com",
  "studentEmail": "john@example.com",
  "demoRequest": {
    "id": "DEMO1748338000000",
    "demoNumber": "DEMO11748338000000",
    "studentName": "John Doe",
    "parentName": "Jane Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "grade": "11-12",
    "board": "CBSE",
    "preferredDate": "2026-06-15",
    "preferredTime": "9:00 AM - 10:00 AM",
    "message": "Optional message",
    "requestDate": "2026-05-28T10:33:00Z"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Email sent successfully",
  "sentTo": ["ithinklearn@ixpoe.com", "john@example.com"],
  "timestamp": "2026-05-28T10:34:00Z"
}
```

**Email Templates:**

**Admin Email:**
```
Subject: New Demo Request: DEMO11748338000000

Dear Admin,

A new demo request has been received.

---
DEMO DETAILS
---
Demo Number: DEMO11748338000000
Request Date: 2026-05-28
Request Time: 10:33 AM

---
STUDENT INFORMATION
---
Name: John Doe
Parent/Guardian: Jane Doe
Email: john@example.com
Phone: 9876543210
Grade: 11-12
Board: CBSE

---
DEMO SCHEDULE
---
Preferred Date: 2026-06-15
Preferred Time: 9:00 AM - 10:00 AM

---
ADDITIONAL MESSAGE
---
Optional message from student

---
STATUS: Pending
ACTION REQUIRED: Contact the student within 24 hours

Best regards,
iThinkLearn System
```

**Student Email:**
```
Subject: Demo Request Confirmation - DEMO11748338000000

Dear John Doe,

Thank you for scheduling a free demo class with iThinkLearn!

---
YOUR DEMO DETAILS
---
Demo Number: DEMO11748338000000
Date: 2026-06-15
Time: 9:00 AM - 10:00 AM
Grade: 11-12
Board: CBSE

---
WHAT HAPPENS NEXT?
---
• Our team will contact you 24 hours before your scheduled demo
• You'll receive a meeting link via email
• Our expert tutors will provide personalized guidance

---
NEED TO RESCHEDULE?
---
Please reply to this email or contact us:
📧 Email: ithinklearn@ixpoe.com
📱 WhatsApp: +91 8197 466 607
📞 Call: +91 779 501 0900

Office Hours:
Monday - Friday: 9:00 AM - 8:00 PM IST
Saturday - Sunday: 10:00 AM - 6:00 PM IST

Best regards,
iThinkLearn Team
```

---

### 5. Send WhatsApp Notification

**Endpoint:** `POST /api/demo-requests/send-whatsapp`

**Description:** Send WhatsApp notification via Twilio or similar service

**Request Body:**
```json
{
  "phone": "918197466607",
  "studentPhone": "919876543210",
  "demoRequest": {
    "id": "DEMO1748338000000",
    "demoNumber": "DEMO11748338000000",
    "studentName": "John Doe",
    "preferredDate": "2026-06-15",
    "preferredTime": "9:00 AM - 10:00 AM",
    "grade": "11-12",
    "board": "CBSE"
  }
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "WhatsApp message sent successfully",
  "sentTo": ["918197466607", "919876543210"],
  "messageId": "msg_1748338000000",
  "timestamp": "2026-05-28T10:34:30Z"
}
```

**WhatsApp Messages:**

**Admin Message:**
```
📢 New Demo Request

Demo #: DEMO11748338000000
Student: John Doe
Phone: +91 9876543210
Date: 2026-06-15
Time: 9:00 AM - 10:00 AM
Grade: 11-12 | Board: CBSE

Status: Pending ⏳
Action Required: Contact within 24 hours

Please follow up with the student.
```

**Student Message:**
```
✅ Demo Scheduled Successfully!

Hi John! Your demo class has been confirmed.

📅 Date: 2026-06-15
⏰ Time: 9:00 AM - 10:00 AM
📚 Grade: 11-12
🎓 Board: CBSE

Demo #: DEMO11748338000000

Our team will send you a meeting link 24 hours before the demo. If you need to reschedule, reply to this message or call +91 8197 466 607.

See you soon! 🎉
```

---

### 6. Get All Demo Requests

**Endpoint:** `GET /api/demo-requests`

**Description:** Retrieve all demo requests with optional filtering

**Query Parameters:**
```
?status=Pending
?grade=11-12
?board=CBSE
?page=1
?limit=20
?sort=-requestDate
?search=john
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "DEMO1748338000000",
      "demoNumber": "DEMO11748338000000",
      "studentName": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "grade": "11-12",
      "board": "CBSE",
      "preferredDate": "2026-06-15",
      "preferredTime": "9:00 AM - 10:00 AM",
      "status": "Pending",
      "requestDate": "2026-05-28T10:33:00Z",
      "createdAt": "2026-05-28T10:33:00Z",
      "updatedAt": "2026-05-28T10:33:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 1,
    "pages": 1
  },
  "timestamp": "2026-05-28T10:35:00Z"
}
```

---

### 7. Get Demo Request by ID

**Endpoint:** `GET /api/demo-requests/{id}`

**Description:** Retrieve specific demo request details

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "DEMO1748338000000",
    "demoNumber": "DEMO11748338000000",
    "studentName": "John Doe",
    "parentName": "Jane Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "grade": "11-12",
    "board": "CBSE",
    "preferredDate": "2026-06-15",
    "preferredTime": "9:00 AM - 10:00 AM",
    "message": "Optional message",
    "status": "Pending",
    "verified": true,
    "consentGiven": true,
    "requestDate": "2026-05-28T10:33:00Z",
    "createdAt": "2026-05-28T10:33:00Z",
    "updatedAt": "2026-05-28T10:33:00Z"
  },
  "timestamp": "2026-05-28T10:35:00Z"
}
```

---

### 8. Update Demo Request Status

**Endpoint:** `PUT /api/demo-requests/{id}`

**Description:** Update the status of a demo request

**Request Body:**
```json
{
  "status": "Contacted",
  "notes": "Student called, scheduled for next week"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Demo request updated successfully",
  "data": {
    "id": "DEMO1748338000000",
    "status": "Contacted",
    "updatedAt": "2026-05-28T10:40:00Z"
  },
  "timestamp": "2026-05-28T10:40:00Z"
}
```

**Status Values:**
- `Pending` - Initial status
- `Contacted` - Admin has contacted the student
- `Scheduled` - Demo class scheduled
- `Completed` - Demo class completed
- `Cancelled` - Demo request cancelled

---

### 9. Delete Demo Request

**Endpoint:** `DELETE /api/demo-requests/{id}`

**Description:** Delete a demo request

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Demo request deleted successfully",
  "timestamp": "2026-05-28T10:42:00Z"
}
```

---

## Error Codes

| Code | Message | Description |
|------|---------|-------------|
| 400 | Bad Request | Invalid request parameters |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Demo request not found |
| 409 | Conflict | Duplicate entry or conflict |
| 500 | Internal Server Error | Server error |
| 503 | Service Unavailable | External service (email/WhatsApp) unavailable |

---

## Rate Limiting

- **Limit**: 100 requests per minute per IP
- **Headers**:
  ```
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 99
  X-RateLimit-Reset: 1748338200
  ```

---

## Response Format

All responses follow this format:

```json
{
  "success": true|false,
  "message": "Response message",
  "data": {},
  "error": "Error message (if failed)",
  "timestamp": "ISO 8601 timestamp"
}
```

---

## Implementation Notes

### Email Service
- Use SendGrid or similar service
- Store email templates in database
- Log all sent emails for audit trail

### WhatsApp Service
- Use Twilio WhatsApp API
- Respect rate limits
- Handle delivery failures

### Database Schema

```sql
CREATE TABLE demo_requests (
  id VARCHAR(50) PRIMARY KEY,
  demo_number VARCHAR(50) UNIQUE NOT NULL,
  student_name VARCHAR(100) NOT NULL,
  parent_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(10) NOT NULL,
  grade VARCHAR(50) NOT NULL,
  board VARCHAR(50) NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time VARCHAR(50) NOT NULL,
  message TEXT,
  status ENUM('Pending', 'Contacted', 'Scheduled', 'Completed', 'Cancelled') DEFAULT 'Pending',
  verified BOOLEAN DEFAULT false,
  consent_given BOOLEAN DEFAULT false,
  request_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  created_by VARCHAR(100),
  updated_by VARCHAR(100),
  INDEX idx_email (email),
  INDEX idx_phone (phone),
  INDEX idx_status (status),
  INDEX idx_request_date (request_date)
);

CREATE TABLE otp_storage (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(100) NOT NULL,
  otp VARCHAR(6) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_expires_at (expires_at)
);

CREATE TABLE demo_notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  demo_request_id VARCHAR(50) NOT NULL,
  notification_type ENUM('email', 'whatsapp') NOT NULL,
  recipient VARCHAR(100) NOT NULL,
  status ENUM('pending', 'sent', 'failed') DEFAULT 'pending',
  message TEXT,
  response TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  sent_at TIMESTAMP,
  FOREIGN KEY (demo_request_id) REFERENCES demo_requests(id),
  INDEX idx_demo_request_id (demo_request_id),
  INDEX idx_status (status)
);
```

---

**Version**: 1.0
**Last Updated**: May 28, 2026
**Status**: Ready for Implementation
