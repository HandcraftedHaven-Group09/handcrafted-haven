'use client';

import '@/app/ui/users/users.css';
import Image from 'next/image';
import HorizontalBar from '@/app/ui/horizontal-bar';

import { authenticate } from '@/app/lib/actions';
import { useActionState, useState } from 'react';
import { signIn as signInClient } from 'next-auth/react';
import Link from 'next/link';

export default function UserLogin() {
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <div className="login-form">
      <form action={formAction}>
        <h2>LOGIN</h2>
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
      </form>

      <HorizontalBar
        text="Sign in with"
        thickness="4px"
        color="var(--secondary-bg)"
      ></HorizontalBar>
      <button
        onClick={() => {
          signInClient('github', { callbackUrl: '/' });
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
      <span>
        Not registered? Sign up <Link href={'/users/signup'}>here</Link>!
      </span>
    </div>
  );
}
