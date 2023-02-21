import React from "react";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const Pagination = ({
	currentPage,
	totalPages,
	handleClick,
	renderPageNumbers,
}) => (
	<nav className="container_pagination">
		<ul className="ul_button_pagination">
			<li className="li_button_pagination">
				<a href="#!" onClick={() => handleClick(1)}>
					{" "}
					<KeyboardDoubleArrowLeftIcon
						className="ico_pagination"
						alt="première page"
					/>
				</a>
			</li>
			<li className="li_button_pagination">
				{currentPage !== 1 ? ( // Désactiver "Précédent" si num page :  1
					<a href="#!" onClick={() => handleClick(currentPage - 1)}>
						<KeyboardArrowLeftIcon className="ico_pagination" alt="précédent" />
					</a>
				) : (
					""
				)}
			</li>
			{/* Boucle des boutons*/}
			{renderPageNumbers.map((number) => (
				<li className="li_button_pagination" key={number}>
					<a
						href="#!"
						className={`a_button_pagination ${
							currentPage === number ? "page_button_active" : ""
						}`}
						key={number}
						onClick={() => handleClick(number)}
					>
						{number}
					</a>
				</li>
			))}
			<li className="li_button_pagination">
				{currentPage !== totalPages ? ( // Désactiver"Suivant" si num : nombre total de pages
					<a href="#!" onClick={() => handleClick(currentPage + 1)}>
						<KeyboardArrowRightIcon className="ico_pagination" alt="suivant" />
					</a>
				) : (
					""
				)}
			</li>
			<li className="li_button_pagination">
				<a href="#!" onClick={() => handleClick(totalPages)}>
					<KeyboardDoubleArrowRightIcon
						className="ico_pagination"
						alt="dernère page"
					/>
				</a>
			</li>
		</ul>
	</nav>
);

export default Pagination;
