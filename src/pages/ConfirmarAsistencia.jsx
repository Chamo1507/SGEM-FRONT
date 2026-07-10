import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Form from '../components/CFormulario';
import Input from '../components/CInput';
import Select from '../components/CSelect';
import Btn from '../components/btn';
import './ConfirmarAsistencia.css';

const ConfirmarAsistencia = () => {
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();
  const tipoInvitado = watch('tipoInvitado');
  const [opcEventos, setOpcEventos] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/eventos`);
        // Filtrar eventos cancelados si es necesario o mostrarlos todos. Aquí mostramos los no cancelados.
        const eventosActivos = response.data.filter(e => e.id_estatus_evento !== 3);
        const options = eventosActivos.map(ev => ({
          value: ev.id_evento.toString(),
          label: `${ev.nombre_evento} - ${ev.fecha_evento}`
        }));
        setOpcEventos(options);
      } catch (error) {
        console.error("Error al cargar eventos:", error);
      }
    };
    fetchEventos();
  }, []);

  const handleFormSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/eventos/${data.evento}/asistencia`, data);
      alert("¡Tu asistencia ha sido confirmada con éxito!");
      reset();
    } catch (error) {
      console.error("Error confirmando asistencia:", error);
      alert("Hubo un error al confirmar tu asistencia. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };


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

            <Select
              label="Tipo de Invitado"
              options={[
                { value: '', label: 'Selecciona una opción' },
                { value: 'Administrativo', label: 'Administrativo' },
                { value: 'alumno', label: 'Alumno' },
                { value: 'externo', label: 'Externo' }
              ]}
              required={true}
              error={errors.tipoInvitado?.message}
              {...register('tipoInvitado', { required: 'Por favor selecciona un tipo de invitado' })}
            />

            {tipoInvitado === 'alumno' && (
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
            )}

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
              <Btn type="submit" texto={loading ? "Enviando..." : "Confirmar Asistencia"} disabled={loading} />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ConfirmarAsistencia;
