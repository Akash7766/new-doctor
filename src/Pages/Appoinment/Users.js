import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../Shared/Loading";

const Users = () => {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("users", () =>
    fetch("http://localhost:5000/users", {
      method: "GET",
      headers: {
        authoraization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  const makeAdmin = (email) => {
    fetch(`http://localhost:5000/user/admin/${email}`, {
      method: "PUT",
      headers: {
        authoraization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => {
        if (res.status == 403) {
          toast.error("You cant make admin");
        }
        return res.json();
      })
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success("Admin made successful", {
            autoClose: 1000,
            position: "top-center",
          });
        }
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2 className="text-2xl font-bold">This is users component</h2>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>*</th>
              <th>email</th>
              <th>Role</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((b, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{b.email}</td>
                <td>
                  {b.role !== "admin" ? (
                    <button
                      onClick={() => makeAdmin(b.email)}
                      class="btn btn-xs"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <p className="bg-success inline p-2 rounded-md">Admin</p>
                  )}
                </td>
                <td>
                  <button class="btn btn-xs bg-red-500">Remove User</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
