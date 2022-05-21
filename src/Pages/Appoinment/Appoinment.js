import React, { useState } from "react";

import AppoinmentBanner from "./AppoinmentBanner";
import AvailableService from "./AvailableService";

const Appoinment = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className=" bg-white">
      <div className="container mx-auto">
        <AppoinmentBanner date={date} setDate={setDate}></AppoinmentBanner>
        <AvailableService date={date}></AvailableService>
      </div>
    </div>
  );
};

export default Appoinment;
