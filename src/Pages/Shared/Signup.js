import React, { useEffect } from "react";
import {
  useAuthState,
  useCreateUserWithEmailAndPassword,
} from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import GoogleLogin from "./GoogleLogin";

const Signup = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [globalUser] = useAuthState(auth);

  useEffect(() => {
    if (globalUser) {
      toast.success("User created successful", {
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

  const handleCreateUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    createUserWithEmailAndPassword(email, password);
  };
  return (
    <div className="h-screen flex justify-center items-center text-black">
      <div class="card shadow-xl">
        <div class="card-body w-96">
          <h2 class="text-2xl font-bold text-center mb-5">Signup</h2>
          <form onSubmit={handleCreateUser} className="grid gap-4">
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              class="input input-bordered input-accent w-full max-w-xs bg-transparent"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              class="input input-bordered input-accent w-full max-w-xs bg-transparent"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              class="input input-bordered input-accent w-full max-w-xs bg-transparent"
              required
            />
            <input
              type="submit"
              class="btn btn-bordered input-accent w-full max-w-xs"
            />
          </form>
          <p>
            Already have an accaount?{" "}
            <Link to="/login" className="text-primary">
              login
            </Link>
          </p>
          <div class="divider">OR</div>
          <GoogleLogin></GoogleLogin>
        </div>
      </div>
    </div>
  );
};

export default Signup;
