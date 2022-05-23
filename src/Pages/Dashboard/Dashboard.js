import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../firebase.init";
import useAdmin from "../../Hooks/useAdmin";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [adminUser] = useAdmin(user);
  return (
    <div className="container mx-auto">
      <div class="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content">
          <h2 className="text-3xl text-purple-500 text-center my-5">
            This is my dashboard
          </h2>
          <Outlet></Outlet>
        </div>
        <div class="drawer-side">
          <label for="my-drawer-2" class="drawer-overlay"></label>
          <ul class="menu p-4 overflow-y-auto w-48 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            <li>
              <Link to="/dashboard">My Appoinment</Link>
            </li>
            <li>
              <Link to="/dashboard/reviews">My reviews</Link>
            </li>
            {adminUser && (
              <>
                <li>
                  <Link to="/dashboard/users">Users</Link>
                </li>
                <li>
                  <Link to="/dashboard/addDoctors">Add Doctors</Link>
                </li>
                <li>
                  <Link to="/dashboard/manageDoctors">Manage Doctors</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
