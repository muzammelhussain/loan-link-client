import "./App.css";
import Navbar from "./pages/shared/Navbar/Navbar";
import Footer from "./pages/shared/Footer/Footer";
import Register from "./pages/Auth/Register/Register";
import Login from "./pages/Auth/Login/Login";

function App() {
  return (
    <>
      <Navbar></Navbar>
      <Register></Register>
      <Login></Login>
      <Footer></Footer>
    </>
  );
}

export default App;
