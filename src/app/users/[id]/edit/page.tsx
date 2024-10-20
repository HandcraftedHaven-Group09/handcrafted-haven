import { User } from 'prisma/prisma-client';
import { getUserById } from '@/app/lib/data';
import UserEdit from '@/app/ui/users/user-edit';
import NavButtons from '@/app/ui/nav-buttons';
import { ButtonConfig } from '@/app/ui/nav-button';

export default async function Page({ params }: { params: { id: string } }) {
  params = await params;
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
      href: `/users/${params.id}/edit`,
    },
    {
      text: 'Delete',
      href: '/users',
    },
  ] as ButtonConfig[];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <UserEdit userData={user}></UserEdit>
      <NavButtons left={leftConfig} right={rightConfig}></NavButtons>
    </div>
  );
}
