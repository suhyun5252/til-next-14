# 사전 렌더링과 데이터 패칭(Data Fetching)

- Server Side Rendering
- 데이터 패칭은 BE 로 부터 데이터를 불러오는 것을 칭함.

## 사전 렌더링과 데이터 패칭 방식 3가지

### 1. SSR

- Next 에서 기본적인 렌더링 방식
- 사용자 요청이 발생시 매번 html 사전렌더링

### 2. SSG

- `npm run build` 즉 빌드 타임에 미리 서버에서 html 사전 렌더링

### 3. ISR

- 일정한 주기를 가지고 서버에서 html 사전 렌더링

## SSR (Server Side Rendering)

- 요청이 들어오면 서버에서 html 을 사전에 렌더링 한 결과를 돌려줌.

### /src/pages/index.tsx 파일에 SSR 에 데이터패칭 적용해 보기

- 서버에서는 Node.js 코드가 진행됨.
- 서버에서는 웹브라우저용 코드 작성하면 오류임.
- 데이터를 패치하는 함수명은 이미 고정되어 있음.
- 데이터를 받아서 출력시키는 props 도 이미 고정 되어 있습니다.

```tsx
import styles from "@/pages/index.module.css";
import goods from "@/mock/goods.json";
import GoodItem from "@/components/good-item";
import { ReactNode } from "react";
import SearchLayout from "@/components/search-layout";
import { InferGetServerSidePropsType } from "next";

// Next 에는 약속이 된 함수가 있다.
// SSR 데이터 패칭을 위한 함수명이 정해져 있다.
// 아래의 함수 부터 서버에서 실행하고 그 결과를 다시 보여준다.
export const getServerSideProps = async () => {
  console.log("getServerSideProps 함수 서버에서 먼저 실행");
  const data = "getServerSideProps 함수 서버에서 먼저 실행 ";

  // 서버에서는 winodw 등의 웹브라우저용 js 를 사용하면 안됩니다.
  // window

  // 항상 객체를 리턴하고, 반드시 prop 라는 속성이 있어야 한다.
  return {
    props: {
      // 모든 데이터를 props 객체 안에 넣어야 함
      data,
    },
  };
};

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data);
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 추천하는 상품</h3>
        {/* 3개만 랜덤하게 출력 */}
        {goods.slice(0, 3).map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 상품</h3>
        {/* 전체 상품 출력 */}
        {goods.map((item) => (
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

## 실제 API 를 호출하고 그결과를 데이터 패칭을 통해 SSR 적용하기

- /src/pages/`api 폴더`가 반드시 존재해야 합니다.
- /src/pages/`api`/alldata.ts 생성

```ts
import { GoodDataType } from "@/types";

// DB 에 저장된 전체 상품 목록
export const seedData: GoodDataType[] = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 },
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: { rate: 2.1, count: 430 },
  },
  {
    id: 5,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 4.6, count: 400 },
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave ",
    price: 168,
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 3.9, count: 70 },
  },
  {
    id: 7,
    title: "White Gold Plated Princess",
    price: 9.99,
    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 3, count: 400 },
  },
  {
    id: 8,
    title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    price: 10.99,
    description:
      "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 1.9, count: 100 },
  },
  {
    id: 9,
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    price: 64,
    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: { rate: 3.3, count: 203 },
  },
  {
    id: 10,
    title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109,
    description:
      "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    rating: { rate: 2.9, count: 470 },
  },
  {
    id: 11,
    title:
      "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    price: 109,
    description:
      "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    rating: { rate: 4.8, count: 319 },
  },
  {
    id: 12,
    title:
      "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    price: 114,
    description:
      "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    rating: { rate: 4.8, count: 400 },
  },
  {
    id: 13,
    title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    price: 599,
    description:
      "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    rating: { rate: 2.9, count: 250 },
  },
  {
    id: 14,
    title:
      "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    price: 999.99,
    description:
      "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    rating: { rate: 2.2, count: 140 },
  },
  {
    id: 15,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    description:
      "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    rating: { rate: 2.6, count: 235 },
  },
  {
    id: 16,
    title:
      "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    description:
      "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    rating: { rate: 2.9, count: 340 },
  },
  {
    id: 17,
    title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    price: 39.99,
    description:
      "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    rating: { rate: 3.8, count: 679 },
  },
  {
    id: 18,
    title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
    price: 9.85,
    description:
      "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    rating: { rate: 4.7, count: 130 },
  },
  {
    id: 19,
    title: "Opna Women's Short Sleeve Moisture",
    price: 7.95,
    description:
      "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    rating: { rate: 4.5, count: 146 },
  },
  {
    id: 20,
    title: "DANVOUY Womens T Shirt Casual Cotton Short",
    price: 12.99,
    description:
      "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    rating: { rate: 3.6, count: 145 },
  },
];
```

### 전체 상품 호출 서버 API

- /src/pages/api/getallgood.ts
- http://localhost:3000/api/getallgood
- 위의 주소는 api 입니다. 페이지 아닙니다. 라우터 아닙니다.

```ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { seedData } from "./alldata";
import { GoodDataType } from "@/types";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoodDataType[]>
) {
  res.status(200).json(seedData);
}
```

### 전체 상품 호출 fetch 함수

- fetch 함수들을 별도로 모아서 관리
- `/src/lib 라는 폴더` 생성
- `/src/lib/fetch-good.ts 파일` 생성

```ts
import { GoodDataType } from "@/types";

export const fetchGoods = async (): Promise<GoodDataType[]> => {
  const url = "http://localhost:3000/api/getallgood";
  try {
    // axios 사용해됩니다. 하지만, fetch 를 사용하자.
    // 여기서 fetch 는 Next 에서 추천하고 기능이 더 추가됨.
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
```

### 랜덤 상품 호출 fetch 함수

- API 정의해 보기
  - /src/pages/api/randomgood.ts
  - "http://localhost:3000/api/randomgood"

```ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { seedData } from "./alldata";
import { GoodDataType } from "@/types";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoodDataType[]>
) {
  // 전체 데이터에서 랜덤하게 3개만 추출하기
  const randomGoods = seedData.sort(() => Math.random() - 0.5).slice(0, 3);
  res.status(200).json(randomGoods);
}
```

- fetch 함수 정의해 보기
  - `/src/lib/fetch-random-good.ts 파일` 생성

```ts
import { GoodDataType } from "@/types";

export const fetchRandomGood = async (): Promise<GoodDataType[]> => {
  const url = "http://localhost:3000/api/randomgood";
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
```

# 사전 렌더링과 데이터 패칭(Data Fetching)

- Server Side Rendering
- 데이터 패칭은 BE 로 부터 데이터를 불러오는 것을 칭함.

## 사전 렌더링과 데이터 패칭 방식 3가지

### 1. SSR

- Next 에서 기본적인 렌더링 방식
- 사용자 요청이 발생시 매번 html 사전렌더링

### 2. SSG

- `npm run build` 즉 빌드 타임에 미리 서버에서 html 사전 렌더링

### 3. ISR

- 일정한 주기를 가지고 서버에서 html 사전 렌더링

## SSR (Server Side Rendering)

- 요청이 들어오면 서버에서 html 을 사전에 렌더링 한 결과를 돌려줌.

### /src/pages/index.tsx 파일에 SSR 에 데이터패칭 적용해 보기

- 서버에서는 Node.js 코드가 진행됨.
- 서버에서는 웹브라우저용 코드 작성하면 오류임.
- 데이터를 패치하는 함수명은 이미 고정되어 있음.
- 데이터를 받아서 출력시키는 props 도 이미 고정 되어 있습니다.

```tsx
import styles from "@/pages/index.module.css";
import goods from "@/mock/goods.json";
import GoodItem from "@/components/good-item";
import { ReactNode } from "react";
import SearchLayout from "@/components/search-layout";
import { InferGetServerSidePropsType } from "next";

// Next 에는 약속이 된 함수가 있다.
// SSR 데이터 패칭을 위한 함수명이 정해져 있다.
// 아래의 함수 부터 서버에서 실행하고 그 결과를 다시 보여준다.
export const getServerSideProps = async () => {
  console.log("getServerSideProps 함수 서버에서 먼저 실행");
  const data = "getServerSideProps 함수 서버에서 먼저 실행 ";

  // 서버에서는 winodw 등의 웹브라우저용 js 를 사용하면 안됩니다.
  // window

  // 항상 객체를 리턴하고, 반드시 prop 라는 속성이 있어야 한다.
  return {
    props: {
      // 모든 데이터를 props 객체 안에 넣어야 함
      data,
    },
  };
};

export default function Home({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log(data);
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 추천하는 상품</h3>
        {/* 3개만 랜덤하게 출력 */}
        {goods.slice(0, 3).map((item) => (
          <GoodItem key={item.id} {...item} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 상품</h3>
        {/* 전체 상품 출력 */}
        {goods.map((item) => (
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

## 실제 API 를 호출하고 그결과를 데이터 패칭을 통해 SSR 적용하기

- /src/pages/`api 폴더`가 반드시 존재해야 합니다.
- /src/pages/`api`/alldata.ts 생성

```ts
import { GoodDataType } from "@/types";

// DB 에 저장된 전체 상품 목록
export const seedData: GoodDataType[] = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 },
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: { rate: 2.1, count: 430 },
  },
  {
    id: 5,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 4.6, count: 400 },
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave ",
    price: 168,
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 3.9, count: 70 },
  },
  {
    id: 7,
    title: "White Gold Plated Princess",
    price: 9.99,
    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 3, count: 400 },
  },
  {
    id: 8,
    title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    price: 10.99,
    description:
      "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 1.9, count: 100 },
  },
  {
    id: 9,
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    price: 64,
    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: { rate: 3.3, count: 203 },
  },
  {
    id: 10,
    title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109,
    description:
      "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    rating: { rate: 2.9, count: 470 },
  },
  {
    id: 11,
    title:
      "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    price: 109,
    description:
      "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    rating: { rate: 4.8, count: 319 },
  },
  {
    id: 12,
    title:
      "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    price: 114,
    description:
      "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    rating: { rate: 4.8, count: 400 },
  },
  {
    id: 13,
    title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    price: 599,
    description:
      "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    rating: { rate: 2.9, count: 250 },
  },
  {
    id: 14,
    title:
      "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    price: 999.99,
    description:
      "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    rating: { rate: 2.2, count: 140 },
  },
  {
    id: 15,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    description:
      "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    rating: { rate: 2.6, count: 235 },
  },
  {
    id: 16,
    title:
      "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    description:
      "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    rating: { rate: 2.9, count: 340 },
  },
  {
    id: 17,
    title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    price: 39.99,
    description:
      "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    rating: { rate: 3.8, count: 679 },
  },
  {
    id: 18,
    title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
    price: 9.85,
    description:
      "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    rating: { rate: 4.7, count: 130 },
  },
  {
    id: 19,
    title: "Opna Women's Short Sleeve Moisture",
    price: 7.95,
    description:
      "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    rating: { rate: 4.5, count: 146 },
  },
  {
    id: 20,
    title: "DANVOUY Womens T Shirt Casual Cotton Short",
    price: 12.99,
    description:
      "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    rating: { rate: 3.6, count: 145 },
  },
];
```

### 전체 상품 호출 서버 API

- /src/pages/api/getallgood.ts
- http://localhost:3000/api/getallgood
- 위의 주소는 api 입니다. 페이지 아닙니다. 라우터 아닙니다.

```ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { seedData } from "./alldata";
import { GoodDataType } from "@/types";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoodDataType[]>
) {
  res.status(200).json(seedData);
}
```

### 전체 상품 호출 fetch 함수

- fetch 함수들을 별도로 모아서 관리
- `/src/lib 라는 폴더` 생성
- `/src/lib/fetch-good.ts 파일` 생성

```ts
import { GoodDataType } from "@/types";

export const fetchGoods = async (): Promise<GoodDataType[]> => {
  const url = "http://localhost:3000/api/getallgood";
  try {
    // axios 사용해됩니다. 하지만, fetch 를 사용하자.
    // 여기서 fetch 는 Next 에서 추천하고 기능이 더 추가됨.
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
```

### 랜덤 상품 호출 fetch 함수

- API 정의해 보기
  - /src/pages/api/randomgood.ts
  - "http://localhost:3000/api/randomgood"

```ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { seedData } from "./alldata";
import { GoodDataType } from "@/types";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoodDataType[]>
) {
  // 전체 데이터에서 랜덤하게 3개만 추출하기
  const randomGoods = seedData.sort(() => Math.random() - 0.5).slice(0, 3);
  res.status(200).json(randomGoods);
}
```

- fetch 함수 정의해 보기
  - `/src/lib/fetch-random-good.ts 파일` 생성

```ts
import { GoodDataType } from "@/types";

export const fetchRandomGood = async (): Promise<GoodDataType[]> => {
  const url = "http://localhost:3000/api/randomgood";
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
```

- /src/pages/index.tsx 에 출력하기

```tsx
// Next 에는 약속이 된 함수가 있다.
export const getServerSideProps = async () => {
  // 항상 객체를 리턴하고, 반드시 prop 라는 속성이 있어야 한다.
  // 데이터를 미리 호출하여서 html 을 완성 리턴한다.
  // const allGoods = await fetchGoods();
  // const randomGoods = await fetchRandomGood();

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
```

## getServerSideProps 함수 검색 페이지에 SSR 및 데이터 패치 적용하기

### API 정의하기

- `/src/pages/api/`searchgood.ts 생성
- `http://localhost:3000/api/searchgood?keyword=Men`

```tsx
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { seedData } from "./alldata";
import { GoodDataType } from "@/types";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoodDataType[]>
) {
  // 요청(req)에 의한 쿼리(query) 처리하기
  const { keyword } = req.query;
  const filterGoods = seedData.filter((good) =>
    good.title.includes(keyword as string)
  );
  res.status(200).json(filterGoods);
}
```

### Fetch 정의하기

- /src/lib/fetch-search-good.ts

```ts
import { GoodDataType } from "@/types";

export const fetchSearchGood = async (
  keyword: string
): Promise<GoodDataType[]> => {
  const url = `http://localhost:3000/api/searchgood?keyword=${keyword}`;
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
```

- /src/lib/fetch-search-good.ts

### 결과 출력하기

- /src/pages/search.tsx 파일 생성

## getServerSideProps 함수 상세 페이지 SSR, 데이터패치 적용

### API 정의

- /src/api/onegood.ts

```ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { seedData } from "./alldata";
import { GoodDataType } from "@/types";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoodDataType | null>
) {
  // 요청(req)에 의한 Params 처리하기
  // URI 는 무조건 문자열로 처리됩니다.
  const { id } = req.query;
  const filterGoods = seedData.find(
    (good) => good.id === parseInt(id as string)
  );
  res.status(200).json(filterGoods || null);
}
```

### Fetch 정의

- /src/lib/fetch-one-good.ts 생성

```ts
import { GoodDataType } from "@/types";

export const fetchOneGood = async (
  id: number
): Promise<GoodDataType | null> => {
  const url = `http://localhost:3000/api/onegood/${id}`;
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
```

### 출력하기

- /src/pages/good/[id].tsx

```tsx
import { fetchOneGood } from "@/lib/fetch-one-good";
import styles from "@/pages/good/[id].module.css";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  // 쿼리 스티링이 context 에 담겨있음
  // const {keyword} = context.query;

  // 파라미터는 context 에 담겨있음
  // 파라미터도 서버에서 문자열로만 온다
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
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (data === null) {
    return <div> 현재 데이터가 없습니다.</div>;
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

## 실제로 Data Fetiching 효과를 보시려면,

- `npm run build`
- `npm run start` 하고 배포 진행
