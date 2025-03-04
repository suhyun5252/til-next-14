import styles from "@/pages/search.module.css";
// 앱 라우터버전 import { useRouter } from "next/navigation";
import { useRouter } from "next/router";
import goods from "@/mock/goods.json";
import GoodItem from "@/components/good-item";
import SearchLayout from "@/components/search-layout";
import { ReactNode } from "react";

export default function Page() {
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
