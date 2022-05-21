import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

const MyAppointment = () => {
  const [user] = useAuthState(auth);
  const [booking, setBooking] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:5000/booking?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setBooking(data));
  }, [booking, user.email]);
  return (
    <div>
      <h2 className="text-2xl font-bold mb-5">
        My appoinment {booking.length}
      </h2>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>*</th>
              <th>Name</th>
              <th>Treatment</th>
              <th>Date</th>
              <th>Slots</th>
            </tr>
          </thead>
          <tbody>
            {booking.map((b, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{b.name}</td>
                <td>{b.service}</td>
                <td>{b.date}</td>
                <td>{b.slot}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAppointment;
