import { prismaClient } from "../application/database";

export class UserTest {
  static async delete() {
    const user = await prismaClient.user.deleteMany({
      where: { username: "test" },
    });
  }
}
