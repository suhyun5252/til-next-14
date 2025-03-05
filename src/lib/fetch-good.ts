import { GoodDataType } from "@/types";

export const fetchGoods = async (): Promise<GoodDataType[]> => {
  const url = "https://fakestoreapi.com/products";
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
