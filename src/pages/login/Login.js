import "./login.css";
import { useContext, useRef } from "react";
import { CircularProgress } from "@material-ui/core";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const { isFetching, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Social Program</h3>
          <span className="loginDesc">
            ¡Conecta con otros programadores y comparte tus proyectos en Social
            Program!
          </span>
        </div>
        <div className="loginRight">
          <form onSubmit={handleClick} className="loginBox">
            <input
              type="email"
              placeholder="Correo"
              className="logininput"
              ref={email}
              required
            />
            <input
              type="password"
              placeholder="Contraseña"
              required
              minLength="6"
              className="logininput"
              ref={password}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress size="20px" color="white" />
              ) : (
                "Iniciar Sesión"
              )}
            </button>
            <span className="loginForgot">¿Contraseña Olvidada?</span>
            <Link
              to="/register"
              className="loginLinkContainer"
              style={{ textDecoration: "none" }}
            >
              <button className="loginRegisterButton">
                Crear Nueva Cuenta
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
