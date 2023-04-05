import type { LinksFunction, ActionArgs } from "@remix-run/node";
import { useSearchParams, Link, useActionData } from "@remix-run/react";
import { badRequest } from "~/utils/request.server";
import { db } from "~/utils/db.server";

import styleUrl from "~/styles/login.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styleUrl }];
};

function validateUrl(url: string) {
  let urls = ["/jokes", "/"];
  if (urls.includes(url)) {
    return url;
  }
  return "/jokes";
}

function validateUsername(username: string) {
  if (username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

function validatePassword(password: string) {
  if (password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

export const action = async ({ request }: ActionArgs) => {
  const form = await request.formData();

  const loginType = form.get("loginType"); //  ? Register or login?
  const username = form.get("username");
  const password = form.get("password");
  const redirectTo = validateUrl(form.get("redirectTo") || "/jokes");

  const alphaExp = /^[a-zA-Z]+$/; // * Only string.

  if (
    !alphaExp.test(loginType) ||
    !alphaExp.test(username) ||
    !alphaExp.test(password) ||
    !alphaExp.test(redirectTo)
  ) {
    return badRequest({
      fieldErrors: null,
      fields: null,
      formError: `Form not submitted correctly.`,
    });
  }

  const fieldErrors = {
    username: validateUsername(username),
    password: validatePassword(password),
  };

  const fields = { loginType, username, password };

  if (Object.values(fieldErrors).some(Boolean)) {
    return badRequest({
      fieldErrors,
      fields,
      formError: null,
    });
  }

  switch (loginType) {
    case "login": {
      // TODO login to get the user
      // TODO if there's no user, return the fields and a formError
      // TODO if there is a user, create their session and redirect to /jokes
      return badRequest({
        fieldErrors: null,
        fields,
        formError: "Not implemented",
      });
    }
    case "register": {
      const userExist = await db.user.findFirst({ where: { username } });

      if (userExist) {
        return badRequest({
          fieldErrors: null,
          fields,
          formError: `User with username ${username} already exists`,
        });
      }

      // TODO create the user
      // TODO create their session and redirect to /jokes
      return badRequest({
        fieldErrors: null,
        fields,
        formError: "Not implemented",
      });
    }
    default: {
      return badRequest({
        fieldErrors: null,
        fields,
        formError: `Login type invalid`,
      });
    }
  }
};

export default function Login() {
  const [searchParams] = useSearchParams();
  const actionData = useActionData<typeof action>();

  return (
    <div className="container">
      <div className="content" data-light="">
        <h1>Login</h1>

        <form method="post">
          <input
            type="hidden"
            name="redirectTo"
            value={searchParams.get("redirectTo") ?? undefined}
          />

          <fieldset>
            <legend className="sr-only">Login or Register?</legend>

            <label>
              <input
                type="radio"
                name="loginType"
                value="login"
                defaultChecked={
                  !actionData?.fields?.loginType ||
                  actionData?.fields?.loginType === "login"
                }
              />
              Login
            </label>

            <label>
              <input
                type="radio"
                name="loginType"
                value="register"
                defaultChecked={actionData?.fields?.loginType === "register"}
              />
              Register
            </label>
          </fieldset>

          <div>
            <label htmlFor="username-input">Username</label>
            <input
              type="text"
              name="username"
              id="username-input"
              defaultValue={actionData?.fields?.username}
              aria-invalid={Boolean(actionData?.fieldErrors?.username)}
              aria-errormessage={
                actionData?.fieldErrors?.username ? "username-error" : undefined
              }
            />

            {actionData?.fieldErrors?.username ? (
              <p
                className="form-validation-error"
                role="alert"
                id="username-error"
              >
                {actionData.fieldErrors.username}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="password-input">Password</label>
            <input
              type="password"
              name="password"
              id="password-input"
              defaultValue={actionData?.fields?.password}
              aria-invalid={Boolean(actionData?.fieldErrors?.password)}
              aria-errormessage={
                actionData?.fieldErrors?.password ? "password-error" : undefined
              }
            />
            {actionData?.fieldErrors?.password ? (
              <p
                className="form-validation-error"
                role="alert"
                id="password-error"
              >
                {actionData.fieldErrors.password}
              </p>
            ) : null}
          </div>

          <div id="form-error-message">
            {actionData?.formError ? (
              <p className="form-validation-error" role="alert">
                {actionData.formError}
              </p>
            ) : null}
          </div>

          <button type="submit" className="button">
            Submit
          </button>
        </form>

        <div className="links">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/jokes">Jokes</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
