import React, { type RefObject } from "react";

import { LegendList, type LegendListRef } from "@legendapp/list/react";
import { generateItems, type SimpleItem } from "#/lib/fakeData";

export function ScrollContainerScrollJumpDemo({
  data,
  onLoadMore,
  scrollRef,
}: {
  data: SimpleItem[];
  onLoadMore: () => void;
  scrollRef: RefObject<HTMLElement | null>;
}) {
  const isReady = React.useRef(false);
  const listRef = React.useRef<LegendListRef | null>(null);
  const [showScrollToEnd, setShowScrollToEnd] = React.useState(true);

  React.useEffect(() => {
    console.log("listRef", listRef.current?.getScrollableNode());
    scrollRef.current = listRef.current?.getScrollableNode() ?? null;
  }, [scrollRef]);

  const handleScroll = React.useCallback(() => {
    const isAtEnd = listRef.current?.getState().isAtEnd;
    setShowScrollToEnd(!isAtEnd);
  }, []);

  const scrollAtEnd = React.useCallback(() => {
    listRef.current?.scrollToEnd({ animated: true });
  }, []);

  const handleStartReached = React.useCallback(() => {
    if (!isReady.current) return;
    onLoadMore();
  }, [onLoadMore]);

  return (
    <div className="flex flex-1 flex-col min-h-0 relative p-3">
      <LegendList<SimpleItem>
        ref={listRef}
        data={data}
        initialScrollAtEnd
        onStartReached={handleStartReached}
        onStartReachedThreshold={1}
        onLoad={() => {
          isReady.current = true;
        }}
        maintainVisibleContentPosition
        onScroll={handleScroll}
        keyExtractor={(it) => it?.id}
        renderItem={({ item, index }: { item: SimpleItem; index: number }) => (
          <button
            style={{
              background: item.debugColor ?? "#000",
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
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Row {index}</div>
            <div style={{ color: "#fff", fontSize: 14 }}>{item.text}</div>
          </button>
        )}
        style={styles.list}
      />
      {showScrollToEnd ? (
        <button
          onClick={scrollAtEnd}
          className="fixed bottom-0 bg-black p-5 rounded-full"
          type="button"
        >
          <svg
            aria-hidden="true"
            fill="none"
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
      ) : null}
    </div>
  );
}

const styles = {
  list: {
    flex: 1,
    minHeight: 0,
  },
};
