'use server';
import { getImageById, getUserById } from '@/app/lib/data';
import './user-tag.css';
import Link from 'next/link';
import Image from 'next/image';

export default async function UserTag({ userId }: { userId: string }) {
  const user = await getUserById(Number(userId));
  const image = await getImageById(user?.profilePictureId || 1);
  // const image = { url: '/ui/default-user.webp', description: 'Image' };

  return (
    <div className="user-tag">
      <Link href={`/users/${userId}`}>
        {/* <div>USER</div> */}
        <Image
          src={image?.url || '/default-user.webp'}
          alt={image?.description || 'A user'}
          width={100}
          height={100}
        />
      </Link>
    </div>
  );
  // return <div>DOOD</div>;
}
