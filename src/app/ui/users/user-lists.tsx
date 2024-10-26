import { getUserWithListsById } from '@/app/lib/data';
import Link from 'next/link';
import UserList from '@/app/ui/users/user-list';
import './users.css';

export default async function UserLists({ id }: { id: number }) {
  const lists = await getUserWithListsById(id);

  return (
    <div className="user-lists">
      <ul>
        {lists?.UserList.map((list) => {
          return (
            <li>
              <UserList list={list} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
