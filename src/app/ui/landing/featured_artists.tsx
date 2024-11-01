import { getSellersAll } from '@/app/lib/data';
import FeaturedArtist from './featured_artist';

const getRandomIds = (ids: number[], count: number): number[] => {
  const shuffle = [...ids].sort(() => 0.5 - Math.random());
  return shuffle.slice(0, count);
};
export default async function FeaturedArtists() {
  const sellers = await getSellersAll();
  const ids: number[] = sellers.map((seller) => seller.id);
  const randomIds: number[] = getRandomIds(ids, 2);

  return (
    <div id="featured-artisans">
      <h2>Featured Artist</h2>
      {randomIds.map((sellerId) => {
        return <FeaturedArtist id={sellerId} key={sellerId} />;
      })}
    </div>
  );
}
