# CSS

# 인라인 스타일 시트

- /src/pages/index.tsx

```tsx
export default function Home() {
  return <h1 style={{ color: "red" }}>홈</h1>;
}
```

## 외부 css 연결 파일 (Next 에서는 page 연결할수 없음)

- /src/pages/index.css
- `_app.tsx` 이외에는 절대로 사용할 수 없다.

```css
.title {
  color: green;
}
```

- **오류가 발생함**

```tsx
import "./index.css";

export default function Home() {
  return <h1 className="title">홈</h1>;
}
```

## Next 에서는 module css 만 page 에 연결할 수 있다.

- /src/pages/index.module.css 파일명 수정

```tsx
import styles from "./index.module.css";

export default function Home() {
  return <h1 className={styles.title}>홈</h1>;
}
```
