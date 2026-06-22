/**
 * ITHINK-BACKEND API Endpoints
 * Auto-generated from Spring Boot controllers
 */

const endpoints = {
  // ──────────────────────────────────────────────
  // AUTH (User Authentication)
  // ──────────────────────────────────────────────
  auth: [
    { method: 'POST', path: '/api/auth/start', handler: 'startLogin' },
    { method: 'POST', path: '/api/auth/verify', handler: 'verifyOtp' },
    { method: 'POST', path: '/api/auth/login-password', handler: 'loginWithPassword' },
    { method: 'POST', path: '/api/auth/forgot-password', handler: 'forgotPassword' },
    { method: 'POST', path: '/api/auth/reset-password', handler: 'resetPassword' },
    { method: 'POST', path: '/api/auth/logout', handler: 'logout' },
  ],
  // ──────────────────────────────────────────────
  // ACCOUNT (Authenticated User)
  // ──────────────────────────────────────────────
  account: [
    { method: 'GET', path: '/api/account/me', handler: 'getMyProfile' },
    { method: 'POST', path: '/api/account/change-password', handler: 'changePassword' },
  ],
  // ──────────────────────────────────────────────
  // BLOG - Public
  // ──────────────────────────────────────────────
  blogPublic: [
    { method: 'GET', path: '/api/blogs', handler: 'getPublishedBlogs' },
    { method: 'GET', path: '/api/blogs/archive', handler: 'getArchive' },
    { method: 'GET', path: '/api/blogs/{slug}', handler: 'getBlogBySlug' },
    { method: 'POST', path: '/api/blogs', handler: 'submitBlog' },
  ],

  // BLOG - Submissions (Guest OTP Flow)
  blogSubmissions: [
    { method: 'POST', path: '/api/blogs/submissions/start', handler: 'startSubmission' },
    { method: 'POST', path: '/api/blogs/submissions/verify', handler: 'verifySubmission' },
    { method: 'POST', path: '/api/blogs/submissions/finish', handler: 'finishSubmission' },
  ],
  // BLOG - Subscriptions
  blogSubscriptions: [
    { method: 'POST', path: '/api/blogs/subscriptions/request-otp', handler: 'requestOtp' },
    { method: 'POST', path: '/api/blogs/subscriptions/verify', handler: 'subscribe' },
    { method: 'POST', path: '/api/blogs/subscriptions/unsubscribe', handler: 'unsubscribe' },
  ],

  // BLOG - Interactions (Comments & Reactions)
  blogInteractions: [
    { method: 'GET', path: '/api/blogs/{blogId}/comments', handler: 'getComments' },
    { method: 'POST', path: '/api/blogs/{blogId}/comments', handler: 'postComment' },
    { method: 'GET', path: '/api/blogs/{blogId}/reactions/status', handler: 'getReactionStatus' },
    { method: 'POST', path: '/api/blogs/{blogId}/reactions/toggle', handler: 'toggleReaction' },
  ],

  // BLOG - Admin
  blogAdmin: [
    { method: 'GET', path: '/admin/api/blogs', handler: 'getAdminBlogs' },
    { method: 'GET', path: '/admin/api/blogs/{id}', handler: 'getBlogById' },
    { method: 'POST', path: '/admin/api/blogs/{id}/approve', handler: 'approveBlog' },
    { method: 'POST', path: '/admin/api/blogs/{id}/reject', handler: 'rejectBlog' },
    { method: 'PUT', path: '/admin/api/blogs/{id}', handler: 'editBlog' },
    { method: 'DELETE', path: '/admin/api/blogs/{id}', handler: 'deleteBlog' },
  ],

  // COMMENTS - Admin
  commentsAdmin: [
    { method: 'GET', path: '/admin/api/comments/pending', handler: 'getPendingComments' },
    { method: 'GET', path: '/admin/api/comments/all', handler: 'getAllComments' },
    { method: 'POST', path: '/admin/api/comments/{id}/approve', handler: 'approveComment' },
    { method: 'PUT', path: '/admin/api/comments/{id}', handler: 'editComment' },
    { method: 'DELETE', path: '/admin/api/comments/{id}', handler: 'deleteComment' },
  ],

  // ──────────────────────────────────────────────
  // ADMIN AUTH
  // ──────────────────────────────────────────────
  adminAuth: [
    { method: 'POST', path: '/api/admin/auth/login', handler: 'login', altPath: '/admin/auth/login' },
    { method: 'POST', path: '/api/admin/auth/forgot-password', handler: 'forgotPassword', altPath: '/admin/auth/forgot-password' },
    { method: 'POST', path: '/api/admin/auth/reset-password', handler: 'resetPassword', altPath: '/admin/auth/reset-password' },
    { method: 'POST', path: '/api/admin/auth/login-otp/request', handler: 'requestLoginOtp', altPath: '/admin/auth/login-otp/request' },
    { method: 'POST', path: '/api/admin/auth/login-otp/verify', handler: 'verifyLoginOtp', altPath: '/admin/auth/login-otp/verify' },
    { method: 'POST', path: '/api/admin/auth/logout', handler: 'logout', altPath: '/admin/auth/logout' },
  ],

  // ──────────────────────────────────────────────
  // CATEGORIES - Admin
  // ──────────────────────────────────────────────
  categoriesAdmin: [
    { method: 'GET', path: '/api/admin/categories', handler: 'getAllCategories' },
    { method: 'POST', path: '/api/admin/categories', handler: 'createCategory' },
    { method: 'PUT', path: '/api/admin/categories/{id}', handler: 'updateCategory' },
    { method: 'DELETE', path: '/api/admin/categories/{id}', handler: 'deleteCategory' },
  ],

  // ──────────────────────────────────────────────
  // CATEGORIES - Public
  // ──────────────────────────────────────────────
  categoriesPublic: [
    { method: 'GET', path: '/api/categories', handler: 'getAllCategories' },
    { method: 'GET', path: '/api/categories/{id}', handler: 'getCategoryById' },
    { method: 'GET', path: '/api/categories/slug/{slug}', handler: 'getCategoryBySlug' },
  ],

  // ──────────────────────────────────────────────
  // TESTIMONIALS - Admin
  // ──────────────────────────────────────────────
  testimonialsAdmin: [
    { method: 'GET', path: '/api/admin/testimonials', handler: 'getAllTestimonials' },
    { method: 'POST', path: '/api/admin/testimonials', handler: 'createTestimonial' },
    { method: 'PUT', path: '/api/admin/testimonials/{id}', handler: 'updateTestimonial' },
    { method: 'POST', path: '/api/admin/testimonials/{id}/primary', handler: 'setPrimary' },
    { method: 'DELETE', path: '/api/admin/testimonials/{id}', handler: 'delete' },
  ],

  // ──────────────────────────────────────────────
  // TESTIMONIALS - Public
  // ──────────────────────────────────────────────
  testimonialsPublic: [
    { method: 'GET', path: '/api/testimonials', handler: 'getAll' },
    { method: 'GET', path: '/api/testimonials/primary', handler: 'getPrimaryTestimonials' },
  ],

  // ──────────────────────────────────────────────
  // QUESTIONS - Admin
  // ──────────────────────────────────────────────
  questionsAdmin: [
    { method: 'POST', path: '/api/admin/questions', handler: 'createQuestion' },
    { method: 'PUT', path: '/api/admin/questions/{id}', handler: 'updateQuestion' },
    { method: 'DELETE', path: '/api/admin/questions/{id}', handler: 'deleteQuestion' },
  ],

  // ──────────────────────────────────────────────
  // QUESTIONS - Public
  // ──────────────────────────────────────────────
  questionsPublic: [
    { method: 'GET', path: '/api/questions', handler: 'getQuestions' },
    { method: 'GET', path: '/api/questions/{id}', handler: 'getQuestionById' },
    { method: 'GET', path: '/api/questions/slug/{slug}', handler: 'getQuestionBySlug' },
  ],

  // ──────────────────────────────────────────────
  // ANSWERS - Admin
  // ──────────────────────────────────────────────
  answersAdmin: [
    { method: 'GET', path: '/api/admin/answers', handler: 'getAllAnswers' },
    { method: 'POST', path: '/api/admin/answers', handler: 'submitAdminAnswer' },
    { method: 'PATCH', path: '/api/admin/answers/{id}/approve', handler: 'approveAnswer' },
    { method: 'PATCH', path: '/api/admin/answers/{id}/reject', handler: 'rejectAnswer' },
    { method: 'DELETE', path: '/api/admin/answers/{id}', handler: 'deleteAnswer' },
  ],

  // ──────────────────────────────────────────────
  // ANSWERS - Public
  // ──────────────────────────────────────────────
  answersPublic: [
    { method: 'GET', path: '/api/answers/question/{questionId}', handler: 'getApprovedAnswers' },
    { method: 'POST', path: '/api/answers', handler: 'submitAnswer' },
  ],

  // ──────────────────────────────────────────────
  // TEACHERS - Admin
  // ──────────────────────────────────────────────
  teachersAdmin: [
    { method: 'GET', path: '/api/admin/teachers', handler: 'getAllTeachers' },
    { method: 'POST', path: '/api/admin/teachers', handler: 'createTeacher' },
    { method: 'GET', path: '/api/admin/teachers/{id}', handler: 'getTeacherById' },
    { method: 'PUT', path: '/api/admin/teachers/{id}', handler: 'updateTeacher' },
    { method: 'DELETE', path: '/api/admin/teachers/{id}', handler: 'deleteTeacher' },
  ],

  // ──────────────────────────────────────────────
  // TEACHERS - Public
  // ──────────────────────────────────────────────
  teachersPublic: [
    { method: 'GET', path: '/api/teachers', handler: 'getAllActiveTeachers' },
    { method: 'GET', path: '/api/teachers/{id}', handler: 'getTeacherById' },
  ],

  // ──────────────────────────────────────────────
  // EXPORT - Admin
  // ──────────────────────────────────────────────
  exportAdmin: [
    { method: 'GET', path: '/api/admin/export/testimonials', handler: 'exportTestimonialsToCsv' },
  ],

  // ──────────────────────────────────────────────
  // REVIEWS - Public & Authenticated
  // ──────────────────────────────────────────────
  reviewsPublic: [
    { method: 'GET', path: '/api/reviews', handler: 'getPublishedReviews' },
    { method: 'GET', path: '/api/reviews/{id}', handler: 'getPublishedReviewById' },
    { method: 'POST', path: '/api/reviews/send-otp', handler: 'sendReviewOtp' },
    { method: 'POST', path: '/api/reviews/verify-otp', handler: 'verifyReviewOtp' },
    { method: 'POST', path: '/api/reviews', handler: 'submitReview' },
    { method: 'GET', path: '/api/reviews/me', handler: 'getMyReviews' },
  ],

  // REVIEWS - Admin
  reviewsAdmin: [
    { method: 'GET', path: '/admin/api/reviews', handler: 'getAdminReviews' },
    { method: 'GET', path: '/admin/api/reviews/{id}', handler: 'getReviewById' },
    { method: 'POST', path: '/admin/api/reviews/{id}/approve', handler: 'approveReview' },
    { method: 'POST', path: '/admin/api/reviews/{id}/reject', handler: 'rejectReview' },
    { method: 'DELETE', path: '/admin/api/reviews/{id}', handler: 'deleteReview' },
  ],

  // ──────────────────────────────────────────────
  // RUNNING CLASSES - Public & Authenticated
  // ──────────────────────────────────────────────
  runningClassesPublic: [
    { method: 'GET', path: '/api/classes', handler: 'getActiveClasses' },
    { method: 'GET', path: '/api/classes/{id}', handler: 'getClassById' },
    { method: 'POST', path: '/api/classes/{id}/enroll', handler: 'enroll' },
    { method: 'GET', path: '/api/classes/my-enrollments', handler: 'getMyEnrollments' },
    { method: 'POST', path: '/api/classes/enrollments/{enrollmentId}/cancel', handler: 'cancelMyEnrollment' },
  ],

  // RUNNING CLASSES - Admin
  runningClassesAdmin: [
    { method: 'GET', path: '/admin/api/classes', handler: 'getAdminClasses' },
    { method: 'GET', path: '/admin/api/classes/{id}', handler: 'getClassById' },
    { method: 'POST', path: '/admin/api/classes', handler: 'createClass' },
    { method: 'PUT', path: '/admin/api/classes/{id}', handler: 'updateClass' },
    { method: 'DELETE', path: '/admin/api/classes/{id}', handler: 'deleteClass' },
    { method: 'GET', path: '/admin/api/classes/enrollments', handler: 'getEnrollments' },
    { method: 'GET', path: '/admin/api/classes/enrollments/{id}', handler: 'getEnrollmentById' },
    { method: 'POST', path: '/admin/api/classes/enrollments/{id}/confirm', handler: 'confirmEnrollment' },
    { method: 'POST', path: '/admin/api/classes/enrollments/{id}/reject', handler: 'rejectEnrollment' },
    { method: 'DELETE', path: '/admin/api/classes/enrollments/{id}', handler: 'deleteEnrollment' },
  ],

  // ──────────────────────────────────────────────
  // CONTACT - Public
  // ──────────────────────────────────────────────
  contactPublic: [
    { method: 'GET', path: '/api/public/contact/subjects', handler: 'getAllSubjects' },
    { method: 'POST', path: '/api/public/contact/message', handler: 'submitMessage' },
  ],

  // CONTACT - Admin
  contactAdmin: [
    { method: 'GET', path: '/api/admin/contact/subjects', handler: 'getAllSubjects' },
    { method: 'POST', path: '/api/admin/contact/subjects', handler: 'createSubject' },
    { method: 'DELETE', path: '/api/admin/contact/subjects/{id}', handler: 'deleteSubject' },
    { method: 'GET', path: '/api/admin/contact/messages', handler: 'getMessages' },
    { method: 'PUT', path: '/api/admin/contact/messages/{id}/status', handler: 'updateMessageStatus' },
    { method: 'DELETE', path: '/api/admin/contact/messages/{id}', handler: 'deleteMessage' },
  ],

  // ──────────────────────────────────────────────
  // DEMO - Public
  // ──────────────────────────────────────────────
  demoPublic: [
    { method: 'GET', path: '/api/public/demo/settings/boards', handler: 'getAllBoards' },
    { method: 'GET', path: '/api/public/demo/settings/grades', handler: 'getAllGrades' },
    { method: 'POST', path: '/api/public/demo/schedule/send-otp', handler: 'sendOtp' },
    { method: 'POST', path: '/api/public/demo/schedule', handler: 'submitScheduleDemo' },
  ],

  // DEMO - Admin
  demoAdmin: [
    { method: 'GET', path: '/api/admin/demo/settings/boards', handler: 'getAllBoards' },
    { method: 'POST', path: '/api/admin/demo/settings/boards', handler: 'createBoard' },
    { method: 'DELETE', path: '/api/admin/demo/settings/boards/{id}', handler: 'deleteBoard' },
    { method: 'GET', path: '/api/admin/demo/settings/grades', handler: 'getAllGrades' },
    { method: 'POST', path: '/api/admin/demo/settings/grades', handler: 'createGrade' },
    { method: 'DELETE', path: '/api/admin/demo/settings/grades/{id}', handler: 'deleteGrade' },
    { method: 'GET', path: '/api/admin/demo/schedule', handler: 'getSchedules' },
    { method: 'PUT', path: '/api/admin/demo/schedule/{id}/approve', handler: 'approveSchedule' },
    { method: 'PUT', path: '/api/admin/demo/schedule/{id}/cancel', handler: 'cancelSchedule' },
  ],

  // ──────────────────────────────────────────────
  // MEDIA / UPLOAD
  // ──────────────────────────────────────────────
  media: [
    { method: 'GET', path: '/api/media/signature', handler: 'getSignature' },
    { method: 'DELETE', path: '/api/media', handler: 'deleteMedia' },
  ],
};
module.exports = endpoints;