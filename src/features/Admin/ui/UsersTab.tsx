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
      <main className="bg-white w-full pt-[20px] px-[40px] pb-[40px] rounded-[10px]">
        <SearchInput
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Введите имя, фамилию или username пользователя"
        />

        <List
          idKey="userId"
          entity={filteredUsers}
          className="flex flex-col gap-6"
          renderCard={(user) => (
            <article className="shadow-card rounded-xl p-5">
              <h2 className="text-[25px] font-bold">
                Пользователь: {user?.name} {user?.surname}
              </h2>

              <span className="block">Username: {user?.username}</span>

              <span className="block">
                Роль пользователя: {ROLES[user?.roleId]}
              </span>

              <footer className="flex gap-3">
                <button
                  className="h-[43px] px-[16px] rounded-[25px] bg-orange-700 transition hover:bg-orange-800 text-white text-[17px] font-medium mt-[12px] disabled:opacity-50 disabled:hover:bg-orange-700"
                  onClick={() => {
                    setFindUser(findUserById(user.userId));
                    setIsOpenEdit(true);
                  }}
                >
                  Редактировать пользователя
                </button>

                <button
                  className="h-[43px] px-[16px] rounded-[25px] bg-red-700 transition hover:bg-red-800 text-white text-[17px] font-medium mt-[12px] disabled:opacity-50 disabled:hover:bg-red-700"
                  onClick={() => openDeleteModal(user.userId)}
                >
                  Удалить пользователя
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
