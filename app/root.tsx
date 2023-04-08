import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import {
  LiveReload,
  Outlet,
  Links,
  useRouteError,
  isRouteErrorResponse,
  Meta,
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

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  return [
    { charset: "utf-8" },
    { description: "Learn Remix and laugh at the same time!" },
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
        <Meta />
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
