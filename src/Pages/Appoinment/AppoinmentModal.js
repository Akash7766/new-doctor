import { format } from "date-fns";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";

const AppoinmentModal = ({ bookService, date, setBookService, refetch }) => {
  const { name, slots } = bookService;
  const [globalUser] = useAuthState(auth);
  const handleSubmit = (e) => {
    e.preventDefault();
    const service = bookService.name;
    const date = e.target.date.value;
    const slot = e.target.slot.value;
    const name = e.target.displayName.value || "";
    const email = e.target.email.value;
    const data = { service, date, slot, name, email };
    fetch("http://localhost:5000/booking", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Your booking is successful");
          console.log(data);
        } else {
          toast.error("Already booking this service");
          console.log(data);
        }
        refetch();
        setBookService(null);
      });
  };
  return (
    <div>
      <input type="checkbox" id="appoinment-modal" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box bg-white">
          <label
            for="appoinment-modal"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="font-bold text-lg">Booking for {name}</h3>
          <form onSubmit={handleSubmit} className="bg-white my-3 grid gap-5">
            <input
              type="text"
              class="input input-bordered input-accent w-full max-w-md bg-transparent"
              value={format(date, "PP")}
              readOnly
              name="date"
            />
            <select
              class="select select-accent w-full max-w-md bg-transparent"
              name="slot"
            >
              {slots.map((slot) => (
                <option>{slot}</option>
              ))}
            </select>
            <input
              type="email"
              value={globalUser?.email || ""}
              readOnly
              class="input input-bordered input-accent w-full max-w-md bg-transparent"
              name="email"
            />
            <input
              type="text"
              value={globalUser?.displayName || ""}
              readOnly
              class="input input-bordered input-accent w-full max-w-md bg-transparent"
              name="displayName"
            />
            <input
              type="number"
              placeholder="Enter your contact number"
              class="input input-bordered input-accent w-full max-w-md bg-transparent"
              name="phone"
            />
            <input
              type="submit"
              placeholder="Type here"
              class="btn btn-primary w-full max-w-md"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AppoinmentModal;
