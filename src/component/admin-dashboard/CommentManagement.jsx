import React, { useState, useEffect, useCallback } from 'react';
import { blogApi, adminApi } from '../../api/blogApi';
import {
    MessageSquare, Trash2, Eye,
    AlertTriangle, RefreshCw, Search, ArrowLeft, FileText, X, CheckCircle, ThumbsDown, List
} from 'lucide-react';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

const hasHtml = (str) => /<[a-z][\s\S]*>/i.test(str);

const formatContent = (html, text) => {
    const raw = html || text || '';
    if (!raw) return '<p class="text-gray-400 italic">No content available</p>';
    if (hasHtml(raw)) return raw;
    return raw.split('\n').map(line => line.trim() ? `<p>${line}</p>` : '<br/>').join('\n');
};

const formatDate = (d) => {
    if (!d) return 'N/A';
    try {
        const date = new Date(d);
        return isNaN(date.getTime()) ? 'N/A' : format(date, 'MMM dd, yyyy / hh:mm a');
    } catch { return 'N/A'; }
};

const StatusBadge = ({ status }) => {
    const map = {
        PENDING: 'bg-yellow-100 text-yellow-800',
        VISIBLE: 'bg-green-100 text-green-800',
        HIDDEN: 'bg-gray-100 text-gray-500',
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${map[status] || map.PENDING}`}>
            {status || 'PENDING'}
        </span>
    );
};

const BlogStatusDot = ({ status }) => {
    const colors = { PUBLISHED: 'bg-green-400', PENDING: 'bg-yellow-400', REJECTED: 'bg-red-400', DRAFT: 'bg-gray-400' };
    return <span className={`inline-block w-2 h-2 rounded-full shrink-0 ${colors[status] || 'bg-gray-300'}`} />;
};

export const CommentManagement = ({ onBack }) => {
    const [currentView, setCurrentView] = useState('comments');

    const [allComments, setAllComments] = useState([]);
    const [allCommentsLoading, setAllCommentsLoading] = useState(true);
    const [allCommentsPage, setAllCommentsPage] = useState(0);
    const [allCommentsPagination, setAllCommentsPagination] = useState({ totalPages: 0, totalElements: 0 });
    const [statusFilter, setStatusFilter] = useState('ALL');
    const [commentSearch, setCommentSearch] = useState('');
    const [blogMap, setBlogMap] = useState({});
    const ALL_COMMENTS_PAGE_SIZE = 20;

    const [blogs, setBlogs] = useState([]);
    const [blogsLoading, setBlogsLoading] = useState(true);
    const [blogSearch, setBlogSearch] = useState('');
    const [blogPage, setBlogPage] = useState(0);
    const [blogPagination, setBlogPagination] = useState({ totalPages: 0, totalElements: 0 });
    const BLOG_PAGE_SIZE = 15;

    const [selectedBlog, setSelectedBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [commentPage, setCommentPage] = useState(0);
    const [commentPagination, setCommentPagination] = useState({ totalPages: 0, totalElements: 0 });
    const COMMENT_PAGE_SIZE = 20;

    const [actionLoading, setActionLoading] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);
    const [deleteBlogConfirm, setDeleteBlogConfirm] = useState(null);
    const [viewComment, setViewComment] = useState(null);
    const [viewBlogModal, setViewBlogModal] = useState(null);

    // ── Data fetching ───────────────────────────────────────
    const fetchBlogMap = useCallback(async () => {
        try {
            const r = await adminApi.getAdminBlogs({ page: 0, size: 100 });
            const map = {};
            (r?.content || []).forEach(b => { map[b.id] = b.title; });
            setBlogMap(map);
        } catch {
            // silent
        }
    }, []);

    const fetchAllComments = useCallback(async (page = 0) => {
        setAllCommentsLoading(true);
        try {
            const params = { page, size: ALL_COMMENTS_PAGE_SIZE };
            if (statusFilter !== 'ALL') params.status = statusFilter;
            const r = await adminApi.getAllComments(params);
            setAllComments(r?.content || []);
            setAllCommentsPage(r?.page ?? page);
            setAllCommentsPagination({
                totalPages: r?.totalPages || 0,
                totalElements: r?.totalElements || 0,
            });
        } catch {
            toast.error('Failed to load comments');
            setAllComments([]);
        } finally {
            setAllCommentsLoading(false);
        }
    }, [statusFilter]);

    const fetchBlogs = useCallback(async (page = 0) => {
        setBlogsLoading(true);
        try {
            const r = await adminApi.getAdminBlogs({ page, size: BLOG_PAGE_SIZE });
            setBlogs(r?.content || []);
            setBlogPage(r?.page ?? page);
            setBlogPagination({
                totalPages: r?.totalPages || 0,
                totalElements: r?.totalElements || 0,
            });
        } catch {
            toast.error('Failed to load blogs');
            setBlogs([]);
        } finally {
            setBlogsLoading(false);
        }
    }, []);

    const fetchComments = useCallback(async (blogId, page = 0) => {
        setCommentsLoading(true);
        try {
            const r = blogId === 'pending'
                ? await adminApi.getPendingComments({ page, size: COMMENT_PAGE_SIZE })
                : await blogApi.getComments(blogId, { page, size: COMMENT_PAGE_SIZE });
            setComments(r?.content || []);
            setCommentPage(r?.page ?? page);
            setCommentPagination({
                totalPages: r?.totalPages || 0,
                totalElements: r?.totalElements || 0,
            });
        } catch {
            toast.error('Failed to load comments');
            setComments([]);
        } finally {
            setCommentsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlogMap();
        fetchAllComments(0);
    }, [fetchBlogMap, fetchAllComments]);

    useEffect(() => { fetchAllComments(0); }, [statusFilter]);

    // ── View switching ──────────────────────────────────────
    const openBlogComments = (blog) => {
        setSelectedBlog(blog);
        setCurrentView('blog-comments');
        setComments([]);
        setCommentPage(0);
        fetchComments(blog.id, 0);
    };

    const closeBlogComments = () => {
        setSelectedBlog(null);
        setComments([]);
        setCurrentView('comments');
    };

    const setFilter = (filter) => {
        setStatusFilter(filter);
        setAllCommentsPage(0);
    };

    // ── Comment action handlers ─────────────────────────────
    const updateCommentStatus = async (comment, newStatus, successMsg, errorMsg) => {
        setActionLoading(comment.id);
        try {
            if (newStatus === 'VISIBLE' && comment.status === 'PENDING') {
                await adminApi.approveComment(comment.id);
            } else {
                await adminApi.editComment(comment.id, { status: newStatus, commentText: comment.commentText });
            }
            toast.success(successMsg);
            if (currentView === 'blog-comments') {
                if (selectedBlog?.id === 'pending') {
                    setComments(prev => prev.filter(c => c.id !== comment.id));
                } else {
                    setComments(prev => prev.map(c => c.id === comment.id ? { ...c, status: newStatus } : c));
                }
            } else {
                if (statusFilter !== 'ALL') {
                    setAllComments(prev => prev.filter(c => c.id !== comment.id));
                } else {
                    setAllComments(prev => prev.map(c => c.id === comment.id ? { ...c, status: newStatus } : c));
                }
            }
        } catch (err) {
            toast.error(err.response?.data?.message || errorMsg);
        } finally {
            setActionLoading(null);
        }
    };

    const handleApprove = (comment) => updateCommentStatus(comment, 'VISIBLE', 'Comment approved!', 'Failed to approve');
    const handleReject = (comment) => updateCommentStatus(comment, 'HIDDEN', 'Comment hidden', 'Failed to hide');
    const handleUnhide = (comment) => updateCommentStatus(comment, 'VISIBLE', 'Comment restored!', 'Failed to restore');

    const handleDelete = async () => {
        if (!deleteConfirm) return;
        setActionLoading(deleteConfirm.id);
        try {
            await adminApi.deleteComment(deleteConfirm.id);
            toast.success('Comment deleted');
            if (currentView === 'blog-comments') {
                setComments(prev => prev.filter(c => c.id !== deleteConfirm.id));
                if (selectedBlog?.id !== 'pending') {
                    setBlogs(prev => prev.map(b =>
                        b.id === selectedBlog.id
                            ? { ...b, commentsCount: Math.max(0, (b.commentsCount || 1) - 1) }
                            : b
                    ));
                    setSelectedBlog(prev => ({ ...prev, commentsCount: Math.max(0, (prev.commentsCount || 1) - 1) }));
                }
            } else {
                setAllComments(prev => prev.filter(c => c.id !== deleteConfirm.id));
            }
            setDeleteConfirm(null);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete');
        } finally {
            setActionLoading(null);
        }
    };

    const handleDeleteBlog = async () => {
        if (!deleteBlogConfirm) return;
        setActionLoading(deleteBlogConfirm.id);
        try {
            await adminApi.deleteBlog(deleteBlogConfirm.id);
            toast.success('Blog deleted');
            setBlogs(prev => prev.filter(b => b.id !== deleteBlogConfirm.id));
            setDeleteBlogConfirm(null);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to delete blog');
        } finally {
            setActionLoading(null);
        }
    };

    const handleBlogApprove = async (id) => {
        setActionLoading(id);
        try {
            await adminApi.approveBlog(id, { adminId: 'admin' });
            toast.success('Blog approved!');
            setBlogs(prev => prev.map(b => b.id === id ? { ...b, status: 'PUBLISHED' } : b));
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to approve blog');
        } finally {
            setActionLoading(null);
        }
    };

    // ── Filtered data ───────────────────────────────────────
    const filteredAllComments = allComments.filter(c => {
        if (!commentSearch.trim()) return true;
        const term = commentSearch.toLowerCase();
        const blogTitle = blogMap[c.blogId] || '';
        return blogTitle.toLowerCase().includes(term) ||
               (c.name || '').toLowerCase().includes(term) ||
               (c.commentText || '').toLowerCase().includes(term);
    });

    const filteredBlogs = blogs.filter(b =>
        !blogSearch.trim() ||
        b.title?.toLowerCase().includes(blogSearch.toLowerCase()) ||
        b.authorName?.toLowerCase().includes(blogSearch.toLowerCase())
    );

    // ── Render helpers ──────────────────────────────────────
    const renderCommentActions = (c) => (
        <div className="flex items-center gap-1 sm:gap-2 shrink-0 self-end sm:self-start mt-1 sm:mt-0 flex-wrap">
            {c.status === 'PENDING' && (
                <>
                    <button onClick={() => handleApprove(c)} disabled={actionLoading === c.id} title="Approve"
                        className="flex items-center gap-0.5 sm:gap-1.5 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium bg-green-50 text-green-600 hover:bg-green-100 transition disabled:opacity-50">
                        <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="hidden xs:inline">Approve</span>
                    </button>
                    <button onClick={() => handleReject(c)} disabled={actionLoading === c.id} title="Reject"
                        className="flex items-center gap-0.5 sm:gap-1.5 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition disabled:opacity-50">
                        <ThumbsDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="hidden xs:inline">Reject</span>
                    </button>
                </>
            )}
            {c.status === 'VISIBLE' && (
                <button onClick={() => handleReject(c)} disabled={actionLoading === c.id} title="Hide"
                    className="flex items-center gap-0.5 sm:gap-1.5 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium bg-orange-50 text-orange-600 hover:bg-orange-100 transition disabled:opacity-50">
                    <ThumbsDown className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="hidden xs:inline">Hide</span>
                </button>
            )}
            {c.status === 'HIDDEN' && (
                <button onClick={() => handleUnhide(c)} disabled={actionLoading === c.id} title="Unhide"
                    className="flex items-center gap-0.5 sm:gap-1.5 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium bg-green-50 text-green-600 hover:bg-green-100 transition disabled:opacity-50">
                    <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="hidden xs:inline">Unhide</span>
                </button>
            )}
            <button onClick={() => setViewComment(c)} title="View"
                className="flex items-center gap-0.5 sm:gap-1.5 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="hidden xs:inline">View</span>
            </button>
            <button onClick={() => setDeleteConfirm(c)} disabled={actionLoading === c.id} title="Delete"
                className="flex items-center gap-0.5 sm:gap-1.5 px-1.5 sm:px-3 py-1 sm:py-1.5 rounded-lg text-[10px] sm:text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition disabled:opacity-50">
                <Trash2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> <span className="hidden xs:inline">Delete</span>
            </button>
        </div>
    );

    const Pager = ({ page, totalPages, onChange }) => (
        totalPages > 1 ? (
            <div className="mt-4 sm:mt-6 flex items-center justify-center gap-1 flex-wrap">
                <button onClick={() => onChange(page - 1)} disabled={page === 0}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-sm font-medium border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition">Prev</button>
                {Array.from({ length: totalPages }, (_, i) => {
                    const p = i;
                    if (totalPages > 7) {
                        if (p === 0 || p === totalPages - 1 || (p >= page - 1 && p <= page + 1)) {
                            return <button key={p} onClick={() => onChange(p)}
                                className={`w-7 h-7 sm:w-9 sm:h-9 text-[10px] sm:text-sm font-semibold rounded-lg transition ${page === p ? 'bg-blue-900 text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
                                {p + 1}
                            </button>;
                        }
                        if (p === page - 2 || p === page + 2) {
                            return <span key={p} className="text-gray-400 text-[10px] sm:text-sm px-0.5 sm:px-1">...</span>;
                        }
                        return null;
                    }
                    return <button key={p} onClick={() => onChange(p)}
                        className={`w-7 h-7 sm:w-9 sm:h-9 text-[10px] sm:text-sm font-semibold rounded-lg transition ${page === p ? 'bg-blue-900 text-white' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}>
                        {p + 1}
                    </button>;
                })}
                <button onClick={() => onChange(page + 1)} disabled={page >= totalPages - 1}
                    className="px-2 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-sm font-medium border border-gray-300 rounded-lg disabled:opacity-40 hover:bg-gray-50 transition">Next</button>
            </div>
        ) : null
    );

    // ══════════════════════════════════════════════════════════
    //  SHARED MODALS
    // ══════════════════════════════════════════════════════════
    const modals = (
        <>
            {viewComment && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={() => setViewComment(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 max-w-lg w-full mx-3 sm:mx-4"
                        onClick={e => e.stopPropagation()}>
                        <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
                            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold shrink-0 bg-blue-900">
                                    {(viewComment.name || 'A').charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs sm:text-sm font-bold text-gray-800 truncate max-w-[140px] xs:max-w-[200px] sm:max-w-none">{viewComment.name || 'Anonymous'}</p>
                                    <p className="text-[10px] sm:text-xs text-gray-400">{formatDate(viewComment.createdAt)}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                                <StatusBadge status={viewComment.status} />
                                <button onClick={() => setViewComment(null)}
                                    className="p-1 sm:p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-400">
                                    <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                </button>
                            </div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-5 whitespace-pre-wrap break-words">
                            {viewComment.commentText}
                        </p>
                        <div className="flex gap-2 justify-end flex-wrap">
                            {viewComment.status === 'PENDING' && (
                                <button onClick={() => { handleApprove(viewComment); setViewComment(null); }}
                                    className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-green-50 text-green-600 hover:bg-green-100 transition">
                                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Approve
                                </button>
                            )}
                            {(viewComment.status === 'PENDING' || viewComment.status === 'VISIBLE') && (
                                <button onClick={() => { handleReject(viewComment); setViewComment(null); }}
                                    className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-orange-50 text-orange-600 hover:bg-orange-100 transition">
                                    <ThumbsDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> {viewComment.status === 'PENDING' ? 'Reject' : 'Hide'}
                                </button>
                            )}
                            {viewComment.status === 'HIDDEN' && (
                                <button onClick={() => { handleUnhide(viewComment); setViewComment(null); }}
                                    className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-green-50 text-green-600 hover:bg-green-100 transition">
                                    <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Unhide
                                </button>
                            )}
                            <button onClick={() => { setDeleteConfirm(viewComment); setViewComment(null); }}
                                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-red-50 text-red-600 hover:bg-red-100 transition">
                                <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {deleteConfirm && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm"
                    onClick={() => setDeleteConfirm(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 max-w-md w-full mx-3 sm:mx-4" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                            </div>
                            <div>
                                <h2 className="text-sm sm:text-base font-bold text-gray-800">Delete Comment</h2>
                                <p className="text-[10px] sm:text-xs text-gray-400">By {deleteConfirm.name || 'Anonymous'}</p>
                            </div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 bg-gray-50 rounded-xl p-2.5 sm:p-3 mb-3 sm:mb-4 italic line-clamp-3 sm:line-clamp-4 break-words">
                            "{deleteConfirm.commentText}"
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-5">This action is permanent and cannot be undone.</p>
                        <div className="flex gap-2 sm:gap-3">
                            <button onClick={() => setDeleteConfirm(null)}
                                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
                                Cancel
                            </button>
                            <button onClick={handleDelete} disabled={actionLoading === deleteConfirm.id}
                                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50">
                                {actionLoading === deleteConfirm.id ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {viewBlogModal && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm"
                    onClick={() => setViewBlogModal(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col mx-2 sm:mx-0" onClick={e => e.stopPropagation()}>
                        <div className="flex items-start justify-between px-4 sm:px-6 py-3 sm:py-4 shrink-0 gap-3">
                            <div className="min-w-0 flex-1">
                                <h2 className="text-base sm:text-lg font-bold text-gray-800 truncate">{viewBlogModal.title}</h2>
                                <p className="text-xs text-gray-400 truncate">{viewBlogModal.authorName || 'Unknown'}{viewBlogModal.authorEmail ? ` \u2014 ${viewBlogModal.authorEmail}` : ''}</p>
                            </div>
                            <button onClick={() => setViewBlogModal(null)}
                                className="p-1.5 rounded-lg hover:bg-gray-100 transition text-gray-400 shrink-0">
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="overflow-y-auto flex-1 px-4 sm:px-6 py-3 space-y-3">
                            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs sm:text-sm text-gray-600">
                                <span className="text-gray-400">Status:</span>
                                <span className={`font-semibold ${viewBlogModal.status === 'PUBLISHED' ? 'text-green-600' : viewBlogModal.status === 'PENDING' ? 'text-yellow-600' : viewBlogModal.status === 'REJECTED' ? 'text-red-600' : 'text-gray-600'}`}>
                                    {viewBlogModal.status}
                                </span>
                                {viewBlogModal.createdAt && !isNaN(new Date(viewBlogModal.createdAt)) && (
                                    <><span className="text-gray-400 ml-1">Created:</span><span>{formatDate(viewBlogModal.createdAt)}</span></>
                                )}
                                {viewBlogModal.commentsCount !== undefined && (
                                    <><span className="text-gray-400 ml-1">Comments:</span><span>{viewBlogModal.commentsCount}</span></>
                                )}
                            </div>
                            {viewBlogModal.excerpt && (
                                <div>
                                    <span className="text-xs text-gray-400">Excerpt:</span>
                                    <div className="mt-0.5 text-sm text-gray-600 leading-relaxed">{viewBlogModal.excerpt}</div>
                                </div>
                            )}
                            {viewBlogModal.tags?.length > 0 && (
                                <div>
                                    <span className="text-xs text-gray-400">Tags:</span>
                                    <div className="mt-1 flex flex-wrap gap-1.5">
                                        {viewBlogModal.tags.map(tag => (
                                            <span key={tag} className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">{tag}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            <div className="pt-3">
                                <span className="text-xs text-gray-400">Content:</span>
                                <div className="mt-1 text-sm text-gray-700 leading-relaxed break-words prose prose-sm max-w-none"
                                    dangerouslySetInnerHTML={{ __html: formatContent(viewBlogModal.contentHtml, viewBlogModal.content) }} />
                            </div>
                        </div>
                        <div className="px-4 sm:px-6 py-3 sm:py-4 shrink-0 flex items-center justify-end gap-2 flex-wrap">
                            {viewBlogModal.status === 'PENDING' && (
                                <button onClick={() => { handleBlogApprove(viewBlogModal.id); setViewBlogModal(null); }}
                                    className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-green-50 text-green-600 hover:bg-green-100 transition">
                                    <CheckCircle className="w-4 h-4" /> Approve
                                </button>
                            )}
                            <button onClick={() => setViewBlogModal(null)}
                                className="px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {deleteBlogConfirm && (
                <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4 backdrop-blur-sm"
                    onClick={() => setDeleteBlogConfirm(null)}>
                    <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 max-w-md w-full mx-3 sm:mx-0" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                            </div>
                            <div>
                                <h2 className="text-sm sm:text-base font-bold text-gray-800">Delete Blog</h2>
                                <p className="text-[10px] sm:text-xs text-gray-400 truncate max-w-[180px] sm:max-w-[280px]">{deleteBlogConfirm.title}</p>
                            </div>
                        </div>
                        <p className="text-xs sm:text-sm text-gray-500 mb-4 sm:mb-5">This action is permanent and cannot be undone. All comments on this blog will also be deleted.</p>
                        <div className="flex gap-2 sm:gap-3">
                            <button onClick={() => setDeleteBlogConfirm(null)}
                                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-medium border border-gray-200 text-gray-600 hover:bg-gray-50 transition">
                                Cancel
                            </button>
                            <button onClick={handleDeleteBlog} disabled={actionLoading === deleteBlogConfirm.id}
                                className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-red-500 text-white hover:bg-red-600 transition disabled:opacity-50">
                                {actionLoading === deleteBlogConfirm.id ? 'Deleting...' : 'Yes, Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

    // ══════════════════════════════════════════════════════════
    //  MAIN RENDER
    // ══════════════════════════════════════════════════════════

    // ── Blog-comments view ──────────────────────────────────
    if (currentView === 'blog-comments') {
        return (
            <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
                <div className="bg-white shadow-sm px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <button onClick={closeBlogComments}
                            className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition shrink-0" title="Back to all comments">
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-blue-900" />
                        </button>
                        <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-blue-900" />
                                <h1 className="text-sm sm:text-base font-bold truncate max-w-[130px] xs:max-w-[200px] sm:max-w-sm text-blue-900">
                                    {selectedBlog.title}
                                </h1>
                                <BlogStatusDot status={selectedBlog.status} />
                                <span className="text-xs text-gray-400 hidden sm:inline">{selectedBlog.status}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-0.5 truncate">
                                {commentPagination.totalElements} comment{commentPagination.totalElements !== 1 ? 's' : ''} total
                                {selectedBlog.authorName && <> &middot; By {selectedBlog.authorName}</>}
                            </p>
                        </div>
                    </div>
                    <button onClick={() => fetchComments(selectedBlog.id, commentPage)}
                        className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border border-gray-200 hover:bg-gray-50 transition shrink-0 text-blue-900">
                        <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                </div>

                <div className="px-3 sm:px-6 py-4 sm:py-8">
                    {commentsLoading ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-12 sm:py-20 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-t-2 border-b-2"
                                style={{ borderColor: '#1e3a8a', borderTopColor: '#eab308' }} />
                            <p className="mt-3 sm:mt-4 text-gray-500 text-xs sm:text-sm">Loading comments...</p>
                        </div>
                    ) : comments.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-12 sm:py-20 text-center">
                            <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-gray-200 mx-auto mb-2 sm:mb-3" />
                            <p className="text-gray-500 text-xs sm:text-sm font-medium">No comments on this blog</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {comments.map((c, idx) => (
                                <div key={c.id}
                                    className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                                    <div className="flex items-start gap-2 sm:gap-3 min-w-0 flex-1 w-full">
                                        <span className="text-xs text-gray-300 font-mono mt-1 shrink-0 w-5 text-right hidden sm:block">
                                            {commentPage * COMMENT_PAGE_SIZE + idx + 1}
                                        </span>
                                        <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold shrink-0 bg-blue-900">
                                            {(c.name || 'A').charAt(0).toUpperCase()}
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mb-0.5 sm:mb-1">
                                                <span className="text-xs sm:text-sm font-semibold text-gray-800 truncate max-w-[100px] xs:max-w-[160px] sm:max-w-none">{c.name || 'Anonymous'}</span>
                                                <StatusBadge status={c.status} />
                                                <span className="text-[10px] sm:text-xs text-gray-400 hidden xs:inline">{formatDate(c.createdAt)}</span>
                                            </div>
                                            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words line-clamp-2 sm:line-clamp-none">{c.commentText}</p>
                                        </div>
                                    </div>
                                    {renderCommentActions(c)}
                                </div>
                            ))}
                        </div>
                    )}
                    <Pager page={commentPage} totalPages={commentPagination.totalPages}
                        onChange={(p) => { setCommentPage(p); fetchComments(selectedBlog.id, p); }} />
                </div>
                {modals}
            </div>
        );
    }

    // ── Blog list view ──────────────────────────────────────
    if (currentView === 'blogs') {
        return (
            <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
                <div className="bg-white shadow-sm px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <button onClick={() => setCurrentView('comments')}
                            className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition shrink-0" title="Back to comments">
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-blue-900" />
                        </button>
                        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-blue-900" />
                        <div className="min-w-0">
                            <h1 className="text-sm sm:text-xl font-bold text-blue-900 truncate">Blogs</h1>
                            <p className="text-[10px] sm:text-xs text-gray-400 truncate">Manage blogs and approve pending</p>
                        </div>
                    </div>
                    <button onClick={() => fetchBlogs(blogPage)}
                        className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border border-gray-200 hover:bg-gray-50 transition shrink-0 text-blue-900">
                        <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                </div>

                <div className="px-3 sm:px-6 py-4 sm:py-8">
                    <div className="relative mb-3 sm:mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                        <input type="text" placeholder="Search blogs by title or author..."
                            value={blogSearch} onChange={e => setBlogSearch(e.target.value)}
                            className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 border border-gray-200 bg-white text-xs sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent" />
                    </div>

                    <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                        <span className="font-semibold text-gray-700">{blogPagination.totalElements}</span> blogs total
                    </p>

                    {blogsLoading ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-12 sm:py-20 text-center">
                            <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-t-2 border-b-2"
                                style={{ borderColor: '#1e3a8a', borderTopColor: '#eab308' }} />
                            <p className="mt-3 sm:mt-4 text-gray-500 text-xs sm:text-sm">Loading blogs...</p>
                        </div>
                    ) : filteredBlogs.length === 0 ? (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-12 sm:py-20 text-center">
                            <FileText className="w-10 h-10 sm:w-12 sm:h-12 text-gray-200 mx-auto mb-2 sm:mb-3" />
                            <p className="text-gray-500 text-xs sm:text-sm font-medium">No blogs match your search</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="hidden sm:grid grid-cols-12 gap-3 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                                <div className="col-span-4">Blog Title</div>
                                <div className="col-span-2">Author</div>
                                <div className="col-span-2">Status</div>
                                <div className="col-span-2">Date</div>
                                <div className="col-span-2 text-center">Actions</div>
                            </div>
                            <div className="divide-y divide-gray-50">
                                {filteredBlogs.map((blog) => (
                                    <div key={blog.id}
                                        className="w-full px-3 sm:px-6 py-2 sm:py-4 hover:bg-blue-50/40 transition group">
                                        <div className="sm:hidden">
                                            <div className="flex items-start gap-1.5 cursor-pointer min-w-0" onClick={() => openBlogComments(blog)}>
                                                <BlogStatusDot status={blog.status} />
                                                <span className="text-xs sm:text-sm font-semibold text-gray-800 truncate flex-1 group-hover:text-blue-900 transition leading-snug">
                                                    {blog.title}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                                <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-[10px] font-semibold ${blog.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : blog.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : blog.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}`}>{blog.status}</span>
                                                {blog.createdAt && !isNaN(new Date(blog.createdAt)) && (
                                                    <span className="text-[10px] text-gray-400">{formatDate(blog.createdAt)}</span>
                                                )}
                                                {blog.authorName && (
                                                    <span className="text-[10px] text-gray-400 truncate max-w-[100px]">{blog.authorName}</span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-1 mt-1.5" onClick={e => e.stopPropagation()}>
                                                <button onClick={() => setViewBlogModal(blog)}
                                                    className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg text-[10px] font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                                                    <Eye className="w-3 h-3" /> View
                                                </button>
                                                <button onClick={() => handleBlogApprove(blog.id)} disabled={actionLoading === blog.id}
                                                    className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg text-[10px] font-medium bg-green-50 text-green-600 hover:bg-green-100 transition disabled:opacity-50">
                                                    <CheckCircle className="w-3 h-3" /> Approve
                                                </button>
                                                <button onClick={() => setDeleteBlogConfirm(blog)}
                                                    className="flex items-center gap-0.5 px-1.5 py-1 rounded-lg text-[10px] font-medium bg-red-50 text-red-600 hover:bg-red-100 transition">
                                                    <Trash2 className="w-3 h-3" /> Delete
                                                </button>
                                            </div>
                                        </div>
                                        <div className="hidden sm:grid sm:grid-cols-12 gap-3 items-center text-left">
                                            <div className="col-span-4 flex items-center gap-3 min-w-0 cursor-pointer" onClick={() => openBlogComments(blog)}>
                                                <BlogStatusDot status={blog.status} />
                                                <span className="text-sm font-semibold text-gray-800 truncate group-hover:text-blue-900 transition">
                                                    {blog.title}
                                                </span>
                                            </div>
                                            <div className="col-span-2 text-sm text-gray-500 truncate">
                                                {blog.authorName || '-'}
                                            </div>
                                            <div className="col-span-2">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${blog.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' : blog.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' : blog.status === 'REJECTED' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'}`}>{blog.status}</span>
                                            </div>
                                            <div className="col-span-2 text-xs text-gray-500">
                                                {blog.createdAt && !isNaN(new Date(blog.createdAt)) ? formatDate(blog.createdAt) : '-'}
                                            </div>
                                            <div className="col-span-2 flex items-center justify-center gap-1.5" onClick={e => e.stopPropagation()}>
                                                <button onClick={() => setViewBlogModal(blog)}
                                                    className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                                                    <Eye className="w-3.5 h-3.5" /> View
                                                </button>
                                                <button onClick={() => handleBlogApprove(blog.id)} disabled={actionLoading === blog.id}
                                                    className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium bg-green-50 text-green-600 hover:bg-green-100 transition disabled:opacity-50">
                                                    <CheckCircle className="w-3.5 h-3.5" /> Approve
                                                </button>
                                                <button onClick={() => setDeleteBlogConfirm(blog)}
                                                    className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition">
                                                    <Trash2 className="w-3.5 h-3.5" /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <Pager page={blogPage} totalPages={blogPagination.totalPages}
                        onChange={(p) => { setBlogPage(p); fetchBlogs(p); }} />
                </div>
                {modals}
            </div>
        );
    }

    // ══════════════════════════════════════════════════════════
    //  VIEW: All Comments (default)
    // ══════════════════════════════════════════════════════════
    return (
        <div className="min-h-screen" style={{ backgroundColor: '#ffffff' }}>
            <div className="bg-white shadow-sm px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    {onBack && (
                        <button onClick={onBack} className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition shrink-0" title="Back">
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 text-blue-900" />
                        </button>
                    )}
                    <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 text-blue-900" />
                    <div className="min-w-0">
                        <h1 className="text-sm sm:text-xl font-bold text-blue-900 truncate">Comment Management</h1>
                        <p className="text-[10px] sm:text-xs text-gray-400 truncate">{allCommentsPagination.totalElements} comments total</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                    <button onClick={() => setFilter('PENDING')}
                        className={`px-2 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-sm font-bold transition whitespace-nowrap ${statusFilter === 'PENDING' ? 'bg-yellow-200 text-yellow-900' : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'}`}>
                        Pending Queue
                    </button>
                    <button onClick={() => { setCurrentView('blogs'); if (blogs.length === 0) fetchBlogs(0); }}
                        className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border border-gray-200 hover:bg-gray-50 transition shrink-0 text-blue-900">
                        <List className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> <span className="hidden xs:inline">Blogs</span>
                    </button>
                    <button onClick={() => fetchAllComments(allCommentsPage)}
                        className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium border border-gray-200 hover:bg-gray-50 transition shrink-0 text-blue-900">
                        <RefreshCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                </div>
            </div>

            {/* Status filter tabs */}
            <div className="px-3 sm:px-6 pt-4 sm:pt-6">
                <div className="flex items-center gap-1 sm:gap-2 mb-3 sm:mb-4">
                    {['ALL', 'PENDING', 'VISIBLE', 'HIDDEN'].map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-bold transition ${statusFilter === f ? 'bg-blue-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                            {f === 'ALL' ? 'All' : f.charAt(0) + f.slice(1).toLowerCase()}
                        </button>
                    ))}
                </div>
            </div>

            {/* Search */}
            <div className="px-3 sm:px-6">
                <div className="relative mb-3 sm:mb-6">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                    <input type="text" placeholder="Search by blog title, commenter name, or comment text..."
                        value={commentSearch} onChange={e => setCommentSearch(e.target.value)}
                        className="w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-2.5 border border-gray-200 bg-white text-xs sm:text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1e3a8a] focus:border-transparent" />
                </div>
            </div>

            {/* Content */}
            <div className="px-3 sm:px-6 pb-4 sm:pb-8">
                {allCommentsLoading ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-12 sm:py-20 text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-t-2 border-b-2"
                            style={{ borderColor: '#1e3a8a', borderTopColor: '#eab308' }} />
                        <p className="mt-3 sm:mt-4 text-gray-500 text-xs sm:text-sm">Loading comments...</p>
                    </div>
                ) : filteredAllComments.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 py-12 sm:py-20 text-center">
                        <MessageSquare className="w-10 h-10 sm:w-12 sm:h-12 text-gray-200 mx-auto mb-2 sm:mb-3" />
                        <p className="text-gray-500 text-xs sm:text-sm font-medium">
                            {commentSearch ? 'No comments match your search' : 'No comments yet'}
                        </p>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Desktop header */}
                        <div className="hidden sm:grid grid-cols-12 gap-3 px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                            <div className="col-span-1 text-center">#</div>
                            <div className="col-span-2 text-center">Blog</div>
                            <div className="col-span-2 text-center">Commenter</div>
                            <div className="col-span-2 text-center">Comment</div>
                            <div className="col-span-1 text-center">Status</div>
                            <div className="col-span-2 text-center">Date</div>
                            <div className="col-span-2 text-center">Actions</div>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {filteredAllComments.map((c, idx) => {
                                const blogTitle = blogMap[c.blogId] || `Blog #${c.blogId}`;
                                return (
                                    <div key={c.id}
                                        className="w-full px-3 sm:px-6 py-2 sm:py-4 hover:bg-blue-50/40 transition group">
                                        {/* Mobile */}
                                        <div className="sm:hidden">
                                            <div className="flex items-start gap-1.5 min-w-0">
                                                <span className="text-[10px] text-gray-300 font-mono mt-0.5 shrink-0 w-5">
                                                    {allCommentsPage * ALL_COMMENTS_PAGE_SIZE + idx + 1}
                                                </span>
                                                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0 bg-blue-900">
                                                    {(c.name || 'A').charAt(0).toUpperCase()}
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-1 flex-wrap">
                                                        <span className="text-xs font-semibold text-gray-800 truncate max-w-[80px]">{c.name || 'Anonymous'}</span>
                                                        <StatusBadge status={c.status} />
                                                    </div>
                                                    <p className="text-[10px] text-gray-500 truncate mt-0.5">{c.commentText}</p>
                                                    <button onClick={() => {
                                                        const blog = blogs.find(b => b.id === c.blogId) || { id: c.blogId, title: blogTitle };
                                                        openBlogComments(blog);
                                                    }}
                                                        className="text-[10px] text-blue-600 hover:underline mt-0.5 inline-block">
                                                        {blogTitle}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="mt-1.5" onClick={e => e.stopPropagation()}>
                                                {renderCommentActions(c)}
                                            </div>
                                        </div>
                                        {/* Desktop */}
                                        <div className="hidden sm:grid sm:grid-cols-12 gap-3 items-center text-base text-center">
                                            <div className="col-span-1 text-gray-400 font-medium">
                                                {allCommentsPage * ALL_COMMENTS_PAGE_SIZE + idx + 1}
                                            </div>
                                            <div className="col-span-2 truncate">
                                                <button onClick={() => {
                                                    const blog = blogs.find(b => b.id === c.blogId) || { id: c.blogId, title: blogTitle };
                                                    openBlogComments(blog);
                                                }}
                                                    className="text-blue-600 hover:underline text-left">
                                                    {blogTitle}
                                                </button>
                                            </div>
                                            <div className="col-span-2 truncate text-gray-800">
                                                {c.name || 'Anonymous'}
                                            </div>
                                            <div className="col-span-2 truncate text-gray-600">
                                                {c.commentText}
                                            </div>
                                            <div className="col-span-1">
                                                <StatusBadge status={c.status} />
                                            </div>
                                            <div className="col-span-2 text-gray-400">
                                                {formatDate(c.createdAt)}
                                            </div>
                                            <div className="col-span-2 flex items-center justify-center gap-1" onClick={e => e.stopPropagation()}>
                                                {renderCommentActions(c)}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
                <Pager page={allCommentsPage} totalPages={allCommentsPagination.totalPages}
                    onChange={(p) => { setAllCommentsPage(p); fetchAllComments(p); }} />
            </div>
            {modals}
        </div>
    );
};
