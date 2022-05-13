import { Seeder } from "@mikro-orm/seeder";
import argon2 from "argon2";
import { User } from "../entities/User";
import type { EntityManager } from "@mikro-orm/core";

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const hashedPassword = await argon2.hash("1234567", {
      type: argon2.argon2id,
    });

    em.create(User, {
      name: "Tony",
      email: "Tony@ironsuits.com",
      password: hashedPassword,
    });
  }
}
