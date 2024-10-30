// pages/seller-profile.tsx

'use server';

import React from 'react';
import { auth } from '@/app/auth';
import SignInPrompt from './components/SignInPrompt';
import SellerDashboard from './components/SellerDashboard';

export default async function SellerProfilePage() {
  const session = await auth();

  if (!session || !session.user) {
    return <SignInPrompt />;
  }

  return <SellerDashboard session={session} />;
}
