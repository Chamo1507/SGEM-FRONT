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
      fecha: "",
      hora: "",
      horaApartado: "",
      horaFin: "",
      plantel: "",
      area: "",
      nuevoProveedorNombre: "",
      nuevoProveedorCorreo: "",
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
        
        let pOptions = plantelesRes.data.map(p => ({ value: p.nombre_plantel, label: p.nombre_plantel }));
        setOpcPlanteles(pOptions);

        let eOptions = espaciosRes.data.map(e => ({ value: e.nombre_espacio, label: e.nombre_espacio }));
        setOpcAreas(eOptions);
        
        setOpcProveedores(provsRes.data.map(p => ({ 
          value: p.id_proveedor, 
          label: p.nombre_proveedor 
        })));
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
        fecha: "",
        hora: "",
        horaApartado: "",
        horaFin: "",
        plantel: "",
        area: "",
        nuevoProveedorNombre: "",
        nuevoProveedorCorreo: "",
      });
    }
  }, [eventoEditando, reset]);

  const handleFormSubmit = async (data) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const google_calendar_id = user?.google_calendar_id;

      // Check if admin is adding a new provider
      let finalProveedoresIds = [...(data.proveedoresIds || [])];
      if (isAdmin && data.nuevoProveedorNombre) {
        const provRes = await axios.post(`${import.meta.env.VITE_API_URL}/proveedores`, {
          nombre_proveedor: data.nuevoProveedorNombre,
          correo_proveedor: data.nuevoProveedorCorreo || "",
        });
        finalProveedoresIds.push(provRes.data.id_proveedor);
      }

      let payload = {
        ...data,
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

      alert(eventoEditando ? "¡Evento actualizado con éxito!" : "¡Evento registrado con éxito!");
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

  const { fields, append, remove } = useFieldArray({ control, name: "invitados" });

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

  return (
    <div className="formulario-eventos-wrapper">
      <div className="formulario-header">
        <h2>{eventoEditando ? "Editar Evento" : "Crear Nuevo Evento"}</h2>
        <p>Completa los datos para registrar un evento en el sistema.</p>
      </div>

      <Form onSubmit={handleSubmit(handleFormSubmit, onFormError)}>
        <div className="form-sections-grid">
          <section className="form-section">
            <div className="section-title-wrap">
              <h3>Datos del área solicitante</h3>
            </div>

            <Input
              label="Área/Departamento solicitante"
              placeholder="Departamento que organiza el evento"
              required={true}
              error={errors.departamento?.message}
              {...register("departamento", { required: "Obligatorio" })}
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
            <h3>Datos de Invitados (Google Calendar)</h3>
            <p style={{fontSize: '0.85rem', marginBottom: '10px', color: '#666'}}>
              A estas personas se les enviará una invitación por Google Calendar al correo ingresado.
            </p>
            {fields.map((field, index) => (
              <div key={field.id} className="invitado-row">
                <Input label="Nombre del Invitado" {...register(`invitados.${index}.nombre`)} />
                <Input label="Correo del Invitado" {...register(`invitados.${index}.correo`)} />
                <Btn type="button" texto="Eliminar" onClick={() => remove(index)} />
              </div>
            ))}
            <Btn type="button" texto="+ Agregar un invitado" onClick={() => append({ nombre: "", correo: "" })} />
          </section>

          {/* SECCIÓN 1: Info Básica */}
          <section className="form-section">
            <div className="section-title-wrap">
              <h3>Información del Evento</h3>
            </div>

            <Input label="Nombre del Evento" placeholder="Ej.: Conferencia de Tecnología" required={true}
              error={errors.nombre?.message} {...register("nombre", { required: "Obligatorio" })} />

            <Input label="Público Objetivo" required={true}
              error={errors.publico?.message} {...register("publico", { required: "Obligatorio" })} />

            <Input label="Autoridades Asistentes" required={true}
              error={errors.autoridades?.message} {...register("autoridades", { required: "Obligatorio" })} />

            <Textarea label="Descripción del Evento" required={true}
              error={errors.comentarios?.message} {...register("comentarios", { required: "Obligatorio" })} />
          </section>

          {/* SECCIÓN 2: Fecha y Lugar */}
          <div className="two-cards-grid">
            <section className="form-section">
              <div className="section-title-wrap"><h3>Fecha del Evento</h3></div>
              <div className="calendario-wrapper">
                <Controller control={control} name="fecha" rules={{ required: "Requerida" }}
                  render={({ field }) => (
                    <DatePicker selected={field.value ? new Date(field.value) : null} onChange={(date) => field.onChange(date)} inline />
                  )} />
              </div>
              {errors.fecha && <span className="input-error-text text-center">{errors.fecha.message}</span>}
            </section>

            <section className="form-section">
              <div className="section-title-wrap"><h3>Lugar y Horarios</h3></div>
              <div className="FechaHoraInputs">
                <Input label="Hora de Apartado" type="time" required={true}
                  error={errors.horaApartado?.message} {...register("horaApartado", { 
                    required: "Requerida",
                    validate: (value, formValues) => !formValues.hora || value <= formValues.hora || "No puede ser posterior al inicio"
                  })} />
                <Input label="Hora de Inicio" type="time" required={true}
                  error={errors.hora?.message} {...register("hora", { required: "Requerida" })} />
                <Input label="Fin del Evento" type="time" required={true}
                  error={errors.horaFin?.message} {...register("horaFin", { 
                    required: "Requerida",
                    validate: (value, formValues) => !formValues.hora || value > formValues.hora || "Debe ser posterior a la de inicio"
                  })} />

                <Input label="Plantel del Evento" placeholder="Escribe o selecciona de la lista..." required={true}
                  list="planteles-list"
                  error={errors.plantel?.message} {...register("plantel", { required: "Obligatorio" })} />
                <datalist id="planteles-list">
                  {opcPlanteles.map(p => <option key={p.value} value={p.value} />)}
                </datalist>

                <Input label="Área a utilizar" placeholder="Escribe o selecciona de la lista..." required={true}
                  list="areas-list"
                  error={errors.area?.message} {...register("area", { required: "Obligatorio" })} />
                <datalist id="areas-list">
                  {opcAreas.map(a => <option key={a.value} value={a.value} />)}
                </datalist>
              </div>
            </section>
          </div>

          {/* SECCIÓN Cobertura (Dinámica por roles) */}
          <section className="form-section">
            <div className="section-title-wrap"><h3>Cobertura</h3></div>

            <Input label="Objetivo Académico" required={true}
              error={errors.objetivo?.message} {...register("objetivo", { required: "Obligatorio" })} />
            
            {isAdmin && (
              <>
                <Select label="Estatus" options={opcEstatus} required={true}
                  error={errors.estatus?.message} {...register("estatus", { required: "Requerido" })} />

                <div className="checkbox-group mt-3">
                  <label>Asignar Proveedores (Opcional):</label>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '8px', margin: '10px 0'}}>
                    {opcProveedores.map(p => (
                      <label key={p.value} style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                        <input type="checkbox" value={p.value} {...register("proveedoresIds")} />
                        <span>{p.label}</span>
                      </label>
                    ))}
                  </div>
                  
                  <div style={{marginTop: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px'}}>
                    <p style={{marginBottom: '10px'}}><strong>¿Agregar otro proveedor?</strong></p>
                    <Input label="Nombre del Nuevo Proveedor" {...register("nuevoProveedorNombre")} />
                    <Input label="Correo del Nuevo Proveedor (Para notificación)" {...register("nuevoProveedorCorreo")} />
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
                  <label className="radio-label">¿Requiere servicio de cobertura fotográfica y elaboración de reseña? *</label>
                  <div className="radio-options">
                    <label className="radio-option"><Input type="radio" value="si" {...register("fotografiaResena")} /><span>Sí</span></label>
                    <label className="radio-option"><Input type="radio" value="no" {...register("fotografiaResena")} /><span>No</span></label>
                  </div>
                </div>
              </div>
            </section>

            <section className="form-section">
              <div className="section-title-wrap"><h3>Apoyo a acceso</h3></div>
              <div className="radio-group">
                <label className="radio-label">¿Requiere apoyo para lugares de estacionamiento para el evento? *</label>
                <div className="radio-options">
                  <label className="radio-option"><Input type="radio" value="si" {...register("apoyoAcceso")} /><span>Sí</span></label>
                  <label className="radio-option"><Input type="radio" value="no" {...register("apoyoAcceso")} /><span>No</span></label>
                </div>
              </div>
            </section>
          </div>

          <section className="form-section">
            <div className="section-title-wrap"><h3>Apoyo de mantenimiento</h3></div>
            <div className="radio-group">
              <label className="radio-label">¿Requiere apoyo de mantenimiento para el evento? *</label>
              <div className="radio-options">
                <label className="radio-option"><Input type="radio" value="si" {...register("apoyoMantenimiento")} /><span>Sí</span></label>
                <label className="radio-option"><Input type="radio" value="no" {...register("apoyoMantenimiento")} /><span>No</span></label>
              </div>
              <Input placeholder="Ej.: Mesas(Núm.), Sillas(Núm.)..." label="Especifica lo que necesitas" {...register("Mantenimiento")} />
            </div>
          </section>

          <section className="form-section">
            <div className="section-title-wrap"><h3>Medios audiovisuales</h3></div>
            <div className="radio-group">
              <label className="radio-label">¿Requiere apoyo de medios audiovisuales? *</label>
              <div className="radio-options">
                <label className="radio-option"><Input type="radio" value="si" {...register("apoyoAudiovisual")} /><span>Sí</span></label>
                <label className="radio-option"><Input type="radio" value="no" {...register("apoyoAudiovisual")} /><span>No</span></label>
              </div>
            </div>
            <div className="checkbox-group">
              <h4>Equipos audiovisuales que requieres:</h4>
              <div className="checkbox-grid">
                {opcEquipos.map((equipo) => (
                  <Input key={equipo.value} type="checkbox" label={equipo.label} {...register(`equiposAudiovisuales.${equipo.value}`)} />
                ))}
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
