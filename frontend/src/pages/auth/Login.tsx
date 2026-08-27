import style from "./auth.module.css";
import { useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!email.includes("@")) {
      setError("El correo no es valido");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    console.log({ email, password });

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      })

      const data = await response.json();

      if(!response.ok) {
        setError(data.message || "Error al logearse");
        return;
      }

     
      navigate("/getProduct")
    } catch (error) {
      console.error(error);
      setError("No se pudo conectar con el servidor")
    }
  };

  return (
    <>
      <section className={style.container}>
        <div className={style.card} style={{ height: "400px" }}>
          <h2 className={style.title}>Inicia Sesión</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={handleSubmit} className={style.form}>
            <label className={style.text}>Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ejemplo@gmail.com"
              className={style.input}
            />

            <label className={style.text}>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              className={style.input}
            />

            <button type="submit" className={style.button}>
              Inicia Sesión
            </button>

            <p className={style.text}>
              ¿No tienes una cuenta?{" "}
              <Link className={style.a} to="/register">
                Registrarse
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default Login;
