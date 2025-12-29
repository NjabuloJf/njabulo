"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Cpu, Activity, TrendingUp, Zap, ArrowUpRight, Cloud, Layers } from "lucide-react"

const generateMockData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    time: `${i}:00`,
    cpu: Math.floor(Math.random() * 40) + 10,
    mem: Math.floor(Math.random() * 30) + 50,
    net: Math.floor(Math.random() * 500) + 100,
  }))
}

export const Dashboard: React.FC = () => {
  const [data, setData] = useState(generateMockData())

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const newData = [
          ...prev.slice(1),
          {
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
            cpu: Math.floor(Math.random() * 40) + 10,
            mem: Math.floor(Math.random() * 30) + 50,
            net: Math.floor(Math.random() * 500) + 100,
          },
        ]
        return newData
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">System Pulse</h1>
          <p className="text-blue-400 mt-2 font-bold uppercase tracking-widest text-xs">
            Live Environment: node-vps-primary
          </p>
        </div>
        <div className="flex items-center gap-4 bg-slate-800/50 p-2 rounded-[2rem] border border-slate-700">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-slate-700 border-2 border-slate-800 flex items-center justify-center text-blue-400 font-black text-xs"
              >
                S{i}
              </div>
            ))}
          </div>
          <span className="text-xs font-black text-white pr-4 uppercase tracking-widest">Active Instances</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard label="Processor" value={`${data[data.length - 1].cpu}%`} icon={Cpu} trend="+1.2%" />
        <StatCard label="Memory" value={`${data[data.length - 1].mem}%`} icon={Layers} trend="-0.4%" />
        <StatCard label="Bandwidth" value={`${data[data.length - 1].net}Mb`} icon={Cloud} trend="+8.1%" />
        <StatCard label="Requests" value="1.2k" icon={Activity} trend="Stable" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 bg-slate-900 rounded-[3rem] border border-slate-800 p-10 shadow-[0_20px_50px_rgb(0,0,0,0.6)]">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-5">
              <div className="p-4 bg-blue-600 text-white rounded-[1.5rem] shadow-lg shadow-blue-900/50">
                <TrendingUp size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">Performance Matrix</h3>
                <p className="text-[10px] text-slate-500 font-extrabold uppercase tracking-[0.2em] mt-1">
                  Real-time CPU Distribution
                </p>
              </div>
            </div>
            <button className="p-3 bg-slate-800 text-blue-400 rounded-2xl hover:bg-slate-700 transition-all">
              <ArrowUpRight size={20} />
            </button>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorMain" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="8 8" vertical={false} stroke="#1e293b" />
                <XAxis dataKey="time" hide />
                <YAxis hide domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    borderRadius: "24px",
                    border: "1px solid #334155",
                    boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.5)",
                    padding: "20px",
                    fontWeight: "800",
                    color: "#fff",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="cpu"
                  stroke="#3b82f6"
                  strokeWidth={6}
                  fill="url(#colorMain)"
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="bg-blue-950 text-white rounded-[3rem] p-10 relative overflow-hidden shadow-2xl flex-1 flex flex-col border border-blue-900/50">
            <Zap className="text-white mb-6 animate-pulse" size={40} />
            <h3 className="text-3xl font-black mb-6 leading-none tracking-tighter">AI Node Optimizer</h3>

            <div className="border-l-[6px] border-blue-400 pl-8 my-8 py-2">
              <p className="text-blue-100 font-bold italic text-base leading-relaxed">
                "System is operating in 'Zen Mode'. Background telemetry has been minimized to prioritize primary thread
                performance."
              </p>
            </div>

            <div className="mt-auto space-y-5">
              <div className="flex justify-between items-center py-4 border-b border-blue-900/30">
                <span className="text-blue-300 font-bold text-sm uppercase tracking-widest">Health</span>
                <span className="font-black text-white">EXCELLENT</span>
              </div>
              <button className="w-full py-5 bg-white text-blue-950 rounded-[2rem] font-black text-sm hover:scale-[1.02] transition-all shadow-xl">
                RUN FULL AUDIT
              </button>
            </div>
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  )
}

const StatCard: React.FC<{ label: string; value: string; icon: any; trend: string }> = ({
  label,
  value,
  icon: Icon,
  trend,
}) => {
  return (
    <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 shadow-[0_10px_40px_rgb(0,0,0,0.6)] hover:shadow-xl hover:-translate-y-2 transition-all duration-500 hover:border-blue-600">
      <div className="flex items-center justify-between mb-6">
        <div className="p-4 rounded-[1.2rem] bg-slate-800 text-blue-400">
          <Icon size={24} />
        </div>
        <div className="text-[10px] font-black px-3 py-1 rounded-full bg-blue-950 text-blue-400 uppercase tracking-widest border border-blue-900/50">
          {trend}
        </div>
      </div>
      <div>
        <p className="text-[11px] font-extrabold text-slate-500 uppercase tracking-[0.25em]">{label}</p>
        <h4 className="text-3xl font-black text-white mt-2 tracking-tighter">{value}</h4>
      </div>
    </div>
  )
}
