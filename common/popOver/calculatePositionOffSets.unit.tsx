import {
  calculatePositionOffSets,
  PositionOffSets,
} from "./calculatePositionOffSets";
import { PopOverPositions } from "./usePopOver";

const dimensions = {
  refHeight: 10,
  refWidth: 20,
  floatHeight: 30,
  offset: 2,
};

const setUp = (position: PopOverPositions) =>
  calculatePositionOffSets({ position, ...dimensions });

describe("calculatePositionOffSets", () => {
  it.each([
    [
      "calculates the offset to position an element above the ref element",
      "top",
      { xOffSet: 0, yOffSet: -38 },
    ],
    [
      "calculates the offset to position an element below the ref element",
      "bottom",
      { xOffSet: 0, yOffSet: 2 },
    ],
    [
      "calculates the offset to position an element to the right of the ref element",
      "right",
      { xOffSet: 22, yOffSet: -20 },
    ],
    [
      "calculates the offset to position an element to the left of the ref element",
      "left",
      { xOffSet: -22, yOffSet: -20 },
    ],
  ])("%s", (message: string, position: string, result: PositionOffSets) => {
    const offSets = setUp(position as PopOverPositions);

    expect(offSets).toEqual(result);
  });
});
