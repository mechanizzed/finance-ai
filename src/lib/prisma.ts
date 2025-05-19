import { PrismaClient } from "../../_app_prisma/generated/prisma/client";

const prisma = new PrismaClient();

export const db = prisma;
