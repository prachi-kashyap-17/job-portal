import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProfile } from "./api/auth";
import { userlogin } from "../store/authSlice";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkLogin = async () => {
      try {
        const data = await getProfile();
        dispatch(userlogin(data));
      } catch (err) {
        console.log(err);
      }
    };
    checkLogin();
  }, []);

  return (
    // react component only returns one element, so we wrap the two components in a fragment
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
