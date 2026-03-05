import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="page-wrap px-4 pb-8 pt-14 prose prose-invert">
      <h1>Legendlist Web Beta 40 - Minimal Reproduction</h1>

      <p>
        This is a minimal reproduction of legendlist web beta-40 showing a bug
        when lazyloading big content on start reached. But is present on both
        windowScroll or scrollContainer setups.
      </p>

      <h2>References</h2>
      <ul>
        <li>
          <a href="">GitHub issue</a>
        </li>
      </ul>

      <p>Please use sidebar to of follow the link below</p>

      <ol>
        <li>
          <strong>
            <Link to="/window-scroll-jump-bug-demo" search={{ level: 2 }}>
              {" "}
              [KO] WindowScroll Scroll jump demo
            </Link>
          </strong>{" "}
          - using window scroll
        </li>
        <li>
          <strong>
            <Link to="/scroll-container-jump-bug-demo" search={{ level: 2 }}>
              {" "}
              [KO] ScrollContainer Scroll jump demo
            </Link>
          </strong>{" "}
          - using scroll container
        </li>
      </ol>
    </main>
  );
}
