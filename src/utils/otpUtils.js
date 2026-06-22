import { generateOtp } from '../context/AuthContext'
import toast from 'react-hot-toast'

const OFFICIAL_EMAIL = import.meta.env.VITE_OFFICIAL_EMAIL || 'ithinklearn@ixpoe.com'

/**
 * Sends an OTP email from the official iThinkLearn email address.
 * In production, replace with real email API call.
 */
export const sendOtpEmail = (email) => {
  const otp = generateOtp(email)

  console.log(`[OTP] From: ${OFFICIAL_EMAIL} → To: ${email} | OTP: ${otp} (valid 5 minutes)`)

  toast.success(
    `OTP sent to ${email}\nYour OTP: ${otp}\nValid for 5 minutes only`,
    { duration: 8000 }
  )

  return otp
}
