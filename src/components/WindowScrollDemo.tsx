import React from "react";

import { LegendList, type LegendListRef } from "@legendapp/list/react";
import { generateItems, type SimpleItem } from "#/lib/fakeData";

export function WindowScrollDemo() {
  const data = React.useMemo(() => generateItems(220), []);
  const listRef = React.useRef<LegendListRef | null>(null);
  const [selectedId, setSelectedId] = React.useState<string | undefined>();
  const [showScrollToEnd, setShowScrollToEnd] = React.useState(true);

  const handleScroll = React.useCallback(() => {
    const isAtEnd = listRef.current?.getState().isAtEnd;
    setShowScrollToEnd(!isAtEnd);
  }, []);

  const scrollAtEnd = React.useCallback(() => {
    listRef.current?.scrollToEnd({ animated: true });
  }, []);

  return (
    <div className="flex flex-1 min-h-0 relative p-3">
      <LegendList<SimpleItem>
        ref={listRef}
        data={data}
        drawDistance={200}
        estimatedItemSize={80}
        initialScrollAtEnd
        onScroll={handleScroll}
        keyExtractor={(it) => it?.id}
        renderItem={({ item, index }: { item: SimpleItem; index: number }) => (
          <button
            onClick={() => setSelectedId(item.id)}
            style={{
              background: selectedId === item.id ? "#ff0000" : "#000",
              border: "1px solid #e2e8f0",
              borderRadius: 10,
              cursor: "pointer",
              display: "block",
              marginBottom: 8,
              padding: "12px 14px",
              textAlign: "left",
              width: "100%",
            }}
            type="button"
          >
            <div style={{ fontWeight: 600, marginBottom: 4 }}>
              Row {index} / {data.length - 1}
            </div>
            <div style={{ color: "#475569", fontSize: 14 }}>{item.text}</div>
          </button>
        )}
        style={styles.list}
        useWindowScroll
      />
      {showScrollToEnd ? (
        <button
          onClick={scrollAtEnd}
          className="fixed bottom-0 bg-black p-5 rounded-full"
          type="button"
        >
          <svg
            aria-hidden="true"
            fill="red"
            height="18"
            viewBox="0 0 24 24"
            width="18"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>
        </button>
      ) : (
        <button
          onClick={scrollAtEnd}
          className="fixed bottom-0 bg-black p-5 rounded-full"
          type="button"
        >
          fallback btn
        </button>
      )}
    </div>
  );
}

const styles = {
  list: {
    flex: 1,
    minHeight: 0,
  },
};
