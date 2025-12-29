import { type NextRequest, NextResponse } from "next/server"
import { readFile } from "fs/promises"
import { join } from "path"

export async function GET(request: NextRequest) {
  try {
    const path = request.nextUrl.searchParams.get("path")

    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 })
    }

    const filePath = join(process.cwd(), "public", path)
    const content = await readFile(filePath, "utf-8")

    return NextResponse.json({ content })
  } catch (error) {
    console.log("[file] File read error:", error)
    return NextResponse.json({ error: "Failed to read file" }, { status: 500 })
  }
}
