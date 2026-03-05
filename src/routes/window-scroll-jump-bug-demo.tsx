import { WindowScrollJumpDemo } from "#/components/WindowScrollJumpDemo";
import { generateItems } from "#/lib/fakeData";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React, {
  useTransition,
  type ChangeEvent,
  type InputEvent,
  type InputHTMLAttributes,
  type ReactNode,
} from "react";
import { z } from "zod";

export const Route = createFileRoute("/window-scroll-jump-bug-demo")({
  component: Demo1,
  validateSearch: z.object({
    level: z.coerce.number().int().min(1).max(50).catch(1),
  }),
});

import { useEffect, useMemo, useRef, useState, useCallback } from "react";

type JumpEvent = {
  at: number;
  deltaPx: number;
  fromPx: number;
  toPx: number;
};

type Props = {
  /** absolute delta between consecutive samples to consider a jump */
  thresholdPx?: number;
  /** keep last N jump messages */
  maxEvents?: number;
  /** optional custom formatter */
  format?: (e: JumpEvent) => string;
};

function getScrollFromBottom(): number {
  const doc = document.documentElement;
  return doc.scrollHeight - doc.clientHeight - window.scrollY;
}

export function ScrollJumpIndicator({
  thresholdPx = 1000,
  maxEvents = 5,
  format,
}: Props) {
  const [pxFromBottom, setPxFromBottom] = useState(0);
  const [events, setEvents] = useState<JumpEvent[]>([]);

  const prevRef = useRef<number | null>(null);
  const rafRef = useRef<number>(0);

  const fmt = useMemo(() => {
    return (
      format ??
      ((e: JumpEvent) =>
        `Jump detected: ${Math.round(e.deltaPx)}px (${Math.round(e.fromPx)} → ${Math.round(e.toPx)} from bottom)`)
    );
  }, [format]);

  useEffect(() => {
    const sample = () => {
      rafRef.current = 0;

      const next = getScrollFromBottom();
      setPxFromBottom(next);

      const prev = prevRef.current;
      if (prev != null) {
        const delta = Math.abs(next - prev);
        if (delta >= thresholdPx) {
          const ev: JumpEvent = {
            at: Date.now(),
            deltaPx: delta,
            fromPx: prev,
            toPx: next,
          };
          setEvents((cur) => [ev, ...cur].slice(0, maxEvents));
        }
      }
      prevRef.current = next;
    };

    const onScrollOrResize = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(sample);
    };

    // init
    sample();

    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [thresholdPx, maxEvents]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 12,
        right: 12,
        width: 320,
        padding: "8px 10px",
        borderRadius: 10,
        background: "rgba(0,0,0,0.72)",
        color: "white",
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        fontSize: 12,
        zIndex: 9999,
        pointerEvents: "none",
      }}
    >
      <div style={{ opacity: 0.7, marginBottom: 6 }}>
        {events.length === 0 ? (
          <span style={{ opacity: 0.5 }}>No jumps detected</span>
        ) : (
          events.map((e) => <div key={e.at}>{fmt(e)}</div>)
        )}
      </div>

      <div>{Math.max(0, Math.round(pxFromBottom))}px from btm</div>
      <div style={{ opacity: 0.7 }}>(detecting &gt; {thresholdPx} px)</div>
    </div>
  );
}

function Button({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      className="boder rounded-md  px-3 bg-white text-black hover:bg-gray-500"
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Demo1() {
  const navigate = useNavigate();
  const { level } = Route.useSearch();
  const [sizeMultiplicator, _setSizeMultiplicator] = React.useState(level);
  const [data, setData] = React.useState(() =>
    generateItems(10, {
      sizeMultiplicator,
    }),
  );
  const [isPending, startTransition] = useTransition();
  const setSizeMultiplicator = useCallback(
    async (value: number) => {
      startTransition(() => _setSizeMultiplicator(value));
      await navigate({
        search: { level: value },
        replace: true,
      });
    },
    [navigate],
  );
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const next = Number(e.target.value);
      setSizeMultiplicator(next);
    },
    [setSizeMultiplicator],
  );

  const handleLoadMore = useCallback(() => {
    setData((data) => [
      ...generateItems(10, {
        sizeMultiplicator,
      }),
      ...data,
    ]);
  }, [sizeMultiplicator]);
  return (
    <div className=" flex min-h-0 ">
      <div className="flex flex-col grow prose prose-invert">
        <WindowScrollJumpDemo data={data} onLoadMore={handleLoadMore} />
      </div>
      <div className="relative shrink">
        <div className="p-1 sticky top-0 bg-blue-900 z-10 prose prose-invert">
          <ScrollJumpIndicator thresholdPx={200 * (sizeMultiplicator + 1)} />
          <h3>Window scroll start bottom lazyload scroll jump bug</h3>
          <div>
            <p>
              This list is using window scroll and is starting at bottom (e.g.
              chat history)
            </p>
            <p>
              when start is reached, it loads a new page of content (simulate
              lazy loading older messages)
            </p>
            <p>
              BUG: the append top of messages if often messing up with scroll
              position making big jumps. You can check the scroll jumb debugger
              in bottom that monitor scroll pos from bottom of the page and log
              if any be jumps between two samples.
            </p>
            <p>
              This bug seem appearing when the appended items height are big
              (bigger than vh ?), and perhaps has something to do with scroll
              event handling (passive ?), because a solid workaround is to
              preventDefault on all scroll related inputs right before adding
              items, and reenable after onLayout.
            </p>
            <p>
              The input bellow allow you to increate message size (multiplier).
              I suggest you refresh after changing the value. You can try a safe
              working preset, like{" "}
              <Button
                onClick={async () => {
                  await setSizeMultiplicator(2);
                  window.location.reload();
                }}
              >
                2
              </Button>{" "}
              that should work without issue when you scroll top even fast, then
              try a big multiplier like{" "}
              <Button
                onClick={async () => {
                  await setSizeMultiplicator(50);
                  window.location.reload();
                }}
              >
                50
              </Button>{" "}
              and try the same. It will most likely start showing you scroll
              jumb in the scroll jump detector bellow
            </p>
            <div className="flex">
              <input
                className="grow"
                type="range"
                min={1}
                max={50}
                step={1}
                value={sizeMultiplicator}
                onChange={handleInputChange}
              />
              <div className="mx-5 tabular-nums">{sizeMultiplicator}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
