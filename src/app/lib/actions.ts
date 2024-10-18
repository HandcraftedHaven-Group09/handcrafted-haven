'use server';

import { signIn } from '@/auth';
import { put } from '@vercel/blob';
import { number, z } from 'zod';
import {
  getSellersAll,
  getProductsAll,
  createImage,
  getImageById,
} from './data';

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

export async function fetchSellerAll() {
  const sellers = await getSellersAll(10);
  console.log('Sellers@actions ', sellers);
  return sellers;
}

export async function fetchProductAll() {
  return await getProductsAll(10);
}

export async function fetchImageById(id: number) {
  //TODO: Fallback to a default image
  return await getImageById(id);
}
