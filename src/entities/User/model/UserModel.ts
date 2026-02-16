import { User, UserDTO } from "./types";

export class UserModel {
  public static findUserById(users: User[], id: number): User | undefined {
    return users.find((user) => user.userId === id);
  }

  public static filteredUsers(
    users: User[],
    searchInput: string,
    currentUserId: number,
  ) {
    const usersNotCurrentUser = users.filter(
      (user) => user.userId !== currentUserId,
    );

    return usersNotCurrentUser.filter((user) => {
      if (searchInput === "") {
        return true;
      }

      const matchUser =
        user.name &&
        `${user.name} ${user.surname}`
          .toLowerCase()
          .includes(searchInput.toLowerCase());

      const matchUsername = user.username
        .toLowerCase()
        .includes(searchInput.toLowerCase());

      return matchUser || matchUsername;
    });
  }
  public static mapDtoToUsers(users: UserDTO[]): User[] {
    return users.map((user) => ({
      ...user,
      roleId: user.role_id,
      userId: user.user_id,
    }));
  }

  public static mapDtoToUser(user: UserDTO): User {
    return {
      ...user,
      roleId: user.role_id,
      userId: user.user_id,
    };
  }
}
