import React from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Target, 
  Zap, 
  Users, 
  Award, 
  ArrowRight,
  CheckCircle2,
  Clock,
  BarChart3
} from 'lucide-react';
import { Link } from 'react-router-dom';

const features = [
  {
    title: "Realistic Exam Simulator",
    description: "Experience the actual NEET/JEE interface with our precisely timed mock tests.",
    icon: Target,
    color: "bg-primary"
  },
  {
    title: "Performance Analytics",
    description: "Deep dive into your strengths and weaknesses with our AI-driven reports.",
    icon: BarChart3,
    color: "bg-secondary"
  },
  {
    title: "Curated Study Material",
    description: "Access high-quality notes and previous year papers curated by experts.",
    icon: Zap,
    color: "bg-accent"
  }
];

const Home = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 md:pt-40 md:pb-60 overflow-hidden">
        <div className="w-full px-4 md:px-12 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center px-6 py-2 rounded-full bg-primary/10 text-primary text-sm font-black tracking-widest uppercase mb-10 border border-primary/20">
                🚀 The Future of NEET/JEE Prep
              </span>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-slate-900 tracking-tighter leading-[0.85] mb-12">
                Master Your <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-600 to-accent italic">
                  Dreams.
                </span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-slate-500 font-bold max-w-3xl mx-auto mb-16 leading-relaxed">
                Experience India's most advanced mock test platform. Tailored for aspirants who aim for the top ranks.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-12 py-6 rounded-[2rem] bg-slate-900 text-white text-xl font-black shadow-3xl shadow-slate-900/30 hover:bg-primary hover:scale-105 transition-all duration-300 flex items-center justify-center group"
                >
                  Get Started Free
                  <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link
                  to="/about"
                  className="w-full sm:w-auto px-12 py-6 rounded-[2rem] bg-white/60 backdrop-blur-xl text-slate-900 text-xl font-black border border-white shadow-xl hover:bg-white/80 transition-all"
                >
                  Explore Platform
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 skewed-y-3 transform scale-110 -z-10"></div>
        <div className="w-full px-4 md:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-24">
            {[
              { label: "Active Students", value: "50k+", icon: Users },
              { label: "Mock Tests", value: "1,200+", icon: Target },
              { label: "Success Stories", value: "5k+", icon: Award },
              { label: "Daily Logins", value: "10k+", icon: Zap }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="flex justify-center mb-6 text-primary transform group-hover:scale-125 transition-transform duration-500">
                  <stat.icon size={42} strokeWidth={2.5} />
                </div>
                <h4 className="text-4xl md:text-5xl font-black text-slate-900 mb-2 tracking-tight">{stat.value}</h4>
                <p className="text-xs md:text-sm font-black text-slate-400 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-40 relative px-4 md:px-0">
        <div className="w-full px-4 md:px-12">
          <div className="text-center mb-32">
            <span className="text-primary font-black uppercase tracking-[0.3em] text-sm mb-6 block">Why We Are Better</span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-900 tracking-tight mb-10 leading-none">Fuel Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-indigo-500 to-accent italic">Potential</span></h2>
            <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-black leading-relaxed">
              We've built tools that are both powerful and eye-relaxing, helping you study longer and better.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15, scale: 1.03 }}
                className="bg-white/60 backdrop-blur-3xl p-14 rounded-[4rem] border border-white shadow-3xl shadow-indigo-100/30 hover:shadow-primary/20 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors"></div>
                <div className={`${feature.color} w-24 h-24 rounded-[2.5rem] flex items-center justify-center mb-12 shadow-2xl shadow-primary/20 transform group-hover:rotate-12 transition-transform duration-500`}>
                  <feature.icon className="text-white w-12 h-12" />
                </div>
                <h3 className="text-3xl lg:text-4xl font-black text-slate-900 mb-8 leading-tight tracking-tight">{feature.title}</h3>
                <p className="text-xl text-slate-500 font-bold leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40">
        <div className="w-full px-4 md:px-12">
          <div className="relative rounded-[5rem] overflow-hidden p-12 md:p-32 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-indigo-600 to-accent opacity-90"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-10">
                Ready to Crush Your <br /> Exams?
              </h2>
              <p className="text-xl md:text-2xl text-white/80 font-bold mb-16 max-w-2xl mx-auto leading-relaxed">
                Join thousands of aspirants who are already mastering their prep with Mocky. Your rank is waiting.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-16 py-8 rounded-[2.5rem] bg-white text-primary text-2xl font-black shadow-2xl hover:scale-105 transition-transform"
                >
                  Join Now
                </Link>
                <Link
                  to="/login"
                  className="w-full sm:w-auto px-16 py-8 rounded-[2.5rem] bg-primary-dark/20 backdrop-blur-lg text-white text-2xl font-black border border-white/30 hover:bg-white/10 transition-all"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
