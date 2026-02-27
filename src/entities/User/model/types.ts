import { ApiResponse, RequestConfig } from "@/shared/api/httpClient";

export interface UserDTO {
  username: string;
  password: string;
  user_id: number;
  role_id: number;
  name: string;
  surname: string;
  email: string;
}

export interface User extends Omit<UserDTO, "user_id" | "role_id"> {
  userId: number;
  roleId: number;
}

export interface UserRepository {
  getUsers: () => ApiResponse<UserDTO[]>;
  getUserById: (id: number) => ApiResponse<UserDTO>;
  createUser: (
    config: RequestConfig<Omit<UserDTO, "user_id">>,
  ) => ApiResponse<UserDTO>;
  updateUser: (
    id: number,
    config: RequestConfig<{ updates: Omit<User, "userId"> }>,
  ) => ApiResponse<UserDTO>;

  deleteUser: (id: number) => ApiResponse<UserDTO>;
}
