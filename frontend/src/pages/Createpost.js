import React from "react";
import Nav from "../components/Nav";
import Profileimg from "../components/Profileimg";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "../components/Footer";

const theme = createTheme({
	palette: {
		primary: {
			light: "#FFB6C1",
			main: "#FFD7D7",
			dark: "#F08080",
			contrastText: "#000",
		},
		secondary: {
			light: "#D3D3D3",
			main: "#778899",
			dark: "#4E5166",
			contrastText: "#fff",
		},
		status: {
			danger: "#FD2D01",
		},
	},
});

const Creatpost = () => {
	const [file, setFile] = useState();
	const [dataUser, setDataUser] = useState([]);
	const [title, setTitle] = useState("");
	const [text, setText] = useState("");
	const [dataErrorAxios, setDataErrorAxios] = useState("");
	const [dataResAxios, setDataResAxios] = useState("");
	const [dataResStatAxios, setDataResStatAxios] = useState("");
	const urlGetUser = "http://localhost:3001/api/auth/getUser/";
	const urlPostPost = "http://localhost:3001/api/post/createPost";
	let params = new URL(document.location).searchParams;
	const idUser = params.get("id");
	const token = JSON.parse(localStorage.getItem("token"));
	const [statusErrAxiosUser, setStatusErrAxiosUser] = useState([]);

	//logout if "get type" axios "unauthorized"
	useEffect(() => {
		if (statusErrAxiosUser === 401) {
			window.location.href = "/Login";
		}
	});

	//get data user
	useEffect(() => {
		axios
			.get(urlGetUser + idUser, {
				headers: {
					authorization: `Bearer ${token}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				setDataUser(res.data);
				console.log("res", res);
			})
			.catch((err) => {
				console.log(err);
				setStatusErrAxiosUser(err.response.status);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const titleOnChange = (e) => {
		setTitle(e.target.value);
	};

	const textOnChange = (e) => {
		setText(e.target.value);
	};

	function handleChange(e) {
		setFile(e.target.files[0]);
	}

	//chgt page
	useEffect(() => {
		if (dataResStatAxios === 201) {
			window.location.href =
				"/Innerpost?idP=" + dataResAxios.postId + "&idU=" + idUser;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dataResStatAxios === 201]);

	//submit create post
	const handleSubmit = (event) => {
		event.preventDefault();
		const token = JSON.parse(localStorage.getItem("token"));
		const date = new Date().toLocaleString();
		const formData = new FormData();
		formData.append("image", file);
		formData.append("userId", idUser);
		formData.append("title", title);
		formData.append("text", text);
		formData.append("date", date);
		formData.append("userPicture", dataUser.imageUrl);
		formData.append("userFirstName", dataUser.firstName);
		formData.append("userLastName", dataUser.lastName);
		axios
			.post(urlPostPost, formData, {
				headers: {
					authorization: `Bearer ${token}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				setDataResAxios(res.data);
				setDataResStatAxios(res.status);
			})
			.catch((err) => {
				console.log(err);
				setDataErrorAxios(err);
			});
	};

	return (
		<section className="creat_post">
			<ThemeProvider theme={theme}>
				<Nav idUser={idUser} />
				<main>
					<Box
						component="form"
						onSubmit={handleSubmit}
						noValidate
						sx={{ mt: 1 }}
					>
						<div className="container_nav_back_creatpost">
							<NavLink className="nav_back_creatpost" to={`/Home?id=${idUser}`}>
								<ArrowBackOutlinedIcon
									className="icone_arrowback_creatpost"
									sx={{ fontSize: 35 }}
								/>
							</NavLink>
						</div>
						<div className="container_tt_creatpost">
							<Typography component="h1" variant="h3">
								Create post
							</Typography>
						</div>
						<div className="bloc_creatpost">
							<div>
								<Profileimg dataUser={dataUser} />
							</div>
							<div className="container_titletextsub_creatpost">
								<div>
									<TextField
										color="secondary"
										required
										id="title"
										label="title"
										value={title}
										onChange={(e) => titleOnChange(e)}
									/>
								</div>
								<div className="container_textfield_text">
									<TextField
										className="text_field_createpost"
										color="secondary"
										multiline
										rows={9}
										required
										id="text"
										label="text"
										value={text}
										onChange={(e) => textOnChange(e)}
									/>
								</div>
								<div>
									<label htmlFor="image">
										choose picture
										<input
											name="image"
											id="image"
											type="file"
											onChange={handleChange}
										/>
									</label>
								</div>
								<div>
									<button className="btn btn-primary" type="submit">
										Submit
									</button>
									<div>
										<Typography color="#FD2D01">
											{dataErrorAxios.message}
										</Typography>
									</div>
								</div>
							</div>
						</div>
					</Box>
				</main>
			</ThemeProvider>
			<Footer />
		</section>
	);
};

export default Creatpost;
