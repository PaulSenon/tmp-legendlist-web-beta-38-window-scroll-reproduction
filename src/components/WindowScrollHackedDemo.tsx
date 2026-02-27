import React from "react";

import { LegendList, type LegendListRef } from "@legendapp/list/react";
import { generateItems, type SimpleItem } from "#/lib/fakeData";
import { cn } from "#/lib/utils";

export function WindowScrollHackedDemo() {
  const data = React.useMemo(() => generateItems(220), []);
  const listRef = React.useRef<LegendListRef | null>(null);
  const [selectedId, setSelectedId] = React.useState<string | undefined>();
  const [showScrollToEnd, setShowScrollToEnd] = React.useState(true);
  const [_, rerender] = React.useState(0);

  // HACK isReady flag to hide when not layout-stable at init
  const [isReady, setIsReady] = React.useState<boolean>(false);

  const handleScroll = React.useCallback(() => {
    // Cannot find a reliable way to detect at end
    setShowScrollToEnd(true);
  }, [isReady]);

  // HACK scroll to bottom with something weird I found
  const HACKED_scrollAtEnd = React.useCallback(() => {
    listRef.current?.getNativeScrollRef().scrollToEnd({ animated: true });
  }, []);

  // N.B onLoad does not work
  React.useLayoutEffect(() => {
    listRef.current?.getNativeScrollRef().scrollToEnd({ animated: false });
    // Reaveal on next frame to avoid flicker
    const raf = requestAnimationFrame(() => setIsReady(true));
    return () => {
      cancelAnimationFrame(raf);
    };
  });

  // HACK we need to trigger a rerender for proper layout height calculation
  const handleLayout = React.useCallback(() => {
    if (!isReady) rerender(Date.now());
  }, [isReady]);

  return (
    <div
      // HACK to prevent jumping scrollbar
      data-loading-window-scrollbar={isReady ? undefined : true}
      className={cn(
        "p-3",
        isReady // HACK to hide flickering
          ? "opacity-100 transition-opacity duration-200 ease-out"
          : "opacity-0 scrollbar-none",
      )}
    >
      <LegendList<SimpleItem>
        // alignItemsAtEnd
        ref={listRef}
        data={data}
        drawDistance={200}
        estimatedItemSize={80}
        initialScrollAtEnd
        onScroll={handleScroll}
        onLayout={handleLayout}
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
        // style={styles.list} // No more style
        useWindowScroll
        waitForInitialLayout={true}
      />
      {showScrollToEnd ? (
        <button
          onClick={HACKED_scrollAtEnd}
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
