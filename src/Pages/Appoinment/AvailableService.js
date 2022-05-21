import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import AppoinmentCard from "./AppoinmentCard";
import AppoinmentModal from "./AppoinmentModal";

const AvailableService = ({ date }) => {
  const formatedDate = format(date, "PP");
  // const [services, setServices] = useState([]);
  const [bookService, setBookService] = useState(null);
  const {
    data: services,
    isLoading,
    refetch,
  } = useQuery(["available", formatedDate], () =>
    fetch(`http://localhost:5000/available?date=${formatedDate}`).then((res) =>
      res.json()
    )
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  // useEffect(() => {
  //   fetch(`http://localhost:5000/available?date=${formatedDate}`)
  //     .then((res) => res.json())
  //     .then((data) => setServices(data));
  // }, [services, formatedDate]);
  return (
    <div className="text-black">
      <div className="text-xl text-center mb-12">
        <h4>Available Service on {format(date, "PP")}</h4>
        <h4>Please select a service</h4>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service) => (
          <AppoinmentCard
            key={service._id}
            service={service}
            setBookService={setBookService}
          ></AppoinmentCard>
        ))}
      </div>
      {bookService && (
        <AppoinmentModal
          bookService={bookService}
          date={date}
          setBookService={setBookService}
          refetch={refetch}
        ></AppoinmentModal>
      )}
    </div>
  );
};

export default AvailableService;
