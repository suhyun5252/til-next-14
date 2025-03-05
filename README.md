# ISR

- Incremental Static Regeneration
- 정적 페이지 즉 SSG 로 생성된 페이지를 다시 생성하는 법

## /src/pages/index.tsx

```tsx
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
    revalidate: 60, // 60 초후 다시 생성
  };
};
```

## API 호출로 재생성하기

### API 생성

-/src/pages/api/revalidate.ts

- http://localhost:3000/api/revalidate 로 호출

```ts
import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // /src/pages/index.tsx 페이지를 다시 생성
    await res.revalidate("/");
    return res.json({ revalidated: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error revalidating");
  }
}
```

### fetch 생성

- /src/lib/fetch-revalidate.ts

```ts
export const fetchRevalidate = async () => {
  const url = "http://localhost:3000/api/revalidate";

  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
```

## 실행시

```tsx
onClick = { fetchRevalidate };
```

# 실제 API 서버 연동 처리

- 왜 api 폴더를 사용했지? 그냥 lib 폴더에 fetch 써도 되지 않나?
- /src/pages/api/getallgood.ts

```ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import { seedData } from "./alldata";
import { GoodDataType } from "@/types";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoodDataType[]>
) {
  const data = await fetch("https://fakestoreapi.com/products");
  const json = await data.json();
  res.status(200).json(json);
}
```

- /src/pages/api/onegood.ts

```ts
\// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import { seedData } from "./alldata";
import { GoodDataType } from "@/types";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoodDataType | null>
) {
  // 요청(req)에 의한 Params 처리하기
  // URI 는 무조건 문자열로 처리됩니다.
  const { id } = req.query;
  const data = await fetch(`https://fakestoreapi.com/products/${id}`);
  const json = await data.json();

  res.status(200).json(json || null);
}


```

- /src/pages/api/randomgood.ts

```ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import { seedData } from "./alldata";
import { GoodDataType } from "@/types";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoodDataType[]>
) {
  // 전체 데이터에서 랜덤하게 3개만 추출하기
  const data = await fetch("https://fakestoreapi.com/products");
  const json = await data.json();
  const randomGoods = json.sort(() => Math.random() - 0.5).slice(0, 3);
  res.status(200).json(randomGoods);
}
```

- /src/pages/api/searchgood.ts

```ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// import { seedData } from "./alldata";
import { GoodDataType } from "@/types";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoodDataType[]>
) {
  // 요청(req)에 의한 쿼리(query) 처리하기
  const { keyword } = req.query;
  const data = await fetch("https://fakestoreapi.com/products");
  const json = await data.json();
  const filterGoods = json.filter((good: GoodDataType) =>
    good.title.includes(keyword as string)
  );
  res.status(200).json(filterGoods);
}
```

- 실제 서버가 있다면 API 가 정상적으로 실행이 됨. 지금만 build 시 생성 안됨

# 살아있는 서버로 연결하기 위해 fetch를 직접 처리
