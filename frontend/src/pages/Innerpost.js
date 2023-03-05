import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Mainpost from "../components/Mainpost";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Reply from "../components/Reply";
import { NavLink } from "react-router-dom";
import Nav from "../components/Nav";
import Pagination from "../components/Pagination";
import Footer from "../components/Footer";
import TextField from "@mui/material/TextField";

const Innerpost = () => {
	const params = new URL(document.location).searchParams;
	const idPost = params.get("idP");
	const idUser = params.get("idU");
	const token = JSON.parse(localStorage.getItem("token"));
	const [reply, setReply] = useState(false);
	const [text, setText] = useState("");
	const [file, setFile] = useState();
	const [dataErrorReplyAxios, setDataErrorReplyAxios] = useState("");
	const [dataReply, setDataReply] = useState([]);
	const [statusPostReply, setStatusPostReply] = useState("");
	const urlPostReply = "http://localhost:3001/api/reply/createReply";
	const urlGetPost = "http://localhost:3001/api/post/getOnePost/";
	const urlGetRepliesMainpost =
		"http://localhost:3001/api/reply/getRepliesMainpost/";
	const urlGetUser = "http://localhost:3001/api/auth/getUser/";
	const urlPostViewsPost = "http://localhost:3001/api/post/views/";
	const urlpushIdReplyPost = "http://localhost:3001/api/post/pushIdReply/";
	const [dataPost, setDataPost] = useState([]);
	const [dataUser, setDataUser] = useState([]);
	const [resPostReply, setResPostReply] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [repliesPerPage, setRepliesPerPage] = useState(3);
	const [statusErrAxiosUser, setStatusErrAxiosUser] = useState([]);
	const [statusErrAxiosPost, setStatusErrAxiosPost] = useState([]);
	const [statusErrAxiosReply, setStatusErrAxiosReply] = useState([]);

	//logout if "get type" axios "unauthorized"
	useEffect(() => {
		if (
			statusErrAxiosUser === 401 ||
			statusErrAxiosPost === 401 ||
			statusErrAxiosReply === 401
		) {
			window.location.href = "/Login";
		}
	});

	//event on "load"; Number views+1
	useEffect(() => {
		axios
			.post(urlPostViewsPost + idPost)
			.then((res) => {})
			.catch((err) => {});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//get data post
	useEffect(() => {
		axios
			.get(urlGetPost + idPost, {
				headers: {
					authorization: `Bearer ${token}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				setDataPost(res.data);
			})
			.catch((err) => {
				setStatusErrAxiosPost(err.response.status);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//Get data reply
	useEffect(() => {
		axios
			.get(urlGetRepliesMainpost + idPost, {
				headers: {
					authorization: `Bearer ${token}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				setDataReply(res.data);
			})
			.catch((err) => {
				setStatusErrAxiosReply(err.response.status);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//Get user
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
			})
			.catch((err) => {
				setStatusErrAxiosUser(err.response.status);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const textOnChange = (e) => {
		setText(e.target.value);
	};

	function handleChange(e) {
		setFile(e.target.files[0]);
	}

	//create reply
	const handleReply = (e) => {
		e.preventDefault();
		const date = new Date().toLocaleString();
		const formData = new FormData();
		formData.append("image", file);
		formData.append("userId", idUser);
		formData.append("text", text);
		formData.append("date", date);
		formData.append("idPost", idPost);
		formData.append("userFirstName", dataUser.firstName);
		formData.append("userLastName", dataUser.lastName);
		axios
			.post(urlPostReply, formData, {
				headers: {
					authorization: `Bearer ${token}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				setResPostReply(res.data);
				setStatusPostReply(res.status);
			})
			.catch((err) => {
				setDataErrorReplyAxios(err);
			});
	};

	// Déterminer le nombre total de pages ; retourn un entier au nbr supp
	const totalPages = Math.ceil(dataReply.length / repliesPerPage);

	// Déterminer les données à afficher pour la page actuelle ; retourne tab en spécifiant les index de départ et de fin
	const currentData = dataReply.slice(
		(currentPage - 1) * repliesPerPage,
		currentPage * repliesPerPage
	);

	//MAJ pages en cours
	const handleClick = (page) => {
		setCurrentPage(page);
	};

	// Créer un tableau pour stocker tous les numéros de page ( de 1 à totalPages)
	const pageNumbers = [];
	for (let i = 1; i <= totalPages; i++) {
		pageNumbers.push(i);
	}

	// tab qui contient nbr de boutton numéroté à afficher (ici 5)
	const renderPageNumbers = pageNumbers.slice(
		//retourne tab en spécifiant les index de départ et de fin
		Math.max(0, currentPage - 2), //début plage de num. à afficher; retourne la plus grande valeur entre 0 et currentPage - 2
		Math.min(pageNumbers.length, currentPage + 2) //fin plage de num. à afficher retourne la plus petite valeur entre pageNumbers.length et currentPage + 2
	);

	//if reply ok ; idReply => mainPost
	useEffect(() => {
		if (statusPostReply === 201) {
			const idData = { idReply: resPostReply.replyId };
			axios
				.post(urlpushIdReplyPost + idPost, idData, {
					headers: {
						authorization: `Bearer ${token}`,
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
				.then((res) => {
					window.location.reload();
				})
				.catch((err) => {});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [statusPostReply === 201]);

	//selection du nbre de posts à afficher par l'utilisateur
	const handleSelectChange = (e) => {
		setRepliesPerPage(e.target.value);
	};

	return (
		<article>
			<Nav idUser={idUser} />
			<main>
				<div className="container_nav_back_innerpost">
					<NavLink className="nav_back_innerpost" to={`/Home?id=${idUser}`}>
						<ArrowBackOutlinedIcon
							className="icone_arrowback_innerpost"
							sx={{ fontSize: 35 }}
						/>
					</NavLink>
				</div>
				<h1 className="tt_Innerpost">{dataPost.title}</h1>
				<div className="container_innerpost">
					<div className="container_mainpost_innerpost">
						<Mainpost idUser={idUser} idPost={idPost} reply={reply} />
					</div>
					<div>
						<div className="container_reply_innerpost">
							<Reply reply={reply} dataReply={currentData} />
							{dataReply.length > repliesPerPage ? (
								<Pagination
									currentPage={currentPage}
									handleClick={handleClick}
									renderPageNumbers={renderPageNumbers}
									totalPages={totalPages}
								/>
							) : (
								""
							)}
						</div>
					</div>
					<div className="display_reply_innerPost">
						<label>Affichage réponses </label>
						<select onChange={handleSelectChange}>
							<option value={3}>3</option>
							<option value={6}>6</option>
							<option value={9}>9</option>
						</select>
					</div>
					{reply ? (
						<div className="col-md-12 ">
							<div className="item_txt_area_reply_innerpost">
								<TextField
									sx={{ width: "90%", marginTop: "20px", fontSize: "20px" }}
									fullWidth
									multiline
									rows={15}
									id="text"
									label="texte"
									autoFocus
									value={text}
									onChange={(e) => textOnChange(e)}
									InputProps={{
										style: { fontSize: "18px" },
									}}
								/>
							</div>
							<div className="container_btn_reply_innerpost">
								<div>
									<button
										type="button"
										onClick={() => setReply(false)}
										className="btn btn-secondary item_btn"
									>
										cancel
									</button>
								</div>
								<div>
									<input
										className="btn btn-light item_btn"
										type="file"
										onChange={handleChange}
									/>
								</div>
								<div>
									<button
										type="submit"
										onClick={(e) => handleReply(e)}
										className="btn btn-primary item_btn"
									>
										send
									</button>
								</div>
							</div>
						</div>
					) : (
						<button
							type="button"
							onClick={() => setReply(true)}
							className="btn_reply_innerpost"
						>
							reply
						</button>
					)}
					<p className="error_innerpost">{dataErrorReplyAxios}</p>
				</div>
			</main>
			<Footer />
		</article>
	);
};

export default Innerpost;
