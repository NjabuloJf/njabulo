"use client"

import type React from "react"
import { useState, useCallback, useRef, useEffect } from "react"
import { Save, Search, X, FileCode, CornerDownLeft, Undo, Redo, SearchCode, Type, Copy, Download } from "lucide-react"

interface CodeEditorProps {
  fileName: string
  initialContent: string
  onContentChange?: (content: string) => void
  onSave?: (fileName: string, content: string) => void
  filePath?: string
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  fileName,
  initialContent,
  onContentChange,
  onSave,
  filePath,
}) => {
  const [content, setContent] = useState(initialContent)
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [replaceQuery, setReplaceQuery] = useState("")
  const [searchMatches, setSearchMatches] = useState(0)
  const [currentMatch, setCurrentMatch] = useState(0)
  const [history, setHistory] = useState<string[]>([initialContent])
  const [historyIndex, setHistoryIndex] = useState(0)
  const [lineCount, setLineCount] = useState(1)
  const [cursorPos, setCursorPos] = useState({ line: 1, col: 1 })
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const [isSaved, setIsSaved] = useState(true)

  const updateCursorPosition = () => {
    if (!textAreaRef.current) return
    const textarea = textAreaRef.current
    const text = textarea.value.substring(0, textarea.selectionStart)
    const lines = text.split("\n")
    const line = lines.length
    const col = lines[lines.length - 1].length + 1
    setCursorPos({ line, col })
  }

  const updateLineCount = (text: string) => {
    setLineCount(text.split("\n").length)
  }

  const addToHistory = useCallback(
    (newContent: string) => {
      const newHistory = history.slice(0, historyIndex + 1)
      newHistory.push(newContent)
      setHistory(newHistory)
      setHistoryIndex(newHistory.length - 1)
      setIsSaved(false)
    },
    [history, historyIndex],
  )

  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1
      setHistoryIndex(newIndex)
      setContent(history[newIndex])
      updateLineCount(history[newIndex])
    }
  }, [history, historyIndex])

  const handleRedo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1
      setHistoryIndex(newIndex)
      setContent(history[newIndex])
      updateLineCount(history[newIndex])
    }
  }, [history, historyIndex])

  const handleContentChange = (newContent: string) => {
    setContent(newContent)
    updateLineCount(newContent)
    updateCursorPosition()
    addToHistory(newContent)
    if (onContentChange) onContentChange(newContent)
  }

  const handleSearch = useCallback(() => {
    if (!searchQuery) {
      setSearchMatches(0)
      return
    }
    const matches = (content.match(new RegExp(searchQuery, "g")) || []).length
    setSearchMatches(matches)
    setCurrentMatch(0)
  }, [searchQuery, content])

  useEffect(() => {
    handleSearch()
  }, [searchQuery, content, handleSearch])

  const handleReplace = (replaceAll = false) => {
    if (!searchQuery) return

    let newContent: string
    if (replaceAll) {
      newContent = content.replaceAll(searchQuery, replaceQuery)
    } else {
      newContent = content.replace(searchQuery, replaceQuery)
    }

    handleContentChange(newContent)
    if (!replaceAll) setCurrentMatch((prev) => (prev + 1) % Math.max(searchMatches - 1, 1))
  }

  const handleSave = () => {
    if (onSave) {
      onSave(fileName, content)
    }
    setIsSaved(true)
    alert(`✓ Saved: ${fileName}`)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    alert("Code copied to clipboard!")
  }

  const handleDownload = () => {
    const element = document.createElement("a")
    element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(content))
    element.setAttribute("download", fileName)
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const handleClear = () => {
    if (confirm("Clear all content? This cannot be undone immediately.")) {
      handleContentChange("")
    }
  }

  return (
    <div className="h-full flex flex-col bg-white rounded-[3rem] border border-purple-50 shadow-2xl overflow-hidden min-h-[700px]">
      <div className="px-8 py-5 bg-purple-50/50 border-b border-purple-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-purple-600 text-white rounded-[1rem] shadow-lg shadow-purple-100">
            <FileCode size={20} />
          </div>
          <div>
            <h4 className="text-sm font-black text-purple-900 tracking-tight flex items-center gap-2">
              {fileName}
              {!isSaved && <span className="w-2 h-2 rounded-full bg-orange-500" />}
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className={`w-2 h-2 rounded-full ${isSaved ? "bg-emerald-500" : "bg-orange-500"}`} />
              <span className="text-[9px] font-black text-purple-300 uppercase tracking-widest">
                {isSaved ? "Saved" : "Unsaved Changes"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white p-1.5 rounded-[1.5rem] border border-purple-100 shadow-sm overflow-x-auto">
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={`p-2.5 rounded-2xl transition-all whitespace-nowrap ${showSearch ? "bg-purple-600 text-white shadow-lg" : "text-purple-300 hover:text-purple-600"}`}
            title="Search & Replace"
          >
            <Search size={18} />
          </button>
          <div className="w-[1px] h-6 bg-purple-50 mx-1" />
          <button
            onClick={handleUndo}
            disabled={historyIndex === 0}
            className="p-2.5 text-purple-300 hover:text-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            title="Undo"
          >
            <Undo size={18} />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex === history.length - 1}
            className="p-2.5 text-purple-300 hover:text-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            title="Redo"
          >
            <Redo size={18} />
          </button>
          <div className="w-[1px] h-6 bg-purple-50 mx-1" />
          <button
            onClick={handleCopy}
            className="p-2.5 text-purple-300 hover:text-purple-600 transition-all"
            title="Copy to clipboard"
          >
            <Copy size={18} />
          </button>
          <button
            onClick={handleDownload}
            className="p-2.5 text-purple-300 hover:text-purple-600 transition-all"
            title="Download file"
          >
            <Download size={18} />
          </button>
          <div className="w-[1px] h-6 bg-purple-50 mx-1" />
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 bg-purple-600 text-white rounded-2xl font-black text-xs hover:bg-purple-700 transition-all shadow-lg shadow-purple-100"
          >
            <Save size={16} />
            <span>SAVE</span>
          </button>
        </div>
      </div>

      {showSearch && (
        <div className="px-8 py-4 bg-purple-50/30 border-b border-purple-50 animate-in slide-in-from-top-4 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <label className="text-[9px] font-black text-purple-300 uppercase tracking-widest pl-2">
                Find Content
              </label>
              <div className="relative">
                <SearchCode className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-200" size={16} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-purple-100 rounded-xl py-2 pl-12 pr-4 text-xs font-bold text-purple-900 focus:ring-4 focus:ring-purple-50 outline-none"
                  placeholder="String to find..."
                />
                {searchMatches > 0 && (
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-purple-400">
                    {currentMatch + 1}/{searchMatches}
                  </span>
                )}
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <label className="text-[9px] font-black text-purple-300 uppercase tracking-widest pl-2">
                Replace With
              </label>
              <div className="relative">
                <Type className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-200" size={16} />
                <input
                  type="text"
                  value={replaceQuery}
                  onChange={(e) => setReplaceQuery(e.target.value)}
                  className="w-full bg-white border border-purple-100 rounded-xl py-2 pl-12 pr-4 text-xs font-bold text-purple-900 focus:ring-4 focus:ring-purple-50 outline-none"
                  placeholder="New content..."
                />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 items-center">
            <button
              onClick={() => handleReplace(false)}
              disabled={!searchQuery}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-black text-[10px] hover:bg-blue-200 transition-all uppercase tracking-widest disabled:opacity-50"
            >
              Replace Next
            </button>
            <button
              onClick={() => handleReplace(true)}
              disabled={!searchQuery}
              className="px-4 py-2 bg-purple-100 text-purple-700 rounded-xl font-black text-[10px] hover:bg-purple-200 transition-all uppercase tracking-widest disabled:opacity-50"
            >
              Replace All
            </button>
            <button
              onClick={() => setShowSearch(false)}
              className="p-2.5 text-purple-300 hover:text-purple-600 ml-auto"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        <div className="w-16 bg-purple-50/20 border-r border-purple-50 flex flex-col py-10 items-end pr-5 select-none overflow-hidden">
          {Array.from({ length: lineCount }, (_, i) => (
            <span key={i} className="text-[11px] font-black text-purple-200 h-6 leading-6 font-mono">
              {i + 1}
            </span>
          ))}
        </div>

        <textarea
          ref={textAreaRef}
          value={content}
          onChange={(e) => handleContentChange(e.target.value)}
          onMouseUp={updateCursorPosition}
          onKeyUp={updateCursorPosition}
          spellCheck={false}
          className="flex-1 p-10 font-mono text-sm text-purple-900 bg-white outline-none resize-none leading-6 custom-scrollbar"
          placeholder="Start typing your code..."
        />
      </div>

      <div className="px-8 py-3 bg-purple-900 text-purple-300 flex items-center justify-between text-[10px] font-black uppercase tracking-widest overflow-x-auto">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2">
            <CornerDownLeft size={12} />
            UTF-8
          </span>
          <span>Characters: {content.length}</span>
          <span>Lines: {lineCount}</span>
        </div>
        <span>
          Line {cursorPos.line}, Col {cursorPos.col}
        </span>
      </div>
    </div>
  )
}
