import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
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
            <Image
                src=""
                width={70}
                height={80}
                alt="Picture of featured product number 1"
            />

            <Image
                src=""
                width={70}
                height={80}
                alt="Picture of featured product number 2"
            />

            <Image
                src=""
                width={70}
                height={80}
                alt="Picture of featured product number 3"
            />

            <Image
                src=""
                width={70}
                height={80}
                alt="Picture of featured product number 4"
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem odit eos aliquam voluptates excepturi omnis eligendi consectetur ad pariatur sint.
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
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem odit eos aliquam voluptates excepturi omnis eligendi consectetur ad pariatur sint.
                </p>
            </div>
        </div>
    </main>
)
}
