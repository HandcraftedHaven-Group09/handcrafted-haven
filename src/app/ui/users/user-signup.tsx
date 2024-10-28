'use client';

import '@/app/ui/users/users.css';
import Image from 'next/image';
import Link from 'next/link';
import { authenticate } from '@/app/lib/actions';
import { useActionState, useState } from 'react';
import { signIn } from '@/app/auth';
import { signIn as signInClient } from 'next-auth/react';

export default function UserSignup() {
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const [firstName, changeFirstName] = useState('');
  const [lastName, changeLastName] = useState('');
  const [userId, changeUserId] = useState('');

  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );

  return (
    <>
      <form action={formAction} className="login-form">
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
        <div className="span2">Sign in with</div>
        <section className="span2"></section>
      </form>
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
    </>
  );
}
