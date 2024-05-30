// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
 
(async function main() {
  try {
    const martinFowler = await prisma.respondentBasicData.upsert({
      where: { id: 'google-q3q31' },
      update: {},
      create: {
        id: 'google-q3q31',
        firstName: 'Martin',
        lastName: 'Fowler',
      },
    });
 
    console.log('Create 1 respondentBasicData: ', martinFowler);
  } catch(e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
