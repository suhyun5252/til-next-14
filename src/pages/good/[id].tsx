import { fetchOneGood } from "@/lib/fetch-one-good";
import styles from "@/pages/good/[id].module.css";
import {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
// // 라우터가 동적인 경로가 필요로 한 상황이다.
// http://localhost:3000/good/1 ===> 파라메터
export function getStaticPaths() {
  return {
    // paths 에는 기본적으로 SSG를 적용해서 데이터를 미리 생성후 반영할 경로
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    // fallback: false, // 위의 paths 에 없는 경로는 404 로 출력
    // fallback: true, // 위의 paths 에 없는 경로는 레이아웃 렌더링 후 데이터 로드
    fallback: "blocking", // 위의 paths 에 없는 경로는 즉시 SSG 로 생성
  };
}

export async function getStaticProps(context: GetServerSidePropsContext) {
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
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>해외 쇼핑몰 추천 서비스</title>
          <meta name="description" content="제품 정보가 없습니다." />
          {/* sns 공유 타이틀 */}
          <meta property="og:title" content="제품 정보가 없습니다." />
          <meta property="og:description" content="제품 정보가 없습니다." />
          <meta property="og:image" content="/thumbnail.png" />
        </Head>
        <div>Loading...</div>
      </>
    );
  }

  if (!data) {
    return (
      <>
        <Head>
          <title>해외 쇼핑몰 추천 서비스</title>
          <meta name="description" content="제품 정보가 없습니다." />
          {/* sns 공유 타이틀 */}
          <meta property="og:title" content="제품 정보가 없습니다." />
          <meta property="og:description" content="제품 정보가 없습니다." />
          <meta property="og:image" content="/thumbnail.png" />
        </Head>
        <div> 현재 데이터가 없습니다.</div>
      </>
    );
  }
  const { title, image, category, price, description, rating } = data;
  return (
    <>
      <Head>
        <title>{title} 상세정보</title>
        <meta name="description" content={description} />
        {/* sns 공유 타이틀 */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
      </Head>
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
    </>
  );
}
