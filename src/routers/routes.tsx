import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Container } from "../components/Container";
import PrivateRoute from "./list.routes.private";
import PublicRoute from "./list.routes.public";

export const AppRoutes = (): JSX.Element => {
  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };
  const checkAuth = () => {
    const token = localStorage.getItem('token')
   if (token){
     const decodedJwt = parseJwt(token);

     if (decodedJwt.exp * 1000 < Date.now()) {
       localStorage.removeItem('token');
       return false;
     }
     return true;
   }
   return false;
 }

 const router = createBrowserRouter([
  checkAuth() ? PrivateRoute() : PublicRoute(),
]);
  return (
    <Container>
      <RouterProvider router={router} />
    </Container>
  );
};
