export type CommentType = {
  id: string;
  reviewId: string;
  user: { id: string; name: string; avatar: string };
  desc: string;
  // parent: string | null;
  // replyOnUser: string | null;
  // like: string[] | null;
  createdAt: string;
  // isSender: boolean; //not need if can get cur user id
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
  // parent: string | null;
  // replyOnUser: string | null;
  // like: string[] | null;
  createdAt: string;
  // isSender: boolean;
};
