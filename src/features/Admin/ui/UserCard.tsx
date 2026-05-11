import { roles } from "@/shared";
import { ReactElement } from "react";

interface Props {
  menu: ReactElement;
  name: string;
  surname: string;
  username: string;
  roleId: number;
}

export const UserCard = ({ menu, name, surname, username, roleId }: Props) => {
  return (
    <article className="shadow-card rounded-xl p-5 flex gap-5 h-full">
      <section className="flex flex-col gap-2 w-full">
        <h2 className="text-2xl font-bold text-accent-black">
          {`${name} ${surname}`}
        </h2>

        <section className="mt-auto">
          <p className="text-sm text-accent-black">
            Username:{" "}
            <span className="font-medium text-accent-black">{username}</span>
          </p>

          <p className="text-sm text-accent-black">
            Роль:{" "}
            <span className="font-medium text-accent-black">
              {roles[roleId]}
            </span>
          </p>
        </section>
      </section>

      {menu}
    </article>
  );
};
