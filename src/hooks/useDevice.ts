import { Device } from "@/types";
import { useEffect, useState } from "react";

export default function useDevice() {
  const [width, setWidth] = useState(-1);
  const device: Device | undefined = width === -1 ? undefined : (width <= 834 ? 'mobile' : (width <= 1024 ? 'tablet' : 'desktop'));

  useEffect(() => {
    const handleResize = (e: UIEvent) => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    setWidth(window.innerWidth);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return device;
}