import { NextResponse } from "next/server"
import { exec } from "child_process"
import { promisify } from "util"
import { cookies } from "next/headers"

const execPromise = promisify(exec)

export async function POST(request: Request) {
  const cookieStore = await cookies()
  if (cookieStore.get("dev_session")?.value !== "authenticated") {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const { action, processName } = await request.json()
    if (!["start", "stop", "restart", "delete"].includes(action)) {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 })
    }
    const safeName = (processName || "all").replace(/[^a-zA-Z0-9\-_]/g, "")

    console.log(`[v0] Executing PM2 action: ${action} on ${safeName}`)
    const { stdout, stderr } = await execPromise(`pm2 ${action} ${safeName}`)

    return NextResponse.json({
      success: true,
      output: stdout || stderr,
      message: `Process ${safeName} ${action}ed successfully`,
    })
  } catch (error) {
    console.error("[v0] PM2 Action Error:", error)
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  const cookieStore = await cookies()
  if (cookieStore.get("dev_session")?.value !== "authenticated") {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  try {
    const { stdout } = await execPromise("pm2 jlist")
    return NextResponse.json(JSON.parse(stdout))
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch PM2 status" }, { status: 500 })
  }
}
