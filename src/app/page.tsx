import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';
import { getProductWithImageById } from '@/app/lib/data';
import FeaturedIds from '@/app/ui/landing/featured_products'
import { useState } from 'react';

export default async function Home() {
  // const product1 = await getProductWithImageById(1);
  const [featuredIds, setFeaturedIds] = useState<number[]>([]);
  const handleGetIds = (ids: number[]) => {
    setFeaturedIds(ids);
    console.log(featuredIds);
  };

  return (
    <main>
      {/* Customer/Artisan Login in Area */}
      <div id="login">
        <div id="customers">
          <div>
            <h2>Customers</h2>
            <Link href="/customerLogin">Login</Link> <br />
            {/* <Link href="/customerReg">Registration</Link> <br /> */}
          </div>
        </div>
        <div id="artisans">
          <div>
            <h2>Artisans</h2>
            <Link href="/artisanLogin">Login</Link> <br />
            {/* <Link href="/artisanReg">Registration</Link> <br /> */}
          </div>
        </div>
      </div>

      {/* Featured Products Area */}

      <div id="featured-prodcuts">
        <h2>Featured Product</h2>
        <FeaturedIds onGetIds={handleGetIds} />
        <Image
          src={featuredIds[0]?.image.url || ''}
          width={70}
          height={80}
          alt="Picture of featured product number 1"
          unoptimized
        />

        <Image
          src={featuredIds[1]?.image.url || ''}
          width={70}
          height={80}
          alt="Picture of featured product number 2"
          unoptimized
        />

        <Image
          width={70}
          height={80}
          alt="Picture of featured product number 3"
          src={featuredIds[2]?.image.url || ''}
          unoptimized
        />

        <Image
          width={70}
          height={80}
          alt="Picture of featured product number 4"
          src={featuredIds[3]?.image.url || ''}
          unoptimized
        />
      </div>

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
    </main>
  );
}
