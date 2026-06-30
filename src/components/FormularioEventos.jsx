import React, { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
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
    watch,
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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "invitados", // Este será el nombre del array en tu objeto final
  });

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

  const proveedorSeleccionado = watch("proveedor");

  const materialesPorProveedor = {
    prov1: ["Proyector", "Micrófono", "Sonido"],
    prov2: ["Sillas", "Mesas", "Manteles"],
    prov3: ["Iluminación", "Cámaras", "Trípodes"],
  };

  const opcMantenimiento = [
    { value: "mant1", label: "pódium" },
    { value: "mant2", label: "Mesas" },
    { value: "mant3", label: "Sillas" },
    { value: "mant4", label: "Paños" },
    { value: "mant5", label: "Mesa para proyector" },
  ];

  const opcEquipos = [
    { value: "equ1", label: "sonido" },
    { value: "equ2", label: "audio para presentación" },
    { value: "equ3", label: "micrófono" },
    { value: "equ4", label: "Pantalla" },
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

          <section className="form-section">
            <h3>Datos de Invitados</h3>

            {fields.map((field, index) => (
              <div key={field.id} className="invitado-row">
                <Input
                  label="Nombre del Invitado"
                  {...register(`invitados.${index}.nombre`)}
                />
                <Input
                  label="Correo del Invitado"
                  {...register(`invitados.${index}.correo`)}
                />

                {/* Botón para quitar un invitado si te equivocas */}
                <Btn
                  type="button"
                  texto="Eliminar"
                  onClick={() => remove(index)}
                />
              </div>
            ))}

            {/* Botón para agregar nuevo */}
            <Btn
              type="button"
              texto="+ Agregar un invitado"
              onClick={() => append({ nombre: "", correo: "" })}
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
              placeholder="Ej.: Fortalecer la experiencia académica de nuestros estudiantes a través de la vinculación con expertos en arquitectura y los proyectos prácticos que éstos solicitan."
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
              <h3>Cobertura</h3>
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
              label="Estatus"
              options={opcEstatus}
              required={true}
              error={errors.estatus?.message}
              {...register("estatus", { required: "Requerido" })}
            />

            <Select
              label="Selecciona un Proveedor"
              options={opcProveedores}
              {...register("proveedor")}
            />

            {/* Solo se muestra si hay un proveedor seleccionado */}
            {proveedorSeleccionado && (
              <div className="checkbox-group mt-3">
                <h4>Materiales disponibles:</h4>
                <div className="checkbox-grid">
                  {materialesPorProveedor[proveedorSeleccionado]?.map(
                    (material) => (
                      <Input
                        key={material}
                        type="checkbox"
                        label={material}
                        {...register(`materiales.${material}`)}
                      />
                    ),
                  )}
                </div>
              </div>
            )}
          </section>

          <div className="two-cards">
            <section className="form-section">
              <div className="section-title-wrap">
                <h3>Fotografía y Reseña</h3>

                <div className="radio-group">
                  <label className="radio-label">
                    ¿Requiere servicio de cobertura fotográfica y elaboración de
                    reseña? *
                  </label>
                  <div className="radio-options">
                    <label className="radio-option">
                      <Input
                        type="radio"
                        value="si"
                        {...register("fotografiaResena", {
                          required: "Selecciona una opción",
                        })}
                      />
                      <span>Sí</span>
                    </label>
                    <label className="radio-option">
                      <Input
                        type="radio"
                        value="no"
                        {...register("fotografiaResena", {
                          required: "Selecciona una opción",
                        })}
                      />
                      <span>No</span>
                    </label>
                  </div>
                  {errors.fotografiaResena && (
                    <span className="input-error-text">
                      {errors.fotografiaResena.message}
                    </span>
                  )}
                </div>
              </div>
            </section>

            <section className="form-section">
              <div className="section-title-wrap">
                <h3>Apoyo a acceso</h3>
              </div>
              <div className="radio-group">
                <label className="radio-label">
                  ¿Requiere apoyo para lugares de estacionamiento para el
                  evento? *
                </label>
                <div className="radio-options">
                  <label className="radio-option">
                    <Input
                      type="radio"
                      value="si"
                      {...register("apoyoAcceso", {
                        required: "Selecciona una opción",
                      })}
                    />
                    <span>Sí</span>
                  </label>
                  <label className="radio-option">
                    <Input
                      type="radio"
                      value="no"
                      {...register("apoyoAcceso", {
                        required: "Selecciona una opción",
                      })}
                    />
                    <span>No</span>
                  </label>
                </div>
                {errors.apoyoAcceso && (
                  <span className="input-error-text">
                    {errors.apoyoAcceso.message}
                  </span>
                )}
              </div>
            </section>
          </div>

          <section className="form-section">
            <div className="section-title-wrap">
              <h3>Apoyo de mantenimiento</h3>
            </div>

            <div className="radio-group">
              <label className="radio-label">
                ¿Requiere apoyo de mantenimiento para el evento? *
              </label>
              <div className="radio-options">
                <label className="radio-option">
                  <Input
                    type="radio"
                    value="si"
                    {...register("apoyoMantenimiento", {
                      required: "Selecciona una opción",
                    })}
                  />
                  <span>Sí</span>
                </label>
                <label className="radio-option">
                  <Input
                    type="radio"
                    value="no"
                    {...register("apoyoMantenimiento", {
                      required: "Selecciona una opción",
                    })}
                  />
                  <span>No</span>
                </label>
              </div>
              {errors.apoyoMantenimiento && (
                <span className="input-error-text">
                  {errors.apoyoMantenimiento.message}
                </span>
              )}

              <Input
                placeholder="Ej.: Pódium(Núm.), Mesas(Núm.), Sillas(Núm.), Paños(Núm.), Mesa para proyector(Núm.), Otro"
                label="Especifica lo que necesitas del área de mantenimiento"
                {...register("Mantenimiento")}
              />
            </div>
          </section>

          <section className="form-section">
            <div className="section-title-wrap">
              <h3>Medios audiovisuales</h3>
            </div>

            <div className="radio-group">
              <label className="radio-label">
                ¿Requiere apoyo de medios audiovisuales para el evento? *
              </label>
              <div className="radio-options">
                <label className="radio-option">
                  <Input
                    type="radio"
                    value="si"
                    {...register("apoyoAudiovisual", {
                      required: "Selecciona una opción",
                    })}
                  />
                  <span>Sí</span>
                </label>
                <label className="radio-option">
                  <Input
                    type="radio"
                    value="no"
                    {...register("apoyoAudiovisual", {
                      required: "Selecciona una opción",
                    })}
                  />
                  <span>No</span>
                </label>
              </div>
              {errors.apoyoAudiovisual && (
                <span className="input-error-text">
                  {errors.apoyoAudiovisual.message}
                </span>
              )}
            </div>

            <div className="checkbox-group">
              <h4>Selecciona los equipos audiovisuales que requieres:</h4>
              <div className="checkbox-grid">
                {opcEquipos.map((equipo) => (
                  <Input
                    key={equipo.value}
                    type="checkbox"
                    label={equipo.label}
                    {...register(`equiposAudiovisuales.${equipo.value}`)}
                  />
                ))}
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
