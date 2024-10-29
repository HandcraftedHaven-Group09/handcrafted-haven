import { Seller } from 'prisma/prisma-client';
import { getSellerById } from '@/app/lib/data';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '@/app/ui/users/sellers.css';
export const metadata: Metadata = {
  title: 'Successful Seller Signup',
  description: 'Another successful seller signup!',
};

export default async function Page({ params }: { params: { id: string } }) {
  const seller = (await getSellerById(Number(params.id))) as Seller;
  if (!seller) {
    console.log('Seller not found');
    notFound();
  } else {
    console.log('Seller Found');
  }

  return (
    <div className="center-children">
      <span
        style={{
          textAlign: 'center',
        }}
      >
        Congratulations {seller.displayName}, You&apos;ve successfully signed
        up!
      </span>
    </div>
  );
}
