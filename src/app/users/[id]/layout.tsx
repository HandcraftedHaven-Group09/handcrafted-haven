import UserSideNav from '@/app/ui/users/user-side-nav';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="user-layout">
      <UserSideNav></UserSideNav>
      <div>{children}</div>
    </div>
  );
}
