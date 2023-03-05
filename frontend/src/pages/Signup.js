import React, { useEffect } from "react";
import Nav from "../components/Nav";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";

const Signup = () => {
	const [firstName, setFirstName] = useState("");
	const [errorFn, setErrorFn] = useState(false);
	const [allowSendFn, setAllowSendFn] = useState(false);
	const [lastName, setLastName] = useState("");
	const [errorLn, setErrorLn] = useState(false);
	const [allowSendLn, setAllowSendLn] = useState(false);
	const [employment, setEmployment] = useState("");
	const [errorE, setErrorE] = useState(false);
	const [allowSendE, setAllowSendE] = useState(false);
	const [email, setEmail] = useState("");
	const [errorEmail, setErrorEmail] = useState(false);
	const [allowSendEmail, setAllowSendEmail] = useState(false);
	const [password, setPassword] = useState("");
	const [allowSendPassword, setAllowSendPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const [allowSendConfirmPassword, setAllowSendConfirmPassword] =
		useState(false);
	const [dataErrorAxios, setDataErrorAxios] = useState("");
	const [dataResAxios, setDataResAxios] = useState("");
	const [dataIdUser, setDataIdUser] = useState("");
	const urlPost = "http://localhost:3001/api/auth/signup";

	//chgt page
	useEffect(() => {
		if (dataResAxios.status === 201) {
			window.location.href = "/Home?id=" + dataIdUser;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataResAxios.status === 201]);

	//gestion erreurs

	const firstNameOnChange = (e) => {
		setFirstName(e.target.value);
		if (!/^[a-zA-Z ]+$/.test(e.target.value) || firstName.length > 40) {
			setErrorFn(true);
			setAllowSendFn(false);
		} else {
			setErrorFn(false);
			setAllowSendFn(true);
		}
	};

	const lastNameOnChange = (e) => {
		setLastName(e.target.value);
		if (!/^[a-zA-Z ]+$/.test(e.target.value) || lastName.length > 40) {
			setErrorLn(true);
			setAllowSendLn(false);
		} else {
			setErrorLn(false);
			setAllowSendLn(true);
		}
	};

	const employmentOnChange = (e) => {
		setEmployment(e.target.value);
		if (
			!/^[a-zA-Z\u0080-\u024F\s\-)(`."']+$/.test(e.target.value) ||
			employment.length > 40
		) {
			setErrorE(true);
			setAllowSendE(false);
		} else {
			setErrorE(false);
			setAllowSendE(true);
		}
	};

	const emailOnChange = (e) => {
		setEmail(e.target.value);
		if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value) ||
			firstName.length > 40
		) {
			setErrorEmail(true);
			setAllowSendEmail(false);
		} else {
			setErrorEmail(false);
			setAllowSendEmail(true);
		}
	};

	const passwordOnChange = (e) => {
		setPassword(e.target.value);
		if (
			!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&,.;:!^¨*])[A-Za-z\d!@#$%^&,.;:!^¨*]{8,30}$/.test(
				e.target.value
			)
		) {
			setAllowSendPassword(false);
		} else {
			setAllowSendPassword(true);
		}
	};

	const confirmPasswordOnChange = (e) => {
		setConfirmPassword(e.target.value);
		if (
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&,.;:!^¨*])[A-Za-z\d!@#$%^&,.;:!^¨*]{8,30}$/.test(
				password
			) &&
			password !== e.target.value
		) {
			setAllowSendConfirmPassword(false);
		} else {
			setAllowSendConfirmPassword(true);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (
			allowSendFn ||
			allowSendLn ||
			allowSendE ||
			allowSendEmail ||
			(allowSendPassword && allowSendConfirmPassword)
		) {
			const dataSignup = {
				firstName: firstName,
				lastName: lastName,
				employment: employment,
				email: email,
				password: password,
				imageUrl: "",
			};
			axios
				.post(urlPost, dataSignup)
				.then((res) => {
					localStorage.setItem("token", JSON.stringify(res.data.token));
					setDataResAxios(res);
					setDataIdUser(res.data.userId);
				})
				.catch((err) => {
					setDataErrorAxios(err);
				});
		}
	};
	//const data = new FormData(event.currentTarget);

	return (
		<section>
			<Nav />
			<main>
				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<div className="container_signup">
						<h3>Sign Up</h3>
						<div className="mb-3">
							<label>First name</label>
							<input
								type="text"
								className="form-control"
								placeholder="First name"
								value={firstName}
								onChange={(e) => firstNameOnChange(e)}
								required
							/>
							<div>
								{errorFn && (
									<Typography color="#FD2D01">
										Veuillez écrire un Nom valide
									</Typography>
								)}
							</div>
							<div>
								{firstName.length > 40 && (
									<Typography color="#FD2D01">
										Maximum de 40 caractère autorisé
									</Typography>
								)}
							</div>
						</div>
						<div className="mb-3">
							<label>Last name</label>
							<input
								type="text"
								className="form-control"
								placeholder="Last name"
								value={lastName}
								onChange={(e) => lastNameOnChange(e)}
								required
							/>
							<div>
								{errorLn && (
									<Typography color="#FD2D01">
										Veuillez écrire un Prénom valide
									</Typography>
								)}
							</div>

							<div>
								{lastName.length > 40 && (
									<Typography color="#FD2D01">
										Maximum de 40 caractère autorisé
									</Typography>
								)}
							</div>
						</div>
						<div className="mb-3">
							<label>Employment</label>
							<input
								type="text"
								className="form-control"
								placeholder="Employment"
								value={employment}
								onChange={(e) => employmentOnChange(e)}
							/>
							<div>
								{errorE && (
									<Typography color="#FD2D01">
										Veuillez écrire un emploi valide
									</Typography>
								)}
							</div>
							<div>
								{employment.length > 40 && (
									<Typography color="#FD2D01">
										Maximum de 40 caractère autorisé
									</Typography>
								)}
							</div>
						</div>
						<div className="mb-3">
							<label>Email address</label>
							<input
								type="email"
								className="form-control"
								placeholder="Enter email"
								value={email}
								onChange={(e) => emailOnChange(e)}
							/>
							<div>
								{errorEmail && (
									<Typography color="#FD2D01">
										Veuillez écrire une adresse email valide
									</Typography>
								)}
							</div>
							<div>
								{email.length > 40 && (
									<Typography color="#FD2D01">
										Maximum de 40 caractère autorisé
									</Typography>
								)}
							</div>
						</div>
						<div className="mb-3">
							<label
								style={{
									color:
										/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&,.;:!^¨*])[A-Za-z\d!@#$%^&,.;:!^¨*]{8,30}$/.test(
											password
										)
											? "green"
											: "black",
								}}
							>
								Password
							</label>
							<input
								type="password"
								className="form-control"
								placeholder="Enter password"
								value={password}
								onChange={(e) => passwordOnChange(e)}
								style={{
									color:
										/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&,.;:!^¨*])[A-Za-z\d!@#$%^&,.;:!^¨*]{8,30}$/.test(
											password
										)
											? "green"
											: "black",
								}}
							/>
						</div>

						<div>
							{password.length > 30 && (
								<Typography color="#FD2D01">
									Maximum de 30 caractère autorisé
								</Typography>
							)}
						</div>

						<div className="mb-3">
							<label
								style={{
									color:
										/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&,.;:!^¨*])[A-Za-z\d!@#$%^&,.;:!^¨*]{8,30}$/.test(
											password
										) && password === confirmPassword
											? "green"
											: "black",
								}}
							>
								Confirm password
							</label>
							<input
								type="password"
								className="form-control"
								placeholder="Enter Password"
								value={confirmPassword}
								onChange={(e) => confirmPasswordOnChange(e)}
								style={{
									color:
										/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&,.;:!^¨*])[A-Za-z\d!@#$%^&,.;:!^¨*]{8,30}$/.test(
											password
										) && password === confirmPassword
											? "green"
											: "black",
								}}
							/>
						</div>
						<Typography>
							Votre mot de passe doit faire entre 8 et 30 caractère. Il doit
							contenir au moins un caractères spécial. Il doit contenir au moins
							un chiffre et une lettre.
						</Typography>
						<br />
						<div>
							<Typography color="#FD2D01">{dataErrorAxios.message}</Typography>
						</div>
						<div className="d-grid">
							<button
								type="submit"
								className="btn btn-primary"
								disabled={
									!allowSendFn ||
									!allowSendLn ||
									!allowSendE ||
									!allowSendEmail ||
									!allowSendPassword ||
									!allowSendConfirmPassword
										? true
										: false
								}
							>
								Sign Up
							</button>
						</div>
						<p className="forgot-password text-right">
							Already registered <a href="/Login">Login?</a>
						</p>
					</div>
				</Box>
			</main>
			<Footer />
		</section>
	);
};

export default Signup;
