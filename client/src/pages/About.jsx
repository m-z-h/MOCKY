import React from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Award, Shield, BookOpen, Heart } from 'lucide-react';

const values = [
  {
    title: "Student-First Approach",
    description: "Every feature we build is designed with the student's success in mind.",
    icon: Heart
  },
  {
    title: "Scientific Preparation",
    description: "Our mock tests and analytics are based on actual exam patterns and data.",
    icon: Target
  },
  {
    title: "Inclusivity",
    description: "We believe in making quality education accessible to every aspirant.",
    icon: Users
  }
];

const About = () => {
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
                Our <span className="text-primary italic">Story.</span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-slate-500 font-bold max-w-3xl mx-auto mb-16 leading-relaxed">
                MOCKY was born from a simple vision: to create the world's most effective and student-friendly exam preparation environment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="px-6 md:px-12 pb-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-3xl group-hover:bg-primary/30 transition-all rounded-full p-20"></div>
              <div className="relative bg-white/60 backdrop-blur-3xl p-14 rounded-[4rem] border border-white shadow-3xl shadow-indigo-100/30">
                 <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-10 tracking-tight">The Mission</h2>
                 <p className="text-xl text-slate-500 font-bold leading-relaxed mb-8">
                    We've seen students struggle with outdated interfaces and complex analytics. Our mission is to simplify the journey toward NEET and JEE excellence.
                 </p>
                 <ul className="space-y-6">
                    {[
                      { text: "100% Reliable Exam Simulations", icon: Shield },
                      { text: "AI-Powered Weak Area Detection", icon: Target },
                      { text: "Premium Study Resources", icon: BookOpen },
                      { text: "A Community of 50k+ Aspirants", icon: Users }
                    ].map((item, i) => (
                      <li key={i} className="flex items-center text-xl font-black text-slate-700">
                        <item.icon className="w-8 h-8 mr-6 text-primary" />
                        {item.text}
                      </li>
                    ))}
                 </ul>
              </div>
           </div>
           
           <div className="space-y-12">
              <h2 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter">Better results through <br/><span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">better design.</span></h2>
              <p className="text-xl md:text-2xl text-slate-500 font-bold leading-relaxed">
                We believe that preparation shouldn't be stressful. By combining a peaceful aesthetic with high-performance tools, we help you achieve your goals without burnout.
              </p>
              <div className="grid grid-cols-2 gap-8">
                 <div className="p-10 bg-primary/5 rounded-[3rem] border border-primary/5">
                    <h4 className="text-4xl font-black text-primary mb-2">98%</h4>
                    <p className="text-lg text-slate-500 font-black uppercase tracking-widest">Student Rating</p>
                 </div>
                 <div className="p-10 bg-accent/5 rounded-[3rem] border border-accent/5">
                    <h4 className="text-4xl font-black text-accent mb-2">24/7</h4>
                    <p className="text-lg text-slate-500 font-black uppercase tracking-widest">Support Portal</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 md:px-12 pb-40">
        <div className="w-full text-center mb-24">
          <h2 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">What We <span className="text-accent underline decoration-primary/20 decoration-8 underline-offset-8">Stand For</span></h2>
          <p className="text-xl md:text-2xl text-slate-500 font-black leading-relaxed max-w-3xl mx-auto">Our core values drive every pixel we design and every line of code we write for your excellence.</p>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          {values.map((value, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -15, scale: 1.03 }}
              className="p-14 rounded-[4rem] bg-white/60 backdrop-blur-3xl border border-white shadow-3xl shadow-primary/5 hover:shadow-primary/20 transition-all duration-500 group relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-peace to-white border border-white text-primary mb-12 shadow-xl group-hover:bg-primary group-hover:text-white transition-all duration-500">
                <value.icon className="w-10 h-10" />
              </div>
              <h3 className="text-3xl lg:text-4xl font-black text-slate-900 mb-8 leading-tight tracking-tight">{value.title}</h3>
              <p className="text-xl text-slate-500 font-bold leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
