# api 폴더의 이해

- Next 는 서버입니다
- `흔히` FE 는 Next 구현 후 Vercle, AWS 에 배포합니다.
- `흔히` BE 는 AWS 에 배포합니다.
- `흔히` DB는 AWS에 배포합니다.

  - BE 는 API를 제공합니다. request > DB > response
  - Postman, Swagger, Excel
  - Next도 서버라서 API 연결이 가능합니다.
    - request > DB > response 가능합니다.

- api 용도입니다.
- http://localhost:3000/api/hello
- https://fakestoreapi.com/

## api 만들어보기

- /src/pages/api/getallgood.ts
- http://localhost:3000/api/getallgood

```ts
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data = await fetch("https://fakestoreapi.com/products");
  const json = await data.json();
  res.status(200).json(json);
}
```
