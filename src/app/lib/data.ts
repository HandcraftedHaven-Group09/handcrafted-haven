import { PrismaClient, Product } from '@prisma/client';
import { put } from '@vercel/blob';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

export async function createUser({
  email,
  password,
  displayName,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  displayName: string;
  firstName: string;
  lastName: string;
}) {
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        displayName: displayName,
        credential: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        userId: 'Credentials',
        profilePictureId: 1,
      },
    });
    user.credential = password; // need the unhashed one to sign in
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}
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

export async function createSeller({
  email,
  password,
  displayName,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  displayName: string;
  firstName: string;
  lastName: string;
}) {
  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    const seller = await prisma.seller.create({
      data: {
        email: email,
        displayName: displayName,
        password: hashedPassword,
        firstName: firstName,
        lastName: lastName,
        // userId: 'Credentials',
        profilePictureId: 1,
      },
    });
    seller.password = password; // need the unhashed one to sign in
    return seller;
  } catch (error) {
    console.error(error);
    return null;
  }
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

export async function getSellerById(productId: number) {
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

export async function getListsByUser(userId: number) {
  const lists = await prisma.userList.findMany({
    where: { userId: userId },
  });
  return lists;
}

export async function addToUserList(productId: number, listId: number) {
  const result = await prisma.userList.update({
    where: {
      id: listId,
    },
    data: {
      Products: {
        connect: {
          id: productId,
        },
      },
    },
  });

  return result;
}

export type UpdateUserData = {
  displayName: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  bio: string | undefined;
  profilePictureFile: File | undefined;
};

export async function updateUserById(userId: number, userData: UpdateUserData) {
  let blobData;

  const prismaData: {
    displayName: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    bio: string | undefined;
    profilePicture:
      | {
          create: {
            url: string;
            description: string;
          };
        }
      | undefined;
  } = {
    displayName: userData.displayName,
    firstName: userData.firstName,
    lastName: userData.lastName,
    bio: userData.bio,
    profilePicture: undefined,
  };

  if (
    userData.profilePictureFile?.size &&
    userData.profilePictureFile?.size > 0
  ) {
    // If a file was sent for the profile picture
    blobData = await put(
      `/profilePictures/${userData.profilePictureFile.name}`,
      userData.profilePictureFile,
      {
        access: 'public',
      }
    );

    // Add the new profile pic to the update query
    prismaData.profilePicture = {
      create: {
        url: blobData.url,
        description: `A picture of ${prismaData.displayName}`,
      },
    };
  } else {
    console.log('No profile file to update');
  }
  const result = await prisma.user.update({
    where: {
      id: userId,
    },
    // data: prismaData,
    data: prismaData,
    include: {
      profilePicture: true,
    },
  });
  return result;
}

export async function deleteUser(userId: number) {
  console.log('In data', userId);
  const result = await prisma.user.delete({ where: { id: userId } });
  console.log('RESULTS', result);
}

export async function getReviewsByProductId(productId: number) {
  const ratings = await prisma.review.findMany({
    where: {
      productId: productId,
    },
  });
  return ratings;
}
