import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';
import { blogApi } from '../../api/blogApi';
import { Card, Input, TextArea, Button } from '../ui';
import { ContentEditor } from '../editor/ContentEditor';
import { PenTool, Mail, CheckCircle, ArrowRight, ArrowLeft, Save, Upload, X, Image as ImageIcon, Loader, RotateCcw } from 'lucide-react';
import { requestUserOTP, verifyUserOTP } from '../../api/authApi';
import { compressImage } from '../../utils/imageCompress';
import toast from 'react-hot-toast';

const DRAFT_KEY = 'blogpost_draft';

const emptyForm = {
    authorName: '', authorEmail: '', authorMobile: '',
    title: '', excerpt: '', content: '', tags: '', featuredImageUrl: '',
};

const TOTAL_STEPS = 4;

const stepLabels = {
    1: 'Write',
    2: 'Verify',
    3: 'Upload',
    4: 'Submit',
};

const getApiErrorMessage = (error, fallback) => {
    if (typeof error === 'object' && error !== null) {
        if ('response' in error) {
            const response = error.response;
            if (response?.data?.message) return response.data.message;
        }
        if ('message' in error && typeof error.message === 'string') {
            return error.message;
        }
    }
    if (error instanceof Error && error.message) {
        return error.message;
    }
    return fallback;
};

export const SubmitBlogPage = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(emptyForm);
    const [otp, setOtp] = useState('');
    const [draftSavedAt, setDraftSavedAt] = useState(null);
    const [hasDraft, setHasDraft] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [otpTimer, setOtpTimer] = useState(0);
    const autoSaveTimer = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        try {
            const saved = localStorage.getItem(DRAFT_KEY);
            if (saved) {
                const draft = JSON.parse(saved);
                if (draft.formData && (draft.formData.title || draft.formData.content || draft.formData.excerpt)) {
                    setHasDraft(true);
                    setDraftSavedAt(draft.savedAt ? new Date(draft.savedAt) : null);
                }
            }
        } catch { /* ignore corrupt data */ }
    }, []);

    useEffect(() => {
        let interval;
        if (otpTimer > 0) {
            interval = setInterval(() => {
                setOtpTimer((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [otpTimer]);

    useEffect(() => {
        if (step !== 1) return;
        autoSaveTimer.current = setInterval(() => {
            const hasContent = formData.title || formData.content || formData.excerpt;
            if (hasContent) {
                saveDraft(true);
            }
        }, 30000);
        return () => {
            if (autoSaveTimer.current) {
                clearInterval(autoSaveTimer.current);
            }
        };
    }, [step, formData]);

    const formatResendTimer = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const saveDraft = useCallback((silent = false) => {
        try {
            const draft = { formData, savedAt: new Date().toISOString() };
            localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
            setDraftSavedAt(new Date());
            setHasDraft(true);
            if (!silent) toast.success('Draft saved!');
        } catch {
            if (!silent) toast.error('Could not save draft');
        }
    }, [formData]);

    const restoreDraft = () => {
        try {
            const saved = localStorage.getItem(DRAFT_KEY);
            if (saved) {
                const draft = JSON.parse(saved);
                setFormData(draft.formData);
                setHasDraft(false);
                toast.success('Draft restored!');
            }
        } catch { toast.error('Could not restore draft'); }
    };

    const discardDraft = () => {
        localStorage.removeItem(DRAFT_KEY);
        setHasDraft(false);
        setDraftSavedAt(null);
        toast.success('Draft discarded');
    };

    const clearDraft = () => {
        localStorage.removeItem(DRAFT_KEY);
        setDraftSavedAt(null);
    };

    const sendOtp = async (isResend = false) => {
        try {
            const result = await requestUserOTP(formData.authorEmail, isResend);
            if (result.success === false) {
                toast.error(result.message || 'Failed to send OTP');
                return;
            }
            toast.success('OTP sent to your email!');
            setOtpTimer(300);
        } catch (err) {
            toast.error(getApiErrorMessage(err, 'Failed to send OTP'));
        }
    };

    const handleStep1 = async (e) => {
        e.preventDefault();

        if (!formData.authorName.trim()) {
            toast.error('Please enter your name.');
            return;
        }
        if (!formData.authorMobile || formData.authorMobile.length !== 10) {
            toast.error('Mobile number must be exactly 10 digits.');
            return;
        }
        if (!/^\d{10}$/.test(formData.authorMobile)) {
            toast.error('Please enter a valid 10-digit mobile number (digits only).');
            return;
        }
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.authorEmail)) {
            toast.error('Please enter a valid email address.');
            return;
        }
        if (!formData.title.trim()) {
            toast.error('Please enter a blog title.');
            return;
        }
        if (!formData.excerpt.trim()) {
            toast.error('Please enter an excerpt.');
            return;
        }
        if (!formData.content.trim()) {
            toast.error('Please write some content.');
            return;
        }

        setStep(2);
        await sendOtp(false);
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) {
            toast.error('Please enter a valid 6-digit OTP.');
            return;
        }
        setLoading(true);
        try {
            await verifyUserOTP({
                email: formData.authorEmail,
                otp,
                name: formData.authorName,
                mobile: formData.authorMobile,
            });
            toast.success('Email verified! You can now upload images.');
            setStep(3);
        } catch (err) {
            const msg = getApiErrorMessage(err, 'Verification failed');
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (otpTimer > 0) return;
        await sendOtp(true);
    };

    const handleImageStepNext = (e) => {
        e.preventDefault();
        setStep(4);
    };

    const handleFinalSubmit = async () => {
        setLoading(true);
        try {
            await blogApi.finishSubmission({
                ...formData,
                email: formData.authorEmail,
                contentHtml: formData.content,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                featuredImageUrl: formData.featuredImageUrl || '',
            });
            clearDraft();
            toast.success('Blog submitted!');
            setStep(5);
        } catch (err) {
            toast.error(getApiErrorMessage(err, 'Failed to finalize'));
        } finally {
            setLoading(false);
        }
    };

    const update = (field) => (e) => {
        let value = e.target.value;
        if (field === 'authorMobile') {
            value = value.replace(/\D/g, '').slice(0, 10);
        }
        setFormData({ ...formData, [field]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        processImageFile(file);
        e.target.value = '';
    };

    const processImageFile = async (file) => {
        if (!file.type.startsWith('image/')) {
            toast.error('Please select a valid image file (JPG, PNG, GIF, WebP)');
            return;
        }

        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > 5) {
            toast.error(`File size is ${fileSizeMB.toFixed(2)}MB. Maximum allowed is 5MB`);
            return;
        }

        setImageLoading(true);

        try {
            const { dataUrl, width, height } = await compressImage(file, { maxWidth: 1920, minWidth: 640, minHeight: 400 });

            setFormData(prev => ({ ...prev, featuredImageUrl: dataUrl }));
            setImagePreview(dataUrl);

            const compressedSize = Math.round((dataUrl.length * 3 / 4) / (1024 * 1024) * 100) / 100;
            toast.success(`Image ready! (${compressedSize}MB | ${width}x${height}px)`);
        } catch (err) {
            toast.error(err.message || 'Failed to process image');
        } finally {
            setImageLoading(false);
        }
    };

    const handleUrlChange = (url) => {
        setFormData(prev => ({ ...prev, featuredImageUrl: url }));
        if (url && url.trim()) {
            try {
                new URL(url);
                setImagePreview(url);
            } catch {
                setImagePreview(null);
            }
        } else {
            setImagePreview(null);
        }
    };

    const clearImage = () => {
        setFormData(prev => ({ ...prev, featuredImageUrl: '' }));
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        toast.success('Image removed');
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
            processImageFile(files[0]);
        }
    };

    const formatDraftTime = (date) => {
        if (!date) return '';
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="max-w-5xl mx-auto px-6 pt-14 pb-10 md:pt-16">
            <Link to="/blogs" className="inline-flex items-center gap-2 text-base font-medium text-[#4f6079] hover:text-text-primary transition-colors mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-text-primary mb-2">
                Submit Your Blog
            </h1>
            <p className="text-lg text-text-secondary mb-6">Share your knowledge with our community</p>

            <div className="flex items-center justify-center gap-0.5 sm:gap-5 mb-12 overflow-hidden px-0">
                {[1, 2, 3, 4].map((s) => (
                    <div key={s} className="flex items-center gap-px sm:gap-3 shrink-0">
                        <div className={`w-5 h-5 sm:w-11 sm:h-11 rounded-full flex items-center justify-center text-[9px] sm:text-[17px] font-bold transition-all ${step > s ? 'bg-[#19788f] text-white' : step === s ? 'bg-[#19788f] text-white' : 'bg-[#d9dde3] text-[#667085]'
                            }`}>{step > s ? '\u2713' : s}</div>
                        <span className={`text-[8px] sm:text-base font-semibold ${step >= s ? 'text-[#19788f]' : 'text-[#667085]'}`}>
                            {stepLabels[s]}
                        </span>
                        {s < TOTAL_STEPS && <div className={`w-1.5 sm:w-16 h-[2px] ${step > s ? 'bg-[#19788f]' : 'bg-[#c9ced6]'}`} />}
                    </div>
                ))}
            </div>

            {hasDraft && step === 1 && (
                <div className="mb-6 p-4 bg-bg-secondary border border-border-primary rounded-xl flex flex-wrap items-center justify-between gap-3 animate-fade-in">
                    <div className="flex items-center gap-2">
                        <RotateCcw className="w-5 h-5 text-text-secondary" />
                        <div>
                            <p className="text-sm font-medium text-text-primary">You have a saved draft</p>
                            {draftSavedAt && <p className="text-xs text-text-tertiary">Last saved at {formatDraftTime(draftSavedAt)}</p>}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={restoreDraft} className="btn-primary text-xs py-1.5 px-4">Restore Draft</button>
                        <button onClick={discardDraft} className="btn-secondary text-xs py-1.5 px-4">Discard</button>
                    </div>
                </div>
            )}

            {step === 1 && (
                <Card className="rounded-2xl border border-[#d7dce3] shadow-sm">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <PenTool className="w-5 h-5 text-text-secondary" />
                            <h2 className="text-xl font-bold text-text-primary">Write Your Blog</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            {draftSavedAt && (
                                <span className="text-xs text-text-tertiary hidden sm:inline">
                                    Saved {formatDraftTime(draftSavedAt)}
                                </span>
                            )}
                            <button type="button" onClick={() => saveDraft(false)}
                                className="flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary bg-bg-tertiary hover:bg-bg-hover px-3 py-1.5 rounded-lg transition-colors">
                                <Save size={14} /> Save Draft
                            </button>
                        </div>
                    </div>
                    <form onSubmit={handleStep1} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input label="Your Name *" placeholder="John Doe" value={formData.authorName} onChange={update('authorName')} required />
                            <Input label="Email *" type="email" placeholder="john@example.com" value={formData.authorEmail} onChange={update('authorEmail')} required />
                        </div>
                        <Input label="Mobile *" placeholder="9876543210" value={formData.authorMobile} onChange={update('authorMobile')} maxLength={10} required />
                        <div className="text-xs text-text-tertiary mt-1">Enter 10-digit phone number</div>
                        <Input label="Blog Title *" placeholder="An amazing title..." value={formData.title} onChange={update('title')} required />
                        <TextArea label="Excerpt *" placeholder="Brief summary (2-3 sentences)" rows={2} value={formData.excerpt} onChange={update('excerpt')} required />

                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-text-secondary">Content *</label>
                            <ContentEditor
                                initialContent={formData.content}
                                onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                            />
                        </div>

                        <Input label="Tags (comma separated)" placeholder="spring-boot, java, tutorial" value={formData.tags} onChange={update('tags')} />

                        <div className="rounded-xl bg-bg-secondary border border-border-primary p-4">
                            <div className="flex items-center gap-2 text-sm text-text-secondary">
                                <ImageIcon size={18} />
                                <span>Images can be uploaded after verification.</span>
                            </div>
                        </div>

                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? 'Sending OTP...' : 'Continue \u2014 Verify Email'} <ArrowRight className="w-4 h-4 inline ml-1" />
                        </Button>
                    </form>
                </Card>
            )}

            {step === 2 && (
                <Card className="text-center">
                    <Mail className="w-12 h-12 mx-auto text-text-tertiary mb-3" />
                    <h2 className="text-xl font-bold text-text-primary mb-1">Verify Your Email</h2>
                    <p className="text-text-secondary mb-2 text-sm">OTP sent to <strong>{formData.authorEmail}</strong></p>
                    <form onSubmit={handleOtpSubmit} className="max-w-xs mx-auto space-y-4">
                        <Input
                            placeholder="Enter 6-digit OTP"
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={otp}
                            onChange={(e) => {
                                const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                                setOtp(val);
                            }}
                            className="text-center text-xl tracking-widest"
                            maxLength={6}
                            required
                        />
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? 'Verifying...' : 'Verify & Continue'}
                        </Button>
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={otpTimer > 0}
                                className={`text-sm font-semibold transition-colors ${otpTimer > 0 ? 'text-gray-400 cursor-not-allowed' : 'text-[#19788f] hover:text-[#166b7f] underline'}`}
                            >
                                {otpTimer > 0 ? `Resend OTP in ${formatResendTimer(otpTimer)}` : 'Resend OTP'}
                            </button>
                        </div>
                        <button type="button" onClick={() => setStep(1)} className="w-full pt-2 text-sm text-text-tertiary hover:text-text-primary font-medium flex items-center justify-center gap-1 transition-colors">
                            <ArrowLeft className="w-4 h-4" /> Back to Writing
                        </button>
                    </form>
                </Card>
            )}

            {step === 3 && (
                <Card className="rounded-2xl border border-[#d7dce3] shadow-sm">
                    <form onSubmit={handleImageStepNext} className="space-y-4">
                        <div className="flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-text-secondary" />
                            <h2 className="text-xl font-bold text-text-primary">Featured Image (optional)</h2>
                        </div>
                        <p className="text-sm text-text-secondary">Upload one featured image or paste a URL.</p>

                        <div className="space-y-3">
                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="relative w-full rounded-lg overflow-hidden bg-bg-tertiary border-2 border-bg-hover">
                                    <img 
                                        src={imagePreview} 
                                        alt="Preview" 
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            toast.error('Invalid image URL');
                                        }}
                                    />
                                    <button
                                        type="button"
                                        onClick={clearImage}
                                        className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors shadow-lg"
                                        title="Remove image"
                                    >
                                        <X size={18} />
                                    </button>
                                    <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 text-white px-3 py-1 rounded text-xs">
                                        Image Ready
                                    </div>
                                </div>
                            )}

                            {/* Upload Area - Drag & Drop */}
                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${
                                    isDragOver 
                                        ? 'border-text-secondary bg-bg-secondary' 
                                        : 'border-border-primary bg-bg-primary hover:border-text-secondary'
                                }`}
                            >
                                <div className="flex flex-col items-center gap-2">
                                    <ImageIcon size={32} className="text-text-tertiary" />
                                    <div>
                                        <p className="text-sm font-medium text-text-primary">
                                            Drag & Drop Image Here
                                        </p>
                                        <p className="text-xs text-text-tertiary mt-1">
                                            or click below to choose
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Upload Options */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={imageLoading}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-text-secondary hover:bg-opacity-90 text-bg-primary border border-text-secondary rounded-lg transition-all font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {imageLoading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-bg-primary border-t-transparent rounded-full animate-spin"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <Upload size={16} />
                                            Choose from Device
                                        </>
                                    )}
                                </button>

                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    disabled={imageLoading}
                                />

                                <div className="px-4 py-3 bg-blue-50 border border-blue-200 rounded-lg flex flex-col justify-center text-blue-700 font-medium text-xs">
                                    <div className="flex items-center gap-1.5">
                                        <span className="font-bold">Requirements:</span>
                                    </div>
                                    <div className="text-xs mt-1.5 space-y-1">
                                        <p>\u2713 Min: 640x400px | Max: 4000x4000px</p>
                                        <p>\u2713 Size: Up to 5MB</p>
                                        <p>\u2713 Formats: JPG, PNG, GIF, WebP</p>
                                    </div>
                                </div>
                            </div>

                            {/* URL Input Option */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-text-secondary">Or paste image URL:</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    value={formData.featuredImageUrl?.startsWith('data:') ? '' : formData.featuredImageUrl || ''}
                                    onChange={(e) => handleUrlChange(e.target.value)}
                                    disabled={imageLoading}
                                    className="w-full px-4 py-2.5 text-sm border border-border-primary rounded-lg bg-bg-primary text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-text-secondary focus:border-transparent transition-all disabled:opacity-50"
                                />
                            </div>

                            <div className="bg-bg-secondary rounded-lg p-3 space-y-1">
                                <p className="text-xs font-medium text-text-primary">Supported Formats & Tips:</p>
                                <ul className="text-xs text-text-tertiary space-y-1 list-disc list-inside">
                                    <li>JPG, PNG, GIF, WebP</li>
                                    <li>Max size: 5MB</li>
                                    <li>Recommended: 1200x800px or larger</li>
                                    <li>Upload or paste URL - both work!</li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button type="button" onClick={() => setStep(2)} className="px-4 py-2 bg-bg-tertiary hover:bg-bg-hover text-text-secondary text-sm font-medium rounded-lg transition-colors border border-border-primary">
                                <ArrowLeft className="w-4 h-4 inline mr-1" /> Back
                            </button>
                            <Button type="submit" className="flex-1">
                                Continue to Submit <ArrowRight className="w-4 h-4 inline ml-1" />
                            </Button>
                        </div>
                    </form>
                </Card>
            )}

            {step === 4 && (
                <Card className="text-center">
                    <CheckCircle className="w-12 h-12 mx-auto text-emerald-500 mb-3" />
                    <h2 className="text-xl font-bold text-text-primary mb-1">Ready to Submit!</h2>
                    <p className="text-text-secondary mb-2 text-sm">
                        {imagePreview
                            ? 'Featured image attached.'
                            : 'No image \u2014 will be submitted without image.'}
                    </p>
                    <p className="text-text-secondary mb-6 text-sm">Click below to submit for admin review</p>
                    <Button
                        onClick={handleFinalSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Finalize Submission'}
                    </Button>
                    <button type="button" onClick={() => setStep(3)} className="w-full pt-3 text-sm text-text-tertiary hover:text-text-primary font-medium flex items-center justify-center gap-1 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back to Images
                    </button>
                </Card>
            )}

            {step === 5 && (
                <Card className="text-center">
                    <div className="text-5xl mb-3">🎉</div>
                    <h2 className="text-2xl font-bold text-text-primary mb-1">Blog Submitted!</h2>
                    <p className="text-text-secondary text-sm mb-6">Pending admin review. You'll get an email once approved.</p>
                    <Button variant="secondary" onClick={() => { setStep(1); setFormData(emptyForm); setImagePreview(null); setOtp(''); }}>
                        Submit Another
                    </Button>
                </Card>
            )}
        </div>
    );
};
