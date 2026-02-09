import React from "react"
import { Tone } from "react-sound-renderer"

export function Interval() {
  const [on, setOn] = React.useState(false)

  React.useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), 1000)
    return () => clearInterval(id)
  }, [])

  return <Tone on={on} />
}
