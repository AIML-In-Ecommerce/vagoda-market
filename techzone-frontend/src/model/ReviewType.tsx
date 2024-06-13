import { RawCommentType } from "./CommentType";

type JustProductId = {
  _id: string;
};

type UserSummary = {
  _id: string;
  avatar: string;
  fullName: string;
  //account: string
}; // ? edit later

export type ReviewType = {
  _id: string;
  product: JustProductId;
  user: UserSummary;
  rating: number;
  content: string;
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
