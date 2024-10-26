import UserList from '@/app/ui/user-lists/user-list';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <UserList listId={params.id}></UserList>
    </>
  );
}
