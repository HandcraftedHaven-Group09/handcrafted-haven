import { User } from 'prisma/prisma-client';
import { getUserById } from '@/app/lib/data';
import UserBio from '@/app/ui/users/user-bio';
import NavButtons from '@/app/ui/nav-buttons';
import { ButtonConfig } from '@/app/ui/nav-button';
import { notFound, redirect } from 'next/navigation';
import { auth } from '@/app/auth';

export default async function Page({ params }: { params: { id: string } }) {
  const session = await auth();
  //protect page
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
  if (!user) {
    console.log('User not found');
    notFound();
  } else {
    console.log('User Found');
  }

  const leftConfig = [] as ButtonConfig[];

  const rightConfig = [
    {
      text: 'Edit Account',
      href: `/users/${params.id}/edit`,
    },
    {
      text: 'Delete Account',
      href: `/users/${params.id}/delete`,
    },
  ] as ButtonConfig[];

  return (
    <div className="content">
      <h2>User Bio</h2>
      <UserBio userData={user}></UserBio>
      <NavButtons left={leftConfig} right={rightConfig}></NavButtons>
    </div>
  );
}
