import type { NextApiRequest, NextApiResponse } from "next";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // /src/pages/index.tsx 페이지를 다시 생성
    await res.revalidate("/");
    return res.json({ revalidated: true });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error revalidating");
  }
}
