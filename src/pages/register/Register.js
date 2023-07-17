import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import "./register.css";
import { Link } from "react-router-dom";

export default function Register() {
  const name = useRef();
  const lastName = useRef();
  const email = useRef();
  const phone = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const subject = useRef();
  const type = useRef();
  const history = useHistory();

  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity(
        "¡Las contraseñas son diferentes!"
      );
    } else {
      const user = {
        name: name.current.value,
        lastName: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
        phone: phone.current.value,
        img: "",
        type: type.current.value,
        subject: subject.current.value,
        role: "ADMIN_ROLE",
        state: true,
        libraries: [],
      };
      try {
        await axios.post("http://localhost:4000/api/users", user);
        history.push("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Libexpo</h3>
          <span className="loginDesc">
            Comparte tus libros favoritos con tu estudiantes en Libexpo
          </span>
        </div>
        <div className="loginRight">
          <form className="registerBox" onSubmit={handleClick}>
            <input
              required
              ref={name}
              placeholder="Nombre"
              className="logininput"
              style={{ marginTop: "5px", marginBottom: "5px" }}
            />
            <input
              required
              ref={lastName}
              placeholder="Apellido"
              className="logininput"
              style={{ marginTop: "5px", marginBottom: "5px" }}
            />
            <input
              required
              ref={email}
              placeholder="Correo"
              type="email"
              className="logininput"
              style={{ marginTop: "5px", marginBottom: "5px" }}
            />
            <input
              required
              ref={phone}
              placeholder="Telefono"
              className="logininput"
              style={{ marginTop: "5px", marginBottom: "5px" }}
            />
            <input
              required
              ref={type}
              placeholder="Tipo"
              className="logininput"
              style={{ marginTop: "5px", marginBottom: "5px" }}
            />
            <input
              required
              ref={subject}
              placeholder="Materia"
              className="logininput"
              style={{ marginTop: "5px", marginBottom: "5px" }}
            />
            <input
              required
              ref={password}
              type="password"
              minLength="6"
              placeholder="Contraseña"
              className="logininput"
              style={{ marginTop: "5px", marginBottom: "5px" }}
            />
            <input
              required
              ref={passwordAgain}
              type="password"
              minLength="6"
              placeholder="Confirma Contraseña"
              className="logininput"
              style={{ marginTop: "5px", marginBottom: "5px" }}
            />
            <button
              className="loginButton"
              type="submit"
              style={{ marginTop: "5px", marginBottom: "5px" }}
            >
              Registrate
            </button>
            <Link
              to="/login"
              className="loginLinkContainer"
              style={{
                textDecoration: "none",
                marginTop: "5px",
                marginBottom: "5px",
              }}
            >
              <button className="loginRegisterButton">Ya tengo cuenta</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
