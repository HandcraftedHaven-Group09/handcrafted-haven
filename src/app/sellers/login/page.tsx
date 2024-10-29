// import SellerLogin from '@/app/ui/sellers/seller-login';

import SellerLogin from '@/app/ui/sellers/seller-login';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Seller Login',
};
export default function Page() {
  return (
    <div className="center-children">
      <SellerLogin></SellerLogin>
    </div>
  );
}
