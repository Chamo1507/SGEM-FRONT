import React from 'react';
import { useForm } from 'react-hook-form';
import Form from './CFormulario';
import Input from './CInput';
import Select from './CSelect';
import Textarea from './CTextarea';
import Btn from './btn';
import './CFormulario.css';
import './CInput.css';

const FormularioEventos = () => {
  // Inicializamos el hook de React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: '',
      pais: '',
      comentarios: '',
    }
  });

const handleFormSubmit = (data) => {
    console.log("Datos enviados con éxito:", data);
    //llamada a la API (fetch, axios, etc.)
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

        const opcPlanteles = [
          { value: 'umad', label: 'Plantel UMAD' },
          { value: 'zavaleta', label: 'Plantel Zavaleta' },
          { value: 'centro', label: 'Plantel IMM Centro' },
        ];

        const opcEspacios = [
          { value: 'auditorio', label: 'Auditorio' },
          { value: 'salon', label: 'Salón de Usos Múltiples' },
          { value: 'explanada', label: 'Explanada' },
        ];

  return <div>
    <h1>Registro de Eventos</h1>

    <Form onSubmit={handleSubmit(handleFormSubmit)}>

      <h2>Información Básica</h2>

        <Input
          label="Nombre del Evento"
          placeholder="Ej.: Conferencia de Tecnología"
          required={true} // Esto activará el asterisco en tu componente
          error={errors.nombre?.message} // Pasa el string del error si existe
          {...register('nombre', { 
            required: 'El nombre es obligatorio'
          })}
        />
        
        <Textarea
        label="Descripción del Evento"
        placeholder="Describe brevemente el evento"
        required={true}
        error={errors.comentarios?.message}
        {...register('comentarios', {
          required: 'La descripción es obligatoria'
        })}
      />

      <Input
      label="Objetivo del Evento"
      placeholder="Ej.: Promover el intercambio de conocimientos"
      required={true}
      error={errors.objetivo?.message}
      {...register('objetivo', {
        required: 'El objetivo es obligatorio'
      })}
    />
        </Form>

        <Form onSubmit={handleSubmit(handleFormSubmit)}>
          <h2>Configuración del Evento</h2>

          <Select
          label="Prioridad del Evento"
          placeholder="Selecciona la prioridad"
          options={opcPrioridad}
          required={true}
          error={errors.prioridad?.message}
          {...register('prioridad', {
            required: 'La prioridad es obligatoria'
          })}
        />

        <Select
          label="Estatus del Evento"
          placeholder="Selecciona el estatus"
          options={opcEstatus}
          required={true}
          error={errors.estatus?.message}
          {...register('estatus', {
            required: 'El estatus es obligatorio'
          })}
        />
      </Form>

      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <h2>Responsables</h2>

        <Select
          label="Organizador del Evento"
          placeholder="Selecciona un organizador"
          options={opcOrganizadores}
          required={true}
          error={errors.organizador?.message}
          {...register('organizador', {
            required: 'El organizador es obligatorio'
          })}
        />

        <Select
          label="Proveedor"
          placeholder="Selecciona un proveedor"
          options={opcProveedores}
          required={true}
          error={errors.proveedor?.message}
          {...register('proveedor', {
            required: 'El proveedor es obligatorio'
          })}
        />

      </Form>

      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <h2>Fecha y Hora</h2>

        <Input
          label="Fecha del Evento"
          type="date"
          required={true}
          error={errors.fecha?.message}
          {...register('fecha', {
            required: 'La fecha es obligatoria'
          })}
        />

        <Input
          label="Hora del Evento"
          type="time"
          required={true}
          error={errors.hora?.message}
          {...register('hora', {
            required: 'La hora es obligatoria'
          })}
        />

      </Form>

      <Form onSubmit={handleSubmit(handleFormSubmit)}>

        <h2>Materiales Requeridos</h2>
        <Input
          type="checkbox"
          label="Proyector"
          {...register('proyector')}
        />
        <Input
          type="checkbox"
          label="Micrófono"
          {...register('micrófono')}
        />
        <Input
          type="checkbox"
          label="Sillas"
          {...register('sillas')}
        />
        <Input
          type="checkbox"
          label="Mesas"
          {...register('mesas')}
        />
        <Input
          type="checkbox"
          label="Equipo de Sonido"
          {...register('equipo_sonido')}
        />
      </Form>
        
      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        
        <h2>Lista de Invitados</h2>

        <Input
        type="checkbox"
        label="Estudiamtes"
        {...register('estudiantes')}
      />
      <Input
        type="checkbox"
        label="Profesores"
        {...register('profesores')}
      />
      <Input
        type="checkbox"
        label="Personal Administrativo"
        {...register('personal_administrativo')}
      />
      <Input 
      type="checkbox"
      label="Invitados Externos"
      {...register('invitados_externos')}
      />
      <Input
      type="checkbox"
      label="Medios de Comunicación"
      {...register('medios_comunicacion')}
      />
      <Input
      type="checkbox"
      label="Autoridades"
      {...register('autoridades')}
      />
      </Form>  

      <Btn type="submit" texto="Enviar"></Btn>
  </div>
}

export default FormularioEventos;