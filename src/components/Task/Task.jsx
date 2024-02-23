import React, { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { Slider } from "./../Slider/Slider";
import "./Task.css";

export const Task = ({ id, title, time, onRemove, onSliderChange }) => {
  // Initialize the slider value state with the time prop value
  const [sliderValue, setSliderValue] = useState(time);

  // Function to handle slider changes
  const handleSliderChange = (newValue) => {
    setSliderValue(newValue); // Update the slider value in the local state
    onSliderChange(newValue); // Call the callback function with the new slider value
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
    // console.log("TITLE --> ", title, " ", time);
    setSliderValue(time);
  }, [time]);

  const changeValue = (value) => {
    const temp = value.split(":");
    return parseFloat(temp[0] + "." + temp[1]);
  };

  return (
    <>
      <div ref={setNodeRef} style={style} {...attributes} className="task">
        <div className="taskData">
          <div className="remove" onClick={handleRemoveTask}>
            {" "}
            X{" "}
          </div>
          {title}
          <div className="time"> {sliderValue} </div>
          <div className="drag-area" {...listeners}>
            {" "}
            ={" "}
          </div>
        </div>
        <Slider
          title={title}
          time={() => changeValue(sliderValue)}
          onChange={(newValue) => handleSliderChange(newValue)}
        />
      </div>
    </>
  );
};
