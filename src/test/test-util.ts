import { User } from "@prisma/client";
import { prismaClient } from "../application/database";
import bcrypt from "bcrypt";

export class ContactTest {
  static async deleteAll() {
    await prismaClient.contact.deleteMany({
      where: {
        username: "test",
      },
    });
  }
}

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

  static async get(): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        username: "test",
      },
    });

    if (!user) {
      throw new Error("User is not found");
    }

    return user;
  }
}
