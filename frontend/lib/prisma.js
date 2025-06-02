import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
    datasources: {
    db: {
      url: process.env.DATABASE_URL= "postgresql://root:root@localhost:5432/NousFit?schema=public" //Direccionamos la URL de la base de datos para un funcionamiento correcto
    },
  },
});


export default prisma;