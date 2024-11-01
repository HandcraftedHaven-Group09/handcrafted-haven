import { deleteUser } from '@/app/lib/data';
import '@/app/ui/nav-buttons.css';
import '@/app/ui/users/users.css';
import { auth } from '@/app/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();

  if (session?.user.id) {
    if (params.id != session?.user.id) {
      console.log('user: ', session?.user.id);
      redirect(`/users/${session?.user.id}`);
    }
  } else {
    redirect('/users/login');
  }

  return (
    <div className="content">
      <h2>Delete User?</h2>
      <Link href={`/users/${session.user.id}/delete/confirm`}>Yes</Link>/
      <Link href={`/users/${session.user.id}`}>Cancel</Link>
    </div>
  );
}
