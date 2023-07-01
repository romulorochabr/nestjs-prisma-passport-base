// prisma/seed.ts

import { PrismaClient, Role } from '@prisma/client';

// initialize Prisma Client
const prisma = new PrismaClient();


async function main() {
  // create two dummy articles
  const user01 = await prisma.user.upsert({
    where: { email: 'romulo@romulo.com.br' },
    update: {},
    create: {
      name: 'romulo',
      email: 'romulo@romulo.com.br',
      password: 'romulo',
      cpf: "182.267.640-17",
      cnpj: null,
      celular: "48999495599",
      tel_fixo: null,
      role: Role.ADMIN
    },
  });

  const user02 = await prisma.user.upsert({
    where: { email: 'john@john.com.br' },
    update: {},
    create: {
      name: 'john',
      email: 'john@john.com.br',
      password: 'john',
      cpf: null,
      cnpj: "59.796.774/0001-13",
      celular: "48999495598",
      tel_fixo: "48999495597",
      role: Role.SUPPLIER
    },
  });

  const user03 = await prisma.user.upsert({
    where: { email: 'maria@maria.com.br' },
    update: {},
    create: {
      name: 'maria',
      email: 'maria@maria.com.br',
      password: 'maria',
      cpf: "515.220.010-42",
      cnpj: null,
      celular: "48999495596",
      tel_fixo: "48999495595",
      role: Role.USER
    },
  });

  console.log({ user01, user02, user03 });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });