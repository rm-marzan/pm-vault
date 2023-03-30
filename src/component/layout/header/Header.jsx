import React from "react";
import { useNavigate } from "react-router-dom";
import { axiosSecure } from "../../../api/axios";
import { getUserName, logout } from "../../../service";
import ApiURL from "../../../api/apiURL";
import { toast, ToastContainer } from "react-toastify";
import { MdArrowDropDown } from "react-icons/md";
import "./header.scss";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axiosSecure.post(ApiURL.logout)
      .then((response) => {
        if (response.data.success === true) {
          logout();
          navigate("/login", { replace: true });
        } else {
          toast.error("Server is not responding");
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Server is not responding");
      });
  };

  return (
    <>
      <nav
        className="navbar navbar-expand navbar-dark bg-color fixed"
        aria-label="Second navbar example"
      >
        <div className="container-fluid" style={{ width: "82%" }}>
          <div className="navbar-collapse collapse w-100">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link link-item" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link link-item" href="/tools">
                  Tools
                </a>
              </li>
            </ul>

            <div className=" justify-content-end three-dot-dropdown">
              <button
                type="button"
                className=" dropdown-toggle  user-dropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {/* please use dynamic username here */}
                <div className="user-dropdown-text">
                  {getUserName().split(' ').map(word => word.charAt(0).toUpperCase()).join('')}
                </div>
                <MdArrowDropDown className="user-dropdown-btn" />
              </button>
              <ul className="dropdown-menu">
                <li className="dropdown-item">
                  <div className="user-dropdown-text">
                    {getUserName().split(' ').map(word => word.charAt(0).toUpperCase()).join('')}
                  </div>
                  <div className="d-block">
                    Logged in as
                    <p className="text-secondary d-block ">{getUserName().toUpperCase()}</p>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-item" onClick={handleLogout}>
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <ToastContainer
        position="top-center"
        theme="colored"
      />
    </>
  );
};

export default Header;
