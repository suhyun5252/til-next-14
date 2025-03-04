// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { seedData } from "./alldata";
import { GoodDataType } from "@/types";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoodDataType[]>
) {
  // 요청(req)에 의한 쿼리(query) 처리하기
  const { keyword } = req.query;
  const filterGoods = seedData.filter((good) =>
    good.title.includes(keyword as string)
  );
  res.status(200).json(filterGoods);
}
