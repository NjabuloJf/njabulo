"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Terminal, RefreshCcw, Trash2, Download, Circle, Maximize2 } from "lucide-react"

export const TerminalView: React.FC = () => {
  const [logs, setLogs] = useState<string>(
    "SYSTEM >> Connection established to VPS Cluster 01...\nLOGS >> Streaming PM2 application events...\n",
  )
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const fetchLogs = async () => {
    try {
      setIsLoading(true)
      const res = await fetch("/api/developer/logs")
      if (!res.ok) {
        throw new Error("Gagal mengambil log dari VPS")
      }
      const data = await res.json()

      if (data.logs) {
        setLogs((prev) => {
          const newLogs = prev + data.logs + "\n"
          const lines = newLogs.split("\n")
          if (lines.length > 200) {
            // Increased buffer for real data
            return lines.slice(-200).join("\n")
          }
          return newLogs
        })
      }
    } catch (err: any) {
      const stamp = new Date().toLocaleTimeString()
      setLogs((prev) => prev + `${stamp} [SYSTEM ERROR] VPS Connection lost: ${err.message}\n`)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Fetch immediately on mount
    fetchLogs()

    const interval = setInterval(fetchLogs, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (scrollRef.current) {
      const element = scrollRef.current
      setTimeout(() => {
        element.scrollTop = element.scrollHeight
      }, 0)
    }
  }, [logs])

  const handleDownload = () => {
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(logs))
    element.setAttribute("download", `pm2-logs-${Date.now()}.txt`)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-purple-900 tracking-tighter">PM2 Stream</h1>
          <p className="text-purple-400 font-bold uppercase tracking-widest text-[10px] mt-2">
            Output Buffer: {logs.split("\n").length} lines
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDownload}
            className="p-4 bg-purple-50 text-purple-600 rounded-[1.5rem] hover:bg-purple-100 transition-all shadow-sm"
            title="Download logs"
          >
            <Download size={20} />
          </button>
          <button
            onClick={() => setLogs("")}
            className="p-4 bg-purple-50 text-purple-600 rounded-[1.5rem] hover:bg-purple-100 transition-all shadow-sm"
            title="Clear logs"
          >
            <Trash2 size={20} />
          </button>
          <button
            onClick={fetchLogs}
            className="p-4 bg-purple-600 text-white rounded-[1.5rem] hover:bg-purple-700 transition-all shadow-xl shadow-purple-200"
            title="Refresh logs"
          >
            <RefreshCcw size={20} className={isLoading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] overflow-hidden shadow-[0_30px_60px_rgb(0,0,0,0.06)] border border-purple-50 flex flex-col">
        <div className="px-8 py-5 bg-purple-50/50 flex items-center justify-between border-b border-purple-100">
          <div className="flex gap-2">
            <Circle size={12} className="text-purple-200" fill="currentColor" />
            <Circle size={12} className="text-purple-200" fill="currentColor" />
            <Circle size={12} className="text-purple-200" fill="currentColor" />
          </div>
          <div className="flex items-center gap-3 px-5 py-2 bg-white rounded-full border border-purple-100 shadow-sm">
            <Terminal size={14} className="text-purple-600" />
            <span className="text-[10px] font-black text-purple-900 uppercase tracking-widest">vps.echo.sh ~ logs</span>
          </div>
          <button className="text-purple-300 hover:text-purple-600">
            <Maximize2 size={18} />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="h-[600px] overflow-y-auto p-10 font-mono text-[13px] leading-relaxed custom-scrollbar scroll-smooth bg-white"
        >
          {logs.split("\n").map((line, i) => (
            <div
              key={i}
              className="group flex gap-6 py-1 border-b border-purple-50/30 last:border-0 hover:bg-purple-50/30 transition-colors"
            >
              <span className="text-purple-200 select-none w-10 shrink-0 text-right font-black italic">{i + 1}</span>
              <span
                className={`
                font-medium
                ${line.toLowerCase().includes("error") ? "text-red-600 bg-red-50 px-1 rounded font-black" : "text-purple-800"}
                ${line.toLowerCase().includes("warn") ? "text-yellow-600 italic" : ""}
                ${line.toLowerCase().includes("info") ? "text-blue-400" : ""}
              `}
              >
                {line}
              </span>
            </div>
          ))}
          <div className="flex items-center gap-3 mt-6">
            <div className="w-2.5 h-6 bg-purple-600 animate-[pulse_1s_infinite] rounded-sm" />
            <span className="text-purple-300 text-xs font-black uppercase tracking-widest">
              Syncing with PM2 API...
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
