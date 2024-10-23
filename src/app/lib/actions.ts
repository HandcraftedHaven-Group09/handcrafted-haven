'use server';

import { put } from '@vercel/blob';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { createImage } from './data';
import { signIn } from 'next-auth/react';
import { AuthError } from 'next-auth';

// For creating a new image record with new image
const CreateImageFormSchema = z.object({
  id: z.string(),
  description: z.string(),
  ownerId: z.string(),
});

export type CreateImageState = {
  errors?: {
    description?: string[];
  };
  message?: string | null;
};

/**
 * Create a new image record with accompanying file
 * @param prevState
 * @param formData
 * @returns
 */
export async function postImage(
  prevState: CreateImageState,
  formData: FormData
): Promise<CreateImageState> {
  try {
    const imageFile = formData.get('imageFile') as File;
    const blob = await put(imageFile.name, imageFile, {
      access: 'public',
    });

    const description = formData.get('description')?.toString() || '';
    const ownerId = Number(formData.get('description')?.toString()) || 1;

    createImage({
      url: blob.url,
      description: description,
      ownerId: ownerId,
    });
    return {
      message: `Success: ${blob.downloadUrl} created`,
      errors: {},
    };
  } catch (error) {
    return { errors: {}, message: 'Error adding file' };
  }
}

// Fetch image by ID
export async function fetchImageById(id: number) {
  const image = await prisma.image.findUnique({
    where: { id },
  });
  return image;
}

// Upload Image to Blob Storage
export async function uploadImage(formData: FormData) {
  try {
    const imageFile = formData.get('file') as File;

    // Check if the file exists
    if (!imageFile) {
      throw new Error('No file found in form data');
    }

    // Upload image to Blob storage
    const blob = await put(imageFile.name, imageFile, {
      access: 'public',
    });

    return { url: blob.url }; // Return the uploaded image URL
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

// Fetch all sellers (limit 10)
export async function fetchSellerAll() {
  const sellers = await prisma.seller.findMany({
    take: 10,
  });
  console.log('Sellers@actions ', sellers);
  return sellers;
}

// Fetch all products
export async function fetchProductAll() {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      discountPercent: true,
      discountAbsolute: true,
      sellerId: true,
      category: true,
      image: {
        select: {
          url: true,
        },
      },
    },
  });

  return products;
}

// Create a new product in the database
export async function createNewProduct(productData: {
  name: string;
  description: string;
  price: number;
  category: string;
  discountPercent?: number;
  discountAbsolute?: number;
  sellerId: number;
  image: string;
}) {
  try {
    let discountAbsolute = productData.discountAbsolute;
    if (!discountAbsolute && productData.discountPercent) {
      discountAbsolute =
        (productData.price * productData.discountPercent) / 100;
    }

    // Create the new product with a single associated image
    const product = await prisma.product.create({
      data: {
        name: productData.name,
        description: productData.description,
        price: productData.price,
        category: productData.category,
        discountPercent: productData.discountPercent || 0,
        discountAbsolute: discountAbsolute || 0,
        seller: {
          connect: { id: productData.sellerId },
        },
        image: {
          create: {
            url: productData.image,
            description: productData.name,
          },
        },
      },
    });

    return product;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
}

// Handle authentication
export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  'use client';
  console.log('FORM DATA: ', formData.get('email'));
  const email = formData.get('email');
  const password = formData.get('password');
  try {
    console.log('Trying to login');
    const result = await signIn('credentials', {
      redirect: true,
      email: email,
      password: password,
      callbackUrl: 'http://www.google.com',
    });
    console.log('Imediate post login');
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

// Listing products category
export async function fetchCategories() {
  const categories = await prisma.product.findMany({
    select: {
      category: true,
    },
    distinct: ['category'], 
  });

  return categories;
}

// Function to search product by ID
export async function fetchProductById(id: string) {

  const numericId = parseInt(id, 10)

  if (isNaN(numericId)) {
    throw new Error(`Invalid product ID: ${id}`)
  }

  const product = await prisma.product.findUnique({
    where: { id: numericId }, 
    include: { image: true }, 
  })

  if (!product) {
    throw new Error(`Product with ID ${numericId} not found.`)
  }

  return product
}


// Function to update the product
export async function updateProduct(id: string, productData: any) {
  const productId = parseInt(id) 

  // Search for existing product
  const existingProduct = await prisma.product.findUnique({
    where: { id: productId },
    include: { image: true },
  })

  if (!existingProduct) {
    throw new Error(`Produto com ID ${productId} não encontrado.`)
  }

  // If no new image is sent, keep the existing image
  const imageUrl = productData.image || existingProduct.image?.url

  // Se a URL da imagem for undefined, remova o campo image do objeto de dados
  const imageUpdate = imageUrl
    ? {
        upsert: {
          create: {
            url: imageUrl,
            description: productData.name,
          },
          update: {
            url: imageUrl,
          },
          where: {
            id: existingProduct.image?.id, 
          },
        },
      }
    : undefined // Remove image if there is no valid URL

  const updatedProduct = await prisma.product.update({
    where: { id: productId },
    data: {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      discountPercent: productData.discountPercent,
      category: productData.category,
      ...(imageUpdate && { image: imageUpdate }), // Updates the image only if there is URL
    },
  })

  return updatedProduct
}





