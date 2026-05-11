import { useEffect, useState } from "react";
import { useAuth } from "@/shared/lib";
import { DeleteModalWrapper, List, Menu } from "@/shared";
import { useUserTab } from "../model";
import { EditUserModal } from "./EditUserModal";
import { User } from "@/entities";
import { LuPencil, LuTrash } from "react-icons/lu";
import { useSearchParams } from "next/navigation";
import { UserCard } from "./UserCard";

export const UsersTab = () => {
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(() => searchParams.get("search") ?? "");

  const [findUser, setFindUser] = useState<User | null>(null);

  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const urlSearch = searchParams.get("search") ?? "";

    setSearch(urlSearch);
  }, [searchParams]);

  const {
    deleteUser,
    filteredUsers,
    closeDeleteModal,
    openDeleteModal,
    isOpenDeleteModal,
    findUserById,
    updateUser,
  } = useUserTab(search, user?.userId);

  return (
    <>
      <main className="bg-white w-full pt-5 px-5 md:px-10 pb-10 rounded-2xl">
        <List
          keyExtractor={(user) => user.userId}
          entity={filteredUsers}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          renderCard={(user) => (
            <UserCard
              {...user}
              menu={
                <Menu
                  items={[
                    {
                      label: "Редактировать",
                      onClick: () => {
                        setFindUser(findUserById(user.userId));
                        setIsOpenEdit(true);
                      },
                      icon: <LuPencil />,
                    },
                    {
                      label: "Удалить",
                      onClick: () => openDeleteModal(user.userId),
                      variant: "danger",
                      icon: <LuTrash />,
                    },
                  ]}
                />
              }
            />
          )}
        />
      </main>

      {findUser && (
        <EditUserModal
          isOpen={isOpenEdit}
          onClose={() => setIsOpenEdit(false)}
          user={findUser}
          onUpdate={updateUser}
        />
      )}

      <DeleteModalWrapper
        isOpen={isOpenDeleteModal}
        onClose={closeDeleteModal}
        onDelete={deleteUser}
      />
    </>
  );
};
