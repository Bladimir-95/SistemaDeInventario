import style from "./auth.module.css";
import { useState } from "react";
import React from 'react';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if(!email || !password) {
            setError("Todos los campos son obligatorios");
            return;
        }

        if(!email.includes("@")){
            setError("El correo no es valido");
            return;
        }

        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres");
            return;
        }

        setError("");
        console.log({email, password})
    }

  return (
    <>
        <section className={style.container}>
            <div className={style.card} style={{ height: '400px'}}>
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

                            <button type="submit" className={style.button}>Inicia Sesión</button>                            
                    </form>
            </div>
        </section>
    </>
  )
}

export default Login