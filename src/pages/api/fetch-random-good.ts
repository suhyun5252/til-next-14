import { GoodDataType } from "@/types";

export const fetchRandomGood = async (): Promise<GoodDataType[]> => {
  try {
    const url = "http://localhost:3000/api/randomgood";
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
};
