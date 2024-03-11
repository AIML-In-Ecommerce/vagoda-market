export type ReviewType = {
  id: string;
  productId: string;
  user: { id: string; name: string; avatar: string }; // ? edit later
  //cart info?
  desc: string;
  createdAt: string;
  useTime: string; // ? edit later
  starRating: number;
};
