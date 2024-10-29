'use client';

import { useRouter } from 'next/navigation'


type BackButtonProps = {
  backTo: string; // The route to which the button should redirect
};

const BackButton = ({ backTo }: BackButtonProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.push(backTo); // Redirects to the specified page
  };

  return (
    <button onClick={handleBack}>
      Back
    </button>
  );
};

export default BackButton;
