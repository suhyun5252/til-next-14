import { GoodDataType } from "@/types";

export const fetchSearchGood = async (
  keyword: string
): Promise<GoodDataType[]> => {
  // const url = `http://localhost:3000/api/searchgood?keyword=${keyword}`;
  const url = "https://fakestoreapi.com/products";
  try {
    const response = await fetch(url);
    //console.log(response);
    // if (!response.ok) {
    //   throw new Error("Failed to fetch goodss");
    // }
    let data = await response.json();
    data = data.filter((good: GoodDataType) =>
      good.title.includes(keyword as string)
    );
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
