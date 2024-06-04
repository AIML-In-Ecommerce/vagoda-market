// import { useAuth } from "@/context/AuthContext";
// import { useTranslations } from "next-intl";
import { Avatar } from "antd";
import React, { FormEvent, ReactNode, useState } from "react";
import { IoMdTrash } from "react-icons/io";

interface CommentFormProps {
  btnLabel: ReactNode;
  formSubmitHandler: (
    value: string,
    parent: string | null,
    replyOnUser: string | null
  ) => void;
  formCancelHandler: () => void;
  initialText: string;
}

const CommentForm = (props: CommentFormProps) => {
  // const auth = useAuth();
  // const t = useTranslations("Comment");

  const logginedUser = {
    userId: "auth.user?._id",
    avatar: "auth.user?.avatarUrl",
  };

  const [value, setValue] = useState(props.initialText);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    props.formSubmitHandler(value, null, null);
    setValue("");
  };

  const formCancelHandler = () => {
    setValue("");
  };

  return (
    <React.Fragment>
      <div className="flex flex-row relative items-center px-3 py-2 rounded-lg bg-[#ECECEC]">
        <div className="m-3">
          <Avatar
            size="large"
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
          />
        </div>

        <form onSubmit={submitHandler}>
          <div className="flex flex-row gap-3">
            <textarea
              id="freeform"
              name="freeform"
              rows={2}
              cols={105}
              wrap="soft"
              // placeholder="leave_a_comment"
              placeholder="Để lại bình luận"
              className="w-full focus:outline-none mx-auto pl-[8px] pt-[2px] 
              rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500
              resize-none"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <button
              type="reset"
              className="btn btn-ghost rounded-full
                text-xl md:text-2xl lg:text-2xl text-[#1AA1D5] cursor-pointer"
              onClick={() => formCancelHandler()}
            >
              <IoMdTrash />
            </button>
            <button
              type="submit"
              className="btn btn-ghost rounded-full
              text-xl md:text-2xl lg:text-2xl text-[#1AA1D5] cursor-pointer"
            >
              {props.btnLabel}
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default CommentForm;
