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
