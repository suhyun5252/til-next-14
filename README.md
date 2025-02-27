# Next.js Page Router

- React.js 를 기반으로 편리하게 개발이 가능하도록 기술 제공
- Vercel 에서 React.js 를 기반으로 개발
- https://vercel.com/
- Next 는 라이브러리가 아니고 `프레임웍` 이다.

## React 와 Next의 간략한 차이

### React (라이브러리 조합의 개발)

- 개발자가 여러가지 npm을 직접 설치
- 개발자가 호환성 검사
- 개발자가 기술에 대한 스택을 결정한다.
- 예) React Router Dom 을 쓰고 axios 쓰고 Redux 쓸거야
- 예) React Router Dom 을 쓰고 fetch 쓰고 recoil 쓸거야
- 예) React Router Dom 을 쓰고 fetch 쓰고 zustand 쓸거야
- 예) React Router Dom 을 쓰고 react-query 쓰고 context api 쓸거야

### Next.js (프레임웍 제공)

- 개발 기반의 대부분을 미리 정해서 셋팅이 되어있음.
- 화면의 최적화를 자동으로 지원
- 라우터도 기본적으로 지원
- 이미지 최적화도 알아서 지원
- 코드스플릿팅도 알아서 지원
- 외부 데이터도 미리 불러와서 사전 랜더링으로 html 을 생성
- 기타 등등

## 설치

```bash
npx create-next-app@14 . -- 14버전
npx create-next-app@latest . -- 최신버전
```

# 사전 랜더링의 이해

- 사용자가 주소를 입력하면 즉 접속 요청을 한다.
- 주소를 받은 서버는 html을 돌려준다.
- 여기서, **서버에서 html 을 만드는 과정을 사전 랜더링 이라고 한다.**
- 만들어진 html을 사용자에게 전달한다.

## 접속 및 반환 과정

- 사용자 > 웹브라우저(접속요청) > 웹서버(html 랜더링) > html 반환

## CSR 방식

- Client Side Rendering

### React 랜더링 방식

#### Step1

- 사용자 > 웹브라우저(접속요청) > **웹서버(비어있는 html 반환)** > html 반환 > **빈 화면 랜더링**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

#### Step2

- 빈 html 에 js 파일 로딩이 실행 > **웹서버(JS 번들링(압축파일)) > 전달**

```html
<script type="module" src="/src/main.tsx"></script>
```

- 빈 html 에 js 파일 로딩이 실행 > **웹서버(JS 번들링(압축파일)) > 전달** > 브라우저에서 JS 실행 > html 적용 후 화면 출력

#### CSR 방식의 문제점

- SEO 지원안됨 (검색하면 노출, SNS 공유, 등)
- JS 번들링 과정이 오래 걸릴수도 있다.
- html 의 기본페이지만 보고 있을수 있다.
- 네트워크가 느리면 더 오래 기다려야 한다.
- **FCP(First Contentful Paint)**가 느리다.

### CSR 의 장점

- 일단 js가 로딩이 되었다면 무조건 빠른 화면 이동이 가능하다.

## SSR 방식

- Server Side Rendering
- Next.js 에서는 기본적으로 SSR 방식을 사용한다.
- 서버에서 html을 사전에 생성한다.

#### Step1

- 사용자 > 웹브라우저(접속요청) > **웹서버(html 사전에 생성)** > html 반환 > **내용과 기본내용이 포함된 html 랜더링**

#### Step2

- 내용이 포함된 html 에 js 파일 로딩이 실행 > **웹서버(인터렉전용 JS 번들파일) > 전달** > 브라우저에서 JS 실행(하이드레이션) > html 적용 후 화면 출력

#### 하이드레이션

- Hydration(물기가 쓰며든다. 수화 작용)
- js 가 html 에 기능을 부여한다.
- **TTI(Time To Interact)** 이 발생한다. (하이드레이션 적용 후 작동 가능상태)

# 결론

- Next.js 는 html 을 서버에서 사전에 생성하고, Hydration 으로 별도 js 를 번들링 제공한다.
- SEO 가 원활하다
- 기술 스택이 표준화 되어있어서 프로젝트 유지 보수가 원활하다.

# Router 란?

- uri 를 Router 라고 합니다.
  - http://www.naver.com/
  - http://www.naver.com/search?keyword=iu
  - http://www.naver.com/good/1

## Next 의 공통 사항

- 파일명, 폴더명이 약속 되어있음.
- 파일명, 폴더명에 따라서 기능도 약속 되어있음.

## Pages Router 방식

- 14 버전으로 진행
- 일반화된 개발 방식(많은 기업이 도입하여 운영중)
- 반드시 /src/pages 폴더에 있어야 라우터 역할 함.
  - http://localhost:3000 접속시 `/src/pages/index.tsx`
  - http://localhost:3000/test 접속시 `/src/pages/test.tsx`
  - http://localhost:3000/todo 접속시 `/src/pages/todo.tsx`
  - http://localhost:3000/todo 접속시 `/src/pages/todo/index.tsx`
  - http://localhost:3000/todo/setting 접속시 `/src/pages/todo/stting.tsx`
  - http://localhost:3000/todo/setting 접속시 `/src/pages/todo/stting/index.tsx`
  - http://localhost:3000/work/100 접속시 `/src/pages/work/[id].tsx`
  - http://localhost:3000/work/100?keyword=iu 접속시 `/src/pages/work/[id].tsx`

## App Router 방식

- 15 버전으로 진행
- 상당히 많은 부분이 개선됨 , 최적화 됨
- 향후 진행될 개선된 개발 방식
  - http://localhost:3000 접속시 `/src/app/page.tsx`
  - http://localhost:3000/todo 접속시 `/src/app/page.tsx`
  - http://localhost:3000/todo 접속시 `/src/app/todo/page.tsx`
  - http://localhost:3000/todo/setting 접속시 `/src/app/todo/setting/page.tsx`
  - http://localhost:3000/work/100 접속시 `/src/app/work/[id]/page.tsx`
  - http://localhost:3000/work/100?keyword=iu 접속시 `/src/app/work/[id]/page.tsx`

# 프로젝트 구조

- public : 정적파일, 최적화에서 제외
- src : root 폴더
- src/pages : 라우터로 연결시킬 파일 및 폴더 배치
- src/styles : css **파일명.module.css** 형식으로 작성
- src/components 생성 : 재사용 가능한 컴포넌트 배치 (기본 : `서버 컴포넌트`)

# 첫 화면 만들기

- /src/pages/index.tsx 파일 생성
- http://localhost:3000 접속시 화면 확인

```tsx
export default function Home() {
  return <h1>홈</h1>;
}
```

# `_app.tsx`

- 모든 페이지에 공통으로 적용할 내용 작성
- 공통 레이아웃, 공통 데이터, 공통 로직
- `페이지 파일이 아닙니다.`
- `import "@/styles/globals.css";` Next 에서 유일한 css import 방식

```tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <p>안녕하세요</p>
      <Component {...pageProps} />
    </>
  );
}
```

# `_document.tsx`

- 모든 페이지에 환경 설정하는 곳
- HTML 의 구조를 담당함.
- 각 태그를 커스터마이징 함
- 폰트,타이틀 GA4 적용 장소

```tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

# next.config.mjs

- Next 환경설정

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
};

export default nextConfig;
```

# css

- 모두 초기화
- src/styles/globals.css
- src/styles/Home.module.css
