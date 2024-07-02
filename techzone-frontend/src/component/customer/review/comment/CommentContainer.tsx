"use client";
import React, { useContext, useEffect, useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { FiSend } from "react-icons/fi";
import { AffectedCommentType, RawCommentType } from "@/model/CommentType";
// import { useTranslations } from "next-intl";
import { ReviewType } from "@/model/ReviewType";
import { POST_CreateComment, PUT_UpdateReview } from "@/apis/review/ReviewAPI";
import { AuthContext } from "@/context/AuthContext";

interface CommentContainerInterface {
  review: ReviewType;
}

const CommentContainer = (props: CommentContainerInterface) => {
  // const t = useTranslations("Comment");
  const authContext = useContext(AuthContext);

  const [comments, setComments] = useState<RawCommentType[]>([]);

  useEffect(() => {
    setComments(props.review.conversation);
  }, [props.review, props.review.conversation]);

  const [affectedComment, setAffectedComment] =
    useState<AffectedCommentType | null>(null);

  const addCommentHandler = async (value: string) => {
    if (
      value === "" ||
      !authContext ||
      !authContext.userInfo ||
      !authContext.userInfo._id
    )
      return;

    const userId = authContext.userInfo._id;

    const requestBody = {
      review: props.review._id,
      user: userId,
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
    if (
      value === "" ||
      !authContext ||
      !authContext.userInfo ||
      !authContext.userInfo._id
    )
      return;

    const userId = authContext.userInfo._id;

    let newComments = comments.filter((comment) => {
      return comment._id !== commentId;
    });

    const requestBody = {
      review: props.review._id,
      user: userId,
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
