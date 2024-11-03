import { Seller } from '@prisma/client';
import { getImageById } from '@/app/lib/data';
import '@/app/sellers/seller.css';
import NextImage from 'next/image';

export default async function SellerBio({
  sellerData,
}: {
  sellerData: Seller;
}) {
  const profilePic = await getImageById(sellerData.profilePictureId || 1);

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
        <h3>{sellerData.displayName}</h3>
        <dl>
          <dt>First Name</dt>
          <dd>{sellerData.firstName}</dd>
          <dt>Last Name</dt>
          <dd>{sellerData.lastName}</dd>
        </dl>
        <p>{sellerData.bio}</p>
      </div>
    </section>
  );
}
