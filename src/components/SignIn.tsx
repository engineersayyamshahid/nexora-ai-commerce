import { SignInButton } from "@clerk/nextjs";
import React from "react";

const SignIn = () => {
  return (
    <SignInButton mode="modal">
      <button
        type="button"
        className="text-sm sm:text-base font-semibold text-lightColor hover:text-shop_light_green hover:cursor-pointer hoverEffect whitespace-nowrap"
      >
        Login
      </button>
    </SignInButton>
  );
};

export default SignIn;

// import React from 'react'

// const SignIn = () => {
//   return (
//     <button className="text-sm font-semibold hover:text-darkColor text-lightColor  hover:cursor-pointer hoverEffect">
//         Login
//     </button>
//   )
// }

// export default SignIn
