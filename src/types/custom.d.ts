// Type declarations to help TypeScript/VS Code resolve project JS modules
// that don't have their own type definitions yet.

declare module "@/schema/user" {
  // Minimal shape used by the project: a `userSchema` with `safeParse`.
  export const userSchema: {
    safeParse(input: unknown): { success: boolean; data?: any; error?: any };
  };
  export default userSchema;
}

declare module "@/lib/prisma" {
  import { PrismaClient } from "@prisma/client";
  const prisma: PrismaClient;
  export default prisma;
}
