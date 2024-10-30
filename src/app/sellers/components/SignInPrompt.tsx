// SignInPrompt.tsx (Client Component)
"use client";

import React from 'react';
import { signIn } from 'next-auth/react';

export default function SignInPrompt() {
    return (
        <div>
            <h1>Please sign in to access your profile.</h1>
            <button onClick={() => signIn()}>Sign In</button>
        </div>
    );
}