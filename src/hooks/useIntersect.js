import { isEqual } from "es-toolkit";
import { useEffect, useRef, useState } from "react";

const useIntersect = ({ onIntersect, options = { threshold: 0 } }) => {
  const ref = useRef(null);
  const callbackRef = useRef(onIntersect);

  const [memoizedOptions, setMemoizedOptions] = useState(options);

  useEffect(() => {
    callbackRef.current = onIntersect;
  }, [onIntersect]);

  if (!isEqual(memoizedOptions, options)) {
    setMemoizedOptions(options);
  }

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callbackRef.current(entry, observer);
        }
      });
    }, memoizedOptions);

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [memoizedOptions]);

  return ref;
};

export default useIntersect;
