import React from "react";
import chair from "../../assets/images/chair.png";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";

const AppoinmentBanner = ({ date, setDate }) => {
  return (
    <div className="py-44">
      <div class="hero ">
        <div class="hero-content flex-col lg:flex-row-reverse gap-20">
          <img
            src={chair}
            class="max-w-lg rounded-lg shadow-2xl"
            alt="chair_image"
          />
          <div>
            <div className="shadow text-black">
              <DayPicker mode="single" selected={date} onSelect={setDate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppoinmentBanner;
