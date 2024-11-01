'use client';

import { Image, User } from '@prisma/client';
// import { getImageById } from '@/app/lib/data';
import { fetchImageById, putUserById } from '@/app/lib/actions';
import './users.css';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';
import { useActionState } from 'react';

export default function UserBio({ userData }: { userData: User }) {
  const [state, formAction] = useActionState(putUserById, {
    message: null,
    formData: {
      displayName: userData.displayName,
      firstName: userData.firstName,
      lastName: userData.lastName,
      bio: userData.bio || '',
    },
    errors: {},
  });

  const [profilePic, changeProfilePic] = useState({} as Image);

  useEffect(() => {
    async function effect() {
      const image = await fetchImageById(userData.profilePictureId || 1);

      console.log(image?.description);

      changeProfilePic(
        image ||
          ({
            id: 1,
            url: 'default.jpg',
            description: 'default image',
          } as Image)
      );
    }
    effect();
  }, []); // Do it once

  return (
    <div className="bio-card">
      <NextImage
        src={profilePic?.url || 'error'}
        alt={profilePic?.description || 'error'}
        width={200}
        height={200}
        unoptimized
      ></NextImage>
      <form
        action={formAction}
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        <input type="hidden" name="userId" value={userData.id} />

        <input type="file" name="profilePicture"></input>
        <div className="bio-info">
          <dl>
            <dt>Display Name</dt>
            <dd>
              <input
                name="displayName"
                type="text"
                key="displayName"
                defaultValue={state.formData?.displayName}
              />
            </dd>
            <dt>First Name</dt>
            <dd>
              <input
                name="firstName"
                type="text"
                key="lastName"
                defaultValue={state.formData?.firstName}
              />
            </dd>
            <dt>Last Name</dt>
            <dd>
              <input
                name="lastName"
                type="text"
                key="lastName"
                defaultValue={state.formData?.lastName}
              />
            </dd>
          </dl>
          <textarea name="bio" key="bio" defaultValue={state.formData?.bio} />
        </div>
        <button className="nav-button right-align">Update</button>
      </form>
    </div>
  );
}
