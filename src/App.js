import { Route, Routes } from "react-router-dom";
import Appoinment from "./Pages/Appoinment/Appoinment";
import Home from "./Pages/Home/Home";
import Header from "./Pages/Shared/Header";
import Login from "./Pages/Shared/Login";
import Signup from "./Pages/Shared/Signup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RequireAuth from "./Pages/Shared/RequireAuth";
import Dashboard from "./Pages/Dashboard/Dashboard";
import MyAppointment from "./Pages/Dashboard/MyAppointment";
import MyReviews from "./Pages/Dashboard/MyReviews";
import Users from "./Pages/Appoinment/Users";
import RequireAdmin from "./Pages/Shared/RequireAdmin";
import AddDoctors from "./Pages/Dashboard/AddDoctors";
import ManageDoctors from "./Pages/Dashboard/ManageDoctors";
import Payment from "./Pages/Dashboard/Payment";

function App() {
  return (
    <div className="bg-white">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route
          path="/appoinment"
          element={
            <RequireAuth>
              <Appoinment></Appoinment>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/payment/:id"
          element={
            <RequireAuth>
              <Payment></Payment>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }
        >
          <Route index element={<MyAppointment></MyAppointment>}></Route>
          <Route
            path="/dashboard/users"
            element={
              <RequireAdmin>
                <Users></Users>
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="/dashboard/addDoctors"
            element={
              <RequireAdmin>
                <AddDoctors></AddDoctors>
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="/dashboard/manageDoctors"
            element={
              <RequireAdmin>
                <ManageDoctors></ManageDoctors>
              </RequireAdmin>
            }
          ></Route>
          <Route
            path="/dashboard/reviews"
            element={<MyReviews></MyReviews>}
          ></Route>
        </Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </div>
  );
}

export default App;
