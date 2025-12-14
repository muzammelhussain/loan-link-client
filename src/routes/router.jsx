import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AllLoanPage from "../pages/Loan/AllLoanPage";
import AboutUs from "../pages/AboutUs/AboutUs";
import Contact from "../pages/Contact/Contact";
import LoanApplicationForm from "../pages/Loan/LoanApplicationForm";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import LoanDetails from "../pages/Loan/LoanDetails";
import Test from "../../Test";
import DashboardLayout from "../layouts/DashboardLayout";
import MyLoans from "../pages/Dashboard/Borrower/MyLoans";
import MyProfile from "../pages/Dashboard/Borrower/MyProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-loan-page",
        Component: AllLoanPage,
      },
      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "contact",
        Component: Contact,
      },
      {
        path: "/loans/:id",
        element: (
          <PrivateRoute>
            <LoanDetails></LoanDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/apply-loan/:id",
        Component: LoanApplicationForm,
        // element: (
        //   <PrivateRoute>
        //     <LoanApplicationForm></LoanApplicationForm>
        //   </PrivateRoute>
        // ),
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-loans",
        Component: MyLoans,
      },
      {
        path: "my-profile",
        Component: MyProfile,
      },
    ],
  },
]);
