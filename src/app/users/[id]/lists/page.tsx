import UserLists from '@/app/ui/users/user-lists';

export default async function Page({ params }: { params: { id: string } }) {
  return (
    <div className="content">
      <h2>Lists</h2>
      <UserLists id={Number(params.id)} />
    </div>
  );
}
