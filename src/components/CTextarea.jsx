import React, { forwardRef, useId } from "react";
import "./CInput.css";

const Textarea = forwardRef(
  ({ label, error, id, className = "", ...props }, ref) => {
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

        {/* Campo de texto multilínea */}
        <textarea
          id={inputId}
          ref={ref}
          className={`input-field textarea-field ${error ? "has-error" : ""}`}
          {...props}
        />

        {/* Mensaje de error */}
        {error && <span className="input-error-text">{error}</span>}
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
