import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Home, Compass, BookOpen, BarChart2, Briefcase, Menu, X, Sun, Moon, ArrowRight, CheckCircle2 } from 'lucide-react';
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
