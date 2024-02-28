import React, { useEffect, useRef, useState } from "react";
import "./slider.css";

export const Slider = ({ id, time, onChange }) => {
  const [sliderValue, setSliderValue] = useState(time);
  const handleChange = (event) => {
    const { value } = event.target;

    const newHour = Math.floor(value / 4);
    const newMinute = (value % 4) * 15;
    setSliderValue(newHour * 4 + Math.floor(newMinute / 15));

    const newTime = `${String(newHour).padStart(2, "0")}:${String(
      newMinute
    ).padStart(2, "0")}`;
    onChange(newTime);
  };

  useEffect(() => {
    setSliderValue(time);
  }, [time]);

  if (id === 1) {
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
  } else return null
};
