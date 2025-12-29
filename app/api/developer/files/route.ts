import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"
import { cookies } from "next/headers"

function validateAndSanitizePath(inputPath: string): string | null {
  // Normalize path
  const normalized = path.normalize(inputPath).replace(/^(\.\.[\/\\])+/, '')
  const resolvedPath = path.resolve(process.cwd(), normalized)
  
  // HANYA cegah traversal keluar dari root VPS untuk keamanan
  if (!resolvedPath.startsWith('/')) {
    return null
  }
  
  return resolvedPath
}

export async function GET(request: Request) {
  const cookieStore = await cookies()
  if (cookieStore.get("dev_session")?.value !== "authenticated") {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const dirPath = searchParams.get("path") || "/"
  
  const absolutePath = validateAndSanitizePath(dirPath)
  if (!absolutePath) {
    return NextResponse.json({ error: "Access denied" }, { status: 403 })
  }

  try {
    const stats = await fs.stat(absolutePath)

    if (stats.isFile()) {
      // Hilangkan batasan ukuran file
      try {
        const content = await fs.readFile(absolutePath, "utf8")
        return NextResponse.json({ 
          content, 
          name: path.basename(absolutePath),
          path: absolutePath,
          size: stats.size,
          isBinary: false 
        })
      } catch (readError) {
        // File mungkin binary, kembalikan info saja
        return NextResponse.json({ 
          name: path.basename(absolutePath),
          path: absolutePath,
          size: stats.size,
          isBinary: true,
          error: "File is binary or cannot be read as text"
        })
      }
    }

    const files = await fs.readdir(absolutePath, { withFileTypes: true })
    
    // TAMPILKAN SEMUA FILE TANPA FILTER
    const fileList = await Promise.all(files.map(async (file) => {
      const filePath = path.join(absolutePath, file.name)
      try {
        const fileStats = await fs.stat(filePath)
        return {
          name: file.name,
          isDirectory: file.isDirectory(),
          size: fileStats.size,
          path: filePath,
          created: fileStats.birthtime,
          modified: fileStats.mtime,
          permissions: fileStats.mode.toString(8)
        }
      } catch {
        return {
          name: file.name,
          isDirectory: file.isDirectory(),
          size: 0,
          path: filePath,
          error: "Cannot stat file"
        }
      }
    }))
    
    return NextResponse.json({ 
      files: fileList,
      path: absolutePath,
      count: files.length,
      stats: {
        isDirectory: stats.isDirectory(),
        size: stats.size,
        created: stats.birthtime,
        modified: stats.mtime,
        permissions: stats.mode.toString(8)
      }
    })
  } catch (error) {
    console.error("Error reading directory:", error)
    return NextResponse.json({ 
      error: "Failed to read directory",
      details: (error as Error).message,
      path: absolutePath
    }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const cookieStore = await cookies()
  if (cookieStore.get("dev_session")?.value !== "authenticated") {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const { filePath, content } = await request.json()
    
    const absolutePath = validateAndSanitizePath(filePath)
    if (!absolutePath) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // HILANGKAN BATASAN EKSTENSI FILE - biarkan edit semua file
    await fs.writeFile(absolutePath, content, "utf8")
    console.log(`[logs file] File saved: ${filePath}`)
    
    // Update stats setelah write
    const stats = await fs.stat(absolutePath)
    
    return NextResponse.json({ 
      success: true, 
      message: "File updated successfully",
      stats: {
        size: stats.size,
        modified: stats.mtime
      }
    })
  } catch (error) {
    return NextResponse.json({ 
      error: "Failed to save file",
      details: (error as Error).message 
    }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const cookieStore = await cookies()
  if (cookieStore.get("dev_session")?.value !== "authenticated") {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const { oldPath, newPath } = await request.json()
    const absOldPath = validateAndSanitizePath(oldPath)
    const absNewPath = validateAndSanitizePath(newPath)

    if (!absOldPath || !absNewPath) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    await fs.rename(absOldPath, absNewPath)
    console.log(`[logs file] Renamed: ${oldPath} -> ${newPath}`)
    
    return NextResponse.json({ 
      success: true, 
      message: "Renamed successfully",
      oldPath: absOldPath,
      newPath: absNewPath
    })
  } catch (error) {
    return NextResponse.json({ 
      error: "Rename failed",
      details: (error as Error).message 
    }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const cookieStore = await cookies()
  if (cookieStore.get("dev_session")?.value !== "authenticated") {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const filePath = searchParams.get("path")
    if (!filePath) return NextResponse.json({ error: "Path required" }, { status: 400 })

    const absolutePath = validateAndSanitizePath(filePath)
    if (!absolutePath) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    // PERINGATAN: Hapus semua batasan critical files
    // Hati-hati dengan ini karena bisa menghapus sistem penting!
    
    const stats = await fs.stat(absolutePath)
    if (stats.isDirectory()) {
      await fs.rm(absolutePath, { recursive: true, force: true })
      console.log(`[WARNING] Directory deleted: ${absolutePath}`)
    } else {
      await fs.unlink(absolutePath)
      console.log(`[WARNING] File deleted: ${absolutePath}`)
    }

    return NextResponse.json({ 
      success: true, 
      message: "Deleted successfully",
      deletedPath: absolutePath,
      wasDirectory: stats.isDirectory()
    })
  } catch (error) {
    return NextResponse.json({ 
      error: "Deletion failed",
      details: (error as Error).message 
    }, { status: 500 })
  }
}

// Fungsi tambahan untuk mendapatkan info sistem
export async function HEAD(request: Request) {
  const cookieStore = await cookies()
  if (cookieStore.get("dev_session")?.value !== "authenticated") {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const dirPath = searchParams.get("path") || "/"
    
    const absolutePath = validateAndSanitizePath(dirPath)
    if (!absolutePath) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 })
    }

    const stats = await fs.stat(absolutePath)
    
    return NextResponse.json({
      exists: true,
      isDirectory: stats.isDirectory(),
      isFile: stats.isFile(),
      size: stats.size,
      created: stats.birthtime,
      modified: stats.mtime,
      path: absolutePath
    })
  } catch (error) {
    return NextResponse.json({ 
      exists: false,
      error: (error as Error).message 
    }, { status: 404 })
  }
}
