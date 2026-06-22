import React, { useState, useEffect } from 'react';
import { FileText, Clock, Users, CheckCircle, Eye } from 'lucide-react';
const Card = ({ className = '', children, onClick }) => (
  <div className={`bg-white rounded-xl shadow border border-gray-200 ${className}`} onClick={onClick}>{children}</div>
);
import { adminApi } from '../../api/blogApi';
import toast from 'react-hot-toast';

export const AdminHome = ({ setCurrentView }) => {
    const [stats, setStats] = useState({ total: 0, pending: 0, published: 0, subscribers: 0 });
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const loadStats = async () => {
            setIsUpdating(true);
            try {
                const blogsData = await adminApi.getAdminBlogs({ size: 1, page: 0 });
                const pendingData = await adminApi.getAdminBlogs({ status: 'PENDING', size: 1, page: 0 });
                const subsData = await adminApi.getSubscribers({ size: 1, page: 0 });

                setStats({
                    total: blogsData.totalElements || 0,
                    pending: pendingData.totalElements || 0,
                    published: (blogsData.totalElements || 0) - (pendingData.totalElements || 0),
                    subscribers: subsData.totalElements || 0,
                });
            } catch (err) {
                console.error('Failed to load stats', err);
            } finally {
                setIsUpdating(false);
            }
        };

        loadStats();
    }, []);

    const cards = [
        { label: 'Total Blogs', value: stats.total || 0, icon: FileText, color: 'text-blue-600' },
        { label: 'Pending Review', value: stats.pending || 0, icon: Clock, color: 'text-amber-600' },
        { label: 'Published', value: stats.published || 0, icon: CheckCircle, color: 'text-emerald-600' },
        { label: 'Subscribers', value: stats.subscribers || 0, icon: Users, color: 'text-indigo-600' },
    ];

    return (
        <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-blue-900">Admin blog</h1>
                {isUpdating && <span className="text-sm text-gray-500">updating...</span>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {cards.map((c) => (
                    <Card key={c.label} hover>
                        <c.icon className={`w-6 h-6 mb-2 ${c.color}`} />
                        <p className="text-sm text-gray-600">{c.label}</p>
                        <p className="text-3xl font-bold mt-1 text-blue-900">{c.value}</p>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card hover>
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('blog-moderation')}>
                        <div className="p-2.5 rounded-lg" style={{ backgroundColor: '#eff6ff' }}>
                            <Eye className="w-5 h-5 text-blue-900" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-900">Blog Moderation</h3>
                            <p className="text-gray-600 text-sm">Approve, reject, or edit submissions</p>
                        </div>
                    </div>
                </Card>
                <Card hover>
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('subscribers')}>
                        <div className="p-2.5 rounded-lg" style={{ backgroundColor: '#eff6ff' }}>
                            <Users className="w-5 h-5 text-blue-900" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-900">Manage Subscribers</h3>
                            <p className="text-gray-600 text-sm">View and manage email subscribers</p>
                        </div>
                    </div>
                </Card>
            </div>
        </div>
    );
};;
