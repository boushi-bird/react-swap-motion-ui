import { ReactNode, type MouseEventHandler } from "react";
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
export declare function SwapMotionUI<T>({ index, items, onSwapPosition, renderMovePreviousButton, renderMoveNextButton, className, children, }: Props<T>): import("react/jsx-runtime").JSX.Element;
export {};
