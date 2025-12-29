"use client"

import React, { useState, useEffect } from "react"
import {
  Folder,
  ChevronRight,
  RotateCcw,
  Search,
  MoreHorizontal,
  FileCode,
  Plus,
  LayoutGrid,
  List,
  ArrowUp,
} from "lucide-react"
import type { FileItem } from "../types"
import { showNotification } from "../utils/notifications"

interface FileManagerProps {
  onFileSelect?: (file: FileItem & { path: string }) => void
}

export const FileManager: React.FC<FileManagerProps> = ({ onFileSelect }) => {
  const [files, setFiles] = useState<FileItem[]>([])
  const [currentPath, setCurrentPath] = useState(".")
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const fetchFiles = async (path: string) => {
    try {
      setIsLoading(true)
      const res = await fetch(`/api/developer/files?path=${encodeURIComponent(path)}`)
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "Failed to fetch files" }))
        throw new Error(errorData.error || "API Offline")
      }
      const data = await res.json()
      if (data.files) {
        console.log("[v0] Auto-detected files:", data.files.length)
        setFiles(data.files)
      }
    } catch (err: any) {
      console.error("[v0] File Manager Error:", err.message)
      setFiles([])
      showNotification("error", `Gagal memuat file: ${err.message}`, 3000)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFiles(currentPath)
  }, [currentPath])

  const navigateUp = () => {
    const parts = currentPath.split("/")
    if (parts.length > 1) setCurrentPath(parts.slice(0, -1).join("/"))
    else setCurrentPath(".")
  }

  const handleFileClick = (file: FileItem) => {
    if (file.isDirectory) {
      setCurrentPath(`${currentPath === "." ? "" : currentPath + "/"}${file.name}`)
    } else if (onFileSelect) {
      onFileSelect({ ...file, path: `${currentPath === "." ? "" : currentPath + "/"}${file.name}` })
    }
  }

  const filteredFiles = files.filter((f) => f.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-white tracking-tighter">Vault Explorer</h1>
          <p className="text-blue-400 font-bold uppercase tracking-[0.2em] text-[10px] mt-2">Path Sync: Active</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-3 px-8 py-4 bg-blue-600 text-white rounded-[2rem] font-black shadow-2xl shadow-blue-900/50 hover:bg-blue-700 transition-all hover:scale-105 active:scale-95">
            <Plus size={20} />
            <span className="text-sm">CREATE NEW</span>
          </button>
        </div>
      </div>

      <div className="bg-slate-900 rounded-[3.5rem] border border-slate-800 shadow-[0_40px_80px_rgb(0,0,0,0.6)] overflow-hidden flex flex-col min-h-[700px]">
        <div className="p-8 border-b border-slate-800 flex flex-col lg:flex-row gap-6 items-center justify-between bg-slate-800/50">
          <div className="flex items-center gap-3 px-6 py-3 bg-slate-800 rounded-[2rem] border border-slate-700 shadow-sm w-full lg:w-auto">
            <Folder size={18} className="text-blue-400" />
            <div className="flex items-center text-xs font-black text-white truncate">
              {currentPath.split("/").map((part, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <ChevronRight size={14} className="mx-2 text-slate-600" />}
                  <span className="hover:text-blue-400 cursor-pointer">{part}</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="flex bg-slate-800 p-1 rounded-[1.5rem] border border-slate-700 shadow-sm">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-2xl transition-all ${viewMode === "grid" ? "bg-blue-600 text-white shadow-lg" : "text-slate-500"}`}
              >
                <LayoutGrid size={18} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-2xl transition-all ${viewMode === "list" ? "bg-blue-600 text-white shadow-lg" : "text-slate-500"}`}
              >
                <List size={18} />
              </button>
            </div>

            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-6 py-3.5 bg-slate-800 border border-slate-700 rounded-[1.5rem] text-xs font-black text-white placeholder:text-slate-500 outline-none focus:ring-4 focus:ring-blue-900/50"
              />
            </div>
            <button
              onClick={() => fetchFiles(currentPath)}
              className="p-3.5 bg-slate-800 text-slate-400 rounded-full border border-slate-700 hover:text-white transition-all shadow-sm"
            >
              <RotateCcw size={20} className={isLoading ? "animate-spin" : ""} />
            </button>
          </div>
        </div>

        <div className="flex-1 p-10 overflow-y-auto">
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8" : "space-y-3"
            }
          >
            {currentPath !== "." && (
              <div
                onClick={navigateUp}
                className={`
                  group p-6 bg-slate-800/50 border border-slate-700 rounded-[2.5rem] flex items-center justify-center cursor-pointer hover:bg-slate-800 hover:shadow-xl transition-all
                  ${viewMode === "list" ? "flex-row h-16 py-0" : "flex-col aspect-square"}
                `}
              >
                <ArrowUp size={28} className="text-slate-500 group-hover:text-blue-400 transition-colors" />
                <span
                  className={`text-xs font-black text-slate-400 mt-3 uppercase tracking-widest ${viewMode === "list" ? "ml-4 mt-0" : ""}`}
                >
                  Navigate Up
                </span>
              </div>
            )}

            {filteredFiles.map((file, idx) => (
              <div
                key={file.name}
                onClick={() => handleFileClick(file)}
                className={`
                  group relative bg-slate-800 border border-slate-700 rounded-[2.5rem] flex items-center cursor-pointer transition-all duration-500 hover:border-blue-600 hover:shadow-2xl hover:-translate-y-1
                  ${viewMode === "grid" ? "flex-col p-8 aspect-square justify-center" : "flex-row p-4 gap-6"}
                `}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div
                  className={`
                  rounded-[1.5rem] flex items-center justify-center transition-all duration-500
                  ${
                    file.isDirectory
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/50 group-hover:rotate-12"
                      : "bg-slate-700 text-slate-400 group-hover:bg-slate-600 group-hover:text-blue-400"
                  }
                  ${viewMode === "grid" ? "w-20 h-20 mb-6" : "w-12 h-12"}
                `}
                >
                  {file.isDirectory ? <Folder size={32} fill="currentColor" /> : <FileCode size={28} />}
                </div>

                <div className={`min-w-0 ${viewMode === "grid" ? "text-center w-full" : "flex-1"}`}>
                  <h4 className="text-sm font-black text-white truncate tracking-tight">{file.name}</h4>
                  <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">
                    {file.isDirectory ? "DIR" : "FILE"}
                  </p>
                </div>

                <button
                  className={`p-2 text-slate-600 hover:text-blue-400 transition-colors ${viewMode === "grid" ? "absolute top-6 right-6 opacity-0 group-hover:opacity-100" : ""}`}
                >
                  <MoreHorizontal size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 bg-blue-950 text-white border-t border-slate-800">
          <div className="max-w-4xl border-l-[6px] border-blue-400 pl-10 py-4">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300 mb-2">Filesystem Audit</h5>
            <p className="text-sm text-blue-100 italic font-medium leading-relaxed">
              "Security integrity checks are performed automatically every 15 minutes. Unauthorized access attempts to
              the root directory are strictly prohibited and logged."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
