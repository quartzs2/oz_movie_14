import { isEqual } from "es-toolkit";
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
  // DOM 요소가 마운트되는 시점을 정확히 포착하기 위해 useRef 대신 useState 사용 (Callback Ref 패턴)
  const [ref, setRef] = useState(null);

  // onIntersect가 자주 재생성되어도 Observer가 불필요하게 초기화되지 않도록 Ref로 관리
  const callbackRef = useRef(onIntersect);

  const [memoizedOptions, setMemoizedOptions] = useState(options);

  useEffect(() => {
    callbackRef.current = onIntersect;
  }, [onIntersect]);

  // 옵션 객체의 내용이 실제로 변경되었을 때만 업데이트 (Deep Compare)
  // 매 렌더링마다 새로운 객체가 들어와 Observer가 끊기는 것을 방지함
  if (!isEqual(memoizedOptions, options)) {
    setMemoizedOptions(options);
  }

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callbackRef.current(entry, observer);
        }
      });
    }, memoizedOptions);

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref, memoizedOptions]);

  return setRef;
};

export default useIntersect;
