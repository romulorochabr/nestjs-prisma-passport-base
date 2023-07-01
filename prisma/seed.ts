// prisma/seed.ts

import { PrismaClient, Role } from '@prisma/client';

import * as bcrypt from 'bcrypt';
const saltOrRounds = 10;
// initialize Prisma Client
const prisma = new PrismaClient();


async function main() {
  // create two dummy articles

  const hashPass =  await bcrypt.hash("RomuloRocha@10", saltOrRounds);

  const user01 = await prisma.user.upsert({
    where: { email: 'romulo@romulo.com.br' },
    update: {},
    create: {
      name: 'romulo',
      email: 'romulo@romulo.com.br',
      password: hashPass,
      cpfCnpj: "182.267.640-17",
      mobile: "48999495599",
      landline: null,
      role: Role.ADMIN
    },
  });

  const user02 = await prisma.user.upsert({
    where: { email: 'john@john.com.br' },
    update: {},
    create: {
      name: 'john',
      email: 'john@john.com.br',
      password: hashPass,
      cpfCnpj: "59.796.774/0001-13",
      mobile: "48999495599",
      landline: null,
      role: Role.SUPPLIER
    },
  });

  const user03 = await prisma.user.upsert({
    where: { email: 'maria@maria.com.br' },
    update: {},
    create: {
      name: 'maria',
      email: 'maria@maria.com.br',
      password: hashPass,
      cpfCnpj: "515.220.010-42",
      mobile: "48999495599",
      landline: null,
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