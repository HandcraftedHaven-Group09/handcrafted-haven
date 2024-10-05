import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
  });
}
export async function getProductById(productId: number) {
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
    },
  });
}
export async function getProductsAll(max?: number) {
  const products = await prisma.product.findMany({
    take: max,
  });
  return products;
}
