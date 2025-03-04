import styles from "@/pages/good/[id].module.css";
import { GoodDataType } from "@/types";
import Image from "next/image";
// 임시 데이터
const mockData: GoodDataType = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description: "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
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
      <div className={styles.cover_image} style={{ backgroundImage: `url(${image})` }}>
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
