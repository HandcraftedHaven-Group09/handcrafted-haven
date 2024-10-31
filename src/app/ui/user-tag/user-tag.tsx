'use client';
import './user-tag.css';
import Link from 'next/link';

export default function UserTag({ userId }: { userId: string }) {
  //   const user = fetchUserById();

  return (
    <div className="user-tag">
      <Link href={`/users/${userId}`}>USER</Link>
    </div>
  );
}
