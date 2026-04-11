import React, { useState } from 'react';
import { Building2, FileText, CheckCircle, Search, ChevronRight } from 'lucide-react';

const companies = [
  {
    id: 'google',
    name: 'Google',
    role: 'Software Engineer',
    color: 'from-red-400 via-yellow-400 to-green-500',
    tags: ['Graph Algorithms', 'Dynamic Programming', 'System Design'],
    experiences: [
      { author: 'Jane Doe', title: 'Google L3 SDE Interview Experience (Off-campus) - Selected', date: 'Oct 2025' },
      { author: 'John Smith', title: 'My Google India On-site experience', date: 'Aug 2025' }
    ],
    faq: [
      { q: "How many rounds are there?", a: "Typically 1 phone screen and 4 on-site rounds (3 technical, 1 Googlyness)." },
      { q: "Do they ask System Design for freshers?", a: "Generally no, focus is kept entirely on DSA." }
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    role: 'SDE 1',
    color: 'from-orange-400 to-yellow-500',
    tags: ['Trees & Graphs', 'Leadership Principles', 'Object Oriented Design'],
    experiences: [
      { author: 'Alex Rivera', title: 'Amazon AWS SDE 1 Interview (Online Assessment + 3 Rounds)', date: 'Sep 2025' }
    ],
    faq: [
      { q: "How important are Amazon's Leadership Principles?", a: "Extremely critical. Behavioral rounds are heavily weighted." }
    ]
  },
  {
    id: 'tcs',
    name: 'TCS',
    role: 'Digital & Ninja',
    color: 'from-blue-600 to-cyan-500',
    tags: ['Aptitude', 'Core CS Fundamentals', 'Live Coding'],
    experiences: [
      { author: 'Raj Patel', title: 'TCS Digital NQT Complete Interview Process (Selected)', date: 'July 2025' }
    ],
    faq: [
      { q: "Is the NQT coding section hard?", a: "It ranges from Easy to Medium, focus on fast logic building." }
    ]
  }
];

const CompanyPrep = () => {
  const [activeCompany, setActiveCompany] = useState(companies[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCompanies = companies.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">Company Prep Module</h1>
        <p className="text-[var(--muted-foreground)]">Tailor your preparation strategy for specific tech giants and startups.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar Directory */}
        <div className="glass p-6 rounded-2xl border border-[var(--border)] h-fit">
           <div className="relative mb-6">
              <Search className="absolute left-3 top-3 text-[var(--muted-foreground)]" size={18} />
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[var(--secondary)] border border-[var(--border)] rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 text-[var(--foreground)] text-sm"
              />
           </div>
           
           <div className="space-y-3">
             {filteredCompanies.map(c => (
               <button
                 key={c.id}
                 onClick={() => setActiveCompany(c)}
                 className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200
                   ${activeCompany.id === c.id ? 'bg-[var(--foreground)] text-[var(--background)] py-4 shadow-lg' : 'bg-transparent text-[var(--foreground)] hover:bg-[var(--secondary)]'}`}
               >
                 <div className="flex items-center gap-3">
                   <Building2 size={18} className={activeCompany.id === c.id ? 'text-[var(--background)]' : 'text-[var(--muted-foreground)]'} />
                   <span className="font-bold">{c.name}</span>
                 </div>
                 {activeCompany.id === c.id && <ChevronRight size={18} />}
               </button>
             ))}
           </div>
        </div>

        {/* Main Content Pane */}
        <div className="lg:col-span-3 space-y-8">
           
           {/* Header Hero */}
           <div className="relative p-8 rounded-2xl border border-[var(--border)] overflow-hidden group">
              <div className={`absolute inset-0 bg-gradient-to-br ${activeCompany.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}></div>
              <div className="relative z-10">
                 <h2 className="text-4xl font-extrabold mb-1">{activeCompany.name}</h2>
                 <p className="text-xl text-[var(--muted-foreground)] mb-6">Target Role: {activeCompany.role}</p>
                 
                 <div className="flex flex-wrap gap-2">
                   {activeCompany.tags.map(tag => (
                     <span key={tag} className="px-3 py-1 bg-[var(--secondary)] border border-[var(--border)] rounded-full text-sm font-semibold">
                       {tag}
                     </span>
                   ))}
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Interview Experiences */}
              <div className="glass p-6 rounded-2xl border border-[var(--border)]">
                 <div className="flex items-center gap-2 mb-6">
                   <FileText className="text-blue-500" />
                   <h3 className="text-xl font-bold">Interview Experiences</h3>
                 </div>
                 <div className="space-y-4">
                   {activeCompany.experiences.map((exp, i) => (
                     <div key={i} className="p-4 bg-[var(--secondary)]/50 rounded-xl border border-[var(--border)] hover:border-purple-500/50 cursor-pointer transition-colors">
                       <h4 className="font-semibold text-sm leading-snug mb-2">{exp.title}</h4>
                       <p className="text-xs text-[var(--muted-foreground)] font-medium">{exp.author} • {exp.date}</p>
                     </div>
                   ))}
                 </div>
              </div>

              {/* Frequently Asked */}
              <div className="glass p-6 rounded-2xl border border-[var(--border)]">
                 <div className="flex items-center gap-2 mb-6">
                   <CheckCircle className="text-green-500" />
                   <h3 className="text-xl font-bold">Quick FAQs</h3>
                 </div>
                 <div className="space-y-6">
                   {activeCompany.faq.map((item, i) => (
                     <div key={i}>
                       <h4 className="font-semibold text-sm mb-1">{item.q}</h4>
                       <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{item.a}</p>
                     </div>
                   ))}
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
};

export default CompanyPrep;
