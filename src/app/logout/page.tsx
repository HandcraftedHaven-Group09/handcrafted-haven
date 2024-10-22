// import { signOut } from '@/auth';
import { signOut } from '@/app/auth';

export default function Page() {
  //   try {
  //     signOut();
  //   } catch (error) {
  //     console.log('Failed signout: ', error);
  //   }
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <input type="SUBMIT" defaultValue="Log Out" />
    </form>
  );
}
