"use client";
import React, { useState, useEffect } from "react";
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
import axios from "axios";
import { useParams, usePathname } from "next/navigation";

interface CommentContainerInterface {
  reviewId: string;
  studentId: string;
}

// const CommentContainer = (props: CommentContainerInterface) => {
const CommentContainer = () => {
  // const auth = useAuth();
  const { classId } = useParams();
  const pathname = usePathname();
  // const t = useTranslations("Comment");

  const [comments, setComments] = useState<CommentType[]>([]);
  const [trigger, setTrigger] = useState("");

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
  //             //TODO: update temp values
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
  //           setTrigger("triggered");
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
  //           //TODO: get sender name
  //           // if (props.senderRole === "Teacher") {
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

  const mainComments = comments.filter(
    (comment) => comment.parent === null || undefined
  );
  const [affectedComment, setAffectedComment] =
    useState<AffectedCommentType | null>(null);

  const addCommentHandler = async (
    value: string,
    parent: string | null,
    replyOnUser: string | null
  ) => {
    if (value === "") return;
    // if (!auth.user || auth.user == null) return;

    const newRawComment = {
      review_id: "props.reviewId",
      desc: value,
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: new Date().toISOString(),
      like: 0,
    };

    console.log("newRawComment", newRawComment);

    let newId;

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

    //       // notification
    //       (async () => {
    //         if (!auth.user || auth.user == null) return;

    //         let senderRole: string,
    //           message: string,
    //           redirectUrl: string,
    //           receiverIdList: string[],
    //           allMembersList: ClassListType[];

    //         receiverIdList = [];

    //         await axios
    //           .get(
    //             `${process.env.NEXT_PUBLIC_BACKEND_PREFIX}classes/${classId}/members`,
    //             {
    //               headers: {
    //                 Authorization: `Bearer ${auth.user.access_token}`,
    //               },
    //             }
    //           )
    //           .then((response) => {
    //             if (!auth.user || auth.user == null) return;

    //             allMembersList = response.data.members;

    //             if (allMembersList.length > 0) {
    //               if (pathname.includes("teaching")) {
    //                 senderRole = "Teacher";
    //                 message = "teacher_reply";
    //                 redirectUrl = `/enrolled/${classId}/review/${props.reviewId}`;

    //                 allMembersList.forEach((member) => {
    //                   if (
    //                     member.role === "Student" &&
    //                     member.student_id === props.studentId
    //                   ) {
    //                     receiverIdList.push(member.user_id);
    //                   }
    //                 });
    //               } else {
    //                 receiverIdList.push(response.data.host_user._id);

    //                 senderRole = "Student";
    //                 message = "student_reply";
    //                 redirectUrl = `/teaching/${classId}/review/${props.reviewId}`;

    //                 allMembersList.forEach((member) => {
    //                   if (member.role === "Teacher") {
    //                     receiverIdList.push(member.user_id);
    //                   }
    //                 });
    //               }
    //               let newNotification: NotificationType;
    //               newNotification = {
    //                 id: "",
    //                 senderId: "",
    //                 classId: classId.toString(),
    //                 reviewId: props.reviewId,
    //                 senderRole: senderRole,
    //                 receiverIdList: receiverIdList,
    //                 message: message,
    //                 redirectUrl: redirectUrl,
    //                 createdAt: newRawComment.createdAt,
    //                 isRead: false,
    //               };

    //               actions.sendNotification(
    //                 auth.user.access_token,
    //                 newNotification
    //               );
    //             }
    //           })
    //           .catch((error) => {
    //             console.error("Error fetching class members:", error);
    //           });
    //       })();
    //       // end send notification
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error creating comment:", error);
    //     return;
    //   });

    const newComment = {
      id: newId,
      user: {
        id: "auth.user._id",
        name: "auth.user.username",
        avatar: "auth.user.avatarUrl",
      },
      desc: value,
      parent: parent,
      replyOnUser: replyOnUser,
      createdAt: newRawComment.createdAt,
      like: 0,
      isSender: true,
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
  };

  const getRepliesHandler = (commentId: string) => {
    return comments
      .filter((comment) => comment.parent === commentId)
      .sort((former, latter) => {
        return (
          new Date(former.createdAt).getTime() -
          new Date(latter.createdAt).getTime()
        );
      });
  };

  const likeCommentHandler = (commentId: string) => {
    setComments((curState) => {
      return curState.map((comment) => {
        if (comment.id === commentId) {
          const updatedLikeStatus = !comment.like_status;
          const updatedLikeCount = updatedLikeStatus
            ? comment.like + 1
            : comment.like - 1;
          return {
            ...comment,
            like: updatedLikeCount,
            like_status: updatedLikeStatus,
          };
        }
        return comment;
      });
    });
  };

  return (
    <React.Fragment>
      <div>
        <div className="container m-2 text-left italic text-blue-400 font-roboto">
          {Object.keys(comments).length} comments
        </div>
        <CommentForm
          btnLabel={<FiSend />}
          formSubmitHandler={(value) => addCommentHandler(value, null, null)}
          formCancelHandler={() => {}}
          initialText=""
        />
        <div className="overflow-auto h-24 space-y-2">
          {mainComments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              affectedComment={affectedComment}
              setAffectedComment={setAffectedComment}
              addComment={addCommentHandler}
              updateComment={updateCommentHandler}
              deleteComment={deleteCommentHandler}
              likeComment={likeCommentHandler}
              replies={getRepliesHandler(comment.id)}
              parentId={comment.parent}
            />
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default CommentContainer;
