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