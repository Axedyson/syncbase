import { LoginDialog } from "../components/LoginDialog";
import { urqlClientWrapper } from "../graphql/client";
import { useUsersQuery } from "../graphql/hooks";
import type { FC } from "react";

const IndexPage: FC = () => {
  const [result] = useUsersQuery();

  return (
    <div className="m-auto w-3/12">
      <h3>Here we have some usernames:</h3>
      {result.data?.users.map((user) => (
        <p key={user.email}>{user.name}</p>
      ))}
      <LoginDialog />
    </div>
  );
};

export default urqlClientWrapper(IndexPage);
