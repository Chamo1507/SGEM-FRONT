import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import "./login.css";
import maxSgmLogo from "../assets/brand/MAX-SGM.png";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async (data) => {
    try {
      setErrorMsg("");
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          nombre_usuario: data.nombre_usuario,
          apellidop_usuario: data.apellidop_usuario,
          apellidom_usuario: data.apellidom_usuario,
          correo_usuario: data.correo_usuario,
          contrasena_usuario: data.contrasena_usuario,
          telefono_usuario: data.telefono_usuario,
          id_rol: parseInt(data.id_rol, 10),
        },
      );
      alert("Cuenta creada exitosamente. Ahora puedes iniciar sesión.");
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMsg(
        error.response?.data?.message ||
          error.message ||
          "Error al crear cuenta",
      );
    }
  };

  return (
    <div className="login-page">
      <img src={maxSgmLogo} alt="MAX SGM" className="login-max-page-bg" />
      <div className="login-container" style={{ maxWidth: "1000px" }}>
        <div className="login-branding">
          <div className="branding-content">
            <h1>SGM</h1>
            <p>
              Únete al Sistema de Gestión Madero y comenzemos nuevas historias.
            </p>
          </div>
        </div>
        <div className="login-card" style={{ padding: "40px 48px" }}>
          <div className="login-header" style={{ marginBottom: "24px" }}>
            <h2>Crear Cuenta</h2>
            <p>Ingresa tus datos para registrarte.</p>
          </div>

          <form
            className="login-form"
            onSubmit={handleSubmit(onSubmit)}
            style={{ gap: "16px" }}
          >
            {errorMsg && <div className="login-error">{errorMsg}</div>}

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <div className="input-group" style={{ flex: "1 1 30%" }}>
                <label>Nombre(s)</label>
                <input
                  type="text"
                  {...register("nombre_usuario", { required: true })}
                  placeholder="Juan"
                />
                {errors.nombre_usuario && (
                  <span
                    style={{
                      color: "var(--umad-red)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    Requerido
                  </span>
                )}
              </div>
              <div className="input-group" style={{ flex: "1 1 30%" }}>
                <label>Apellido Paterno</label>
                <input
                  type="text"
                  {...register("apellidop_usuario", { required: true })}
                  placeholder="Pérez"
                />
                {errors.apellidop_usuario && (
                  <span
                    style={{
                      color: "var(--umad-red)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    Requerido
                  </span>
                )}
              </div>
              <div className="input-group" style={{ flex: "1 1 30%" }}>
                <label>Apellido Materno</label>
                <input
                  type="text"
                  {...register("apellidom_usuario", { required: true })}
                  placeholder="López"
                />
                {errors.apellidom_usuario && (
                  <span
                    style={{
                      color: "var(--umad-red)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    Requerido
                  </span>
                )}
              </div>
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <div className="input-group" style={{ flex: "2 1 60%" }}>
                <label>Correo Electrónico</label>
                <input
                  type="email"
                  {...register("correo_usuario", { required: true })}
                  placeholder="ejemplo@umad.edu.mx"
                />
                {errors.correo_usuario && (
                  <span
                    style={{
                      color: "var(--umad-red)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    Requerido
                  </span>
                )}
              </div>
              <div className="input-group" style={{ flex: "1 1 30%" }}>
                <label>Teléfono</label>
                <input
                  type="text"
                  {...register("telefono_usuario", {
                    required: true,
                    maxLength: 10,
                  })}
                  placeholder="1234567890"
                />
                {errors.telefono_usuario && (
                  <span
                    style={{
                      color: "var(--umad-red)",
                      fontSize: "0.8rem",
                      fontWeight: 600,
                    }}
                  >
                    Requerido (Máx 10)
                  </span>
                )}
              </div>
            </div>

            <div className="input-group">
              <label>Contraseña</label>
              <input
                type="password"
                {...register("contrasena_usuario", {
                  required: true,
                  minLength: 6,
                })}
                placeholder="••••••••"
              />
              {errors.contrasena_usuario && (
                <span
                  style={{
                    color: "var(--umad-red)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  Mínimo 6 caracteres
                </span>
              )}
            </div>

            <div className="input-group">
              <label>Rol</label>
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  flexWrap: "wrap",
                  marginTop: "4px",
                }}
              >
                <label className="remember-me">
                  <input
                    type="radio"
                    value="1"
                    {...register("id_rol", { required: true })}
                  />{" "}
                  Root
                </label>
                <label className="remember-me">
                  <input
                    type="radio"
                    value="2"
                    {...register("id_rol", { required: true })}
                  />{" "}
                  Coordinador
                </label>
                <label className="remember-me">
                  <input
                    type="radio"
                    value="3"
                    {...register("id_rol", { required: true })}
                  />{" "}
                  Invitado
                </label>
                <label className="remember-me">
                  <input
                    type="radio"
                    value="4"
                    {...register("id_rol", { required: true })}
                  />{" "}
                  Administrativo
                </label>
              </div>
              {errors.id_rol && (
                <span
                  style={{
                    color: "var(--umad-red)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                  }}
                >
                  Selecciona un rol
                </span>
              )}
            </div>

            <button
              className="login-button"
              type="submit"
              style={{ marginTop: "8px" }}
            >
              Registrarse
            </button>
            <div
              style={{
                marginTop: "0.5rem",
                textAlign: "center",
                fontSize: "0.9rem",
              }}
            >
              ¿Ya tienes cuenta?{" "}
              <Link
                to="/"
                style={{
                  color: "var(--umad-blue)",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Inicia sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
