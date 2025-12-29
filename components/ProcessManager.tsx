import React, { useState } from 'react';
import { Server, RotateCcw, Square, Play, MoreVertical, Cpu, Database, Activity, LayoutGrid, List } from 'lucide-react';
import { ProcessItem } from '../types';

export const ProcessManager: React.FC = () => {
  const [processes, setProcesses] = useState<ProcessItem[]>([
    { name: 'echo-core-v2', status: 'online', cpu: 8, memory: 256, uptime: '12d 4h' },
    { name: 'auth-microservice', status: 'online', cpu: 1, memory: 92, uptime: '2d 12m' },
    { name: 'cdn-balancer', status: 'online', cpu: 15, memory: 512, uptime: '45m' },
    { name: 'legacy-bridge', status: 'stopped', cpu: 0, memory: 0, uptime: '0s' },
  ]);

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-purple-900 tracking-tighter">Instance Control</h1>
          <p className="text-purple-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">PM2 Bridge: Active</p>
        </div>
        <div className="flex bg-white p-1 rounded-[1.5rem] border border-purple-100 shadow-sm">
          <button className="p-3 bg-purple-600 text-white rounded-2xl shadow-lg shadow-purple-100"><LayoutGrid size={20} /></button>
          <button className="p-3 text-purple-200 hover:text-purple-600 transition-all"><List size={20} /></button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {processes.map((proc, idx) => (
          <div 
            key={proc.name} 
            className="group bg-white rounded-[3rem] p-10 border border-purple-50 shadow-[0_15px_45px_rgb(0,0,0,0.03)] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 animate-in zoom-in-95"
            style={{ animationDelay: `${idx * 150}ms` }}
          >
            <div className="flex items-center justify-between mb-10">
              <div className={`p-5 rounded-[1.5rem] shadow-lg ${proc.status === 'online' ? 'bg-purple-600 text-white shadow-purple-100' : 'bg-purple-50 text-purple-200 shadow-none'}`}>
                <Server size={32} />
              </div>
              <div className="flex gap-2">
                {proc.status === 'online' ? (
                  <>
                    <button className="p-3.5 bg-purple-50 text-purple-400 hover:text-purple-700 hover:bg-purple-100 rounded-2xl transition-all"><RotateCcw size={18} /></button>
                    <button className="p-3.5 bg-purple-50 text-purple-400 hover:text-purple-700 hover:bg-purple-100 rounded-2xl transition-all"><Square size={18} /></button>
                  </>
                ) : (
                  <button className="p-3.5 bg-purple-600 text-white rounded-2xl shadow-lg shadow-purple-100"><Play size={18} /></button>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-xl font-black text-purple-900 tracking-tight truncate">{proc.name}</h4>
                  <span className={`w-3 h-3 rounded-full ${proc.status === 'online' ? 'bg-purple-500 animate-pulse' : 'bg-purple-100'}`} />
                </div>
                <p className="text-[10px] font-black text-purple-300 uppercase tracking-[0.2em]">{proc.status === 'online' ? 'Application Online' : 'Instance Paused'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-50/50 p-5 rounded-[1.5rem] border border-purple-100/50">
                  <div className="flex items-center gap-2 text-purple-300 mb-2">
                    <Cpu size={14} />
                    <span className="text-[9px] font-black uppercase tracking-wider">CPU</span>
                  </div>
                  <span className="text-lg font-black text-purple-900">{proc.cpu}%</span>
                </div>
                <div className="bg-purple-50/50 p-5 rounded-[1.5rem] border border-purple-100/50">
                  <div className="flex items-center gap-2 text-purple-300 mb-2">
                    <Database size={14} />
                    <span className="text-[9px] font-black uppercase tracking-wider">RAM</span>
                  </div>
                  <span className="text-lg font-black text-purple-900">{proc.memory}MB</span>
                </div>
              </div>

              <div className="pt-6 border-t border-purple-50 flex justify-between items-center">
                <span className="text-[10px] font-black text-purple-300 uppercase tracking-widest">Active For</span>
                <span className="text-xs font-black text-purple-900 font-mono italic">{proc.uptime}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-4xl border-l-[8px] border-purple-600 pl-10 bg-white py-10 rounded-r-[3rem] shadow-sm mt-10">
        <h5 className="text-[11px] font-black text-purple-900 mb-4 uppercase tracking-[0.3em]">Runtime Policy</h5>
        <p className="text-purple-400 italic leading-relaxed text-base font-bold">
          "Memory management unit (MMU) is handling process distribution across nodes. Current policy prevents CPU spikes over 90% for sustained periods. System is healthy."
        </p>
      </div>
    </div>
  );
};
