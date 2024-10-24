import { getUserListById } from '@/app/lib/data';
import '@/app/ui/user-lists/user-list.css';
import Link from 'next/link';

export default async function UserList({ listId }: { listId: string }) {
  // Get user list
  const userList = await getUserListById(Number(listId));

  console.log(userList?.Products);
  return (
    <div className="user-list">
      <h3>{userList?.name}</h3>
      <p>{userList?.description}</p>
      <ul>
        {userList?.Products.map((product) => {
          return (
            <li key={product.id}>
              <Link href="/">
                <h4>{product.name}</h4>
                <p>
                  <i>{product.description}</i>
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
