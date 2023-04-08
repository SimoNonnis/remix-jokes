import { json } from "@remix-run/node";
import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData, Link, useParams } from "@remix-run/react";

import { db } from "~/utils/db.server";

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [{ title: "No joke" }, { description: "No joke found" }];
  }
  return [
    { title: `"${data.joke.name}" joke` },
    { description: `Enjoy the "${data.joke.name}" joke and much more` },
  ];
};

export const loader = async ({ params }: LoaderArgs) => {
  const joke = await db.joke.findUnique({ where: { id: params.jokeId } });

  if (!joke) {
    throw new Error("Joke not found!");
  }

  return json({ joke });
};

export default function JokeRoute() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{data.joke.content}</p>
      <Link to=".">{data.joke.name} Permalink</Link>
    </div>
  );
}

export function ErrorBoundary() {
  const { jokeId } = useParams();

  return (
    <div className="error-container">
      {`There was an error loading joke by the id ${jokeId}. Sorry.`}
    </div>
  );
}
