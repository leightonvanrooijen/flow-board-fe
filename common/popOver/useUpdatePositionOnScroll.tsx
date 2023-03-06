import { useEffect } from "react"
import { updateFloatPosition } from "./updateFloatPosition"
import { PositionProps } from "./usePopOver"

export const useUpdatePositionOnScroll = <RT extends Element>({ position, float, reference }: PositionProps<RT>) => {
  useEffect(() => {
    const updateFloatPositionCallback = () => updateFloatPosition({ position, float, reference })

    document.addEventListener("scroll", updateFloatPositionCallback)
    return () => document.removeEventListener("scroll", updateFloatPositionCallback)
  }, [])
}
