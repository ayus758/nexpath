import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Compass, BookOpen, BarChart2, Briefcase, Settings, Menu, X, Sun, Moon, ArrowRight, CheckCircle2 } from 'lucide-react';
import Login from './pages/Login';
import Register from './pages/Register';
import Roadmap from './pages/Roadmap';
import Resources from './pages/Resources';
import Analytics from './pages/Analytics';
import CompanyPrep from './pages/CompanyPrep';
import Notes from './pages/Notes';

const Sidebar = ({ isDarkMode, toggleDarkMode, isSidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    { icon: <Home size={20} />, label: "Dashboard", path: "/dashboard" },
    { icon: <Compass size={20} />, label: "Roadmap", path: "/roadmap" },
    { icon: <BookOpen size={20} />, label: "Resources", path: "/resources" },
    { icon: <BarChart2 size={20} />, label: "Mock Tests", path: "/mock-tests" },
    { icon: <Briefcase size={20} />, label: "Company Prep", path: "/company-prep" },
    { icon: <BookOpen size={20} />, label: "Notes", path: "/notes" },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out bg-[var(--background)] border-r border-[var(--border)]
      ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:inset-auto`}
    >
      <div className="flex items-center justify-between p-4 border-b border-[var(--border)]">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent cursor-pointer">
          PrepFusion
        </Link>
        <button onClick={() => setSidebarOpen(false)} className="md:hidden text-[var(--muted-foreground)]">
          <X size={24} />
        </button>
      </div>

      <nav className="p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-colors duration-200"
          >
            {item.icon}
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-[var(--border)]">
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-[var(--muted-foreground)] hover:bg-[var(--secondary)] hover:text-[var(--foreground)] transition-colors duration-200"
        >
          {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </div>
  );
};

const Header = ({ setSidebarOpen }) => {
  return (
    <header className="flex items-center justify-between p-4 bg-[var(--background)] border-b border-[var(--border)] sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <button onClick={() => setSidebarOpen(true)} className="md:hidden text-[var(--foreground)]">
          <Menu size={24} />
        </button>
        <div className="hidden md:block text-sm text-[var(--muted-foreground)]">
          Welcome back! Let's conquer your goals today.
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
          U
        </div>
      </div>
    </header>
  );
};

// --- SVG Logo Components ---
const LinkedInLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="40" height="40" rx="8" fill="#0A66C2"/>
    <path d="M13.5 17h-3v10h3V17zm-1.5-4.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM28 17c-1.7 0-2.9.7-3.5 1.5V17H21v10h3.5v-5.5c0-1.4.8-2 1.8-2s1.7.6 1.7 2V27H31v-6c0-2.8-1.5-4-3-4z" fill="white"/>
  </svg>
);

const UnstopLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="40" height="40" rx="8" fill="#6B21A8"/>
    <text x="50%" y="55%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="Arial">UN</text>
    <text x="50%" y="72%" dominantBaseline="middle" textAnchor="middle" fill="#e9d5ff" fontSize="7" fontFamily="Arial">STOP</text>
  </svg>
);

const LeetCodeLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="40" height="40" rx="8" fill="#FFA116"/>
    <path d="M14 26l4-12 4 12M16.5 22h5" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="27" cy="20" r="3" fill="#1a1a1a"/>
  </svg>
);

const YoutubeLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="40" height="40" rx="8" fill="#FF0000"/>
    <path d="M30 20s0-4.5-.6-6.7a3.4 3.4 0 00-2.4-2.4C25 10.3 20 10.3 20 10.3s-5 0-7 .6a3.4 3.4 0 00-2.4 2.4C10 15.5 10 20 10 20s0 4.5.6 6.7a3.4 3.4 0 002.4 2.4c2 .6 7 .6 7 .6s5 0 7-.6a3.4 3.4 0 002.4-2.4C30 24.5 30 20 30 20z" fill="#FF0000"/>
    <path d="M17.5 23.5l6.5-3.5-6.5-3.5v7z" fill="white"/>
  </svg>
);

const GfGLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="40" height="40" rx="8" fill="#2F8D46"/>
    <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">GfG</text>
  </svg>
);

const CourseraLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="40" height="40" rx="8" fill="#0056D2"/>
    <text x="50%" y="56%" dominantBaseline="middle" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">COURSERA</text>
  </svg>
);

const GitHubLogo = () => (
  <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <rect width="40" height="40" rx="8" fill="#24292e"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M20 9a11 11 0 00-3.48 21.44c.55.1.75-.24.75-.53v-1.85c-3.06.66-3.7-1.48-3.7-1.48-.5-1.27-1.22-1.6-1.22-1.6-1-.68.07-.67.07-.67 1.1.08 1.68 1.14 1.68 1.14.98 1.68 2.57 1.2 3.2.91.1-.7.38-1.2.7-1.47-2.44-.28-5.01-1.22-5.01-5.43 0-1.2.43-2.18 1.13-2.95-.11-.28-.49-1.4.11-2.91 0 0 .92-.3 3.02 1.13A10.5 10.5 0 0120 13.5c.93 0 1.88.13 2.75.37 2.1-1.42 3.02-1.13 3.02-1.13.6 1.51.22 2.63.11 2.91.7.77 1.13 1.75 1.13 2.95 0 4.22-2.57 5.15-5.02 5.42.39.34.75 1.01.75 2.04v3.02c0 .29.2.63.76.52A11 11 0 0020 9z" fill="white"/>
  </svg>
);

const PrepFusionIcon = () => (
  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-2xl">
    <span className="text-white font-black text-lg leading-none text-center">Prep<br/>Fusion</span>
  </div>
);

const platforms = [
  { id: 'linkedin',  label: 'LinkedIn',  Component: LinkedInLogo,  angle: 0   },
  { id: 'unstop',    label: 'Unstop',    Component: UnstopLogo,    angle: 51  },
  { id: 'leetcode',  label: 'LeetCode',  Component: LeetCodeLogo,  angle: 103 },
  { id: 'youtube',   label: 'YouTube',   Component: YoutubeLogo,   angle: 154 },
  { id: 'gfg',       label: 'GfG',       Component: GfGLogo,       angle: 206 },
  { id: 'coursera',  label: 'Coursera',  Component: CourseraLogo,  angle: 257 },
  { id: 'github',    label: 'GitHub',    Component: GitHubLogo,    angle: 308 },
];

// Smooth cubic ease-in-out
const easeInOut = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

// Map value from [inMin, inMax] → [0, 1], clamped
const mapRange = (value, inMin, inMax) =>
  Math.max(0, Math.min(1, (value - inMin) / (inMax - inMin)));

// Linear interpolation
const lerp = (a, b, t) => a + (b - a) * t;

const PlatformConvergence = () => {
  const wrapperRef = useRef(null);
  const scrollTargetRef = useRef(0); // raw scroll progress 0→1
  const displayRef = useRef(0);      // lerped display progress
  const rafIdRef = useRef(null);
  const [displayP, setDisplayP] = useState(0);

  useEffect(() => {
    // Continuously lerp displayProgress toward scrollTarget each rAF frame
    const loop = () => {
      const current = displayRef.current;
      const target  = scrollTargetRef.current;
      let next    = lerp(current, target, 0.08); // 0.08 = smoothness
      
      // Snap to target if very close so it fully completes
      if (Math.abs(target - next) < 0.001) {
        next = target;
      }

      displayRef.current = next;

      // Only re-render if meaningfully different
      if (Math.abs(next - current) > 0.0001 || next === target) {
        setDisplayP(next);
      }
      rafIdRef.current = requestAnimationFrame(loop);
    };
    rafIdRef.current = requestAnimationFrame(loop);

    const onScroll = () => {
      if (!wrapperRef.current) return;
      const rect = wrapperRef.current.getBoundingClientRect();
      const wrapperH = wrapperRef.current.offsetHeight;
      const viewportH = window.innerHeight;
      
      // The scrollable distance while the sticky element is pinned:
      const maxScroll = Math.max(1, wrapperH - viewportH);
      
      // -rect.top is how many pixels we've scrolled past the pin start
      const scrolled = -rect.top;
      scrollTargetRef.current = Math.max(0, Math.min(1, scrolled / maxScroll));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  const p = displayP;

  // ── Responsive sizing: arena fits within viewport minus heading space ──
  const arenaSize  = Math.min(typeof window !== 'undefined' ? window.innerHeight - 230 : 480, 580);
  const RADIUS     = arenaSize * 0.42;
  const LOGO_SIZE  = Math.round(arenaSize * 0.12);
  const CENTER_SIZE = Math.round(arenaSize * 0.22);

  // ── Animation Timeline ────────────────────────────────────────────────
  //  p  0.00 → 0.15   logos burst out from center (enter)
  //  p  0.15 → 0.52   logos hold orbital positions
  //  p  0.52 → 0.58   short pause at peak
  //  p  0.58 → 0.84   logos fly inward and merge into PrepFusion
  //  p  0.84 → 1.00   center card blooms with glow

  const getLogoValues = (angle, index) => {
    const stagger = index * 0.018;
    const outward = easeInOut(mapRange(p, 0.04 + stagger, 0.48 + stagger));
    const inward  = easeInOut(mapRange(p, 0.58, 0.84));

    const radius  = RADIUS * outward * (1 - inward);
    const opacity = Math.max(0, Math.min(1, outward * 2.5) - inward * 1.4);
    const scale   = 0.3 + 0.7 * Math.min(outward, 1 - inward * 0.9);

    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;

    return { x, y, opacity, scale, outward, inward };
  };

  // Orbit rings
  const ring1Opacity = easeInOut(mapRange(p, 0.08, 0.42)) * (1 - easeInOut(mapRange(p, 0.55, 0.78)));
  const ring2Opacity = easeInOut(mapRange(p, 0.15, 0.50)) * (1 - easeInOut(mapRange(p, 0.58, 0.80))) * 0.5;

  // Labels at peak orbit
  const labelOpacity = easeInOut(mapRange(p, 0.32, 0.50)) * (1 - easeInOut(mapRange(p, 0.55, 0.68)));

  // Center card glow
  const glowT       = easeInOut(mapRange(p, 0.80, 1.0));
  const centerScale = 1 + glowT * 0.22;
  const glowRadius  = RADIUS * 0.75 + glowT * (RADIUS * 0.5);

  // Scroll hint fades out as animation begins
  const hintOpacity = 1 - easeInOut(mapRange(p, 0, 0.12));

  return (
    <div ref={wrapperRef} style={{ height: '300vh' }} className="relative z-10">
      <div
        className="sticky top-0 overflow-hidden bg-[var(--background)]"
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0,
        }}
      >
        {/* ── Heading ── */}
        <div className="text-center px-6 flex-shrink-0" style={{ maxWidth: 560 }}>
          <p
            className="font-bold uppercase mb-3"
            style={{ fontSize: 11, letterSpacing: '0.18em', color: 'rgba(168,85,247,0.9)' }}
          >
            One Platform to Rule Them All
          </p>
          <h2
            className="font-extrabold tracking-tight leading-[1.1]"
            style={{ fontSize: 'clamp(1.7rem, 4vw, 3rem)', marginBottom: '0.5rem' }}
          >
            All your prep sources,{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              unified.
            </span>
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted-foreground)', marginBottom: '1rem' }}>
            Scroll down to watch every platform converge.
          </p>

          {/* Progress bar */}
          <div
            className="mx-auto rounded-full overflow-hidden"
            style={{ width: 140, height: 2, background: 'rgba(255,255,255,0.07)' }}
          >
            <div
              style={{
                width: `${p * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #60a5fa, #a855f7, #ec4899)',
                borderRadius: 99,
                transition: 'none',
              }}
            />
          </div>
        </div>

        {/* ── Animation arena ── */}
        <div
          className="relative flex-shrink-0"
          style={{ width: arenaSize, height: arenaSize }}
        >
          {/* Orbit ring 1 */}
          <div
            className="absolute rounded-full"
            style={{
              top: '50%', left: '50%',
              width: RADIUS * 2 + 2, height: RADIUS * 2 + 2,
              transform: 'translate(-50%, -50%)',
              border: '1.5px dashed rgba(139,92,246,0.3)',
              opacity: ring1Opacity,
              transition: 'none',
            }}
          />

          {/* Orbit ring 2 (inner) */}
          <div
            className="absolute rounded-full"
            style={{
              top: '50%', left: '50%',
              width: RADIUS * 1.3, height: RADIUS * 1.3,
              transform: 'translate(-50%, -50%)',
              border: '1px solid rgba(96,165,250,0.18)',
              opacity: ring2Opacity,
              transition: 'none',
            }}
          />

          {/* Radial glow */}
          <div
            className="absolute rounded-full pointer-events-none"
            style={{
              top: '50%', left: '50%',
              width: glowRadius, height: glowRadius,
              transform: 'translate(-50%, -50%)',
              background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, rgba(59,130,246,0.2) 45%, transparent 70%)',
              opacity: glowT,
              transition: 'none',
              filter: `blur(${10 + glowT * 14}px)`,
            }}
          />

          {/* ── Platform logos + labels ── */}
          {platforms.map(({ id, label, Component, angle }, index) => {
            const { x, y, opacity, scale, outward, inward } = getLogoValues(angle, index);
            const lRad = (angle * Math.PI) / 180;
            const labelR = RADIUS + LOGO_SIZE * 0.7;
            const lx = Math.cos(lRad) * labelR * outward * (1 - inward);
            const ly = Math.sin(lRad) * labelR * outward * (1 - inward);

            return (
              <React.Fragment key={id}>
                <div
                  className="absolute"
                  style={{
                    top: '50%', left: '50%',
                    width: LOGO_SIZE, height: LOGO_SIZE,
                    transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`,
                    opacity,
                    transition: 'none',
                    borderRadius: Math.round(LOGO_SIZE * 0.22),
                    boxShadow: '0 6px 24px rgba(0,0,0,0.5)',
                  }}
                  title={label}
                >
                  <Component />
                </div>

                <div
                  className="absolute pointer-events-none text-center font-semibold"
                  style={{
                    top: '50%', left: '50%',
                    fontSize: Math.max(9, Math.round(LOGO_SIZE * 0.16)),
                    letterSpacing: '0.04em',
                    color: 'var(--muted-foreground)',
                    transform: `translate(calc(-50% + ${lx}px), calc(-50% + ${ly}px))`,
                    opacity: labelOpacity * opacity,
                    transition: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                </div>
              </React.Fragment>
            );
          })}

          {/* ── Center PrepFusion card ── */}
          <div
            className="absolute overflow-hidden"
            style={{
              top: '50%', left: '50%',
              width: CENTER_SIZE, height: CENTER_SIZE,
              borderRadius: Math.round(CENTER_SIZE * 0.2),
              transform: `translate(-50%, -50%) scale(${centerScale})`,
              boxShadow: glowT > 0.01
                ? `0 0 ${30 + 50 * glowT}px ${6 + 20 * glowT}px rgba(139,92,246,${0.55 * glowT}),
                   0 0 ${60 + 100 * glowT}px ${16 + 40 * glowT}px rgba(59,130,246,${0.22 * glowT}),
                   0 10px 36px rgba(0,0,0,0.6)`
                : '0 10px 36px rgba(0,0,0,0.5)',
              transition: 'none',
              zIndex: 10,
            }}
          >
            <PrepFusionIcon />
          </div>
        </div>

        {/* ── Scroll hint ── */}
        <div
          className="absolute bottom-6 flex flex-col items-center gap-1 pointer-events-none"
          style={{ opacity: hintOpacity, transition: 'none' }}
        >
          <p style={{ fontSize: 10, letterSpacing: '0.14em', color: 'var(--muted-foreground)' }}>SCROLL</p>
          <div
            style={{
              width: 1.5,
              height: 30,
              borderRadius: 99,
              background: 'linear-gradient(to bottom, rgba(168,85,247,0.8), transparent)',
            }}
          />
        </div>
      </div>
    </div>
  );
};


const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[var(--background)] relative overflow-x-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute top-full left-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2"></div>
      
      {/* Hero Section */}
      <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl min-h-[90vh] flex flex-col justify-center items-center">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          Master Your Career with <br />
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight inline-block pb-2">
            PrepFusion
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-[var(--muted-foreground)] mb-12">
          The all-in-one preparation platform for GATE, UPSC, JEE, and top-tier corporate interviews. Organize resources, generate smart roadmaps, and track your progress.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => navigate('/register')}
            className="flex items-center justify-center gap-2 bg-[var(--foreground)] text-[var(--background)] px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
          >
            Start Preparing Now
            <ArrowRight size={20} />
          </button>
          <a href="#features" className="flex items-center justify-center gap-2 glass px-8 py-4 rounded-full font-bold text-lg hover:bg-white/5 transition-colors">
            View Features
          </a>
        </div>
      </div>

      {/* Platform Convergence Section */}
      <PlatformConvergence />

      {/* Features Section */}
      <div id="features" className="container mx-auto px-6 pt-12 pb-32 relative z-10 border-t border-[var(--border)]">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">Why Preparation Matters Here</h2>
          <p className="text-[var(--muted-foreground)] mt-4 max-w-2xl mx-auto">Stop hopping between YouTube drops and 5 different bookmark folders. Get everything organized dynamically.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {[
            { title: "Smart Roadmaps", desc: "AI-generated tailored path to hit your target score." },
            { title: "Resource Aggregation", desc: "All your YouTube, LeetCode, and blog links in one place." },
            { title: "Skill Gap Analyzer", desc: "Identify weaknesses through mock tests and timed quizzes." }
          ].map((feature, i) => (
            <div key={i} className="p-8 rounded-2xl glass border border-[var(--border)] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300 cursor-default shadow-lg">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-purple-500/20 transition-colors"></div>
              <CheckCircle2 className="text-purple-500 mb-6" size={32} />
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-[var(--muted-foreground)] leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const DashboardHome = () => {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-3xl font-bold text-[var(--foreground)]">Dashboard</h2>
          <p className="text-[var(--muted-foreground)]">Your preparation overview at a glance.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Study Streak', value: '12 Days', color: 'from-orange-400 to-pink-500' },
            { label: 'Topics Completed', value: '34 / 150', color: 'from-blue-400 to-cyan-500' },
            { label: 'Mock Accuracy', value: '78%', color: 'from-purple-400 to-indigo-500' },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl glass border border-[var(--border)] relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-20 rounded-full blur-2xl -mr-10 -mt-10 group-hover:opacity-40 transition-opacity duration-500`}></div>
              <p className="text-[var(--muted-foreground)] font-medium mb-2">{stat.label}</p>
              <h3 className="text-3xl font-bold text-[var(--foreground)]">{stat.value}</h3>
            </div>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4">
          <div className="lg:col-span-2 p-6 rounded-2xl glass border border-[var(--border)] min-h-[300px]">
             <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">Today's Roadmap</h3>
             <div className="space-y-4">
               {[1, 2, 3].map((task) => (
                 <div key={task} className="flex items-center gap-4 p-4 rounded-xl bg-[var(--secondary)] border border-[var(--border)]">
                   <div className="w-4 h-4 rounded-full border-2 border-[var(--muted-foreground)]"></div>
                   <div>
                     <p className="font-semibold text-[var(--foreground)]">Complete Arrays & Strings</p>
                     <p className="text-sm text-[var(--muted-foreground)]">Data Structures · 2 hours expected</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>
          <div className="p-6 rounded-2xl glass border border-[var(--border)] min-h-[300px]">
             <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">Recommended Resources</h3>
             <div className="space-y-4">
               <div className="p-4 rounded-xl bg-[var(--secondary)] border border-[var(--border)]">
                 <p className="font-semibold">Top 50 Array LeetCode Qs</p>
                 <p className="text-sm text-blue-500 mt-1 cursor-pointer">Watch Video →</p>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardLayout = ({ children, isDarkMode, toggleDarkMode }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--foreground)] font-sans overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      <Sidebar 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        isSidebarOpen={isSidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <Header setSidebarOpen={setSidebarOpen} />
        
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Apply dark mode class to root element
  React.useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Dashboard Routes wrapped in the Layout */}
        <Route path="/dashboard" element={
          <DashboardLayout isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)}>
            <DashboardHome />
          </DashboardLayout>
        } />
        <Route path="/roadmap" element={
          <DashboardLayout isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)}>
             <Roadmap />
          </DashboardLayout>
        } />
        <Route path="/resources" element={
          <DashboardLayout isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)}>
             <Resources />
          </DashboardLayout>
        } />
        <Route path="/mock-tests" element={
          <DashboardLayout isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)}>
             <Analytics />
          </DashboardLayout>
        } />
        <Route path="/company-prep" element={
          <DashboardLayout isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)}>
             <CompanyPrep />
          </DashboardLayout>
        } />
        <Route path="/notes" element={
          <DashboardLayout isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)}>
             <Notes />
          </DashboardLayout>
        } />

        <Route path="*" element={<div className="p-6 text-center text-[var(--muted-foreground)]">404 - Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
