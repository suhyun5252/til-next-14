# Global CSS

- 모든 페이지에 적용할 레이아웃은 `_app.tsx` 에 설정함.

## 공통 레이아웃을 위한 컴포넌트 생성

- /src/components 폴더 생성
- /src/components/global-layout.tsx

```tsx
export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>헤더</header>
      <main>{children}</main>
      <footer>하단</footer>
    </div>
  );
}
```

- `_app.tsx` 에 컴포넌트 적용

```tsx
import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalLayout>
      <Component {...pageProps} />
    </GlobalLayout>
  );
}
```

- /src/components/global-layout.tsx 수정

```tsx
export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <header>👕 Shopping Mall 👔</header>
      <main>{children}</main>
      <footer>Copyright 2025 By Kim. </footer>
    </div>
  );
}
```

- /src/styles/global.css 수정

```css
html,
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline-style: none;
  background-color: rgb(250, 250, 250);
}
```

- /src/styles/global-layout.module.css 생성

```css
.container {
  background-color: #fff;
  max-width: 600px;
  min-height: 100vh;
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 0px 30px 0px;
  padding: 0 15px;
}
.header {
  height: 60px;
  font-weight: bold;
  font-size: 18px;
  line-height: 60px;
}
.header > a {
  text-decoration: none;
  color: #000;
}
.main {
  padding: 10px;
}
.footer {
  padding: 100px 0px;
  color: #000;
}
```

- /src/components/global-layout.tsx 수정

```tsx
import styles from "@/styles/global-layout.module.css";
import Link from "next/link";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Link href={"/"}>👕 Shopping Mall 👔</Link>
      </header>
      <main className={styles.main}>{children}</main>
      <footer className={styles.footer}>Copyright 2025 By Kim. </footer>
    </div>
  );
}
```

# 첫화면

- /src/pages/index.tsx

```tsx
import styles from "@/pages/index.module.css";
export default function Home() {
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 추천하는 상품</h3>
      </section>
      <section>
        <h3>등록된 모든 상품</h3>
      </section>
    </div>
  );
}
```

- /src/pages/index.module.css

```css
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.container h3 {
  margin-bottom: 0;
}
```

## 첫화면에 보여줄 상품 목록 컴포넌트

- /src/componets/good-item.tsx 생성

```tsx
import React from "react";

const GoodItem = () => {
  return <div>good-item</div>;
};

export default GoodItem;
```

## 더미 데이터(Mock Data)

- https://fakestoreapi.com/docs
- /src/mock 폴더 생성
- /src/mock/goods.json 파일 생성

```json
[
  {
    "id": 1,
    "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    "price": 109.95,
    "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    "rating": { "rate": 3.9, "count": 120 }
  },
  {
    "id": 2,
    "title": "Mens Casual Premium Slim Fit T-Shirts ",
    "price": 22.3,
    "description": "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    "rating": { "rate": 4.1, "count": 259 }
  },
  {
    "id": 3,
    "title": "Mens Cotton Jacket",
    "price": 55.99,
    "description": "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    "rating": { "rate": 4.7, "count": 500 }
  },
  {
    "id": 4,
    "title": "Mens Casual Slim Fit",
    "price": 15.99,
    "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    "category": "men's clothing",
    "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    "rating": { "rate": 2.1, "count": 430 }
  },
  {
    "id": 5,
    "title": "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    "price": 695,
    "description": "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    "category": "jewelery",
    "image": "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    "rating": { "rate": 4.6, "count": 400 }
  },
  {
    "id": 6,
    "title": "Solid Gold Petite Micropave ",
    "price": 168,
    "description": "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    "category": "jewelery",
    "image": "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    "rating": { "rate": 3.9, "count": 70 }
  },
  {
    "id": 7,
    "title": "White Gold Plated Princess",
    "price": 9.99,
    "description": "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    "category": "jewelery",
    "image": "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    "rating": { "rate": 3, "count": 400 }
  },
  {
    "id": 8,
    "title": "Pierced Owl Rose Gold Plated Stainless Steel Double",
    "price": 10.99,
    "description": "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    "category": "jewelery",
    "image": "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    "rating": { "rate": 1.9, "count": 100 }
  },
  {
    "id": 9,
    "title": "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    "price": 64,
    "description": "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    "rating": { "rate": 3.3, "count": 203 }
  },
  {
    "id": 10,
    "title": "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    "price": 109,
    "description": "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    "rating": { "rate": 2.9, "count": 470 }
  },
  {
    "id": 11,
    "title": "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    "price": 109,
    "description": "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    "rating": { "rate": 4.8, "count": 319 }
  },
  {
    "id": 12,
    "title": "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    "price": 114,
    "description": "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    "rating": { "rate": 4.8, "count": 400 }
  },
  {
    "id": 13,
    "title": "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    "price": 599,
    "description": "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    "rating": { "rate": 2.9, "count": 250 }
  },
  {
    "id": 14,
    "title": "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    "price": 999.99,
    "description": "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
    "category": "electronics",
    "image": "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    "rating": { "rate": 2.2, "count": 140 }
  },
  {
    "id": 15,
    "title": "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    "price": 56.99,
    "description": "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    "rating": { "rate": 2.6, "count": 235 }
  },
  {
    "id": 16,
    "title": "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    "price": 29.95,
    "description": "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    "rating": { "rate": 2.9, "count": 340 }
  },
  {
    "id": 17,
    "title": "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    "price": 39.99,
    "description": "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    "rating": { "rate": 3.8, "count": 679 }
  },
  {
    "id": 18,
    "title": "MBJ Women's Solid Short Sleeve Boat Neck V ",
    "price": 9.85,
    "description": "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    "rating": { "rate": 4.7, "count": 130 }
  },
  {
    "id": 19,
    "title": "Opna Women's Short Sleeve Moisture",
    "price": 7.95,
    "description": "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    "rating": { "rate": 4.5, "count": 146 }
  },
  {
    "id": 20,
    "title": "DANVOUY Womens T Shirt Casual Cotton Short",
    "price": 12.99,
    "description": "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
    "category": "women's clothing",
    "image": "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    "rating": { "rate": 3.6, "count": 145 }
  }
]
```

## 더미 데이터 출력

- /src/pages/index.tsx

```tsx
import styles from "@/pages/index.module.css";
import goods from "@/mock/goods.json";
import GoodItem from "@/components/good-item";
export default function Home() {
  return (
    <div className={styles.container}>
      <section>
        <h3>지금 추천하는 상품</h3>
        {/* 3개만 랜덤하게 출력 */}
        {goods.slice(0, 3).map((item) => (
          <GoodItem key={item.id} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 상품</h3>
        {/* 전체 상품 출력 */}
        {goods.map((item) => (
          <GoodItem key={item.id} />
        ))}
      </section>
    </div>
  );
}
```

- /src/components/good-item.tsx 수정

```tsx
import React from "react";

interface GoodItemProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

const GoodItem = ({ title }: GoodItemProps) => {
  return <div>{title}</div>;
};

export default GoodItem;
```

- /src/pages/index.tsx Props 전달

```tsx
import styles from "@/pages/index.module.css";
import goods from "@/mock/goods.json";
import GoodItem from "@/components/good-item";
export default function Home() {
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
```

## 데이터의 정의를 외부로 추출

- /src/types.ts 생성

```ts
export interface GoodDataType {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}
```

- /src/components/good-item.tsx 수정 아이템을 정리해서 출력하는 작업

```tsx
import styles from "@/components/good-item.module.css";
import { GoodDataType } from "@/types";
import Link from "next/link";
import React from "react";

const GoodItem = ({ title, id, image, category, rating }: GoodDataType) => {
  return (
    <Link href={`/good/${id}`} className={styles.container}>
      <img src={image} alt={title} />
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.category}>{category}</div>
        <br />
        <div className={styles.rating}>
          Rating : {rating.rate} | {rating.count}
        </div>
      </div>
    </Link>
  );
};

export default GoodItem;
```

- /src/components/good-item.module.css 생성

```css
.container {
  display: flex;
  gap: 15px;
  padding: 20px 10px;
  border-bottom: 1px solid rgb(220, 220, 220);
  color: #000;
  text-decoration: none;
}
.container > img {
  width: 80px;
}
.title {
  font-weight: bold;
}
.category {
}
.rating {
  color: rgb(128, 128, 128);
}
```

## 이미지를 최적화해주는 Next

- Next 는 이미지를 자동으로 용량 최적화 해줌.
- Next 는 스크롤시 화면에 이미지가 보일 때줌 로딩합니다.
- layzy loading
- 곤란한 상황 (외부경로 이미지는 설정이 필요)

### 1. Image 컴포넌트

- width
- height

### 2. 외부 URL 이미지 경로 사용시 설정

- `next.config.mjs` 추가

```mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
    ],
  },
};

export default nextConfig;
```

## 검색 컴포넌트 및 페이지 작성

- /src/components/search-layout.tsx

```tsx
import React, { useState } from "react";
import styles from "@/components/search-layout.module.css";
import { useRouter } from "next/router";
const SearchLayout = () => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleKeyEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };
  const handleSubmit = () => {
    // console.log(search);
    if (search.trim() === "") {
      alert("검색어를 입력하세요.");
      return;
    }
    router.push(`/search?keyword=${search}`);
    setSearch("");
  };
  return (
    <div>
      <div className={styles.container}>
        <input
          type="text"
          value={search}
          onKeyDown={(e) => handleKeyEnter(e)}
          onChange={(e) => handleChange(e)}
          placeholder="검색어를 입력하세요."
        />
        <button onClick={handleSubmit}>검색</button>
      </div>
    </div>
  );
};

export default SearchLayout;
```

- /src/components/search-layout.moudle.css

```css
.container {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}
.container > input {
  flex: 1;
  padding: 15px;
  border: 1px solid rgb(220, 220, 220);
  border-radius: 5px;
}
.container > button {
  width: 80px;
  border-radius: 5px;
  border: none;
  background-color: rgb(37, 147, 255);
  color: #fff;
  cursor: pointer;
}
```

- `/src/pages/_app.tsx` 에 일단 추가

```tsx
import GlobalLayout from "@/components/global-layout";
import SearchLayout from "@/components/search-layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GlobalLayout>
      <SearchLayout />
      <Component {...pageProps} />
    </GlobalLayout>
  );
}
```

## 검색 페이지

- /src/pages/search.module.css 생성

```css
.container {
  display: flex;
  flex-direction: column;
}
.container > h4 > strong {
  color: #e007ad;
  font-size: 20px;
  text-decoration: underline;
}
```

- /src/pages/search.tsx 수정

```tsx
import styles from "@/pages/search.module.css";
// 앱 라우터버전 import { useRouter } from "next/navigation";
import { useRouter } from "next/router";
import goods from "@/mock/goods.json";
import GoodItem from "@/components/good-item";

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
```

## 제품 상세 페이지

- /src/pages/good/[id].module.css

```css
.container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.cover_image {
  position: relative;
  display: flex;
  justify-content: center;
  padding: 20px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.cover_image::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}
.cover_image > img {
  position: relative;
  max-height: 350px;
  height: 100%;
  border-radius: 5px;
}
.title {
  font-size: 20px;
  font-weight: bold;
}
.title > span {
  color: gray;
  font-weight: normal;
  font-size: 16px;
}
.category {
  color: hotpink;
  text-transform: uppercase;
  font-weight: bold;
}
.rating {
  color: gray;
}
.description {
  padding: 20px;
  color: #000;
  background-color: rgb(245, 245, 245);
  line-height: 1.3;
}
```

- /src/pages/good/[id].tsx

```tsx
import styles from "@/pages/good/[id].module.css";
import { GoodDataType } from "@/types";
import Image from "next/image";
// 임시 데이터
const mockData: GoodDataType = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: { rate: 3.9, count: 120 },
};

export default function Page() {
  const { title, image, category, price, description, rating } = mockData;
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

# 공통 레이아웃에 다양한 레이아웃 적용해보기

- `_app.tsx`

```tsx
import GlobalLayout from "@/components/global-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

// 속성을 추가해준다. 확장도 한다.
// NextPage 타입을 확장해서 개발자가 추가로 ReactNode 를 1개 추가한 타입
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
};

export default function App({
  Component,
  pageProps,
}: AppProps & {
  Component: NextPageWithLayout;
}) {
  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>;
}
```

- /src/pages/index.tsx 그리고 /src/pages/search.tsx

```tsx
// JS 에서는 함수도 객체다.
// 객체는 속성을 추가할 수 있다.
Home.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};

Page.getLayout = (page: ReactNode) => {
  return <SearchLayout>{page}</SearchLayout>;
};
```
