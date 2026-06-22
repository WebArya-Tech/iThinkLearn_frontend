import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, Check, Clock, AlertCircle } from 'lucide-react';
import { demoApi } from '../api/demoApi';
import toast from 'react-hot-toast';

const OTP_DURATION_SEC = 300;

export default function ScheduleFreeDemoModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    grade: '',
    board: '',
    email: '',
    phoneNumber: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [grades, setGrades] = useState([]);
  const [boards, setBoards] = useState([]);
  const [step, setStep] = useState('form');
  const [otp, setOtp] = useState('');
  const [otpTimer, setOtpTimer] = useState(OTP_DURATION_SEC);
  const [otpLoading, setOtpLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loadingGrades, setLoadingGrades] = useState(true);
  const [loadingBoards, setLoadingBoards] = useState(true);
  const [consent, setConsent] = useState(false);
  const timerRef = useRef(null);

  const resetForm = useCallback(() => {
    setFormData({
      studentName: '',
      parentName: '',
      grade: '',
      board: '',
      email: '',
      phoneNumber: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    });
    setErrors({});
    setStep('form');
    setOtp('');
    setOtpTimer(OTP_DURATION_SEC);
    setIsSubmitted(false);
    setConsent(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    resetForm();

    const projectGrades = ['1-5', '6-8', '9-10', '11-12', 'Undergraduate', 'Post-Graduate', 'Other'];
    const projectBoards = ['IGCSE', 'IB', 'Cambridge', 'CBSE', 'ICSE', 'Others'];
    const fallbackGrades = projectGrades.map((name, i) => ({ id: `g${i}`, name, displayName: name }));
    const fallbackBoards = projectBoards.map((name, i) => ({ id: `b${i}`, name, displayName: name }));

    setGrades(fallbackGrades);
    setBoards(fallbackBoards);

    const loadSettings = async () => {
      try {
        const [gradesResult, boardsResult] = await Promise.allSettled([
          demoApi.getGrades(),
          demoApi.getBoards()
        ]);
        const extractItems = (value, fallback) => {
          if (Array.isArray(value)) return value;
          if (value && typeof value === 'object' && 'data' in value) {
            const d = value.data;
            if (Array.isArray(d)) return d;
          }
          return fallback;
        };
        const gradesData = (gradesResult.status === 'fulfilled' ? extractItems(gradesResult.value, fallbackGrades) : fallbackGrades)
          .map(g => ({ ...g, displayName: g.displayName || g.name }));
        const boardsData = (boardsResult.status === 'fulfilled' ? extractItems(boardsResult.value, fallbackBoards) : fallbackBoards)
          .map(b => ({ ...b, displayName: b.displayName || b.name }));
        setGrades(gradesData);
        setBoards(boardsData);
      } catch (_) {
      } finally {
        setLoadingGrades(false);
        setLoadingBoards(false);
      }
    };
    loadSettings();
  }, [isOpen, resetForm]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case 'studentName':
        return value.trim() ? '' : 'Student name is required';
      case 'parentName':
        return value.trim() ? '' : 'Parent name is required';
      case 'grade':
        return value ? '' : 'Please select a grade';
      case 'board':
        return value ? '' : 'Please select a board';
      case 'email':
        if (!value.trim()) return 'Email is required';
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ? '' : 'Please enter a valid email address';
      case 'phoneNumber':
        if (!value.trim()) return 'Phone number is required';
        if (!/^\d{10}$/.test(value)) return 'Please enter a valid 10-digit phone number';
        return '';
      case 'preferredDate':
        return value ? '' : 'Please select a preferred date';
      case 'preferredTime':
        return value ? '' : 'Please select a preferred time';
      default:
        return '';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
    if (name === 'phoneNumber') {
      newValue = value.replace(/\D/g, '').slice(0, 10);
    }
    setFormData(prev => ({ ...prev, [name]: newValue }));
    const err = validateField(name, newValue);
    setErrors(prev => ({ ...prev, [name]: err }));
    if ((name === 'email' || name === 'phoneNumber') && step === 'otp') {
      setStep('form');
      setOtp('');
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const validateForm = () => {
    const fieldErrors = {};
    const fields = ['studentName', 'parentName', 'grade', 'board', 'email', 'phoneNumber', 'preferredDate', 'preferredTime'];
    fields.forEach(f => {
      const err = validateField(f, formData[f]);
      if (err) fieldErrors[f] = err;
    });
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validateForm()) {
      toast.error('Please fill all required fields correctly');
      return;
    }

    setOtpTimer(OTP_DURATION_SEC);
    setOtpLoading(true);

    try {
      await demoApi.sendDemoOtp(formData.email);
      setStep('otp');
      toast.success('OTP sent successfully! Please check your email.');
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setOtpTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to send OTP. Please try again.';
      toast.error(errorMsg);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = () => {
    if (!otp || otp.length !== 6) {
      toast.error('Please enter the 6-digit OTP');
      return;
    }
    if (otpTimer === 0) {
      toast.error('OTP has expired. Please request a new one.');
      return;
    }
    toast.success('OTP verified successfully!');
    setStep('consent');
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleResendOtp = async () => {
    setOtp('');
    setOtpTimer(OTP_DURATION_SEC);
    if (timerRef.current) clearInterval(timerRef.current);
    setOtpLoading(true);
    try {
      await demoApi.sendDemoOtp(formData.email);
      toast.success('OTP resent successfully! Please check your email.');
      timerRef.current = setInterval(() => {
        setOtpTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to resend OTP');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (step !== 'consent') return;
    if (!consent) {
      toast.error('Please agree to be contacted');
      return;
    }

    setSubmitLoading(true);

    try {
      const demoRequest = {
        studentName: formData.studentName,
        parentName: formData.parentName,
        gradeId: String(formData.grade),
        boardId: String(formData.board),
        emailId: formData.email,
        mobileNumber: formData.phoneNumber,
        phoneNumber: formData.phoneNumber,
        preferredDate: formData.preferredDate,
        preferredTime: formData.preferredTime,
        message: formData.message,
        otp: otp,
        scheduledAt: `${formData.preferredDate}T${formData.preferredTime}:00`
      };

      await demoApi.scheduleDemo(demoRequest);

      // Save to localStorage as fallback
      try {
        const gradeName = grades.find(g => g.id === formData.grade)?.displayName || formData.grade;
        const boardName = boards.find(b => b.id === formData.board)?.displayName || formData.board;
        const existing = JSON.parse(localStorage.getItem('runningClassDemoRequests') || '[]');
        existing.push({
          id: `DEMO${String(Date.now()).slice(-6)}`,
          studentName: formData.studentName,
          parentName: formData.parentName,
          grade: gradeName,
          board: boardName,
          email: formData.email,
          phone: formData.phoneNumber,
          preferredDate: formData.preferredDate,
          preferredTime: formData.preferredTime,
          message: formData.message,
          requestedOn: new Date().toISOString(),
          status: 'Pending'
        });
        localStorage.setItem('runningClassDemoRequests', JSON.stringify(existing));
        window.dispatchEvent(new Event('demoRequestUpdated'));
      } catch (_) {}

      toast.success('Demo scheduled successfully!');
      setIsSubmitted(true);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Failed to schedule demo. Please try again.';
      toast.error(errorMsg);
    } finally {
      setSubmitLoading(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEditDetails = () => {
    setStep('form');
    setOtp('');
    if (timerRef.current) clearInterval(timerRef.current);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-blue-900/60 backdrop-blur-sm p-2 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-auto max-h-[90vh] overflow-y-auto relative">
        {isSubmitted && (
          <div className="absolute inset-0 bg-white rounded-2xl flex items-center justify-center z-10">
            <div className="text-center px-6 py-8 max-w-[260px] w-full">
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-7 h-7 text-green-600" strokeWidth={3} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-sm text-gray-500 mb-6 leading-relaxed">
                Your demo has been scheduled successfully. Our team will contact you shortly.
              </p>
              <button
                type="button"
                onClick={() => { resetForm(); onClose(); }}
                className="px-6 py-2.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-800 transition-all active:scale-95"
              >
                Close
              </button>
            </div>
          </div>
        )}

        <div className="p-4 sm:p-6 md:p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Schedule Your Free Demo</h3>
              <p className="text-sm text-gray-500 mt-1">Experience our teaching methodology</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl font-bold leading-none transition p-1">
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Student Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Student Name *</label>
              <input type="text" name="studentName" value={formData.studentName} onChange={handleInputChange} disabled={step === 'consent'}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.studentName ? 'border-red-400 bg-red-50' : 'border-gray-300'} ${step === 'consent' ? 'bg-gray-100' : ''}`}
                placeholder="Enter student's full name" />
              {errors.studentName && <p className="text-xs text-red-500 mt-1">{errors.studentName}</p>}
            </div>

            {/* Parent Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parent Name *</label>
              <input type="text" name="parentName" value={formData.parentName} onChange={handleInputChange} disabled={step === 'consent'}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.parentName ? 'border-red-400 bg-red-50' : 'border-gray-300'} ${step === 'consent' ? 'bg-gray-100' : ''}`}
                placeholder="Enter parent's full name" />
              {errors.parentName && <p className="text-xs text-red-500 mt-1">{errors.parentName}</p>}
            </div>

            {/* Grade & Board row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grade *</label>
                <select name="grade" value={formData.grade} onChange={handleInputChange} disabled={loadingGrades || step === 'consent'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-100 ${errors.grade ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}>
                  <option value="">{loadingGrades ? 'Loading...' : 'Select Grade'}</option>
                  {grades.map(g => <option key={g.id} value={g.id}>{g.displayName || g.name}</option>)}
                </select>
                {errors.grade && <p className="text-xs text-red-500 mt-1">{errors.grade}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Board *</label>
                <select name="board" value={formData.board} onChange={handleInputChange} disabled={loadingBoards || step === 'consent'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors disabled:bg-gray-100 ${errors.board ? 'border-red-400 bg-red-50' : 'border-gray-300'}`}>
                  <option value="">{loadingBoards ? 'Loading...' : 'Select Board'}</option>
                  {boards.map(b => <option key={b.id} value={b.id}>{b.displayName || b.name}</option>)}
                </select>
                {errors.board && <p className="text-xs text-red-500 mt-1">{errors.board}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email ID *</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} disabled={step === 'consent'}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-300'} ${step === 'consent' ? 'bg-gray-100' : ''}`}
                placeholder="student@email.com" />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} maxLength={10} disabled={step === 'consent'}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.phoneNumber ? 'border-red-400 bg-red-50' : 'border-gray-300'} ${step === 'consent' ? 'bg-gray-100' : ''}`}
                placeholder="Enter 10-digit phone number" />
              {errors.phoneNumber && <p className="text-xs text-red-500 mt-1">{errors.phoneNumber}</p>}
            </div>

            {/* Date & Time row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date *</label>
                <input type="date" name="preferredDate" value={formData.preferredDate} onChange={handleInputChange} disabled={step === 'consent'}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.preferredDate ? 'border-red-400 bg-red-50' : 'border-gray-300'} ${step === 'consent' ? 'bg-gray-100' : ''}`} />
                {errors.preferredDate && <p className="text-xs text-red-500 mt-1">{errors.preferredDate}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time Slot *</label>
                <input type="time" name="preferredTime" value={formData.preferredTime} onChange={handleInputChange} disabled={step === 'consent'}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${errors.preferredTime ? 'border-red-400 bg-red-50' : 'border-gray-300'} ${step === 'consent' ? 'bg-gray-100' : ''}`} />
                {errors.preferredTime && <p className="text-xs text-red-500 mt-1">{errors.preferredTime}</p>}
              </div>
            </div>

            {/* Message (Optional) */}
            {step !== 'consent' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message <span className="text-gray-400">(Optional)</span></label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Write your message here" />
              </div>
            )}

            {/* ===== STEP: Send OTP Button (form step) ===== */}
            {step === 'form' && (
              <button type="button" onClick={handleSendOtp} disabled={otpLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-lg font-bold text-sm hover:from-blue-700 hover:to-blue-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg">
                {otpLoading ? (
                  <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div><span>Sending OTP...</span></>
                ) : (
                  <><Send className="h-4 w-4" /><span>Send OTP</span></>
                )}
              </button>
            )}

            {/* ===== STEP: OTP Verification (otp step) ===== */}
            {step === 'otp' && (
              <div className="bg-blue-50 p-4 sm:p-5 rounded-xl border border-blue-200 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-blue-800">OTP Verification</p>
                    <p className="text-xs text-blue-600 mt-0.5">A 6-digit OTP has been sent to <strong>{formData.email}</strong></p>
                  </div>
                  <button type="button" onClick={handleEditDetails}
                    className="text-xs text-blue-600 hover:underline whitespace-nowrap">
                    Edit Details
                  </button>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-600 shrink-0" />
                  <p className="text-xs text-yellow-700">This OTP is valid for only 5 minutes.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-blue-800 mb-1.5">Enter 6-Digit OTP *</label>
                  <input type="text" value={otp} onChange={(e) => { const v = e.target.value.replace(/\D/g, ''); if (v.length <= 6) setOtp(v); }}
                    maxLength={6} inputMode="numeric"
                    className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-xl tracking-[0.5em] font-bold bg-white"
                    placeholder="000000" />
                </div>

                {/* Timer & Resend */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-blue-600" />
                    {otpTimer > 0 ? (
                      <span className="text-blue-700 font-medium">{formatTime(otpTimer)}</span>
                    ) : (
                      <span className="text-red-600 font-medium">OTP Expired</span>
                    )}
                  </div>
                  <button type="button" onClick={handleResendOtp} disabled={otpLoading}
                    className="text-sm text-blue-700 font-semibold hover:underline disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1">
                    <Send className="w-3 h-3" /> Resend OTP
                  </button>
                </div>

                {/* Expired message */}
                {otpTimer === 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <p className="text-xs text-red-600">OTP has expired. Please click "Resend OTP" to get a new code.</p>
                  </div>
                )}

                <button type="button" onClick={handleVerifyOtp} disabled={!otp || otp.length !== 6 || otpTimer === 0}
                  className="w-full bg-blue-600 text-white py-3.5 rounded-lg font-bold text-sm hover:bg-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md">
                  <Check className="h-4 w-4" /><span>Verify OTP</span>
                </button>
              </div>
            )}

            {/* ===== STEP: Consent + Submit (consent step) ===== */}
            {step === 'consent' && (
              <div className="space-y-4 pt-2 border-t border-gray-200">
                <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-600 shrink-0" />
                  <p className="text-sm text-green-700 font-medium">OTP Verified Successfully</p>
                </div>

                <div className="flex items-start gap-3">
                  <input type="checkbox" id="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                  <label htmlFor="consent" className="text-sm text-gray-600 leading-relaxed">
                    I agree to be contacted via phone, WhatsApp, and email for demo scheduling and course information. *
                  </label>
                </div>

                <button type="submit" disabled={submitLoading || !consent}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 rounded-lg font-bold text-sm hover:from-blue-700 hover:to-blue-900 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg uppercase tracking-wider">
                  {submitLoading ? (
                    <><div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div><span>Submitting...</span></>
                  ) : (
                    <><Send className="h-4 w-4" /><span>Schedule Demo</span></>
                  )}
                </button>
              </div>
            )}
          </form>

          <div className="mt-5 text-center">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>100% secure & spam-free</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
