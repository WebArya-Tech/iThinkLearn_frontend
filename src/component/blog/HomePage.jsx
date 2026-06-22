import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogApi } from '../../api/blogApi';
import { Card, Badge, Spinner, TagBadge } from '../ui';
import { Clock, Heart, MessageCircle, Eye, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';
import React from 'react';

export const HomePage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const response = await blogApi.getBlogs({ size: 6, sort: 'popular' });
                setBlogs(response.content);
            } catch (err) {
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };
        loadBlogs();
    }, []);

    return (
        <div className="overflow-x-hidden">
            {/* Hero */}
            <section className="bg-white ">
                <div className="max-w-3xl mx-auto px-6 py-10 text-center">
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
