import CartPage from '@/app/ui/product/cart_page';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Your Cart',
  description: 'View and manage items in your cart.',
};

export default function Cart() {
  return <CartPage />;
}
