'use client';

import '@/app/ui/sellers/sellers.css';
import Image from 'next/image';
import { authenticateSeller } from '@/app/lib/actions'; // TODO Get a seller version
import { useActionState, useState } from 'react';

import { signIn } from 'next-auth/react';

export default function SellerLogin() {
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const [errorMessage, formAction, isPending] = useActionState(
    authenticateSeller,
    undefined
  );

  return (
    <>
      <form action={formAction} className="login-form">
        <h2>SELLER LOGIN</h2>
        <label>email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your login email"
          required
        ></input>
        <label>password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter yours password"
          minLength={6}
          required
        ></input>
        <input type="submit" className="span2"></input>
        {errorMessage && <p className="error span2">{errorMessage}</p>}
        <div className="span2">Sign in with</div>
        <section className="span2"></section>
      </form>
      <button
        onClick={() => {
          signIn('github', { callbackUrl: '/' });
        }}
        style={{ backgroundColor: 'transparent', border: 'unset' }}
      >
        <Image
          src="/ui/github_logo.svg"
          width={30}
          height={30}
          alt="Sign in with GitHub"
        ></Image>
      </button>
    </>
  );
}
