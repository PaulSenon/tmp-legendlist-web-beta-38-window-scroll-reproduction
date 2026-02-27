import { WindowScrollHackedDemo } from "#/components/WindowScrollHackedDemo";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/window-scroll-hacked-demo")({
  component: Demo1,
});

function Demo1() {
  return (
    <div className="bg-purple-800 ">
      <div className="sticky top-0 bg-purple-800 z-10 p-1 prose prose-invert">
        <h3>Hacked Window scroll demo</h3>
        <div>
          <p>
            This one should init at bottom position (fixed but hacky and not
            frame perfect so have to hide while stabilisating), have scroll to
            bottom button showing up when not bottom (broken, can't find a
            reliable way to compute this), and have it smooth scroll to bottom
            when clicked (fixed with weird api I'm not supposed to use).
          </p>
          <p>I forced the scroll to bottom button showed at all time</p>
        </div>
      </div>
      <div className="flex flex-col ">
        <WindowScrollHackedDemo />
      </div>
    </div>
  );
}
