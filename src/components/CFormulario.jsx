import React from 'react';
import './CFormulario.css';

const Form = ({ onSubmit, children, className = '', ...props }) => {
  return (
    <form 
      onSubmit={onSubmit} 
      className={`form-template ${className}`} 
      noValidate // Evita la validación nativa del navegador para usar la nuestra
      {...props}
    >
      {children}
    </form>
  );
};

export default Form;