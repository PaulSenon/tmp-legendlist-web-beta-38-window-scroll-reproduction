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
            Now everything also work here yayy :) everything solved in beta-40
          </p>
        </div>
      </div>
      <div className="flex flex-col ">
        <WindowScrollDemo />
      </div>
    </div>
  );
}
