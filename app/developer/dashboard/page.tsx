"use client"

import { useState, useEffect } from "react"
import { Sidebar } from "@/components/Sidebar"
import { Header } from "@/components/Header"
import { Dashboard } from "@/components/Dashboard"
import { TerminalView } from "@/components/TerminalView"
import { FileManager } from "@/components/FileManager"
import { ProcessManager } from "@/components/ProcessManager"
import { CodeEditor } from "@/components/CodeEditor"
import type { FileItem } from "@/types"

type View = "dashboard" | "terminal" | "files" | "processes" | "editor"

export default function DashboardPage() {
  const [activeView, setActiveView] = useState<View>("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [editingFile, setEditingFile] = useState<(FileItem & { path: string }) | null>(null)
  const [fileContent, setFileContent] = useState("")
  const [isLoadingContent, setIsLoadingContent] = useState(false)

  const handleFileSelect = async (file: FileItem & { path: string; content?: string }) => {
    setEditingFile(file)
    setIsLoadingContent(true)

    try {
      // If content is already provided from FileManager, use it directly
      if (file.content) {
        setFileContent(file.content)
      } else {
        // Otherwise fetch from API
        const response = await fetch(`/api/developer/files?path=${encodeURIComponent(file.path)}`)
        if (response.ok) {
          const data = await response.json()
          setFileContent(data.content || "")
        } else {
          setFileContent("")
        }
      }
    } catch (error) {
      console.log("[v0] Error loading file content:", error)
      setFileContent("")
    } finally {
      setIsLoadingContent(false)
    }

    setActiveView("editor")
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(true)
      else setSidebarOpen(false)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const renderView = () => {
    switch (activeView) {
      case "dashboard":
        return <Dashboard />
      case "terminal":
        return <TerminalView />
      case "files":
        return <FileManager onFileSelect={handleFileSelect} />
      case "processes":
        return <ProcessManager />
      case "editor":
        return editingFile ? (
          isLoadingContent ? (
            <div className="text-center py-20">
              <p className="text-blue-400">Loading file content...</p>
            </div>
          ) : (
            <CodeEditor
              fileName={editingFile.name}
              filePath={editingFile.path}
              initialContent={fileContent}
              onContentChange={(newContent) => setFileContent(newContent)}
              onSave={async (fileName, content) => {
                try {
                  const response = await fetch("/api/developer/files", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      filePath: editingFile.path,
                      content,
                    }),
                  })
                  if (response.ok) {
                    console.log(`[v0] File ${fileName} saved successfully`)
                  }
                } catch (error) {
                  console.log("[v0] Error saving file:", error)
                }
              }}
            />
          )
        ) : (
          <div className="text-center py-20">
            <p className="text-slate-400">No file selected. Go to Files to select a file to edit.</p>
          </div>
        )
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950">
      <Sidebar isOpen={sidebarOpen} setOpen={setSidebarOpen} activeView={activeView} setActiveView={setActiveView} />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            {renderView()}
          </div>
        </main>
      </div>
    </div>
  )
}
