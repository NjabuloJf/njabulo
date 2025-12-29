"use client"

import type React from "react"
import { LayoutDashboard, Terminal, FolderOpen, Cpu, X, ShieldCheck, Zap } from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  setOpen: (open: boolean) => void
  activeView: string
  setActiveView: (view: any) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setOpen, activeView, setActiveView }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "processes", label: "Processes", icon: Cpu },
    { id: "terminal", label: "PM2 Logs", icon: Terminal },
    { id: "files", label: "File Manager", icon: FolderOpen },
  ]

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-md z-40 lg:hidden" onClick={() => setOpen(false)} />
      )}

      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-slate-900 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static border-r border-slate-800
      `}
      >
        <div className="h-24 flex items-center px-8 gap-4 shrink-0">
          <div className="relative group p-1 bg-slate-800 rounded-[2rem]">
            <img
              src="https://files.catbox.moe/p7e3rx.jpg"
              alt="Logo"
              className="w-12 h-12 rounded-[1.5rem] object-cover shadow-sm group-hover:scale-105 transition-transform"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-xl tracking-tighter text-white">ECHO</span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-blue-400 font-extrabold">Console v2.0</span>
          </div>
          <button onClick={() => setOpen(false)} className="ml-auto lg:hidden p-2 text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-8 space-y-3 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveView(item.id)
                if (window.innerWidth < 1024) setOpen(false)
              }}
              className={`
                w-full flex items-center gap-4 px-5 py-4 rounded-[2.5rem] transition-all duration-300
                ${
                  activeView === item.id
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-900/50 scale-[1.02]"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }
              `}
            >
              <item.icon size={22} className={activeView === item.id ? "text-white" : "text-slate-500"} />
              <span className="text-sm font-bold tracking-tight">{item.label}</span>
              {activeView === item.id && <Zap size={14} className="ml-auto animate-pulse" />}
            </button>
          ))}
        </nav>

        <div className="p-6">
          <div className="p-5 bg-slate-800/50 rounded-[2.5rem] border border-slate-700/50 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-700 shadow-sm flex items-center justify-center text-blue-400">
                <ShieldCheck size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-black text-white">Root Access</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Encrypted</span>
              </div>
            </div>
            <div className="h-2 w-full bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full w-2/3 bg-blue-600 rounded-full" />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
