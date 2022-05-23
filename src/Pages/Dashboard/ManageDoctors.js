import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../Shared/Loading";

const ManageDoctors = () => {
  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery("doctors", () =>
    fetch("http://localhost:5000/doctors").then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  const deleteDoctor = (email) => {
    fetch(`http://localhost:5000/doctors/${email}`, {
      method: "DELETE",
      headers: {
        authoraization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          toast.success("Delete success", {
            autoClose: 1000,
            position: "top-center",
          });
          refetch();
        }
      });
  };
  return (
    <div>
      <h2 className="text-2xl text-center">Manage doctors {doctors?.length}</h2>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>*</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>
                  <div class="avatar">
                    <div class="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={doctor.imgSrc} alt={doctor.imgSrc} />
                    </div>
                  </div>
                </td>
                <td>{doctor.name}</td>
                <td>
                  <button
                    onClick={() => deleteDoctor(doctor.email)}
                    className="btn btn-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDoctors;
