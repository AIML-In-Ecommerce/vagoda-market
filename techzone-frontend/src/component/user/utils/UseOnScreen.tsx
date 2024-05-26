import { useEffect, useState, useRef, RefObject } from "react";

export default function useOnScreen(ref: RefObject<HTMLElement>) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [isOnScreen, setIsOnScreen] = useState(false);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) =>
      setIsOnScreen(entry.isIntersecting)
    );
  }, []);

  useEffect(() => {
    if (!observerRef.current || !ref.current) return;
    observerRef.current.observe(ref.current);

    return () => {
      if (!observerRef.current) return;
      observerRef.current.disconnect();
    };
  }, [ref, ref.current, observerRef.current]);

  return isOnScreen;
}
