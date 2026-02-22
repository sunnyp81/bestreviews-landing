import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Search, 
  Menu, 
  X, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Database, 
  Filter, 
  FileText,
  MessageSquare,
  Sparkles,
  BarChart3,
  Quote
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      ref={navRef}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[90%] max-w-5xl rounded-full border border-white/10 ${
        isScrolled ? 'bg-background/80 backdrop-blur-xl py-3 px-6 shadow-soft' : 'bg-transparent py-5 px-8'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-heading font-bold text-xl tracking-tighter text-primary">BestReviews<span className="text-accent">.co.uk</span></span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Garden', 'How We Review'].map((item) => (
            <a key={item} href="#" className="text-sm font-medium hover:text-accent transition-colors duration-300">{item}</a>
          ))}
        </div>

        <button className="bg-accent text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:translate-y-[-2px] hover:shadow-lg transition-all duration-300 ease-out">
          Latest Summaries
        </button>
      </div>
    </nav>
  );
};

const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="relative h-[95vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000" 
          alt="Modern Outdoor Living"
          className="w-full h-full object-cover grayscale-[20%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-background"></div>
      </div>

      <div ref={contentRef} className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
        <div className="hero-reveal inline-block mb-6 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium">
          The Real Truth About All-Season Furniture
        </div>
        <h1 className="hero-reveal text-5xl md:text-7xl font-heading font-bold text-white mb-8 leading-[1.1]">
          <span className="font-light italic opacity-90 block text-3xl md:text-4xl mb-2">Cut through the noise on</span>
          All-Season Furniture.
        </h1>
        <p className="hero-reveal text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed text-balance">
          We analyzed 10,000+ real user conversations from forums, Reddit, and verified buyers so you don't have to.
        </p>

        <div className="hero-reveal relative max-w-xl mx-auto group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-dark/40" />
          </div>
          <input 
            type="text" 
            placeholder="What are you looking to buy?"
            className="w-full bg-white border-none py-5 pl-14 pr-6 rounded-2xl shadow-soft text-dark focus:ring-2 focus:ring-accent transition-all duration-300"
            disabled
          />
        </div>
      </div>
    </section>
  );
};

const Features = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-24 container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Card 1: Sentiment Shuffler */}
        <div className="feature-card bg-white p-8 rounded-[2rem] shadow-soft border border-black/5 flex flex-col h-[450px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl">The Sentiment Shuffler</h3>
          </div>
          <div className="flex-1 relative overflow-hidden">
             <SentimentShuffler />
          </div>
          <p className="mt-6 text-sm text-dark/50 italic border-t border-black/5 pt-4">
            Real user sentiment on cushion performance.
          </p>
        </div>

        {/* Card 2: Summary Generator */}
        <div className="feature-card bg-white p-8 rounded-[2rem] shadow-soft border border-black/5 flex flex-col h-[450px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-accent/10 rounded-2xl text-accent">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl">The Summary Generator</h3>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-accent/5 text-accent text-[10px] font-bold tracking-widest uppercase rounded-full">
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
              Analyzing Real Reviews...
            </div>
            <TypingSummary />
          </div>
          <p className="mt-6 text-sm text-dark/50 italic border-t border-black/5 pt-4">
            Editor's summary on assembly experience.
          </p>
        </div>

        {/* Card 3: Trust Metric */}
        <div className="feature-card bg-white p-8 rounded-[2rem] shadow-soft border border-black/5 flex flex-col h-[450px]">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-2xl text-primary">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-xl">The Trust Metric</h3>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center">
            <ScoreGauge score={8.7} />
            <div className="w-full mt-8 space-y-4">
              <MetricBar label="UV Resistance" value={92} />
              <MetricBar label="Surface Heat" value={65} color="bg-accent" />
            </div>
          </div>
          <p className="mt-6 text-sm text-dark/50 italic border-t border-black/5 pt-4">
            Community consensus on material durability.
          </p>
        </div>
      </div>
    </section>
  );
};

const SentimentShuffler = () => {
  const [index, setIndex] = useState(0);
  const quotes = [
    { text: "Loved the water-resistance during the storm.", type: "pos" },
    { text: "Cushions take forever to dry out after rain.", type: "crit" },
    { text: "Spilled wine wiped right off, amazing.", type: "pos" },
    { text: "Drying time is a real pain in humid weather.", type: "crit" },
    { text: "High quality fabric, feels very durable.", type: "pos" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-full flex flex-col gap-4 py-4">
      {quotes.map((quote, i) => {
        const isActive = i === index;
        const isNext = i === (index + 1) % quotes.length;
        return (
          <div 
            key={i}
            className={`transition-all duration-1000 absolute w-full p-5 rounded-2xl border ${
              isActive ? 'opacity-100 translate-y-0 scale-100 z-10' : 
              isNext ? 'opacity-40 translate-y-16 scale-95 z-0' : 'opacity-0 -translate-y-16'
            } ${quote.type === 'pos' ? 'bg-primary/5 border-primary/10' : 'bg-accent/5 border-accent/10'}`}
          >
            <Quote className={`w-5 h-5 mb-3 ${quote.type === 'pos' ? 'text-primary' : 'text-accent'}`} />
            <p className={`text-sm font-medium ${quote.type === 'pos' ? 'text-primary' : 'text-accent'}`}>{quote.text}</p>
          </div>
        );
      })}
    </div>
  );
};

const TypingSummary = () => {
  const [text, setText] = useState("");
  const fullText = "The consensus is clear: while the frame is solid, assembly requires two people and a lot of patience. The instructions are famously vague about the final alignment phase. Don't tackle this alone on a Sunday afternoon.";
  
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <p className="text-lg text-dark/80 leading-relaxed font-medium">
      {text}<span className="inline-block w-1.5 h-5 bg-accent ml-1 animate-pulse align-middle"></span>
    </p>
  );
};

const ScoreGauge = ({ score }) => {
  const circleRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(circleRef.current, {
        strokeDashoffset: 251,
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: circleRef.current
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative flex flex-col items-center">
      <svg className="w-32 h-32 transform -rotate-90">
        <circle className="text-black/5" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="64" cy="64" />
        <circle 
          ref={circleRef}
          className="text-primary" 
          strokeWidth="8" 
          strokeDasharray="251.2" 
          strokeDashoffset={251.2 - (251.2 * score) / 10}
          strokeLinecap="round" 
          stroke="currentColor" 
          fill="transparent" 
          r="40" 
          cx="64" 
          cy="64" 
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
        <span className="text-3xl font-heading font-bold">{score}</span>
        <span className="text-[10px] uppercase tracking-wider font-bold opacity-40">Score</span>
      </div>
      <span className="mt-4 font-heading font-bold text-sm tracking-tight">Community Consensus</span>
    </div>
  );
};

const MetricBar = ({ label, value, color = "bg-primary" }) => {
  const barRef = useRef(null);
  useEffect(() => {
    gsap.from(barRef.current, {
      width: 0,
      duration: 1.5,
      ease: 'power2.out',
      scrollTrigger: barRef.current
    });
  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider mb-2 opacity-60">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
        <div ref={barRef} className={`h-full ${color} rounded-full`} style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
};

const Philosophy = () => {
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray('.reveal-line');
      lines.forEach((line) => {
        gsap.from(line, {
          scrollTrigger: {
            trigger: line,
            start: 'top 85%',
          },
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-primary py-32 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none">
        <img 
          src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=2000" 
          alt="Texture"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
        <p className="reveal-line text-white/60 mb-8 font-medium">Most review sites focus on:</p>
        <h2 className="reveal-line text-white/40 text-2xl md:text-3xl font-heading mb-16 line-through decoration-white/20">
          pushing you to buy anything to get a commission.
        </h2>
        
        <p className="reveal-line text-white/60 mb-8 font-medium">We focus on:</p>
        <h2 className="reveal-line text-white text-4xl md:text-6xl font-heading font-bold leading-tight">
          what people who <span className="text-accent italic">actually own it</span> have to say.
        </h2>
      </div>
    </section>
  );
};

const Protocol = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.protocol-panel');
      panels.forEach((panel, i) => {
        if (i === panels.length - 1) return;
        
        ScrollTrigger.create({
          trigger: panel,
          start: 'top top',
          pin: true,
          pinSpacing: false,
          end: 'bottom top',
          onUpdate: (self) => {
            const scale = 1 - (self.progress * 0.05);
            const blur = self.progress * 4;
            const opacity = 1 - self.progress;
            gsap.to(panel, { scale, opacity, filter: `blur(${blur}px)`, duration: 0.1 });
          }
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const steps = [
    {
      title: "Gathering Raw Truth",
      desc: "We scrape thousands of threads from Reddit, specialist forums, and verified buyer reviews to get the raw, unfiltered experience.",
      icon: <Database className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Filtering the Noise",
      desc: "Our algorithm identifies and discards bot-generated content, paid shills, and low-effort reviews to leave only genuine owner insights.",
      icon: <Filter className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Extracting the Essence",
      desc: "An expert editor synthesizes the findings into a plain-English, BS-free summary that tells you exactly what to expect.",
      icon: <FileText className="w-8 h-8" />,
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  return (
    <div ref={containerRef} className="bg-background">
      {steps.map((step, i) => (
        <section key={i} className="protocol-panel min-h-screen flex items-center justify-center p-6 md:p-24 sticky top-0 bg-background border-t border-black/5">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center max-w-6xl">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center font-heading font-bold text-xl">
                  {i + 1}
                </div>
                <div className="h-px w-12 bg-black/10"></div>
                <span className="uppercase tracking-[0.2em] font-bold text-xs text-primary">Our Protocol</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 leading-tight">{step.title}</h2>
              <p className="text-lg md:text-xl text-dark/60 leading-relaxed mb-10">{step.desc}</p>
              <div className="p-6 bg-white rounded-3xl shadow-soft border border-black/5 flex items-start gap-5">
                <div className="text-accent">{step.icon}</div>
                <div className="text-sm font-medium text-dark/80 italic leading-relaxed">
                  "This ensures we don't just report what brands want you to hear, but what owners actually experience."
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 relative group">
               <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl">
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
               </div>
               <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-accent/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

const TopSummaries = () => {
  const summaries = [
    { name: "Nordic Haven Modular Sofa", score: 8.9, desc: "Exceptional UV resistance, but the clip system is tricky for one person.", img: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=600" },
    { name: "Sienna Teak Conversation Set", score: 7.4, desc: "Beautiful aging, requires annual oiling that reviewers say is often skipped.", img: "https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=600" },
    { name: "Alu-Core 5-Piece Dining", score: 9.2, desc: "Unbeatable durability; owners report it looks new after 3 winters.", img: "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?auto=format&fit=crop&q=80&w=600" }
  ];

  return (
    <section className="py-32 container mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="max-w-xl">
          <h2 className="text-4xl font-heading font-bold mb-4">Trending Summaries</h2>
          <p className="text-dark/60">The most discussed all-season pieces this month, analyzed for you.</p>
        </div>
        <button className="flex items-center gap-2 font-bold text-primary group">
          View all 142 summaries <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {summaries.map((s, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden mb-6 shadow-soft transition-all duration-500 group-hover:shadow-2xl">
              <img src={s.img} alt={s.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-6 right-6 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-xs font-bold shadow-sm">
                Score: {s.score}
              </div>
            </div>
            <h3 className="text-2xl font-heading font-bold mb-3 group-hover:text-accent transition-colors">{s.name}</h3>
            <p className="text-dark/60 text-sm leading-relaxed mb-6">{s.desc}</p>
            <button className="w-full py-4 rounded-2xl border border-black/10 font-bold text-sm hover:bg-black hover:text-white transition-all duration-300">
              Read what people say about the product
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-24 pb-12 rounded-t-[4rem] px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 md:col-span-2">
            <div className="font-heading font-bold text-3xl tracking-tighter mb-6">
              BestReviews<span className="text-accent">.co.uk</span>
            </div>
            <p className="text-white/50 text-lg max-w-md mb-10 leading-relaxed">
              Real conversations, summarized. We cut through the noise so you can make decisions based on reality, not marketing.
            </p>
            <div className="inline-flex items-center gap-4 p-5 bg-white/5 border border-white/10 rounded-3xl">
              <div className="p-3 bg-accent rounded-2xl text-white">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <div>
                <div className="font-bold text-sm">100% User-Generated</div>
                <div className="text-xs text-white/40 font-medium">No Sponsored Reviews. Ever.</div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-heading font-bold mb-8 text-lg">Platform</h4>
            <ul className="space-y-4 text-white/50 font-medium">
              <li><a href="#" className="hover:text-accent transition-colors">Home Categories</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Garden Essentials</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Latest Trends</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Submission Portal</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-bold mb-8 text-lg">Our Process</h4>
            <ul className="space-y-4 text-white/50 font-medium">
              <li><a href="#" className="hover:text-accent transition-colors">Review Methodology</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Bias Protection</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Community Guidelines</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Trust Standards</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-sm text-white/30 font-medium">
          <div>© 2026 BestReviews.co.uk. Built for transparency.</div>
          <div className="flex gap-10">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

function App() {
  return (
    <div className="relative min-h-screen">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Philosophy />
        <Protocol />
        <TopSummaries />
      </main>
      <Footer />
    </div>
  );
}

export default App;