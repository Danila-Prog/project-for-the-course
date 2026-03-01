import { useState } from "react";
import { ROLES, useAuth } from "@/shared/lib";
import { DeleteModalWrapper, List, SearchInput } from "@/shared";
import { useUserTab } from "../model";
import { EditUserModal } from "./EditUserModal";
import { User } from "@/entities";

export const UsersTab = () => {
  const [searchInput, setSearchInput] = useState("");
  const [findUser, setFindUser] = useState<User | null>(null);

  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const { user } = useAuth();

  const {
    deleteUser,
    filteredUsers,
    closeDeleteModal,
    openDeleteModal,
    isOpenDeleteModal,
    findUserById,
    updateUser,
  } = useUserTab(searchInput, user?.userId);

  return (
    <>
      <main className="bg-white w-full pt-5 px-5 md:px-10 pb-10 rounded-xl">
        <SearchInput
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Введите фио или username"
        />

        <List
          keyExtractor={(user) => user.userId}
          entity={filteredUsers}
          className="flex flex-col gap-6"
          renderCard={(user) => (
            <article className="shadow-card rounded-xl p-5">
              <h2 className="text-[25px] font-bold">
                {user?.name} {user?.surname}
              </h2>

              <span className="block">Username: {user?.username}</span>

              <span className="block">Роль: {ROLES[user?.roleId]}</span>

              <footer className="flex gap-1 min-[433px]:gap-3 flex-wrap mt-3">
                <button
                  className="py-2 px-4 rounded-xl bg-orange-700 transition hover:bg-orange-800 text-white text-[17px] font-medium disabled:opacity-50 disabled:hover:bg-orange-700"
                  onClick={() => {
                    setFindUser(findUserById(user.userId));
                    setIsOpenEdit(true);
                  }}
                >
                  Редактировать
                </button>

                <button
                  className="py-2 px-4 rounded-xl bg-red-700 transition hover:bg-red-800 text-white text-[17px] font-medium disabled:opacity-50 disabled:hover:bg-red-700"
                  onClick={() => openDeleteModal(user.userId)}
                >
                  Удалить
                </button>
              </footer>
            </article>
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
