import ExistingRatings from './existing-ratings';
import AddRating from './add-rating';

export default function RatingsBox({
  productId,
  userId,
}: {
  productId: number;
  userId: number;
}) {
  console.log('IN RATING BOX');
  console.log(productId, ' ', userId);
  return (
    <div className="ratings-box">
      <ExistingRatings productId={productId} />
      <AddRating productId={productId} userId={userId} />
    </div>
  );
}
