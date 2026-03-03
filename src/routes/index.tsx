import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14 prose prose-invert">
      <h1> [SOLVED] Legendlist Web Beta 38 - Minimal Reproduction</h1>

      <p>
        This is a minimal reproduction of legendlist web beta 38 with window
        scroll. NOW SOLVED BY BETA 40
      </p>

      <h2>References</h2>
      <ul>
        <li>
          <a href="https://github.com/LegendApp/legend-list/issues/404">
            GitHub issue
          </a>
        </li>
        <li>
          <a href="https://x.com/isaaacdotdev/status/2027396762835513408">
            Twitter thread
          </a>
        </li>
      </ul>

      <p>Please use sidebar to check the 2 demos:</p>

      <ol>
        <li>
          <strong>
            <Link to="/scroll-container-demo">Working case</Link>
          </strong>{" "}
          - using scroll container, not window scroll
        </li>
        <li>
          <strong>
            <Link to="/window-scroll-demo"> Broken case (now FIXED)</Link>
          </strong>{" "}
          - using window scroll
        </li>
      </ol>
    </main>
  );
}
