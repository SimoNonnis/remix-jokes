import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

import stylesUrl from "~/styles/index.css";

export const meta: V2_MetaFunction<typeof loader> = () => {
  return [
    { title: `Remix: So great and simple!` },
    { description: "Remix jokes app. Learn Remix and laugh at the same time!" },
  ];
};
export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function IndexRoute() {
  return (
    <div className="container">
      <div className="content">
        <h1>
          Remix <span>Jokes!</span>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="jokes">Read Jokes</Link>
            </li>
            <li>
              <Link to="login">Login/Register</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
