'use server';
import { getImageById, getSellerById, getUserById } from '@/app/lib/data';
import './user-tag.css';
import Link from 'next/link';
import Image from 'next/image';

export default async function UserTag({
  userId,
  isSeller,
}: {
  userId: string;
  isSeller: boolean;
}) {
  let user, image;

  if (!isSeller) {
    user = await getUserById(Number(userId));
    image = await getImageById(user?.profilePictureId || 1);
  } else {
    user = await getSellerById(Number(userId));
    image = await getImageById(user?.profilePictureId || 1);
  }
  // const image = { url: '/ui/default-user.webp', description: 'Image' };

  return (
    <div
      className="user-tag"
      style={isSeller ? { border: '2px solid yellow' } : undefined}
    >
      <Link href={isSeller ? `/sellers` : `/users/${userId}`}>
        <Image
          src={image?.url || '/default-user.webp'}
          alt={image?.description || 'A user'}
          width={100}
          height={100}
        />
      </Link>
    </div>
  );
}
