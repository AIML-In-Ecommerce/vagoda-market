export type ReviewType = {
  id: string;
  productId: string;
  user: { id: string; name: string; avatar: string }; // ? edit later
  //cart info?
  starRating: number;
  desc: string;
  createdAt: string;
  asset: string[]; //image urls
  conversation: ConversationType[];
  like: string[];
};

// the comment type
type ConversationType = {
  user: string; //user id
  content: string;
  asset: string; // can we not
};

export type RawReviewType = {
  id: string;
  product: string; //product id
  user: string; //user id
  rating: number;
  content: string; //desc
  asset: string[]; //image urls
  createdAt: string;
  conversation: ConversationType[];
  like: string[]; //the user id list who liked
};
