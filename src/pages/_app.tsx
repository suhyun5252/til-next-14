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
