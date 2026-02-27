import {
  ApiResponse,
  httpClient,
  RequestConfig,
} from "@/shared/api/httpClient";
import { User, UserDTO, UserRepository } from "./types";

export class UserApi implements UserRepository {
  private readonly ENDPOINT = "users";

  getUsers() {
    return httpClient.get<UserDTO[]>(this.ENDPOINT);
  }

  getUserById(id: number) {
    return httpClient.get<UserDTO>(`${this.ENDPOINT}/${id}`);
  }

  createUser({
    payload,
  }: RequestConfig<Omit<UserDTO, "user_id">>): ApiResponse<UserDTO> {
    return httpClient.post<UserDTO>(this.ENDPOINT, payload);
  }

  updateUser(
    id: number,
    { payload }: RequestConfig<{ updates: Omit<User, "userId"> }>,
  ): ApiResponse<UserDTO> {
    return httpClient.patch<UserDTO>(`${this.ENDPOINT}/${id}`, payload);
  }

  deleteUser(id: number): ApiResponse<UserDTO> {
    return httpClient.delete(`${this.ENDPOINT}/${id}`);
  }
}
