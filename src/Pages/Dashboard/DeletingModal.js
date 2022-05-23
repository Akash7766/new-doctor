import React from "react";
import { toast } from "react-toastify";

const DeletingModal = ({ doctor, refetch, setDeleting }) => {
  const { email } = doctor;
  const deleteDoctor = (email) => {
    console.log(doctor);
    fetch(`http://localhost:5000/doctor/${email}`, {
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
          setDeleting(null);
          refetch();
        }
      });
  };
  return (
    <div>
      <input type="checkbox" id="my-modal" class="modal-toggle" />
      <div class="modal bg-white">
        <div class="modal-box bg-slate-300">
          <h3 class="font-bold text-lg">Do you want to delete?</h3>
          <p class="py-4">If you delete once then you never get back again.</p>
          <div class="modal-action">
            <button
              onClick={() => deleteDoctor(email)}
              className="btn btn-warning"
            >
              Delete
            </button>
            <label for="my-modal" class="btn">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletingModal;
