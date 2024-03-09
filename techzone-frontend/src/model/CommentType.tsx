export type CommentType = {
  id: string;
  reviewId: string;
  user: { id: string; name: string; avatar: string };
  desc: string;
  parent: string | null;
  replyOnUser: string | null;
  createdAt: string;
  like: number;
  isSender: boolean;
  like_status: boolean; // save locally?
};

export type AffectedCommentType = {
  type: string;
  id: string;
};

export type RawCommentType = {
  _id: string;
  review_id: string;
  sender_id: string;
  desc: string;
  parent: string | null;
  replyOnUser: string | null;
  createdAt: string;
  like: number;
  isSender: boolean;
};
