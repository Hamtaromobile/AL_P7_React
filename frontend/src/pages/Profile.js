import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Profileinfo from "../components/Profileinfo";
import Profileimg from "../components/Profileimg";
import axios from "axios";
import UploadingProf from "../components/UploadingProf";
import { NavLink } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Footer from "../components/Footer";

const Newprofile = () => {
	let params = new URL(document.location).searchParams;
	const idUser = params.get("id");
	const [dataUser, setDataUser] = useState([]);
	const urlGet = "http://localhost:3001/api/auth/getUser/";
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
		const idUserConnected = idUser;
		axios
			.get(urlGet + idUserConnected, {
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

	return (
		<section className="container-body">
			<Nav idUser={idUser} />
			<main>
				<div className="container_nav_back_profile">
					<NavLink className="nav_back_profile" to={`/Home?id=${idUser}`}>
						<ArrowBackOutlinedIcon
							className="icone_arrowback_profile"
							sx={{ fontSize: 35 }}
						/>
					</NavLink>
				</div>
				<h1 className="tt_profile">Profile</h1>
				<div className="container_prof">
					<div className="container_profileimg">
						<Profileimg dataUser={dataUser} />
					</div>
					<div className="container_profileinfo">
						<Profileinfo idUser={idUser} />
						<div>
							<UploadingProf id={idUser} />
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</section>
	);
};

export default Newprofile;
