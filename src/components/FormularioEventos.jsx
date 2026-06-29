import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Form from './CFormulario';
import Input from './CInput';
import Select from './CSelect';
import Textarea from './CTextarea';
import Btn from './btn';
import './CFormulario.css';
import './CInput.css';
import './FormularioEventos.css';

const FormularioEventos = ({ onSaveEvento, eventoEditando }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: '',
      comentarios: '',
      objetivo: '',
      prioridad: '',
      estatus: '',
      organizador: '',
      proveedor: '',
      fecha: '',
      hora: ''
    }
  });

  useEffect(() => {
    if (eventoEditando) {
      reset(eventoEditando);
    } else {
      reset({
        nombre: '', comentarios: '', objetivo: '', prioridad: '', estatus: '', organizador: '', proveedor: '', fecha: '', hora: ''
      });
    }
  }, [eventoEditando, reset]);

  const handleFormSubmit = (data) => {
    const eventoAGuardar = {
      ...data,
      id: eventoEditando ? eventoEditando.id : Date.now(),
    };
    
    if (onSaveEvento) {
      onSaveEvento(eventoAGuardar);
    }
    
    alert(eventoEditando ? "¡Evento actualizado con éxito!" : "¡Evento registrado con éxito!");
    reset(); // Limpia el formulario si es nuevo
  };

  const opcPrioridad = [
    { value: 'alta', label: 'Alta' },
    { value: 'media', label: 'Media' },
    { value: 'baja', label: 'Baja' },
  ];

  const opcEstatus = [
    { value: 'confirmado', label: 'Confirmado' },
    { value: 'cancelado', label: 'Cancelado' },
    { value: 'pendiente', label: 'Pendiente' },
    { value: 'en preparación', label: 'En Preparación' },
  ];

  const opcOrganizadores = [
    { value: 'org1', label: 'Organizador 1' },
    { value: 'org2', label: 'Organizador 2' },
    { value: 'org3', label: 'Organizador 3' },
  ];

  const opcProveedores = [
    { value: 'prov1', label: 'Proveedor 1' },
    { value: 'prov2', label: 'Proveedor 2' },
    { value: 'prov3', label: 'Proveedor 3' },
  ];

  return (
    <div className="formulario-eventos-wrapper">
      <div className="formulario-header">
        <h2>{eventoEditando ? "Editar Evento" : "Crear Nuevo Evento"}</h2>
        <p>{eventoEditando ? "Modifica los datos del evento." : "Completa los datos para registrar un evento en el sistema."}</p>
      </div>

      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        
        <div className="form-sections-grid">
          {/* SECCIÓN 1: Info Básica */}
          <section className="form-section">
            <div className="section-title-wrap">
              <h3>Información Básica</h3>
            </div>
            
            <Input
              label="Nombre del Evento"
              placeholder="Ej.: Conferencia de Tecnología"
              required={true}
              error={errors.nombre?.message}
              {...register('nombre', { required: 'El nombre es obligatorio' })}
            />
            
            <Textarea
              label="Descripción del Evento"
              placeholder="Describe brevemente el evento"
              required={true}
              error={errors.comentarios?.message}
              {...register('comentarios', { required: 'La descripción es obligatoria' })}
            />

            <Input
              label="Objetivo del Evento"
              placeholder="Ej.: Promover el conocimiento"
              required={true}
              error={errors.objetivo?.message}
              {...register('objetivo', { required: 'El objetivo es obligatorio' })}
            />
          </section>

          {/* SECCIÓN 2: Configuración y Responsables */}
          <section className="form-section">
            <div className="section-title-wrap">
              <h3>Configuración y Responsables</h3>
            </div>

            <div className="form-row">
              <Select
                label="Prioridad"
                options={opcPrioridad}
                required={true}
                error={errors.prioridad?.message}
                {...register('prioridad', { required: 'Requerido' })}
              />
              <Select
                label="Estatus"
                options={opcEstatus}
                required={true}
                error={errors.estatus?.message}
                {...register('estatus', { required: 'Requerido' })}
              />
            </div>

            <div className="form-row">
              <Select
                label="Organizador"
                options={opcOrganizadores}
                required={true}
                error={errors.organizador?.message}
                {...register('organizador', { required: 'Requerido' })}
              />
              <Select
                label="Proveedor"
                options={opcProveedores}
                required={true}
                error={errors.proveedor?.message}
                {...register('proveedor', { required: 'Requerido' })}
              />
            </div>
          </section>

          {/* SECCIÓN 3: Fecha, Hora y Requisitos */}
          <section className="form-section">
            <div className="section-title-wrap">
              <h3>Fecha y Requisitos</h3>
            </div>

            <div className="form-row">
              <Input
                label="Fecha"
                type="date"
                required={true}
                error={errors.fecha?.message}
                {...register('fecha', { required: 'Requerida' })}
              />
              <Input
                label="Hora"
                type="time"
                required={true}
                error={errors.hora?.message}
                {...register('hora', { required: 'Requerida' })}
              />
            </div>

            <div className="checkbox-group">
              <h4>Materiales:</h4>
              <div className="checkbox-grid">
                <Input type="checkbox" label="Proyector" {...register('proyector')} />
                <Input type="checkbox" label="Micrófono" {...register('micrófono')} />
                <Input type="checkbox" label="Sillas" {...register('sillas')} />
                <Input type="checkbox" label="Mesas" {...register('mesas')} />
                <Input type="checkbox" label="Sonido" {...register('equipo_sonido')} />
              </div>
            </div>

            <div className="checkbox-group mt-3">
              <h4>Invitados:</h4>
              <div className="checkbox-grid">
                <Input type="checkbox" label="Estudiantes" {...register('estudiantes')} />
                <Input type="checkbox" label="Profesores" {...register('profesores')} />
                <Input type="checkbox" label="Staff" {...register('personal_administrativo')} />
                <Input type="checkbox" label="Externos" {...register('invitados_externos')} />
                <Input type="checkbox" label="Medios" {...register('medios_comunicacion')} />
                <Input type="checkbox" label="Autoridades" {...register('autoridades')} />
              </div>
            </div>
          </section>
        </div>

        <div className="form-actions">
          <Btn type="submit" texto={eventoEditando ? "Guardar Cambios" : "Guardar Evento"} />
        </div>
      </Form>
    </div>
  );
};

export default FormularioEventos;