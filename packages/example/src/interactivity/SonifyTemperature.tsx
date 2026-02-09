import React from "react"
import { Burst } from "react-sound-renderer";
import readline from "readline"
type Weather = { temperature: number; windSpeed: number }

function promptLocation(): Promise<string> {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
  return new Promise((resolve) => {
    const options = ["Berlin", "Khed", "Yakutsk", "Other (type)"]
    process.stdout.write("Select location:\n")
    options.forEach((opt, i) => {
      process.stdout.write(`${i + 1}. ${opt}\n`)
    })
    rl.question("Choice (1-4): ", (choice) => {
      const index = Number(choice.trim())
      if (index >= 1 && index <= 3) {
        rl.close()
        resolve(options[index - 1])
        return
      }
      if (index === 4) {
        rl.question("Enter location: ", (answer) => {
          rl.close()
          resolve(answer.trim())
        })
        return
      }
      rl.question("Enter location: ", (answer) => {
        rl.close()
        resolve(answer.trim())
      })
    })
  })
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Request failed: ${res.status}`)
  return (await res.json()) as T
}

async function getWeather(location: string): Promise<Weather> {
  const geo = await fetchJson<{
    results?: { latitude: number; longitude: number }[]
  }>(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
      location
    )}&count=1&language=en&format=json`
  )
  const place = geo.results && geo.results[0]
  if (!place) throw new Error("Location not found")
  const weather = await fetchJson<{
    current?: { temperature_2m?: number; wind_speed_10m?: number }
  }>(
    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,wind_speed_10m`
  )
  const current = weather.current || {}
  return {
    temperature: Number(current.temperature_2m ?? 0),
    windSpeed: Number(current.wind_speed_10m ?? 0)
  }
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export default function SonifyTemperature() {
  const [weather, setWeather] = React.useState<Weather | null>(null)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    let cancelled = false
    ;(async () => {
      const location = await promptLocation()
      if (!location) process.exit(0)
      const weather = await getWeather(location)
      process.stdout.write(
        `${location}: ${weather.temperature}C, ${weather.windSpeed} km/h\n`
      )
      if (!cancelled) setWeather(weather)
    })().catch((err) => {
      if (!cancelled) setError((err as Error).message)
    })
    return () => {
      cancelled = true
    }
  }, [])

  React.useEffect(() => {
    if (error) process.stderr.write(`${error}\n`)
  }, [error])

  if (!weather) return null
  const count = Math.max(1, Math.round(Math.abs(weather.temperature)))
  const t = clamp(weather.temperature, -10, 35)
  const n = (35 - t) / 45
  const gap = clamp(60 + Math.round(Math.pow(n, 2) * 540), 40, 600)

  return (
    <>
      <Burst on={true} count={count} gap={gap} />
    </>
  )
}
