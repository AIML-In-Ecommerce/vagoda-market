"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
// import axios from "axios";
// import { useRecoveryContext } from "@/context/RecoveryContext";

interface ForgetPasswordProps {
    setSuccessMsg: (msg: string) => void;
    setErrorMsg: (msg: string) => void;
    showSuccessMsg: (show: boolean) => void;
    showErrorMsg: (show: boolean) => void;
}

export default function ForgetPassword(props: ForgetPasswordProps) {
    const [email, setEmail] = useState("");
    const [validAuthMsg, setValidAuthMsg] = useState<string | null>(null);
    // const context = useRecoveryContext();
    const t = useTranslations("Authentication");

    const isEmail = (email: string) => {
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        return regex.test(email);
    };

    //Check validity of email address
    const isValidAuth = (email: string) => {
        setValidAuthMsg(null);
        if (!isEmail(email)) {
            setValidAuthMsg(t("email_error_msg"));
            return false;
        }
        return true;
    };

    const handleForgetPassword = async () => {
        // if (!isValidAuth(email)) return;
        // context.email = email;
        // const generatedOTP = Math.floor(Math.random() * 9000 + 1000);
        // context.otp = generatedOTP;
        // console.log("RecoveryContext:", context);

        // try {
        //     const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_PREFIX}auth/send-recovery-email`, {
        //         email: context.email,
        //         otp: context.otp
        //     });
        //     // console.log("Status code: ", response.status);
        //     if (response.status === 201) {

        //         props.setSuccessMsg(t("forget_password_request_success_msg"));
        //         props.showSuccessMsg(true)
        //         setTimeout(() => {
        //             props.showSuccessMsg(false);
        //         }, 2000);
        //         context.page = "otp";
        //     }
        // } catch (error: any) {
        //     const errorMessage =
        //         error.response && error.response.data
        //             ? error.response.data.message
        //             : "Failed to send reset password request";
        //     setValidAuthMsg(errorMessage);

        //     console.error("Failed to send reset password request:", error);
        // }
    };

    return (
        <React.Fragment>
            <div className="flex flex-col p-4 m-8 w-96 border rounded-xl mx-auto my-auto bg-white">
                <label className="font-semibold text-3xl text-center p-2">Forgot Password</label>
                <label htmlFor="request-email"
                    className="mt-10 mx-3 block mb-2 text-base font-medium text-gray-900 dark:text-white">Enter email address</label>
                <input
                    type="text"
                    id="request-email"
                    className="input input-bordered w-full max-w-xs m-2 mx-auto dark:bg-white dark:text-black "
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {validAuthMsg && (
                    <label className="flex text-center items-center justify-center my-3 text-red-700">
                        {validAuthMsg}
                    </label>
                )}

                <button
                    onClick={() => handleForgetPassword()}
                    className="btn btn-info w-full max-w-xs m-4 mx-auto mt-3"
                >
                    {t("forget_password_btn")}
                </button>
            </div>
        </React.Fragment>
    );
}