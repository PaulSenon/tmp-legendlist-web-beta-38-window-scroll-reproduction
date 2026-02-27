import { Outlet, createRootRoute, Link } from "@tanstack/react-router";

import "../styles.css";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="flex min-h-screen">
        <aside className="w-60 shrink-0 bg-black text-white p-4 sticky top-0 h-screen">
          <nav className="flex flex-col gap-2">
            <Link
              to="/"
              className="text-white hover:underline block p-1"
              activeProps={{ className: "bg-gray-700" }}
            >
              Home
            </Link>
            <Link
              to="/scroll-container-demo"
              className="text-white hover:underline block p-1"
              activeProps={{ className: "bg-gray-700" }}
            >
              [OK] scroll container demo
            </Link>
            <Link
              to="/window-scroll-demo"
              className="text-white hover:underline block p-1"
              activeProps={{ className: "bg-gray-700" }}
            >
              [KO] window scroll demo
            </Link>
            <Link
              to="/window-scroll-hacked-demo"
              className="text-white hover:underline block p-1"
              activeProps={{ className: "bg-gray-700" }}
            >
              [~OK]window scroll hacked demo
            </Link>
          </nav>
        </aside>
        <main className="w-lg m-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
}
