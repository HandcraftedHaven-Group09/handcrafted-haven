'use client';
import { User, Image } from '@prisma/client';
import { getImageById } from '@/app/lib/data';
import { fetchImageById } from '@/app/lib/actions';
import './users.css';
import NextImage from 'next/image';
import { Suspense, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import NavButton, { ButtonConfig } from '../nav-button';

export default function UserEdit({ userData }: { userData: User }) {
  userData.bio = userData.bio ? userData.bio : ''; // Workaround for text area

  const [profilePic, changeProfilePic] = useState({ url: '', description: '' });
  const [displayName, changeDisplayName] = useState(userData.displayName);
  const [firstName, changeFirstName] = useState(userData.firstName);
  const [lastName, changeLastName] = useState(userData.lastName);
  const [bio, changeBio] = useState(userData.bio);

  useEffect(() => {
    fetchImageById(userData.profilePictureId || 1).then((image) => {
      changeProfilePic(image || { url: '', description: '' });

      // getImageById(userData.profilePictureId || 1).then((image) => {
      //   changeProfilePic(image || { url: '', description: '' });
    });
  }, [userData.profilePictureId]);

  return (
    <section className="bio-card">
      <Suspense>
        <NextImage
          src={profilePic?.url || 'error'}
          alt={profilePic?.description || 'error'}
          width={200}
          height={200}
          unoptimized
        ></NextImage>
      </Suspense>
      <div className="bio-info">
        <dl>
          <dt>Display Name</dt>
          <dd>
            <input
              value={displayName}
              onChange={(event) => changeDisplayName(event.target.value)}
            />
          </dd>
          <dt>First Name</dt>
          <dd>
            <input
              value={firstName}
              onChange={(event) => changeFirstName(event.target.value)}
            />
          </dd>
          <dt>Last Name</dt>
          <dd>
            <input
              value={lastName}
              onChange={(event) => changeLastName(event.target.value)}
            />
          </dd>
        </dl>
        <textarea
          value={bio}
          onChange={(event) => changeBio(event.target.value)}
        ></textarea>
        {/* <NavButton config={{ text: 'Save', href: '/users' } as ButtonConfig} /> */}
      </div>
    </section>
  );
}
