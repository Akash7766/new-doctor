import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const GoogleLogin = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  const handleGoogleSignIn = () => {
    signInWithGoogle();
  };
  return (
    <button
      onClick={handleGoogleSignIn}
      class="btn btn-outline btn-accent uppercase"
    >
      continue with google
    </button>
  );
};

export default GoogleLogin;
