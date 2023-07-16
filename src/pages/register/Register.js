import { useRef } from "react";
import axios from "axios";
import { useHistory } from "react-router";
import "./register.css";
import { Link } from "react-router-dom";

export default function Register() {
	const username = useRef();
	const email = useRef();
	const password = useRef();
	const passwordAgain = useRef();
	const history = useHistory();

	const handleClick = async (e) => {
		e.preventDefault();
		if (passwordAgain.current.value !== password.current.value) {
			passwordAgain.current.setCustomValidity(
				"¡Las contraseñas son diferentes!"
			);
		} else {
			const user = {
				username: username.current.value,
				email: email.current.value,
				password: password.current.value,
			};
			try {
				await axios.post("/auth/register", user);
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
							ref={username}
							placeholder="Username"
							className="logininput"
						/>
						<input
							required
							ref={email}
							placeholder="Correo"
							type="email"
							className="logininput"
						/>
						<input
							required
							ref={password}
							type="password"
							minLength="6"
							placeholder="Contraseña"
							className="logininput"
						/>
						<input
							required
							ref={passwordAgain}
							type="password"
							minLength="6"
							placeholder="Confirma Contraseña"
							className="logininput"
						/>
						<button className="loginButton" type="submit">
							Registrate
						</button>
						<Link
							to="/login"
							className="loginLinkContainer"
							style={{ textDecoration: "none" }}
						>
							<button className="loginRegisterButton">
								Ya tengo cuenta
							</button>
						</Link>
					</form>
				</div>
			</div>
		</div>
	);
}
