import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { MDBDataTable } from "mdbreact";
import Loader from "../layout/Loader";
import { clearErrors, allUser, deleteUser } from "../../actions/userActions";
import Sidebar from "../admin/Sidebar";
import { DELETE_USER_RESET } from "../../constants/userConstants";

const UserList = () => {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.allUsers);
  const { isDeleted } = useSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(allUser());

    if (error) {
      // error msg
      dispatch(clearErrors());
    }

    if (isDeleted) {
      // success msg
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }
  }, [dispatch, error, isDeleted, navigate]);

  const onDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const setUser = () => {
    const data = {
      columns: [
        {
          label: "User ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Name",
          field: "name",
          sort: "asc",
        },
        {
          label: "Email",
          field: "email",
          sort: "asc",
        },
        {
          label: "Role",
          field: "role",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
        },
      ],
      rows: [],
    };
    users.forEach((user) => {
      data.rows.push({
        id: user._id,
        name: user.name,
        email: `${user.email}`,
        role: user.role,

        actions: (
          <>
            <Link
              to={`/admin/user/${user._id}`}
              className="btn btn-primary py-1 px-2"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="btn btn-danger py-1 px-2 ml-2"
              onClick={() => onDelete(user._id)}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return data;
  };
  return (
    <>
      <MetaData title={"All Users"} />
      <div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>
        <div className="col-12 col-md-10">
          <>
            <h1 className="my-5">All Users</h1>

            {loading ? (
              <Loader />
            ) : (
              <MDBDataTable
                data={setUser}
                className="px-3"
                bordered
                striped
                hover
              />
            )}
          </>
        </div>
      </div>
    </>
  );
};

export default UserList;
