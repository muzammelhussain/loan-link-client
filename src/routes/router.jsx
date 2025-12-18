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
import AdminRoute from "./AdminRoute";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import AllLoans from "../pages/Dashboard/Admin/AllLoans";
import LoanApplicaitons from "../pages/Dashboard/Admin/LoanApplicaitons";
import ManagerRoute from "./ManagerRoute";
import AddLoan from "../pages/Dashboard/Manager/AddLoan";
import ManageLoans from "../pages/Dashboard/Manager/ManageLoans";
import PendingLoanApplications from "../pages/Dashboard/Manager/PendingLoanApplications";
import MyProfileManager from "../pages/Dashboard/Manager/MyProfileManager";
import ApprovedLoans from "../pages/Dashboard/Manager/ApprovedLoans";
import PaymentSuccess from "../pages/Dashboard/Borrower/PaymentSuccess";
import PaymentCancel from "../pages/Dashboard/Borrower/PaymentCancel";

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
      {
        path: "payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "payment-cancelled",
        Component: PaymentCancel,
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers></ManageUsers>
          </AdminRoute>
        ),
      },
      {
        path: "all-loans-admin",
        element: (
          <AdminRoute>
            <AllLoans></AllLoans>
          </AdminRoute>
        ),
      },
      {
        path: "loan-applications",
        element: (
          <AdminRoute>
            <LoanApplicaitons></LoanApplicaitons>
          </AdminRoute>
        ),
      },
      {
        path: "add-loan",
        element: (
          <ManagerRoute>
            <AddLoan></AddLoan>
          </ManagerRoute>
        ),
      },
      {
        path: "manage-loan",
        element: (
          <ManagerRoute>
            <ManageLoans></ManageLoans>
          </ManagerRoute>
        ),
      },
      {
        path: "pending-application",
        element: (
          <ManagerRoute>
            <PendingLoanApplications></PendingLoanApplications>
          </ManagerRoute>
        ),
      },
      {
        path: "approved-application",
        element: (
          <ManagerRoute>
            <ApprovedLoans></ApprovedLoans>
          </ManagerRoute>
        ),
      },
      {
        path: "my-profile-manager",
        element: (
          <ManagerRoute>
            <MyProfileManager></MyProfileManager>
          </ManagerRoute>
        ),
      },
    ],
  },
]);
