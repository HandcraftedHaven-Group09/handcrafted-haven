// import { signOut } from '@/auth';
import { signOut } from '@/app/auth';
import { redirect } from 'next/navigation';

import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Logout confirmation',
};

export default function Page() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
      }}
    >
      <h2>Logout Confirmation</h2>
      <p>Are you sure you wan to log out?</p>
      <form
        action={async () => {
          'use server';

          await signOut({ redirect: false });
          redirect('/users/login');
        }}
      >
        <button
          style={{
            padding: '.25rem',
            fontWeight: 'bolder',
            borderRadius: '.5rem',
            border: 'unset',
            backgroundColor: 'var(--link-color)',
            color: 'white',
          }}
        >
          Continue
        </button>
      </form>
    </div>
  );
}
