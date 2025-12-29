import React from 'react';
import { Search, Bell, Menu, Github, Power, RefreshCcw, Command, User } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
  return (
    <div className="px-4 md:px-8 pt-6">
      <header className="h-20 px-6 flex items-center shrink-0 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-purple-50 rounded-[2.5rem] backdrop-blur-md">
        <button 
          onClick={toggleSidebar} 
          className="lg:hidden p-3 mr-4 text-purple-500 bg-purple-50 rounded-2xl transition-all active:scale-95"
        >
          <Menu size={20} />
        </button>

        <div className="flex-1 max-w-xl relative group hidden md:block">
          <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
            <Search className="text-purple-300 group-focus-within:text-purple-600 transition-colors" size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search processes..." 
            className="w-full bg-purple-50/50 border-none rounded-[1.5rem] py-3.5 pl-14 pr-12 text-sm font-semibold text-purple-900 placeholder:text-purple-200 focus:ring-4 focus:ring-purple-100 transition-all outline-none"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1.5 px-2 py-1 bg-white rounded-lg border border-purple-100 shadow-sm">
             <Command size={10} className="text-purple-300" />
             <span className="text-[10px] font-black text-purple-300">K</span>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button className="hidden sm:flex p-3 text-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all rounded-[1.5rem] border border-purple-50">
            <Github size={20} />
          </button>

          <button className="relative p-3 text-purple-400 hover:text-purple-600 hover:bg-purple-50 transition-all rounded-[1.5rem] border border-purple-50">
            <Bell size={20} />
            <span className="absolute top-3.5 right-3.5 w-2 h-2 bg-purple-600 rounded-full border border-white shadow-sm animate-ping" />
          </button>

          <div className="h-10 w-[1px] bg-purple-50 mx-2 hidden sm:block" />

          <button className="flex items-center gap-3 p-1.5 bg-purple-50 rounded-[1.5rem] border border-purple-100 hover:border-purple-300 transition-all group">
            <div className="w-9 h-9 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-lg shadow-purple-200 group-hover:rotate-12 transition-transform">
              <User size={18} />
            </div>
            <span className="hidden sm:inline text-xs font-black text-purple-900 pr-3">ADMIN</span>
          </button>
        </div>
      </header>
    </div>
  );
};
