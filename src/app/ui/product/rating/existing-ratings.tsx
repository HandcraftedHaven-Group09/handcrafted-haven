import { fetchReviewsByProductId } from '@/app/lib/actions';
import { useEffect, useState } from 'react';

export default function ExistingRatings({ productId }: { productId: number }) {
  const [reviews, setReviews] = useState<{
    productId: number;
    review: string | null;
    id: number;
    rating: number;
    userId: number;
  } | null>(null);

  useEffect(() => {
    const run = async () => {
      const results = await fetchReviewsByProductId(productId);
      setReviews(results);
    };
    run();
  }, [reviews]);

  try {
    console.log('IN EXISTING RATINGS');
    return (
      <div className="existing-ratings">
        {reviews.map((review) => {
          return (
            <div key={review.id} className="review">
              <p>{review.rating}/5</p>
              <p>{review.review}</p>
            </div>
          );
        })}
      </div>
    );
  } catch (error) {
    console.log('ERROR ', error);
    return <div>ERROR</div>;
  }
}
