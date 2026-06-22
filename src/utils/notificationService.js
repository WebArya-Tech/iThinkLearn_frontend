/**
 * Notification Service for Demo Requests
 * Handles email and WhatsApp notifications for demo scheduling
 */

export const OFFICIAL_EMAIL = 'ithinklearn@ixpoe.com'
export const OFFICIAL_WHATSAPP = '918197466607'

/**
 * Format demo request details for email template
 */
export const formatDemoEmailContent = (demoRequest) => {
  return `
Demo Request Confirmation

Dear ${demoRequest.studentName},

Thank you for scheduling a free demo class with iThinkLearn! We're excited to help you on your learning journey.

DEMO DETAILS
─────────────────────────────────
Demo Number: ${demoRequest.demoNumber}
Date: ${demoRequest.preferredDate}
Time: ${demoRequest.preferredTime}
Grade: ${demoRequest.grade}
Board: ${demoRequest.board}
─────────────────────────────────

STUDENT INFORMATION
─────────────────────────────────
Name: ${demoRequest.studentName}
Parent/Guardian: ${demoRequest.parentName}
Email: ${demoRequest.email}
Phone: ${demoRequest.phone}
─────────────────────────────────

${demoRequest.message ? `MESSAGE\n${demoRequest.message}\n` : ''}

What happens next?
• Our team will contact you 24 hours before the scheduled demo
• You'll receive a meeting link via email
• Our expert tutors will provide personalized guidance

If you need to reschedule, please reply to this email or contact us at:
📧 ithinklearn@ixpoe.com
📱 +91 8197 466 607 (WhatsApp)
📞 +91 779 501 0900 (Call)

Best regards,
iThinkLearn Team
`
}

/**
 * Format demo request details for WhatsApp message
 */
export const formatDemoWhatsAppMessage = (demoRequest) => {
  return `Hi ${demoRequest.studentName}, your demo request has been received!

📅 Demo Scheduled for: ${demoRequest.preferredDate}
⏰ Time: ${demoRequest.preferredTime}
📚 Grade: ${demoRequest.grade}
🎓 Board: ${demoRequest.board}

Reference: ${demoRequest.demoNumber}

We'll send you a meeting link soon. For queries, contact us!`
}

/**
 * Format admin notification for new demo request
 */
export const formatAdminNotification = (demoRequest) => {
  return {
    subject: `New Demo Request: ${demoRequest.demoNumber}`,
    body: `
New Demo Request Received

Demo Number: ${demoRequest.demoNumber}
Student Name: ${demoRequest.studentName}
Parent Name: ${demoRequest.parentName}
Email: ${demoRequest.email}
Phone: ${demoRequest.phone}
Grade: ${demoRequest.grade}
Board: ${demoRequest.board}
Preferred Date: ${demoRequest.preferredDate}
Preferred Time: ${demoRequest.preferredTime}
Message: ${demoRequest.message || 'None'}
Request Date: ${new Date(demoRequest.requestDate).toLocaleString()}

Status: Pending
Action Required: Contact the student within 24 hours
    `
  }
}

/**
 * Send email notification
 * Should be called via backend API
 */
export const sendEmailNotification = async (emailData) => {
  try {
    // This will be handled by backend API
    const response = await fetch('/api/demo-requests/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData)
    })
    return await response.json()
  } catch (error) {
    console.error('Error sending email:', error)
    throw error
  }
}

/**
 * Send WhatsApp notification
 * Should be called via backend API
 */
export const sendWhatsAppNotification = async (whatsappData) => {
  try {
    // This will be handled by backend API
    const response = await fetch('/api/demo-requests/send-whatsapp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(whatsappData)
    })
    return await response.json()
  } catch (error) {
    console.error('Error sending WhatsApp:', error)
    throw error
  }
}

/**
 * Get queued notifications from localStorage
 */
export const getQueuedNotifications = () => {
  const queued = JSON.parse(localStorage.getItem('demoRequestNotifications') || '[]')
  return queued
}

/**
 * Clear sent notifications from queue
 */
export const clearQueuedNotification = (demoId) => {
  const queued = JSON.parse(localStorage.getItem('demoRequestNotifications') || '[]')
  const updated = queued.filter(n => n.id !== demoId)
  localStorage.setItem('demoRequestNotifications', JSON.stringify(updated))
}

/**
 * Process queued notifications when backend becomes available
 */
export const processPendingNotifications = async () => {
  const queued = getQueuedNotifications()
  
  for (const notification of queued) {
    try {
      // Try to send email
      if (notification.emailStatus === 'pending') {
        await sendEmailNotification({
          to: notification.officialEmail,
          studentEmail: notification.email,
          demoRequest: notification
        })
        notification.emailStatus = 'sent'
      }
      
      // Try to send WhatsApp
      if (notification.whatsappStatus === 'pending') {
        await sendWhatsAppNotification({
          phone: notification.officialWhatsApp,
          studentPhone: notification.phone,
          demoRequest: notification
        })
        notification.whatsappStatus = 'sent'
      }
      
      // If both sent, remove from queue
      if (notification.emailStatus === 'sent' && notification.whatsappStatus === 'sent') {
        clearQueuedNotification(notification.id)
      }
    } catch (error) {
      console.error(`Error processing notification for ${notification.id}:`, error)
    }
  }
}
