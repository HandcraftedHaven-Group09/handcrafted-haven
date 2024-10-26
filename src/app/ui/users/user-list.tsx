import Link from 'next/link';
import './users.css';
import prisma from '@/app/lib/prisma';
import { Prisma, UserList } from '@prisma/client';

type ListWithProducts = Prisma.UserListGetPayload<{
  include: { Products?: true };
}>;

export default async function UserLists({ list }: { list: ListWithProducts }) {
  return (
    <div className="user-list">
      <h4>{list.name}</h4>
      <p>{list.description}</p>
      {list.Products ? (
        <ul>
          {list.Products.map((product) => {
            return (
              <li>
                <Link href={`/products/${product.id}`}>{product.name}</Link>
              </li>
            );
          })}
        </ul>
      ) : (
        'EMPTY'
      )}
    </div>
  );
}
