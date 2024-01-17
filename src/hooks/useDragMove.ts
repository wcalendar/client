import { MouseEventHandler, RefObject, useEffect, useState } from "react";
import useMode from "./useMode";

export default function useDragMove<T extends HTMLElement>(ref: RefObject<T>): [boolean, MouseEventHandler<T>, MouseEventHandler<T>, MouseEventHandler<T>] {
  const [isMoveMode] = useMode(' ');

  const [mouseDownPosX, setMouseDownPosX] = useState<number | undefined>();
  const [mouseDownPosY, setMouseDownPosY] = useState<number | undefined>();
  const [initScrollLeft, setInitScrollLeft] = useState<number | undefined>();
  const [initScrollTop, setInitScrollTop] = useState<number | undefined>();

  useEffect(() => {
    if(!isMoveMode) {
      setMouseDownPosX(undefined);
      setMouseDownPosY(undefined);
      setInitScrollLeft(undefined);
      setInitScrollTop(undefined);
    }
  }, [isMoveMode]);

  const handleMouseDown: MouseEventHandler<T> = (e) => {
    if(isMoveMode) {
      setMouseDownPosX(e.clientX);
      setMouseDownPosY(e.clientY);
      setInitScrollLeft(ref.current!.scrollLeft);
      setInitScrollTop(ref.current!.scrollTop);
    }
  };

  const handleMouseUp: MouseEventHandler<T> = (e) => {
    if(isMoveMode) {
      setMouseDownPosX(undefined);
      setMouseDownPosY(undefined);
      setInitScrollLeft(undefined);
      setInitScrollTop(undefined);
    }
  };

  const handleMouseMove: MouseEventHandler<T> = (e) => {
    if(mouseDownPosX !== undefined && mouseDownPosY !== undefined && initScrollLeft !== undefined && initScrollTop !== undefined) {
      const element = ref.current!;
      element.scrollTo({
        left: initScrollLeft + ((mouseDownPosX - e.clientX) * 2),
        top: initScrollTop + ((mouseDownPosY - e.clientY) * 2),
      });
    }
  };

  return [ isMoveMode, handleMouseDown, handleMouseUp, handleMouseMove ];
}