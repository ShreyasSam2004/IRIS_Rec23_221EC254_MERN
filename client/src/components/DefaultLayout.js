import React from "react";
import "../resources/layout.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const userMenu = [
    {
      name: "Home",
      icon: "ri-home-line",
      path: "/",
    },
    {
      name: "Bookings",
      icon: "ri-file-list-line",
      path: "/bookings",
    },
    {
      name: "Profile",
      icon: "ri-user-line",
      path: "/profile",
    },
    {
      name: "Logout",
      icon: "ri-logout-box-line",
      path: "/logout",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Courses",
      path: "/admin/buses",
      icon: "ri-bus-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Bookings",
      path: "/admin/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;
  let activeRoute = window.location.pathname;
  if (window.location.pathname.includes("book-now")) {
    activeRoute = "/";
  }

  return (
    <div className="layout-parent">
      <div className="sidebar">
        <div className="sidebar-header">
          <h1 className="logo">SB</h1>
          <h1 className="role">
            {user?.name} <br />
            Role : {user?.isAdmin ? "Admin" : "User"}
          </h1>
        </div>
        <div className="d-flex flex-column gap-3 justify-content-start menu">
          {menuToBeRendered.map((item, index) => {
            return (
              <div
                className={`${
                  activeRoute === item.path && "active-menu-item"
                } menu-item`}
              >
                <i className={item.icon}></i>
                {
                  <span
                    onClick={() => {
                      if (item.path === "/logout") {
                        localStorage.removeItem("token");
                        navigate("/login");
                      } else {
                        navigate(item.path);
                      }
                    }}
                  >
                    {item.name}
                  </span>
                }
              </div>
            );
          })}
        </div>
      </div>
      <div className="body">
        <div className="header d-flex">
          {/* Existing close button */}
          <i class="ri-close-line"></i>

          {/* New navigation buttons */}
          <div className="ms-auto d-flex navbar">
            <button
               className="navbar-button"
               style={{ marginRight: '40px' }}
              onClick={() => {
                // Handle Cart button click
                navigate("/cart");
              }}
            >
              Cart
            </button>
            <button
               className="navbar-button"
               style={{ marginRight: '40px' }}
              onClick={() => {
                // Handle Hostel button click
                navigate("/hostel");
              }}
            >
              Hostel
            </button>
            <button
               className="navbar-button"
               style={{ marginRight: '40px' }}
              onClick={() => {
                // Handle Mess button click
                navigate("/mess");
              }}
            >
              Mess
            </button>
          </div>
        </div>

        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
