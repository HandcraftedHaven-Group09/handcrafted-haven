'use client';
import { removeUser } from '@/app/lib/actions';
import '@/app/ui/nav-buttons.css';
import '@/app/ui/users/users.css';
import { auth } from '@/app/auth';

import { redirect } from 'next/navigation';
import Link from 'next/link';
// import { signOut } from ''@/app/auth';'
import { signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default async function Page({ params }: { params: { id: string } }) {
  const session = await useSession();

  console.log('SEsssion:', session);
  if (session.data?.user.id) {
    removeUser(session.data.user.id);
  }
  //   await signOut();

  return (
    <div className="content">
      <h2>User Deleted</h2>
      <p>We hope you will give us another try!</p>
      <Link href={`/`}>Home</Link>
    </div>
  );
}
