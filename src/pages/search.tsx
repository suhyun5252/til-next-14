// 앱 라우터버전 import { useRouter } from "next/navigation";
import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  //   console.log(router);
  const { keyword } = router.query;
  //   console.log(keyword);
  return (
    <div>
      검색 <b>{keyword}</b> 페이지
    </div>
  );
}
