import React, { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Slider } from "./../Slider/Slider";
import "./Task.css";

export const Task = ({ id, title, time, onRemove, onSliderChange }) => {

  const timezoneMap = {
    IST: "Indian Standard Time",
    UTC: "Coordinated Universal Time",
    PST: "Pacific Standard Time",
    EST: "Eastern Standard Time",
    CST: "Central Standard Time",
    MST: "Mountain Standard Time",
    GMT: "Greenwich Mean Time",
    BST: "British Summer Time",
    CET: "Central European Time",
    EET: "Eastern European Time",
    JST: "Japan Standard Time",
    AEST: "Australian Eastern Standard Time",
    NZST: "New Zealand Standard Time",
    HST: "Hawaii-Aleutian Standard Time",
    AKST: "Alaska Standard Time",
  };
  const [sliderValue, setSliderValue] = useState(time);

  // Function to handle slider changes
  const handleSliderChange = (newValue) => {
    setSliderValue(newValue);
    onSliderChange(newValue);
  };

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const handleRemoveTask = () => {
    onRemove(id); // Call the onRemove function with the task id
  };

  useEffect(() => {
    setSliderValue(time);
  }, [time]);

  return (
    <>
      <div ref={setNodeRef} style={style} {...attributes} className="task">
        <div className="taskData">
          <div className="remove" onClick={handleRemoveTask}>
            {" "}
            X{" "}
          </div>
          {title}
          <div className="timezone"> {timezoneMap[title]} </div>
          <div className="time"> {sliderValue} </div>
          <div className="drag-area" {...listeners}>
            {" "}
            ={" "}
          </div>
        </div>
        <Slider
          id={id}
          time={sliderValue}
          onChange={(newValue) => handleSliderChange(newValue)}
        />
      </div>
    </>
  );
};
