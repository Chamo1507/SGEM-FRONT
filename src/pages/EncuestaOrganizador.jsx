import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Form from '../components/CFormulario';
import Select from '../components/CSelect';
import Textarea from '../components/CTextarea';
import Btn from '../components/btn';
import './EncuestaOrganizador.css';

const EncuestaOrganizador = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const handleFormSubmit = (data) => {
    console.log("Encuesta de Organizador Registrada:", data);
    alert("¡Evaluación guardada con éxito!");
    reset();
  };

  const [opcEventos, setOpcEventos] = useState([]);

  useEffect(() => {
    const fetchEventos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/eventos`);
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

  const opcEvaluacion = [
    { value: 'excelente', label: 'Excelente' },
    { value: 'bueno', label: 'Bueno' },
    { value: 'regular', label: 'Regular' },
    { value: 'malo', label: 'Malo' },
  ];

  return (
    <div className="encuesta-org-container">
      <div className="encuesta-org-card">
        <div className="encuesta-org-header">
          <h1>Evaluación del Organizador</h1>
          <p>Califica el desempeño del staff y la cobertura del evento.</p>
        </div>

        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="form-section-light">
            <Select
              label="Evento Evaluado"
              options={opcEventos}
              required={true}
              error={errors.evento?.message}
              {...register('evento', { required: 'Selecciona el evento' })}
            />

            <div className="form-row">
              <Select
                label="Cobertura de Audio/Video"
                options={opcEvaluacion}
                required={true}
                error={errors.cobertura_av?.message}
                {...register('cobertura_av', { required: 'Requerido' })}
              />
              <Select
                label="Cobertura Fotográfica"
                options={opcEvaluacion}
                required={true}
                error={errors.cobertura_foto?.message}
                {...register('cobertura_foto', { required: 'Requerido' })}
              />
            </div>

            <Select
              label="Desempeño y Actitud del Staff"
              options={opcEvaluacion}
              required={true}
              error={errors.desempeno_staff?.message}
              {...register('desempeno_staff', { required: 'Requerido' })}
            />

            <Textarea
              label="Observaciones Generales y Áreas de Mejora"
              placeholder="Detalla cualquier incidencia o punto de mejora para el staff..."
              required={true}
              error={errors.observaciones?.message}
              {...register('observaciones', { required: 'Las observaciones son obligatorias' })}
            />

            <div className="action-button">
              <Btn type="submit" texto="Guardar Evaluación" />
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default EncuestaOrganizador;
