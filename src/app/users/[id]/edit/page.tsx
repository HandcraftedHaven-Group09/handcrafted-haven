import { User } from 'prisma/prisma-client';
import { getUserById } from '@/app/lib/data';
import UserEdit from '@/app/ui/users/user-edit';
import NavButtons from '@/app/ui/nav-buttons';
import { ButtonConfig } from '@/app/ui/nav-button';

export default async function Page({ params }: { params: { id: string } }) {
  // params = await params;

  const user = (await getUserById(Number(params.id))) as User;

  return (
    <div className="content">
      <h2>Edit Bio</h2>
      <UserEdit userData={user}></UserEdit>
    </div>
  );
}
