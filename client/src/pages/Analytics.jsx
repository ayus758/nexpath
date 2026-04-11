import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Target, Activity, Zap, TrendingUp, AlertTriangle } from 'lucide-react';

const mockPerformanceData = [
  { name: 'Week 1', score: 45, accuracy: 60 },
  { name: 'Week 2', score: 52, accuracy: 65 },
  { name: 'Week 3', score: 48, accuracy: 62 },
  { name: 'Week 4', score: 70, accuracy: 75 },
  { name: 'Week 5', score: 85, accuracy: 82 },
  { name: 'Week 6', score: 92, accuracy: 88 },
];

const mockTests = [
  { id: 1, title: 'TCS NQT Full Mock 1', score: 85, total: 100, date: 'Oct 12', weakAreas: ['Quantitative Aptitude'] },
  { id: 2, title: 'Google SDE Mock DSA', score: 92, total: 100, date: 'Oct 18', weakAreas: ['Dynamic Programming'] },
  { id: 3, title: 'OS & DBMS Core Test', score: 70, total: 100, date: 'Oct 21', weakAreas: ['Concurrency', 'Normalization'] }
];

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('Overview');

  return (
    <div className="p-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">Performance Analytics</h1>
        <p className="text-[var(--muted-foreground)]">Track your mock test scores, accuracy trends, and identify skill gaps.</p>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 mb-8 md:grid-cols-4 gap-6">
        <div className="p-6 rounded-2xl glass border border-[var(--border)] flex items-center gap-4">
          <div className="p-4 bg-purple-500/10 rounded-xl text-purple-500"><Target size={24} /></div>
          <div>
            <p className="text-[var(--muted-foreground)] text-sm">Average Score</p>
            <h3 className="text-2xl font-bold">82.3%</h3>
          </div>
        </div>
        <div className="p-6 rounded-2xl glass border border-[var(--border)] flex items-center gap-4">
          <div className="p-4 bg-green-500/10 rounded-xl text-green-500"><TrendingUp size={24} /></div>
          <div>
            <p className="text-[var(--muted-foreground)] text-sm">Overall Accuracy</p>
            <h3 className="text-2xl font-bold">78.5%</h3>
          </div>
        </div>
        <div className="p-6 rounded-2xl glass border border-[var(--border)] flex items-center gap-4">
          <div className="p-4 bg-orange-500/10 rounded-xl text-orange-500"><Zap size={24} /></div>
          <div>
            <p className="text-[var(--muted-foreground)] text-sm">Tests Attempted</p>
            <h3 className="text-2xl font-bold">24</h3>
          </div>
        </div>
        <div className="p-6 rounded-2xl glass border border-[var(--border)] flex items-center gap-4 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="p-4 bg-red-500/10 rounded-xl text-red-500"><AlertTriangle size={24} /></div>
          <div>
            <p className="text-[var(--muted-foreground)] text-sm">Skill Gaps</p>
            <h3 className="text-2xl font-bold">3 Topics</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart Area */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass p-6 rounded-2xl border border-[var(--border)]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Score Progression</h3>
              <select className="bg-[var(--secondary)] border border-[var(--border)] rounded-lg px-3 py-1 text-sm bg-transparent">
                <option>Last 6 Weeks</option>
                <option>Last 3 Months</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockPerformanceData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                  <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} />
                  <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                  <Area type="monotone" dataKey="score" stroke="#a855f7" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Mock Tests */}
          <div className="glass p-6 rounded-2xl border border-[var(--border)]">
             <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold">Recent Mock Tests</h3>
                <button className="text-sm text-purple-500 font-semibold hover:text-purple-400">View All</button>
             </div>
             <div className="space-y-4">
                {mockTests.map(test => (
                  <div key={test.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[var(--secondary)]/50 rounded-xl border border-[var(--border)]">
                     <div>
                       <h4 className="font-bold text-[var(--foreground)]">{test.title}</h4>
                       <p className="text-sm text-[var(--muted-foreground)] mt-1">{test.date} · {test.weakAreas.join(', ')} flagged</p>
                     </div>
                     <div className="mt-4 sm:mt-0 flex items-center gap-4">
                       <span className={`px-4 py-2 rounded-lg font-bold
                         ${test.score >= 80 ? 'bg-green-500/10 text-green-500' : 
                           test.score >= 60 ? 'bg-orange-500/10 text-orange-500' : 'bg-red-500/10 text-red-500'}`}>
                         {test.score} / {test.total}
                       </span>
                       <button className="text-sm font-medium border border-[var(--border)] hover:bg-[var(--border)] px-3 py-2 rounded-lg transition-colors">
                         Review
                       </button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Right Sidebar - Skill Gap Analyzer */}
        <div className="space-y-8">
          <div className="glass p-6 rounded-2xl border border-[var(--border)] border-t-4 border-t-red-500 relative overflow-hidden">
             
             <div className="flex items-center gap-3 mb-6">
               <AlertTriangle className="text-red-500" />
               <h3 className="text-xl font-bold">Skill Gap Analyzer</h3>
             </div>
             
             <p className="text-sm text-[var(--muted-foreground)] mb-6">
               Based on your recent mock test performance, PrepFusion AI has identified the following areas requiring immediate attention.
             </p>

             <div className="space-y-6">
               {[
                 { topic: 'Dynamic Programming', severity: 'Critical', progress: 35 },
                 { topic: 'Concurrency (OS)', severity: 'High', progress: 50 },
                 { topic: 'Quantitative Aptitude', severity: 'Medium', progress: 65 }
               ].map((gap, i) => (
                 <div key={i}>
                   <div className="flex justify-between items-center mb-2">
                     <span className="font-semibold text-sm">{gap.topic}</span>
                     <span className={`text-xs px-2 py-1 rounded font-bold
                       ${gap.severity === 'Critical' ? 'bg-red-500/20 text-red-500' :
                         gap.severity === 'High' ? 'bg-orange-500/20 text-orange-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                       {gap.severity}
                     </span>
                   </div>
                   <div className="w-full bg-[var(--secondary)] rounded-full h-2">
                     <div 
                       className={`h-2 rounded-full ${gap.severity === 'Critical' ? 'bg-red-500' : gap.severity === 'High' ? 'bg-orange-500' : 'bg-yellow-500'}`} 
                       style={{ width: `${gap.progress}%` }}>
                     </div>
                   </div>
                   <button className="mt-3 text-xs flex items-center gap-1 text-purple-400 hover:text-purple-300 font-medium">
                     Generate dynamic practice set →
                   </button>
                 </div>
               ))}
             </div>
          </div>

          <div className="glass p-6 rounded-2xl border border-[var(--border)] bg-gradient-to-br from-purple-500/5 to-blue-500/5">
            <h3 className="text-lg font-bold mb-2">Take a new Mock Test</h3>
            <p className="text-sm text-[var(--muted-foreground)] mb-4">Simulate a real exam environment to calibrate your metrics.</p>
            <button className="w-full py-3 bg-[var(--foreground)] text-[var(--background)] font-bold rounded-xl hover:opacity-90 transition-opacity">
              Start Evaluation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
