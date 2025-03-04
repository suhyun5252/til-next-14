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
