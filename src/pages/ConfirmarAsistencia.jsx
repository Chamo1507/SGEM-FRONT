import React from 'react';
import { useForm } from 'react-hook-form';
import Form from '../components/CFormulario';
import Input from '../components/CInput';
import Select from '../components/CSelect';
import Btn from '../components/btn';
import './ConfirmarAsistencia.css';

const ConfirmarAsistencia = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleFormSubmit = (data) => {
    console.log("Asistencia Confirmada:", data);
    alert("¡Tu asistencia ha sido confirmada con éxito!");
    reset();
  };

  const opcEventos = [
    { value: 'conferencia-tech', label: 'Conferencia Anual de Tecnología' },
    { value: 'taller-liderazgo', label: 'Taller de Liderazgo' },
    { value: 'simposio-salud', label: 'Simposio de Salud Mental' },
  ];

  return (
    <div className="asistencia-container">
      <div className="asistencia-card">
        <div className="asistencia-header">
          <h1>Confirma tu Asistencia</h1>
          <p>Llena tus datos para asegurar tu lugar en el evento.</p>
        </div>

        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="form-section-light">
            <Select
              label="Evento al que asistirás"
              options={opcEventos}
              required={true}
              error={errors.evento?.message}
              {...register('evento', { required: 'Por favor selecciona un evento' })}
            />

            <Input
              label="Nombre Completo"
              placeholder="Ej.: Juan Pérez López"
              required={true}
              error={errors.nombre?.message}
              {...register('nombre', { required: 'Tu nombre es obligatorio' })}
            />

            <div className="form-row">
              <Input
                label="Semestre"
                type="number"
                placeholder="Ej.: 6"
                required={true}
                error={errors.semestre?.message}
                {...register('semestre', { required: 'Ingresa tu semestre' })}
              />
              <Input
                label="Carrera"
                placeholder="Ej.: Ing. Sistemas"
                required={true}
                error={errors.carrera?.message}
                {...register('carrera', { required: 'Ingresa tu carrera' })}
              />
            </div>

            <div className="confirm-checkbox">
              <Input
                type="checkbox"
                label="Confirmo mi asistencia al evento seleccionado"
                required={true}
                error={errors.confirmacion?.message}
                {...register('confirmacion', { required: 'Debes confirmar tu asistencia' })}
              />
            </div>

            <div className="action-button">
              <Btn type="submit" texto="Confirmar Asistencia" />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ConfirmarAsistencia;
