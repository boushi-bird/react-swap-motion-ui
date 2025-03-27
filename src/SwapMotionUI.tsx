import { ReactNode, useEffect, useRef, type MouseEventHandler } from "react";

import "./SwapMotionUI.css";

type MoveDirection = "prev" | "next";

interface Props<T> {
  index: number;
  items: T[];
  onSwapPosition: (newItems: T[], target: T, direction: MoveDirection) => void;
  renderMovePreviousButton?: (onClick: MouseEventHandler<Element>) => ReactNode;
  renderMoveNextButton?: (onClick: MouseEventHandler<Element>) => ReactNode;
  className?: string;
  children?: ReactNode;
}

function getPosition(el: Element) {
  const { top, left } = el.getBoundingClientRect();
  const x = left + (window.scrollX || document.documentElement.scrollLeft);
  const y = top + (window.scrollY || document.documentElement.scrollTop);
  return { x, y };
}

export function SwapMotionUI<T>({
  index,
  items,
  onSwapPosition,
  renderMovePreviousButton,
  renderMoveNextButton,
  className,
  children,
}: Props<T>) {
  const elementRef = useRef<HTMLDivElement>(null);
  const prevIndexRef = useRef<number>(index);
  const prevPositionRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (!prevPositionRef.current && elementRef.current) {
      const { x, y } = getPosition(elementRef.current);
      prevPositionRef.current = { x, y };
    }
  }, []);

  useEffect(() => {
    const prevIndex = prevIndexRef.current;

    if (prevIndex === index) return;

    prevIndexRef.current = index;

    if (!elementRef.current) return;

    const { x, y } = getPosition(elementRef.current);
    if (prevPositionRef.current) {
      const deltaX = prevPositionRef.current.x - x;
      const deltaY = prevPositionRef.current.y - y;
      elementRef.current.style.transition = "";
      elementRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      requestAnimationFrame(() => {
        if (!elementRef.current) return;
        elementRef.current.style.transition = "transform 1000ms ease";
        elementRef.current.style.transform = "";
      });
    }
    prevPositionRef.current = { x, y };
  }, [index]);

  const handleSwapPosition = (direction: MoveDirection) => {
    const newItems = [...items];
    const firstIndex = direction === "prev" ? index - 1 : index;
    const secondIndex = direction === "next" ? index + 1 : index;
    if (firstIndex < 0) {
      return;
    }
    if (secondIndex >= items.length) {
      return;
    }
    const target = items[index];
    const first = newItems[firstIndex];
    const second = newItems[secondIndex];
    newItems.splice(firstIndex, 2, second, first);
    onSwapPosition(newItems, target, direction);
  };

  const first = index === 0;
  const last = items.length - 1 === index;

  const effectiveRenderMovePreviousButton =
    renderMovePreviousButton ||
    ((onClick) => (
      <button
        className="swap-motion-ui-button swap-motion-ui-previous"
        onClick={onClick}
      >
        &lt;
      </button>
    ));

  const effectiveRenderMoveNextButton =
    renderMoveNextButton ||
    ((onClick) => (
      <button
        className="swap-motion-ui-button swap-motion-ui-next"
        onClick={onClick}
      >
        &gt;
      </button>
    ));

  return (
    <span className={`${className} swap-motion-ui`} ref={elementRef}>
      {children}
      <span className="swap-motion-ui-panel">
        {!first &&
          effectiveRenderMovePreviousButton(() => handleSwapPosition("prev"))}
        {!last &&
          effectiveRenderMoveNextButton(() => handleSwapPosition("next"))}
      </span>
    </span>
  );
}
