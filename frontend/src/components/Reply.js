import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import TextField from "@mui/material/TextField";

const Reply = ({ dataReply, reply }) => {
	const urlGetUser = "http://localhost:3001/api/auth/getUser/";
	const urlDeleteReply = "http://localhost:3001/api/reply/deleteReply/";
	const urlPutReply = "http://localhost:3001/api/reply/modifyReply/";
	const urlPutLikeDisReply =
		"http://localhost:3001/api/reply/likeDislikeReply/";
	const urlpullIdReplyPost = "http://localhost:3001/api/post/pullIdReply/";
	const token = JSON.parse(localStorage.getItem("token"));
	const [editing, setEditing] = useState(false);
	const [editText, setEditText] = useState("");
	const [file, setFile] = useState();
	let like;
	const [dataErrorAxios, setDataErrorAxios] = useState("");
	const params = new URL(document.location).searchParams;
	const idUserConnected = params.get("idU");
	const [UserConnected, setUserConnected] = useState("");
	const [statusDeletedReply, setStatusDeletedReply] = useState("");
	const [deleteIdReply, setDeleteIdReply] = useState("");
	const [deleteIdMainPost, setDeleteIdMainPost] = useState("");
	const [editingItemId, setEditingItemId] = useState(null);

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
	}, []);

	//Delete reply
	function handleDelete(dataReply) {
		setDeleteIdReply(dataReply._id);
		setDeleteIdMainPost(dataReply.idPost);
		axios
			.delete(urlDeleteReply + dataReply._id, {
				headers: {
					authorization: `Bearer ${token}`,
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				setStatusDeletedReply(res.status);
			})
			.catch((err) => {
				setDataErrorAxios(err);
			});
	}

	//if delete reply ok ; idReply pull mainPost
	useEffect(() => {
		if (statusDeletedReply === 200) {
			const idData = { idReply: deleteIdReply };
			axios
				.post(urlpullIdReplyPost + deleteIdMainPost, idData, {
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
	}, [statusDeletedReply === 200]);

	//submit change
	const handleSubmit = (dataReply) => {
		const editDate = new Date().toLocaleString();
		const formData = new FormData();
		//keep data
		if (editText.length === 0) {
			formData.append("text", dataReply.text);
		} else {
			formData.append("text", editText);
		}
		formData.append("image", file);
		formData.append("userId", dataReply.userId);
		formData.append("editDate", editDate);
		axios
			.put(urlPutReply + dataReply._id, formData, {
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
	const handleLike = (dataReply) => {
		if (dataReply.usersDisliked.includes(idUserConnected)) {
			return 0;
		} else {
			if (dataReply.usersLiked.includes(idUserConnected)) {
				like = 0;
			} else {
				like = 1;
			}
			const dataLike = {
				like,
				userId: idUserConnected,
			};
			axios
				.post(urlPutLikeDisReply + dataReply._id, dataLike, {
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
	const handledisLike = (dataReply) => {
		const tabUserLike = dataReply.usersLiked;
		const tabUserDisLike = dataReply.usersDisliked;
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
				.post(urlPutLikeDisReply + dataReply._id, dataLike, {
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

	const handleEditClick = (dataReplyId) => {
		setEditing(!editing);
		setEditingItemId(dataReplyId);
	};

	return (
		<ul className="reply">
			{dataReply.map((dataReply) => (
				<li key={dataReply._id}>
					<article className="container_reply">
						<link
							href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css"
							rel="stylesheet"
							id="bootstrap-css"
						/>
						<script src="//netdna.bootstrapcdn.com/bootstrap/3.0.0/js/bootstrap.min.js"></script>
						<script src="//code.jquery.com/jquery-1.11.1.min.js"></script>
						<div className="container">
							<div className="row">
								<div className="col-md-10 blogShort">
									<p>
										le {dataReply.date} par {dataReply.userFirstName}{" "}
										{dataReply.userLastName}{" "}
									</p>
									{dataReply.editDate ? (
										<em>édité le {dataReply.editDate}</em>
									) : (
										""
									)}
									{dataReply.imageUrl ? (
										<img
											src={dataReply.imageUrl}
											alt="post img"
											className="pull-left img-responsive thumb margin10 img-thumbnail"
										/>
									) : (
										""
									)}
									<div>
										{editing && dataReply._id === editingItemId ? (
											<div>
												<TextField
													defaultValue={editText ? editText : dataReply.text}
													fullWidth
													multiline
													rows={15}
													id="text"
													label="texte"
													autoFocus
													onChange={(e) => setEditText(e.target.value)}
													InputProps={{
														style: { fontSize: "18px" },
													}}
												/>
											</div>
										) : (
											<p className="txt_reply">
												{editText ? editText : dataReply.text}
											</p>
										)}
									</div>
									<div className="container_btn_like_dis_reply">
										{(editing && dataReply._id === editingItemId) || reply ? (
											""
										) : (
											<div className="container_like_dis_reply">
												<p className="item_nbr_like_reply">{dataReply.likes}</p>
												<span
													type="submit"
													onClick={() => {
														handleLike(dataReply);
													}}
												>
													<ThumbUpAltIcon
														className="item_like_reply"
														sx={{ fontSize: 40 }}
														style={{
															color: dataReply.usersLiked.includes(
																idUserConnected
															)
																? "darkgreen"
																: "grey",
														}}
													/>
												</span>
												<p className="item_nbr_dislike_reply">
													{dataReply.dislikes}
												</p>
												<span
													type="submit"
													onClick={() => {
														handledisLike(dataReply);
													}}
												>
													<ThumbDownAltIcon
														className="item_dislike_reply"
														sx={{ fontSize: 40 }}
														style={{
															color: dataReply.usersDisliked.includes(
																idUserConnected
															)
																? "darkred"
																: "grey",
														}}
													/>
												</span>
											</div>
										)}

										<div className="container_button_mp_reply">
											<div>
												{!editing &&
												!reply &&
												(dataReply.userId === idUserConnected ||
													UserConnected.isAdmin) ? (
													<button
														type="button"
														onClick={() => handleEditClick(dataReply._id)}
														className="btn btn-primary item_btn_reply"
													>
														Edit
													</button>
												) : (
													""
												)}

												{editing && dataReply._id === editingItemId ? (
													<button
														type="button"
														onClick={() => handleEditClick(dataReply._id)}
														className="btn btn-secondary item_btn_reply"
													>
														cancel
													</button>
												) : (
													""
												)}
											</div>
											<div>
												{editing && dataReply._id === editingItemId ? (
													<button
														type="button"
														className="btn btn-danger item_btn_reply"
														onClick={() => {
															if (
																window.confirm(
																	"Voulez-vous vraiment supprimer ce post ?"
																)
															) {
																handleDelete(dataReply);
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
												{editing && dataReply._id === editingItemId ? (
													<button
														type="submit"
														className="btn btn-success item_btn_reply"
														onClick={() => {
															handleSubmit(dataReply);
														}}
													>
														confirm
													</button>
												) : (
													""
												)}
											</div>
											<div>
												{editing && dataReply._id === editingItemId ? (
													<input
														className="btn btn-light item_btn_reply"
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
							<div className="err_send_reply">{dataErrorAxios}</div>
						</div>
					</article>
				</li>
			))}
		</ul>
	);
};

export default Reply;
