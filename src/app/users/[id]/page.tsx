import { User } from 'prisma/prisma-client';
import { getUserById } from '@/app/lib/data';
import UserBio from '@/app/ui/users/user-bio';

export default async function Page({ params }: { params: { id: string } }) {
  const user = (await getUserById(Number(params.id))) as User;

  return (
    <>
      <UserBio userData={user}></UserBio>
    </>
  );
}
