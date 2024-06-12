import { createBrowserRouter } from "react-router-dom";
import LoginFormPage from "../components/LoginFormPage";
import SignupFormPage from "../components/SignupFormPage";
import LandingPage from "../components/LandingPage";
import ShopFormPage from "../components/ShopFormPage";
import Layout from "./Layout";
import ShopDetails from "../components/ShopDetails";
import UserProfile from "../components/UserProfile";
import SearchPage from "../components/SearchPage";
import ShopImagesPage from "../components/ShopImagesPage";
import AboutPage from "../components/AboutPage";

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
        path: "shops/:id/update",
        element: <ShopFormPage />
      },
      {
        path: "shops/:id",
        element: <ShopDetails />,
      },
      {
        path: "shops/:id/images",
        element: <ShopImagesPage />
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/search",
        element: <SearchPage />
      },
      {
        path: "/about",
        element: <AboutPage />
      }
    ],
  },
]);
