import { Device } from "@/types";
import { useEffect, useState } from "react";

export default function useDevice() {
  const [width, setWidth] = useState(window.innerWidth);
  const device: Device = width <= 834 ? 'mobile' : (width <= 1024 ? 'tablet' : 'desktop');

  useEffect(() => {
    const handleResize = (e: UIEvent) => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return device;
}