import style from "./auth.module.css"
import { useState } from "react"

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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

    setError("");
    console.log({ name, email, password, confirmPassword });
  }

  return (
    <>
      <section className={style.container}>
        <div className={style.card}>
          <h2 className={style.title}>Resgistrate</h2>        

          {error && <p style={{ color: "red" }}>{error}</p>}

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

                <p className={style.text}>¿Ya tienes una cuenta? <a className={style.a} href="/login">Log in</a></p>
            </form>
          </div>
      </section>
    </>
  )
}

export default Register