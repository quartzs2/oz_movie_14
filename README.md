# 🎬 OZ Movie

TMDB API를 활용한 영화 정보 웹 애플리케이션입니다.

오즈코딩스쿨 스터디메이트 예시 코드로 사용하기 위해 구현되었습니다.

## 📋 목차

- [기술 스택](#-기술-스택)
- [시작하기](#-시작하기)
- [프로젝트 구조](#-프로젝트-구조)
- [개발 컨벤션](#-개발-컨벤션)
  - [커밋 컨벤션](#커밋-컨벤션)
  - [브랜치 컨벤션](#브랜치-컨벤션)

## 🛠 기술 스택

### Core

- **React** (v19.1.1) - UI 라이브러리
- **React Router** (v7.9.5) - 라우팅
- **Vite** (v7.1.7) - 빌드 도구

### Styling

- **Tailwind CSS** (v4.1.16) - 유틸리티 우선 CSS 프레임워크
- **Lucide React** - 아이콘 라이브러리

### UI Components

- **Swiper** (v12.0.3) - 캐러셀/슬라이더
- **React Spinners** (v0.17.0) - 로딩 스피너

### Code Quality

- **ESLint** (v9.36.0) - 린팅
- **Prettier** (v3.6.2) - 코드 포맷팅
- **eslint-plugin-jsx-a11y** - 접근성 검사
- **eslint-plugin-perfectionist** - 코드 정렬

## 🚀 시작하기

### 사전 요구사항

- Node.js 18.x 이상
- npm 또는 yarn
- TMDB API Access Token

### 설치 및 실행

1. 저장소 클론

```bash
git clone https://github.com/quartzs2/oz-movie.git
cd oz-movie
```

2. 의존성 설치

```bash
npm install
```

3. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 TMDB API Access Token을 설정합니다.(sample.env 참고해주세요)

```env
VITE_TMDB_API_ACCESS_TOKEN=your_tmdb_api_access_token_here
```

4. 개발 서버 실행

```bash
npm run dev
```

5. 브라우저에서 `http://localhost:5173` 접속

## 📁 프로젝트 구조

```
oz-movie/
├── public/                 # 정적 파일
├── src/
│   ├── api/               # API 관련 함수
│   ├── components/        # 재사용 가능한 컴포넌트
│   │   ├── layout/       # 레이아웃 컴포넌트 (Header, MainLayout, SearchBar)
│   │   ├── movie/        # 영화 관련 컴포넌트 (MovieCard, Carousel 등)
│   │   └── ui/           # UI 컴포넌트 (LoadingSpinner, Skeleton, ErrorMessage 등)
│   ├── contexts/         # Context API (ThemeContext)
│   ├── hooks/            # 커스텀 훅 (useFetch, useTheme)
│   ├── pages/            # 페이지 컴포넌트 (Home, Detail, Search, NotFound)
│   ├── App.jsx           # 메인 앱 컴포넌트
│   ├── main.jsx          # 진입점
│   └── index.css         # 전역 스타일
├── .env                  # 환경 변수
├── eslint.config.js      # ESLint 설정
├── vite.config.js        # Vite 설정
├── tailwind.config.js    # Tailwind 설정
└── package.json
```

## 📝 개발 컨벤션

### 커밋 컨벤션

프로젝트는 [Conventional Commits](https://www.conventionalcommits.org/) 기반의 커밋 컨벤션을 따릅니다.

#### 커밋 메시지 구조

```
<type>: <subject>(#<issue-number>)

[optional body]
```

#### Type 종류

| Type       | 설명                           | 예시                                   |
| ---------- | ------------------------------ | -------------------------------------- |
| `feat`     | 새로운 기능 추가               | `feat: 헤더 구현(#11)`                 |
| `fix`      | 버그 수정                      | `fix: 검색 결과 중복 표시 수정(#20)`   |
| `refactor` | 코드 리팩토링 (기능 변경 없음) | `refactor: API 호출 로직 개선(#25)`    |
| `style`    | 코드 포맷팅, 세미콜론 누락 등  | `style: 코드 포맷팅 적용`              |
| `chore`    | 빌드, 패키지 매니저 설정 등    | `chore: 초기 개발 환경 설정(#3)`       |
| `docs`     | 문서 수정                      | `docs: README 업데이트`                |
| `test`     | 테스트 코드 추가/수정          | `test: MovieCard 컴포넌트 테스트 추가` |
| `build`    | 빌드 관련 파일 수정            | `build: initial commit`                |
| `perf`     | 성능 개선                      | `perf: 이미지 로딩 최적화`             |
| `ci`       | CI 설정 파일 수정              | `ci: GitHub Actions 워크플로우 추가`   |

#### 작성 규칙

1. **제목(subject)**
   - 50자 이내로 작성
   - 명령문으로 작성 (예: "추가한다" ❌ → "추가" ⭕)
   - 마침표를 붙이지 않음
   - 이슈 번호를 포함 `(#이슈번호)`

2. **본문(body)** (선택사항)
   - 한 줄 띄우고 작성
   - 무엇을, 왜 변경했는지 작성
   - 어떻게 변경했는지는 코드로 충분히 설명 가능한 경우 생략

#### 예시

```bash
# 좋은 예시
feat: 다크 모드 구현(#17)

# 이슈 번호가 없는 경우
docs: README에 환경 변수 설정 가이드 추가

# 본문이 있는 경우
refactor: useFetch 훅 에러 처리 로직 개선(#30)

- abort시 로딩 상태를 변경하지 않도록 수정하고 strict mode 추가
```

### 브랜치 컨벤션

#### 브랜치 전략

프로젝트는 Git Flow를 간소화한 브랜치 전략을 사용합니다.

```
main (배포)
  ├── develop (개발)
  │   ├── feature/이슈번호--기능명
  │   ├── fix/이슈번호--버그명
  │   ├── refactor/이슈번호--리팩토링명
  │   ├── style/이슈번호--스타일 수정 작업명
  │   ├── chore/이슈번호--수정 작업명
  │   ├── docs/이슈번호--문서 작업명
  │   ├── test/이슈번호--테스트명
  │   ├── build/이슈번호--빌드작업명
  │   ├── perf/이슈번호--성능개선작업명
  │   └── ci/이슈번호--CI작업명
```

#### 브랜치 명명 규칙

| 브랜치 종류 | 명명 규칙                           | 설명                           | 예시                              |
| ----------- | ----------------------------------- | ------------------------------ | --------------------------------- |
| `main`      | `main`                              | 배포 가능한 상태의 브랜치      | -                                 |
| `develop`   | `develop`                           | 다음 배포를 위한 개발 브랜치   | -                                 |
| `feature`   | `feature/<이슈번호>--<기능명>`      | 새로운 기능 개발               | `feature/17--implement-dark-mode` |
| `fix`       | `fix/<이슈번호>--<버그명>`          | 버그 수정                      | `fix/20--fix-search-duplicate`    |
| `refactor`  | `refactor/<이슈번호>--<리팩토링명>` | 코드 리팩토링                  | `refactor/25--improve-api-logic`  |
| `hotfix`    | `hotfix/<이슈번호>--<버그명>`       | 긴급 버그 수정 (main에서 분기) | `hotfix/30--critical-bug-fix`     |

#### 브랜치 작성 규칙

1. 브랜치명은 소문자와 하이픈(`-`)을 사용
2. 이슈 번호와 기능명은 `--`(이중 하이픈)으로 구분
3. 기능명은 영어로 작성하며, 단어는 하이픈으로 연결
4. 간결하고 명확하게 작성

#### 브랜치 워크플로우

1. **기능 개발**

```bash
# develop 브랜치에서 feature 브랜치 생성
git switch develop
git pull
git switch -c feature/17--implement-dark-mode
git push -u origin feature/17--implement-dark-mode

# 작업 완료 후 커밋
git add .
git commit

# 컨벤션에 맞춰서 커밋 내용을 작성합니다. 다음은 커밋 내용의 예시입니다.
feat: 다크 모드 구현(#17)

- 시스템 설정에 따라 초기 테마를 설정하는 기능 추가
- 사용자가 테마를 수동으로 변경할 수 있는 토글 버튼 구현

# 원격 저장소에 푸시
git push

# GitHub에서 develop 브랜치로 Pull Request 생성
```

2. **버그 수정**

```bash
# develop 브랜치에서 fix 브랜치 생성
git switch develop
git pull
git switch -c fix/20--fix-search-duplicate
git push -u origin fix/20--fix-search-duplicate

# 작업 완료 후 커밋
git add .
git commit

# 컨벤션에 맞춰서 커밋 내용을 작성합니다. 다음은 커밋 내용의 예시입니다.
fix: 검색 결과 중복 표시 수정(#20)

- 검색 API 호출 시 중복된 요청이 발생하던 문제 해결
- 데이터 키 값을 기준으로 중복 제거 로직 추가

# 원격 저장소에 푸시
git push

# GitHub에서 develop 브랜치로 Pull Request 생성
```
