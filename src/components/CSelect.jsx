import React, { forwardRef, useId } from "react";
import "./CInput.css";

const Select = forwardRef(
  (
    {
      label,
      error,
      id,
      className = "",
      options = [], // formato: [{ value: '1', label: 'Opción 1' }, ...]
      placeholder = "Selecciona una opción",
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <div className={`input-container ${className}`}>
        {/* Etiqueta (Label) */}
        {label && (
          <label htmlFor={inputId} className="input-label">
            {label}
            {props.required && (
              <span
                className="required-asterisk"
                style={{ color: "red", marginLeft: "4px" }}
              >
                *
              </span>
            )}
          </label>
        )}

        {/* Campo select */}
        <select
          id={inputId}
          ref={ref}
          className={`input-field select-field ${error ? "has-error" : ""}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden>
              {placeholder}
            </option>
          )}
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {/* Mensaje de error */}
        {error && <span className="input-error-text">{error}</span>}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
