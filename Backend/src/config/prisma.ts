import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { logger } from "../utils/logger";

const prismaClientSingleton = () => {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "warn", "error"]
        : ["error"],
  }).$extends(withAccelerate());
};

// Prevent multiple instances during hot-reload in development
declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prisma;
}

export { prisma };

export async function disconnectPrisma(): Promise<void> {
  logger.info("Disconnecting Prisma client...");
  await (prisma as unknown as PrismaClient).$disconnect();
}
