import { useState, useEffect, useCallback, useRef } from 'react';
import { blogApi } from '../../api/blogApi';
import { Card, Input, TextArea, Button } from '../ui';
import { ContentEditor } from '../editor/ContentEditor';
import { PenTool, Mail, CheckCircle, ArrowRight, Save, Trash2, RotateCcw, Upload, X, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import React from 'react';
const DRAFT_KEY = 'blogpost_draft';

const emptyForm = {
    authorName: '', authorEmail: '', authorMobile: '',
    title: '', excerpt: '', content: '', tags: '', featuredImageUrl: '',
};

export const SubmitBlogPage = () => {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(emptyForm);
    const [otp, setOtp] = useState('');
    const [hasDraft, setHasDraft] = useState(false);
    const [draftSavedAt, setDraftSavedAt] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [errors, setErrors] = useState({});
    const autoSaveTimer = useRef(null);
    const fileInputRef = useRef(null);

    // Form Validation Function
    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.authorName || formData.authorName.trim().length < 2) {
            newErrors.authorName = 'Name must be at least 2 characters';
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.authorEmail || !emailRegex.test(formData.authorEmail)) {
            newErrors.authorEmail = 'Please enter a valid email address';
        }

        // Mobile validation - only 10 digits
        const mobileRegex = /^[0-9]{10}$/;
        if (!formData.authorMobile || !mobileRegex.test(formData.authorMobile)) {
            newErrors.authorMobile = 'Mobile number must be exactly 10 digits';
        }

        // Title validation
        if (!formData.title || formData.title.trim().length < 5) {
            newErrors.title = 'Blog title must be at least 5 characters';
        }

        // Excerpt validation
        if (!formData.excerpt || formData.excerpt.trim().length < 10) {
            newErrors.excerpt = 'Excerpt must be at least 10 characters';
        }

        // Content validation
        if (!formData.content || formData.content.trim().length < 50) {
            newErrors.content = 'Blog content must be at least 50 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    
    // Check for saved draft on mount
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

    // Auto-save every 30 seconds when on step 1
    useEffect(() => {
        if (step !== 1) return;
        autoSaveTimer.current = setInterval(() => {
            const hasContent = formData.title || formData.content || formData.excerpt;
            if (hasContent) {
                saveDraft(true);
            }
        }, 30000);
        return () => clearInterval(autoSaveTimer.current);
    }, [step, formData]);

    // Sync image preview with form data
    useEffect(() => {
        if (formData.featuredImageUrl) {
            setImagePreview(formData.featuredImageUrl);
        } else {
            setImagePreview(null);
        }
    }, [formData.featuredImageUrl]);

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

    const handleStep1 = async (e) => {
        e.preventDefault();
        
        // Validate form before submission
        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setLoading(true);
        try {
            await blogApi.startSubmission({
                authorName: formData.authorName, authorEmail: formData.authorEmail, authorMobile: formData.authorMobile,
                title: formData.title, excerpt: formData.excerpt, contentHtml: formData.content,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                featuredImageUrl: formData.featuredImageUrl || null,
            });
            toast.success('OTP sent to your email!'); setStep(2);
        } catch (err) { toast.error(err.response?.data?.message || 'Submission failed'); }
        finally { setLoading(false); }
    };

    const handleStep2 = async (e) => {
        e.preventDefault(); setLoading(true);
        try {
            await blogApi.verifySubmission({ email: formData.authorEmail, otp });
            toast.success('Email verified!'); setStep(3);
        }
        catch (err) { toast.error(err.response?.data?.message || 'Invalid OTP'); }
        finally { setLoading(false); }
    };

    const handleStep3 = async () => {
        setLoading(true);
        try {
            await blogApi.finishSubmission({ email: formData.authorEmail });
            clearDraft(); // Clear draft on successful submission
            toast.success('Blog submitted!'); setStep(4);
        }
        catch (err) { toast.error(err.response?.data?.message || 'Failed to finalize'); }
        finally { setLoading(false); }
    };

    const update = (f) => (e) => setFormData({ ...formData, [f]: e.target.value });

    const handleMobileInput = (e) => {
        // Only allow digits, max 10
        let value = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
        setFormData({ ...formData, authorMobile: value });
        setErrors({...errors, authorMobile: ''});
    };

    const handleImageUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        processImageFile(file);

        // Reset file input for re-upload
        e.target.value = '';
    };

    const processImageFile = (file) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('❌ Please select a valid image file (JPG, PNG, GIF, WebP)');
            return;
        }

        // Validate file size (max 5MB)
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > 5) {
            toast.error(`❌ File size is ${fileSizeMB.toFixed(1)}MB. Max allowed is 5MB`);
            return;
        }

        setImageLoading(true);

        // Convert to base64/data URL
        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target?.result;
            if (typeof dataUrl === 'string') {
                setFormData(prev => ({ ...prev, featuredImageUrl: dataUrl }));
                setImagePreview(dataUrl);
                toast.success(`✅ Image uploaded! (${fileSizeMB.toFixed(1)}MB)`);
            }
            setImageLoading(false);
        };
        reader.onerror = () => {
            toast.error('❌ Failed to read image file');
            setImageLoading(false);
        };
        reader.readAsDataURL(file);
    };

    const handleUrlChange = (url) => {
        setFormData(prev => ({ ...prev, featuredImageUrl: url }));
        if (url && url.trim()) {
            // Validate URL format
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
            const file = files[0];
            processImageFile(file);
        }
    };

    const formatTime = (date) => {
        if (!date) return '';
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold text-text-primary mb-2">Submit Your Blog</h1>
            <p className="text-text-secondary mb-8">Share your knowledge. 3 simple steps.</p>

            {/* Draft restore banner */}
            {hasDraft && step === 1 && (
                <div className="mb-6 p-4 bg-bg-secondary border border-border-primary rounded-xl flex flex-wrap items-center justify-between gap-3 animate-fade-in">
                    <div className="flex items-center gap-2">
                        <RotateCcw className="w-5 h-5 text-text-secondary" />
                        <div>
                            <p className="text-sm font-medium text-text-primary">You have a saved draft</p>
                            {draftSavedAt && <p className="text-xs text-text-tertiary">Last saved at {formatTime(draftSavedAt)}</p>}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={restoreDraft} className="btn-primary text-xs py-1.5 px-4">Restore Draft</button>
                        <button onClick={discardDraft} className="btn-secondary text-xs py-1.5 px-4">Discard</button>
                    </div>
                </div>
            )}

            {/* Steps */}
            <div className="flex items-center justify-center gap-3 mb-10">
                {[1, 2, 3].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${step >= s ? 'bg-text-primary text-bg-primary' : 'bg-bg-tertiary text-text-tertiary'
                            }`}>{step > s ? '✓' : s}</div>
                        {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-text-primary' : 'bg-border-primary'}`} />}
                    </div>
                ))}
            </div>

            {step === 1 && (
                <Card>
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <PenTool className="w-5 h-5 text-text-secondary" />
                            <h2 className="text-xl font-bold text-text-primary">Write Your Blog</h2>
                        </div>
                        <div className="flex items-center gap-2">
                            {draftSavedAt && (
                                <span className="text-xs text-text-tertiary hidden sm:inline">
                                    Saved {formatTime(draftSavedAt)}
                                </span>
                            )}
                            <button type="button" onClick={() => saveDraft(false)}
                                className="flex items-center gap-1.5 text-xs font-medium text-text-secondary hover:text-text-primary bg-bg-tertiary hover:bg-bg-hover px-3 py-1.5 rounded-lg transition-colors"
                                title="Save as draft (auto-saves every 30s)">
                                <Save size={14} /> Save Draft
                            </button>
                        </div>
                    </div>
                    <form onSubmit={handleStep1} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <Input label="Your Name *" placeholder="John Doe" value={formData.authorName} onChange={(e) => { update('authorName')(e); setErrors({...errors, authorName: ''}) }} required />
                                {errors.authorName && <p className="text-red-500 text-xs mt-1">❌ {errors.authorName}</p>}
                            </div>
                            <div>
                                <Input label="Email *" type="email" placeholder="john@example.com" value={formData.authorEmail} onChange={(e) => { update('authorEmail')(e); setErrors({...errors, authorEmail: ''}) }} required />
                                {errors.authorEmail && <p className="text-red-500 text-xs mt-1">❌ {errors.authorEmail}</p>}
                            </div>
                        </div>
                        <div>
                            <Input label="Mobile * (10 digits)" placeholder="9876543210" value={formData.authorMobile} onChange={handleMobileInput} maxLength="10" inputMode="numeric" required />
                            {errors.authorMobile && <p className="text-red-500 text-xs mt-1">❌ {errors.authorMobile}</p>}
                            <p className="text-text-tertiary text-xs mt-1">Enter 10 digit mobile number</p>
                        </div>
                        <div>
                            <Input label="Blog Title *" placeholder="An amazing title..." value={formData.title} onChange={(e) => { update('title')(e); setErrors({...errors, title: ''}) }} required />
                            {errors.title && <p className="text-red-500 text-xs mt-1">❌ {errors.title}</p>}
                        </div>
                        <div>
                            <TextArea label="Excerpt *" placeholder="Brief summary (2-3 sentences)" rows={2} value={formData.excerpt} onChange={(e) => { update('excerpt')(e); setErrors({...errors, excerpt: ''}) }} required />
                            {errors.excerpt && <p className="text-red-500 text-xs mt-1">❌ {errors.excerpt}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-sm font-medium text-text-secondary">Content *</label>
                            <ContentEditor
                                initialContent={formData.content}
                                onChange={(html) => { setFormData(prev => ({ ...prev, content: html })); setErrors({...errors, content: ''}) }}
                            />
                            {errors.content && <p className="text-red-500 text-xs mt-1">❌ {errors.content}</p>}
                        </div>

                        <Input label="Tags (comma separated)" placeholder="spring-boot, java, tutorial" value={formData.tags} onChange={update('tags')} />
                        
                        {/* Featured Image Upload Section */}
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-text-secondary">Featured Image (optional)</label>
                            
                            {/* Image Preview */}
                            {imagePreview && (
                                <div className="relative w-full rounded-lg overflow-hidden bg-bg-tertiary border-2 border-bg-hover">
                                    <img 
                                        src={imagePreview} 
                                        alt="Preview" 
                                        className="w-full h-48 object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            toast.error('❌ Invalid image URL');
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
                                        ✅ Image Ready
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
                                {/* File Upload Button */}
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
                                
                                {/* Hidden File Input */}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="hidden"
                                    aria-label="Upload featured image"
                                    disabled={imageLoading}
                                />
                                
                                {/* Gallery Info */}
                                <div className="px-4 py-3 bg-bg-secondary border border-border-primary rounded-lg flex items-center justify-center text-text-tertiary font-medium text-sm">
                                    <ImageIcon size={16} className="mr-2" />
                                    Gallery Ready
                                </div>
                            </div>

                            {/* URL Input Option */}
                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-text-secondary">Or paste image URL:</label>
                                <input
                                    type="url"
                                    placeholder="https://example.com/image.jpg"
                                    value={formData.featuredImageUrl.startsWith('data:') ? '' : formData.featuredImageUrl}
                                    onChange={(e) => handleUrlChange(e.target.value)}
                                    disabled={imageLoading}
                                    className="w-full px-4 py-2.5 text-sm border border-border-primary rounded-lg bg-bg-primary text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-text-secondary focus:border-transparent transition-all disabled:opacity-50"
                                />
                            </div>

                            <div className="bg-bg-secondary rounded-lg p-3 space-y-1">
                                <p className="text-xs font-medium text-text-primary">✨ Supported Formats & Tips:</p>
                                <ul className="text-xs text-text-tertiary space-y-1 list-disc list-inside">
                                    <li>JPG, PNG, GIF, WebP</li>
                                    <li>Max size: 5MB</li>
                                    <li>Recommended: 1200x800px or larger</li>
                                    <li>Upload or paste URL - both work!</li>
                                </ul>
                            </div>
                        </div>
                        
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? 'Sending OTP...' : 'Submit & Verify Email'} <ArrowRight className="w-4 h-4 inline ml-1" />
                        </Button>
                    </form>
                </Card>
            )}

            {step === 2 && (
                <Card className="text-center">
                    <Mail className="w-12 h-12 mx-auto text-text-tertiary mb-3" />
                    <h2 className="text-xl font-bold text-text-primary mb-1">Verify Your Email</h2>
                    <p className="text-text-secondary mb-6 text-sm">OTP sent to <strong>{formData.authorEmail}</strong></p>
                    <form onSubmit={handleStep2} className="max-w-xs mx-auto space-y-4">
                        <Input placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)}
                            className="text-center text-xl tracking-widest" maxLength={6} required />
                        <Button type="submit" disabled={loading} className="w-full">{loading ? 'Verifying...' : 'Verify OTP'}</Button>
                    </form>
                </Card>
            )}

            {step === 3 && (
                <Card className="text-center">
                    <CheckCircle className="w-12 h-12 mx-auto text-emerald-500 mb-3" />
                    <h2 className="text-xl font-bold text-text-primary mb-1">Email Verified!</h2>
                    <p className="text-text-secondary mb-6 text-sm">Click below to submit for admin review</p>
                    <Button onClick={handleStep3} disabled={loading}>{loading ? 'Submitting...' : 'Finalize Submission'}</Button>
                </Card>
            )}

            {step === 4 && (
                <Card className="text-center">
                    <div className="text-5xl mb-3">🎉</div>
                    <h2 className="text-2xl font-bold text-text-primary mb-1">Blog Submitted!</h2>
                    <p className="text-text-secondary text-sm mb-6">Pending admin review. You'll get an email once approved.</p>
                    <Button variant="secondary" onClick={() => { setStep(1); setFormData(emptyForm); }}>
                        Submit Another
                    </Button>
                </Card>
            )}
        </div>
    );
};
