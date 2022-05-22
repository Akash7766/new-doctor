import React, { useEffect } from "react";
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import useToken from "../../Hooks/useToken";
import GoogleLogin from "./GoogleLogin";
import Loading from "./Loading";

const Login = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [globalUser] = useAuthState(auth);
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  const [token] = useToken(globalUser);
  if (token) {
    navigate(from, { replace: true });
  }
  useEffect(() => {
    if (globalUser) {
      toast.success("Login successful", {
        position: "top-center",
        autoClose: 1000,
      });
    }
    if (error) {
      toast.warning(error.code.split("/")[1], {
        position: "top-center",
        autoClose: 1000,
      });
    }
  }, [globalUser, error]);

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    signInWithEmailAndPassword(email, password);
  };
  return (
    <div className="h-screen  flex justify-center items-center text-black">
      <div class="card shadow-xl">
        <div class="card-body w-96">
          <h2 class="text-2xl font-bold text-center mb-5">Login</h2>
          <form onSubmit={handleSignIn} className="grid gap-4">
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              class="input input-bordered input-accent w-full max-w-xs bg-transparent"
            />
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              class="input input-bordered input-accent w-full max-w-xs bg-transparent"
            />
            <input
              type="submit"
              class="btn btn-bordered input-accent w-full max-w-xs"
            />
          </form>
          <p>
            New to Doctor Portal?{" "}
            <Link to="/signup" className="text-primary">
              Create new accaount
            </Link>
          </p>
          <div class="divider">OR</div>
          <GoogleLogin></GoogleLogin>
        </div>
      </div>
    </div>
  );
};

export default Login;
