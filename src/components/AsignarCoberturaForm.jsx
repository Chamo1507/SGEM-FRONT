import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Form from "./CFormulario";
import Input from "./CInput";
import Select from "./CSelect";
import Btn from "./btn";
import axios from "axios";
import "./CFormulario.css";
import "./CInput.css";

const AsignarCoberturaForm = ({ evento, onSave, onCancel }) => {
  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      proveedores: [],
      prioridad: evento.prioridad || "Media",
      estatus: evento.estatus === "pendiente" ? "Confirmado" : (evento.estatus || "Confirmado")
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "proveedores",
  });

  const [opcProveedores, setOpcProveedores] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provsRes = await axios.get(`${import.meta.env.VITE_API_URL}/proveedores`);
        setOpcProveedores(
          provsRes.data.map((p) => ({
            value: p.id_proveedor,
            label: p.nombre_proveedor,
            correo: p.correo_proveedor || "",
          }))
        );

        // Pre-fill existing providers if any
        if (evento.proveedores && evento.proveedores !== 'Ninguno') {
          // Note: The backend 'obtenerTodos' returns a comma-separated string for proveedores
          // but maybe we don't need to prefill for this simple requirement.
          // The user specifically asked for "la funcionalidad ya existente de 'Agregar proveedor existente'"
        }
      } catch (error) {
        console.error("Error fetching providers:", error);
      }
    };
    fetchData();
  }, [evento]);

  const onSubmit = async (data) => {
    try {
      const finalProveedoresIds = [];
      if (data.proveedores && data.proveedores.length > 0) {
        for (const prov of data.proveedores) {
          if (prov.proveedorId) {
            finalProveedoresIds.push(Number(prov.proveedorId));
          }
        }
      }

      const user = JSON.parse(localStorage.getItem("user") || "{}");
      await axios.patch(`${import.meta.env.VITE_API_URL}/eventos/${evento.id}/cobertura`, {
        proveedoresIds: finalProveedoresIds,
        id_usuario: user.id_usuario,
        prioridad: data.prioridad,
        estatus: data.estatus
      });

      alert("¡Cobertura asignada con éxito!");
      if (onSave) onSave();
    } catch (error) {
      console.error(error);
      alert("Ocurrió un error al asignar cobertura.");
    }
  };

  return (
    <div className="formulario-eventos-wrapper" style={{maxWidth: '600px', margin: '0 auto'}}>
      <div className="formulario-header">
        <h2>Asignar Cobertura</h2>
        <p>Asigna proveedores al evento: {evento.nombre}</p>
      </div>
      <div className="formulario-line"></div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <section className="form-section">
          <div className="section-header-inline" style={{ display: "flex", gap: "20px", marginBottom: "16px" }}>
            <div style={{flex: 1}}>
              <Select
                label="Prioridad"
                options={[
                  { value: "Alta", label: "Alta" },
                  { value: "Media", label: "Normal / Media" },
                  { value: "Baja", label: "Baja" }
                ]}
                {...register("prioridad")}
              />
            </div>
            <div style={{flex: 1}}>
              <Select
                label="Estado"
                options={[
                  { value: "Confirmado", label: "Confirmado" },
                  { value: "Pendiente", label: "Pendiente" },
                  { value: "Cancelado", label: "Cancelado" }
                ]}
                {...register("estatus")}
              />
            </div>
          </div>

          <div className="proveedor-extra-section" style={{ marginTop: "20px" }}>
            <div className="section-header-inline" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <p style={{ margin: 0 }}><strong>¿Agregar proveedor existente?</strong></p>
              <Btn className="add-btn-small" type="button" texto="+ Añadir" onClick={() => append({ proveedorId: "", correo: "" })} />
            </div>
            
            {fields.map((field, index) => (
              <div key={field.id} className="invitado-row" style={{display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '10px'}}>
                <div style={{flex: 1}}>
                  <Select
                    label="Proveedor"
                    options={opcProveedores}
                    {...register(`proveedores.${index}.proveedorId`, {
                      onChange: (e) => {
                        const selectedId = e.target.value;
                        const prov = opcProveedores.find((p) => String(p.value) === String(selectedId));
                        if (prov) {
                          setValue(`proveedores.${index}.correo`, prov.correo, { shouldDirty: true, shouldTouch: true });
                        }
                      },
                    })}
                  />
                </div>
                <div style={{flex: 1}}>
                  <Input label="Correo" readOnly style={{ backgroundColor: "#f1f5f9" }} {...register(`proveedores.${index}.correo`)} />
                </div>
                <div style={{marginTop: '25px'}}>
                  <Btn className="delete-btn-small" type="button" texto="Eliminar" onClick={() => remove(index)} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="form-actions" style={{display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '20px'}}>
          <Btn type="button" texto="Cancelar" className="btn-secondary" onClick={onCancel} style={{backgroundColor: '#6c757d', color: 'white'}} />
          <Btn type="submit" texto="Guardar Cobertura" />
        </div>
      </Form>
    </div>
  );
};

export default AsignarCoberturaForm;
