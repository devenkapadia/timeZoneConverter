import React, { useEffect, useRef, useState } from "react";
import "./slider.css";

export const Slider = ({ title, time, onChange }) => {
  const [sliderValue, setSliderValue] = useState(time);
  // Function to handle slider changes
  const handleChange = (event) => {
    const { value } = event.target;
    // console.log(value);

    // Calculate the hour and minute based on the slider value
    const newHour = Math.floor(value / 4); // Each part represents 15 minutes
    const newMinute = (value % 4) * 15; // Convert the remaining part to minutes
    setSliderValue(newHour * 4 + Math.floor(newMinute / 15));

    // Format the new time as "HH:mm"
    const newTime = `${String(newHour).padStart(2, "0")}:${String(
      newMinute
    ).padStart(2, "0")}`;
    // console.log("", newTime);
    onChange(newTime);
  };

  useEffect(() => {
    // console.log("CHANGING ------------ ", title, " ", time);
    // const convertedTime = time.split(":");
    // setSliderValue(parseFloat(convertedTime[0] + convertedTime[1]));
    // setSliderValue()
    setSliderValue(time);
  }, [time]);

  return (
    <div className="slider-container">
      <div className="slider-labels">
        {[...Array(24).keys()].map((hour) => (
          <span key={hour + 1}>{hour + 1}</span>
        ))}
      </div>
      <input
        type="range"
        min={0}
        max={24} // Maximum value is 23 hours and 45 minutes
        value={sliderValue}
        onChange={handleChange}
      />
    </div>
  );
};
