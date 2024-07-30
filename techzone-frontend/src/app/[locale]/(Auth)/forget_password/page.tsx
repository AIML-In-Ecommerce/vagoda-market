// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import ForgetPassword from "@/component/auth/ForgetPassword";
// import { useTranslations } from "next-intl";
// // import { useRecoveryContext } from "@/context/RecoveryContext";
// // import ResetPassword from "@/component/ResetPassword";
// // import OTPInput from "@/component/OTPInput";

// export default function ForgetPasswordPage() {
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [showSuccessMsg, setShowSuccessMsg] = useState(false);
//   const [showErrorMsg, setShowErrorMsg] = useState(false);
// //   const context = useRecoveryContext();
//   const [page, setPage] = useState(context.page);
//   const isRouting = false;
//   const otpNextPage = "reset-password";
//   const t = useTranslations("Authentication");
// //   context.request = "${process.env.NEXT_PUBLIC_BACKEND_PREFIX}auth/send-recovery-email";

// //   useEffect(() => {
// //     setPage(context.page);
// //   }, [context.page]);

//   const NavigateComponents = () => {
//     if (page === "forget-password")
//       return <ForgetPassword
//         setSuccessMsg={setSuccessMsg}
//         setErrorMsg={setErrorMsg}
//         showSuccessMsg={setShowSuccessMsg}
//         showErrorMsg={setShowErrorMsg} />;
//     if (page === "otp")
//       return <OTPInput
//         isRouting={isRouting}
//         nextPage={otpNextPage}
//         setSuccessMsg={setSuccessMsg}
//         setErrorMsg={setErrorMsg}
//         showSuccessMsg={setShowSuccessMsg}
//         showErrorMsg={setShowErrorMsg} />;
//     if (page === "reset-password")
//       return <ResetPassword
//         setSuccessMsg={setSuccessMsg}
//         setErrorMsg={setErrorMsg}
//         showSuccessMsg={setShowSuccessMsg}
//         showErrorMsg={setShowErrorMsg} />;
//   }

//   return (
//     <React.Fragment>
//       {showSuccessMsg && (
//         <div role="alert" className="fixed inset-x-1/4 w-1/2 z-50 mx-auto mt-4 alert alert-success">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="stroke-current shrink-0 h-6 w-6"
//             fill="none"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth="1"
//               d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           <span>{successMsg}</span>
//         </div>
//       )}
//       {showErrorMsg && (
//         <div role="alert" className="fixed inset-x-1/4 w-1/2 z-50 mx-auto mt-4 alert alert-error">
//           <svg xmlns="http://www.w3.org/2000/svg"
//             className="stroke-current shrink-0 h-6 w-6"
//             fill="none" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <span>{errorMsg}</span>
//         </div>
//       )}
//       <section className="bg-gray-50 z-0 w-screen dark:bg-gray-900">
//         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
//           <NavigateComponents />
//         </div>
//       </section>

//     </React.Fragment>
//   )
// }

function ForgetPasswordPage()
{
    return(
        <></>
    )
}

export default ForgetPasswordPage