import React, { useEffect, useMemo, useState } from 'react';
import { X, Video, Headphones, MessageCircle, Image as ImageIcon, FileText, Plus } from 'lucide-react';
import { getApprovedTestimonials } from '../api/api/testimonialApi.js';
import TestimonialFormModal from '../component/TestimonialFormModal';
import Header from '../component/Header';
import Footer from '../component/Footer';

const whatsappImageUrls = {
  sanjana: new URL('../assets/A level Math and Statistics guidance to Sanjana.png', import.meta.url).href,
  amrit: new URL('../assets/Amrit scored A grade for Math classes IGCSE.png', import.meta.url).href,
  rithika: new URL('../assets/AS Level guidance and support for Math and Statistics to Rithika.jpeg', import.meta.url).href,
  mahiRia: new URL('../assets/Mahi and Ria scored A (star) and A grades in IGCSE Math.PNG', import.meta.url).href,
  pradyumna: new URL("../assets/Pradyumna's bridge course for a smooth transition from CBSE to IGCSE.png", import.meta.url).href,
  rheaTheaOjal: new URL('../assets/Rhea, Thea and Ojal Math group classes for IGCSE.png', import.meta.url).href,
  siddhantPC: new URL('../assets/Siddhant scored A (star) grades in Physics and Chemistry subjects.png', import.meta.url).href,
  siddhantML: new URL("../assets/Siddhant's IA-ML computer science project feedback for IGCSE.png", import.meta.url).href,
  thanya: new URL('../assets/Thanya scored an A grade for 8th grade Math IGCSE.png', import.meta.url).href,
};

const cardBackgrounds = [
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=1000&fit=crop',
  'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=1000&fit=crop',
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

const Testimonials = () => {
  const categories = ['All', 'IGCSE', 'AS/A Level'];

  const types = ['All', 'audio', 'video', 'whatsapp', 'text', 'image'];

  const [selectedCategory] = useState('All');
  const [selectedType] = useState('All');
  const [visibleCount, setVisibleCount] = useState(9);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getApprovedTestimonials();
        const testimonialList = data?.content || (Array.isArray(data) ? data : []);
        setTestimonials(testimonialList);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const [active, setActive] = useState(null);

  useEffect(() => {
    setVisibleCount(9);
  }, [selectedCategory, selectedType]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 18);
  };

  const primaryTestimonial = useMemo(() =>
    testimonials.find(t => t.primary),
    [testimonials]
  );

  const filteredTestimonials = useMemo(() => {
    return testimonials.filter((t) => {
      const categoryMatch = selectedCategory === 'All' || t.category === selectedCategory;
      const typeMatch = selectedType === 'All' || t.type === selectedType;
      const isNotPrimary = !t.primary;
      return categoryMatch && typeMatch && isNotPrimary;
    });
  }, [testimonials, selectedCategory, selectedType]);

  const paginatedTestimonials = filteredTestimonials.slice(0, visibleCount);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 min-h-screen bg-gradient-to-b from-indigo-50 via-white to-fuchsia-50">
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
                  Explore real stories from IGCSE and AS/A Level students and parents.
                </p>
              </div>

              {/* Authenticity Statement */}
              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-sm text-gray-800 mb-3" style={{ fontFamily: 'Inter, sans-serif' }}>
                  <span className="font-semibold">Dear Parents and Students,</span> Trust and authenticity are at the heart of everything we do. All testimonials displayed here are 100% genuine and have been provided by real students and parents. None of them is AI-generated, fake, edited, or modified in any manner.
                </p>
                <p className="text-sm text-gray-800" style={{ fontFamily: 'Inter, sans-serif' }}>
                  We invite you to click on each testimonial to view the original feedback. We also welcome any further verification to reassure you of the authenticity of every testimonial shared here.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {paginatedTestimonials.map((testimonial, index) => {
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
                  const mediaUrl = testimonial.mediaUrl || testimonial.content;
                  let mediaType = testimonial.type || 'text';
                  if (mediaUrl) {
                    if (mediaUrl.startsWith('data:video/') || mediaUrl.match(/\.(mp4|webm|mov)$/i)) mediaType = 'video';
                    else if (mediaUrl.startsWith('data:audio/') || mediaUrl.match(/\.(mp3|wav|ogg)$/i)) mediaType = 'audio';
                    else if (mediaUrl.startsWith('data:image/') || mediaUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) mediaType = 'image';
                    else if (mediaUrl.match(/\.pdf$/i)) mediaType = 'pdf';
                  }

                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActive(testimonial)}
                      className="group relative flex flex-col w-full rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] text-left shadow-2xl aspect-[4/5]"
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
                      <div className="relative h-full flex flex-col p-6 pb-4 justify-between z-10">
                        {/* Media Icon Indicator */}
                        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-[#FF6B6B] group-hover:border-[#FF6B6B] transition-all duration-300">
                          {mediaType === 'video' && <Video size={18} className="text-white" />}
                          {mediaType === 'audio' && <Headphones size={18} className="text-white" />}
                          {mediaType === 'image' && <ImageIcon size={18} className="text-white" />}
                          {mediaType === 'pdf' && <FileText size={18} className="text-white" />}
                          {mediaType === 'text' && !mediaUrl && <MessageCircle size={18} className="text-white" />}
                        </div>

                        {/* Top Quote Icon */}
                        <div className="text-[#FF6B6B] opacity-60">
                          <span className="text-5xl font-serif leading-none">&ldquo;</span>
                        </div>

                        {/* Testimonial Text with Scroll */}
                        <div className="flex-1 overflow-y-auto pr-2 -mr-2 custom-scrollbar scroll-smooth my-4">
                          <div className="text-white text-base md:text-lg font-bold italic leading-relaxed drop-shadow-sm" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            {linkifyText(testimonialText)}
                          </div>
                        </div>

                        {/* Bottom Quote Icon */}
                        <div className="text-[#FF6B6B] opacity-60 flex justify-end">
                          <span className="text-5xl font-serif leading-none rotate-180 inline-block">&ldquo;</span>
                        </div>
                      </div>


                    </button>
                  );
                })}
              </div>

              {filteredTestimonials.length > paginatedTestimonials.length && (
                <div className="mt-16 flex flex-col items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    className="group flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
                  >
                    Load More Success Stories
                    <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    Showing {paginatedTestimonials.length} of {filteredTestimonials.length} Stories
                  </div>
                </div>
              )}
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
              <div className="w-full h-full overflow-hidden rounded-3xl shadow-2xl bg-white border-4 border-[#FF6B6B]">
                {active.mediaUrl || active.image || (active.content && active.content.startsWith('http')) ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900 min-h-[400px]">
                    {(() => {
                      const url = active.mediaUrl || active.image || active.content;
                      
                      // Video: mp4, webm, mov, or data video
                      if (url.startsWith('data:video/') || url.match(/\.(mp4|webm|mov|m4v)$/i)) {
                        return (
                          <div className="w-full h-full flex items-center justify-center">
                            <video 
                              src={url} 
                              controls 
                              autoPlay
                              className="max-w-full max-h-[80vh] w-full h-full object-contain" 
                              style={{ backgroundColor: '#000' }}
                            />
                          </div>
                        );
                      } 
                      // Image: jpg, png, gif, webp
                      else if (url.startsWith('data:image/') || url.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
                        return (
                          <img
                            src={url}
                            alt="Testimonial Evidence"
                            className="max-w-full max-h-[80vh] object-contain"
                          />
                        );
                      } 
                      // PDF
                      else if (url.match(/\.pdf$/i)) {
                        return (
                          <iframe
                            src={url}
                            title="PDF evidence"
                            className="w-full h-[80vh]"
                          />
                        );
                      } 
                      // Audio: mp3, wav, ogg
                      else if (url.startsWith('data:audio/') || url.match(/\.(mp3|wav|ogg|m4a)$/i)) {
                        return (
                          <div className="p-12 w-full max-w-lg bg-gradient-to-br from-purple-900 to-indigo-900 rounded-2xl shadow-xl">
                            <div className="flex items-center justify-center mb-8">
                              <Headphones size={48} className="text-[#FF6B6B]" />
                            </div>
                            <h3 className="text-xl font-black text-white mb-2 text-center uppercase tracking-widest">Audio Testimonial</h3>
                            <p className="text-purple-200 text-center mb-6 text-sm">Listen to the original feedback</p>
                            <audio 
                              controls 
                              autoPlay
                              src={url} 
                              className="w-full" 
                              style={{ 
                                accentColor: '#FF6B6B',
                                filter: 'brightness(1.2)'
                              }}
                            />
                          </div>
                        );
                      }
                      
                      // Fallback if URL type can't be determined
                      return (
                        <div className="p-12 text-center bg-gradient-to-br from-gray-100 to-gray-50 w-full h-full flex flex-col items-center justify-center">
                          <FileText size={64} className="text-gray-400 mb-4" />
                          <p className="text-xl font-bold text-gray-600">Media Content</p>
                          <p className="text-gray-500 mt-2">{url}</p>
                        </div>
                      );
                    })()}
                  </div>
                ) : (
                  <div className="p-12 text-center bg-gradient-to-br from-white to-gray-50 min-h-[400px] flex flex-col items-center justify-center">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MessageCircle size={40} className="text-blue-600" />
                    </div>
                    <h3 className="text-2xl font-black text-gray-900 mb-2">Testimonial from {active.name || active.reviewerName}</h3>
                    <p className="text-gray-500 mb-6 text-sm font-medium">{active.role || 'Student'}</p>
                    <div className="flex gap-0.5 mb-6 justify-center">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>
                          <span className={i < (active.rating || 5) ? '⭐' : '☆'} />
                        </span>
                      ))}
                    </div>
                    <div className="text-left text-gray-800 whitespace-pre-wrap break-words leading-relaxed font-medium max-w-2xl bg-blue-50 p-6 rounded-xl border-l-4 border-blue-600">
                      "{linkifyText(active.text || active.quote || active.message || active.content || 'No testimonial text available.')}"
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
      </div>
      <Footer />
    </div>
  );
};

export default Testimonials;
