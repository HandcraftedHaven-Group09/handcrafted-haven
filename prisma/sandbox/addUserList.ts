import { PrismaClient, Product, Seller, Image } from '@prisma/client';
const prisma = new PrismaClient();

async function AddCollection() {
  const result = await prisma.userList.create({
    data: {
      name: 'Favorites',
      description: 'My favorite products. Check em out!',
      userId: 1,
      Products: {
        connect: [{ id: 3 }, { id: 6 }, { id: 13 }],
      },
    },
  });
  console.log('Created ', result);
}

console.log('Running AddCollection');
AddCollection();
