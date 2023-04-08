import { json } from "@remix-run/node";
import type { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { useLoaderData, useParams } from "@remix-run/react";

import { db } from "~/utils/db.server";
import { getUserId } from "~/utils/session.server";
import JokeDisplay from "~/components/joke";

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [{ title: "No joke" }, { description: "No joke found" }];
  }
  return [
    { title: `"${data.joke.name}" joke` },
    { description: `Enjoy the "${data.joke.name}" joke and much more` },
  ];
};

export const loader = async ({ params, request }: LoaderArgs) => {
  const joke = await db.joke.findUnique({ where: { id: params.jokeId } });
  const userId = await getUserId(request);

  if (!joke) {
    throw new Response("Joke not found!", { status: 404 });
  }

  return json({ joke, isOwner: userId === joke.jokesterId });
};

export default function JokeRoute() {
  const data = useLoaderData<typeof loader>();

  return <JokeDisplay joke={data.joke} isOwner={data.isOwner} />;
}

export function ErrorBoundary() {
  const { jokeId } = useParams();

  return (
    <div className="error-container">
      {`There was an error loading joke by the id ${jokeId}. Sorry.`}
    </div>
  );
}
