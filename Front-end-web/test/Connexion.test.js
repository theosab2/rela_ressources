import { login } from "../pages/login/login";

describe("login function", () => {
  it("should return false when user | password is wrong", async () => {
    const data = await login("co", "coui");
    expect(data).toBe(false);
  });
});
