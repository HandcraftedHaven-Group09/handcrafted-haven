import { User } from 'prisma/prisma-client';
import { getUserById } from '@/app/lib/data';
import UserBio from '@/app/ui/users/user-bio';
import NavButtons from '@/app/ui/nav-buttons';
import { ButtonConfig } from '@/app/ui/nav-button';

export default async function Page({ params }: { params: { id: string } }) {
  const user = (await getUserById(Number(params.id))) as User;
  const leftConfig = [
    {
      text: 'Back',
      href: '/users',
    },
  ] as ButtonConfig[];

  const rightConfig = [
    {
      text: 'Edit',
      href: '/users',
    },
    {
      text: 'Delete',
      href: '/users',
    },
  ] as ButtonConfig[];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <UserBio userData={user}></UserBio>
      <NavButtons left={leftConfig} right={rightConfig}></NavButtons>
    </div>
  );
}