'use server';

import { put } from '@vercel/blob';
import { number, z } from 'zod';
import {
  getSellersAll,
  getProductsAll,
  createImage,
  getImageById,
} from './data';
import { PrismaClient, Product, Seller, Image } from '@prisma/client';
const prisma = new PrismaClient();
import { signIn } from '@/app/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

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
      message: `Success: ${blob.downloadUrl} create`,
      errors: {},
    };
  } catch (error) {
    return { errors: {}, message: 'Error adding file' };
  }
}

export async function fetchImageById(id: number) {
  const image = await getImageById(id);
  return image;
}

export async function fetchSellerAll() {
  const sellers = await getSellersAll(10);
  console.log('Sellers@actions ', sellers);
  return sellers;
}

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
      // image: true,
      image: {
        select: {
          url: true, // Obtém a URL da imagem
        },
      },
    },
  });

  return products;
}

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
