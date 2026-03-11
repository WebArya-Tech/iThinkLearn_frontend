import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogApi } from '../../api/blogApi';
import { Card, Badge, Spinner, Button, TextArea, Input, TagBadge } from '../ui';
import { Heart, ThumbsDown, MessageCircle, Eye, Clock, ArrowLeft, Send, User } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const getVisitorKey = () => {
    let key = localStorage.getItem('visitorKey');
    if (!key) { key = 'visitor_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9); localStorage.setItem('visitorKey', key); }
    return key;
};

export const BlogDetailPage = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [reactionStatus, setReactionStatus] = useState(null);
    const [commentForm, setCommentForm] = useState({ name: '', commentText: '', honeypot: '' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        const loadBlog = async () => {
            setLoading(true);
            try {
                const response = await blogApi.getBlogBySlug(slug);
                setBlog(response.data);
                loadComments(response.data.id);
                loadReactions(response.data.id);
            } catch (err) { toast.error('Blog not found'); }
            finally { setLoading(false); }
        };
        loadBlog();
    }, [slug]);

    const loadComments = async (blogId) => {
        setCommentsLoading(true);
        try { const r = await blogApi.getComments(blogId, { size: 50 }); setComments(r.data.content); }
        catch (err) { console.error('Failed to load comments'); }
        finally { setCommentsLoading(false); }
    };

    const loadReactions = async (blogId) => {
        try { const r = await blogApi.getReactionStatus(blogId, getVisitorKey()); setReactionStatus(r.data); }
        catch (err) { console.error('Failed to load reactions'); }
    };

    const handleReaction = async (reactionType) => {
        if (!blog) return;
        try {
            const r = await blogApi.toggleReaction(blog.id, { reactionType, visitorKey: getVisitorKey() });
            setReactionStatus(r.data);
            setBlog(prev => ({ ...prev, likesCount: r.data.likesCount, dislikesCount: r.data.dislikesCount }));
        } catch (err) { toast.error('Failed to react'); }
    };

    const handleComment = async (e) => {
        e.preventDefault();
        if (!blog || !commentForm.name.trim() || !commentForm.commentText.trim()) return;
        setSubmitting(true);
        try {
            await blogApi.postComment(blog.id, commentForm);
            toast.success('Comment posted!');
            setCommentForm({ name: '', commentText: '', honeypot: '' });
            loadComments(blog.id);
        } catch (err) { toast.error(err.response?.data?.message || 'Failed to post comment'); }
        finally { setSubmitting(false); }
    };

    if (loading) return <div className="py-16"><Spinner size="lg" /></div>;
    if (!blog) return <div className="text-center py-16 text-text-tertiary text-lg">Blog not found</div>;

    return (
        <div className="max-w-3xl mx-auto px-6 py-16">
            <Link to="/blogs" className="inline-flex items-center text-text-tertiary hover:text-text-primary mb-6 transition-colors text-sm">
                <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Blogs
            </Link>

            <article>
                {blog.featuredImageUrl && (
                    <img src={blog.featuredImageUrl} alt={blog.title} className="w-full h-64 md:h-80 object-cover rounded-xl mb-8" />
                )}
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4 leading-tight">{blog.title}</h1>

                <div className="flex flex-wrap items-center gap-3 text-text-tertiary text-sm mb-6">
                    <span className="flex items-center gap-1"><User className="w-4 h-4" />{blog.authorName}</span>
                    {blog.publishedAt && <span className="flex items-center gap-1"><Clock className="w-4 h-4" />{format(new Date(blog.publishedAt), 'MMMM dd, yyyy')}</span>}
                    <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{blog.viewsCount} views</span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-8">
                    {blog.tags?.map((tag) => <TagBadge key={tag} tag={tag} />)}
                </div>

                <div className="blog-content mb-10 border-t border-border-secondary pt-8"
                    ref={(el) => {
                        if (!el) return;
                        el.querySelectorAll('img').forEach(img => {
                            img.onerror = function () {
                                const fallback = document.createElement('div');
                                fallback.className = 'blog-img-fallback';
                                fallback.innerHTML = `<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline><line x1="2" y1="2" x2="22" y2="22"></line></svg><span>Image not available</span>`;
                                this.replaceWith(fallback);
                            };
                        });
                    }}
                    dangerouslySetInnerHTML={{ __html: blog.contentHtml || '' }} />

                {/* Reactions */}
                <div className="flex items-center gap-3 mb-10 pb-8 border-b border-border-secondary">
                    <button onClick={() => handleReaction('LIKE')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm ${reactionStatus?.userReaction === 'LIKE' ? 'bg-text-primary text-bg-primary border-text-primary' : 'border-border-primary text-text-secondary hover:border-text-tertiary'
                            }`}>
                        <Heart className={`w-4 h-4 ${reactionStatus?.userReaction === 'LIKE' ? 'fill-current' : ''}`} />
                        <span className="font-medium">{blog.likesCount}</span>
                    </button>
                    <button onClick={() => handleReaction('DISLIKE')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all text-sm ${reactionStatus?.userReaction === 'DISLIKE' ? 'bg-red-600 text-white border-red-600' : 'border-border-primary text-text-secondary hover:border-text-tertiary'
                            }`}>
                        <ThumbsDown className={`w-4 h-4 ${reactionStatus?.userReaction === 'DISLIKE' ? 'fill-current' : ''}`} />
                        <span className="font-medium">{blog.dislikesCount}</span>
                    </button>
                </div>

                {/* Comments */}
                <section>
                    <h2 className="text-xl font-bold text-text-primary mb-6 flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" /> Comments ({comments.length})
                    </h2>

                    <Card className="mb-8">
                        <form onSubmit={handleComment} className="space-y-4">
                            <Input label="Your Name" placeholder="Enter your name" value={commentForm.name}
                                onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })} required />
                            <input type="hidden" name="honeypot" value={commentForm.honeypot}
                                onChange={(e) => setCommentForm({ ...commentForm, honeypot: e.target.value })} />
                            <TextArea label="Comment" placeholder="Write your comment..." value={commentForm.commentText}
                                onChange={(e) => setCommentForm({ ...commentForm, commentText: e.target.value })} rows={3} required />
                            <Button type="submit" disabled={submitting}>
                                <Send className="w-4 h-4 inline mr-1.5" />{submitting ? 'Posting...' : 'Post Comment'}
                            </Button>
                        </form>
                    </Card>

                    {commentsLoading ? <Spinner /> : comments.length === 0 ? (
                        <p className="text-text-tertiary text-center py-6 text-sm">No comments yet. Be the first to comment!</p>
                    ) : (
                        <div className="space-y-3">
                            {comments.map((c) => (
                                <Card key={c.id}>
                                    <div className="flex items-center gap-2.5 mb-2">
                                        <div className="w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center text-sm font-semibold text-text-secondary">
                                            {c.name?.charAt(0)?.toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-medium text-text-primary text-sm">{c.name}</p>
                                            <p className="text-xs text-text-tertiary">{c.createdAt && format(new Date(c.createdAt), 'MMM dd, yyyy HH:mm')}</p>
                                        </div>
                                    </div>
                                    <p className="text-text-secondary text-sm">{c.commentText}</p>
                                </Card>
                            ))}
                        </div>
                    )}
                </section>
            </article>
        </div>
    );
};
