import Link from 'next/link';

import { auth } from '@/app/auth';

export default async function UserSideNav() {
  const session = await auth();
  return (
    <div id="user-side-nav">
      <ul>
        <li>
          <Link href={`/users/${session?.user.id}`}>Bio</Link>
        </li>
        <li>
          <Link href={`/users/${session?.user.id}/lists`}>Lists</Link>
        </li>
        <li>
          <Link href="/logout">Log Out</Link>
        </li>
      </ul>
    </div>
  );
}
