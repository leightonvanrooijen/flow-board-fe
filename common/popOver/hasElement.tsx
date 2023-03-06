import { MutableRefObject } from "react"

export function hasElement<RT extends Element>(ref: MutableRefObject<RT | null>): ref is MutableRefObject<RT> {
  return Boolean(ref.current)
}
