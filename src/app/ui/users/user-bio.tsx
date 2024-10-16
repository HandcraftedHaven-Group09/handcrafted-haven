import { User, Image } from '@prisma/client';
import { getImageById } from '@/app/lib/data';
import './users.css';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

export default async function UserBio({ userData }: { userData: User }) {
  //   const [profilePic, changeProfilePic] = useState({} as Image);

  //   useEffect(() => {
  //     async function getPic() {
  //       const image = await getImageById(userData.profilePictureId || 1);
  //       if (image) {
  //         changeProfilePic(image);
  //       }
  //     }
  //     getPic();
  //   });

  const profilePic = await getImageById(userData.profilePictureId || 1);

  return (
    <section className="bio-card">
      <NextImage
        src={profilePic?.url || 'error'}
        alt={profilePic?.description || 'error'}
        width={200}
        height={200}
        unoptimized
      ></NextImage>
      <div className="bio-info">
        <h3>{userData.displayName}</h3>
        <dl>
          <dt>First Name</dt>
          <dd>{userData.firstName}</dd>
          <dt>Last Name</dt>
          <dd>{userData.lastName}</dd>
        </dl>
        <p>{userData.bio}</p>
      </div>
    </section>
  );
}
