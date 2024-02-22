import { useState } from "react";
import { DateTime } from 'luxon';
import "./Input.css";

export const Input = ({ onSubmit }) => {
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [timezoneOptions, setTimezoneOptions] = useState([
    "UTC",
    "IST",
    "America/New_York",
    "Europe/London",
    "Asia/Tokyo",
  ]);

  // Function to handle form submission
  const handleSubmit = () => {
    if (!selectedTimezone) return;
    onSubmit(selectedTimezone, DateTime.now().setZone(selectedTimezone).toFormat('HH:mm'));
    setSelectedTimezone(""); // Clear the selected timezone
  };

  return (
    <div className="container">
      <select
        className="timezone-dropdown"
        value={selectedTimezone}
        onChange={(e) => setSelectedTimezone(e.target.value)}
      >
        <option value="">Select a timezone</option>
        {timezoneOptions.map((timezone) => (
          <option key={timezone} value={timezone}>
            {timezone}
          </option>
        ))}
      </select>
      {/* Button to submit the selected timezone */}
      <button onClick={handleSubmit} className="button">
        Add
      </button>
    </div>
  );
};
