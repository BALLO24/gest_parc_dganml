// FloatingLabelInput.jsx
import React, { useState, useEffect } from "react";

/**
 * Props:
 * - id, label, value, onChange, type, required
 * - bgClass: background class used for the small label background to "cut" the border (default: bg-white)
 */
export default function FloatingInput({
  id,
  label,
  name,
  value: propValue = "",
  onChange,
  type = "text",
  required = false,
  bgClass = "bg-white",
  className = "",
}) {
  const [value, setValue] = useState(propValue ?? "");
  const [focused, setFocused] = useState(false);

  useEffect(() => setValue(propValue ?? ""), [propValue]);

  const isActive = focused || (value !== null && value.toString().length > 0);

  const handleChange = (e) => {
    setValue(e.target.value);
    if (onChange) onChange(e);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Input: placeholder=" " keeps browser placeholder-shown handling out, we manage float with JS */}
      <input
        //id={id}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder=" " // keep a placeholder but empty visually
        aria-required={required}
        className="block w-full border border-gray-300 rounded-md px-3 py-3 bg-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
      />

      {/* Label: centered when inactive, moved to top-left when active.
          bgClass should match the container background to "cut" the border. */}
      <label
        htmlFor={id}
        className={
          "absolute transition-all duration-150 ease-in-out pointer-events-none select-none " +
          (isActive
            ? // active: small label on the border top-left (notch effect)
              `left-3 top-0 -translate-y-1/2 text-xs px-1 ${bgClass} text-blue-500`
            : // inactive: centered like a placeholder
              "left-5 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm text-gray-400"
          )
        }
        style={{ zIndex: 10 }}
      >
        {label}{required ? " *" : ""}
      </label>
    </div>
  );
}
