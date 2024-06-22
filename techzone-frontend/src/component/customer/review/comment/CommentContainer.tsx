"use client";
import React, { useEffect, useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { FiSend } from "react-icons/fi";
// import { useAuth } from "@/context/AuthContext";
import { AffectedCommentType, RawCommentType } from "@/model/CommentType";
// import { useTranslations } from "next-intl";
import { ReviewType } from "@/model/ReviewType";
import { POST_CreateComment, PUT_UpdateReview } from "@/apis/review/ReviewAPI";

interface CommentContainerInterface {
  review: ReviewType;
}

const CommentContainer = (props: CommentContainerInterface) => {
  // const auth = useAuth();
  // const t = useTranslations("Comment");

  const [comments, setComments] = useState<RawCommentType[]>([]);

  useEffect(() => {
    setComments(props.review.conversation);
  }, [props.review, props.review.conversation]);

  const [affectedComment, setAffectedComment] =
    useState<AffectedCommentType | null>(null);

  const addCommentHandler = async (value: string) => {
    if (value === "") return;
    // if (!auth.user || auth.user == null) return;

    const requestBody = {
      review: props.review._id,
      user: "663a174e094abbc113a4bca0", //mockId
      content: value,
    };

    const response = await POST_CreateComment(requestBody);

    if (response.status === 200 && response.data) {
      let newRawComment: RawCommentType = {
        _id: response.data._id,
        comment: response.data,
      };

      setComments((curState: any) => {
        return [newRawComment, ...curState];
      });

      setAffectedComment(null);
    }
  };

  const updateCommentHandler = async (value: string, commentId: string) => {
    if (value === "") return;
    // if (!auth.user || auth.user == null) return;

    let newComments = comments.filter((comment) => {
      return comment._id !== commentId;
    });

    const requestBody = {
      review: props.review._id,
      user: "663a174e094abbc113a4bca0", //mockId
      content: value,
    };

    const response = await POST_CreateComment(requestBody);

    if (response.status === 200 && response.data) {
      let newRawComment: RawCommentType = {
        _id: response.data._id,
        comment: response.data,
      };

      setComments([newRawComment, ...newComments]);
      setAffectedComment(null);
    }
  };

  const deleteCommentHandler = async (commentId: string) => {
    console.log("Delete commentId:", commentId);
    // if (!auth.user || auth.user == null) return;

    handleUpdateReview(
      comments.filter((comment) => {
        return comment._id !== commentId;
      })
    );

    setComments(
      comments.filter((comment) => {
        return comment._id !== commentId;
      })
    );
  };

  const handleUpdateReview = async (newConversation: RawCommentType[]) => {
    const response = await PUT_UpdateReview({
      _id: props.review._id,
      product: props.review.product._id,
      user: props.review.user._id,
      rating: props.review.rating,
      content: props.review.content,
      asset: props.review.asset,
      createdAt: props.review.createdAt,
      conversation: newConversation,
      like: props.review.like,
    });
    if (response.status == 200) {
      //
      console.log("Update review successfully!");

      props.review.conversation = newConversation;
    } else console.log(response.message);
  };

  return (
    <React.Fragment>
      <div>
        <div className="container m-2 text-left italic text-blue-400 font-roboto">
          {Object.keys(comments).length} bình luận
        </div>
        <CommentForm
          btnLabel={<FiSend />}
          formSubmitHandler={(value) => addCommentHandler(value)}
          formCancelHandler={() => {}}
          initialText=""
        />
        <div className="overflow-auto h-32 space-y-2">
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              affectedComment={affectedComment}
              setAffectedComment={setAffectedComment}
              addComment={addCommentHandler}
              updateComment={updateCommentHandler}
              deleteComment={deleteCommentHandler}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CommentContainer;
