import { Navigate } from "react-router-dom";

import Login from "../screens/auth/login";
import Register from "../screens/auth/register";





export default function PublicRoute() {
return {
  children: [

    //tela de login
    {
      path: "/login",
      element: <Login />
    },
    //tela de registro
    {
      path: "/register",
      element: <Register />
    },
    //tela de hq selecionada
    
    {
      path: "*",
      element: <Navigate to="/login" />,
    }
  ],
};
}
