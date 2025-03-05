# SSG

- Server Side Generation
- 데이터를 연동해서 딱 한번 (`npm run build`) html 로 생성함
- 다시는 html 이 안바뀝니다.
- 빌드 타임에 데이터 연동한 결과가 html 로 만들어진다
- SSR 사용시에 요청 들어오면 데이터 연동 후 html 생성 반환(오래 걸릴 수 있다.)
- SSG 사용시에 빌드시 데이터 연동 후 html 이미 완성해 둠.(오래걸리지 않음)
- SSG 는 자주 업데이트 되는 곳에는 사용핮지 않는 것이 좋다.

## SSG 작성해 보기

### /src/pages/ssg.tsx 파일 생성

- getStaticProps 함수로 설정
- InferGetStaticPropsType<typeof getStaticProps> 타입 자동 추론

```tsx
import styles from "@/pages/index.module.css";
// import goods from "@/mock/goods.json";
import GoodItem from "@/components/good-item";
import { ReactNode } from "react";
import SearchLayout from "@/components/search-layout";
import { InferGetServerSidePropsType, InferGetStaticPropsType } from "next";
import { fetchGoods } from "@/lib/fetch";
// import { GoodDataType } from "@/types";
import { fetchRandomGood } from "./api/fetch-random-good";

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
  };
};

export default function Home({
  allGoods,
  randomGoods,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
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
  );
}

// JS 에서는 함수도 객체다.
// 객체는 속성을 추가할 수 있다.
Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
```

- `npm run build`
- `npm run start`

### /src/pages/search.tsx

- 검색페이지는 SSG를 적용하게엔 좋은 것은 아니다
- 빌드시 `검색어를 지정해 줄 수가 없다.`
- 빌드 말고 `클라이언트에서 처리를 해 줄 수는 있다.`
- 클라이언트로 만들어 보기

```tsx
import styles from "@/pages/search.module.css";
// 앱 라우터버전 import { useRouter } from "next/navigation";
import { useRouter } from "next/router";
// import goods from "@/mock/goods.json";
import GoodItem from "@/components/good-item";
import SearchLayout from "@/components/search-layout";
import { ReactNode, useEffect, useState } from "react";
import { GoodDataType } from "@/types";
import { fetchSearchGood } from "@/lib/fetch-search-good";

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
```

### /src/pages/good/[id].tsx

- 경로가 동적이다.
- 상품 상세 소개하는 부분은 내용이 자주 바뀌지 않을 것
- 라우터가 바뀌는 것을 Next 가 파악했다.
- http://localhost:3000/good/1,http://localhost:3000/good/2 ...
- `동적 경로인 경우 SSG 를 적용하려면 getStaticPaths 가 필요`하다.
- 빌드타임에 데이터 연동 파일을 미리 생성하는 것
- 경로를 미리 알려주어야 합니다. `getStaticPaths`가 그 역할을 한다.

```tsx
import { fetchOneGood } from "@/lib/fetch-one-good";
import styles from "@/pages/good/[id].module.css";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import Image from "next/image";
// 라우터가 동적인 경로가 필요로 한 상황이다.
// http://localhost:3000/good/[id]   ===> 파라메터
export function getStaticPaths() {
  return {
    // paths 에는 기본적으로 SSG 를 적용해서 데이터를 미리 생성후 반영할 경로
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    // fallback: false, // 위의 paths 에 없는 경로는 404 로 출력
    // fallback: true, // 위의 paths 에 없는 경로는 레이아웃 렌더링 후 데이터 로드
    fallback: "blocking", // 위의 paths 에 없는 경로는 즉시 SSR 로 생성
  };
}

export async function getStaticProps(context: GetServerSidePropsContext) {
  // 쿼리 스트링이 context 에 담겨있음.
  // const { keyword } = context.query;

  // 파라메터는 context 에 담겨있음.
  // 파라메터도 서버에서 문자열로만 온다.
  const id = context.params!.id;
  const data = await fetchOneGood(parseInt(id as string));
  return {
    props: {
      data: data,
    },
  };
}

export default function Page({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  if (data === null) {
    return <div>현재 데이터가 없습니다.</div>;
  }
  const { title, image, category, price, description, rating } = data;
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {title} <span>(${price})</span>
      </div>
      <div
        className={styles.cover_image}
        style={{ backgroundImage: `url(${image})` }}
      >
        <Image src={image} alt={title} width={245} height={350} />
      </div>
      <div className={styles.category}>{category}</div>
      <div className={styles.rating}>
        Rating : {rating.rate} | {rating.count}
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  );
}
```
