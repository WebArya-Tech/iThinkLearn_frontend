import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogApi } from '../../api/blogApi';
import { Card, Badge, Spinner, TagBadge } from '../ui';
import { Clock, Heart, MessageCircle, Eye, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import React from 'react';

const STATIC_BLOGS = [
    {
        id: 1, slug: null,
        title: 'Why Online Learning is More Effective Than Traditional Coaching',
        excerpt: 'Discover why flexible, personalized online classes with expert instructors deliver better results than crowded traditional coaching centers.',
        tags: ['Online Learning', 'Education'],
        likesCount: 24, commentsCount: 6, viewsCount: 310,
        publishedAt: '2026-01-10T00:00:00',
        featuredImageUrl: 'https://media.istockphoto.com/id/1148810339/photo/man-hand-holding-book-and-working-on-a-laptop-concept-education.jpg?s=612x612&w=0&k=20&c=JwwI4H57pZq2Rabf7-bumo6gwGgOSiKtF_uKrz5jiAc=',
    },
    {
        id: 2, slug: null,
        title: 'Mastering SAT Math: Strategies and Practice Tips',
        excerpt: 'Expert strategies to tackle SAT Math problems efficiently. Learn time-management techniques and common pitfalls to avoid.',
        tags: ['SAT', 'Math'],
        likesCount: 18, commentsCount: 4, viewsCount: 245,
        publishedAt: '2026-01-15T00:00:00',
        featuredImageUrl: 'https://media.istockphoto.com/id/2235036829/vector/mathematical-symbols-and-the-word-math-concept-illustration-vector.jpg?s=612x612&w=0&k=20&c=bxVFv_0cNURu1rGgrLBdGgyQec_sFXH4t2o8JGLnydc=',
    },
    {
        id: 3, slug: null,
        title: 'AP Calculus AB vs BC: Which One Should You Choose?',
        excerpt: 'A comprehensive comparison of AP Calculus AB and BC to help you choose the right course for your academic goals.',
        tags: ['AP Exams', 'Calculus'],
        likesCount: 31, commentsCount: 9, viewsCount: 412,
        publishedAt: '2026-01-20T00:00:00',
        featuredImageUrl: 'https://media.istockphoto.com/id/1295540236/photo/online-education-with-teacher.jpg?s=612x612&w=0&k=20&c=8ydrtl8szjcFpHIcvfHMazCNjGNe_zOf6eGaGnS0Prw=',
    },
    {
        id: 4, slug: null,
        title: 'How to Prepare for GRE in 3 Months: A Structured Plan',
        excerpt: 'A proven 3-month GRE preparation plan with daily schedules, resources, and tips from successful test-takers.',
        tags: ['GRE', 'Study Plan'],
        likesCount: 42, commentsCount: 11, viewsCount: 530,
        publishedAt: '2026-01-25T00:00:00',
        featuredImageUrl: 'https://media.istockphoto.com/id/598829690/photo/plan.jpg?s=612x612&w=0&k=20&c=Y_3aEBD9c4l70SAeM5klam0qRm2Dvk1onwXigIUuggU=',
    },
    {
        id: 5, slug: null,
        title: 'Olympiad Mathematics: Building Strong Foundations',
        excerpt: 'Prepare for math olympiads with targeted problem-solving strategies and key topics every student must master.',
        tags: ['Olympiad', 'Mathematics'],
        likesCount: 27, commentsCount: 7, viewsCount: 380,
        publishedAt: '2026-02-01T00:00:00',
        featuredImageUrl: 'https://media.istockphoto.com/id/1148810339/photo/man-hand-holding-book-and-working-on-a-laptop-concept-education.jpg?s=612x612&w=0&k=20&c=JwwI4H57pZq2Rabf7-bumo6gwGgOSiKtF_uKrz5jiAc=',
    },
    {
        id: 6, slug: null,
        title: 'Top 5 Tips for Acing Your IGCSE Exams',
        excerpt: 'From time management to subject-specific strategies, here are five proven tips to score high in your IGCSE exams.',
        tags: ['IGCSE', 'Exam Tips'],
        likesCount: 35, commentsCount: 8, viewsCount: 460,
        publishedAt: '2026-02-10T00:00:00',
        featuredImageUrl: 'https://media.istockphoto.com/id/1295540236/photo/online-education-with-teacher.jpg?s=612x612&w=0&k=20&c=8ydrtl8szjcFpHIcvfHMazCNjGNe_zOf6eGaGnS0Prw=',
    },
];

export const HomePage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [usingFallback, setUsingFallback] = useState(false);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const response = await blogApi.getBlogs({ size: 6, sort: 'popular' });
                setBlogs(response.data.content);
            } catch (err) {
                // Backend offline — show static fallback content silently
                setBlogs(STATIC_BLOGS);
                setUsingFallback(true);
            } finally {
                setLoading(false);
            }
        };
        loadBlogs();
    }, []);

    return (
        <div>
            {/* Hero */}
            <section className="bg-bg-secondary border-b border-border-primary transition-colors duration-200">
                <div className="max-w-3xl mx-auto px-6 py-20 text-center">
                    <h1 className="text-5xl md:text-6xl font-black text-text-primary mb-4 tracking-tight animate-slide-down">
                        BlogPost
                    </h1>
                    <p className="text-lg md:text-xl text-text-secondary mb-8 animate-slide-up">
                        Discover, share, and write amazing tech content.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center animate-fade-in">
                        <Link to="/blogs/all"><button className="btn-primary">Explore Blogs <ArrowRight className="inline w-4 h-4 ml-1.5" /></button></Link>
                        <Link to="/blogs/submit"><button className="btn-secondary">Write Your Blog</button></Link>
                        <Link to="/blogs/subscribe"><button className="btn-outline">✉ Subscribe</button></Link>
                    </div>
                </div>
            </section>

            {/* Popular Blogs */}
            <section className="max-w-6xl mx-auto px-6 py-14">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-text-primary">Popular Blogs</h2>
                    <Link to="/blogs/all" className="text-sm text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1">
                        View all <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                {loading ? (
                    <Spinner size="lg" />
                ) : blogs.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-text-tertiary text-lg">No blogs yet. <Link to="/blogs/submit" className="text-text-primary underline">Submit the first one</Link>!</p>
                    </div>
                ) : (
                    <>
                        {usingFallback && (
                            <div className="mb-6 px-4 py-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
                                ⚠️ Backend server is offline. Showing sample blogs.
                            </div>
                        )}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog) => (
                            blog.slug ? (
                                <Link to={`/blogs/${blog.slug}`} key={blog.id}>
                                    <Card hover className="h-full">
                                        {blog.featuredImageUrl && (
                                            <img src={blog.featuredImageUrl} alt={blog.title} className="w-full h-44 object-cover rounded-lg mb-4" />
                                        )}
                                        <div className="space-y-2.5">
                                            <h3 className="text-lg font-semibold text-text-primary line-clamp-2">{blog.title}</h3>
                                            <p className="text-text-secondary text-sm line-clamp-2">{blog.excerpt}</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {blog.tags?.slice(0, 3).map((tag) => <TagBadge key={tag} tag={tag} />)}
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-text-tertiary pt-3 border-t border-border-secondary">
                                                <div className="flex items-center space-x-3">
                                                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{blog.likesCount}</span>
                                                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" />{blog.commentsCount}</span>
                                                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{blog.viewsCount}</span>
                                                </div>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {blog.publishedAt && format(new Date(blog.publishedAt), 'MMM dd')}
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                </Link>
                            ) : (
                                <div key={blog.id}>
                                    <Card className="h-full opacity-90">
                                        {blog.featuredImageUrl && (
                                            <img src={blog.featuredImageUrl} alt={blog.title} className="w-full h-44 object-cover rounded-lg mb-4" />
                                        )}
                                        <div className="space-y-2.5">
                                            <h3 className="text-lg font-semibold text-text-primary line-clamp-2">{blog.title}</h3>
                                            <p className="text-text-secondary text-sm line-clamp-2">{blog.excerpt}</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {blog.tags?.slice(0, 3).map((tag) => <TagBadge key={tag} tag={tag} />)}
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-text-tertiary pt-3 border-t border-border-secondary">
                                                <div className="flex items-center space-x-3">
                                                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{blog.likesCount}</span>
                                                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" />{blog.commentsCount}</span>
                                                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{blog.viewsCount}</span>
                                                </div>
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {blog.publishedAt && format(new Date(blog.publishedAt), 'MMM dd')}
                                                </span>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            )
                        ))}
                    </div>
                    </>
                )}
            </section>
        </div>
    );
};
