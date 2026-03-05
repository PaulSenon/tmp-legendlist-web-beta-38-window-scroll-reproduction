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
              activeProps={{ className: "bg-gray-900" }}
            >
              Home
            </Link>

            <Link
              to="/window-scroll-jump-bug-demo"
              className="text-red-400 hover:underline block p-1"
              activeProps={{ className: "bg-gray-900" }}
              search={{ level: 1 }}
            >
              [KO] window scroll jump issue
            </Link>
            <Link
              to="/scroll-container-jump-bug-demo"
              className="text-red-400 hover:underline block p-1"
              activeProps={{ className: "bg-gray-900" }}
              search={{ level: 1 }}
            >
              [KO] container scroll jump issue
            </Link>
          </nav>
        </aside>
        <main className="flex min-h-0 flex-col grow">
          <Outlet />
        </main>
      </div>
    </>
  );
}
