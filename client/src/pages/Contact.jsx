import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  MessageSquare, 
  Twitter, 
  Facebook, 
  Instagram, 
  Linkedin 
} from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: "Email Us",
    value: "support@mocky.in",
    sub: "Response within 24 hours"
  },
  {
    icon: Phone,
    label: "Customer Support",
    value: "+91 98765 43210",
    sub: "Mon - Sat, 9am - 6pm"
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "Sector 62, Noida",
    sub: "Uttar Pradesh, India"
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! We'll get back to you soon.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="flex flex-col">
      {/* Header Section */}
      <section className="relative pt-20 pb-32 md:pt-40 md:pb-60 overflow-hidden">
        <div className="w-full px-4 md:px-12 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 tracking-tighter leading-none mb-12">
                Get in <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-600 to-accent italic">Touch.</span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-slate-500 font-bold max-w-3xl mx-auto mb-16 leading-relaxed">
                Have a question or need technical support? We're here to help you navigate your journey toward success.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="w-full px-4 md:px-12 grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-20">
        {/* Contact Form */}
        <div className="lg:col-span-3 bg-white/60 backdrop-blur-3xl p-8 md:p-20 rounded-[4rem] border border-white shadow-3xl shadow-indigo-100/30 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px] -ml-32 -mt-32"></div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-12 flex items-center relative z-10 tracking-tight">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-[2rem] bg-primary/10 flex items-center justify-center mr-6 shadow-xl shadow-primary/5">
               <MessageSquare className="w-7 h-7 md:w-8 md:h-8 text-primary" />
            </div>
            Drop a Message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-10 py-6 bg-white/50 border border-white rounded-[2.5rem] focus:ring-8 focus:ring-primary/5 focus:border-primary outline-none transition-all font-black text-xl placeholder:text-slate-300"
                  placeholder="Master Zahid"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-10 py-6 bg-white/50 border border-white rounded-[2.5rem] focus:ring-8 focus:ring-primary/5 focus:border-primary outline-none transition-all font-black text-xl placeholder:text-slate-300"
                  placeholder="zahid@mocky.in"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Subject</label>
              <input
                type="text"
                required
                className="w-full px-10 py-6 bg-white/50 border border-white rounded-[2.5rem] focus:ring-8 focus:ring-primary/5 focus:border-primary outline-none transition-all font-black text-xl placeholder:text-slate-300"
                placeholder="Technical Support / Billing"
                value={formData.subject}
                onChange={(e) => setFormData({...formData, subject: e.target.value})}
              />
            </div>
            <div className="space-y-4">
              <label className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Your Thoughts</label>
              <textarea
                required
                rows="6"
                className="w-full px-10 py-8 bg-white/50 border border-white rounded-[3rem] focus:ring-8 focus:ring-primary/5 focus:border-primary outline-none transition-all font-black text-xl placeholder:text-slate-300 resize-none"
                placeholder="I'd love to know more about..."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center px-12 py-7 bg-slate-900 text-white rounded-[3rem] font-black text-2xl shadow-3xl shadow-slate-900/30 hover:bg-primary hover:scale-[1.02] active:scale-95 transition-all duration-500 group"
            >
              Start Conversation
              <Send className="ml-5 w-8 h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
            </button>
          </form>
        </div>

        {/* Info & Social */}
        <div className="lg:col-span-2 space-y-12">
          <div className="bg-gradient-to-br from-white/80 to-peace/80 backdrop-blur-2xl p-14 rounded-[4rem] border border-white shadow-3xl shadow-indigo-100/40 relative overflow-hidden">
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]"></div>
            <h3 className="text-3xl font-black text-slate-900 mb-14 tracking-tight relative z-10">Quick Support</h3>
            <div className="space-y-12 relative z-10">
              {contactInfo.map((info, i) => (
                <div key={i} className="flex items-start space-x-8 group">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-[2.5rem] bg-white shadow-xl shadow-primary/5 border border-white flex items-center justify-center flex-shrink-0 group-hover:rotate-12 transition-all duration-500 group-hover:bg-primary group-hover:text-white">
                    <info.icon size={32} />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-3">{info.label}</h4>
                    <p className="text-2xl md:text-3xl font-black text-slate-900 leading-none mb-2">{info.value}</p>
                    <p className="text-lg font-bold text-slate-500">{info.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 p-14 rounded-[4rem] border border-primary/5 text-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <h3 className="text-2xl font-black text-slate-900 mb-12 relative z-10 tracking-tight">Social Presence</h3>
            <div className="flex justify-center flex-wrap gap-8 relative z-10">
              {[Twitter, Facebook, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center text-slate-400 hover:text-primary hover:scale-125 transition-all shadow-xl hover:shadow-primary/30 border border-white">
                  <Icon size={32} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
