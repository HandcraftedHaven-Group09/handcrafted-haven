import Burger from '../burger-button/burger-button';
import UserTag from '@/app/ui/user-tag/user-tag';
import { auth } from '@/app/auth';
export type MenuItem = {
  text: string;
  url: string;
};

const links: MenuItem[] = [
  { text: 'Home', url: '/' },
  { text: 'Products', url: '/products' },
  { text: 'Collections', url: '/products' },
  { text: 'About', url: '/about' },
];

export default async function NavLists() {
  const session = await auth();

  return (
    <nav>
      <Burger rightHanded={true} menuItems={links} />
      {session?.user.id ? <UserTag userId={session.user.id} /> : null}
    </nav>
  );
}
