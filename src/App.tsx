import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Check, Star, ArrowRight, Search, Menu, X, Activity, ShieldCheck, MessageSquare, 
  BarChart3, Users, FileText, ChevronRight 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Context
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animations
      gsap.from('.hero-text', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.2
      });

      gsap.from('.hero-chip', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.6
      });

      // Philosophy Parallax & Text Reveal
      gsap.from('.philosophy-text', {
        scrollTrigger: {
          trigger: '.philosophy-section',
          start: 'top 70%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power2.out'
      });

      // Feature Cards
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out'
      });
      
      // Chart Animation
      gsap.to('.chart-bar-fill', {
        scrollTrigger: {
          trigger: '.features-section',
          start: 'top 60%',
        },
        width: (index, target) => target.dataset.width,
        duration: 1.5,
        ease: 'power2.out',
        stagger: 0.2
      });

      // How It Works Sticky Cards
      const cards = gsap.utils.toArray('.process-card');
      cards.forEach((card: any, i) => {
        ScrollTrigger.create({
          trigger: card,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          end: 'bottom top',
          onEnter: () => {
            if (i > 0) {
               gsap.to(cards[i - 1], { scale: 0.9, opacity: 0.5, filter: 'blur(20px)', duration: 0.5 });
            }
          },
          onLeaveBack: () => {
            if (i > 0) {
               gsap.to(cards[i - 1], { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.5 });
            }
          }
        });
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="bg-background text-supporting font-sans selection:bg-accent selection:text-white min-h-screen relative overflow-x-hidden">
      {/* Noise Overlay */}
      <div className="noise-overlay" />

      {/* Navbar */}
      <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-5xl transition-all duration-300 rounded-full px-6 py-3 flex items-center justify-between ${scrolled ? 'bg-white/80 backdrop-blur-xl border border-gray-100 shadow-sm' : 'bg-transparent text-white'}`}>
        <div className={`font-bold text-lg tracking-tight ${scrolled ? 'text-supporting' : 'text-white'}`}>
          bestreviews.co.uk
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {['Household', 'Garden', 'Tech', 'About'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className={`text-sm font-medium hover:-translate-y-[1px] transition-transform ${scrolled ? 'text-supporting/80 hover:text-accent' : 'text-white/90 hover:text-white'}`}>
              {link}
            </a>
          ))}
        </div>

        <button className="bg-accent text-white px-5 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform shadow-lg shadow-accent/20">
          Find a Product
        </button>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu className={scrolled ? 'text-supporting' : 'text-white'} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-6 md:hidden">
          {['Household', 'Garden', 'Tech', 'About'].map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-2xl font-drama italic text-supporting" onClick={() => setIsMenuOpen(false)}>
              {link}
            </a>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative h-[100dvh] w-full flex items-end pb-20 px-6 md:px-12 overflow-hidden">
        {/* Background Image & Gradient */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" 
            alt="Data Analysis" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-supporting via-supporting/60 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-4xl text-white">
          {/* Social Proof Strip */}
          <div className="flex flex-wrap gap-3 mb-6">
            {['No sponsored rankings', 'Sourced from real owners', 'Updated monthly'].map((signal, i) => (
              <div key={i} className="hero-chip flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-xs font-data uppercase tracking-wider">
                <Check className="w-3 h-3 text-accent" />
                {signal}
              </div>
            ))}
          </div>

          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl leading-[0.9] mb-6 font-bold tracking-tight">
            The verdict from <br />
            <span className="font-drama italic text-accent/90">10,000+ real conversations.</span>
          </h1>

          <p className="hero-text text-lg md:text-xl text-white/80 max-w-xl mb-8 font-light">
            All household and some garden reviews you can actually trust.
          </p>

          <button className="hero-text bg-accent text-white px-8 py-4 rounded-full text-lg font-medium hover:scale-105 transition-transform shadow-xl shadow-accent/30 flex items-center gap-2 group">
            See the top pics
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section py-24 px-6 md:px-12 bg-background">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          
          {/* Card 1: Source Aggregator */}
          <div className="feature-card bg-primary p-8 rounded-4xl shadow-sm hover:translate-y-[-4px] hover:shadow-md transition-all border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <Users className="w-24 h-24 text-supporting" />
            </div>
            <h3 className="text-xl font-bold mb-2">Source Aggregator</h3>
            <p className="text-sm text-supporting/70 mb-8 font-data">No sponsored rankings</p>
            
            <div className="h-40 bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-center relative">
              {/* Animated Nodes */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center z-10 shadow-lg shadow-accent/30">
                  <ShieldCheck className="w-6 h-6 text-white" />
                </div>
                {/* Connecting Lines */}
                {[0, 72, 144, 216, 288].map((deg, i) => (
                  <div key={i} className="absolute w-full h-full flex items-center justify-center animate-pulse-slow" style={{ animationDelay: `${i * 0.5}s`, transform: `rotate(${deg}deg)` }}>
                    <div className="w-[120px] h-[1px] bg-gradient-to-r from-accent to-transparent origin-left absolute left-1/2 top-1/2 -translate-y-1/2" />
                    <div className="absolute right-4 w-2 h-2 bg-supporting rounded-full translate-x-[60px]" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Card 2: Verdict Typewriter */}
          <div className="feature-card bg-primary p-8 rounded-4xl shadow-sm hover:translate-y-[-4px] hover:shadow-md transition-all border border-gray-100 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <MessageSquare className="w-24 h-24 text-supporting" />
            </div>
            <h3 className="text-xl font-bold mb-2">Real Owner Verdicts</h3>
            <div className="flex items-center gap-2 mb-8">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <p className="text-xs font-data uppercase text-red-500 tracking-wider">Live Feed</p>
            </div>
            
            <div className="h-40 bg-supporting rounded-2xl border border-gray-800 p-6 font-data text-xs text-green-400 overflow-hidden leading-relaxed">
              &gt; Analyzing 500+ threads...<br/>
              &gt; "Best suction on carpet"<br/>
              &gt; "Battery lasts 45 mins"<br/>
              &gt; "Filter is hard to clean"<br/>
              &gt; Consensus: <span className="text-white bg-green-600/30 px-1">HIGHLY RECOMMENDED</span><span className="animate-pulse">_</span>
            </div>
          </div>

          {/* Card 3: Score Breakdown */}
          <div className="feature-card bg-primary p-8 rounded-4xl shadow-sm hover:translate-y-[-4px] hover:shadow-md transition-all border border-gray-100 relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
              <BarChart3 className="w-24 h-24 text-supporting" />
            </div>
            <h3 className="text-xl font-bold mb-2">Trust Score</h3>
            <p className="text-sm text-supporting/70 mb-8 font-data">Updated Monthly</p>
            
            <div className="space-y-3">
              {[
                { label: 'Reliability', score: '9.2', width: '92%' },
                { label: 'Value', score: '8.8', width: '88%' },
                { label: 'Satisfaction', score: '9.5', width: '95%' },
              ].map((item, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>{item.label}</span>
                    <span className="font-data">{item.score}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="chart-bar-fill h-full bg-accent rounded-full w-0" 
                      data-width={item.width} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section py-32 px-6 md:px-12 bg-supporting text-white relative overflow-hidden">
        {/* Parallax Texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-fixed" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          <p className="philosophy-text text-xl md:text-2xl text-white/40 font-light">
            Most review sites rank what pays them most.
          </p>
          <h2 className="philosophy-text text-4xl md:text-6xl lg:text-7xl font-drama italic leading-tight">
            We rank what owners <br />
            <span className="text-accent">actually recommend.</span>
          </h2>
        </div>
      </section>

      {/* How It Works - Sticky Cards */}
      <section className="py-24 px-6 md:px-12 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Our Methodology</h2>
          
          {/* Step 1: We Listen */}
          <div className="process-card h-[90vh] sticky top-0 bg-primary border border-gray-200 rounded-5xl p-8 md:p-16 mb-12 flex flex-col md:flex-row items-center gap-12 shadow-xl">
            <div className="flex-1 space-y-6">
              <span className="font-data text-accent text-lg">01.</span>
              <h3 className="text-4xl md:text-5xl font-bold">We Listen</h3>
              <p className="text-lg text-supporting/70 leading-relaxed">
                We scour thousands of forum discussions, Reddit threads, and owner groups to find raw, unfiltered feedback.
              </p>
            </div>
            <div className="flex-1 w-full aspect-square bg-white rounded-3xl border border-gray-100 relative overflow-hidden flex items-center justify-center">
              {/* Laser Scan Animation */}
              <div className="w-3/4 h-3/4 grid grid-cols-6 gap-2 opacity-30">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-full w-full h-full" />
                ))}
              </div>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/20 to-transparent h-8 w-full top-1/2 -translate-y-1/2 animate-[scan_2s_linear_infinite]" />
              <style>{`
                @keyframes scan {
                  0% { top: 0%; }
                  100% { top: 100%; }
                }
              `}</style>
            </div>
          </div>

          {/* Step 2: We Analyse */}
          <div className="process-card h-[90vh] sticky top-0 bg-primary border border-gray-200 rounded-5xl p-8 md:p-16 mb-12 flex flex-col md:flex-row items-center gap-12 shadow-xl">
             <div className="flex-1 space-y-6">
              <span className="font-data text-accent text-lg">02.</span>
              <h3 className="text-4xl md:text-5xl font-bold">We Analyse</h3>
              <p className="text-lg text-supporting/70 leading-relaxed">
                Our team processes the data, verifying claims and identifying patterns to separate hype from reality.
              </p>
            </div>
            <div className="flex-1 w-full aspect-square bg-supporting rounded-3xl border border-gray-700 relative overflow-hidden flex items-center justify-center">
               <Activity className="w-32 h-32 text-accent animate-pulse" />
               <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M0,50 L20,50 L25,20 L35,80 L40,50 L60,50 L65,30 L75,70 L80,50 L100,50" fill="none" stroke="white" strokeWidth="0.5" />
               </svg>
            </div>
          </div>

          {/* Step 3: We Recommend */}
          <div className="process-card h-[90vh] sticky top-0 bg-primary border border-gray-200 rounded-5xl p-8 md:p-16 mb-12 flex flex-col md:flex-row items-center gap-12 shadow-xl">
             <div className="flex-1 space-y-6">
              <span className="font-data text-accent text-lg">03.</span>
              <h3 className="text-4xl md:text-5xl font-bold">We Recommend</h3>
              <p className="text-lg text-supporting/70 leading-relaxed">
                Only products that pass our rigorous "Real Owner" verification earn our badge.
              </p>
            </div>
            <div className="flex-1 w-full aspect-square bg-white rounded-3xl border border-gray-100 relative overflow-hidden flex items-center justify-center">
              <div className="relative">
                <div className="w-40 h-40 border-4 border-gray-100 rounded-full" />
                <div className="absolute inset-0 border-4 border-accent rounded-full border-t-transparent animate-spin" style={{ animationDuration: '3s' }} />
                <Check className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-accent" />
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Category Showcase */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Explore Categories</h2>
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="group bg-primary p-8 rounded-4xl border border-gray-100 hover:shadow-lg transition-all cursor-pointer">
              <h3 className="text-2xl font-bold mb-2">Household</h3>
              <p className="text-sm text-supporting/60 mb-6">Vacuums, Blenders, Coffee Machines</p>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

            <div className="group bg-supporting p-8 rounded-4xl border border-gray-800 shadow-xl scale-105 z-10 cursor-pointer">
              <h3 className="text-2xl font-bold mb-2 text-white">Smart Home</h3>
              <p className="text-sm text-white/60 mb-6">Security, Lighting, Assistants</p>
              <button className="bg-accent text-white px-6 py-2 rounded-full text-sm font-medium hover:scale-105 transition-transform">
                Browse Top Picks
              </button>
            </div>

            <div className="group bg-primary p-8 rounded-4xl border border-gray-100 hover:shadow-lg transition-all cursor-pointer">
              <h3 className="text-2xl font-bold mb-2">Garden</h3>
              <p className="text-sm text-supporting/60 mb-6">Mowers, Tools, Furniture</p>
               <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-supporting text-white py-20 px-6 md:px-12 rounded-t-[3rem] mt-12">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h2 className="text-2xl font-bold">bestreviews.co.uk</h2>
            <p className="text-white/60 max-w-sm">
              The only review site that ignores marketing budgets and listens to real owners.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-data uppercase tracking-widest text-white/80">Reviews Updated: Feb 2026</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Categories</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">Household Appliances</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Garden & Outdoor</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Smart Home Tech</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Personal Care</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li><a href="#" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Our Methodology</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-16 pt-8 text-center md:text-left text-xs text-white/30 font-data">
          <p>© 2026 BestReviews.co.uk. All rights reserved.</p>
          <p className="mt-2">
            Disclosure: We may earn a small commission from links on this site. This never affects our rankings or editorial independence.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
