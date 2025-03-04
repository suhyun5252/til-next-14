import styles from "@/pages/search.module.css";
// 앱 라우터버전 import { useRouter } from "next/navigation";
import { useRouter } from "next/router";
// import goods from "@/mock/goods.json";
import GoodItem from "@/components/good-item";
import SearchLayout from "@/components/search-layout";
import { ReactNode } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { fetchSearchGood } from "@/lib/fetch-search-good";

// SSR 과 데이터 패치 적용
// 약속된 함수를 사용한다.
// 쿼리 스트링을 읽어서 데이터 패치를 하여야 한다.
export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 쿼리 스트링이 context 에 담겨있음.
  const { keyword } = context.query;
  const goods = (await fetchSearchGood(keyword as string)) || [];
  return {
    props: {
      goods,
    },
  };
}

export default function Page({
  goods,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { keyword } = router.query;
  return (
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
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
