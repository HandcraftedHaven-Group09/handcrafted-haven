import { PrismaClient, Product, Seller, Image } from '@prisma/client';
import { list } from '@vercel/blob';
const prisma = new PrismaClient();

export async function getUserById(userId: number) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });
  return user;
}

export async function getUserWithListsById(userId: number) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      UserList: {
        include: {
          Products: true,
        },
      },
    },
  });
  return user;
}

export async function getUserByEmail(userEmail: string) {
  const user = await prisma.user.findFirst({
    where: {
      email: userEmail,
    },
  });
  return user;
}

export async function getSellerByEmail(sellerEmail: string) {
  const seller = await prisma.seller.findFirst({
    where: {
      email: sellerEmail,
    },
  });
  return seller;
}

export async function getProductsBySimpleQuery(query: string, max: number) {
  const products = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
          },
        },
        {
          description: {
            contains: query,
          },
        },
      ],
    },
    take: max,
  });
  return products;
}

export async function getProductById(productId: number) {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
    },
  });
  return product;
}

export async function getProductWithImageById(productId: number) {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
    },
    include: {
      image: true,
    },
  });
  return product;
}

export async function getProductsAll(max?: number): Promise<Product[]> {
  const products = await prisma.product.findMany({
    take: max,
  });
  return products;
}

// Seller Crud
export async function getSellersBySimpleQuery(query: string, max: number) {
  const sellers = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
          },
        },
        {
          description: {
            contains: query,
          },
        },
      ],
    },
    take: max,
  });
  return sellers;
}

export async function getSellersById(productId: number) {
  const sellers = await prisma.seller.findFirst({
    where: {
      id: productId,
    },
  });
  return sellers;
}
export async function getSellersAll(max?: number) {
  console.log('GET SELLERS@data');

  const sellers = await prisma.seller.findMany({
    take: max,
  });

  console.log('sellers@data ', sellers, 'max ', max);
  return sellers;
}

export async function getImageById(imageId: number) {
  const image = await prisma.image.findFirst({
    where: {
      id: imageId,
    },
  });
  return image;
}

export async function createImage(imageData: {
  url: string;
  description: string;
  ownerId: number;
}) {
  const result = await prisma.image.create({
    data: {
      url: imageData.url,
      description: imageData.description,
      ownerId: imageData.ownerId,
    },
  });
  console.log('Wrote', imageData.url);
  return result;
}

export async function getUserListById(listId: number) {
  const result = await prisma.userList.findFirst({
    where: { id: listId },
    include: { Products: true },
  });
  return result;
}

export async function productRowCount() {
  const rowCount = await prisma.product.count();
  return rowCount;
}
