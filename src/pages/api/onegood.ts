// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { seedData } from "./alldata";
import { GoodDataType } from "@/types";
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GoodDataType | null>
) {
  // 요청(req)에 의한 Params 처리하기
  // URI 는 무조건 문자열로 처리됩니다.
  const { id } = req.query;
  console.log(id);
  const filterGoods = seedData.find(
    (good) => good.id === parseInt(id as string)
  );
  console.log(filterGoods);
  res.status(200).json(filterGoods || null);
}
