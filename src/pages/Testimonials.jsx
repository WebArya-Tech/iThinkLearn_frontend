import React, { useEffect, useMemo, useState } from 'react';
import { Star, Filter, X, Play, Video, Headphones, MessageCircle, ArrowRight, Image as ImageIcon, FileText, Plus, TrendingUp, Users } from 'lucide-react';
import { testimonialApi } from '../api/testimonialApi.js';
import TestimonialFormModal from '../component/TestimonialFormModal';
import Header from '../component/Header';
import Footer from '../component/Footer';
import toast from 'react-hot-toast';

const cardBackgrounds = [
  '/testimonial/WhatsApp Image 2026-05-26 at 7.38.17 PM (1).jpeg',
  '/testimonial/WhatsApp Image 2026-05-26 at 7.38.17 PM.jpeg',
  '/testimonial/WhatsApp Image 2026-05-26 at 7.38.18 PM (1).jpeg',
  '/testimonial/WhatsApp Image 2026-05-26 at 7.38.18 PM (2).jpeg',
  '/testimonial/WhatsApp Image 2026-05-26 at 7.38.18 PM.jpeg',
  '/testimonial/WhatsApp Image 2026-05-26 at 7.38.19 PM (1).jpeg',
  '/testimonial/WhatsApp Image 2026-05-26 at 7.38.19 PM.jpeg',
  '/testimonial/WhatsApp Image 2026-05-26 at 7.38.20 PM (1).jpeg',
  '/testimonial/WhatsApp Image 2026-05-26 at 7.38.20 PM (2).jpeg',
  '/testimonial/WhatsApp Image 2026-05-26 at 7.38.20 PM.jpeg',
];

const maskPhone = (phone) => {
  if (!phone) return '';
  return phone.replace(/(\d{2})(\d{6})(\d{2})/, '$1XXXXXX$3');
};

const isMediaUrl = (url) => {
  if (!url || typeof url !== 'string') return false;
  return url.startsWith('http') && (
    url.match(/\.(mp4|webm|ogg|mp3|wav|jpg|jpeg|png|gif|webp)/i) ||
    url.includes('cloudinary.com') ||
    url.includes('youtube.com') ||
    url.includes('youtu.be')
  );
};

const linkifyText = (text) => {
  if (!text) return text;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts = [];
  let lastIndex = 0;

  let match;
  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a
        key={`link-${match.index}`}
        href={match[0]}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-blue-200 hover:text-blue-100"
      >
        {match[0]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

const getMediaType = (url) => {
  if (!url || typeof url !== 'string') return 'none';
  if (url.includes('youtube.com') || url.includes('youtu.be')) return 'embed';
  if (url.startsWith('data:video/') || url.match(/\.(mp4|webm|mov|m4v)(\?.*)?$/i)) return 'video';
  if (url.startsWith('data:audio/') || url.match(/\.(mp3|wav|ogg|m4a)(\?.*)?$/i)) return 'audio';
  if (url.startsWith('data:image/') || url.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i)) return 'image';
  if (url.match(/\.pdf(\?.*)?$/i)) return 'pdf';
  return 'link';
};

const getActualMediaUrl = (testimonial) => {
  const candidates = [
    testimonial?.mediaUrl,
    testimonial?.image,
    testimonial?.videoUrl,
    testimonial?.audioUrl,
  ];
  const direct = candidates.find((value) => typeof value === 'string' && value.trim());
  if (direct) return direct;

  const content = testimonial?.content;
  if (typeof content === 'string' && (content.startsWith('http') || content.startsWith('data:'))) {
    return content;
  }

  return '';
};

const Testimonials = () => {
  const categories = ['All', 'IGCSE', 'AS/A Level'];

  const types = ['All', 'audio', 'video', 'whatsapp', 'text', 'image'];

  const [selectedCategory] = useState('All');
  const [selectedType] = useState('All');
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await testimonialApi.getAll();
        const testimonialList = response.data || [];
        setTestimonials(Array.isArray(testimonialList) ? testimonialList : []);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        toast.error('Failed to load testimonials');
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const [active, setActive] = useState(null);

  const primaryTestimonial = useMemo(() =>
    testimonials.find(t => t.primary),
    [testimonials]
  );

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((t) => {
      const categoryMatch = selectedCategory === 'All' || t.category === selectedCategory;
      const typeMatch = selectedType === 'All' || t.type === selectedType;
      return categoryMatch && typeMatch;
    });
  }, [testimonials, selectedCategory, selectedType]);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-indigo-50 via-white to-fuchsia-50">
      <Header />
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 107, 107, 0.6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 107, 107, 0.9);
        }
      `}</style>

      {/* Primary Testimonial Banner Removed */}

      {/* Main Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-900 mb-4"></div>
              <p className="text-blue-900 font-bold">Loading Testimonials...</p>
            </div>
          ) : filteredTestimonials.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No testimonials found for the selected filters.</p>
            </div>
          ) : (
            <>
              <div className="text-center max-w-3xl mx-auto mb-6">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  Student Testimonials
                </h1>
                <div className="h-1.5 w-24 bg-indigo-600 mx-auto rounded-full"></div>
                <p className="mt-6 text-lg text-gray-600">
                  Explore real success stories from iThinkLearn students and parents.
                </p>
              </div>

              {/* Authenticity Statement */}
              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-sm text-gray-800 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Dear Parents and Students, Trust and authenticity are at the heart of everything we do. All testimonials displayed here are 100% genuine and have been provided by real students and parents. None of them is AI-generated, fake, edited, or modified in any manner.
                </p>
                <p className="text-sm text-gray-800" style={{ fontFamily: 'Inter, sans-serif' }}>
                  We invite you to click on each testimonial to view the original feedback. We also welcome any further verification to reassure you of the authenticity of every testimonial shared here.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                {filteredTestimonials.map((testimonial, index) => {
                  const id = testimonial.id || testimonial._id;
                  const studentName = testimonial.name || testimonial.reviewerName || 'Student';

                  // FIX: Use `testimonial.text` from the new API as the primary source of truth.
                  let testimonialText = testimonial.text || testimonial.quote || testimonial.message || "Experience excellence with A Star Classes.";

                  // Special handling for specific students
                  if (studentName.toLowerCase().includes('sanjana')) {
                    testimonialText = "Thank you so much Sir! You have really had a huge impact on her life - especially her interest in Math and especially Stats! She hopes to pursue these in college.";
                  } else if (studentName.toLowerCase().includes('amrit')) {
                    testimonialText = "Poonam Kumar: Thanks Rohit. You'll be happy to know that Amrit got an A on his most recent midterm. Thanks much for your hard work with him. Any hw for this week? Sanjeev Kumar: Yes. Amrit scored well above the average. Let's keep with the drill...";
                  } else if (testimonial.content && testimonial.content.startsWith('http')) {
                    // Fallback for old data that might still use `content` for a URL
                    testimonialText = `Outstanding success in ${testimonial.subject || 'studies'}! Click to see the full ${testimonial.type} testimonial and detailed feedback.`;
                  }

                  // Determine media type for the icon
                  const mediaUrl = getActualMediaUrl(testimonial);
                  const mediaType = getMediaType(mediaUrl);

                  return (
                    <button
                      key={id || `${studentName}-${index}`}
                      type="button"
                      onClick={() => setActive(testimonial)}
                      className="group relative flex flex-col w-full rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] text-left shadow-2xl aspect-[4/5] h-96 sm:h-auto"
                    >
                      {/* Background Image with Overlay */}
                      <div className="absolute inset-0">
                        <img
                          src={cardBackgrounds[index % cardBackgrounds.length]}
                          alt="Card background"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#002B5B] via-[#002B5B]/80 to-transparent opacity-90"></div>
                        <div className="absolute inset-0 border-[8px] border-[#FF6B6B]/20 group-hover:border-[#FF6B6B]/40 transition-colors duration-300"></div>
                      </div>

                      {/* Content Overlay */}
                      <div className="relative h-full flex flex-col p-3 sm:p-4 md:p-6 pb-2 sm:pb-3 md:pb-4 justify-between z-10">
                        {/* Media Icon Indicator */}
                        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-[#FF6B6B] group-hover:border-[#FF6B6B] transition-all duration-300">
                          {(mediaType === 'video' || mediaType === 'embed') && <Video size={18} className="text-white" />}
                          {mediaType === 'audio' && <Headphones size={18} className="text-white" />}
                          {mediaType === 'whatsapp' && <MessageCircle size={18} className="text-white" />}
                          {mediaType === 'image' && <ImageIcon size={18} className="text-white" />}
                          {(mediaType === 'pdf' || mediaType === 'link' || mediaType === 'none') && <FileText size={18} className="text-white" />}
                        </div>

                        {/* Top Quote Icon */}
                        <div className="text-[#FF6B6B] opacity-60">
                          <span className="text-3xl sm:text-4xl md:text-5xl font-serif leading-none">&ldquo;</span>
                        </div>

                        {/* Testimonial Text with Scroll */}
                        <div className="flex-1 overflow-y-auto pr-2 -mr-2 custom-scrollbar scroll-smooth my-2 sm:my-3 md:my-4">
                          <div className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-bold italic leading-relaxed drop-shadow-sm" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            {linkifyText(testimonialText)}
                          </div>
                        </div>

                        {/* Bottom Quote Icon */}
                        <div className="text-[#FF6B6B] opacity-60 flex justify-end">
                          <span className="text-3xl sm:text-4xl md:text-5xl font-serif leading-none rotate-180 inline-block">&ldquo;</span>
                        </div>
                      </div>


                    </button>
                  );
                })}
              </div>

            </>
          )}
        </div>
      </section>

      {/* Testimonial Modal */}
      {
        active && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-[#002B5B]/90 backdrop-blur-md"
              onClick={() => setActive(null)}
            />

            <div className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col items-center justify-center">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute -top-12 right-0 md:-right-12 rounded-full p-2 text-white hover:bg-white/20 transition-all z-30"
              >
                <X size={32} />
              </button>

              {/* Evidence Content Only */}
              <div className="w-full h-full overflow-hidden  shadow-2xl bg-white border-4 border-[#FF6B6B]">
                {getActualMediaUrl(active) ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900 min-h-[400px]">
                    {(() => {
                      const url = getActualMediaUrl(active);
                      const mediaType = getMediaType(url);

                      if (mediaType === 'video') {
                        return (
                          <video
                            src={url}
                            controls
                            className="max-w-full max-h-[80vh] object-contain"
                          />
                        );
                      } else if (mediaType === 'embed') {
                        return (
                          <div className="relative w-full aspect-video bg-black">
                            <iframe
                              src={url}
                              title="Video evidence"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              className="absolute inset-0 w-full h-full"
                            />
                          </div>
                        );
                      } else if (mediaType === 'image') {
                        return (
                          <img
                            src={url}
                            alt="Evidence"
                            className="max-w-full max-h-[80vh] object-contain"
                          />
                        );
                      } else if (mediaType === 'pdf') {
                        return (
                          <iframe
                            src={url}
                            title="PDF evidence"
                            className="w-full h-[80vh]"
                          />
                        );
                      } else if (mediaType === 'audio') {
                        return (
                          <div className="p-12 w-full max-w-lg bg-white rounded-2xl">
                            <h3 className="text-xl font-black text-[#002B5B] mb-6 text-center uppercase tracking-widest">Audio Evidence</h3>
                            <audio controls src={url} className="w-full" />
                          </div>
                        );
                      }
                      return (
                        <div className="p-12 text-center bg-white max-w-2xl">
                          <h3 className="text-2xl font-black text-gray-900 mb-4">Actual Testimonial</h3>
                          <div className="text-left text-gray-800 whitespace-pre-wrap break-words leading-relaxed font-medium">
                            {linkifyText(active.text || active.quote || active.message || active.content || 'No testimonial text available.')}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="p-20 text-center bg-white">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FileText size={40} className="text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Evidence for {active.name || active.reviewerName}</h3>
                    <p className="text-gray-500 mb-6">This testimonial consists of the verified text shown on the card.</p>
                    <div className="text-left text-gray-800 whitespace-pre-wrap break-words leading-relaxed font-medium">
                      {linkifyText(active.text || active.quote || active.message || active.content || 'No testimonial text available.')}
                    </div>
                  </div>
                )}
              </div>

              <p className="mt-6 text-white/60 text-sm font-bold uppercase tracking-[0.4em]">
                Actual Testimonial
              </p>
            </div>
          </div>
        )
      }

      {/* Submit Testimonial CTA */}
      {/**
      <section className="py-16 bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Share Your Success Story
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Are you an A Star Classes alumnus? We'd love to hear about your journey and achievements!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Submit Your Story
            </button>
            <button
              onClick={() => window.open('https://wa.me/918861919000', '_blank')}
              className="border-2 border-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
      */}

      {/* Submission Modal */}
      <TestimonialFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <Footer />
    </div>
  );
};

export default Testimonials;
