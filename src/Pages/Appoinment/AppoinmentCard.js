import React from "react";

const AppoinmentCard = ({ service, setBookService }) => {
  const { name, slots } = service;
  return (
    <div class="card lg:max-w-l shadow-md">
      <div class="card-body text-center">
        <h2 class="text-2xl">{name}</h2>
        <p>{slots.length ? slots[1] : "try another day"}</p>
        <p>
          {slots.length} {slots.length > 1 ? "slots" : "slot"} available
        </p>
        <div class="card-actions justify-center mt-2">
          <label
            for="appoinment-modal"
            class="btn btn-primary"
            disabled={slots.length === 0}
            onClick={() => setBookService(service)}
          >
            book appoinment
          </label>
        </div>
      </div>
    </div>
  );
};

export default AppoinmentCard;
