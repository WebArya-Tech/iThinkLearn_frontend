# Running Classes Management - Complete Guide

## 📋 Overview
The "Currently Active Classes" section is now fully managed through the admin dashboard with comprehensive details, real-time enrollment tracking, and enhanced student visibility.

---

## 🎯 Admin Dashboard Features (RunningClassesManagement.jsx)

### Add/Edit Running Class Form
The admin can now manage classes with complete information:

#### Basic Information
- **Subject Name** - Class subject (e.g., "UG Mathematics")
- **Level** - Undergraduate / Post-Graduate / Professional
- **Instructor Name** - Full name of the instructor
- **Difficulty Level** - Beginner / Intermediate / Advanced / Expert

#### Schedule & Duration
- **Start Date** - When the class begins
- **End Date** - When the class ends
- **Duration** - Total duration (e.g., "12 weeks")
- **Schedule** - Day and time (e.g., "Mon, Wed, Fri - 6:00 PM IST")

#### Capacity & Enrollment
- **Max Capacity** - Maximum number of students allowed
- **Current Enrollment** - Auto-calculated from approved enrollments (read-only)

#### Course Content
- **Topics Covered** - Main topics (e.g., "Calculus, Linear Algebra, Differential Equations")
- **Prerequisites** - Required knowledge or qualifications
- **Description** - Detailed class description

#### Meeting Links
- **Demo Class Link** - Link to demo session (Zoom/Google Meet)
- **Regular Meeting Link** - Link for regular classes

#### Status
- **Active** - Currently running
- **Inactive** - Not available
- **Completed** - Finished

### Classes Table
Displays all classes with key metrics:

| Column | Details |
|--------|---------|
| **Subject** | Class name |
| **Level** | Class level with badge |
| **Instructor** | Teacher name |
| **Schedule** | Day and time |
| **Enrollment** | Visual progress bar (Green/Yellow/Red) + X/Capacity |
| **Duration** | Total class duration |
| **Difficulty** | Color-coded difficulty level |
| **Status** | Active/Inactive/Completed |
| **Actions** | Edit / View Students / Delete |

### Enrollment Progress Indicator
- **Green** - Less than 50% capacity used
- **Yellow** - 50-80% capacity used
- **Red** - More than 80% capacity used

### View Students Modal
Click "View Students" button to see:
- List of all enrolled students
- Student names, emails, phone numbers
- Enrollment dates
- Class information summary
- Enrollment capacity status

---

## 👥 Student-Facing Features (RunningClasses.jsx)

### "Currently Active Classes" Display
Each class card now shows:

#### Visual Badges
- **Class Level** - Undergraduate/Post-Graduate/Professional (blue badge)
- **Difficulty Level** - Color-coded (Green=Beginner, Blue=Intermediate, Orange=Advanced, Red=Expert)

#### Information Displayed
- Class subject/title
- Complete description (truncated)
- **Topics** - Main topics covered
- **Instructor** - Teacher name
- **Schedule** - Days and time
- **Duration** - Total duration (e.g., "12 weeks")
- **Start Date** - When class begins

#### Availability Indicator
- Real-time enrollment bar showing:
  - Current enrollment vs. capacity
  - Color-coded status (Green/Yellow/Red)
  - Exact numbers (e.g., "8/15")
- Helps students make enrollment decisions

#### Call-to-Action
- **Enroll Button** - Clear enrollment button
- **Status Badge** - Shows if class is Active/Inactive

---

## 📊 Data Structure

### Class Object
```javascript
{
  id: 1,
  subject: 'UG Mathematics',
  level: 'Undergraduate',
  instructor: 'Ms. Neha Aggarwal',
  schedule: 'Mon, Wed, Fri - 6:00 PM IST',
  maxCapacity: 15,
  currentEnrollment: 8,
  description: 'Comprehensive mathematics coverage...',
  startDate: '2024-06-01',
  endDate: '2024-08-31',
  duration: '12 weeks',
  topics: 'Calculus, Linear Algebra, Differential Equations',
  difficultyLevel: 'Intermediate',
  prerequisites: 'Basic Mathematics',
  demoLink: 'https://zoom.us/j/...',
  meetingLink: 'https://zoom.us/j/...',
  image: '',
  status: 'Active',
  approvedEnrollments: [
    {
      fullName: 'Student Name',
      email: 'student@email.com',
      phone: '9876543210',
      enrollmentDate: '2024-05-15T10:30:00'
    }
  ],
  allEnrollments: []
}
```

---

## 🔄 Enrollment Flow

### Admin Side
1. Add/Edit class with all details
2. Set max capacity
3. View enrollment requests
4. Approve or reject enrollments
5. View list of approved students
6. Current enrollment auto-updates

### Student Side
1. Browse "Currently Active Classes"
2. See class details and topics
3. Check real-time availability
4. Click "Enroll" button
5. Submit enrollment form
6. Wait for admin approval

---

## 💾 Storage & Sync

### Data Storage
- **API Backend** - Primary storage with fallback
- **localStorage** - Cached for offline access
  - Key: `icfy_running_classes` - All classes
  - Key: `runningClassEnrollments` - Enrollment requests

### Sync Mechanism
1. Admin creates/edits class
2. API saves to backend
3. If API fails, saves to localStorage
4. Page auto-syncs on load
5. Students see latest data on refresh

---

## ✨ Key Improvements

### For Admins
✅ Complete class management interface  
✅ Real-time enrollment tracking  
✅ Student list viewing  
✅ Visual progress indicators  
✅ Capacity management  
✅ Meeting link management  
✅ Difficulty categorization  

### For Students
✅ Comprehensive class information  
✅ Real-time availability status  
✅ Topics and prerequisites visibility  
✅ Difficulty level indicators  
✅ Instructor details  
✅ Schedule clarity  
✅ Better enrollment decisions  

---

## 🚀 Best Practices

### For Admins
1. Always fill in all required fields
2. Set realistic capacity numbers
3. Add relevant topics and prerequisites
4. Update meeting links before class start
5. Monitor enrollment regularly
6. Reject incomplete enrollment requests
7. Mark class as "Completed" after course ends

### For Students
1. Read all class details before enrolling
2. Check difficulty level and prerequisites
3. Verify schedule compatibility
4. Join demo class before enrolling
5. Provide complete enrollment information
6. Follow class schedule regularly

---

## 📱 Responsive Design

Both admin and student interfaces are fully responsive:
- Mobile (sm): Single column layout
- Tablet (md): 2-column layout  
- Desktop (lg): 3-4 column layout
- Extra Large (xl): Full grid layout

---

## 🔒 Data Validation

All fields are validated:
- Required fields must be filled
- Dates are properly formatted
- Capacity numbers are positive integers
- URLs are validated (for meeting links)
- Enrollment tracked in real-time
- Status changes are logged

---

## 📞 Support

For issues or questions:
1. Check if all required fields are filled
2. Verify meeting links are correct
3. Clear browser cache and reload
4. Check localStorage sync status
5. Ensure dates are in correct format

---

## 🎓 Example: Complete Class Setup

### Admin Setup
1. Subject: "AP Calculus AB"
2. Level: "Professional"
3. Instructor: "Mr. Rajesh Kumar"
4. Difficulty: "Advanced"
5. Start Date: 2024-06-01
6. End Date: 2024-08-31
7. Duration: "12 weeks"
8. Schedule: "Tue, Thu - 7:00 PM IST"
9. Max Capacity: 12
10. Topics: "Limits, Derivatives, Integrals, Applications"
11. Prerequisites: "Basic Calculus knowledge"
12. Demo Link: [Zoom Link]
13. Meeting Link: [Google Meet Link]
14. Status: "Active"

### Student View
Students see:
- ✅ All the above information displayed beautifully
- ✅ Real-time enrollment: "5/12" (5 students, 12 capacity)
- ✅ Green progress bar (safe to join)
- ✅ "Advanced" difficulty badge
- ✅ Enrollment button ready to click

---

**Last Updated:** May 4, 2026  
**Status:** ✅ Production Ready
