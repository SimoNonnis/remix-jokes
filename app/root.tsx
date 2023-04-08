import type { LinksFunction } from "@remix-run/node";
import { LiveReload, Outlet, Links } from "@remix-run/react";

import globalStylesUrl from "./styles/global.css";
import globalMediumStylesUrl from "./styles/global-medium.css";
import globalLargeStylesUrl from "./styles/global-large.css";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: globalStylesUrl,
    },
    {
      rel: "stylesheet",
      href: globalMediumStylesUrl,
      media: "print, (min-width: 640px)",
    },
    {
      rel: "stylesheet",
      href: globalLargeStylesUrl,
      media: "screen and (min-width: 1024px)",
    },
  ];
};

type Doc = {
  children: React.ReactNode;
  title?: string;
};

function Document({ children, title = `Remix: So great, it's funny!` }: Doc) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>{title}</title>

        <Links />
      </head>
      <body>
        {children}
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <Document title="Uh-oh!">
      <h1>App Error</h1>
      <pre>{error.message}</pre>
    </Document>
  );
}
