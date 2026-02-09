import React from "react"
import { render, Tone, Burst } from "react-sound-renderer"

function App() {
  const [on, setOn] = React.useState(false)

  React.useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), 1000)
    return () => clearInterval(id)
  }, [])

  return on ? <Burst active="off" count={5} /> : <Tone active="off" />
}

render(<App />)
