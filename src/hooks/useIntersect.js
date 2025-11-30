import { useEffect, useRef, useState } from "react";

/**
 * Intersection Observer를 사용하여 요소의 가시성을 감지하는 훅
 *
 * @param {Object} params
 * @param {Function} params.onIntersect - 요소가 화면에 나타날 때 실행할 콜백
 * @param {Object} [params.options={ threshold: 0 }] - Observer 옵션 (root, rootMargin, threshold)
 * @returns {Function} setRef - 관찰할 요소의 ref 속성에 전달할 Callback Ref 함수
 */
const useIntersect = ({ onIntersect, options = { threshold: 0 } }) => {
  const [ref, setRef] = useState(null);

  const callbackRef = useRef(onIntersect);
  const optionsRef = useRef(options);
  const optionsKey = JSON.stringify(options);

  useEffect(() => {
    callbackRef.current = onIntersect;
  }, [onIntersect]);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    if (!ref) {
      return;
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callbackRef.current(entry, observer);
        }
      });
    }, optionsRef.current);

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, optionsKey]);

  return setRef;
};

export default useIntersect;
