import { RawCommentType } from "./CommentType";

export type ReviewType = {
  id: string;
  productId: string;
  user: string; // ? edit later
  //cart info?
  starRating: number;
  desc: string;
  createdAt: string;
  asset: string[]; //image urls
  conversation: RawCommentType[];
  like: string[];
};

export type RawReviewType = {
  _id: string;
  product: string; //product id
  user: string; //user id
  rating: number;
  content: string; //desc
  asset: string[]; //image urls
  createdAt: string;
  conversation: RawCommentType[];
  like: string[]; //the user id list who liked
};
