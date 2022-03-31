import type {
  Connection,
  EntityManager,
  IDatabaseDriver,
} from "@mikro-orm/core";
import type { Request, Response } from "express";

export interface Context {
  em: EntityManager<IDatabaseDriver<Connection>>;
  req: Request;
  res: Response;
  userId: Request["session"]["userId"];
}

declare module "express-session" {
  interface SessionData {
    userId: number;
  }
}
