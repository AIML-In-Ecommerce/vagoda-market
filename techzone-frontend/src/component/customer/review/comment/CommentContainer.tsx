"use client";
import React, { useMemo, useState } from "react";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import { FiSend } from "react-icons/fi";
// import { useAuth } from "@/context/AuthContext";
import {
  AffectedCommentType,
  CommentType,
  RawCommentType,
} from "@/model/CommentType";
// import { useTranslations } from "next-intl";
import { ReviewType } from "@/model/ReviewType";
import { PUT_UpdateReview } from "@/apis/review/ReviewAPI";

interface CommentContainerInterface {
  review: ReviewType;
  updateReviews: () => void;
}

const CommentContainer = (props: CommentContainerInterface) => {
  // const auth = useAuth();
  // const t = useTranslations("Comment");

  const [comments, setComments] = useState<CommentType[]>([]);
  const rawComments = useMemo(() => {
    return props.review.conversation;
  }, [props.review, props.review.conversation]);

  // useEffect(() => {
  //   (async () => {
  //     let responseData: RawCommentType[];

  //     await axios
  //       .get(
  //         `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}review/getComments/${props.reviewId}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${auth.user?.access_token}`,
  //           },
  //         }
  //       )
  //       .then((response) => {
  //         if (auth.user && auth.user != null) {
  //           console.log("Response", response);

  //           responseData = response.data as RawCommentType[];

  //           let tempComments: CommentType[] = [];

  //           for (let comment of responseData) {
  //             //update temp values
  //             let tempName = comment.isSender ? auth.user.username : "";

  //             let tempAvatar = comment.isSender
  //               ? auth.user.avatarUrl
  //               : "https://cdn-icons-png.flaticon.com/128/1077/1077114.png";

  //             tempComments.push({
  //               id: comment._id,
  //               reviewId: comment.review_id,
  //               user: {
  //                 id: comment.sender_id,
  //                 name: tempName,
  //                 avatar: tempAvatar,
  //               },
  //               desc: comment.desc,
  //               parent: comment.parent ? comment.parent : null,
  //               replyOnUser: comment.replyOnUser ? comment.replyOnUser : null,
  //               createdAt: comment.createdAt,
  //               like: comment.like,
  //               isSender: comment.isSender,
  //               like_status: false,
  //             });
  //           }

  //           console.log("temp comments", tempComments);

  //           setComments(tempComments);
  //           setTrigger(!trigger);
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching comment list:", error);
  //       });
  //   })();
  // }, [props.reviewId]);

  // useEffect(() => {
  //   (async () => {
  //     for (let comment of comments) {
  //       console.log(comment.desc);
  //       if (!comment.isSender) {
  //         if (auth.user && auth.user != null) {
  //           //get sender name
  //           await axios
  //             .get(
  //               `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}profile/${comment.user.id}`,
  //               {
  //                 headers: {
  //                   Authorization: `Bearer ${auth.user.access_token}`,
  //                 },
  //               }
  //             )
  //             .then((response) => {
  //               console.log("Response name", response);
  //               console.log("new name", response.data.username);
  //               console.log("new url", response.data.avatarUrl);

  //               comment.user.name = response.data.username;
  //               comment.user.avatar = response.data.avatarUrl;

  //               console.log("updated comment", comment);
  //               setComments([...comments]);
  //               // setComments([...comments, comment]);
  //             })
  //             .catch((error) => {
  //               console.error("Error fetching user:", error);
  //             });
  //         }
  //       }
  //     }
  //   })();
  // }, [trigger]);

  // const mainComments = comments.filter(
  //   (comment) => comment.parent === null || undefined
  // );

  const [affectedComment, setAffectedComment] =
    useState<AffectedCommentType | null>(null);

  const addCommentHandler = async (value: string) => {
    if (value === "") return;
    // if (!auth.user || auth.user == null) return;

    const newRawComment = {
      _id: undefined,
      user: "663a174e094abbc113a4bca0", //mockId
      content: value,
      createdAt: new Date().toISOString(),
    };

    // console.log("newRawComment", newRawComment);

    // TODO: update with new comment
    handleUpdateReview([newRawComment, ...rawComments]);

    // await axios
    //   .post(
    //     `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}review/createComment`,
    //     {
    //       review_id: props.reviewId,
    //       desc: value,
    //       parent: parent,
    //       replyOnUser: replyOnUser,
    //       createdAt: newRawComment.createdAt,
    //       like: 0,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${auth.user.access_token}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     if (response.status === 201) {
    //       console.log("Success creating comment ", response.data);
    //       newId = response.data._id;

    //       console.log("Log out review.id:", props.reviewId);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error creating comment:", error);
    //     return;
    //   });

    const newComment = {
      id: "", // TODO: update this
      user: {
        id: "auth.user._id",
        name: "auth.user.username",
        avatar: "auth.user.avatarUrl",
      },
      desc: value,
      createdAt: newRawComment.createdAt,
    };
    setComments((curState: any) => {
      return [newComment, ...curState];
    });

    setAffectedComment(null);
  };

  const updateCommentHandler = async (value: string, commentId: string) => {
    // if (!auth.user || auth.user == null) return;

    // await axios
    //   .put(
    //     `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}review/updateComment`,
    //     {
    //       id: commentId,
    //       desc: value,
    //       like: 0,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${auth.user.access_token}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     if (response.status === 201) {
    //       console.log("Success updating comment");
    //       const updateComments = comments.map((comment) => {
    //         if (comment.id === commentId) {
    //           return { ...comment, desc: value, like: 0 };
    //         }
    //         return comment;
    //       });
    //       setComments(updateComments);
    //       setAffectedComment(null);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error updating comment:", error);
    //     return;
    //   });

    // TODO: update with comments updated
    handleUpdateReview([...rawComments]);
  };

  const deleteCommentHandler = async (commentId: string) => {
    console.log("Delete commentId:", commentId);
    // if (!auth.user || auth.user == null) return;

    // await axios
    //   .delete(
    //     `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}review/deleteComment/${commentId}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${auth.user.access_token}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     if (response.status === 200) {
    //       const updateComments = comments.filter((comment) => {
    //         return comment.id !== commentId;
    //       });
    //       setComments(updateComments);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error deleting comment:", error);
    //     return;
    //   });

    // TODO: update with comments filtered
    handleUpdateReview(
      rawComments.filter((comment) => {
        // return comment._id !== commentId;
      })
    );
  };

  const handleUpdateReview = async (newConversation: RawCommentType[]) => {
    const response = await PUT_UpdateReview({
      _id: props.review.id,
      product: props.review.productId,
      user: props.review.user,
      rating: props.review.starRating,
      content: props.review.desc,
      asset: props.review.asset,
      createdAt: props.review.createdAt,
      conversation: newConversation,
      like: props.review.like,
    });
    if (response.status == 200) {
      //
      console.log("Update review successfully!");

      props.review.conversation = newConversation;
      props.updateReviews();
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
          {rawComments.map((comment) => (
            <Comment
              key={comment.content}
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
