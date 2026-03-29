import { NextResponse } from 'next/server'

let logs: string[] = []

export async function POST(request: Request) {
  const body = await request.json()
  const incoming = body.logs ?? []
  const newLogs = Array.isArray(incoming) ? incoming : [incoming]
  logs.push(...newLogs.map((entry: unknown) => typeof entry === 'string' ? entry : JSON.stringify(entry)))
  return NextResponse.json({ success: true })
}

export async function GET() {
  return NextResponse.json({ logs })
}

export async function DELETE() {
  logs = []
  return NextResponse.json({ success: true })
}
