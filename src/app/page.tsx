import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './page.module.css';
import FeaturedProducts from './ui/landing/featured_products';
import { getImageById, getSellerById, getUserById } from './lib/data';

export default async function Home() {
  const fa1 = await getSellerById(1);
  const fa2 = await getSellerById(2);
  const fai1 = await getImageById(fa1?.profilePictureId || 1);
  const fai2 = await getImageById(fa2?.profilePictureId || 1);

  return (
    <main>
      {/* Customer/Artisan Login in Area */}
      <div id="login">
        <div id="customers">
          <div>
            <h2>Customers</h2>
            <Link href="/users/login">Login</Link> <br />
            <Link href="/users/signup">Registration</Link> <br />
          </div>
        </div>
        <div id="artisans">
          <div>
            <h2>Artisans</h2>
            <Link href="/sellers/login">Login</Link> <br />
            <Link href="/sellers/signup">Registration</Link> <br />
          </div>
        </div>
      </div>

      {/* Featured Products Area */}
      <FeaturedProducts />
      {/* Featured Artisans */}
      <div id="featured-artisans">
        <h2>Featured Artist</h2>
        <div id="fa1">
          <Image
            src={fai1?.url || '/ui/default-user.webp'}
            width={60}
            height={60}
            alt="Picture of featured artisan 1"
          />
          <h4>{fa1?.displayName}</h4>
          <p>{fa1?.bio}</p>
        </div>
        <div id="fa1">
          <Image
            src={fai2?.url || '/ui/default-user.webp'}
            width={60}
            height={60}
            alt="Picture of featured artisan 2"
          />
          <h4>{fa2?.displayName}</h4>
          <p>{fa2?.bio}</p>
        </div>
      </div>
    </main>
  );
}
