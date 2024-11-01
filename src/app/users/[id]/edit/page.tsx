import { User } from 'prisma/prisma-client';
import { getUserById } from '@/app/lib/data';
import UserEdit from '@/app/ui/users/user-edit';
import NavButtons from '@/app/ui/nav-buttons';
import { ButtonConfig } from '@/app/ui/nav-button';
import { auth } from '@/app/auth';
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  // params = await params;
  const session = await auth();
  if (session?.user.role == 'seller') {
    redirect('/sellers');
  }

  if (session?.user.id) {
    if (params.id != session?.user.id) {
      console.log('user: ', session?.user.id);
      redirect(`/users/${session?.user.id}`);
    }
  } else {
    redirect('/users/login');
  }

  const user = (await getUserById(Number(params.id))) as User;

  return (
    <div className="content">
      <h2>Edit Bio</h2>
      <UserEdit userData={user}></UserEdit>
    </div>
  );
}
