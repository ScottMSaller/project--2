import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navbar from "./components/Navbar"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Shopping from "./pages/Shopping";
import MyRecipes from "./pages/MyRecipes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/home",
    element: <Home/>
  },
  {
    path: "/shopping",
    element: <Shopping/>
  },
  {
    path: "/my-recipes",
    element: <MyRecipes/>
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar/>
    <RouterProvider router={router} />
  </StrictMode>,
)
