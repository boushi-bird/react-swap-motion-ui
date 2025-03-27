# react-swap-motion-ui

順番の入れ替えUIを持つReactコンポーネントです。

## 利用方法

```tsx
import { useState } from "react";
import { SwapMotionUI } from "react-swap-motion-ui";

export function Example() {
  const [items, setItems] = useState([
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Citrus" },
    { id: 4, name: "Durian" },
  ]);
  return (
    <div style={{ display: "flex" }}>
      {items.map((v, index) => (
        <SwapMotionUI
          key={v.id}
          index={index}
          items={items}
          onSwapPosition={setItems}
        >
          <div style={{ width: "100px", height: "50px" }}>{v.name}</div>
        </SwapMotionUI>
      ))}
    </div>
  );
}
```
