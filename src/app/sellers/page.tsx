// pages/seller-profile.tsx

'use server';

import React from 'react';
import { getSession } from 'next-auth/react';
import SignInPrompt from './components/SignInPrompt';
import SellerDashboard from './components/SellerDashboard';

export default async function SellerProfilePage() {
  const session = await getSession();

  if (!session || !session.user) {
    return <SignInPrompt />;
  }

  return <SellerDashboard session={session} />;
}
