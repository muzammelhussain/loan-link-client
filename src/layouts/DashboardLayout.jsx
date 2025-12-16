import React from "react";
import Navbar from "../pages/shared/Navbar/Navbar";
import Footer from "../pages/shared/Footer/Footer";
import useRole from "../hooks/useRole";
import { Link, NavLink, Outlet } from "react-router";

const DashboardLayout = () => {
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open max-w-7xl mx-auto ">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Navbar */}
        <nav className="navbar ">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            {/* Sidebar toggle icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="my-1.5 inline-block size-4"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>
        </nav>
        {/* Page content here */}
        <Navbar></Navbar>
        <Outlet></Outlet>
        <Footer></Footer>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          {/* Sidebar content here */}
          <ul className="menu w-full grow">
            {role === "user" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assigned Deliveries"
                    to="/dashboard/my-loans"
                  >
                    <span className="is-drawer-close:hidden">My Loans</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assigned Deliveries"
                    to="/dashboard/my-profile"
                  >
                    <span className="is-drawer-close:hidden">My Profile</span>
                  </NavLink>
                </li>
              </>
            )}

            {role === "borrower" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Approve Riders"
                    to="/dashboard/my-loans"
                  >
                    <span className="is-drawer-close:hidden">My Loans</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Approve Riders"
                    to="/dashboard/my-profile"
                  >
                    <span className="is-drawer-close:hidden">My Profile</span>
                  </NavLink>
                </li>
              </>
            )}
            {/* admin only links */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Approve Riders"
                    to="/dashboard/loan-applications"
                  >
                    <span className="is-drawer-close:hidden">
                      Loan Applications
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assign Riders"
                    to="/dashboard/all-loans-admin"
                  >
                    <span className="is-drawer-close:hidden">All Loans</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Users Management"
                    to="/dashboard/manage-users"
                  >
                    <span className="is-drawer-close:hidden">Manage Users</span>
                  </NavLink>
                </li>
              </>
            )}

            {role === "manager" && (
              <>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Approve Riders"
                    to="/dashboard/add-loan"
                  >
                    <span className="is-drawer-close:hidden">Add Loan</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Assign Riders"
                    to="/dashboard/manage-loan"
                  >
                    <span className="is-drawer-close:hidden">Manage Loans</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Users Management"
                    to="/dashboard/pending-application"
                  >
                    <span className="is-drawer-close:hidden">
                      Pending Loan Applications
                    </span>
                  </NavLink>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Users Management"
                    to="/dashboard/approved-application"
                  >
                    <span className="is-drawer-close:hidden">
                      Approved Loan Applications
                    </span>
                  </NavLink>
                  <NavLink
                    className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                    data-tip="Users Management"
                    to="/dashboard/my-profile-manager"
                  >
                    <span className="is-drawer-close:hidden">My Profile</span>
                  </NavLink>
                </li>
              </>
            )}

            {/* List item */}
            <li>
              <button
                className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
                data-tip="Settings"
              >
                <span className="is-drawer-close:hidden">Settings</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
