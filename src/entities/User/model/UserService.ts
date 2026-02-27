import { User, UserDTO, UserRepository } from "./types";
import { UserModel } from "./UserModel";

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  public async getUsers() {
    const { data } = await this.repository.getUsers();

    return UserModel.mapDtoToUsers(data);
  }

  public async getUserById(id: number) {
    const { data } = await this.repository.getUserById(id);

    return UserModel.mapDtoToUser(data);
  }

  public async createUser(payload: Omit<UserDTO, "user_id">) {
    await this.repository.createUser({ payload });
  }
  public async updateUser(id: number, updates: Omit<User, "userId">) {
    await this.repository.updateUser(id, { payload: { updates: updates } });
  }
  public async deleteUser(id: number) {
    await this.repository.deleteUser(id);
  }

  public findUserById(users: User[], id: number) {
    const user = UserModel.findUserById(users, id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  public filteredUsers(
    users: User[],
    searchInput: string,
    currentUserId: number,
  ) {
    return UserModel.filteredUsers(users, searchInput, currentUserId);
  }
}
