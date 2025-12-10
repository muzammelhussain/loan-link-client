import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import AllLoanPage from "../pages/Loan/AllLoanPage";
import AboutUs from "../pages/AboutUs/AboutUs";
import Contact from "../pages/Contact/Contact";
import LoanApplicationForm from "../pages/Loan/LoanApplicationForm";

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
        path: "loan-application",
        Component: LoanApplicationForm,
      },
    ],
  },
]);
