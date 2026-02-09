import React from "react"
import { render, Tone, Burst } from "react-sound-renderer"

function Interval() {
  const [on, setOn] = React.useState(false)

  React.useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), 1000)
    return () => clearInterval(id)
  }, [])

  return <Tone active="off" />
}
