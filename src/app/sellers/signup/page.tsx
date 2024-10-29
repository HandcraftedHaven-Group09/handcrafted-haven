import SellerSignup from '@/app/ui/sellers/seller-signup';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Seller Signup',
  description:
    'Signup up for a seller account, to sell your hand crafter products.',
};

export default async function Page() {
  return (
    <div id="content">
      <h2>Seller Sign Up</h2>
      <SellerSignup />
    </div>
  );
}
