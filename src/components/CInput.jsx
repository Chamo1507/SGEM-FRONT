import React, { forwardRef, useId } from "react";
import "./CInput.css";

const Input = forwardRef(
  ({ label, error, id, className = "", type = "text", ...props }, ref) => {
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
                style={{ color: "black", marginLeft: "4px" }}
              >
                *
              </span>
            )}
          </label>
        )}

        {/* Campo de entrada */}
        <input
          id={inputId}
          ref={ref}
          type={type}
          className={`input-field ${error ? "has-error" : ""}`}
          {...props}
        />

        {/* Mensaje de error */}
        {error && <span className="input-error-text">{error}</span>}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
