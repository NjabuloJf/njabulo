import { NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"
import { cookies } from "next/headers"

const execPromise = promisify(exec)

export async function GET() {
  const cookieStore = await cookies()
  if (cookieStore.get("dev_session")?.value !== "authenticated") {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const { stdout, stderr } = await execPromise("pm2 logs --lines 50 --raw --out --err --nostream")

    console.log("[PM2 LOG] PM2 execution successful")

    const combinedLogs = [stdout, stderr].filter(Boolean).join("\n")
    return NextResponse.json({ logs: combinedLogs || "No logs available" })
  } catch (error) {
    console.log("[PM2 LOG}  PM2 Error:", (error as Error).message)
    try {
      const { stdout } = await execPromise("pm2 logs --lines 50 --raw --nostream")
      return NextResponse.json({ logs: stdout || "No logs available" })
    } catch (fallbackError) {
      return NextResponse.json({
        logs: "PM2 Error: " + (error as Error).message,
        debug: (fallbackError as Error).message,
      })
    }
  }
}
