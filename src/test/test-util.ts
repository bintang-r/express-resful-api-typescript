import { prismaClient } from "../application/database";
import bcrypt from "bcrypt";

export class UserTest {
  static async delete() {
    const user = await prismaClient.user.deleteMany({
      where: { username: "test" },
    });
  }

  static async create() {
    const user = await prismaClient.user.create({
      data: {
        username: "test",
        name: "test",
        password: await bcrypt.hash("test", 10),
        token: "test",
      },
    });
  }
}
