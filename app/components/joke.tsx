import type { Joke } from "@prisma/client";
import { Form, Link } from "@remix-run/react";

type Props = {
  joke: Pick<Joke, "name" | "content">;
  isOwner: boolean;
  canDelete?: boolean;
};
export default function JokeDisplay({ joke, isOwner, canDelete }: Props) {
  return (
    <div>
      <p>Here's your hilarious joke:</p>
      <p>{joke.content}</p>
      <Link to=".">{joke.name} Permalink</Link>

      {isOwner ? (
        <Form method="post">
          <button
            className="button"
            disabled={!canDelete}
            type="submit"
            name="intent"
            value="delete"
          >
            Delete
          </button>
        </Form>
      ) : null}
    </div>
  );
}
