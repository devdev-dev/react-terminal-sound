import React from "react"
import { Burst, Tone } from "react-sound-renderer"

type Phase = "stomp1" | "stomp2" | "pause1" | "clap" | "pause2"

const stompGap = 50
const stompCount = 4
const pauseBetweenStomps = 250
const pauseAfterStomp = 400
const pauseAfterClap = 1100

export default function WeWillRockYou() {
  const [phase, setPhase] = React.useState<Phase>("stomp1")
  const [cycle, setCycle] = React.useState(0)

  React.useEffect(() => {
    let id: NodeJS.Timeout
    if (phase === "stomp1")
      id = setTimeout(() => setPhase("stomp2"), stompGap * stompCount + pauseBetweenStomps)
    else if (phase === "stomp2")
      id = setTimeout(() => setPhase("pause1"), stompGap * stompCount)
    else if (phase === "pause1") id = setTimeout(() => setPhase("clap"), pauseAfterStomp)
    else if (phase === "clap") id = setTimeout(() => setPhase("pause2"), 1)
    else
      id = setTimeout(() => {
        setCycle((v) => v + 1)
        setPhase("stomp1")
      }, pauseAfterClap)
    return () => clearTimeout(id)
  }, [phase])

  if (phase === "stomp1")
    return <Burst key={`stomp1-${cycle}`} on={true} count={stompCount} gap={stompGap} />
  if (phase === "stomp2")
    return <Burst key={`stomp2-${cycle}`} on={true} count={stompCount} gap={stompGap} />
  if (phase === "clap") return <Tone key={`clap-${cycle}`} on={true} />

  return null
}
