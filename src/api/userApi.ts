import axios from "axios";
import type { User } from "@/types/user";

const BASE = "https://jsonplaceholder.typicode.com";

export async function fetchUsers(page: number, limit: number): Promise<User[]> {
  console.log(page);
  try {
    const res = await axios.get<User[]>(`${BASE}/users`, {
      timeout: 7000,
      params: {
        _page: page,
        _limit: limit,
      },
    });
    return res.data;
  } catch (err: any) {
    if (err.response) {
      throw new Error(
        `API Error: ${err.response.status} ${err.response.statusText}`
      );
    } else if (err.request) {
      throw new Error("Network error: unable to reach API");
    } else {
      throw new Error(err.message || "Unknown error");
    }
  }
}
