import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  updateUser,
  getUserDetails,
} from "../../actions/userActions";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
import Sidebar from "./Sidebar";

const UpdateUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const dispatch = useDispatch();
  const params = useParams();

  const { user } = useSelector((state) => state.userDetails);
  const { error, isUpdated, loading } = useSelector((state) => state.user);

  const userId = params.id;

  const navigate = useNavigate();
  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      // error toaster
      dispatch(clearErrors());
    }

    if (isUpdated) {
      // toast user updated successfully

      navigate("/admin/users");

      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, isUpdated, error, navigate]);

  const onUpdateUser = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("role", role);

    dispatch(updateUser(user._id, formData));
    console.log(formData);
  };
  return (
    <>
      <MetaData title={`Update User`} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <>
            <div className="row wrapper">
              <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={onUpdateUser}>
                  <h1 className="mt-2 mb-5">Update User</h1>

                  <div className="form-group">
                    <label htmlFor="name_field">Name</label>
                    <input
                      type="name"
                      id="name_field"
                      className="form-control"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email_field">Email</label>
                    <input
                      type="email"
                      id="email_field"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="role_field">Role</label>

                    <select
                      id="role_field"
                      className="form-control"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn update-btn btn-block mt-4 mb-3"
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
