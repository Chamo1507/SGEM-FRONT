import React from 'react';
import { useForm } from 'react-hook-form';
import Form from '../components/CFormulario';
import Input from '../components/CInput';
import Select from '../components/CSelect';
import Textarea from '../components/CTextarea';
import Btn from '../components/btn';
import './EncuestaInvitado.css';

const EncuestaInvitado = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleFormSubmit = (data) => {
    console.log("Encuesta de Invitado Registrada:", data);
    alert("¡Gracias por tus comentarios!");
    reset();
  };

  const opcEventos = [
    { value: 'conferencia-tech', label: 'Conferencia Anual de Tecnología' },
    { value: 'taller-liderazgo', label: 'Taller de Liderazgo' },
    { value: 'simposio-salud', label: 'Simposio de Salud Mental' },
  ];

  const opcCalificacion = [
    { value: '5', label: '⭐⭐⭐⭐⭐ Excelente' },
    { value: '4', label: '⭐⭐⭐⭐ Muy Bueno' },
    { value: '3', label: '⭐⭐⭐ Bueno' },
    { value: '2', label: '⭐⭐ Regular' },
    { value: '1', label: '⭐ Malo' },
  ];

  const opcRecomendacion = [
    { value: 'si', label: 'Sí, lo recomendaría' },
    { value: 'no', label: 'No lo recomendaría' },
    { value: 'tal_vez', label: 'Tal vez' },
  ];

  return (
    <div className="encuesta-container">
      <div className="encuesta-card">
        <div className="encuesta-header invitado">
          <h1>Encuesta de Satisfacción</h1>
          <p>Tu opinión es muy importante para seguir mejorando.</p>
        </div>

        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="form-section-light">
            <Select
              label="¿A qué evento asististe?"
              options={opcEventos}
              required={true}
              error={errors.evento?.message}
              {...register('evento', { required: 'Por favor selecciona un evento' })}
            />

            <Select
              label="Calificación General del Evento"
              options={opcCalificacion}
              required={true}
              error={errors.calificacion?.message}
              {...register('calificacion', { required: 'La calificación es obligatoria' })}
            />

            <Textarea
              label="¿Qué fue lo que más te gustó o qué mejorarías?"
              placeholder="Déjanos tus comentarios aquí..."
              required={true}
              error={errors.comentarios?.message}
              {...register('comentarios', { required: 'Los comentarios son obligatorios' })}
            />

            <Select
              label="¿Recomendarías este tipo de eventos?"
              options={opcRecomendacion}
              required={true}
              error={errors.recomendacion?.message}
              {...register('recomendacion', { required: 'Este campo es obligatorio' })}
            />

            <div className="action-button">
              <Btn type="submit" texto="Enviar Encuesta" />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EncuestaInvitado;
