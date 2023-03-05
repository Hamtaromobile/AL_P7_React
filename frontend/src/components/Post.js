import VisibilityIcon from "@mui/icons-material/Visibility";
import MessageIcon from "@mui/icons-material/Message";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { NavLink } from "react-router-dom";

const Post = ({ dataPost, idUser }) => {
	return (
		<section>
			<ul>
				{dataPost.map((dataPost) => (
					<NavLink
						className="nav_back_profile"
						to={`/Innerpost?idU=${idUser}&idP=${dataPost._id}`}
						key={dataPost._id}
					>
						<li className="li_post">
							<div className="container_post">
								<div className="container_logo_post">
									<img
										className="logo_post"
										src="/images/icon-left-font.png"
										alt="icone groupomania"
									/>
								</div>
								<div className="container_tt_txt_post">
									<div className="container_tt_ico_post">
										<TableRowsIcon />
										<h2>{dataPost.title}</h2>
									</div>
									<div className="container_text_post">
										<p>{dataPost.text}</p>
									</div>
								</div>
								<div>
									<VisibilityIcon className="icon_visi_post" />
									{dataPost.views}
								</div>
								<div>
									<MessageIcon className="icon_mess_post" />
									{dataPost.idReplies.length}
								</div>
								<div className="container_auth_img_date_post">
									<p>
										{dataPost.userFirstName} {dataPost.userLastName}
									</p>
									<div>
										<img
											className="item_img_post"
											src={
												dataPost.userPicture !== undefined
													? dataPost.userPicture
													: ""
											}
											alt="Profil"
											style={{
												border:
													dataPost.userPicture !== undefined
														? "1px  solid #FD2D01"
														: "",
											}}
										/>
									</div>
									<div className="container_date">{dataPost.date}</div>
								</div>
							</div>
						</li>
					</NavLink>
				))}
			</ul>
		</section>
	);
};

export default Post;
