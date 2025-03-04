import { GoodDataType } from "@/types";

export const fetchOneGood = async (
  id: number
): Promise<GoodDataType | null> => {
  const url = `http://localhost:3000/api/onegood?id=${id}`;
  try {
    const res = await fetch(url);
    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
};
