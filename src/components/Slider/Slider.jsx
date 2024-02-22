import React, { useState } from 'react';
import './slider.css';

export const Slider = ({ time, onChange }) => {

    const [hour, minute] = time.split(':').map(Number);

    const [sliderValue, setSliderValue] = useState(hour * 4 + Math.floor(minute / 15));
    // Function to handle slider changes
    const handleChange = (event) => {
        const { value } = event.target;
        // console.log(value);

        // Calculate the hour and minute based on the slider value
        const newHour = Math.floor(value / 4); // Each part represents 15 minutes
        const newMinute = (value % 4) * 15; // Convert the remaining part to minutes
        setSliderValue(newHour * 4 + Math.floor(newMinute / 15))

        // Format the new time as "HH:mm"
        const newTime = `${String(newHour).padStart(2, '0')}:${String(newMinute).padStart(2, '0')}`;
        // console.log(newTime);
        onChange(newTime);   
    };



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
                max={24 * 4 - 1} // Maximum value is 23 hours and 45 minutes
                value={sliderValue}
                onChange={handleChange}
            />
        </div>
    );
};
