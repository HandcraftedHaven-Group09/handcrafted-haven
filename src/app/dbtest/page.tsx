'use client';

import {
  postImage,
  PostFormState,
  fetchSellerAll,
  fetchProductAll,
} from '../lib/actions';
import { useActionState, useEffect, useState } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';

export default function Page() {
  const { data: session, status } = useSession();
  const [products, updateProducts] = useState<
    {
      name: string;
      id: number;
      price: number;
      discountPercent: number;
      discountAbsolute: number;
      description: string;
      sellerId: number;
    }[]
  >([]);

  const [sellers, updateSellers] = useState<
    {
      id: number;
      displayName: string;
      firstName: string;
      lastName: string;
    }[]
  >([]);

  useEffect(() => {
    async function doit() {
      console.log('DO IT!');

      const product = await fetchProductAll();
      const sellers = await fetchSellerAll();

      updateProducts(() => product);
      updateSellers(() => sellers);
    }
    doit();
  }, []);
  console.log(products);
  console.log(sellers);

  const initialCreateImageState: PostFormState = {
    message: null,
    errors: {},
  };

  const [state, formAction] = useActionState(
    postImage,
    initialCreateImageState
  );
  console.log('SESSION DATA', session);

  return (
    <main style={{ padding: '1rem' }}>
      <h2>Database Testing Sandbox</h2>
      <div>
        {session ? (
          <span>
            User {session.user?.name} #{session.user?.id} email:
            {session.user?.email} role:{session.user?.role} logged in
          </span>
        ) : (
          <span>No session</span>
        )}
      </div>

      <form action={formAction}>
        <fieldset
          style={{
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}
        >
          <legend>IMAGE</legend>
          <dl>
            <dt>Description</dt>
            <dd>
              <input type="text" name="description" required></input>
            </dd>
            <dt>Owner</dt>
            <dd>
              <select name="ownerId" required>
                {sellers.map((seller) => (
                  <option key={seller.id} value={seller.id}>
                    {seller.displayName}
                  </option>
                ))}
              </select>
            </dd>
            <dt>Image</dt>
            <dd>
              <input
                type="file"
                name="imageFile"
                accept="image/png, image/webp, image/jpg"
                required
              ></input>
            </dd>
          </dl>
          <input type="submit" value={'SUBMIT'} />
        </fieldset>
      </form>

      <form>
        <fieldset style={{ padding: '1rem' }}>
          <legend>PRODUCT</legend>
          <dl>
            <dt>
              <label>Name</label>
            </dt>
            <dd>
              <input type="text"></input>
            </dd>
            <dt>
              <label>Price</label>
            </dt>
            <dd>
              <input type="text"></input>
            </dd>
            <dt>
              <label>Discount Percent</label>
            </dt>
            <dd>
              <input type="text"></input>
            </dd>
            <dt>
              <label>Discount Absolute</label>
            </dt>
            <dd>
              <input type="text"></input>
            </dd>
            <dt>
              <label>Description</label>
            </dt>
            <dd>
              <input type="text"></input>
            </dd>
          </dl>
        </fieldset>
      </form>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </main>
  );
}
