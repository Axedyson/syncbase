import Link from "next/link";
import { useMutation } from "urql";
import { Button } from "../components/ui/Button";
import { urqlClientWrapper } from "../graphql/client";
import { LogoutUserDocument } from "../graphql/hooks";
import { useCurrentUser } from "../hooks/useCurrentUser";
import type { NextPage } from "next";

const AccountPage: NextPage = () => {
  const [, logoutUser] = useMutation(LogoutUserDocument);
  const [fetching, user] = useCurrentUser(true);

  if (fetching) {
    return (
      <div className="flex gap-2 p-2 m-auto rounded-md border-2 border-slate-400">
        <p>Loading state indicator</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2 p-2 m-auto rounded-md border-2 border-slate-400">
      <Link href="/">
        <a className="text-blue-600 underline">Index page</a>
      </Link>
      {user && (
        <>
          <h2>This is the account page and you`re logged in</h2>
          <p>id: {user.id}</p>
          <p>username: {user.name}</p>
          <p>email: {user.email}</p>
          <Button
            onClick={async () => {
              await logoutUser();
            }}
            label="Logout"
          />
        </>
      )}
    </div>
  );
};

export default urqlClientWrapper(AccountPage);
