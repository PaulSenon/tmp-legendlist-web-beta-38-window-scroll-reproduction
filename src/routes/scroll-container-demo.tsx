import { ScrollContainerDemo } from "#/components/ScrollContainerDemo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/scroll-container-demo")({
  component: Demo2,
});

function Demo2() {
  return (
    // IMPORTANT 'h-screen' (=== "height: 100vh")
    <div className="bg-red-900 flex flex-col min-h-0 h-screen">
      <div className="p-1 prose prose-invert">
        <h3>Scroll container demo</h3>
        <p>
          This one should init at bottom position, have scroll to bottom button
          showing up when not bottom, and have it smooth scroll to bottom when
          clicked.
        </p>
      </div>
      <div className="flex flex-1 min-h-1">
        <ScrollContainerDemo />
      </div>
    </div>
  );
}
