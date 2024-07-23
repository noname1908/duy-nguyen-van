import { PrismaClient } from '@prisma/client';
import app from './app';

export const prisma = new PrismaClient();

async function main() {
  app.listen(3000);
}

main()
  .then(async () => {
    await prisma.$connect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
