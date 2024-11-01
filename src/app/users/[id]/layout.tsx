import UserSideNav from '@/app/ui/users/user-side-nav';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="user-content">
      <UserSideNav></UserSideNav>
      <div id="user-layout">{children}</div>
    </div>
  );
}
