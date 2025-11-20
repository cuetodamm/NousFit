// Minimal schema shim for `userSchema.safeParse` used by action helpers.
// The project doesn't currently include Zod as a dependency, and several
// action files import `@/schema/user`. This small helper provides a
// lightweight `safeParse` compatible shape so the rest of the code can
// perform runtime validation without introducing an external dependency.

export const userSchema = {
  safeParse(input: unknown) {
    if (!input || typeof input !== "object") {
      return { success: false, error: { message: "Not an object" } };
    }

    const obj = input as Record<string, any>;

    // Basic checks matching Prisma model fields - expand as needed later.
    if (!obj.nombre || !obj.correo) {
      return { success: false, error: { message: "Missing required fields" } };
    }

    return { success: true, data: obj };
  },
};

export default userSchema;
