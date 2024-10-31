'use client';

import { useRouter } from 'next/navigation';

type BackButtonProps = {
  backTo: string; 
  className?: string; 
};

const BackButton = ({ backTo, className }: BackButtonProps) => {
  const router = useRouter();

  const handleBack = () => {
    router.push(backTo); // Redirects to the specified page
  };

  return (
    <button onClick={handleBack} className={className}>
      Back
    </button>
  );
};

export default BackButton;
