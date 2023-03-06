import { PopOverPositions } from "./usePopOver";

export type PositionOffSets = {
  xOffSet: number;
  yOffSet: number;
};

export type CalculatePositionOffSetsProps = {
  position: PopOverPositions;
  refHeight: number;
  refWidth: number;
  floatHeight: number;
  offSet?: number;
};

export const calculatePositionOffSets = <RT extends Element>({
  position,
  refHeight,
  refWidth,
  floatHeight,
  offSet = 2,
}: CalculatePositionOffSetsProps): PositionOffSets => {
  switch (position) {
    case "top":
      return { xOffSet: 0, yOffSet: -refHeight - floatHeight + offSet };
    case "right":
      return {
        xOffSet: refWidth + offSet,
        yOffSet: -refHeight / 2 - floatHeight / 2,
      };
    case "left":
      return {
        xOffSet: -refWidth - offSet,
        yOffSet: -refHeight / 2 - floatHeight / 2,
      };
    case "bottom":
    default:
      return { xOffSet: 0, yOffSet: offSet };
  }
};
