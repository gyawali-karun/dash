import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import { fetchUsers } from "./userApi";

vi.mock("axios");

describe("fetchUsers", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return users when API succeeds", async () => {
    const mockUsers = [
      { id: 1, name: "John Doe", email: "john@test.com" },
      { id: 2, name: "Jane Doe", email: "jane@test.com" },
    ];

    (axios.get as any).mockResolvedValue({ data: mockUsers });

    const result = await fetchUsers(1, 10);

    expect(result).toEqual(mockUsers);
    expect(axios.get).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/users",
      {
        timeout: 7000,
        params: { _page: 1, _limit: 10 },
      }
    );
  });

  it("should throw API error when server responds with error", async () => {
    (axios.get as any).mockRejectedValue({
      response: { status: 500, statusText: "Server Error" },
    });

    await expect(fetchUsers(1, 10)).rejects.toThrow(
      "API Error: 500 Server Error"
    );
  });

  it("should throw network error when request fails", async () => {
    (axios.get as any).mockRejectedValue({ request: {} });

    await expect(fetchUsers(1, 10)).rejects.toThrow(
      "Network error: unable to reach API"
    );
  });

  it("should throw unknown error", async () => {
    (axios.get as any).mockRejectedValue(new Error("Something broke"));

    await expect(fetchUsers(1, 10)).rejects.toThrow("Something broke");
  });
});
