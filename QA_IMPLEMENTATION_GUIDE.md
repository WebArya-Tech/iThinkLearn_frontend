# Q&A (Post Question) Feature - Implementation Guide

## ✅ What Was Fixed

The "Post Question" functionality was not working because the frontend components were using **mock data only** with no backend API integration. All functionality was local-only.

### Changes Made:

#### 1. **API Layer Expansion** (`src/api/api/answerApi.js`)
Added 6 new functions to handle all Q&A operations:

```javascript
// Student: Post a new question
postQuestion(questionData)
  // POST /api/questions
  // Body: { subject, category, question, status: 'pending' }

// Student: Get their own questions
getStudentQuestions()
  // GET /api/questions/student

// Admin/Tutor: Get all questions
getAdminQuestions(filterStatus)
  // GET /api/questions
  // Params: { status }

// Admin/Tutor: Submit answer to a question
submitAnswer(questionId, answerData)
  // POST /api/questions/{questionId}/answer
  // Body: { tutorAnswer, answeredBy }

// Admin/Tutor: Update an answer
updateAnswer(answerId, answerData)
  // PUT /api/questions/answer/{answerId}
  // Body: { tutorAnswer }

// Admin/Tutor: Delete an answer
deleteAnswer(answerId)
  // DELETE /api/questions/answer/{answerId}
```

#### 2. **Student Portal Update** (`src/component/student-dashboard/AskQuestion.jsx`)

**Before:**
- Questions stored in local state only
- Never sent to backend
- Mock data hardcoded

**After:**
- ✅ Fetches student's questions from backend on component mount
- ✅ Calls `postQuestion()` API when student submits
- ✅ Shows loading/error states
- ✅ Retry functionality for failed requests
- ✅ Real-time UI updates after successful submission

**Key Changes:**
```javascript
// On mount, fetch student's questions
useEffect(() => {
  const response = await getStudentQuestions()
  setQuestions(response.data || [])
}, [])

// On submit, save to backend
const handleSubmit = async (e) => {
  const response = await postQuestion({
    subject, category, question
  })
  setQuestions([response.data, ...questions])
}
```

#### 3. **Admin Dashboard Update** (`src/component/admin-dashboard/QuestionManagement.jsx`)

**Before:**
- Loaded 2 mock questions only
- No real student questions visible
- All edits/deletes were local only

**After:**
- ✅ Fetches ALL student questions from backend
- ✅ Displays real student questions with correct status
- ✅ Supports filtering by status (pending, needs-review, tutor-reviewed)
- ✅ Submits tutor answers to backend
- ✅ Updates/deletes answers persist to database
- ✅ Real-time stats showing pending/answered counts

**Key Changes:**
```javascript
// Fetch questions on mount
useEffect(() => {
  const response = await getAdminQuestions(filterStatus)
  setQuestions(response.data || [])
}, [filterStatus])

// Submit tutor answer
const handleSubmitReview = async () => {
  await submitAnswer(selectedQuestion.id, {
    tutorAnswer: input,
    answeredBy: 'Tutor'
  })
  // Update local state and close modal
}

// Edit/Delete similar pattern with API calls
```

---

## 🔧 Backend API Requirements

The backend must implement these endpoints:

### Base URL: `/api/questions`

#### 1. POST `/api/questions` - Student Posts Question
**Request:**
```json
{
  "subject": "Calculus Integration Problem",
  "category": "academic",
  "question": "How do I solve integration by parts?",
  "status": "pending"
}
```

**Response (201 Created):**
```json
{
  "data": {
    "id": 1,
    "studentId": "student_uuid",
    "subject": "Calculus Integration Problem",
    "category": "academic",
    "question": "How do I solve integration by parts?",
    "tutorAnswer": null,
    "status": "pending",
    "needsReview": true,
    "createdAt": "2026-05-30T10:00:00Z",
    "updatedAt": "2026-05-30T10:00:00Z"
  }
}
```

---

#### 2. GET `/api/questions/student` - Get Student's Questions
**Query Params:** None (authenticated via JWT)

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "subject": "Calculus Integration Problem",
      "category": "academic",
      "question": "How do I solve integration by parts?",
      "answer": "First, use the formula...",
      "status": "answered",
      "askedOn": "2 days ago",
      "answeredBy": "Tutor Name",
      "reviewedBy": "Prof. Smith"
    },
    {
      "id": 2,
      "subject": "Newton's Laws",
      "category": "physics",
      "question": "How to apply Newton's second law?",
      "answer": null,
      "status": "pending",
      "askedOn": "1 hour ago",
      "answeredBy": null,
      "reviewedBy": null
    }
  ]
}
```

---

#### 3. GET `/api/questions` - Admin Gets All Questions
**Query Params:**
- `status` (optional): 'all', 'pending', 'tutor-reviewed', 'needs-review'

**Response (200 OK):**
```json
{
  "data": [
    {
      "id": 1,
      "student": "Rahul Sharma",
      "subject": "Calculus Integration",
      "category": "Mathematics",
      "question": "How to solve integration by parts?",
      "tutorAnswer": null,
      "status": "pending",
      "needsReview": true,
      "createdAt": "2026-05-30T10:00:00Z"
    },
    {
      "id": 2,
      "student": "Priya Mehta",
      "subject": "Chemical Bonding",
      "category": "Chemistry",
      "question": "Difference between ionic and covalent bonds?",
      "tutorAnswer": "Ionic bonds form through electron transfer...",
      "status": "tutor-reviewed",
      "needsReview": false,
      "createdAt": "2026-05-28T15:30:00Z"
    }
  ]
}
```

---

#### 4. POST `/api/questions/{questionId}/answer` - Tutor Submits Answer
**Request:**
```json
{
  "tutorAnswer": "Here's the solution to integration by parts...",
  "answeredBy": "Tutor"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Answer submitted successfully",
  "data": {
    "id": 1,
    "tutorAnswer": "Here's the solution...",
    "status": "tutor-reviewed",
    "needsReview": false,
    "updatedAt": "2026-05-30T11:00:00Z"
  }
}
```

**Error Response (404):**
```json
{
  "success": false,
  "error": "Question not found"
}
```

---

#### 5. PUT `/api/questions/answer/{answerId}` - Update Answer
**Request:**
```json
{
  "tutorAnswer": "Updated answer with more details..."
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Answer updated successfully",
  "data": {
    "id": 1,
    "tutorAnswer": "Updated answer...",
    "updatedAt": "2026-05-30T11:30:00Z"
  }
}
```

---

#### 6. DELETE `/api/questions/answer/{answerId}` - Delete Answer
**Response (200 OK):**
```json
{
  "success": true,
  "message": "Answer deleted successfully",
  "data": {
    "id": 1,
    "status": "pending",
    "needsReview": true,
    "tutorAnswer": null
  }
}
```

---

## 📊 Database Schema Required

**Questions Table:**
```
id (PK)
student_id (FK to Users)
subject (string)
category (string)
question (text)
tutor_answer (text, nullable)
status (enum: 'pending', 'tutor-reviewed', 'admin-reviewed')
needs_review (boolean)
answered_by (string, nullable)
reviewed_by (string, nullable)
created_at (timestamp)
updated_at (timestamp)
```

---

## 🔄 Expected User Flow (Now Working)

### Student Side:
1. Student logs in to Student Portal
2. Clicks "Post Question" button
3. Fills form (subject, category, question text)
4. Clicks "Submit"
5. ✅ Question sent to backend via `postQuestion()` API
6. ✅ Question appears in "My Questions" list with "pending" status
7. Waits for tutor answer
8. ✅ When tutor posts answer, student sees it (on refresh or via real-time sync)

### Admin/Tutor Side:
1. Admin logs in and navigates to "Q&A Management"
2. ✅ Sees all pending student questions via `getAdminQuestions()` API
3. Clicks "Add Tutor Answer" on a question
4. Types answer and clicks "Submit Review"
5. ✅ Answer sent to backend via `submitAnswer()` API
6. ✅ Status changes to "tutor-reviewed"
7. ✅ Student sees the answer in their portal

### Updating/Deleting Answers:
1. Admin clicks "Edit" on an existing answer
2. Updates the text
3. ✅ Calls `updateAnswer()` API
4. Or clicks "Delete" to remove answer via `deleteAnswer()` API

---

## ⚙️ Environment Setup

The frontend is configured to use:
- **API Base URL:** `https://blog.ithinklearn.com` (from `.env`)
- **Authentication:** JWT tokens for students, Basic Auth for admins

The backend should:
1. ✅ Accept requests from the frontend domain
2. ✅ Validate JWT/Basic Auth on each endpoint
3. ✅ Implement database persistence
4. ✅ Return proper status codes and error messages

---

## 🧪 Testing Checklist

### Frontend is Ready to Test:
- ✅ Component imports API functions
- ✅ Loading states show while fetching
- ✅ Error states show if request fails
- ✅ Submit buttons disabled during submission
- ✅ Success messages show after operations
- ✅ Data persists in UI after API response

### Backend Must Provide:
- ⏳ All 6 endpoints implemented
- ⏳ Proper authentication/authorization
- ⏳ Database persistence
- ⏳ Error handling with descriptive messages

### Once Backend is Ready:
```bash
# Test 1: Post a question
1. Go to Student Portal
2. Click "Post Question"
3. Fill form and submit
4. Check backend DB - question should be saved

# Test 2: View in Admin Panel
1. Go to Admin Dashboard → Q&A Management
2. Should see the question posted in Test 1

# Test 3: Admin posts answer
1. Click "Add Tutor Answer"
2. Type answer and submit
3. Check backend - answer should be saved

# Test 4: Student sees answer
1. Go back to Student Portal
2. Refresh or check "My Questions"
3. Should see the tutor answer
```

---

## 📝 Notes

- The frontend now properly calls backend APIs for all Q&A operations
- No data is saved locally anymore (except UI state)
- All operations require network connectivity
- Error handling shows user-friendly messages
- Loading states prevent multiple submissions
- Authentication uses existing JWT/Basic Auth mechanism

---

## 🚀 Next Steps

1. **Backend Team:** Implement the 6 endpoints listed above
2. **QA Team:** Test using the checklist provided
3. **DevOps:** Ensure API base URL is correctly configured
4. **Database:** Create Questions table with schema provided

The frontend is **ready for integration** with the backend!
