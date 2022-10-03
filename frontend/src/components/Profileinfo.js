import React from "react";

const Profileinfo = () => {
  return (
    <div>
      <div className="col-xl-8">
        <div className="card mb-4">
          <div className="card-header">Account Details</div>
          <div className="card-body">
            <form>
              <div className="mb-3">
                <label className="small mb-1" for="inputUsername">
                  Username (how your name will appear to other users on the
                  site)
                </label>
                <input
                  className="form-control"
                  id="inputUsername"
                  type="text"
                  placeholder="Enter your username"
                  value="username"
                />
              </div>

              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1" for="inputFirstName">
                    First name
                  </label>
                  <input
                    className="form-control"
                    id="inputFirstName"
                    type="text"
                    placeholder="Enter your first name"
                  />
                </div>

                <div className="col-md-6">
                  <label className="small mb-1" for="inputLastName">
                    Last name
                  </label>
                  <input
                    className="form-control"
                    id="inputLastName"
                    type="text"
                    placeholder="Enter your last name"
                    value="Luna"
                  />
                </div>
              </div>

              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1" for="inputOrgName">
                    Occupation
                  </label>
                  <input
                    className="form-control"
                    id="inputOrgName"
                    type="text"
                    placeholder="Enter your organization name"
                    value="Start Bootstrap"
                  />
                </div>
              </div>

              <div className="mb-3">
                <label className="small mb-1" for="inputEmailAddress">
                  Email address
                </label>
                <input
                  className="form-control"
                  id="inputEmailAddress"
                  type="email"
                  placeholder="Enter your email address"
                  value="name@example.com"
                />
              </div>

              <div className="row gx-3 mb-3">
                <div className="col-md-6">
                  <label className="small mb-1" for="inputNewPassword">
                    New Password
                  </label>
                  <input
                    className="form-control"
                    id="inputNewPassword"
                    type="tel"
                    placeholder="Enter your new password"
                    value="*****"
                  />
                </div>

                <div className="col-md-6">
                  <label className="small mb-1" for="inputConfirmNewpassword">
                    Confirm New Password
                  </label>
                  <input
                    className="form-control"
                    id="inputConfirmNewpassword"
                    type="text"
                    name="ConfirmNewPassword"
                    placeholder="Confirm Your New Password"
                    value="*****"
                  />
                </div>
              </div>

              <button className="btn btn-primary" type="button">
                Save changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profileinfo;
