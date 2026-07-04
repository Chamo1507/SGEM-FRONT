import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "./CFormulario";
import Input from "./CInput";
import Select from "./CSelect";
import Textarea from "./CTextarea";
import Btn from "./btn";
import axios from "axios";
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
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nombre: "",
      comentarios: "",
      objetivo: "",
      prioridad: "",
      estatus: "pendiente",
      responsable: "",
      proveedoresIds: [],
      nuevosProveedores: [],
      fecha: "",
      hora: "",
      horaApartado: "",
      horaFin: "",
      plantel: "",
      area: "",
    },
  });

  const [opcPlanteles, setOpcPlanteles] = useState([]);
  const [opcAreas, setOpcAreas] = useState([]);
  const [opcProveedores, setOpcProveedores] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.id_rol === 1 || user.id_rol === 2) setIsAdmin(true);

    const fetchData = async () => {
      try {
        const [plantelesRes, espaciosRes, provsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/planteles`),
          axios.get(`${import.meta.env.VITE_API_URL}/espacios`),
          axios.get(`${import.meta.env.VITE_API_URL}/proveedores`),
        ]);

        let pOptions = plantelesRes.data.map((p) => ({
          value: p.id_plantel,
          label: p.nombre_plantel,
        }));
        setOpcPlanteles(pOptions);

        let eOptions = espaciosRes.data.map((e) => ({
          value: e.id_espacio,
          label: e.nombre_espacio,
        }));
        setOpcAreas(eOptions);

        setOpcProveedores(
          provsRes.data.map((p) => ({
            value: p.id_proveedor,
            label: p.nombre_proveedor,
            correo: p.correo_proveedor || "",
          })),
        );
      } catch (error) {
        console.error("Error fetching form data:", error);
      }
    };
    fetchData();

    if (eventoEditando) {
      reset(eventoEditando);
    } else {
      reset({
        nombre: "",
        comentarios: "",
        objetivo: "",
        prioridad: "",
        estatus: "pendiente",
        responsable: "",
        proveedoresIds: [],
        nuevosProveedores: [],
        fecha: "",
        hora: "",
        horaApartado: "",
        horaFin: "",
        plantel: "",
        area: "",
      });
    }
  }, [eventoEditando, reset]);

  const handleFormSubmit = async (data) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const google_calendar_id = user?.google_calendar_id;

      // Check if admin is adding new providers
      let finalProveedoresIds = [...(data.proveedoresIds || [])];

      // Save newly created providers
      if (
        isAdmin &&
        data.nuevosProveedores &&
        data.nuevosProveedores.length > 0
      ) {
        for (const prov of data.nuevosProveedores) {
          if (prov.nombre) {
            const provRes = await axios.post(
              `${import.meta.env.VITE_API_URL}/proveedores`,
              {
                nombre_proveedor: prov.nombre,
                correo_proveedor: prov.correo || "",
              },
            );
            finalProveedoresIds.push(provRes.data.id_proveedor);
          }
        }
      }

      // Collect explicitly selected existing providers
      if (isAdmin && data.proveedores && data.proveedores.length > 0) {
        for (const prov of data.proveedores) {
          if (prov.proveedorId) {
            finalProveedoresIds.push(Number(prov.proveedorId));
          }
        }
      }

      let fechaFormateada = data.fecha;
      if (data.fecha instanceof Date) {
        const offset = data.fecha.getTimezoneOffset();
        fechaFormateada = new Date(data.fecha.getTime() - offset * 60000)
          .toISOString()
          .split("T")[0];
      } else if (typeof data.fecha === "string" && data.fecha.includes("T")) {
        fechaFormateada = data.fecha.split("T")[0];
      }

      const payload = {
        ...data,
        nombre: data.nombre,
        comentarios: data.comentarios,
        objetivo: data.objetivo,
        publicoobjetivo_eventos: data.publico,
        fecha: fechaFormateada,
        hora: data.hora,
        horaFin: data.horaFin,
        horaApartado: data.horaApartado,
        prioridad: data.prioridad || "Media",
        id_usuario: user?.id_usuario,
        plantel: data.plantel,
        area: data.area,
        ids_areas_apoyo: finalProveedoresIds,
        proveedoresIds: finalProveedoresIds,
        id_usuario: user?.id_usuario || null,
        google_calendar_id,
      };

      if (eventoEditando) {
        // await axios.put(`${import.meta.env.VITE_API_URL}/eventos/${eventoEditando.id}`, payload);
      } else {
        await axios.post(`${import.meta.env.VITE_API_URL}/eventos`, payload);
      }

      if (onSaveEvento) {
        onSaveEvento();
      }

      alert(
        eventoEditando
          ? "¡Evento actualizado con éxito!"
          : "¡Evento registrado con éxito!",
      );
      reset();
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al guardar el evento.");
    }
  };

  const onFormError = (validationErrors) => {
    console.error("Errores de validación:", validationErrors);
    const firstError = Object.values(validationErrors)[0];
    if (firstError?.message) {
      alert(`Por favor completa los campos requeridos: ${firstError.message}`);
    }
  };

  const {
    fields: invitadosFields,
    append: appendInvitado,
    remove: removeInvitado,
  } = useFieldArray({
    control,
    name: "invitados",
  });

  const {
    fields: nuevosProveedoresFields,
    append: appendNuevoProveedor,
    remove: removeNuevoProveedor,
  } = useFieldArray({
    control,
    name: "nuevosProveedores",
  });

  const {
    fields: proveedoresFields,
    append: appendProveedor,
    remove: removeProveedor,
  } = useFieldArray({
    control,
    name: "proveedores",
  });

  const opcEstatus = [
    { value: "confirmado", label: "Confirmado" },
    { value: "cancelado", label: "Cancelado" },
    { value: "pendiente", label: "Pendiente" },
    { value: "en preparación", label: "En Preparación" },
  ];

  const opcEquipos = [
    { value: "equ1", label: "Sonido" },
    { value: "equ2", label: "Audio para presentación" },
    { value: "equ3", label: "Micrófono" },
    { value: "equ4", label: "Pantalla" },
  ];

  const opcTiposAutoridad = [
    { value: "interno", label: "Interno" },
    { value: "externo", label: "Externo" },
  ];

  return (
    <div className="formulario-eventos-wrapper">
      <div className="formulario-header">
        <h2>{eventoEditando ? "Editar Evento" : "Crear Nuevo Evento"}</h2>
        <p>Completa los datos para registrar un evento en el sistema.</p>
      </div>
      <div className="formulario-line"></div>

      <Form onSubmit={handleSubmit(handleFormSubmit, onFormError)}>
        <div className="form-sections-grid">
          <section className="form-section">
            <div className="section-title-wrap">
              <h3>Datos del área solicitante</h3>
            </div>

            <h2 className="form-section-subtitle">Área solicitante: Root</h2>

            <h2 className="form-section-subtitle">
              Responsable del área: Root
            </h2>

            <h2 className="form-section-subtitle">
              Correo del responsable: Root@umad.edu.mx
            </h2>
          </section>

          {/* SECCIÓN 1: Info Básica */}
          <section className="form-section">
            <div className="section-title-wrap">
              <h3>Información del Evento</h3>
            </div>

            <Input
              label="Nombre del Evento"
              placeholder="Ej.: Conferencia de Tecnología"
              error={errors.nombre?.message}
              {...register("nombre", { required: "Obligatorio" })}
            />

            <Input
              label="Público Objetivo"
              error={errors.publico?.message}
              {...register("publico", { required: "Obligatorio" })}
            />

            <div className="Invitados-section">
              <div className="section-header-inline">
                <h3 className="form-section-subtitle m-0">
                  Autoridade(s) Invitada(s):
                </h3>
                <Btn
                  className="add-btn-small"
                  type="button"
                  texto="+ Añadir"
                  onClick={() => appendInvitado({ nombre: "", correo: "" })}
                />
              </div>
              {invitadosFields.map((field, index) => (
                <div key={field.id} className="invitado-row">
                  <Input
                    label="Autoridad Asistente"
                    {...register(`invitados.${index}.nombre`, {
                      required: "Obligatorio",
                    })}
                  />
                  <Input
                    label="Apellido Paterno"
                    {...register(`invitados.${index}.apellidoPaterno`)}
                  />
                  <Input
                    label="Apellido Materno"
                    {...register(`invitados.${index}.apellidoMaterno`)}
                  />
                  <Input
                    label="Correo del Invitado"
                    {...register(`invitados.${index}.correo`)}
                  />
                  <Input
                    label="Teléfono del Invitado"
                    {...register(`invitados.${index}.telefono`)}
                  />
                  <Input
                    label="Institución del Invitado"
                    {...register(`invitados.${index}.institucion`)}
                  />
                  <Select
                    label="Tipo de Autoridad"
                    {...register(`invitados.${index}.nivelAutoridad`)}
                  />
                  <Btn
                    className="delete-btn-small"
                    type="button"
                    texto="Eliminar"
                    onClick={() => removeInvitado(index)}
                  />
                </div>
              ))}
            </div>

            <Textarea
              label="Descripción del Evento"
              error={errors.comentarios?.message}
              {...register("comentarios", { required: "Obligatorio" })}
            />
          </section>

          {/* SECCIÓN 2: Fecha y Lugar */}
          <div className="two-cards-grid">
            <section className="form-section">
              <div className="section-title-wrap">
                <h3>Fecha del Evento</h3>
              </div>
              <div className="calendario-wrapper">
                <Controller
                  control={control}
                  name="fecha"
                  rules={{ required: "Requerida" }}
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

            <section className="form-section">
              <div className="section-title-wrap">
                <h3>Lugar y Horarios</h3>
              </div>
              <div className="FechaHoraInputs">
                <Input
                  label="Hora de Apartado"
                  type="time"
                  error={errors.horaApartado?.message}
                  {...register("horaApartado", {
                    required: "Requerida",
                    validate: (value, formValues) =>
                      !formValues.hora ||
                      value <= formValues.hora ||
                      "No puede ser posterior al inicio",
                  })}
                />
                <Input
                  label="Hora de Inicio"
                  type="time"
                  error={errors.hora?.message}
                  {...register("hora", { required: "Requerida" })}
                />
                <Input
                  label="Fin del Evento"
                  type="time"
                  error={errors.horaFin?.message}
                  {...register("horaFin", {
                    required: "Requerida",
                    validate: (value, formValues) =>
                      !formValues.hora ||
                      value > formValues.hora ||
                      "Debe ser posterior a la de inicio",
                  })}
                />

                <Input
                  label="Plantel del Evento"
                  placeholder="Escribe o selecciona de la lista..."
                  list="planteles-list"
                  error={errors.plantel?.message}
                  {...register("plantel", { required: "Obligatorio" })}
                />
                <datalist id="planteles-list">
                  {opcPlanteles.map((p) => (
                    <option key={p.value} value={p.value} />
                  ))}
                </datalist>

                <Input
                  label="Área a utilizar"
                  placeholder="Escribe o selecciona de la lista..."
                  list="areas-list"
                  error={errors.area?.message}
                  {...register("area", { required: "Obligatorio" })}
                />
                <datalist id="areas-list">
                  {opcAreas.map((a) => (
                    <option key={a.value} value={a.value} />
                  ))}
                </datalist>
              </div>
            </section>
          </div>

          {/* SECCIÓN Cobertura (Dinámica por roles) */}
          <section className="form-section">
            <div className="section-title-wrap">
              <h3>Cobertura</h3>
            </div>

            <Input
              label="Objetivo Académico"
              error={errors.objetivo?.message}
              {...register("objetivo", { required: "Obligatorio" })}
            />

            {isAdmin && (
              <>
                <div className="checkbox-group mt-3">
                  <div
                    className="proveedor-extra-section"
                    style={{ marginTop: "20px" }}
                  >
                    <div
                      className="section-header-inline"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: "16px",
                      }}
                    >
                      <p style={{ margin: 0 }}>
                        <strong>¿Agregar proveedor existente?</strong>
                      </p>
                      <Btn
                        className="add-btn-small"
                        type="button"
                        texto="+ Añadir"
                        onClick={() => appendProveedor({ proveedorId: "", correo: "" })}
                      />
                    </div>
                    {proveedoresFields.map((field, index) => (
                      <div key={field.id} className="invitado-row">
                        <Select
                          label="Proveedor"
                          options={opcProveedores}
                          {...register(`proveedores.${index}.proveedorId`, {
                            onChange: (e) => {
                              const selectedId = e.target.value;
                              const prov = opcProveedores.find(
                                (p) => String(p.value) === String(selectedId),
                              );
                              if (prov) {
                                setValue(
                                  `proveedores.${index}.correo`,
                                  prov.correo,
                                  { shouldDirty: true, shouldTouch: true }
                                );
                              }
                            },
                          })}
                        />
                        <Input
                          label="Correo del Proveedor"
                          readOnly
                          style={{ backgroundColor: "#f1f5f9" }}
                          {...register(`proveedores.${index}.correo`)}
                        />
                        <Btn
                          className="delete-btn-small"
                          type="button"
                          texto="Eliminar"
                          onClick={() => removeProveedor(index)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
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
                        {...register("fotografiaResena")}
                      />
                      <span>Sí</span>
                    </label>
                    <label className="radio-option">
                      <Input
                        type="radio"
                        value="no"
                        {...register("fotografiaResena")}
                      />
                      <span>No</span>
                    </label>
                  </div>
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
                      {...register("apoyoAcceso")}
                    />
                    <span>Sí</span>
                  </label>
                  <label className="radio-option">
                    <Input
                      type="radio"
                      value="no"
                      {...register("apoyoAcceso")}
                    />
                    <span>No</span>
                  </label>
                </div>
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
                    {...register("apoyoMantenimiento")}
                  />
                  <span>Sí</span>
                </label>
                <label className="radio-option">
                  <Input
                    type="radio"
                    value="no"
                    {...register("apoyoMantenimiento")}
                  />
                  <span>No</span>
                </label>
              </div>
              <Input
                placeholder="Ej.: Mesas(Núm.), Sillas(Núm.)..."
                label="Especifica lo que necesitas"
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
                ¿Requiere apoyo de medios audiovisuales? *
              </label>
              <div className="radio-options">
                <label className="radio-option">
                  <Input
                    type="radio"
                    value="si"
                    {...register("apoyoAudiovisual")}
                  />
                  <span>Sí</span>
                </label>
                <label className="radio-option">
                  <Input
                    type="radio"
                    value="no"
                    {...register("apoyoAudiovisual")}
                  />
                  <span>No</span>
                </label>
              </div>
            </div>
            <div className="checkbox-group">
              <h4>Equipos audiovisuales que requieres:</h4>
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
