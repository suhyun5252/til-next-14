# Pages Router

## http://localhost:3000

- /src/pages/index.tsx

```tsx
export default function Home() {
  return <h1>홈</h1>;
}
```

## http://localhost:3000/search?keyword=김밥

- 쿼리스트링 처리하기
- /src/pages/search.tsx

```tsx
export default function Page() {
  return <h1>검색</h1>;
}
```

```tsx
// 앱 라우터버전 import { useRouter } from "next/navigation";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { keyword } = router.query;

  return (
    <div>
      검색 <b>{keyword}</b> 페이지
    </div>
  );
}
```

## http://localhost:3000/good/1

- params
- /src/pages/good/[id].tsx

```tsx
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <b>{id}</b>번 제품정보
    </div>
  );
}
```

## http://localhost:3000/nopage

- 파일명이 약속되어있다. 반드시 지켜야 한다!
- 없는 라우터로 이동시 Not Found 페이지
- /src/pages/404.tsx

```tsx
export default function Page() {
  return <div>잘못된 주소로 접근하셨습니다.</div>;
}
```

# Navigation

## Link 를 이용해서 라우터를 이동하는 메뉴

- Link 로 연결된 주소는 사전에 자동으로 html 이 만들어져 있다.
- 주메뉴는 `모든 페이지`에 보여야한다.
- `_app.tsx` 에 주메뉴를 만들어 놓으면 모든 페이지에 보여진다.

```tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const handleClick = () => {
    router.push("/");
  };
  return (
    <>
      <header>
        <Link href={"/"}>홈</Link>
        &nbsp;
        <Link href={"/search?keword=김밥"}>검색 /search?keword=김밥</Link>
        &nbsp;
        <Link href={"/good/1"}>제품상세 /good/1</Link>
        &nbsp;
        <button onClick={() => handleClick()}>홈으로 이동하기</button>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
      <footer></footer>
    </>
  );
}
```
