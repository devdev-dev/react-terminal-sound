import React from "react"
import readline from "readline"
import { Burst } from "react-sound-renderer"

type Settings = { count: number; gap: number }

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function promptLine(question: string): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close()
      resolve(answer.trim())
    })
  })
}

async function promptSettings(): Promise<Settings> {
  const countRaw = await promptLine("Enter count: ")
  const gapRaw = await promptLine("Enter gap (ms): ")
  const count = clamp(Math.round(Number(countRaw)), 1, 50)
  const gap = clamp(Math.round(Number(gapRaw)), 20, 2000)
  return { count, gap }
}

export default function BurstFromInput() {
  const [settings, setSettings] = React.useState<Settings | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false
    promptSettings()
      .then((data) => {
        if (!cancelled) setSettings(data)
      })
      .catch((err) => {
        if (!cancelled) setError((err as Error).message)
      })
    return () => {
      cancelled = true
    }
  }, [])

  React.useEffect(() => {
    if (error) process.stderr.write(`${error}\n`)
  }, [error])

  if (!settings) return null
  return <Burst on={true} count={settings.count} gap={settings.gap} />
}
