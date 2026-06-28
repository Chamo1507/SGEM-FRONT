import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "./CFormulario";
import Input from "./CInput";
import Select from "./CSelect";
import Textarea from "./CTextarea";
import Btn from "./btn";
import "./CFormulario.css";
import "./CInput.css";
import "./FormularioEventos.css";

const FormularioEventos = ({ onSaveEvento, eventoEditando }) => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      comentarios: "",
      objetivo: "",
      prioridad: "",
      estatus: "",
      organizador: "",
      proveedor: "",
      fecha: "",
      hora: "",
    },
  });

  useEffect(() => {
    if (eventoEditando) {
      reset(eventoEditando);
    } else {
      reset({
        nombre: "",
        comentarios: "",
        objetivo: "",
        prioridad: "",
        estatus: "",
        organizador: "",
        proveedor: "",
        fecha: "",
        hora: "",
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

    alert(
      eventoEditando
        ? "¡Evento actualizado con éxito!"
        : "¡Evento registrado con éxito!",
    );
    reset(); // Limpia el formulario si es nuevo
  };

  const opcPrioridad = [
    { value: "alta", label: "Alta" },
    { value: "media", label: "Media" },
    { value: "baja", label: "Baja" },
  ];

  const opcEstatus = [
    { value: "confirmado", label: "Confirmado" },
    { value: "cancelado", label: "Cancelado" },
    { value: "pendiente", label: "Pendiente" },
    { value: "en preparación", label: "En Preparación" },
  ];

  const opcOrganizadores = [
    { value: "org1", label: "Organizador 1" },
    { value: "org2", label: "Organizador 2" },
    { value: "org3", label: "Organizador 3" },
  ];

  const opcProveedores = [
    { value: "prov1", label: "Proveedor 1" },
    { value: "prov2", label: "Proveedor 2" },
    { value: "prov3", label: "Proveedor 3" },
  ];

  return (
    <div className="formulario-eventos-wrapper">
      <div className="formulario-header">
        <h2>{eventoEditando ? "Editar Evento" : "Crear Nuevo Evento"}</h2>
        <p>
          {eventoEditando
            ? "Modifica los datos del evento."
            : "Completa los datos para registrar un evento en el sistema."}
        </p>
      </div>

      <Form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="form-sections-grid">
          <section className="form-section">
            <div className="section-title-wrap">
              <h3>Datos del área solicitante</h3>
            </div>

            <Input
              label="Área/Departamento solicitante"
              placeholder="Departamento que organizá el evento"
              required={true}
              error={errors.departamento?.message}
              {...register("departamento", {
                required: "El departamento es obligatorio",
              })}
            />

            <Input
              label="Responsable del evento"
              placeholder="¿Quién organiza el evento?"
              required={true}
              error={errors.responsable?.message}
              {...register("responsable", { required: "Requerido" })}
            />

            <Input
              label="WhatsApp/Correo del responsable"
              placeholder="correo@institucion.edu.mx"
              required={true}
              error={errors.correo?.message}
              {...register("correo", { required: "Requerido" })}
            />
          </section>

          {/* SECCIÓN 1: Info Básica */}
          <section className="form-section">
            <div className="section-title-wrap">
              <h3>Información del Evento</h3>
            </div>

            <Input
              label="Nombre del Evento"
              placeholder="Ej.: Conferencia de Tecnología"
              required={true}
              error={errors.nombre?.message}
              {...register("nombre", { required: "El nombre es obligatorio" })}
            />

            <Input
              label="Publico Objetivo"
              placeholder="Ej.: Estudiantes de Ingeniería"
              required={true}
              error={errors.publico?.message}
              {...register("publico", {
                required: "El público es obligatorio",
              })}
            />

            <Input
              label="Autoridades Asistentes"
              placeholder="Ej.: Coordinador de Carrera, Director de Plantel"
              required={true}
              error={errors.autoridades?.message}
              {...register("autoridades", {
                required: "Las autoridades son obligatorias",
              })}
            />

            <Textarea
              label="Descripción del Evento"
              placeholder="Describe brevemente el evento"
              required={true}
              error={errors.comentarios?.message}
              {...register("comentarios", {
                required: "La descripción es obligatoria",
              })}
            />
          </section>

          {/* SECCIÓN 2: Fecha y Lugar en Tarjetas Separadas */}
          <div className="two-cards-grid">
            {/* TARJETA IZQUIERDA: Calendario */}
            <section className="form-section">
              <div className="section-title-wrap">
                <h3>Fecha del Evento</h3>
              </div>
              <div className="calendario-wrapper">
                <Controller
                  control={control}
                  name="fecha"
                  rules={{ required: "La fecha es requerida" }}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date) => field.onChange(date)}
                      inline
                    />
                  )}
                />
              </div>
              {errors.fecha && (
                <span className="input-error-text text-center">
                  {errors.fecha.message}
                </span>
              )}
            </section>

            {/* TARJETA DERECHA: Horarios y Lugar */}
            <section className="form-section">
              <div className="section-title-wrap">
                <h3>Lugar y Horarios</h3>
              </div>
              <div className="FechaHoraInputs">
                <Input
                  label="Hora de Inicio"
                  type="time"
                  required={true}
                  error={errors.hora?.message}
                  {...register("hora", { required: "Requerida" })}
                />
                <Input
                  label="Fin del Evento"
                  type="time"
                  required={true}
                  error={errors.horaFin?.message}
                  {...register("horaFin", { required: "Requerida" })}
                />
                <Input
                  label="Plantel del Evento"
                  placeholder="Ej.: Plantel Centro"
                  required={true}
                  error={errors.plantel?.message}
                  {...register("plantel", {
                    required: "El plantel es obligatorio",
                  })}
                />
                <Input
                  label="Área a utilizar"
                  placeholder="Ej.: Auditorio Principal"
                  required={true}
                  error={errors.area?.message}
                  {...register("area", {
                    required: "El área es obligatoria",
                  })}
                />
              </div>
            </section>
          </div>

          {/* SECCIÓN 2: Configuración y Responsables */}
          <section className="form-section">
            <div className="section-title-wrap">
              <h3>Objetivo de la cobertura</h3>
            </div>

            <Input
              label="Objetivo Académico"
              placeholder="Ej.: Promover el conocimiento"
              required={true}
              error={errors.objetivo?.message}
              {...register("objetivo", {
                required: "El objetivo es obligatorio",
              })}
            />

            <Select
              label="Prioridad"
              options={opcPrioridad}
              required={true}
              error={errors.prioridad?.message}
              {...register("prioridad", { required: "Requerido" })}
            />
            <Select
              label="Estatus"
              options={opcEstatus}
              required={true}
              error={errors.estatus?.message}
              {...register("estatus", { required: "Requerido" })}
            />

            <Select
              label="Proveedor"
              options={opcProveedores}
              required={true}
              error={errors.proveedor?.message}
              {...register("proveedor", { required: "Requerido" })}
            />
          </section>

          {/* SECCIÓN 3: Fecha, Hora */}
          <section className="form-section">
            <div className="section-title-wrap">
              <h3>Fecha y Requisitos</h3>
            </div>

            <div className="form-row"></div>

            <div className="checkbox-group">
              <h4>Materiales:</h4>
              <div className="checkbox-grid">
                <Input
                  type="checkbox"
                  label="Proyector"
                  {...register("proyector")}
                />
                <Input
                  type="checkbox"
                  label="Micrófono"
                  {...register("micrófono")}
                />
                <Input type="checkbox" label="Sillas" {...register("sillas")} />
                <Input type="checkbox" label="Mesas" {...register("mesas")} />
                <Input
                  type="checkbox"
                  label="Sonido"
                  {...register("equipo_sonido")}
                />
              </div>
            </div>

            <div className="checkbox-group mt-3">
              <h4>Invitados:</h4>
              <div className="checkbox-grid">
                <Input
                  type="checkbox"
                  label="Estudiantes"
                  {...register("estudiantes")}
                />
                <Input
                  type="checkbox"
                  label="Profesores"
                  {...register("profesores")}
                />
                <Input
                  type="checkbox"
                  label="Staff"
                  {...register("personal_administrativo")}
                />
                <Input
                  type="checkbox"
                  label="Externos"
                  {...register("invitados_externos")}
                />
                <Input
                  type="checkbox"
                  label="Medios"
                  {...register("medios_comunicacion")}
                />
                <Input
                  type="checkbox"
                  label="Autoridades"
                  {...register("autoridades")}
                />
              </div>
            </div>
          </section>
        </div>

        <div className="form-actions">
          <Btn
            type="submit"
            texto={eventoEditando ? "Guardar Cambios" : "Guardar Evento"}
          />
        </div>
      </Form>
    </div>
  );
};

export default FormularioEventos;
