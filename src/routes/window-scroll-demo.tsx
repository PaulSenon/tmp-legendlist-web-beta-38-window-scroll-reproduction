import { WindowScrollDemo } from "#/components/WindowScrollDemo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/window-scroll-demo")({
  component: Demo1,
});

function Demo1() {
  return (
    <div className="bg-blue-900 flex flex-col min-h-0">
      <div className="p-1 sticky top-0 bg-blue-900 z-10 prose prose-invert">
        <h3>Window scroll demo</h3>
        <div>
          <p>
            This one should init at bottom position (broken, not perfectly at
            bottom), have scroll to bottom button showing up when not bottom
            (broken, never showing), and have it smooth scroll to bottom when
            clicked (broken, it's scrolling instant and at start).
          </p>
          <p>
            because we cannot test scroll top button if never showing, I show
            here a "fallback btn" that does the same scroll end action
          </p>
        </div>
      </div>
      <div className="flex flex-col ">
        <WindowScrollDemo />
      </div>
    </div>
  );
}
