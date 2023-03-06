import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useShowPopOver } from "./useShowPopOver";
import { hasElement } from "./hasElement";
import { updateFloatPosition } from "./updateFloatPosition";
import { useUpdatePositionOnScroll } from "./useUpdatePositionOnScroll";

// TODO work out how to move all the ref has element assertions to a higher level

export type PopOverPositions = "left" | "top" | "right" | "bottom";

export type UsePopOverProps = {
  position?: PopOverPositions;
  matchWidths?: boolean;
};

export type PositionProps<RT extends Element> = {
  position: PopOverPositions;
  reference: MutableRefObject<RT | null>;
  float: MutableRefObject<HTMLElement | null>;
};

// Naming is unclear
const useOnOpen = (
  float: MutableRefObject<HTMLElement | null>,
  open: boolean
) => {
  useEffect(() => {
    if (!float.current?.firstElementChild) return;

    if (open) {
      float.current.firstElementChild.ariaExpanded = "true";
    }

    float.current.firstElementChild.ariaExpanded = "false";
  }, [open]);
};

const setFloatToRefWidth = <RT extends Element>(
  reference: MutableRefObject<RT | null>,
  float: MutableRefObject<HTMLElement | null>
) => {
  if (!hasElement(reference) || !hasElement(float)) return;

  const { width } = reference.current.getBoundingClientRect();
  float.current.style.width = `${width}px`;
};

export const usePopOver = <RT extends HTMLElement>({
  position = "bottom",
  matchWidths = true,
}: UsePopOverProps = {}) => {
  let ref: MutableRefObject<RT | null> = useRef(null);
  let float: MutableRefObject<HTMLElement | null> = useRef(null);

  const [open, setOpen] = useState(false);

  // useShowPopOver({ ref, float, setOpen });
  // useOnOpen(float, open);
  useUpdatePositionOnScroll({ reference: ref, float, position });

  const floating = useCallback((node: HTMLElement | null) => {
    if (!node) return;
    float.current = node;

    updateFloatPosition({ reference: ref, float, position });

    if (matchWidths) {
      setFloatToRefWidth(ref, float);
    }
  }, []);

  const reference = useCallback((node: RT | null) => {
    if (!node) return;
    ref.current = node;
    ref.current.ariaHasPopup = "true";
  }, []);

  return { reference, floating, open, setOpen };
};
