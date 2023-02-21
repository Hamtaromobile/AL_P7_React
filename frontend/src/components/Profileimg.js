import React from "react";

const Profileimg = ({ dataUser }) => {
	return (
		<aside className="container_profileimg">
			<div className="card mb-4 mb-xl-0">
				<div className="card-header">Welcome {dataUser.firstName}</div>
				<div className="card-body text-center">
					<div className="container-img">
						<img
							className="img-account-profile rounded-circle mb-2"
							src={dataUser.imageUrl !== undefined ? dataUser.imageUrl : ""}
							alt="Profil"
							style={{
								border:
									dataUser.imageUrl !== undefined ? "1px  solid #FD2D01" : "",
							}}
						/>
					</div>
					<p className="employment">{dataUser.employment}</p>
				</div>
			</div>
		</aside>
	);
};

export default Profileimg;
