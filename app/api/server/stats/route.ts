import { NextRequest, NextResponse } from 'next/server'
import os from 'os'

export async function GET(request: NextRequest) {
  try {
    // Get real server stats
    const uptime = Math.floor(process.uptime())
    const days = Math.floor(uptime / 86400)
    const hours = Math.floor((uptime % 86400) / 3600)
    
    const loadAverage = os.loadavg()
    const totalMem = os.totalmem()
    const freeMem = os.freemem()
    const usedMem = totalMem - freeMem
    
    const cpus = os.cpus()
    const cpuUsage = calculateCPUUsage(cpus)
    
    // Mock disk usage (in production, use diskusage or similar)
    const totalDisk = 100 * 1024 * 1024 * 1024 // 100GB
    const usedDisk = 60 * 1024 * 1024 * 1024  // 60GB
    const freeDisk = totalDisk - usedDisk
    
    // Mock network stats (in production, use network stats library)
    const networkRx = Math.floor(Math.random() * 1000000000) + 500000000
    const networkTx = Math.floor(Math.random() * 500000000) + 100000000
    
    const stats = {
      uptime: `${days}d ${hours}h`,
      loadAverage,
      memory: {
        total: totalMem,
        used: usedMem,
        free: freeMem
      },
      cpu: {
        usage: cpuUsage,
        cores: cpus.length
      },
      disk: {
        total: totalDisk,
        used: usedDisk,
        free: freeDisk
      },
      network: {
        rx: networkRx,
        tx: networkTx
      },
      responseTime: Math.floor(Math.random() * 30) + 10
    }
    
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error getting server stats:', error)
    return NextResponse.json(
      { error: 'Failed to get server stats' },
      { status: 500 }
    )
  }
}

function calculateCPUUsage(cpus: os.CpuInfo[]) {
  let totalIdle = 0
  let totalTick = 0
  
  cpus.forEach(cpu => {
    for (let type in cpu.times) {
      totalTick += (cpu.times as any)[type]
    }
    totalIdle += cpu.times.idle
  })
  
  return Math.floor((1 - totalIdle / totalTick) * 100)
}
