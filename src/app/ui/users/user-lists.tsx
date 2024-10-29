import { getUserWithListsById } from '@/app/lib/data';
import UserList from '@/app/ui/users/user-list';
import './users.css';

export default async function UserLists({ id }: { id: number }) {
  const lists = await getUserWithListsById(id);

  return (
    <div className="user-lists">
      <ul>
        {lists?.UserList.map((list) => {
          return (
            <li key={list.id}>
              <UserList key={list.id} list={list} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
