type Review = {
  id: string;
  name: string;
  email: string;
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  review: string;
  isFeatured: boolean;
};

type ReviewTable = Omit<Review, "id | question1 | question2 | question3 | question4 | review | createdAt">;
type ReviewCarousel = Omit<Review, "id | question1 | question2 | question3 | question4 | review | isFeatured | createdAt">;

export type { Review, ReviewTable, ReviewCarousel };
