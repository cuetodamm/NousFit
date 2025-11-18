"use server";

import prisma from "@/lib/prisma";
import { userSchema } from "@/schema/user";

export async function createOrUpdateClient(data: unknown) {
  // Use the project's `userSchema` shim (or replace with a real `clientSchema`
  // if you add one). There is no `client` model in Prisma; the user model is
  // `Usuario`, so use that Prisma model to create/update records.
  const parsedData = userSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      ok: false,
      message: "Información de Cliente inválida",
    };
  }

  try {
    const payload = parsedData.data as Record<string, any>;

    if (payload.id) {
      await prisma.usuario.update({ where: { id: payload.id }, data: payload as any });
      return { ok: true, message: `Cliente actualizado exitosamente` };
    }

    await prisma.usuario.create({ data: payload as any });
    return { ok: true, message: `Cliente creado exitosamente` };
  } catch (error) {
    console.log(error);
    return { ok: false, message: `Error al crear/actualizar Cliente` };
  }
}











