# Examples

이 폴더에는 학습 목적으로 작성된 예제 코드가 포함되어 있습니다.
실제 프로젝트에서는 사용되지 않습니다.

## 포함된 코드

### useFetch.js

React Query의 인터페이스와 유사하게 설계된 커스텀 데이터 fetching 훅입니다.
현재 프로젝트에서는 `@tanstack/react-query`를 사용합니다.

### useInfinityScroll.js

무한 스크롤과 요청 취소(AbortController)를 관리하는 훅입니다.
현재 프로젝트에서는 `useSuspenseInfiniteQuery`를 사용합니다.

### utils.js

요청 취소 감지 등 유틸리티 함수가 포함되어 있습니다.
