import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

import maxSgmLogo from "../assets/brand/MAX-SGM.png";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === "remember") {
      setRemember(checked);
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (!form.email.trim().toLowerCase().endsWith("@umad.edu.mx")) {
      setError("Por favor, utiliza tu correo institucional (@umad.edu.mx)");
      return;
    }
    
    setError("");
    console.log("Intento de login:", form, { remember });
    navigate("/");
  };

  return (
    <div className="login-page">
      <img src={maxSgmLogo} alt="MAX SGM" className="login-max-page-bg" />
      <div className="login-container">
        <div className="login-branding">
          <div className="branding-content">
            <h1>SGM</h1>
            <p>Sistema de Gestión Madero.</p>
          </div>
        </div>
        <div className="login-card">
          <div className="login-header">
            <h2>Bienvenido de nuevo</h2>
            <p>Ingresa tus credenciales para acceder a tu cuenta.</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && <div className="login-error">{error}</div>}
            <div className="input-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="ejemplo@umad.edu.mx"
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Contraseña</label>
              <input
                id="password"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
              />
            </div>

            <div className="login-actions">
              <label className="remember-me">
                <input
                  type="checkbox"
                  name="remember"
                  checked={remember}
                  onChange={handleChange}
                />
                Recordarme
              </label>
              <a href="#" className="forgot-password">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button className="login-button" type="submit">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
