import styles from "@/pages/search.module.css";
// 앱 라우터버전 import { useRouter } from "next/navigation";
import GoodItem from "@/components/good-item";
import SearchLayout from "@/components/search-layout";
import goods from "@/mock/goods.json";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { GoodDataType } from "@/types";
import { fetchSearchGood } from "@/lib/fetch-search-good";
import Head from "next/head";

export default function Page() {
  const [goods, setGoods] = useState<GoodDataType[]>([]);

  const router = useRouter();
  const { keyword } = router.query;

  const fetchSearchResult = async () => {
    const data = await fetchSearchGood(keyword as string);
    setGoods(data);
  };
  useEffect(() => {
    // 키워드가 바뀌면 실행한다.
    fetchSearchResult();
  }, [keyword]);
  return (
    <>
      <Head>
        <title>해외 쇼핑몰 {keyword} 검색 서비스</title>
        <meta
          name="description"
          content={`해외 상품  ${keyword} 검색 서비스입니다.`}
        />
        {/* sns 공유 타이틀 */}
        <meta
          property="og:title"
          content={`해외 상품  ${keyword} 검색 서비스`}
        />
        <meta
          property="og:description"
          content={`해외 상품  ${keyword} 검색 서비스입니다.`}
        />
        <meta property="og:image" content="/thumbnail.png" />
      </Head>
      <div className={styles.container}>
        <h4>
          <strong>{keyword}</strong> : 검색 결과
        </h4>
        <div>
          {goods.map((item) => (
            <GoodItem key={item.id} {...item} />
          ))}
        </div>
      </div>
    </>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
