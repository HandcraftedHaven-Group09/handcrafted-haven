// SellerProfilePage.tsx (Server Component)
"use server";

import React from 'react';
import { getSession } from 'next-auth/react';
import SignInPrompt from './SignInPrompt';
import SellerDashboard from './SellerDashboard';

export default async function SellerProfilePage() {
    const session = await getSession();

    if (!session || !session.user) {
        return <SignInPrompt />;
    }

    return <SellerDashboard session={session} />;
}