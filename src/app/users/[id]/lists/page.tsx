import UserLists from '@/app/ui/users/user-lists';

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div id="user-content">
      <h2>Lists</h2>
      <UserLists id={Number(params.id)} />
    </div>
  );
}
