import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import TextField from "@mui/material/TextField";

const Mainpost = ({ idPost, reply }) => {
	const urlGetUser = "http://localhost:3001/api/auth/getUser/";
	const urlGetPost = "http://localhost:3001/api/post/getOnePost/";
	const urlDeletePost = "http://localhost:3001/api/post/deletePost/";
	const urlPostPost = "http://localhost:3001/api/post/modifyPost/";
	const urlPostLikeDisPost = "http://localhost:3001/api/post/likeDislikePost/";
	const urlDeleteReply = "http://localhost:3001/api/reply/deleteReply/";
	const token = JSON.parse(localStorage.getItem("token"));
	const [dataUser, setDataUser] = useState([]);
	const [dataPost, setDataPost] = useState([]);
	const [editing, setEditing] = useState(false);
	const [editText, setEditText] = useState("");
	const [editTitle, setEditTitle] = useState("");
	const [statusGetPost, setStatusGetPost] = useState("");
	const [file, setFile] = useState();
	let like;
	const tabUserLike = dataPost.usersLiked;
	const tabUserDisLike = dataPost.usersDisliked;
	const [likeHere, setLikeHere] = useState(false);
	const [disLikeHere, setDisLikeHere] = useState(false);
	const [dataErrorAxios, setDataErrorAxios] = useState("");
	const params = new URL(document.location).searchParams;
	const idUserConnected = params.get("idU");
	const [userConnected, setUserConnected] = useState("");
	const [statusDeletedPost, setStatusDeletedPost] = useState("");

	//get data post
	useEffect(() => {
		if (idPost !== undefined) {
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
					setStatusGetPost(res.status);
				})
				.catch((err) => {});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// présence like/dis pr couleurs icones
	useEffect(() => {
		if (tabUserLike !== undefined) {
			tabUserLike.includes(idUserConnected)
				? setLikeHere(true)
				: setLikeHere(false);
		}
		if (tabUserDisLike !== undefined) {
			tabUserDisLike.includes(idUserConnected)
				? setDisLikeHere(true)
				: setDisLikeHere(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [statusGetPost === 200]);

	//Get data user who created main post
	useEffect(() => {
		if (dataPost.userId !== undefined) {
			const getUserReq = async () => {
				try {
					const res = await axios.get(urlGetUser + dataPost.userId, {
						headers: {
							authorization: `Bearer ${token}`,
							Accept: "application/json",
							"Content-Type": "application/json",
						},
					});
					setDataUser(res.data);
				} catch (err) {}
			};
			getUserReq();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [statusGetPost === 200]);

	//Get data user connected
	useEffect(() => {
		const getUserReq = async () => {
			try {
				const res = await axios.get(urlGetUser + idUserConnected, {
					headers: {
						authorization: `Bearer ${token}`,
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				});
				setUserConnected(res.data);
			} catch (err) {}
		};
		getUserReq();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [statusGetPost === 200]);

	//Delete main post
	const handleDelete = () => {
		axios
			.delete(urlDeletePost + idPost, {
				headers: {
					authorization: `Bearer ${token}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				setStatusDeletedPost(res.status);
			})
			.catch((err) => {});
	};

	//delete reply's mainpost if exist
	useEffect(() => {
		if (statusDeletedPost === 200 && dataPost.idReplies.length !== 0) {
			for (let i = 0; i <= dataPost.idReplies.length; i++) {
				axios
					.delete(urlDeleteReply + dataPost.idReplies[i], {
						headers: {
							authorization: `Bearer ${token}`,
							Accept: "application/json",
							"Content-Type": "application/json",
						},
					})
					.then((res) => {})
					.catch((err) => {
						setDataErrorAxios(err);
					});
			}
			window.location.href = "/Home?id=" + idUserConnected;
		} else if (statusDeletedPost === 200 && dataPost.idReplies.length === 0) {
			window.location.href = "/Home?id=" + idUserConnected;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [statusDeletedPost === 200]);

	//submit change
	const handleSubmit = (event) => {
		event.preventDefault();
		const editDate = new Date().toLocaleString();
		const formData = new FormData();
		//keep data
		if (editTitle.length === 0) {
			formData.append("title", dataPost.title);
		} else {
			formData.append("title", editTitle);
		}
		if (editText.length === 0) {
			formData.append("text", dataPost.text);
		} else {
			formData.append("text", editText);
		}
		formData.append("image", file);
		formData.append("userId", dataPost.userId);
		formData.append("editDate", editDate);
		axios
			.put(urlPostPost + idPost, formData, {
				headers: {
					authorization: `Bearer ${token}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				window.location.reload();
			})
			.catch((err) => {
				setDataErrorAxios(err);
			});
	};

	function handleChange(e) {
		setFile(e.target.files[0]);
	}

	//submit like
	const handleLike = () => {
		if (tabUserDisLike.includes(idUserConnected)) {
			return 0;
		} else {
			if (tabUserLike.includes(idUserConnected)) {
				like = 0;
			} else {
				like = 1;
			}
			const dataLike = {
				like,
				userId: idUserConnected,
			};
			axios
				.post(urlPostLikeDisPost + idPost, dataLike, {
					headers: {
						authorization: `Bearer ${token}`,
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
				.then((res) => {
					window.location.reload();
				})
				.catch((err) => {
					setDataErrorAxios(err);
				});
		}
	};

	//submit dislike
	const handledisLike = () => {
		if (tabUserLike.includes(idUserConnected)) {
			return 0;
		} else {
			if (tabUserDisLike.includes(idUserConnected)) {
				like = 0;
			} else {
				like = -1;
			}
			const dataLike = {
				like,
				userId: idUserConnected,
			};
			axios
				.post(urlPostLikeDisPost + idPost, dataLike, {
					headers: {
						authorization: `Bearer ${token}`,
						Accept: "application/json",
						"Content-Type": "application/json",
					},
				})
				.then((res) => {
					window.location.reload();
				})
				.catch((err) => {
					setDataErrorAxios(err);
				});
		}
	};

	return (
		<article>
			<link
				href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"
				rel="stylesheet"
				id="bootstrap-css"
			/>
			<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
			<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
			<div className="container">
				<div id="blog" className="row">
					<div className="col-md-10 blogShort">
						{editing ? (
							<div>
								<TextField
									defaultValue={editTitle ? editTitle : dataPost.title}
									id="title"
									label="title"
									onChange={(e) => setEditTitle(e.target.value)}
									InputProps={{
										style: { fontSize: "18px" },
									}}
								/>
							</div>
						) : (
							""
						)}
						<p>
							le {dataPost.date} par {dataUser.firstName} {dataUser.lastName}{" "}
						</p>
						<div className="container_edit_mainpost">
							{dataPost.editDate ? <em>édité le {dataPost.editDate}</em> : ""}
						</div>
						{dataPost.imageUrl ? (
							<img
								src={dataPost.imageUrl}
								alt="post img"
								className="pull-left img-responsive thumb margin10 img-thumbnail"
							/>
						) : (
							""
						)}
						<div>
							{editing ? (
								<div>
									<TextField
										defaultValue={editText ? editText : dataPost.text}
										fullWidth
										multiline
										rows={15}
										id="text"
										label="texte"
										onChange={(e) => setEditText(e.target.value)}
										InputProps={{
											style: { fontSize: "18px" },
										}}
									/>
								</div>
							) : (
								<p className="txt_mainpost">
									{editText ? editText : dataPost.text}
								</p>
							)}
						</div>
						<div className="container_btn_like_dis">
							{editing || reply ? (
								""
							) : (
								<div className="container_like_dis">
									<p className="item_nbr_like">{dataPost.likes}</p>
									<span type="submit" onClick={handleLike}>
										<ThumbUpAltIcon
											className="item_like"
											sx={{ fontSize: 40 }}
											style={{
												color: likeHere ? "darkgreen" : "grey",
											}}
										/>
									</span>
									<p className="item_nbr_dislike">{dataPost.dislikes}</p>
									<span type="submit" onClick={handledisLike}>
										<ThumbDownAltIcon
											className="item_dislike"
											sx={{ fontSize: 40 }}
											style={{
												color: disLikeHere ? "darkred" : "grey",
											}}
										/>
									</span>
								</div>
							)}
							<div className="container_button_mp">
								<div>
									{!editing &&
									!reply &&
									(dataPost.userId === idUserConnected ||
										userConnected.isAdmin) ? (
										<button
											type="button"
											onClick={() => setEditing(true)}
											className="btn btn-primary item_btn"
										>
											Edit
										</button>
									) : (
										""
									)}
									{editing ? (
										<button
											type="button"
											onClick={() => setEditing(false)}
											className="btn btn-secondary item_btn"
										>
											cancel
										</button>
									) : (
										""
									)}
								</div>
								<div>
									{editing ? (
										<button
											type="button"
											className="btn btn-danger item_btn"
											onClick={() => {
												if (
													window.confirm(
														"Voulez-vous vraiment supprimer ce post ?"
													)
												) {
													handleDelete();
												}
											}}
										>
											Delete
										</button>
									) : (
										""
									)}
								</div>
								<div>
									{editing ? (
										<button
											type="submit"
											className="btn btn-success item_btn"
											onClick={handleSubmit}
										>
											confirm
										</button>
									) : (
										""
									)}
								</div>
								<div>
									{editing ? (
										<input
											className="btn btn-light item_btn"
											type="file"
											onChange={handleChange}
										/>
									) : (
										""
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="err_send">{dataErrorAxios}</div>
			</div>
		</article>
	);
};

export default Mainpost;
