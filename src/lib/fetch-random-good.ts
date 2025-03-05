import { GoodDataType } from "@/types";

export const fetchRandomGood = async (): Promise<GoodDataType[]> => {
  // const url = "http://localhost:3000/api/randomgoods";
  const url = "https://fakestoreapi.com/products";
  try {
    const response = await fetch(url);
    // console.log(response);
    // if (!response.ok) {
    //   throw new Error("Failed to fetch goods");
    // }
    let data = await response.json();

    data = data.sort(() => Math.random() - 0.5).slice(0, 3);
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
