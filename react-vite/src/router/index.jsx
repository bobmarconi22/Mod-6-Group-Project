import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import LandingPage from "../components/LandingPage";
import ShopFormPage from "../components/ShopFormPage";
import Layout from "./Layout";
import ShopDetail from "../components/ShopDetail";
import UserProfile from "../components/UserProfile";
import SearchPage from "../components/SearchPage";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "new-shop",
        element: <ShopFormPage />,
      },
      {
        path: "shops/:id",
        element: <ShopDetail />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/search",
        element: <SearchPage/>
      }
    ],
  },
]);
