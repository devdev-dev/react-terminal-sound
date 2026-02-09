import React from "react"
import { render } from "react-sound-renderer"
const Tone = "Tone"

function App() {
  const [on, setOn] = React.useState(false)

  React.useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), 1000)
    return () => clearInterval(id)
  }, [])

  return on ? <Tone /> : null
}

render(<App />)
