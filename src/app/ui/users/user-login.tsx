'use client';
import '@/app/ui/users/users.css';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function UserLogin() {
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');

  return (
    <form className="login-form">
      <h2>LOGIN</h2>
      <label>email</label>
      <input type="text"></input>
      <label>password</label>
      <input type="text"></input>
      <input type="submit" className="span2"></input>
      <div className="span2">Sign in with</div>
      <section className="span2">
        <Link href="https://github.com">
          <Image
            src="/ui/github_logo.svg"
            width={30}
            height={30}
            alt="Sign in with GitHub"
          ></Image>
        </Link>
      </section>
    </form>
  );
}
