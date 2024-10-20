'use client';

import { Image, User } from '@prisma/client';
// import { getImageById } from '@/app/lib/data';
import { fetchImageById } from '@/app/lib/actions';
import './users.css';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

export default function UserBio({ userData }: { userData: User }) {
  const [displayName, changeDisplayName] = useState(userData.displayName);
  const [firstName, changeFirstName] = useState(userData.firstName);
  const [lastName, changeLastName] = useState(userData.lastName);
  const [bio, changeBio] = useState(userData.bio);

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
    <form className="bio-card">
      <NextImage
        src={profilePic?.url || 'error'}
        alt={profilePic?.description || 'error'}
        width={200}
        height={200}
        unoptimized
      ></NextImage>
      <div className="bio-info">
        <dl>
          <dt>Display Name</dt>
          <dd>
            <input
              key="displayName"
              value={displayName}
              onChange={(event) => {
                changeDisplayName(event.target.value);
              }}
            />
          </dd>
          <dt>First Name</dt>
          <dd>
            <input
              key="lastName"
              value={firstName}
              onChange={(event) => {
                changeFirstName(event.target.value);
              }}
            />
          </dd>
          <dt>Last Name</dt>
          <dd>
            <input
              key="lastName"
              value={lastName}
              onChange={(event) => {
                changeLastName(event.target.value);
              }}
            />
          </dd>
        </dl>
        <textarea

          key="bio"
          value={bio ? bio : ''}
          onChange={(event) => {
            changeBio(event.target.value);
          }}
        />
      </div>
    </form>
  );
}
