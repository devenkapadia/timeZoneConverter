import { useState } from "react";
import { DateTime } from 'luxon';
import "./Input.css";

export const Input = ({ onSubmit }) => {
  const [selectedTimezone, setSelectedTimezone] = useState("");
  const [timezoneOptions, setTimezoneOptions] = useState([
    "UTC", // Coordinated Universal Time
    "PST", // Pacific Standard Time
    "EST", // Eastern Standard Time
    "CST", // Central Standard Time
    "MST", // Mountain Standard Time
    "GMT", // Greenwich Mean Time
    "BST", // British Summer Time
    "CET", // Central European Time
    "EET", // Eastern European Time
    "JST", // Japan Standard Time
    "AEST", // Australian Eastern Standard Time
    "NZST", // New Zealand Standard Time
    "HST", // Hawaii-Aleutian Standard Time
    "AKST", // Alaska Standard Time
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
