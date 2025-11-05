type Review = {
  id: string;
  name: string;
  email: string;
  questions: string[];
  review: string;
  isFeatured: boolean;
};

type ReviewTable = Omit<Review, "id | questions | review | createdAt">;
type ReviewCarousel = Omit<Review, "id | questions | review | isFeatured | createdAt">;

export type { Review, ReviewTable, ReviewCarousel };
