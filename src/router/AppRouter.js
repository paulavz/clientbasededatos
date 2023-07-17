import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Profile from "../pages/profile/Profile";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import CreateLibrary from "../components/createLibrary/CreateLibrary";
import CreateDocument from "../components/createDocument/CreateDocument";
import DocumentPerfil from "../components/documentPerfil/DocumentPerfil";

function AppRouter() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Login />}
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
        <Route path="/crear/library">
          <CreateLibrary />
        </Route>
        <Route path="/crear/document">
          <CreateDocument />
        </Route>
        <Route path="/perfil/document">
          <DocumentPerfil />
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
        <Route path="/document/:id">
          <DocumentPerfil />
        </Route>
      </Switch>
    </Router>
  );
}

export default AppRouter;
