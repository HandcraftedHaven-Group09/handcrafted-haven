import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from './page.module.css';
import FeaturedProducts from './ui/landing/featured_products';

export default async function Home() {
  return (
    <>
      {/* Customer/Artisan Login in Area */}
      <div id="login">
        <div id="customers">
          <div>
            <h2>Customers</h2>
            <Link href="/login">Login</Link> <br />
            <Link href="/customerReg">Registration</Link> <br />
          </div>
        </div>
        <div id="artisans">
          <div>
            <h2>Artisans</h2>
            <Link href="/artisanLogin">Login</Link> <br />
            <Link href="/artisanReg">Registration</Link> <br />
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
            src=""
            width={60}
            height={60}
            alt="Picture of featured artisan 1"
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem odit
            eos aliquam voluptates excepturi omnis eligendi consectetur ad
            pariatur sint.
          </p>
        </div>
        <div id="fa1">
          <Image
            src=""
            width={60}
            height={60}
            alt="Picture of featured artisan 2"
          />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem odit
            eos aliquam voluptates excepturi omnis eligendi consectetur ad
            pariatur sint.
          </p>
        </div>
      </div>
    </>
  );
}
