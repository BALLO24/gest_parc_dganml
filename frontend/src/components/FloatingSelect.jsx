import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

export default function FloatingSelect({
  id,
  label,
  options = [],
  value: propValue = "",
  onChange,
  required = false,
  bgClass = "bg-white",
}) {
  const [value, setValue] = useState(propValue ?? "");
  const [focused, setFocused] = useState(false);

  useEffect(() => setValue(propValue ?? ""), [propValue]);

  const isActive = focused || (value !== null && value.toString().length > 0);

  return (
    <div className="relative w-full">
      {/* Select */}
      <select
        id={id}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (onChange) onChange(e);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="block w-full border border-gray-300 rounded-md px-3 py-3 bg-white text-sm
                   focus:outline-none focus:border-blue-500 transition-colors appearance-none pr-8"
      >
        {/* option vide = placeholder */}
        <option value="" disabled hidden></option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.nom}
          </option>
        ))}
      </select>

      {/* Label flottant */}
      <label
        htmlFor={id}
        className={
          "absolute transition-all duration-150 ease-in-out pointer-events-none " +
          (isActive
            ? `left-3 top-0 -translate-y-1/2 text-xs px-1 ${bgClass} text-blue-600`
            : "left-16 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-gray-400")
        }
      >
        {label}{required ? " *" : ""}
      </label>

      {/* Chevron (react-icons) */}
      <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
        <FaChevronDown className="w-4 h-4 text-gray-500" />
      </div>
    </div>
  );
}
