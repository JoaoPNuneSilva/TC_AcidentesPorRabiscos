import { Navigate } from "react-router-dom";
import { Home } from "../screens";
import { HqHome } from "../screens/hq/hq-home";
import { HqView } from "@/screens/hq/hq-view";
import { Profile } from "@/screens/profile/profile";
import { About } from "@/screens/about/about";
import { UploadComic } from "@/screens/uploadcomic/uploadcomic";





export default function PrivateRoute() {
return {
  children: [
    //tela pricinpal
    {
      path: "/home",
      element: <Home />
    },
    //tela de login
    {
      path: "/hq",
      element: <HqHome />
    },
    //tela de visualização de hq
    {
      path: "/hq/view",
      element: <HqView />
    },
    //tela de perfil
    {
      path: "/profile",
      element: <Profile />
    },

    //tela de sobre
    {
      path: "/about",
      element: <About />
    },

    //tela de lançar quadrinho
    {
      path: "/uploadcomic",
      element: <UploadComic />
    },

    //tela de redirect caso o usuario tente acessar uma rota inexistente
    {
      path: "*",
      element: <Navigate to="/home" />,
    }
  ],
};
}
