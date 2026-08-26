import style from "./auth.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [succes, setSucces] = useState("");
  const [error, setError] = useState("");

  const message = succes ? (<p style={{color: "green"}}>{succes}</p>) : (<p style={{color: "red"}}>{error}</p>)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSucces("");

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (!email.includes("@")) {
      setError("El correo no es válido");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/adduser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Error al registrar usuario");
        return;
      }

      console.log("Usuario registrado:", data);

      setSucces("Usuario creado con exito");

      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (error) {
      console.error(error);
      setError("Error de conexion con el servidor");
    }
  };

  return (
    <>
      <section className={style.container}>
        <div className={style.card}>
          <h2 className={style.title}>Resgistrate</h2>

          {message}

          <form className={style.form} onSubmit={handleSubmit}>
            <label className={style.text}>Nombre de Usuario</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre completo"
              className={style.input}
            />

            <label className={style.text}>Correo electrónico</label>
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

            <label className={style.text}>Confirma la Contraseña</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Contraseña"
              className={style.input}
            />

            <button type="submit" className={style.button}>
              Registrarse
            </button>

            <p className={style.text}>
              ¿Ya tienes una cuenta?{" "}
              <Link className={style.a} to="/login">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </section>
    </>
  );
}

export default Register;