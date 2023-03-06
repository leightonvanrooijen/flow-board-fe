import { useShowPopOver } from "./useShowPopOver"
import { renderHook } from "@testing-library/react"
import { Dispatch } from "react"

const setUp = (setOpen: () => Dispatch<boolean>) => {
  const refElement = document.createElement("div")
  const ref = { current: refElement }
  const floatElement = document.createElement("div")
  const float = { current: floatElement }

  renderHook(() => useShowPopOver({ ref, float, setOpen }))

  return { ref, refElement, float, floatElement }
}

describe("useShowPopover", () => {
  it("closes the Popover if a mousedown event is fired outside of the anchor and popover elements", () => {
    const setOpen = jest.fn()
    const { ref, float } = setUp(setOpen)

    renderHook(() => useShowPopOver({ ref, float, setOpen }))

    document.dispatchEvent(new Event("mousedown"))

    expect(setOpen).toHaveBeenCalledWith(false)
  })
  it("does NOT close the Popover if a mousedown event is fired inside of the anchor element", () => {
    const setOpen = jest.fn()
    const { ref, refElement, float } = setUp(setOpen)

    renderHook(() => useShowPopOver({ ref, float, setOpen }))

    const event = new Event("mousedown")
    addTargetToEvent(event, refElement)
    document.dispatchEvent(event)

    expect(setOpen).toHaveBeenCalledTimes(0)
  })

  it("does NOT close the Popover if a mousedown event is fired inside of the Pop Over element", () => {
    const setOpen = jest.fn()

    const { ref, float, floatElement } = setUp(setOpen)

    renderHook(() => useShowPopOver({ ref, float, setOpen }))

    const event = new Event("mousedown")
    addTargetToEvent(event, floatElement)
    document.dispatchEvent(event)

    expect(setOpen).toHaveBeenCalledTimes(0)
  })

  it("opens the popover if the ref is focused", () => {
    const setOpen = jest.fn()

    const { ref, refElement, float } = setUp(setOpen)

    renderHook(() => useShowPopOver({ ref, float, setOpen }))

    const event = new Event("focus", { bubbles: true })
    addTargetToEvent(event, refElement)
    document.dispatchEvent(event)

    expect(setOpen).toHaveBeenCalledWith(true)
  })
  it("opens the popover if the float is focused", () => {
    const setOpen = jest.fn()

    const { ref, floatElement, float } = setUp(setOpen)

    renderHook(() => useShowPopOver({ ref, float, setOpen }))

    const event = new Event("focus", { bubbles: true })
    addTargetToEvent(event, floatElement)
    document.dispatchEvent(event)

    expect(setOpen).toHaveBeenCalledWith(true)
  })
})

function addTargetToEvent(event: Event, target: Element) {
  return Object.defineProperty(event, "target", { writable: false, value: target })
}
