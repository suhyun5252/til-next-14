import styles from "@/pages/index.module.css";
import GoodItem from "@/components/good-item";
import SearchLayout from "@/components/search-layout";
import { fetchGoods } from "@/lib/fetch";
import { InferGetStaticPropsType } from "next";
import { ReactNode } from "react";
import { fetchRandomGood } from "../lib/fetch-random-good";
import Head from "next/head";

// Next 에는 약속이 된 함수가 있다.

export const getStaticProps = async () => {
  // 병렬로 실행하기
  const [allGoods, randomGoods] = await Promise.all([
    fetchGoods(),
    fetchRandomGood(),
  ]);
  return {
    props: {
      allGoods: allGoods,
      randomGoods: randomGoods,
    },
    revalidate: 60, // 60초마다 다시 생성
  };
};

export default function Home({
  allGoods,
  randomGoods,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>해외 쇼핑몰 추천 서비스</title>
        <meta name="description" content="해외 쇼핑몰 추천 서비스입니다." />
        {/* sns 공유 타이틀 */}
        <meta property="og:title" content="해외 쇼핑몰 추천 서비스" />
        <meta
          property="og:description"
          content="해외 쇼핑몰 추천 서비스입니다."
        />
        <meta property="og:image" content="/thumbnail.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <section>
          <h3>지금 추천하는 상품</h3>
          {/* 3개만 랜덤하게 출력 */}
          {randomGoods.map((item) => (
            <GoodItem key={item.id} {...item} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 상품</h3>
          {/* 전체 상품 출력 */}
          {allGoods.map((item) => (
            <GoodItem key={item.id} {...item} />
          ))}
        </section>
      </div>
    </>
  );
}

// JS 에서는 함수도 객체다.
// 객체는 속성을 추가할 수 있다.
Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
