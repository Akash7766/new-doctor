import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Payment = () => {
  const { id } = useParams();
  const [booking, setBokking] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/payment/${id}`, {
      method: "GET",
      headers: {
        authoraization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setBokking(data));
  }, []);
  return (
    <div>
      <h2 className="text-center text-2xl">
        Make Payment for {booking.service}
        {booking.price && (
          <h3 className="text-center text-4xl mt-10 text-red-700">
            You have to pay{" "}
            <p className="inline text-6xl font-bold">${booking.price}</p> for{" "}
            {booking.service}
          </h3>
        )}
      </h2>
    </div>
  );
};

export default Payment;
