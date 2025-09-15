import React, { useState, useEffect } from "react";

export default function FloatingDate({ id, label, value: propValue = "", onChange, required = false, bgClass = "bg-white" }) {
  const [value, setValue] = useState(propValue ?? "");
  const [focused, setFocused] = useState(false);

  useEffect(() => setValue(propValue ?? ""), [propValue]);

  const isActive = focused || (value !== null && value.toString().length > 0);

  return (
    <div className="relative w-full">
      <input
        id={id}
        type="date"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          if (onChange) onChange(e);
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="block w-full border border-gray-300 rounded-md px-3 py-3 bg-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
      />

      <label
        htmlFor={id}
        className={
          "absolute transition-all duration-150 ease-in-out pointer-events-none " +
          (isActive
            ? `left-3 top-0 -translate-y-1/2 text-xs px-1 ${bgClass} text-blue-600`
            : "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-gray-400")
        }
      >
        {label}{required ? " *" : ""}
      </label>
    </div>
  );
}
