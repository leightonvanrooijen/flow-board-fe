import { hasElement } from "./hasElement";
import { calculatePositionOffSets } from "./calculatePositionOffSets";
import { PositionProps } from "./usePopOver";

export const updateFloatPosition = <RT extends Element>({
  position,
  float,
  reference,
}: PositionProps<RT>) => {
  if (!hasElement(float) || !hasElement(reference)) return;

  const {
    bottom: refBottom,
    left: refLeft,
    width: refWidth,
    height: refHeight,
  } = reference.current.getBoundingClientRect();
  const { height } = float.current.getBoundingClientRect();

  const { xOffSet, yOffSet } = calculatePositionOffSets({
    position,
    refWidth,
    refHeight,
    floatHeight: height,
  });

  float.current.style.left = `${refLeft + xOffSet}px`;
  float.current.style.top = `${refBottom + yOffSet}px`;
};
