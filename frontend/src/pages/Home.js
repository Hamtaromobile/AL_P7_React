import Nav from "../components/Nav";
import Profileimg from "../components/Profileimg";
import Footer from "../components/Footer";
import Post from "../components/Post";
import { NavLink } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";

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

const Home = () => {
	let params = new URL(document.location).searchParams;
	const idUser = params.get("id");
	const [dataUser, setDataUser] = useState([]);
	const [dataPost, setDataPost] = useState([]);
	const [statusErrAxiosUser, setStatusErrAxiosUser] = useState([]);
	const [statusErrAxiosPost, setStatusErrAxiosPost] = useState([]);
	const urlGetUser = "http://localhost:3001/api/auth/getUser/";
	const urlGetAllPost = "http://localhost:3001/api/post/getAllPost/";
	const token = JSON.parse(localStorage.getItem("token"));
	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage, setPostsPerPage] = useState(3);

	//logout if "get type" axios "unauthorized"
	useEffect(() => {
		if (statusErrAxiosUser === 401 || statusErrAxiosPost === 401) {
			window.location.href = "/Login";
		}
	});

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
				console.log(err);
				setStatusErrAxiosUser(err.response.status);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//Get all post
	useEffect(() => {
		axios
			.get(urlGetAllPost, {
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
				console.log(err);
				setStatusErrAxiosPost(err.response.status);
			});
	}, []);

	// Déterminer le nombre total de pages ; retourn un entier au nbr supp
	const totalPages = Math.ceil(dataPost.length / postsPerPage);

	// Déterminer les données à afficher pour la page actuelle ; retourne tab en spécifiant les index de départ et de fin
	const currentData = dataPost.slice(
		(currentPage - 1) * postsPerPage,
		currentPage * postsPerPage
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

	//selection du nbre de posts à afficher par l'utilisateur
	const handleSelectChange = (e) => {
		setPostsPerPage(e.target.value);
	};

	return (
		<ThemeProvider theme={theme}>
			<Nav idUser={idUser} />
			<div className="container_home">
				<div className="container_tt_home">
					<h1>Groupomania post</h1>
				</div>
				<div className="container_imgbtn_post_home">
					<div className="container_imgbtn_home">
						<NavLink to={`/Profile?id=${idUser}`}>
							<div className="item_profileimg_home">
								<Profileimg dataUser={dataUser} />
							</div>
						</NavLink>
						<div>
							<NavLink to={`/createPost?id=${idUser}`}>
								<span className="btn_crtp_home">Create post</span>
							</NavLink>
						</div>
					</div>
					<div>
						<div className="display_post_home">
							<label>Affichage posts : </label>
							<select onChange={handleSelectChange}>
								<option value={3}>3</option>
								<option value={6}>6</option>
								<option value={9}>9</option>
							</select>
						</div>
						<div className="post_home">
							<Post dataPost={currentData} />
						</div>
						{dataPost.length > postsPerPage ? (
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
			</div>
			<Footer />
		</ThemeProvider>
	);
};

export default Home;
