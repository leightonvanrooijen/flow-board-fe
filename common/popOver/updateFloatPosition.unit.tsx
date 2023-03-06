import { updateFloatPosition } from "./updateFloatPosition"
import { expect } from "@storybook/jest"
import * as calculatePositionOffSetsModule from "./calculatePositionOffSets"

const setUp = () => {
  const ref = { current: document.createElement("div") }
  const float = { current: document.createElement("div") }
  jest.spyOn(calculatePositionOffSetsModule, "calculatePositionOffSets").mockReturnValue({ xOffSet: 10, yOffSet: 20 })

  return { ref, float }
}

describe("updateFloatPosition", () => {
  // 0 is returned for all by bounded context due to jsdom
  it("adds the X offset to the left style of the float element", () => {
    const { ref, float } = setUp()

    updateFloatPosition({ position: "top", float, reference: ref })

    expect(float.current.style.left).toEqual("10px")
  })
  it("adds the Y offset to the top style of the float element", () => {
    const { ref, float } = setUp()

    updateFloatPosition({ position: "top", float, reference: ref })

    expect(float.current.style.top).toEqual("20px")
  })
})
