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
