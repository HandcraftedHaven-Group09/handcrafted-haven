'use client';

import '@/app/ui/users/users.css';
import Image from 'next/image';
import Link from 'next/link';
import { PostFormState, signupUser } from '@/app/lib/actions'; // TODO: Make this
import { useActionState, useState } from 'react';
import { signIn } from '@/app/auth';
import { signIn as signInClient } from 'next-auth/react';

export default function UserSignup() {
  const initialPostFormState: PostFormState = {
    message: null,
    errors: {},
    formData: {
      email: '',
      displayName: '',
      firstName: '',
      lastName: '',
    },
  };

  const [formState, formAction] = useActionState(
    signupUser,
    initialPostFormState
  );

  return (
    <>
      <form action={formAction} className="login-form">
        <label>email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter your login email"
          defaultValue={formState.formData?.email}
          // onChange={async (event) => {
          //   changeEmail(event.target.value);
          // }}
          required
        ></input>
        <label>password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          minLength={6}
          required
        ></input>
        <label>Display Name</label>
        <input
          type="text"
          name="displayName"
          placeholder="Enter your name"
          defaultValue={formState.formData?.displayName}
          // onChange={async (event) => {
          //   changeDisplayName(event.target.value);
          // }}
          required
        ></input>

        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          placeholder="Enter your first name"
          defaultValue={formState.formData?.firstName}
          // onChange={async (event) => {
          //   changeFirstName(event.target.value);
          // }}
          required
        ></input>

        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          placeholder="Enter your last name"
          defaultValue={formState.formData?.lastName}
          // onChange={async (event) => {
          //   changeLastName(event.target.value);
          // }}
          required
        ></input>

        <input type="submit" className="span2"></input>
        {formState.message && (
          <p className="error span2">{formState.message}</p>
        )}
      </form>
    </>
  );
}
