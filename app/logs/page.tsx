'use client'

import { useEffect, useState } from 'react'

export default function LogsPage() {
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    let mounted = true

    async function fetchLogs() {
      try {
        const res = await fetch('/api/logspush', { cache: 'no-store' })
        const data = await res.json()
        if (!mounted) return
        const incoming = Array.isArray(data.logs) ? data.logs : []
        setLogs(incoming)
        incoming.forEach((log:any) => console.log(log))
      } catch (error) {
        console.error('Failed to fetch logs', error)
      }
    }

    fetchLogs()
    const interval = setInterval(fetchLogs, 2000)
    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  return (
    <main className="p-6 h-screen font-helvetica flex flex-col w-[1200px]">
      <h1 className="text-2xl font-bold mb-4">LogPush Browser Console</h1>
      <p className="mb-4 text-sm text-slate-600">Open your browser console to see incoming script logs.</p>
      <div className="space-y-2 h-full overflow-y-auto h-screen">
        {logs.length === 0 ? (
          <div className="rounded border border-slate-200 p-4 text-slate-500">No logs yet.</div>
        ) : (
          logs.map((log, index) => (
            <pre key={index} className="rounded bg-slate-950 p-3 text-sm text-white w-[800px] border-4 font-inter">{log}</pre>
          ))
        )}
      </div>
    </main>
  )
}
