import { Dispatch, MutableRefObject, useEffect } from "react"

export type UseClosePopUpProps<RT extends Element> = {
  ref: MutableRefObject<RT | null>
  float: MutableRefObject<HTMLElement | null>
  setOpen: Dispatch<boolean>
}

export const useShowPopOver = <RT extends Element>({ ref, float, setOpen }: UseClosePopUpProps<RT>) => {
  useEffect(() => {
    const open = (event: FocusEvent) => {
      if (isNode(event.target) && shouldOpenPopOver<RT>(ref, float, event.target)) {
        setOpen(true)
      }
    }

    const close = (event: MouseEvent) => {
      if (isNode(event.target) && shouldClosePopOver<RT>(ref, float, event.target)) {
        setOpen(false)
      }
    }

    document.addEventListener("focus", open, true)
    document.addEventListener("mousedown", close)

    return () => {
      document.removeEventListener("mousedown", close)
      return document.removeEventListener("focusin", open)
    }
  }, [ref, float, setOpen])
}

export function isNode(e: EventTarget | null): e is Node {
  return !(!e || !("nodeType" in e))
}

export function shouldClosePopOver<RT extends Element>(
  ref: MutableRefObject<RT | null>,
  float: MutableRefObject<HTMLElement | null>,
  target: Node,
) {
  return Boolean(!ref?.current?.contains(target) && !float?.current?.contains(target))
}

export function shouldOpenPopOver<RT extends Element>(
  ref: MutableRefObject<RT | null>,
  float: MutableRefObject<HTMLElement | null>,
  target: Node,
) {
  return Boolean(ref?.current?.contains(target) || float?.current?.contains(target))
}
