import type { LinksFunction } from "@remix-run/node";
import {
  LiveReload,
  Outlet,
  Links,
  useRouteError,
  isRouteErrorResponse,
} from "@remix-run/react";

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

export function ErrorBoundary() {
  const error = useRouteError();

  // ! when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <Document title="Uh-oh! App Route Error">
        <h1>App Route Error</h1>
        <pre>{error.data.message}</pre>
      </Document>
    );
  }

  return (
    <Document title="Uh-oh!">
      <h1>Uh oh ...</h1>
      <p>Something went wrong.</p>
      <pre>{error.message}</pre>
    </Document>
  );
}
